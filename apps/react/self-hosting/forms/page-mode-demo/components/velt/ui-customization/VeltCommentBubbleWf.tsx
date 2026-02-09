"use client";
import { VeltCommentBubbleWireframe } from '@veltdev/react';
import { CommentHasCommentsIcon } from './VeltIcons';
import { CommentToolWrapper, CommentToolTooltip } from './styled';

const VeltCommentBubbleWf = () => {
    return (
        // [Velt] Custom wireframe for comment bubble UI - shows when comments exist
        <VeltCommentBubbleWireframe>
            <CommentToolWrapper className="privado-comment-tool-wrapper">
                <span className="velt-comment-tool-has-comments-icon">
                    <CommentHasCommentsIcon />
                    <CommentToolTooltip className="velt-comment-tool-tooltip">View comments</CommentToolTooltip>
                </span>
                <VeltCommentBubbleWireframe.CommentsCount />
            </CommentToolWrapper>
        </VeltCommentBubbleWireframe>
    );
};

export default VeltCommentBubbleWf;
