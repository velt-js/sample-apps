import React, { useState } from 'react';
import CodeMirrorComponent from './codemirror';

interface Tab {
  id: string;
  filename: string;
  fileType: 'html' | 'css' | 'javascript' | 'typescript';
  content?: string;
}

const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case 'html':
      return '🌐';
    case 'css':
      return '🎨';
    case 'javascript':
      return '📜';
    case 'typescript':
      return '📘';
    default:
      return '📄';
  }
};

function CodeEditorTabs() {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'index.html',
      filename: 'index.html',
      fileType: 'html',
    },
    {
      id: 'index.css',
      filename: 'index.css',
      fileType: 'css',
    },
    {
      id: 'index.js',
      filename: 'index.js',
      fileType: 'javascript',
    }
  ]);

  const [activeTabId, setActiveTabId] = useState<string>('index.html');

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
  };

  const handleTabClose = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    // If closing the active tab, switch to the first available tab
    if (activeTabId === tabId && newTabs.length > 0) {
      setActiveTabId(newTabs[0].id);
    }
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <div className="editor-tabs-container">
      {/* Tab Bar */}
      <div className="tab-bar">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTabId === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            <span className="tab-icon">{getFileIcon(tab.fileType)}</span>
            <span className="tab-filename">{tab.filename}</span>
            <button
              className="tab-close"
              onClick={(e) => handleTabClose(tab.id, e)}
              aria-label={`Close ${tab.filename}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Editor Content */}
      <div className="editor-content">
        {activeTab && (
          <CodeMirrorComponent
            key={activeTab.id} // This forces React to create a new instance when tab changes
            editorId={activeTab.id}
            fileType={activeTab.fileType}
          />
        )}
      </div>
    </div>
  );
}

export default CodeEditorTabs;