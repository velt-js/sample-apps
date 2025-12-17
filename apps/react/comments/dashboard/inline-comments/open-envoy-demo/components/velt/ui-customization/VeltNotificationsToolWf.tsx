import { VeltNotificationsToolWireframe } from '@veltdev/react';

const VeltNotificationsToolWf = () => {
  return (
    <VeltNotificationsToolWireframe>
      <div className="flex items-center justify-center min-w-[18px] h-[18px] px-[5px] bg-[#BD323C] rounded-[5px] text-white text-xs font-medium leading-[18px] tracking-[0.25px]">
        <VeltNotificationsToolWireframe.UnreadCount />
      </div>
    </VeltNotificationsToolWireframe>
  );
};

export default VeltNotificationsToolWf;
