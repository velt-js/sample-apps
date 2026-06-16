'use client'

import { VeltCommentDialogWireframe, VeltData } from '@veltdev/react'

/**
 * Custom wireframe for the suggestion review dialog. It registers against the
 * `suggestion-mode-thread` variant, so any <VeltCommentThread
 * dialogVariant="suggestion-mode-thread" /> (see OpenSuggestionsPanel) renders
 * with this layout: a status line + Accept/Reject actions, then the thread card
 * and a composer for discussion.
 */
export default function VeltCommentDialogSuggestionModeWf() {
  return (
    <VeltCommentDialogWireframe variant="suggestion-mode-thread">
      <VeltCommentDialogWireframe.Body>
        <VeltCommentDialogWireframe.Threads>
          <VeltCommentDialogWireframe.ThreadCard>
            <div className="svf-suggestion-header">
              <span className="svf-suggestion-status">
                <VeltData field="annotation.suggestion.status" />
              </span>
              <VeltCommentDialogWireframe.SuggestionAction>
                <div className="svf-suggestion-actions">
                  <VeltCommentDialogWireframe.SuggestionAction.Accept />
                  <VeltCommentDialogWireframe.SuggestionAction.Reject />
                </div>
              </VeltCommentDialogWireframe.SuggestionAction>
            </div>

            <div className="svf-thread-card">
              <VeltCommentDialogWireframe.ThreadCard.Avatar />
              <div className="svf-thread-card-info">
                <div className="svf-thread-card-info-header">
                  <VeltCommentDialogWireframe.ThreadCard.Name />
                  <span className="svf-thread-card-time">
                    <VeltCommentDialogWireframe.ThreadCard.Time />
                  </span>
                  <VeltCommentDialogWireframe.ThreadCard.Options />
                </div>
                <VeltCommentDialogWireframe.ThreadCard.Message />
              </div>
            </div>
          </VeltCommentDialogWireframe.ThreadCard>
        </VeltCommentDialogWireframe.Threads>
      </VeltCommentDialogWireframe.Body>

      <VeltCommentDialogWireframe.Composer>
        <div className="svf-composer">
          <VeltCommentDialogWireframe.Composer.Input />
          <VeltCommentDialogWireframe.Composer.ActionButton type="submit">
            <span className="svf-composer-send">Send</span>
          </VeltCommentDialogWireframe.Composer.ActionButton>
        </div>
      </VeltCommentDialogWireframe.Composer>
    </VeltCommentDialogWireframe>
  )
}
