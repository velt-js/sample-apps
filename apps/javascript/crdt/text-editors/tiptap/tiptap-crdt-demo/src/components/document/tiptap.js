/**
 * TipTap Editor Component with Velt CRDT
 *
 * Vanilla JS port using createVeltTipTapStore from @veltdev/tiptap-crdt for real-time collaboration.
 */

import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import { Mark, mergeAttributes } from '@tiptap/core';
import { createVeltTipTapStore } from '@veltdev/tiptap-crdt';

// Initial content for the editor - same as React version
const initialContent = `
<p><span data-heading="h1">Attention Is All You Need</span></p>
<p>Ashish Vaswani <br>
Google Brain avaswani@google.com <br>
Noam Shazeer <br>
Google Brain noam@google.com <br>
Niki Parmar <br>
Google Research nikip@google.com <br>
Jakob Uszkoreit <br>
Google Research usz@google.com <br>
Llion Jones <br>
Google Research llion@google.com <br>
Aidan N. Gomez <br>
University of Toronto aidan@cs.toronto.edu <br>
Łukasz Kaiser <br>
Google Brain lukaszkaiser@google.com <br>
Illia Polosukhin <br>
illia.polosukhin@gmail.com <br>
<br>
Equal contribution. Listing order is random. Jakob proposed replacing RNNs with self-attention and started the effort to evaluate this idea. Ashish, with Illia, designed and implemented the first Transformer models and has been crucially involved in every aspect of this work. Noam proposed scaled dot-product attention, multi-head attention and the parameter-free position representation and became the other person involved in nearly every detail. Niki designed, implemented, tuned and evaluated countless model variants in our original codebase and tensor2tensor. Llion also experimented with novel model variants, was responsible for our initial codebase, and efficient inference and visualizations. Lukasz and Aidan spent countless long days designing various parts of and implementing tensor2tensor, replacing our earlier codebase, greatly improving results and massively accelerating our research. Work performed while at Google Brain.Work performed while at Google Research.</p>

<p><span data-heading="h2">Abstract</span></p>
<p>The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data.</p>

<p><span data-heading="h2">Introduction</span></p>
<p>Recurrent neural networks, long short-term memory and gated recurrent neural networks in particular, have been firmly established as state of the art approaches in sequence modeling and transduction problems such as language modeling and machine translation. Numerous efforts have since continued to push the boundaries of recurrent language models and encoder-decoder architectures.</p>
<p>Recurrent models typically factor computation along the symbol positions of the input and output sequences. Aligning the positions to steps in computation time, they generate a sequence of hidden states ht, as a function of the previous hidden state ht−1 and the input for position t. This inherently sequential nature precludes parallelization within training examples, which becomes critical at longer sequence lengths, as memory constraints limit batching across examples. Recent work has achieved significant improvements in computational efficiency through factorization tricks and conditional computation, while also improving model performance in case of the latter. The fundamental constraint of sequential computation, however, remains.</p>
<p>Attention mechanisms have become an integral part of compelling sequence modeling and transduction models in various tasks, allowing modeling of dependencies without regard to their distance in the input or output sequences. In all but a few cases, however, such attention mechanisms are used in conjunction with a recurrent network.</p>
<p>In this work we propose the Transformer, a model architecture eschewing recurrence and instead relying entirely on an attention mechanism to draw global dependencies between input and output. The Transformer allows for significantly more parallelization and can reach a new state of the art in translation quality after being trained for as little as twelve hours on eight P100 GPUs.</p>

<p><span data-heading="h2">Background</span></p>
<p>The goal of reducing sequential computation also forms the foundation of the Extended Neural GPU, ByteNet and ConvS2S, all of which use convolutional neural networks as basic building block, computing hidden representations in parallel for all input and output positions. In these models, the number of operations required to relate signals from two arbitrary input or output positions grows in the distance between positions, linearly for ConvS2S and logarithmically for ByteNet. This makes it more difficult to learn dependencies between distant positions. In the Transformer this is reduced to a constant number of operations, albeit at the cost of reduced effective resolution due to averaging attention-weighted positions, an effect we counteract with Multi-Head Attention as described in section 3.2.</p>
<p>Self-attention, sometimes called intra-attention is an attention mechanism relating different positions of a single sequence in order to compute a representation of the sequence. Self-attention has been used successfully in a variety of tasks including reading comprehension, abstractive summarization, textual entailment and learning task-independent sentence representations.</p>
<p>End-to-end memory networks are based on a recurrent attention mechanism instead of sequence-aligned recurrence and have been shown to perform well on simple-language question answering and language modeling tasks.</p>
<p>To the best of our knowledge, however, the Transformer is the first transduction model relying entirely on self-attention to compute representations of its input and output without using sequence-aligned RNNs or convolution. In the following sections, we will describe the Transformer, motivate self-attention and discuss its advantages over models such as neural GPU and convolutional sequence to sequence models.</p>

<p><span data-heading="h2">Model Architecture</span></p>
<p>Most competitive neural sequence transduction models have an encoder-decoder structure. Here, the encoder maps an input sequence of symbol representations (x₁, ..., xₙ) to a sequence of continuous representations z = (z₁, ..., zₙ). Given z, the decoder then generates an output sequence (y₁, ..., yₘ) of symbols one element at a time. At each step the model is auto-regressive, consuming the previously generated symbols as additional input when generating the next.</p>
<p>The Transformer follows this overall architecture using stacked self-attention and point-wise, fully connected layers for both the encoder and decoder, shown in the left and right halves of Figure 1, respectively.</p>

<p><span data-heading="h3">Encoder and Decoder Stacks</span></p>
<p><strong>Encoder:</strong> The encoder is composed of a stack of N = 6 identical layers. Each layer has two sub-layers. The first is a multi-head self-attention mechanism, and the second is a simple, position-wise fully connected feed-forward network. We employ a residual connection around each of the two sub-layers, followed by layer normalization. That is, the output of each sub-layer is LayerNorm(x + Sublayer(x)), where Sublayer(x) is the function implemented by the sub-layer itself. To facilitate these residual connections, all sub-layers in the model, as well as the embedding layers, produce outputs of dimension d_model = 512.</p>
<p><strong>Decoder:</strong> The decoder is also composed of a stack of N = 6 identical layers. In addition to the two sub-layers in each encoder layer, the decoder inserts a third sub-layer, which performs multi-head attention over the output of the encoder stack. Similar to the encoder, we employ residual connections around each of the sub-layers, followed by layer normalization. We also modify the self-attention sub-layer in the decoder stack to prevent positions from attending to subsequent positions. This masking, combined with fact that the output embeddings are offset by one position, ensures that the predictions for position i can depend only on the known outputs at positions less than i.</p>

<p><span data-heading="h2">Why Self-Attention</span></p>
<p>In this section we compare various aspects of self-attention layers to the recurrent and convolutional layers commonly used for mapping one variable-length sequence of symbol representations (x₁, ..., xₙ) to another sequence of equal length (z₁, ..., zₙ), with xᵢ, zᵢ ∈ Rᵈ, such as a hidden layer in a typical sequence transduction encoder or decoder. Motivating our use of self-attention we consider three desiderata.</p>
<p>One is the total computational complexity per layer. Another is the amount of computation that can be parallelized, as measured by the minimum number of sequential operations required.</p>
<p>The third is the path length between long-range dependencies in the network. Learning long-range dependencies is a key challenge in many sequence transduction tasks. One key factor affecting the ability to learn such dependencies is the length of the paths forward and backward signals have to traverse in the network. The shorter these paths between any combination of positions in the input and output sequences, the easier it is to learn long-range dependencies. Hence we also compare the maximum path length between any two input and output positions in networks composed of the different layer types.</p>

<p><span data-heading="h2">Training</span></p>
<p>This section describes the training regime for our models.</p>

<p><span data-heading="h2">Results</span></p>
<p>On the WMT 2014 English-to-German translation task, the big transformer model outperforms the best previously reported models (including ensembles) by more than 2.0 BLEU, establishing a new state-of-the-art BLEU score of 28.4. Training took 3.5 days on 8 P100 GPUs. Even our base model surpasses all previously published models and ensembles, at a fraction of the training cost of any of the competitive models.</p>

<p><span data-heading="h2">Conclusion</span></p>
<p>In this work, we presented the Transformer, the first sequence transduction model based entirely on attention, replacing the recurrent layers most commonly used in encoder-decoder architectures with multi-headed self-attention.</p>
<p>For translation tasks, the Transformer can be trained significantly faster than architectures based on recurrent or convolutional layers. On both WMT 2014 English-to-German and WMT 2014 English-to-French translation tasks, we achieve a new state of the art. In the former task our best model outperforms even all previously reported ensembles.</p>
<p>We are excited about the future of attention-based models and plan to apply them to other tasks. We plan to extend the Transformer to problems involving input and output modalities other than text and to investigate local, restricted attention mechanisms to efficiently handle large inputs and outputs such as images, audio and video. Making generation less sequential is another research goals of ours.</p>

<p><span data-heading="h2">References</span></p>
<p><strong>[1]</strong> Jimmy Lei Ba, Jamie Ryan Kiros, and Geoffrey E Hinton. Layer normalization. arXiv preprint arXiv:1607.06450, 2016.</p>
<p><strong>[2]</strong> Dzmitry Bahdanau, Kyunghyun Cho, and Yoshua Bengio. Neural machine translation by jointly learning to align and translate. CoRR, abs/1409.0473, 2014.</p>
`;

