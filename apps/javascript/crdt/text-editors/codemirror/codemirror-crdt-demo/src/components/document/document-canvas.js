/**
 * Document Canvas Component
 *
 * Vanilla JS port of the React DocumentCanvas component.
 * Main layout container with file tree, breadcrumbs, and editor area.
 */

import { createSidebar } from '../sidebar/sidebar.js';
import { createHeader } from '../header/header.js';

// File type icon SVGs
function createFolderIconSvg(color = '#dcb67a') {
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M14.5 3H7.71L6.85 2.15C6.76 2.06 6.64 2 6.5 2H1.5C1.22 2 1 2.22 1 2.5V13.5C1 13.78 1.22 14 1.5 14H14.5C14.78 14 15 13.78 15 13.5V3.5C15 3.22 14.78 3 14.5 3Z" fill="${color}" />
  </svg>`;
}

function createFileIconSvg(color = '#858585') {
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M9.5 1H3.5C3.22 1 3 1.22 3 1.5V14.5C3 14.78 3.22 15 3.5 15H12.5C12.78 15 13 14.78 13 14.5V4.5L9.5 1Z" fill="${color}" />
    <path d="M9.5 1V4.5H13" stroke="${color}" stroke-width="0.5" opacity="0.5" />
  </svg>`;
}

const chevronRightSvg = `<svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
  <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" fill="none" />
</svg>`;

const chevronDownSvg = `<svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" fill="none" />
</svg>`;

/**
 * Create a file tree item
 * @param {string} name - File/folder name
 * @param {string} icon - Icon HTML
 * @param {boolean} isSelected - Is item selected
 * @param {boolean} hasChevron - Show chevron
 * @param {string} chevronType - 'right' or 'down'
 * @param {number} indent - Indentation level
 * @returns {string} - HTML string
 */
function createFileTreeItem(name, icon, isSelected = false, hasChevron = false, chevronType = 'right', indent = 0) {
  const baseClass = 'flex items-center gap-1 px-2 py-0.5 cursor-pointer';
  const selectedClass = isSelected
    ? 'bg-[rgba(255,255,255,0.06)] border border-[#0070f3] rounded-[6px]'
    : 'hover:bg-[#2a2d2e]';
  const textClass = isSelected ? 'font-semibold' : 'opacity-80';
  const paddingLeft = indent > 0 ? `pl-${indent * 4}` : '';

  return `
    <div class="${baseClass} ${selectedClass} ${paddingLeft}">
      ${hasChevron ? (chevronType === 'down' ? chevronDownSvg : chevronRightSvg) : '<span class="w-[10px]"></span>'}
      ${icon}
      <span class="${textClass}">${name}</span>
    </div>
  `;
}

/**
 * Create the Document Canvas component
 * @param {HTMLElement} container - Container element to mount into
 * @param {Object} options - Options including createEditor callback
 * @returns {Object} - Component API with el and destroy methods
 */
