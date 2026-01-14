"use client";
import { VeltCommentBubbleWireframe } from '@veltdev/react';
import { MessageSquare } from 'lucide-react';

const VeltCommentBubbleWf = () => {
    return (
        <VeltCommentBubbleWireframe>
            <button
                className="oe-comment-bubble-button"
                aria-label="View comments"
            >
                <div className="oe-comment-bubble-content">
                    <div className='oe-relative'>
                        <MessageSquare className="oe-icon-sm" />
                    </div>
                    <VeltCommentBubbleWireframe.CommentsCount />
                </div>
            </button>
        </VeltCommentBubbleWireframe>
    );
};

export default VeltCommentBubbleWf;
