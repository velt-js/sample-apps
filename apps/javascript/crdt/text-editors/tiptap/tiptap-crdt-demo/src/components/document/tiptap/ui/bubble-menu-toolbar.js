/**
 * Bubble Menu Toolbar Component
 *
 * Floating toolbar that appears when text is selected in the editor.
 */

import { createToolbarButton } from './toolbar-button.js';
import { createToolbarDivider } from './toolbar-divider.js';
import {
  imgTablerIconBold,
  imgTablerIconItalic,
  imgTablerIconStrikethrough,
  imgTablerIconUnderline,
} from '../constants.js';

/**
 * Create bubble menu toolbar
 * @param {Object} options - Toolbar options
 * @param {import('@tiptap/core').Editor} options.editor - TipTap editor instance
 * @param {Function} options.onAddComment - Callback for adding a comment
 * @returns {HTMLElement} - Bubble menu element
 */
export function createBubbleMenuToolbar({ editor, onAddComment }) {
  const toolbar = document.createElement('div');
  toolbar.className = 'bubble-menu bg-[rgb(34,34,34)] rounded-full p-[6px] shadow-[0_0_80px_rgba(0,0,0,1)] flex gap-[4px] items-center';

  const updateToolbar = () => {
    toolbar.innerHTML = '';

    // Text formatting group
    const formattingGroup = document.createElement('div');
    formattingGroup.className = 'content-stretch flex gap-[4px] items-center relative shrink-0';

    formattingGroup.appendChild(createToolbarButton({
      icon: imgTablerIconBold,
      alt: 'Bold',
      active: editor.isActive('bold'),
      onClick: () => editor.chain().focus().toggleBold().run(),
    }));

    formattingGroup.appendChild(createToolbarButton({
      icon: imgTablerIconItalic,
      alt: 'Italic',
      active: editor.isActive('italic'),
      onClick: () => editor.chain().focus().toggleItalic().run(),
    }));

    formattingGroup.appendChild(createToolbarButton({
      icon: imgTablerIconStrikethrough,
      alt: 'Strikethrough',
      active: editor.isActive('strike'),
      onClick: () => editor.chain().focus().toggleStrike().run(),
    }));

    formattingGroup.appendChild(createToolbarButton({
      icon: imgTablerIconUnderline,
      alt: 'Underline',
      active: editor.isActive('underline'),
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    }));

    toolbar.appendChild(formattingGroup);
    toolbar.appendChild(createToolbarDivider());

    // Comment button
    const commentButton = document.createElement('button');
    commentButton.className = 'flex items-center justify-center p-[6px] hover:bg-white/10 rounded-full transition-all cursor-pointer';
    commentButton.title = 'Add comment';
    commentButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white">
        <path
          d="M10 17.25H4C3.30964 17.25 2.75 16.6904 2.75 16V10C2.75 5.99594 5.99594 2.75 10 2.75C14.0041 2.75 17.25 5.99594 17.25 10C17.25 14.0041 14.0041 17.25 10 17.25Z"
          stroke-width="1.5"
        />
      </svg>
    `;

    // Use mousedown instead of click to preserve selection (per Velt docs)
    commentButton.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      onAddComment();
    });

    toolbar.appendChild(commentButton);
  };

  // Update toolbar when selection changes
  editor.on('selectionUpdate', updateToolbar);
  editor.on('transaction', updateToolbar);

  // Initial render
  updateToolbar();

  return toolbar;
}

