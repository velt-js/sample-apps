"use client";
import { VeltSidebarButtonWireframe } from '@veltdev/react';
import { SidebarButtonIcon } from './VeltIcons';
import { SidebarButtonUnreadIconWrapper } from './styled';

const VeltSidebarButtonWf = () => {
    return (
        // [Velt] Custom wireframe for sidebar button - opens embedded comments panel
        <VeltSidebarButtonWireframe>
            <SidebarButtonIcon />
            <VeltSidebarButtonWireframe.UnreadIcon>
                <SidebarButtonUnreadIconWrapper className='privado-sidebar-button-unread-icon-wrapper' />
            </VeltSidebarButtonWireframe.UnreadIcon>
        </VeltSidebarButtonWireframe>
    );
};

export default VeltSidebarButtonWf;
