"use client";
import { VeltCommentBubbleWireframe, VeltData } from '@veltdev/react';
import { CommentBubbleIcon, CommentHasCommentsIcon, CommentNoCommentsIcon } from './VeltIcons';

const VeltCommentBubbleWf = () => {
    return (
        // [Velt] Custom wireframe for comment bubble UI - shows when comments exist
        <VeltCommentBubbleWireframe>
            <div className="privado-comment-tool-wrapper">
                <span className="velt-comment-tool-has-comments-icon">
                    <CommentHasCommentsIcon />
                    <span className="velt-comment-tool-tooltip">View comments</span>
                </span>
                <VeltCommentBubbleWireframe.CommentsCount />
            </div>
        </VeltCommentBubbleWireframe>
    );
};

export default VeltCommentBubbleWf;
