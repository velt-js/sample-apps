"use client";
import { VeltCommentBubbleWireframe } from '@veltdev/react';
import { CommentBubbleIcon } from './VeltIcons';

const VeltCommentBubbleWf = () => {
    return (
        // [Velt] Custom wireframe for comment bubble UI - shows when comments exist
        <VeltCommentBubbleWireframe>
            <div className="privado-comment-bubble-wrapper">
                <CommentBubbleIcon />
                <VeltCommentBubbleWireframe.CommentsCount />
            </div>
        </VeltCommentBubbleWireframe>
    );
};

export default VeltCommentBubbleWf;
