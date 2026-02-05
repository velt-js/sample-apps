"use client";
import { VeltCommentToolWireframe } from '@veltdev/react';
import { CommentNoCommentsIcon } from './VeltIcons';
import { CommentToolWrapper, CommentToolTooltip } from './styled';

const VeltCommentToolWf = () => {
    return (
        // [Velt] Custom wireframe for comment tool - add new comment button
        <VeltCommentToolWireframe veltClass="'velt-comment-tool-wrapper-active': {activeCommentToolId} === {context.questionId}">
            <CommentToolWrapper className="privado-comment-tool-wrapper">
                <span className="velt-comment-tool-no-comments-icon">
                    <CommentNoCommentsIcon />
                    <CommentToolTooltip className="velt-comment-tool-tooltip">Add comment</CommentToolTooltip>
                </span>
            </CommentToolWrapper>
        </VeltCommentToolWireframe>
    );
};

export default VeltCommentToolWf;
