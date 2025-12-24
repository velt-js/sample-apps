"use client";
import { VeltSidebarButtonWireframe } from '@veltdev/react';
import { MessageSquare } from 'lucide-react';

const VeltSidebarButtonWf = () => {
    return (
        <VeltSidebarButtonWireframe>
            <div className="flex items-center gap-2 ">
                <div className='relative'>
                    <MessageSquare className="w-5 h-5" />
                </div>
                <span><VeltSidebarButtonWireframe.CommentsCount /></span>
            </div>
        </VeltSidebarButtonWireframe>
    );
};

export default VeltSidebarButtonWf;
