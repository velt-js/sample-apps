"use client";

import { VeltReactionPinWireframe } from '@veltdev/react';

const VeltReactionPinWf = () => {
    return (
        <VeltReactionPinWireframe>
            <div className="privado-reaction-pin-wrapper">
                <svg className="privado-reaction-pin-default-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_405_1392)">
                        <path d="M4.5 13.5H2.5V8.5H4.5" stroke="#9AA8C3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4.5 8.5L6.5 2.5H7C7.39782 2.5 7.77936 2.65804 8.06066 2.93934C8.34196 3.22064 8.5 3.60218 8.5 4V6.5H11.77C11.9849 6.49999 12.1973 6.54616 12.3928 6.63538C12.5883 6.7246 12.7624 6.85479 12.9032 7.01713C13.044 7.17946 13.1483 7.37017 13.209 7.57632C13.2697 7.78247 13.2854 7.99926 13.255 8.212L12.684 12.212C12.633 12.5693 12.4548 12.8962 12.1823 13.1328C11.9097 13.3694 11.5609 13.4998 11.2 13.5H4.5V8.5Z" stroke="#9AA8C3" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_405_1392">
                            <rect width="12" height="12" fill="white" transform="translate(2 2)" />
                        </clipPath>
                    </defs>
                </svg>
                <VeltReactionPinWireframe.Emoji />
                <VeltReactionPinWireframe.Count />
            </div>
        </VeltReactionPinWireframe>
    );
};

export default VeltReactionPinWf;
