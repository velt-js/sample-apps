"use client";
import { VeltCommentsSidebarWireframe } from '@veltdev/react';

const VeltCommentsSidebarHeaderWf = () => {
  return (
    <VeltCommentsSidebarWireframe.Header>
      <div className="flex items-center justify-between w-full px-4 py-3">
        <div className="flex items-center gap-2">
          <VeltCommentsSidebarWireframe.Search />
        </div>
        <div className="flex items-center gap-2">
          <VeltCommentsSidebarWireframe.Status />
          <VeltCommentsSidebarWireframe.MinimalFilterDropdown />
        </div>
      </div>
    </VeltCommentsSidebarWireframe.Header>
  );
};

export default VeltCommentsSidebarHeaderWf;
