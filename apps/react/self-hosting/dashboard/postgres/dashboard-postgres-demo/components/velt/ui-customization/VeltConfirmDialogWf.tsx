import { VeltConfirmDialogWireframe } from '@veltdev/react';
import { Close } from './Icons';

const VeltConfirmDialogWf = () => {
  return (
    <VeltConfirmDialogWireframe>
      <div className="oe-confirm-dialog-close-button">
        <VeltConfirmDialogWireframe.RejectButton>
          <Close width={20} height={20} />
        </VeltConfirmDialogWireframe.RejectButton>
      </div>
      <VeltConfirmDialogWireframe.Title>
        <div className="oe-confirm-dialog-title">Delete Comment?</div>
      </VeltConfirmDialogWireframe.Title>
      <VeltConfirmDialogWireframe.Message>
        <div>This action cannot be undone.</div>
        {/* <div>Documents uploaded while commenting will not be deleted when the comment is deleted. Go to the job Details tab, Documents section to manage documents.</div> */}
      </VeltConfirmDialogWireframe.Message>
      <div className="oe-confirm-dialog-buttons">
        <VeltConfirmDialogWireframe.RejectButton>
          <div className="oe-confirm-dialog-cancel-button">Cancel</div>
        </VeltConfirmDialogWireframe.RejectButton>
        <VeltConfirmDialogWireframe.ApproveButton>
          <div className="oe-confirm-dialog-delete-button">Delete Comment</div>
        </VeltConfirmDialogWireframe.ApproveButton>
      </div>
    </VeltConfirmDialogWireframe>
  );
};

export default VeltConfirmDialogWf;