// Icon paths for toolbar
const imgTablerIconBold = '/icons/bold.svg';
const imgTablerIconItalic = '/icons/italic.svg';
const imgTablerIconStrikethrough = '/icons/strikethrough.svg';
const imgTablerIconUnderline = '/icons/underline.svg';

// Custom mark for H1 styling (inline)
const InlineH1 = Mark.create({
  name: 'inlineH1',
  excludes: 'inlineH2 inlineH3',
  parseHTML() {
    return [{ tag: 'span[data-heading="h1"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, {
      'data-heading': 'h1',
      style: 'font-family: Urbanist, sans-serif; font-size: 32px; font-weight: 700; line-height: 1.5;'
    }), 0];
  },
  addCommands() {
    return {
      toggleInlineH1: () => ({ chain }) => {
        return chain()
          .unsetMark('inlineH2')
          .unsetMark('inlineH3')
          .toggleMark(this.name)
          .run();
      },
    };
  },
});

// Custom mark for H2 styling (inline)
const InlineH2 = Mark.create({
  name: 'inlineH2',
  excludes: 'inlineH1 inlineH3',
  parseHTML() {
    return [{ tag: 'span[data-heading="h2"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, {
      'data-heading': 'h2',
      style: 'font-family: Urbanist, sans-serif; font-size: 20px; font-weight: 700; line-height: 1.5;'
    }), 0];
  },
  addCommands() {
    return {
      toggleInlineH2: () => ({ chain }) => {
        return chain()
          .unsetMark('inlineH1')
          .unsetMark('inlineH3')
          .toggleMark(this.name)
          .run();
      },
    };
  },
});

