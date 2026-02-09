"use client";
import { VeltConfirmDialogWireframe } from '@veltdev/react';
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
                    <VeltConfirmDialogWireframe.Title />
                    <VeltConfirmDialogWireframe.Message />
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
        </VeltConfirmDialogWireframe>
    );
};

export default VeltConfirmDialogWf;
