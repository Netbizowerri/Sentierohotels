import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';

export type DisintegrationStyle = 'shatter' | 'sweep' | 'vortex';

interface DisintegrationSliderProps {
  currentImage: string;
  previousImage: string | null;
  slideId: number;
  direction?: 'next' | 'prev';
  style?: DisintegrationStyle;
  onTransitionComplete?: () => void;
  className?: string;
}

interface Fragment {
  // Source bounds on image
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  // Destination base coordinates on canvas
  dx: number;
  dy: number;
  dw: number;
  dh: number;
  // Physics & offsets
  vx: number;
  vy: number;
  rotation: number;
  maxRotation: number;
  delay: number;
  duration: number;
}

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

export const DisintegrationSlider: React.FC<DisintegrationSliderProps> = ({
  currentImage,
  previousImage,
  slideId,
  direction = 'next',
  style = 'shatter',
  onTransitionComplete,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Loaded image cache
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);

  // Preload an image safely
  const preloadImage = useCallback((url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const cached = imageCacheRef.current.get(url);
      if (cached && cached.complete && cached.naturalWidth > 0) {
        return resolve(cached);
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        imageCacheRef.current.set(url, img);
        resolve(img);
      };
      img.onerror = () => {
        // Fallback without crossOrigin if CORS fails
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          imageCacheRef.current.set(url, fallbackImg);
          resolve(fallbackImg);
        };
        fallbackImg.onerror = () => resolve(fallbackImg);
        fallbackImg.src = url;
      };
      img.src = url;
    });
  }, []);

  // Preload current image immediately
  useEffect(() => {
    preloadImage(currentImage);
  }, [currentImage, preloadImage]);

  // Main disintegration & reintegration animation engine
  useEffect(() => {
    // If no previous image, just show current image directly
    if (!previousImage || previousImage === currentImage) {
      return;
    }

    let isMounted = true;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load both images before starting
    Promise.all([preloadImage(previousImage), preloadImage(currentImage)]).then(
      ([prevImg, nextImg]) => {
        if (!isMounted) return;
        if (!prevImg.naturalWidth || !nextImg.naturalWidth) {
          // If images failed to load, fall back to simple direct display
          return;
        }

        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) return;

        // Set high-DPI canvas buffer
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        setIsTransitioning(true);

        // Define matrix grid density (e.g. 18 columns x 12 rows for smooth particles)
        const cols = width > 768 ? 20 : 14;
        const rows = height > 400 ? 14 : 10;
        const cellW = width / cols;
        const cellH = height / rows;

        // Calculate cover aspect ratio mapping for previous and next images
        const computeCoverMapping = (img: HTMLImageElement) => {
          const imgRatio = img.naturalWidth / img.naturalHeight;
          const containerRatio = width / height;
          let srcW = img.naturalWidth;
          let srcH = img.naturalHeight;
          let srcX = 0;
          let srcY = 0;

          if (imgRatio > containerRatio) {
            srcW = img.naturalHeight * containerRatio;
            srcX = (img.naturalWidth - srcW) / 2;
          } else {
            srcH = img.naturalWidth / containerRatio;
            srcY = (img.naturalHeight - srcH) / 2;
          }

          return { srcX, srcY, srcW, srcH };
        };

        const prevMapping = computeCoverMapping(prevImg);
        const nextMapping = computeCoverMapping(nextImg);

        const prevSrcCellW = prevMapping.srcW / cols;
        const prevSrcCellH = prevMapping.srcH / rows;

        const nextSrcCellW = nextMapping.srcW / cols;
        const nextSrcCellH = nextMapping.srcH / rows;

        const centerX = width / 2;
        const centerY = height / 2;

        // 1. Generate Outgoing Disintegration Fragments
        const outgoingFragments: Fragment[] = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const dx = c * cellW;
            const dy = r * cellH;
            const fragmentCenterX = dx + cellW / 2;
            const fragmentCenterY = dy + cellH / 2;

            let vx = 0;
            let vy = 0;
            let delay = 0;
            let maxRotation = (Math.random() - 0.5) * Math.PI * 2;

            if (style === 'shatter') {
              // Radial explosion outward from center with random jitter
              const angle = Math.atan2(fragmentCenterY - centerY, fragmentCenterX - centerX);
              const distFromCenter = Math.hypot(fragmentCenterX - centerX, fragmentCenterY - centerY);
              const maxDist = Math.hypot(centerX, centerY);
              const speed = (0.5 + Math.random() * 0.9) * (width > 600 ? 320 : 200);

              vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 80;
              vy = Math.sin(angle) * speed + (Math.random() - 0.5) * 80 - 40; // Slight upward buoyancy
              delay = (distFromCenter / maxDist) * 0.28 + Math.random() * 0.12;
            } else if (style === 'sweep') {
              // Directional wave across the screen
              const dirMult = direction === 'next' ? 1 : -1;
              const normX = direction === 'next' ? c / cols : (cols - 1 - c) / cols;
              delay = normX * 0.38 + Math.random() * 0.1;
              vx = dirMult * (200 + Math.random() * 260);
              vy = (Math.random() - 0.5) * 140;
            } else {
              // Vortex spiral disintegration
              const angle = Math.atan2(fragmentCenterY - centerY, fragmentCenterX - centerX);
              const dist = Math.hypot(fragmentCenterX - centerX, fragmentCenterY - centerY);
              const spinAngle = angle + Math.PI / 2;
              vx = Math.cos(spinAngle) * 240 + Math.cos(angle) * 120;
              vy = Math.sin(spinAngle) * 240 + Math.sin(angle) * 120;
              delay = (dist / Math.hypot(centerX, centerY)) * 0.3 + Math.random() * 0.1;
              maxRotation = Math.PI * 3 * (Math.random() > 0.5 ? 1 : -1);
            }

            outgoingFragments.push({
              sx: prevMapping.srcX + c * prevSrcCellW,
              sy: prevMapping.srcY + r * prevSrcCellH,
              sw: prevSrcCellW,
              sh: prevSrcCellH,
              dx,
              dy,
              dw: cellW + 0.5,
              dh: cellH + 0.5,
              vx,
              vy,
              rotation: 0,
              maxRotation,
              delay,
              duration: 0.55 + Math.random() * 0.25,
            });
          }
        }

        // 2. Generate Incoming Reintegration Fragments
        const incomingFragments: Fragment[] = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const dx = c * cellW;
            const dy = r * cellH;
            const fragmentCenterX = dx + cellW / 2;
            const fragmentCenterY = dy + cellH / 2;

            let startOffsetX = 0;
            let startOffsetY = 0;
            let delay = 0;
            let maxRotation = (Math.random() - 0.5) * Math.PI * 1.5;

            if (style === 'shatter') {
              // Converging inwards from scattered perimeter
              const angle = Math.atan2(fragmentCenterY - centerY, fragmentCenterX - centerX);
              const scatterDist = (0.6 + Math.random() * 0.7) * (width > 600 ? 300 : 180);
              startOffsetX = Math.cos(angle) * scatterDist + (Math.random() - 0.5) * 60;
              startOffsetY = Math.sin(angle) * scatterDist + (Math.random() - 0.5) * 60;
              // Center pieces integrate slightly earlier
              const distFromCenter = Math.hypot(fragmentCenterX - centerX, fragmentCenterY - centerY);
              delay = 0.35 + (distFromCenter / Math.hypot(centerX, centerY)) * 0.3 + Math.random() * 0.1;
            } else if (style === 'sweep') {
              // Sweeping in from the opposing edge
              const dirMult = direction === 'next' ? -1 : 1;
              const normX = direction === 'next' ? c / cols : (cols - 1 - c) / cols;
              startOffsetX = dirMult * (220 + Math.random() * 200);
              startOffsetY = (Math.random() - 0.5) * 120;
              delay = 0.38 + normX * 0.35 + Math.random() * 0.08;
            } else {
              // Converging inward spiral
              const angle = Math.atan2(fragmentCenterY - centerY, fragmentCenterX - centerX);
              const spinAngle = angle - Math.PI / 2;
              startOffsetX = Math.cos(spinAngle) * 220 + Math.cos(angle) * 140;
              startOffsetY = Math.sin(spinAngle) * 220 + Math.sin(angle) * 140;
              delay = 0.35 + Math.random() * 0.35;
              maxRotation = Math.PI * 2 * (Math.random() > 0.5 ? 1 : -1);
            }

            incomingFragments.push({
              sx: nextMapping.srcX + c * nextSrcCellW,
              sy: nextMapping.srcY + r * nextSrcCellH,
              sw: nextSrcCellW,
              sh: nextSrcCellH,
              dx,
              dy,
              dw: cellW + 0.5,
              dh: cellH + 0.5,
              vx: startOffsetX,
              vy: startOffsetY,
              rotation: 0,
              maxRotation,
              delay,
              duration: 0.55 + Math.random() * 0.25,
            });
          }
        }

        // 3. Shimmering Golden Embers & Stardust Particles
        const sparkles: SparkleParticle[] = [];
        const sparkleColors = ['#CD9A29', '#E5B84C', '#FFD700', '#FFFFFF', '#F59E0B'];
        const totalSparkles = width > 768 ? 70 : 45;

        for (let i = 0; i < totalSparkles; i++) {
          sparkles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 180,
            vy: (Math.random() - 0.8) * 150, // Floating upwards
            size: Math.random() * 3 + 1.5,
            alpha: Math.random() * 0.8 + 0.2,
            color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
            life: Math.random() * 0.3, // Start at different intervals
            maxLife: 0.7 + Math.random() * 0.5,
          });
        }

        const totalDuration = 1.3; // 1.3 seconds total for complete disintegration & reintegration
        const startTime = performance.now();

        // Animation Loop
        const renderLoop = (currentTime: number) => {
          if (!isMounted) return;

          const elapsedSec = (currentTime - startTime) / 1000;
          const progress = Math.min(elapsedSec / totalDuration, 1);

          ctx.clearRect(0, 0, width, height);

          // Fill deep background in case of transparent gap
          ctx.fillStyle = '#1A2238';
          ctx.fillRect(0, 0, width, height);

          // RENDER PHASE 1: OUTGOING FRAGMENTS (Disintegrating)
          for (let i = 0; i < outgoingFragments.length; i++) {
            const frag = outgoingFragments[i];
            const fragTime = elapsedSec - frag.delay;

            if (fragTime <= 0) {
              // Hasn't started disintegrating yet; draw solid
              ctx.save();
              ctx.drawImage(
                prevImg,
                frag.sx,
                frag.sy,
                frag.sw,
                frag.sh,
                frag.dx,
                frag.dy,
                frag.dw,
                frag.dh
              );
              ctx.restore();
            } else {
              const fragProgress = Math.min(fragTime / frag.duration, 1);
              if (fragProgress < 1) {
                // Ease out quad for explosive drift
                const ease = 1 - Math.pow(1 - fragProgress, 2.5);
                const curX = frag.dx + frag.vx * ease;
                const curY = frag.dy + frag.vy * ease;
                const scale = Math.max(1 - fragProgress * 1.05, 0);
                const alpha = Math.max(1 - fragProgress * 1.1, 0);
                const rot = frag.maxRotation * ease;

                if (scale > 0 && alpha > 0) {
                  ctx.save();
                  ctx.globalAlpha = alpha;
                  ctx.translate(curX + frag.dw / 2, curY + frag.dh / 2);
                  ctx.rotate(rot);
                  ctx.scale(scale, scale);

                  ctx.drawImage(
                    prevImg,
                    frag.sx,
                    frag.sy,
                    frag.sw,
                    frag.sh,
                    -frag.dw / 2,
                    -frag.dh / 2,
                    frag.dw,
                    frag.dh
                  );
                  ctx.restore();
                }
              }
            }
          }

          // RENDER PHASE 2: INCOMING FRAGMENTS (Reintegrating)
          for (let i = 0; i < incomingFragments.length; i++) {
            const frag = incomingFragments[i];
            const fragTime = elapsedSec - frag.delay;

            if (fragTime > 0) {
              const fragProgress = Math.min(fragTime / frag.duration, 1);
              // Ease out back/cubic for magnetic snap
              const ease = 1 - Math.pow(1 - fragProgress, 3);
              const invEase = 1 - ease;

              const curX = frag.dx + frag.vx * invEase;
              const curY = frag.dy + frag.vy * invEase;
              const scale = 0.2 + 0.8 * ease;
              const alpha = Math.min(fragProgress * 1.3, 1);
              const rot = frag.maxRotation * invEase;

              ctx.save();
              ctx.globalAlpha = alpha;
              ctx.translate(curX + frag.dw / 2, curY + frag.dh / 2);
              ctx.rotate(rot);
              ctx.scale(scale, scale);

              ctx.drawImage(
                nextImg,
                frag.sx,
                frag.sy,
                frag.sw,
                frag.sh,
                -frag.dw / 2,
                -frag.dh / 2,
                frag.dw,
                frag.dh
              );
              ctx.restore();
            }
          }

          // RENDER PHASE 3: GOLDEN SHIMMER PARTICLES & STARDUST
          ctx.save();
          for (let i = 0; i < sparkles.length; i++) {
            const p = sparkles[i];
            p.life += 0.016;
            p.x += p.vx * 0.016;
            p.y += p.vy * 0.016;

            const particleProgress = p.life / p.maxLife;
            if (particleProgress < 1 && particleProgress > 0) {
              const pAlpha =
                particleProgress < 0.3
                  ? (particleProgress / 0.3) * p.alpha
                  : (1 - (particleProgress - 0.3) / 0.7) * p.alpha;

              ctx.globalAlpha = Math.max(pAlpha, 0);
              ctx.fillStyle = p.color;
              ctx.shadowColor = '#CD9A29';
              ctx.shadowBlur = 6;

              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.restore();

          // GOLDEN REINTEGRATION SWEEP (Triggers towards the end 0.75 - 1.0)
          if (progress > 0.75) {
            const sweepProgress = (progress - 0.75) / 0.25;
            ctx.save();
            ctx.globalAlpha = Math.sin(sweepProgress * Math.PI) * 0.35;
            const grad = ctx.createLinearGradient(
              sweepProgress * width * 1.4 - width * 0.4,
              0,
              sweepProgress * width * 1.4,
              height
            );
            grad.addColorStop(0, 'transparent');
            grad.addColorStop(0.5, 'rgba(205, 154, 41, 0.6)');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
          }

          if (progress < 1) {
            animFrameIdRef.current = requestAnimationFrame(renderLoop);
          } else {
            // Completed! Transition is finished, clean up and reveal static image
            setIsTransitioning(false);
            if (onTransitionComplete) {
              onTransitionComplete();
            }
          }
        };

        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      }
    );

    return () => {
      isMounted = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [currentImage, previousImage, slideId, direction, style, preloadImage, onTransitionComplete]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* High-Resolution Static Image (visible when idle for maximum crispness and zero GPU drain) */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url('${currentImage}')` }}
      />

      {/* Disintegration & Reintegration HTML5 Canvas Layer */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-200 ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
