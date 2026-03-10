import { VeltCommentDialogWireframe, VeltData } from "@veltdev/react";
import { AssigneeBannerWrapper, AssigneeBannerWrapperLeft, ResolveButtonText, AssigneeBannerWrapperRight, ResolveActionTooltip, ResolvedByNameTooltip, AssignedNameTooltip } from "./styled";
import { ResolveIcon, ResolvedIcon } from "./VeltIcons";

const VeltCommentDialogAssigneeBannerWf = () => {
    return (
        <VeltCommentDialogWireframe.AssigneeBanner>
            <AssigneeBannerWrapper className="privado-comment-dialog-assignee-banner-wrapper">
                <AssigneeBannerWrapperLeft className="privado-comment-dialog-assignee-banner-wrapper-left">
                    <VeltCommentDialogWireframe.AssigneeBanner.ResolveButton>
                        <ResolveIcon />
                        <ResolveButtonText className="privado-comment-dialog-assignee-banner-resolve-button-text">Resolve</ResolveButtonText>
                        <ResolveActionTooltip className="privado-resolve-action-tooltip">
                            Mark as resolved
                        </ResolveActionTooltip>
                    </VeltCommentDialogWireframe.AssigneeBanner.ResolveButton>
                    <VeltCommentDialogWireframe.AssigneeBanner.UnresolveButton>
                        <ResolvedIcon />
                        <ResolveButtonText className="privado-comment-dialog-assignee-banner-unresolve-button-text">Resolved by
                            <VeltData field="annotation.resolvedByUser.name" />
                        </ResolveButtonText>
                        <ResolvedByNameTooltip className="privado-resolved-by-name-tooltip">
                            <VeltData field="annotation.resolvedByUser.name" />
                        </ResolvedByNameTooltip>
                    </VeltCommentDialogWireframe.AssigneeBanner.UnresolveButton>
                </AssigneeBannerWrapperLeft>
                <AssigneeBannerWrapperRight className="privado-comment-dialog-assignee-banner-wrapper-right">
                    Assigned to <VeltData field="annotation.assignedTo.name" />
                </AssigneeBannerWrapperRight>
                <AssignedNameTooltip className="privado-assigned-name-tooltip">
                    <VeltData field="annotation.assignedTo.name" />
                </AssignedNameTooltip>
            </AssigneeBannerWrapper>
        </VeltCommentDialogWireframe.AssigneeBanner>
    );
};

export default VeltCommentDialogAssigneeBannerWf;