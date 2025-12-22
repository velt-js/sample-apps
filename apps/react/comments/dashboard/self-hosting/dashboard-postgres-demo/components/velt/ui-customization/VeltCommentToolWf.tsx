"use client";
import { VeltCommentToolWireframe } from '@veltdev/react';
import { MessageSquare } from 'lucide-react';

const VeltCommentToolWf = () => {
  return (
    <VeltCommentToolWireframe>
      <button
        className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 transition-colors"
        aria-label="Add comment"
      >
        <MessageSquare className="w-5 h-5" />
      </button>
    </VeltCommentToolWireframe>
  );
};

export default VeltCommentToolWf;
