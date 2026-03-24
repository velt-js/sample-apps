// Icon assets from public/icons directory
export const imgTablerIconAlignLeft = "/icons/align-left.svg"
export const imgTablerIconAlignCenter = "/icons/align-center.svg"
export const imgTablerIconAlignRight = "/icons/align-right.svg"
export const imgLine1 = "/icons/line.svg"
export const imgTablerIconBold = "/icons/bold.svg"
export const imgTablerIconItalic = "/icons/italic.svg"
export const imgTablerIconUnderline = "/icons/underline.svg"
export const imgTablerIconH1 = "/icons/h1.svg"
export const imgTablerIconH2 = "/icons/h2.svg"
export const imgTablerIconH3 = "/icons/h3.svg"
export const imgTablerIconPilcrow = "/icons/pilcrow.svg"

// BlockNote initial content in PartialBlock format
export const blockNoteInitialContent = [
  {
    type: "heading",
    props: { level: 1 },
    content: "Attention Is All You Need"
  },
  {
    type: "paragraph",
    content: "Ashish Vaswani"
  },
  {
    type: "paragraph",
    content: "Google Brain avaswani@google.com"
  },
  {
    type: "paragraph",
    content: "Noam Shazeer"
  },
  {
    type: "paragraph",
    content: "Google Brain noam@google.com"
  },
  {
    type: "paragraph",
    content: "Niki Parmar"
  },
  {
    type: "paragraph",
    content: "Google Research nikip@google.com"
  },
  {
    type: "paragraph",
    content: "Jakob Uszkoreit"
  },
  {
    type: "paragraph",
    content: "Google Research usz@google.com"
  },
  {
    type: "paragraph",
    content: "Llion Jones"
  },
  {
    type: "paragraph",
    content: "Google Research llion@google.com"
  },
  {
    type: "paragraph",
    content: "Aidan N. Gomez"
  },
  {
    type: "paragraph",
    content: "University of Toronto aidan@cs.toronto.edu"
  },
  {
    type: "paragraph",
    content: "Łukasz Kaiser"
  },
  {
    type: "paragraph",
    content: "Google Brain lukaszkaiser@google.com"
  },
  {
    type: "paragraph",
    content: "Illia Polosukhin"
  },
  {
    type: "paragraph",
    content: "illia.polosukhin@gmail.com"
  },
  {
    type: "paragraph",
    content: ""
  },
  {
    type: "paragraph",
    content: "Equal contribution. Listing order is random. Jakob proposed replacing RNNs with self-attention and started the effort to evaluate this idea. Ashish, with Illia, designed and implemented the first Transformer models and has been crucially involved in every aspect of this work. Noam proposed scaled dot-product attention, multi-head attention and the parameter-free position representation and became the other person involved in nearly every detail. Niki designed, implemented, tuned and evaluated countless model variants in our original codebase and tensor2tensor. Llion also experimented with novel model variants, was responsible for our initial codebase, and efficient inference and visualizations. Lukasz and Aidan spent countless long days designing various parts of and implementing tensor2tensor, replacing our earlier codebase, greatly improving results and massively accelerating our research. Work performed while at Google Brain. Work performed while at Google Research."
  },
  {
    type: "paragraph",
    content: ""
  },
  {
    type: "heading",
    props: { level: 2 },
    content: "Abstract"
  },
  {
    type: "paragraph",
    content: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data."
  },
  {
    type: "paragraph",
    content: ""
  },
  {
    type: "heading",
    props: { level: 2 },
    content: "Introduction"
  },
  {
    type: "paragraph",
    content: "Recurrent neural networks, long short-term memory and gated recurrent neural networks in particular, have been firmly established as state of the art approaches in sequence modeling and transduction problems such as language modeling and machine translation. Numerous efforts have since continued to push the boundaries of recurrent language models and encoder-decoder architectures."
  },
  {
    type: "paragraph",
    content: "Recurrent models typically factor computation along the symbol positions of the input and output sequences. Aligning the positions to steps in computation time, they generate a sequence of hidden states ht, as a function of the previous hidden state ht−1 and the input for position t. This inherently sequential nature precludes parallelization within training examples, which becomes critical at longer sequence lengths, as memory constraints limit batching across examples. Recent work has achieved significant improvements in computational efficiency through factorization tricks and conditional computation, while also improving model performance in case of the latter. The fundamental constraint of sequential computation, however, remains."
  },
  {
    type: "paragraph",
    content: "Attention mechanisms have become an integral part of compelling sequence modeling and transduction models in various tasks, allowing modeling of dependencies without regard to their distance in the input or output sequences. In all but a few cases, however, such attention mechanisms are used in conjunction with a recurrent network."
  },
  {
    type: "paragraph",
    content: "In this work we propose the Transformer, a model architecture eschewing recurrence and instead relying entirely on an attention mechanism to draw global dependencies between input and output. The Transformer allows for significantly more parallelization and can reach a new state of the art in translation quality after being trained for as little as twelve hours on eight P100 GPUs."
  },
  { type: "paragraph", content: "" },
  { type: "heading", props: { level: 2 }, content: "Background" },
  {
    type: "paragraph",
    content: "The goal of reducing sequential computation also forms the foundation of the Extended Neural GPU, ByteNet and ConvS2S, all of which use convolutional neural networks as basic building block, computing hidden representations in parallel for all input and output positions. In these models, the number of operations required to relate signals from two arbitrary input or output positions grows in the distance between positions, linearly for ConvS2S and logarithmically for ByteNet. This makes it more difficult to learn dependencies between distant positions. In the Transformer this is reduced to a constant number of operations, albeit at the cost of reduced effective resolution due to averaging attention-weighted positions, an effect we counteract with Multi-Head Attention as described in section 3.2."
  },
  {
    type: "paragraph",
    content: "Self-attention, sometimes called intra-attention is an attention mechanism relating different positions of a single sequence in order to compute a representation of the sequence. Self-attention has been used successfully in a variety of tasks including reading comprehension, abstractive summarization, textual entailment and learning task-independent sentence representations."
  },
  {
    type: "paragraph",
    content: "End-to-end memory networks are based on a recurrent attention mechanism instead of sequence-aligned recurrence and have been shown to perform well on simple-language question answering and language modeling tasks."
  },
  {
    type: "paragraph",
    content: "To the best of our knowledge, however, the Transformer is the first transduction model relying entirely on self-attention to compute representations of its input and output without using sequence-aligned RNNs or convolution. In the following sections, we will describe the Transformer, motivate self-attention and discuss its advantages over models such as neural GPU and convolutional sequence to sequence models."
  },
  { type: "paragraph", content: "" },
  { type: "heading", props: { level: 2 }, content: "Model Architecture" },
  {
    type: "paragraph",
    content: "Most competitive neural sequence transduction models have an encoder-decoder structure. Here, the encoder maps an input sequence of symbol representations (x\u2081, ..., x\u2099) to a sequence of continuous representations z = (z\u2081, ..., z\u2099). Given z, the decoder then generates an output sequence (y\u2081, ..., y\u2098) of symbols one element at a time. At each step the model is auto-regressive, consuming the previously generated symbols as additional input when generating the next."
  },
  {
    type: "paragraph",
    content: "The Transformer follows this overall architecture using stacked self-attention and point-wise, fully connected layers for both the encoder and decoder, shown in the left and right halves of Figure 1, respectively."
  },
  { type: "paragraph", content: "" },
  { type: "heading", props: { level: 3 }, content: "Encoder and Decoder Stacks" },
  {
    type: "paragraph",
    content: "Encoder: The encoder is composed of a stack of N = 6 identical layers. Each layer has two sub-layers. The first is a multi-head self-attention mechanism, and the second is a simple, position-wise fully connected feed-forward network. We employ a residual connection around each of the two sub-layers, followed by layer normalization. That is, the output of each sub-layer is LayerNorm(x + Sublayer(x)), where Sublayer(x) is the function implemented by the sub-layer itself. To facilitate these residual connections, all sub-layers in the model, as well as the embedding layers, produce outputs of dimension d_model = 512."
  },
  {
    type: "paragraph",
    content: "Decoder: The decoder is also composed of a stack of N = 6 identical layers. In addition to the two sub-layers in each encoder layer, the decoder inserts a third sub-layer, which performs multi-head attention over the output of the encoder stack. Similar to the encoder, we employ residual connections around each of the sub-layers, followed by layer normalization. We also modify the self-attention sub-layer in the decoder stack to prevent positions from attending to subsequent positions. This masking, combined with fact that the output embeddings are offset by one position, ensures that the predictions for position i can depend only on the known outputs at positions less than i."
  },
  { type: "paragraph", content: "" },
  { type: "heading", props: { level: 3 }, content: "Attention" },
  {
    type: "paragraph",
    content: "An attention function can be described as mapping a query and a set of key-value pairs to an output, where the query, keys, values, and output are all vectors. The output is computed as a weighted sum of the values, where the weight assigned to each value is computed by a compatibility function of the query with the corresponding key."
  },
  { type: "paragraph", content: "" },
  { type: "heading", props: { level: 2 }, content: "Why Self-Attention" },
  {
    type: "paragraph",
    content: "In this section we compare various aspects of self-attention layers to the recurrent and convolutional layers commonly used for mapping one variable-length sequence of symbol representations to another sequence of equal length, such as a hidden layer in a typical sequence transduction encoder or decoder. Motivating our use of self-attention we consider three desiderata."
  },
  {
    type: "paragraph",
    content: "One is the total computational complexity per layer. Another is the amount of computation that can be parallelized, as measured by the minimum number of sequential operations required."
  },
  {
    type: "paragraph",
    content: "A self-attention layer connects all positions with a constant number of sequentially executed operations, whereas a recurrent layer requires O(n) sequential operations. In terms of computational complexity, self-attention layers are faster than recurrent layers when the sequence length n is smaller than the representation dimensionality d, which is most often the case with sentence representations used by state-of-the-art models in machine translations, such as word-piece and byte-pair representations."
  },
  { type: "paragraph", content: "" },
  { type: "heading", props: { level: 2 }, content: "Training" },
  { type: "paragraph", content: "This section describes the training regime for our models." },
  { type: "paragraph", content: "" },
  { type: "heading", props: { level: 3 }, content: "Training Data and Batching" },
  {
    type: "paragraph",
    content: "We trained on the standard WMT 2014 English-German dataset consisting of about 4.5 million sentence pairs. Sentences were encoded using byte-pair encoding, which has a shared source-target vocabulary of about 37000 tokens. For English-French, we used the significantly larger WMT 2014 English-French dataset consisting of 36M sentences and split tokens into a 32000 word-piece vocabulary."
  },
  { type: "paragraph", content: "" },
  { type: "heading", props: { level: 3 }, content: "Hardware and Schedule" },
  {
    type: "paragraph",
    content: "We trained our models on one machine with 8 NVIDIA P100 GPUs. For our base models using the hyperparameters described throughout the paper, each training step took about 0.4 seconds. We trained the base models for a total of 100,000 steps or 12 hours. For our big models, step time was 1.0 seconds. The big models were trained for 300,000 steps (3.5 days)."
  },
  { type: "paragraph", content: "" },
  { type: "heading", props: { level: 2 }, content: "Results" },
  { type: "paragraph", content: "" },
  { type: "heading", props: { level: 3 }, content: "Machine Translation" },
  {
    type: "paragraph",
    content: "On the WMT 2014 English-to-German translation task, the big transformer model outperforms the best previously reported models (including ensembles) by more than 2.0 BLEU, establishing a new state-of-the-art BLEU score of 28.4. Training took 3.5 days on 8 P100 GPUs. Even our base model surpasses all previously published models and ensembles, at a fraction of the training cost of any of the competitive models."
  },
  { type: "paragraph", content: "" },
  { type: "heading", props: { level: 2 }, content: "Conclusion" },
  {
    type: "paragraph",
    content: "In this work, we presented the Transformer, the first sequence transduction model based entirely on attention, replacing the recurrent layers most commonly used in encoder-decoder architectures with multi-headed self-attention."
  },
  {
    type: "paragraph",
    content: "For translation tasks, the Transformer can be trained significantly faster than architectures based on recurrent or convolutional layers. On both WMT 2014 English-to-German and WMT 2014 English-to-French translation tasks, we achieve a new state of the art. In the former task our best model outperforms even all previously reported ensembles."
  },
  {
    type: "paragraph",
    content: "We are excited about the future of attention-based models and plan to apply them to other tasks. We plan to extend the Transformer to problems involving input and output modalities other than text and to investigate local, restricted attention mechanisms to efficiently handle large inputs and outputs such as images, audio and video. Making generation less sequential is another research goals of ours."
  },
  { type: "paragraph", content: "" },
  { type: "heading", props: { level: 2 }, content: "Acknowledgements" },
  {
    type: "paragraph",
    content: "We are grateful to Nal Kalchbrenner and Stephan Gouws for their fruitful comments, corrections and inspiration."
  }
];
