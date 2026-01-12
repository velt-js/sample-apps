'use client';

import { VeltButtonWireframe, VeltCommentDialogWireframe, VeltData, VeltIf } from '@veltdev/react';
import {
  Checkmark,
  MoreHorizontal,
  MarkRead,
  Attach1,
  At,
  ArrowUp,
  IconOutlineCheckmarkCircle,
  IconOutlineRepeat,
  IconOutlineCloseCircle,
  IconFillEdit2Fill,
  IconOutlineMessageSquare
} from './Icons';

const VeltCommentDialogWf = () => {
  return (
    <VeltCommentDialogWireframe>
      <VeltCommentDialogWireframe.Body veltClass="'oe-disabled': {annotation.context.commentType} === 'action'">
        <VeltCommentDialogWireframe.Threads>
          <VeltCommentDialogWireframe.ThreadCard>
            <div className="oe-thread-card-wrapper">
              <div className="oe-thread-card-avatar">
                <VeltCommentDialogWireframe.ThreadCard.Avatar />
              </div>
              <div className="oe-thread-card-content">
                <div className="oe-thread-card-header">
                  <div className="oe-thread-card-info">
                    <div className="oe-thread-card--name">
                      <VeltData field="commentObj.from.name" />
                    </div>
                    <VeltCommentDialogWireframe.ThreadCard.Time />
                    <VeltCommentDialogWireframe.ThreadCard.Unread />
                  </div>
                  <div className="oe-thread-card-info oe--actions-container">
                    <VeltCommentDialogWireframe.ThreadCard.ReactionTool />
                    <VeltCommentDialogWireframe.ResolveButton>
                      <div className="oe--icon-button">
                        <Checkmark width={17.5} height={17.5} />
                      </div>
                    </VeltCommentDialogWireframe.ResolveButton>
                    <VeltCommentDialogWireframe.UnresolveButton>
                      <div className="oe--icon-button oe--unresolve-button">
                        <Checkmark width={17.5} height={17.5} />
                      </div>
                    </VeltCommentDialogWireframe.UnresolveButton>
                    <VeltCommentDialogWireframe.ThreadCard.Options>
                      <VeltCommentDialogWireframe.ThreadCard.Options.Trigger>
                        <div className="oe--icon-button">
                          <MoreHorizontal width={17.5} height={17.5} />
                        </div>
                      </VeltCommentDialogWireframe.ThreadCard.Options.Trigger>
                      <VeltCommentDialogWireframe.ThreadCard.Options.Content>
                        <div className="oe-thread-card--options-content">
                          <VeltCommentDialogWireframe.ThreadCard.Options.Content.MarkAsRead>
                            <div className="oe-thread-card--options-content-item">
                              <span>Mark as</span>
                              <VeltIf condition="{unread}">
                                <span>read</span>
                              </VeltIf>
                              <VeltIf condition="!{unread}">
                                <span>unread</span>
                              </VeltIf>
                            </div>
                          </VeltCommentDialogWireframe.ThreadCard.Options.Content.MarkAsRead>
                          <VeltCommentDialogWireframe.ThreadCard.Options.Content.Edit>
                            <div className="oe-thread-card--options-content-item">Edit comment</div>
                          </VeltCommentDialogWireframe.ThreadCard.Options.Content.Edit>
                          <VeltIf condition="!{commentDialogSelected}">
                            <VeltButtonWireframe id="reply-in-thread-button" type="button">
                              <div className="oe-thread-card--options-content-item">
                                Reply in thread
                              </div>
                            </VeltButtonWireframe>
                          </VeltIf>
                          <VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete veltIf="{annotation.from.userId} === {user.userId} || {commentObj.from.userId} === {user.userId}">
                            <VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete.Comment>
                              <div className="oe-thread-card--options-content-item">
                                Delete comment
                              </div>
                            </VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete.Comment>
                            <VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete.Thread>
                              <div className="oe-thread-card--options-content-item">
                                Delete thread
                              </div>
                            </VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete.Thread>
                          </VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete>
                        </div>
                      </VeltCommentDialogWireframe.ThreadCard.Options.Content>
                    </VeltCommentDialogWireframe.ThreadCard.Options>
                  </div>
                </div>
                <div className="oe-thread-card-body">
                  {/* <VeltIf condition="!{commentDialogSelected} && {annotation.context.commentType} === 'jobLevel'">
                    <div className="oe-comment--metadata">
                      <MarkRead width={16} height={16} />
                      <span className="oe-comment--metadata-label">Status:</span>
                      <span className="oe-comment--metadata-label"><VeltData field="annotation.context.jobStatus" /></span>
                    </div>
                  </VeltIf> */}
                  <VeltIf condition="!{commentDialogSelected} && {annotation.context.commentType} === 'lineItem'">
                    <div className="oe-comment--metadata">
                      <MarkRead width={16} height={16} />
                      <span className="oe-comment--metadata-label">Line:</span>
                      <span>
                        <VeltData field="annotation.context.lineItemDescription" />
                      </span>
                    </div>
                  </VeltIf>
                  {/* Highlight component corrosponding wireframe logic */}
                  <VeltIf condition="{annotation.context.highlightData.type} && {annotation.context.highlightData.label}">
                    <div className="oe-comment--metadata">
                      <VeltIf condition="{annotation.context.highlightData.type} === 'ApproverComment'">
                        <IconOutlineCheckmarkCircle width={16} height={16} />
                      </VeltIf>
                      <VeltIf condition="{annotation.context.highlightData.type} === 'SubmitToApprove'">
                        <IconOutlineCheckmarkCircle width={16} height={16} />
                      </VeltIf>
                      <VeltIf condition="{annotation.context.highlightData.type} === 'DisputeDiscrepancyComment'">
                        <IconOutlineRepeat width={16} height={16} />
                      </VeltIf>
                      <VeltIf condition="{annotation.context.highlightData.type} === 'RejectApprovalComment'">
                        <IconOutlineCloseCircle width={16} height={16} />
                      </VeltIf>
                      <VeltIf condition="{annotation.context.highlightData.type} === 'ApproveForDifferentAmount'">
                        <IconFillEdit2Fill width={16} height={16} />
                      </VeltIf>
                      <VeltIf condition="{annotation.context.highlightData.type} === 'LineItemComment'">
                        <IconOutlineMessageSquare width={16} height={16} />
                      </VeltIf>
                      <div className="oe-comment--metadata-label">
                        <VeltData field="annotation.context.highlightData.label" />
                      </div>
                    </div>
                  </VeltIf>
                  <VeltCommentDialogWireframe.ThreadCard.Message />
                  <VeltCommentDialogWireframe.ThreadCard.Attachments />
                  <VeltCommentDialogWireframe.ThreadCard.Reactions veltIf="{editCommentIndex} !== {i}" />
                </div>
              </div>
            </div>
          </VeltCommentDialogWireframe.ThreadCard>
        </VeltCommentDialogWireframe.Threads>
        <VeltIf condition="!{commentDialogSelected} && {annotation.comments.length} > 1">
          <div className="oe-reply-section">
            <VeltCommentDialogWireframe.ReplyAvatars veltIf="!{commentDialogSelected}" />
            <VeltCommentDialogWireframe.ToggleReply />
          </div>
        </VeltIf>
      </VeltCommentDialogWireframe.Body>
      <div className="oe-composer--metadata">
        <VeltIf condition="{commentDialogSelected} && !{pageModeComposer} && {annotation.context.commentType} === 'jobLevel' && {annotation.from.name} && {annotation.from.name} !== {user.name}">
          <div className="oe-composer--focused-thread-metadata-item">
            <div>Replying to</div>
            <VeltData field="annotation.from.name" />
          </div>
        </VeltIf>
        <VeltIf condition="{pageModeComposer}">
          <div className="oe-composer--page-mode-metadata-item">
            <div>Comment</div>
          </div>
        </VeltIf>
        <VeltIf condition="{annotation.context} && {commentDialogSelected} && !{pageModeComposer} && (!{annotation.from.name} || {annotation.from.name} === {user.name})">
          <div className="oe-composer--focused-thread-metadata-item">
            <div>Comment on line</div>
            "
            <VeltData field="annotation.context.lineItemDescription" />
            "
          </div>
        </VeltIf>
        <VeltIf condition="!{annotation.context} && {commentDialogSelected} && !{pageModeComposer} && (!{annotation.from.name} || {annotation.from.name} === {user.name})">
          <div className="oe-composer--focused-thread-metadata-item">
            <div>Comment on line</div>
            "
            <VeltData field="context.lineItemDescription" />
            "
          </div>
        </VeltIf>
      </div>
      <VeltCommentDialogWireframe.Composer veltClass="'oe-disabled': {annotation.context.commentType} === 'action'">
        <div className="oe-composer--content oe-composer-wrapper">
          <div className="oe-composer-input-section">
            <VeltCommentDialogWireframe.Composer.Attachments />
            <VeltCommentDialogWireframe.Composer.Input />
          </div>
          <div className="oe-composer-actions">
            <div className="oe-composer-actions-group">
              {/* <VeltCommentDialogWireframe.Composer.ActionButton type="attachments">
                <div className="oe-composer--icon-button">
                  <Attach1 width={18} height={18} />
                </div>
              </VeltCommentDialogWireframe.Composer.ActionButton> */}
              <VeltCommentDialogWireframe.Composer.ActionButton type="userMentions">
                <div className="oe-composer--icon-button">
                  <At width={18} height={18} />
                </div>
              </VeltCommentDialogWireframe.Composer.ActionButton>
            </div>
            <div className="oe-composer-actions-group">
              <VeltCommentDialogWireframe.Composer.ActionButton type="submit">
                <div className="oe-composer--icon-button">
                  <ArrowUp width={18} height={18} />
                </div>
              </VeltCommentDialogWireframe.Composer.ActionButton>
            </div>
          </div>
        </div>
      </VeltCommentDialogWireframe.Composer>
    </VeltCommentDialogWireframe>
  );
};

export default VeltCommentDialogWf;
