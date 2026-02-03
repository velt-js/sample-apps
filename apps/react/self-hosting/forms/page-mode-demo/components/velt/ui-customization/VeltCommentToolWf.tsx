"use client";
import { VeltCommentToolWireframe, VeltData } from '@veltdev/react';
import { CommentNoCommentsIcon, CommentHasCommentsIcon } from './VeltIcons';

const VeltCommentToolWf = () => {
    return (
        // [Velt] Custom wireframe for comment tool - add new comment button
        <VeltCommentToolWireframe veltClass="'velt-comment-tool-wrapper-active': {activeCommentToolId} === {context.questionId}">
            <div className="privado-comment-tool-wrapper">
                <span className="velt-comment-tool-no-comments-icon">
                    <CommentNoCommentsIcon />
                    <span className="velt-comment-tool-tooltip">Add comment</span>
                </span>
                <span className="velt-comment-tool-has-comments-icon">
                    <CommentHasCommentsIcon />
                    <span className="velt-comment-tool-tooltip">View comments</span>
                </span>
                <VeltData field="questionCounts[context.questionId]" />
            </div>
        </VeltCommentToolWireframe>
    );
};

export default VeltCommentToolWf;
