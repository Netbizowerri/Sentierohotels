import React from 'react';
import { X, Bell, Zap, ShieldCheck, Plane, Gift } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: '24/7 Solar Grid Status: 100% Active',
      desc: 'Uninterrupted electricity and air conditioning across all suites.',
      icon: Zap,
      time: 'Just now',
      color: 'text-[#CD9A29] bg-[#CD9A29]/15',
    },
    {
      id: 2,
      title: 'Daily Non-Stop Flights to Lagos & Abuja',
      desc: 'Check QOW departure schedules in the Airport Guide — just 2 minutes from the terminal.',
      icon: Plane,
      time: '10m ago',
      color: 'text-[#242E51] bg-[#242E51]/10',
    },
    {
      id: 3,
      title: '24/7 Security Detail on Duty',
      desc: 'Round-the-clock professional security and perimeter CCTV active.',
      icon: ShieldCheck,
      time: '1 hour ago',
      color: 'text-[#CD9A29] bg-[#CD9A29]/15',
    },
    {
      id: 4,
      title: 'Chef Special Tonight at Restaurant',
      desc: 'Fresh native Ofe Owerri, roasted fish, and continental buffet available.',
      icon: Gift,
      time: 'Today',
      color: 'text-[#242E51] bg-[#242E51]/10',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#CD9A29]/30 animate-in fade-in duration-200">
        <div className="p-4 bg-[#242E51] text-white flex items-center justify-between border-b border-[#303D6A]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#CD9A29]" />
            <h3 className="font-bold text-sm text-white">Hotel Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1B233F] text-white flex items-center justify-center hover:bg-[#2F3C69] transition border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-96 overflow-y-auto bg-sentiero-dots">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-neutral-200 shadow-xs"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xs text-[#091626] truncate">{n.title}</h5>
                    <span className="text-[10px] text-neutral-400 shrink-0 ml-1">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug">{n.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 border-t border-neutral-200 bg-white text-center">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#242E51] hover:text-[#CD9A29] transition"
          >
            Close Notifications
          </button>
        </div>
      </div>
    </div>
  );
};
