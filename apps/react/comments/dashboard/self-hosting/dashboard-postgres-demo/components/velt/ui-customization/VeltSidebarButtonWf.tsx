"use client";
import { VeltIf, VeltSidebarButtonWireframe, } from '@veltdev/react';

const VeltSidebarButtonWf = () => {
    return (
        <VeltSidebarButtonWireframe>
            <div className="oe-sidebar-button-wrapper">
                <div className='oe-relative'>
                    <VeltSidebarButtonWireframe.Icon>
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14 10.5c0 .398-.158.78-.44 1.06-.28.282-.662.44-1.06.44H4.5L2 14.5V4c0-.398.158-.78.44-1.06.28-.282.662-.44 1.06-.44h9c.398 0 .78.158 1.06.44.282.28.44.662.44 1.06v6.5z"
                                stroke="#777572"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </VeltSidebarButtonWireframe.Icon>
                    <VeltSidebarButtonWireframe.UnreadIcon />
                </div>
                <VeltIf condition="{unreadCount} > 0">
                    <span className="oe-sidebar-button-count"><VeltSidebarButtonWireframe.CommentsCount /></span>
                </VeltIf>
            </div>
        </VeltSidebarButtonWireframe>
    );
};

export default VeltSidebarButtonWf;