export function createDocumentCanvas(container, options = {}) {
  const { createEditor } = options;

  const root = document.createElement('div');
  root.className = 'w-full h-screen relative flex';

  // Create header placeholder (will be populated with Velt tools)
  const headerContainer = document.createElement('div');
  root.appendChild(headerContainer);

  // Main content area
  const mainContent = document.createElement('div');
  mainContent.className = 'relative flex-1 overflow-hidden flex';

  // Sidebar container
  const sidebarContainer = document.createElement('div');
  sidebarContainer.className = 'h-full flex-shrink-0';
  mainContent.appendChild(sidebarContainer);

  // File Tree Section
  const fileTree = document.createElement('div');
  fileTree.className = 'bg-[#1e1e1e] w-[291px] h-full flex-shrink-0 overflow-y-auto';
  fileTree.innerHTML = `
    <!-- Search Box -->
    <div class="bg-[rgba(255,255,255,0.06)] box-border flex gap-[8px] items-center m-[10px] p-[8px] rounded-[8px]">
      <div class="relative shrink-0 size-[14px]">
        <img alt="" class="block max-w-none size-full" src="/figma-assets/icon-search.svg" />
      </div>
      <p class="font-['Inter',sans-serif] font-normal leading-none not-italic opacity-[0.32] relative shrink-0 text-[13px] text-nowrap text-white whitespace-pre">
        Search Files
      </p>
    </div>

    <!-- File Tree -->
    <div class="text-[13px] font-['Inter',sans-serif] text-white px-2 pt-2">
      ${createFileTreeItem('angular', createFolderIconSvg('#f14c4c'), false, true, 'right')}
      ${createFileTreeItem('cursor', createFolderIconSvg('#8b8b8b'), false, true, 'right')}
      ${createFileTreeItem('vscode', createFolderIconSvg('#559fd7'), false, true, 'right')}
      ${createFileTreeItem('dist', createFolderIconSvg('#dcb67a'), false, true, 'right')}
      ${createFileTreeItem('node_modules', createFolderIconSvg('#dcb67a'), false, true, 'right')}
      ${createFileTreeItem('src', createFolderIconSvg('#dcb67a'), false, true, 'down')}

      <!-- src children -->
      <div class="pl-4">
        ${createFileTreeItem('app', createFolderIconSvg('#f14c4c'))}
        ${createFileTreeItem('assets', createFolderIconSvg('#dcb67a'))}
        ${createFileTreeItem('content-script-isolated.js', createFileIconSvg('#f1e05a'))}
        ${createFileTreeItem('content-script-main.js', createFileIconSvg('#f1e05a'))}
        ${createFileTreeItem('content-sdk-detector.js', createFileIconSvg('#f1e05a'))}
        ${createFileTreeItem('default-popup.html', createFileIconSvg('#e34c26'))}
        ${createFileTreeItem('detect-sdk.js', createFileIconSvg('#f1e05a'))}
        ${createFileTreeItem('devtools.html', createFileIconSvg('#e34c26'))}
        ${createFileTreeItem('devtools.js', createFileIconSvg('#f1e05a'))}
        ${createFileTreeItem('favicon.ico', createFileIconSvg('#f1e05a'))}
        ${createFileTreeItem('index.html', createFileIconSvg('#e34c26'))}
        ${createFileTreeItem('main.ts', createFileIconSvg('#3178c6'))}
        ${createFileTreeItem('manifest.json', createFileIconSvg('#cbcb41'))}
        ${createFileTreeItem('popup-velt.html', createFileIconSvg('#e34c26'))}
        ${createFileTreeItem('api.ts', createFileIconSvg('#3178c6'), true)}
      </div>

      <!-- Root files -->
      ${createFileTreeItem('.editorconfig', createFileIconSvg('#858585'))}
      ${createFileTreeItem('.gitignore', createFileIconSvg('#858585'))}
      ${createFileTreeItem('angular.json', createFileIconSvg('#cbcb41'))}
      ${createFileTreeItem('observations.md', createFileIconSvg('#519aba'))}
      ${createFileTreeItem('package-lock.json', createFileIconSvg('#cbcb41'))}
      ${createFileTreeItem('package.json', createFileIconSvg('#cbcb41'))}
      ${createFileTreeItem('README.md', createFileIconSvg('#519aba'))}
      ${createFileTreeItem('tsconfig.app.json', createFileIconSvg('#3178c6'))}
      ${createFileTreeItem('tsconfig.json', createFileIconSvg('#3178c6'))}
    </div>
  `;
  mainContent.appendChild(fileTree);

  // Main Canvas Content
  const mainCanvas = document.createElement('div');
  mainCanvas.className = 'bg-black relative flex-1 px-[16px]';
  mainCanvas.innerHTML = `
    <!-- Breadcrumb Section -->
    <div class="absolute contents left-[32px] top-[6.5px]">
      <div class="absolute content-stretch flex gap-[12px] items-center left-[32px] top-[14px]">
        <p class="font-['Inter',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[13px] text-nowrap text-white whitespace-pre">
          Photographer website
        </p>
        <div class="relative shrink-0 size-[8px]">
          <img alt="" class="block max-w-none size-full" src="/figma-assets/ellipse-dot.svg" />
        </div>
        <div class="content-stretch flex gap-[4px] items-center relative shrink-0">
          <p class="font-['Inter',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[13px] text-nowrap text-white whitespace-pre">
            v1
          </p>
          <div class="relative shrink-0 size-[14px]">
            <img alt="" class="block max-w-none size-full" src="/figma-assets/icon-chevron-right.svg" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Container Border -->
    <div class="absolute border-2 border-[#121212] border-solid h-[720px] left-[16px] right-[16px] rounded-[12px] top-[56px]"></div>

    <!-- Code Editor Area - CodeMirror CRDT -->
    <div id="codemirror-container" class="absolute h-[680px] left-[16px] top-[94px] right-[16px] overflow-hidden"></div>

    <!-- File Path Breadcrumb -->
    <div class="absolute content-stretch flex gap-[12px] items-center left-[32px] top-[68px]">
      <p class="font-['Inter',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[13px] text-nowrap text-white whitespace-pre">
        src
      </p>
      <div class="relative shrink-0 size-[14px]">
        <img alt="" class="block max-w-none size-full" src="/figma-assets/icon-chevron-right-white.svg" />
      </div>
      <p class="font-['Inter',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[13px] text-nowrap text-white whitespace-pre">
        api.ts
      </p>
    </div>

    <!-- Code/Preview Toggle -->
    <div class="absolute border border-[rgba(255,255,255,0.08)] border-solid box-border content-stretch flex gap-[2px] items-center left-1/2 -translate-x-1/2 p-[2px] rounded-[4px] top-[13px]">
      <div class="bg-[rgba(255,255,255,0.08)] box-border content-stretch flex gap-[10px] items-center p-[4px] relative rounded-[4px] shrink-0">
        <div class="relative shrink-0 size-[20px]">
          <img alt="" class="block max-w-none size-full" src="/figma-assets/icon-code.svg" />
        </div>
      </div>
      <div class="box-border content-stretch flex gap-[10px] items-center p-[4px] relative rounded-[4px] shrink-0">
        <div class="relative shrink-0 size-[20px]">
          <img alt="" class="block max-w-none size-full" src="/figma-assets/icon-device-desktop.svg" />
        </div>
      </div>
    </div>

    <!-- Horizontal Line -->
    <div class="absolute h-0 left-[16px] right-[16px] top-[94px]">
      <div class="absolute bottom-0 left-0 right-0 top-[-2px]">
        <img alt="" class="block max-w-none size-full" src="/figma-assets/line-9.svg" />
      </div>
    </div>

    <!-- Copy/Download Actions -->
    <div class="absolute content-stretch flex gap-[4px] items-center right-[16px] top-[63px]">
      <div class="box-border content-stretch flex gap-[10px] items-center p-[4px] relative shrink-0">
        <div class="relative shrink-0 size-[14px]">
          <img alt="" class="block max-w-none size-full" src="/figma-assets/icon-copy.svg" />
        </div>
      </div>
      <div class="box-border content-stretch flex gap-[10px] items-center p-[4px] relative shrink-0">
        <div class="relative shrink-0 size-[14px]">
          <img alt="" class="block max-w-none size-full" src="/figma-assets/icon-download.svg" />
        </div>
      </div>
    </div>
  `;
  mainContent.appendChild(mainCanvas);

  root.appendChild(mainContent);
  container.appendChild(root);

  // Create child components
  const header = createHeader(root);
  const sidebar = createSidebar(sidebarContainer);

  // Get editor container for CodeMirror
  const editorContainer = mainCanvas.querySelector('#codemirror-container');

  // Create editor if callback provided
  let editorInstance = null;
  if (createEditor && editorContainer) {
    editorInstance = createEditor(editorContainer);
  }

  return {
    el: root,
    editorContainer,
    header,
    sidebar,
    destroy() {
      if (editorInstance && editorInstance.destroy) {
        editorInstance.destroy();
      }
      header.destroy();
      sidebar.destroy();
      root.remove();
    },
  };
}
