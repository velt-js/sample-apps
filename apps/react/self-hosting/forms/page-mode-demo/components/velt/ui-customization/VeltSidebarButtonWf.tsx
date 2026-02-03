"use client";
import { VeltSidebarButtonWireframe } from '@veltdev/react';
import { SidebarButtonIcon } from './VeltIcons';

const VeltSidebarButtonWf = () => {
    return (
        // [Velt] Custom wireframe for sidebar button - opens embedded comments panel
        <VeltSidebarButtonWireframe>
            <SidebarButtonIcon />
            <VeltSidebarButtonWireframe.UnreadIcon>
                <div className='privado-sidebar-button-unread-icon-wrapper'></div>
            </VeltSidebarButtonWireframe.UnreadIcon>
        </VeltSidebarButtonWireframe>
    );
};

export default VeltSidebarButtonWf;