// Custom mark for H3 styling (inline)
const InlineH3 = Mark.create({
  name: 'inlineH3',
  excludes: 'inlineH1 inlineH2',
  parseHTML() {
    return [{ tag: 'span[data-heading="h3"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, {
      'data-heading': 'h3',
      style: 'font-family: Urbanist, sans-serif; font-size: 16px; font-weight: 700; line-height: 1.5;'
    }), 0];
  },
  addCommands() {
    return {
      toggleInlineH3: () => ({ chain }) => {
        return chain()
          .unsetMark('inlineH1')
          .unsetMark('inlineH2')
          .toggleMark(this.name)
          .run();
      },
    };
  },
});

/**
 * Create bubble menu toolbar HTML
 * @param {Editor} editor - TipTap editor instance
 * @returns {HTMLElement} - Bubble menu element
 */
function createBubbleMenuToolbar(editor) {
  const toolbar = document.createElement('div');
  toolbar.className = 'bubble-menu bg-[rgb(34,34,34)] rounded-full p-[6px] shadow-[0_0_80px_rgba(0,0,0,1)] flex gap-[4px] items-center';

  const createButton = (icon, alt, isActive, onClick) => {
    const button = document.createElement('div');
    button.className = `box-border content-stretch flex items-center p-[8px] relative rounded-[12px] shrink-0 cursor-pointer transition-all ${
      isActive ? 'bg-[rgb(255,255,255)]' : 'hover:bg-white/10'
    }`;
    button.innerHTML = `
      <div class="relative shrink-0 size-[20px] transition-all">
        <img
          alt="${alt}"
          class="block max-w-none size-full"
          src="${icon}"
          style="${isActive
            ? 'filter: brightness(0) saturate(100%) invert(9%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(92%);'
            : 'filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%);'
          }"
        />
      </div>
    `;
    button.addEventListener('click', onClick);
    return button;
  };

  const createDivider = () => {
    const divider = document.createElement('div');
    divider.className = 'flex items-center justify-center relative shrink-0 h-[20px]';
    divider.innerHTML = '<div class="w-[1px] h-full bg-[rgb(255,255,255)] opacity-20"></div>';
    return divider;
  };

  const updateToolbar = () => {
    toolbar.innerHTML = '';

    // Text formatting group
    const formattingGroup = document.createElement('div');
    formattingGroup.className = 'content-stretch flex gap-[4px] items-center relative shrink-0';

    formattingGroup.appendChild(createButton(
      imgTablerIconBold,
      'Bold',
      editor.isActive('bold'),
      () => editor.chain().focus().toggleBold().run()
    ));
    formattingGroup.appendChild(createButton(
      imgTablerIconItalic,
      'Italic',
      editor.isActive('italic'),
      () => editor.chain().focus().toggleItalic().run()
    ));
    formattingGroup.appendChild(createButton(
      imgTablerIconStrikethrough,
      'Strikethrough',
      editor.isActive('strike'),
      () => editor.chain().focus().toggleStrike().run()
    ));
    formattingGroup.appendChild(createButton(
      imgTablerIconUnderline,
      'Underline',
      editor.isActive('underline'),
      () => editor.chain().focus().toggleUnderline().run()
    ));

    toolbar.appendChild(formattingGroup);
    toolbar.appendChild(createDivider());

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
    commentButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Trigger Velt comment if available
      const veltCommentTool = document.querySelector('velt-comment-tool');
      if (veltCommentTool) {
        veltCommentTool.click();
      }
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

/**
 * Create loading spinner
 * @returns {HTMLElement} - Loading spinner element
 */
function createLoadingSpinner() {
  const spinner = document.createElement('div');
  spinner.className = 'flex items-center justify-center h-full';
  spinner.innerHTML = `
    <div class="text-white text-center">
      <div class="mb-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      </div>
      <p>Loading editor...</p>
    </div>
  `;
  return spinner;
}

/**
 * Create TipTap editor with Velt CRDT
 * @param {HTMLElement} container - Container element to mount into
 * @param {Object} veltClient - Velt client instance
 * @param {string} editorId - Unique editor ID
 * @param {Object} user - User object for collaboration cursor
 * @returns {Promise<Object>} - Component API with editor and destroy methods
 */
export async function createTipTapEditor(container, veltClient, editorId, user) {
  // Show loading state
  const loadingSpinner = createLoadingSpinner();
  container.appendChild(loadingSpinner);

  let editor = null;
  let store = null;
  let bubbleMenuElement = null;

  try {
    // [Velt] Create the CRDT store using createVeltTipTapStore
    console.log('[TipTap] Creating Velt TipTap store...');
    store = await createVeltTipTapStore({
      editorId: editorId,
      veltClient: veltClient,
      initialContent: initialContent,
    });

    if (!store) {
      throw new Error('Failed to create Velt TipTap store');
    }

    console.log('[TipTap] Store created, initializing editor...');

    // Remove loading spinner
    container.removeChild(loadingSpinner);

    // Create bubble menu element BEFORE editor initialization
    bubbleMenuElement = document.createElement('div');
    bubbleMenuElement.className = 'bubble-menu-container';
    document.body.appendChild(bubbleMenuElement);

    // Build extensions array
    const extensions = [
      StarterKit.configure({
        history: false, // Disable history as CRDT handles undo/redo
        heading: false, // Using custom inline headings
        dropcursor: false, // Disable to avoid conflicts
      }),
      TextAlign.configure({
        types: ['paragraph'],
      }),
      Underline,
      InlineH1,
      InlineH2,
      InlineH3,
      // BubbleMenu extension - must be configured before editor creation
      BubbleMenu.configure({
        element: bubbleMenuElement,
        tippyOptions: {
          placement: 'top',
          offset: [0, 8],
        },
        shouldShow: ({ editor, from, to }) => {
          // Only show bubble menu when there's a text selection
          return from !== to && editor.isEditable;
        },
      }),
      // [Velt] Get the collaboration extension from the store
      store.getCollabExtension(),
    ];

    // Debug: Check what's in the Yjs document
    const yXml = store.getYXml();
    const yDoc = store.getYDoc();
    console.log('[TipTap] YXml content:', yXml?.toString());
    console.log('[TipTap] YDoc:', yDoc);
    console.log('[TipTap] Store connected:', store.isConnected());

    // Create the TipTap editor
    editor = new Editor({
      element: container,
      extensions: extensions,
      content: '', // Content comes from CRDT store
      editorProps: {
        attributes: {
          class: 'prose prose-invert max-w-none focus:outline-none',
        },
      },
    });

    // Create and attach bubble menu toolbar content
    const bubbleMenuToolbar = createBubbleMenuToolbar(editor);
    bubbleMenuElement.appendChild(bubbleMenuToolbar);

    console.log('[TipTap] Editor initialized successfully');
    console.log('[TipTap] Editor content after init:', editor.getHTML());

    // Fallback: If editor is empty after a short delay (CRDT sync may not have initial content),
    // set the initial content directly
    setTimeout(() => {
      if (editor && editor.isEmpty) {
        console.log('[TipTap] Editor is empty, setting initial content as fallback...');
        editor.commands.setContent(initialContent);
      }
    }, 1000);

  } catch (error) {
    console.error('[TipTap] Failed to initialize:', error);

    // Remove loading spinner if still present
    if (loadingSpinner.parentNode === container) {
      container.removeChild(loadingSpinner);
    }

    // Show error state
    container.innerHTML = `
      <div class="flex items-center justify-center h-full">
        <div class="text-red-400 text-center">
          <p>Failed to load editor</p>
          <p class="text-sm opacity-70">${error.message}</p>
        </div>
      </div>
    `;
  }

  return {
    editor,
    store,
    destroy() {
      // [Velt] Proper teardown
      if (editor) {
        editor.destroy();
        editor = null;
      }
      if (store && store.destroy) {
        store.destroy();
        store = null;
      }
      if (bubbleMenuElement) {
        bubbleMenuElement.remove();
        bubbleMenuElement = null;
      }
    },
  };
}
