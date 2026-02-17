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
                        <div className="oe-composer--metadata">
                            <VeltIf condition="{annotation.context} && {commentDialogSelected} && {inlineCommentSectionMode}">
                                <div className="oe-composer--popover-metadata-item">
                                    <div>Comment on line</div>
                                    "
                                    <VeltData field="annotation.context.lineItemDescription" />"
                                </div>
                            </VeltIf>
                            <VeltIf condition="!{annotation.context} && {commentDialogSelected} && {inlineCommentSectionMode}">
                                <div className="oe-composer--popover-metadata-item">
                                    <div>Comment on line</div>
                                    "<VeltData field="context.lineItemDescription" />"
                                </div>
                            </VeltIf>
                        </div>
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
