"use client";
import { VeltCommentsSidebarWireframe } from '@veltdev/react';

const VeltCommentsSidebarFocusedThreadWf = () => {
  return (
    <VeltCommentsSidebarWireframe.FocusedThread>
      {/* Back Button to return to default view with all threads */}
      <div className="px-4 py-3">
        <VeltCommentsSidebarWireframe.FocusedThread.BackButton />
      </div>
      {/* Container that contains the focused comment dialog */}
      <div className="flex-1 overflow-auto">
        <VeltCommentsSidebarWireframe.FocusedThread.DialogContainer />
      </div>
    </VeltCommentsSidebarWireframe.FocusedThread>
  );
};

export default VeltCommentsSidebarFocusedThreadWf;
