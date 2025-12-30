"use client";
import { VeltCommentToolWireframe } from '@veltdev/react';
import { MessageSquare } from 'lucide-react';

const VeltCommentToolWf = () => {
  return (
    <VeltCommentToolWireframe>
      <button
        className="oe-comment-bubble-button"
        aria-label="Add comment"
      >
        <MessageSquare className="oe-icon-sm" />
      </button>
    </VeltCommentToolWireframe>
  );
};

export default VeltCommentToolWf;
