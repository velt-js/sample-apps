import {
  VeltButtonWireframe,
  VeltCommentDialogWireframe,
  VeltData,
  VeltIf,
  VeltInlineCommentsSectionWireframe,
} from '@veltdev/react';
import { ArrowheadRight, Close, MarkRead } from './Icons';

const VeltInlineActionComposerWf = () => {
  return (
    <VeltInlineCommentsSectionWireframe variant="action-inline-composer">
      <VeltInlineCommentsSectionWireframe.Panel>
        <VeltInlineCommentsSectionWireframe.List>
            <VeltCommentDialogWireframe>
                <VeltCommentDialogWireframe.Composer />
            </VeltCommentDialogWireframe>
        </VeltInlineCommentsSectionWireframe.List>
        <VeltInlineCommentsSectionWireframe.ComposerContainer />
      </VeltInlineCommentsSectionWireframe.Panel>
      <VeltInlineCommentsSectionWireframe.Skeleton />
    </VeltInlineCommentsSectionWireframe>
  );
};

export default VeltInlineActionComposerWf;
