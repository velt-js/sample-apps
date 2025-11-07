import { Descendant } from 'slate'

// Icon assets from public/icons directory
export const imgTablerIconAlignLeft = "/icons/align-left.svg"
export const imgTablerIconAlignCenter = "/icons/align-center.svg"
export const imgTablerIconAlignRight = "/icons/align-right.svg"
export const imgLine1 = "/icons/line.svg"
export const imgTablerIconBold = "/icons/bold.svg"
export const imgTablerIconItalic = "/icons/italic.svg"
export const imgTablerIconUnderline = "/icons/underline.svg"
export const imgTablerIconStrikethrough = "/icons/strikethrough.svg"
export const imgTablerIconH1 = "/icons/h1.svg"
export const imgTablerIconH2 = "/icons/h2.svg"
export const imgTablerIconH3 = "/icons/h3.svg"
export const imgTablerIconPilcrow = "/icons/pilcrow.svg"

export const initialContent: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Attention Is All You Need', heading: 'h1' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Ashish Vaswani\nGoogle Brain avaswani@google.com\nNoam Shazeer\nGoogle Brain noam@google.com\nNiki Parmar\nGoogle Research nikip@google.com\nJakob Uszkoreit\nGoogle Research usz@google.com\nLlion Jones\nGoogle Research llion@google.com\nAidan N. Gomez\nUniversity of Toronto aidan@cs.toronto.edu\nŁukasz Kaiser\nGoogle Brain lukaszkaiser@google.com\nIllia Polosukhin\nillia.polosukhin@gmail.com\n\nEqual contribution. Listing order is random. Jakob proposed replacing RNNs with self-attention and started the effort to evaluate this idea. Ashish, with Illia, designed and implemented the first Transformer models and has been crucially involved in every aspect of this work. Noam proposed scaled dot-product attention, multi-head attention and the parameter-free position representation and became the other person involved in nearly every detail. Niki designed, implemented, tuned and evaluated countless model variants in our original codebase and tensor2tensor. Llion also experimented with novel model variants, was responsible for our initial codebase, and efficient inference and visualizations. Lukasz and Aidan spent countless long days designing various parts of and implementing tensor2tensor, replacing our earlier codebase, greatly improving results and massively accelerating our research. Work performed while at Google Brain.Work performed while at Google Research.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Abstract', heading: 'h2' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Introduction', heading: 'h2' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Recurrent neural networks, long short-term memory and gated recurrent neural networks in particular, have been firmly established as state of the art approaches in sequence modeling and transduction problems such as language modeling and machine translation. Numerous efforts have since continued to push the boundaries of recurrent language models and encoder-decoder architectures.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Recurrent models typically factor computation along the symbol positions of the input and output sequences. Aligning the positions to steps in computation time, they generate a sequence of hidden states ht, as a function of the previous hidden state ht−1 and the input for position t. This inherently sequential nature precludes parallelization within training examples, which becomes critical at longer sequence lengths, as memory constraints limit batching across examples. Recent work has achieved significant improvements in computational efficiency through factorization tricks and conditional computation, while also improving model performance in case of the latter. The fundamental constraint of sequential computation, however, remains.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Attention mechanisms have become an integral part of compelling sequence modeling and transduction models in various tasks, allowing modeling of dependencies without regard to their distance in the input or output sequences. In all but a few cases, however, such attention mechanisms are used in conjunction with a recurrent network.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'In this work we propose the Transformer, a model architecture eschewing recurrence and instead relying entirely on an attention mechanism to draw global dependencies between input and output. The Transformer allows for significantly more parallelization and can reach a new state of the art in translation quality after being trained for as little as twelve hours on eight P100 GPUs.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Background', heading: 'h2' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'The goal of reducing sequential computation also forms the foundation of the Extended Neural GPU, ByteNet and ConvS2S, all of which use convolutional neural networks as basic building block, computing hidden representations in parallel for all input and output positions. In these models, the number of operations required to relate signals from two arbitrary input or output positions grows in the distance between positions, linearly for ConvS2S and logarithmically for ByteNet. This makes it more difficult to learn dependencies between distant positions. In the Transformer this is reduced to a constant number of operations, albeit at the cost of reduced effective resolution due to averaging attention-weighted positions, an effect we counteract with Multi-Head Attention as described in section 3.2.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Self-attention, sometimes called intra-attention is an attention mechanism relating different positions of a single sequence in order to compute a representation of the sequence. Self-attention has been used successfully in a variety of tasks including reading comprehension, abstractive summarization, textual entailment and learning task-independent sentence representations.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'End-to-end memory networks are based on a recurrent attention mechanism instead of sequence-aligned recurrence and have been shown to perform well on simple-language question answering and language modeling tasks.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'To the best of our knowledge, however, the Transformer is the first transduction model relying entirely on self-attention to compute representations of its input and output without using sequence-aligned RNNs or convolution. In the following sections, we will describe the Transformer, motivate self-attention and discuss its advantages over models such as neural GPU and convolutional sequence to sequence models.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Model Architecture', heading: 'h2' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Most competitive neural sequence transduction models have an encoder-decoder structure. Here, the encoder maps an input sequence of symbol representations (x₁, ..., xₙ) to a sequence of continuous representations z = (z₁, ..., zₙ). Given z, the decoder then generates an output sequence (y₁, ..., yₘ) of symbols one element at a time. At each step the model is auto-regressive, consuming the previously generated symbols as additional input when generating the next.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'The Transformer follows this overall architecture using stacked self-attention and point-wise, fully connected layers for both the encoder and decoder, shown in the left and right halves of Figure 1, respectively.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Encoder and Decoder Stacks', heading: 'h3' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Encoder:', bold: true },
      { text: ' The encoder is composed of a stack of N = 6 identical layers. Each layer has two sub-layers. The first is a multi-head self-attention mechanism, and the second is a simple, position-wise fully connected feed-forward network. We employ a residual connection around each of the two sub-layers, followed by layer normalization. That is, the output of each sub-layer is LayerNorm(x + Sublayer(x)), where Sublayer(x) is the function implemented by the sub-layer itself. To facilitate these residual connections, all sub-layers in the model, as well as the embedding layers, produce outputs of dimension d_model = 512.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Decoder:', bold: true },
      { text: ' The decoder is also composed of a stack of N = 6 identical layers. In addition to the two sub-layers in each encoder layer, the decoder inserts a third sub-layer, which performs multi-head attention over the output of the encoder stack. Similar to the encoder, we employ residual connections around each of the sub-layers, followed by layer normalization. We also modify the self-attention sub-layer in the decoder stack to prevent positions from attending to subsequent positions. This masking, combined with fact that the output embeddings are offset by one position, ensures that the predictions for position i can depend only on the known outputs at positions less than i.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Attention', heading: 'h3' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'An attention function can be described as mapping a query and a set of key-value pairs to an output, where the query, keys, values, and output are all vectors. The output is computed as a weighted sum of the values, where the weight assigned to each value is computed by a compatibility function of the query with the corresponding key.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Scaled Dot-Product Attention', heading: 'h3' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'We call our particular attention "Scaled Dot-Product Attention". The input consists of queries and keys of dimension dₖ, and values of dimension dᵥ. We compute the dot products of the query with all keys, divide each by √dₖ, and apply a softmax function to obtain the weights on the values.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'In practice, we compute the attention function on a set of queries simultaneously, packed together into a matrix Q. The keys and values are also packed together into matrices K and V. We compute the matrix of outputs as:' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Attention(Q, K, V) = softmax(QKᵀ/√dₖ)V' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'The two most commonly used attention functions are additive attention, and dot-product (multiplicative) attention. Dot-product attention is identical to our algorithm, except for the scaling factor of 1/√dₖ. Additive attention computes the compatibility function using a feed-forward network with a single hidden layer. While the two are similar in theoretical complexity, dot-product attention is much faster and more space-efficient in practice, since it can be implemented using highly optimized matrix multiplication code.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'While for small values of dₖ the two mechanisms perform similarly, additive attention outperforms dot product attention without scaling for larger values of dₖ. We suspect that for large values of dₖ, the dot products grow large in magnitude, pushing the softmax function into regions where it has extremely small gradients. To counteract this effect, we scale the dot products by 1/√dₖ.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Multi-Head Attention', heading: 'h3' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Instead of performing a single attention function with d_model-dimensional keys, values and queries, we found it beneficial to linearly project the queries, keys and values h times with different, learned linear projections to dₖ, dₖ and dᵥ dimensions, respectively. On each of these projected versions of queries, keys and values we then perform the attention function in parallel, yielding dᵥ-dimensional output values.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Positional Encoding', heading: 'h3' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Since our model contains no recurrence and no convolution, in order for the model to make use of the order of the sequence, we must inject some information about the relative or absolute position of the tokens in the sequence. To this end, we add "positional encodings" to the input embeddings at the bottoms of the encoder and decoder stacks. The positional encodings have the same dimension d_model as the embeddings, so that the two can be summed. There are many choices of positional encodings, learned and fixed.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'In this work, we use sine and cosine functions of different frequencies:' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'PE(pos,2i) = sin(pos/10000^(2i/d_model))' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'PE(pos,2i+1) = cos(pos/10000^(2i/d_model))' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'where pos is the position and i is the dimension. That is, each dimension of the positional encoding corresponds to a sinusoid. The wavelengths form a geometric progression from 2π to 10000 · 2π. We chose this function because we hypothesized it would allow the model to easily learn to attend by relative positions, since for any fixed offset k, PE_pos+k can be represented as a linear function of PE_pos.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'We also experimented with using learned positional embeddings instead, and found that the two versions produced nearly identical results. We chose the sinusoidal version because it may allow the model to extrapolate to sequence lengths longer than the ones encountered during training.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Why Self-Attention', heading: 'h2' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'In this section we compare various aspects of self-attention layers to the recurrent and convolutional layers commonly used for mapping one variable-length sequence of symbol representations (x₁, ..., xₙ) to another sequence of equal length (z₁, ..., zₙ), with xᵢ, zᵢ ∈ Rᵈ, such as a hidden layer in a typical sequence transduction encoder or decoder. Motivating our use of self-attention we consider three desiderata.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'One is the total computational complexity per layer. Another is the amount of computation that can be parallelized, as measured by the minimum number of sequential operations required.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'The third is the path length between long-range dependencies in the network. Learning long-range dependencies is a key challenge in many sequence transduction tasks. One key factor affecting the ability to learn such dependencies is the length of the paths forward and backward signals have to traverse in the network. The shorter these paths between any combination of positions in the input and output sequences, the easier it is to learn long-range dependencies. Hence we also compare the maximum path length between any two input and output positions in networks composed of the different layer types.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'A self-attention layer connects all positions with a constant number of sequentially executed operations, whereas a recurrent layer requires O(n) sequential operations. In terms of computational complexity, self-attention layers are faster than recurrent layers when the sequence length n is smaller than the representation dimensionality d, which is most often the case with sentence representations used by state-of-the-art models in machine translations, such as word-piece and byte-pair representations. To improve computational performance for tasks involving very long sequences, self-attention could be restricted to considering only a neighborhood of size r in the input sequence centered around the respective output position. This would increase the maximum path length to O(n/r). We plan to investigate this approach further in future work.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'A single convolutional layer with kernel width k < n does not connect all pairs of input and output positions. Doing so requires a stack of O(n/k) convolutional layers in the case of contiguous kernels, or O(logₖ(n)) in the case of dilated convolutions, increasing the length of the longest paths between any two positions in the network. Convolutional layers are generally more expensive than recurrent layers, by a factor of k. Separable convolutions, however, decrease the complexity considerably, to O(k · n · d + n · d²). Even with k = n, however, the complexity of a separable convolution is equal to the combination of a self-attention layer and a point-wise feed-forward layer, the approach we take in our model.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'As side benefit, self-attention could yield more interpretable models. We inspect attention distributions from our models and present and discuss examples in the appendix. Not only do individual attention heads clearly learn to perform different tasks, many appear to exhibit behavior related to the syntactic and semantic structure of the sentences.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Training', heading: 'h2' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'This section describes the training regime for our models.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Training Data and Batching', heading: 'h3' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'We trained on the standard WMT 2014 English-German dataset consisting of about 4.5 million sentence pairs. Sentences were encoded using byte-pair encoding, which has a shared source-target vocabulary of about 37000 tokens. For English-French, we used the significantly larger WMT 2014 English-French dataset consisting of 36M sentences and split tokens into a 32000 word-piece vocabulary. Sentence pairs were batched together by approximate sequence length. Each training batch contained a set of sentence pairs containing approximately 25000 source tokens and 25000 target tokens.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Hardware and Schedule', heading: 'h3' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'We trained our models on one machine with 8 NVIDIA P100 GPUs. For our base models using the hyperparameters described throughout the paper, each training step took about 0.4 seconds. We trained the base models for a total of 100,000 steps or 12 hours. For our big models, step time was 1.0 seconds. The big models were trained for 300,000 steps (3.5 days).' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Optimizer', heading: 'h3' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'We used the Adam optimizer with β₁ = 0.9, β₂ = 0.98 and ϵ = 10⁻⁹. We varied the learning rate over the course of training, according to the formula:' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'lrate = d_model⁻⁰·⁵ · min(step_num⁻⁰·⁵, step_num · warmup_steps⁻¹·⁵)' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'This corresponds to increasing the learning rate linearly for the first warmup_steps training steps, and decreasing it thereafter proportionally to the inverse square root of the step number. We used warmup_steps = 4000.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Regularization', heading: 'h3' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'We employ three types of regularization during training:' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Residual Dropout:', bold: true },
      { text: ' We apply dropout to the output of each sub-layer, before it is added to the sub-layer input and normalized. In addition, we apply dropout to the sums of the embeddings and the positional encodings in both the encoder and decoder stacks. For the base model, we use a rate of P_drop = 0.1.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Label Smoothing:', bold: true },
      { text: ' During training, we employed label smoothing of value ϵ_ls = 0.1. This hurts perplexity, as the model learns to be more unsure, but improves accuracy and BLEU score.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Results', heading: 'h2' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Machine Translation', heading: 'h3' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'On the WMT 2014 English-to-German translation task, the big transformer model outperforms the best previously reported models (including ensembles) by more than 2.0 BLEU, establishing a new state-of-the-art BLEU score of 28.4. Training took 3.5 days on 8 P100 GPUs. Even our base model surpasses all previously published models and ensembles, at a fraction of the training cost of any of the competitive models.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'On the WMT 2014 English-to-French translation task, our big model achieves a BLEU score of 41.0, outperforming all of the previously published single models, at less than 1/4 the training cost of the previous state-of-the-art model. The Transformer (big) model trained for English-to-French used dropout rate P_drop = 0.1, instead of 0.3.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'For the base models, we used a single model obtained by averaging the last 5 checkpoints, which were written at 10-minute intervals. For the big models, we averaged the last 20 checkpoints. We used beam search with a beam size of 4 and length penalty α = 0.6. These hyperparameters were chosen after experimentation on the development set. We set the maximum output length during inference to input length + 50, but terminate early when possible.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Our results compare our translation quality and training costs to other model architectures from the literature. We estimate the number of floating point operations used to train a model by multiplying the training time, the number of GPUs used, and an estimate of the sustained single-precision floating-point capacity of each GPU.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Model Variations', heading: 'h3' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'To evaluate the importance of different components of the Transformer, we varied our base model in different ways, measuring the change in performance on English-to-German translation on the development set, newstest2013. We used beam search as described in the previous section, but no checkpoint averaging.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'We vary the number of attention heads and the attention key and value dimensions, keeping the amount of computation constant. While single-head attention is 0.9 BLEU worse than the best setting, quality also drops off with too many heads.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'We observe that reducing the attention key size dₖ hurts model quality. This suggests that determining compatibility is not easy and that a more sophisticated compatibility function than dot product may be beneficial. We further observe that, as expected, bigger models are better, and dropout is very helpful in avoiding over-fitting. We replace our sinusoidal positional encoding with learned positional embeddings, and observe nearly identical results to the base model.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'English Constituency Parsing', heading: 'h3' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'To evaluate if the Transformer can generalize to other tasks we performed experiments on English constituency parsing. This task presents specific challenges: the output is subject to strong structural constraints and is significantly longer than the input. Furthermore, RNN sequence-to-sequence models have not been able to attain state-of-the-art results in small-data regimes.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'We trained a 4-layer transformer with d_model = 1024 on the Wall Street Journal (WSJ) portion of the Penn Treebank, about 40K training sentences. We also trained it in a semi-supervised setting, using the larger high-confidence and BerkleyParser corpora from with approximately 17M sentences. We used a vocabulary of 16K tokens for the WSJ only setting and a vocabulary of 32K tokens for the semi-supervised setting.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'We performed only a small number of experiments to select the dropout, both attention and residual, learning rates and beam size on the Section 22 development set, all other parameters remained unchanged from the English-to-German base translation model. During inference, we increased the maximum output length to input length + 300. We used a beam size of 21 and α = 0.3 for both WSJ only and the semi-supervised setting.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Our results show that despite the lack of task-specific tuning our model performs surprisingly well, yielding better results than all previously reported models with the exception of the Recurrent Neural Network Grammar. In contrast to RNN sequence-to-sequence models, the Transformer outperforms the BerkeleyParser even when training only on the WSJ training set of 40K sentences.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Conclusion', heading: 'h2' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'In this work, we presented the Transformer, the first sequence transduction model based entirely on attention, replacing the recurrent layers most commonly used in encoder-decoder architectures with multi-headed self-attention.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'For translation tasks, the Transformer can be trained significantly faster than architectures based on recurrent or convolutional layers. On both WMT 2014 English-to-German and WMT 2014 English-to-French translation tasks, we achieve a new state of the art. In the former task our best model outperforms even all previously reported ensembles.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'We are excited about the future of attention-based models and plan to apply them to other tasks. We plan to extend the Transformer to problems involving input and output modalities other than text and to investigate local, restricted attention mechanisms to efficiently handle large inputs and outputs such as images, audio and video. Making generation less sequential is another research goals of ours.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'The code we used to train and evaluate our models is available at https://github.com/tensorflow/tensor2tensor.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Acknowledgements', heading: 'h2' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'We are grateful to Nal Kalchbrenner and Stephan Gouws for their fruitful comments, corrections and inspiration.' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'References', heading: 'h2' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[1]', bold: true },
      { text: ' Jimmy Lei Ba, Jamie Ryan Kiros, and Geoffrey E Hinton. Layer normalization. arXiv preprint arXiv:1607.06450, 2016.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[2]', bold: true },
      { text: ' Dzmitry Bahdanau, Kyunghyun Cho, and Yoshua Bengio. Neural machine translation by jointly learning to align and translate. CoRR, abs/1409.0473, 2014.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[3]', bold: true },
      { text: ' Denny Britz, Anna Goldie, Minh-Thang Luong, and Quoc V. Le. Massive exploration of neural machine translation architectures. CoRR, abs/1703.03906, 2017.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[4]', bold: true },
      { text: ' Jianpeng Cheng, Li Dong, and Mirella Lapata. Long short-term memory-networks for machine reading. arXiv preprint arXiv:1601.06733, 2016.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[5]', bold: true },
      { text: ' Kyunghyun Cho, Bart van Merrienboer, Caglar Gulcehre, Fethi Bougares, Holger Schwenk, and Yoshua Bengio. Learning phrase representations using rnn encoder-decoder for statistical machine translation. CoRR, abs/1406.1078, 2014.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[6]', bold: true },
      { text: ' Francois Chollet. Xception: Deep learning with depthwise separable convolutions. arXiv preprint arXiv:1610.02357, 2016.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[7]', bold: true },
      { text: ' Junyoung Chung, Çaglar Gülçehre, Kyunghyun Cho, and Yoshua Bengio. Empirical evaluation of gated recurrent neural networks on sequence modeling. CoRR, abs/1412.3555, 2014.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[8]', bold: true },
      { text: ' Chris Dyer, Adhiguna Kuncoro, Miguel Ballesteros, and Noah A. Smith. Recurrent neural network grammars. In Proc. of NAACL, 2016.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[9]', bold: true },
      { text: ' Jonas Gehring, Michael Auli, David Grangier, Denis Yarats, and Yann N. Dauphin. Convolutional sequence to sequence learning. arXiv preprint arXiv:1705.03122v2, 2017.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[10]', bold: true },
      { text: ' Alex Graves. Generating sequences with recurrent neural networks. arXiv preprint arXiv:1308.0850, 2013.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[11]', bold: true },
      { text: ' Kaiming He, Xiangyu Zhang, Shaoqing Ren, and Jian Sun. Deep residual learning for image recognition. In Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition, pages 770–778, 2016.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[12]', bold: true },
      { text: ' Sepp Hochreiter, Yoshua Bengio, Paolo Frasconi, and Jürgen Schmidhuber. Gradient flow in recurrent nets: the difficulty of learning long-term dependencies, 2001.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[13]', bold: true },
      { text: ' Sepp Hochreiter and Jürgen Schmidhuber. Long short-term memory. Neural computation, 9(8):1735–1780, 1997.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[14]', bold: true },
      { text: ' Zhongqiang Huang and Mary Harper. Self-training PCFG grammars with latent annotations across languages. In Proceedings of the 2009 Conference on Empirical Methods in Natural Language Processing, pages 832–841. ACL, August 2009.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[15]', bold: true },
      { text: ' Rafal Jozefowicz, Oriol Vinyals, Mike Schuster, Noam Shazeer, and Yonghui Wu. Exploring the limits of language modeling. arXiv preprint arXiv:1602.02410, 2016.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[16]', bold: true },
      { text: ' Łukasz Kaiser and Samy Bengio. Can active memory replace attention? In Advances in Neural Information Processing Systems, (NIPS), 2016.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[17]', bold: true },
      { text: ' Łukasz Kaiser and Ilya Sutskever. Neural GPUs learn algorithms. In International Conference on Learning Representations (ICLR), 2016.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[18]', bold: true },
      { text: ' Nal Kalchbrenner, Lasse Espeholt, Karen Simonyan, Aaron van den Oord, Alex Graves, and Koray Kavukcuoglu. Neural machine translation in linear time. arXiv preprint arXiv:1610.10099v2, 2017.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[19]', bold: true },
      { text: ' Yoon Kim, Carl Denton, Luong Hoang, and Alexander M. Rush. Structured attention networks. In International Conference on Learning Representations, 2017.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[20]', bold: true },
      { text: ' Diederik Kingma and Jimmy Ba. Adam: A method for stochastic optimization. In ICLR, 2015.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[21]', bold: true },
      { text: ' Oleksii Kuchaiev and Boris Ginsburg. Factorization tricks for LSTM networks. arXiv preprint arXiv:1703.10722, 2017.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[22]', bold: true },
      { text: ' Zhouhan Lin, Minwei Feng, Cicero Nogueira dos Santos, Mo Yu, Bing Xiang, Bowen Zhou, and Yoshua Bengio. A structured self-attentive sentence embedding. arXiv preprint arXiv:1703.03130, 2017.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[23]', bold: true },
      { text: ' Minh-Thang Luong, Quoc V. Le, Ilya Sutskever, Oriol Vinyals, and Lukasz Kaiser. Multi-task sequence to sequence learning. arXiv preprint arXiv:1511.06114, 2015.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[24]', bold: true },
      { text: ' Minh-Thang Luong, Hieu Pham, and Christopher D Manning. Effective approaches to attention-based neural machine translation. arXiv preprint arXiv:1508.04025, 2015.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[25]', bold: true },
      { text: ' Mitchell P Marcus, Mary Ann Marcinkiewicz, and Beatrice Santorini. Building a large annotated corpus of english: The penn treebank. Computational linguistics, 19(2):313–330, 1993.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[26]', bold: true },
      { text: ' David McClosky, Eugene Charniak, and Mark Johnson. Effective self-training for parsing. In Proceedings of the Human Language Technology Conference of the NAACL, Main Conference, pages 152–159. ACL, June 2006.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[27]', bold: true },
      { text: ' Ankur Parikh, Oscar Täckström, Dipanjan Das, and Jakob Uszkoreit. A decomposable attention model. In Empirical Methods in Natural Language Processing, 2016.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[28]', bold: true },
      { text: ' Romain Paulus, Caiming Xiong, and Richard Socher. A deep reinforced model for abstractive summarization. arXiv preprint arXiv:1705.04304, 2017.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[29]', bold: true },
      { text: ' Slav Petrov, Leon Barrett, Romain Thibaux, and Dan Klein. Learning accurate, compact, and interpretable tree annotation. In Proceedings of the 21st International Conference on Computational Linguistics and 44th Annual Meeting of the ACL, pages 433–440. ACL, July 2006.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[30]', bold: true },
      { text: ' Ofir Press and Lior Wolf. Using the output embedding to improve language models. arXiv preprint arXiv:1608.05859, 2016.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[31]', bold: true },
      { text: ' Rico Sennrich, Barry Haddow, and Alexandra Birch. Neural machine translation of rare words with subword units. arXiv preprint arXiv:1508.07909, 2015.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[32]', bold: true },
      { text: ' Noam Shazeer, Azalia Mirhoseini, Krzysztof Maziarz, Andy Davis, Quoc Le, Geoffrey Hinton, and Jeff Dean. Outrageously large neural networks: The sparsely-gated mixture-of-experts layer. arXiv preprint arXiv:1701.06538, 2017.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[33]', bold: true },
      { text: ' Nitish Srivastava, Geoffrey E Hinton, Alex Krizhevsky, Ilya Sutskever, and Ruslan Salakhutdinov. Dropout: a simple way to prevent neural networks from overfitting. Journal of Machine Learning Research, 15(1):1929–1958, 2014.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[34]', bold: true },
      { text: ' Sainbayar Sukhbaatar, Arthur Szlam, Jason Weston, and Rob Fergus. End-to-end memory networks. In C. Cortes, N. D. Lawrence, D. D. Lee, M. Sugiyama, and R. Garnett, editors, Advances in Neural Information Processing Systems 28, pages 2440–2448. Curran Associates, Inc., 2015.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[35]', bold: true },
      { text: ' Ilya Sutskever, Oriol Vinyals, and Quoc VV Le. Sequence to sequence learning with neural networks. In Advances in Neural Information Processing Systems, pages 3104–3112, 2014.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[36]', bold: true },
      { text: ' Christian Szegedy, Vincent Vanhoucke, Sergey Ioffe, Jonathon Shlens, and Zbigniew Wojna. Rethinking the inception architecture for computer vision. CoRR, abs/1512.00567, 2015.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[37]', bold: true },
      { text: ' Vinyals & Kaiser, Koo, Petrov, Sutskever, and Hinton. Grammar as a foreign language. In Advances in Neural Information Processing Systems, 2015.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[38]', bold: true },
      { text: ' Yonghui Wu, Mike Schuster, Zhifeng Chen, Quoc V Le, Mohammad Norouzi, Wolfgang Macherey, Maxim Krikun, Yuan Cao, Qin Gao, Klaus Macherey, et al. Google\'s neural machine translation system: Bridging the gap between human and machine translation. arXiv preprint arXiv:1609.08144, 2016.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[39]', bold: true },
      { text: ' Jie Zhou, Ying Cao, Xuguang Wang, Peng Li, and Wei Xu. Deep recurrent models with fast-forward connections for neural machine translation. CoRR, abs/1606.04199, 2016.' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '[40]', bold: true },
      { text: ' Muhua Zhu, Yue Zhang, Wenliang Chen, Min Zhang, and Jingbo Zhu. Fast and accurate shift-reduce constituent parsing. In Proceedings of the 51st Annual Meeting of the ACL, pages 434–443, 2013.' },
    ],
  },
]
