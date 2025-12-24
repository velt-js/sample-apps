"use client";
import { VeltCommentBubbleWireframe } from '@veltdev/react';
import { MessageSquare } from 'lucide-react';

const VeltCommentBubbleWf = () => {
    return (
        <VeltCommentBubbleWireframe>
            <button
                className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 transition-colors"
                aria-label="View comments"
            >
                <div className="flex items-center gap-1">
                    <div className='relative'>
                        <MessageSquare className="w-5 h-5" />
                    </div>
                    <VeltCommentBubbleWireframe.CommentsCount />
                </div>
            </button>
        </VeltCommentBubbleWireframe>
    );
};

export default VeltCommentBubbleWf;
