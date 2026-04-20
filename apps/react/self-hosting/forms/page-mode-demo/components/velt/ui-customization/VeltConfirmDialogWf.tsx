"use client";
import { VeltConfirmDialogWireframe, VeltIf } from '@veltdev/react';
import {
    ConfirmDialogWrapper,
    ConfirmDialogContent,
    ConfirmDialogCloseButton,
    ConfirmDialogRejectButton,
    ConfirmDialogButtons
} from './styled';
import { ConfirmDialogCloseIcon } from './VeltIcons';

const VeltConfirmDialogWf = () => {
    return (
        // [Velt] Custom wireframe for confirm dialog
        <VeltConfirmDialogWireframe>
            <ConfirmDialogWrapper>
                <ConfirmDialogContent>
                    <VeltConfirmDialogWireframe.Title>
                        <div className="oe-confirm-delete-title--comment">
                            <span>Delete Comment?</span>
                        </div>
                        <div className="oe-confirm-delete-title--reply">
                            <span>Delete Reply?</span>
                        </div>
                    </VeltConfirmDialogWireframe.Title>
                    <VeltConfirmDialogWireframe.Message>
                        <div className="oe-confirm-delete-message--comment">
                            <span>This will delete entire thread.</span>
                        </div>
                        <div className="oe-confirm-delete-message--reply">
                            <span>This will delete specific reply.</span>
                        </div>
                    </VeltConfirmDialogWireframe.Message>
                    <ConfirmDialogCloseButton>
                        <VeltConfirmDialogWireframe.RejectButton>
                            <ConfirmDialogRejectButton>
                                <ConfirmDialogCloseIcon />
                            </ConfirmDialogRejectButton>
                        </VeltConfirmDialogWireframe.RejectButton>
                    </ConfirmDialogCloseButton>
                </ConfirmDialogContent>
                <ConfirmDialogButtons>
                    <VeltConfirmDialogWireframe.RejectButton />
                    <VeltConfirmDialogWireframe.ApproveButton />
                </ConfirmDialogButtons>
            </ConfirmDialogWrapper>
        </VeltConfirmDialogWireframe >
    );
};

export default VeltConfirmDialogWf;
