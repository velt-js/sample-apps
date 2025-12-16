import { VeltCommentBubbleWireframe, VeltIf } from '@veltdev/react';
import { MessageSquare } from 'lucide-react';

const VeltCommentBubbleWf = () => {
  return (
    <VeltCommentBubbleWireframe>
      <button
        className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 transition-colors"
        aria-label="View comments"
      >
        <VeltIf condition="{commentAnnotation.comments.length} > 0">
          <div className="flex items-center gap-1">
            <VeltCommentBubbleWireframe.CommentsCount />
            <MessageSquare className="w-5 h-5" />
          </div>
        </VeltIf>

        <VeltIf condition="{commentAnnotation.comments.length} === 0">
          <MessageSquare className="w-5 h-5" />
        </VeltIf>
      </button>
    </VeltCommentBubbleWireframe>
  );
};

export default VeltCommentBubbleWf;
