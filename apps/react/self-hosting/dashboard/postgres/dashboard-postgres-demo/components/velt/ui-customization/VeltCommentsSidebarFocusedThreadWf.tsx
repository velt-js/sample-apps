import { VeltCommentsSidebarWireframe, VeltData, VeltIf } from '@veltdev/react';
import { ArrowheadRight, Close, MarkRead } from './Icons';

const VeltCommentsSidebarFocusedThreadWf = () => {
  return (
    <VeltCommentsSidebarWireframe.FocusedThread>
      <div className="oe-comment-sidebar-header thread-header">
        <div className="oe-sidebar-header-left">
          <VeltCommentsSidebarWireframe.FocusedThread.BackButton>
            <div className="oe-btn-padding-sm">
              <ArrowheadRight width={16} height={16} />
            </div>
          </VeltCommentsSidebarWireframe.FocusedThread.BackButton>
          <div className="oe-comment-sidebar-header--title">Thread</div>
          <div className="oe-comment-sidebar-header--id">
            <VeltData field="focusedAnnotation.context.jobName" />
          </div>
        </div>
      </div>
      <div className="oe-comment--metadata-container thread-header">
        {/* <VeltIf condition="!{commentDialogSelected} && {focusedAnnotation.context.commentType} === 'jobLevel'">
              <div className="oe-comment--metadata">
                  <MarkRead width={16} height={16} />
                  <span className="oe-comment--metadata-label">Status:</span>
                  <span><VeltData field="focusedAnnotation.context.jobStatus" /></span>
                  <div className="oe-metadata-close">
                      <VeltCommentsSidebarWireframe.FocusedThread.BackButton>
                          <div className="oe-btn-padding-sm">
                              <Close width={16} height={16} />
                          </div>
                      </VeltCommentsSidebarWireframe.FocusedThread.BackButton>
                  </div>
              </div>
          </VeltIf> */}
        <VeltIf condition="!{commentDialogSelected} && {focusedAnnotation.context.commentType} === 'lineItem'">
            <div className="oe-comment--metadata">
              <MarkRead width={16} height={16} />
              <span className="oe-comment--metadata-label">Line:</span>
              <span>
                <VeltData field="focusedAnnotation.context.lineItemDescription" />
              </span>
              <div className="oe-metadata-close">
                <VeltCommentsSidebarWireframe.FocusedThread.BackButton>
                  <div className="oe-btn-padding-sm">
                    <Close width={16} height={16} />
                  </div>
                </VeltCommentsSidebarWireframe.FocusedThread.BackButton>
              </div>
            </div>
        </VeltIf>
      </div>
      <VeltCommentsSidebarWireframe.FocusedThread.DialogContainer />
    </VeltCommentsSidebarWireframe.FocusedThread>
  );
};

export default VeltCommentsSidebarFocusedThreadWf;
