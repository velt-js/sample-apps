"use client";
import { VeltNotificationsToolWireframe } from '@veltdev/react';
const imgNotifications = "/icons/sidebar/notifications.svg";

const VeltNotificationsToolWf = () => {
  return (
    <VeltNotificationsToolWireframe>
      <div className="relative w-100">
      <button
        className="w-full h-8 flex items-center gap-3 px-2 py-1 rounded-[3px] hover:bg-[#F2F4FF]/40 transition-colors duration-150"
      >
        <img src={imgNotifications} alt="" className="w-4 h-4 flex-shrink-0 block" />
        <span
          className="flex-1 text-left text-sm leading-[21px] text-[#4A4947] tracking-[-0.105px]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Notifications
        </span>
        <span
          className="flex items-center justify-center min-w-[18px] h-[18px] px-[5px] bg-[#BD323C] rounded-[5px] text-white text-xs font-medium leading-[18px] tracking-[0.25px]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <VeltNotificationsToolWireframe.UnreadCount />
        </span>
      </button>
      </div>
    </VeltNotificationsToolWireframe>
  );
};

export default VeltNotificationsToolWf;
