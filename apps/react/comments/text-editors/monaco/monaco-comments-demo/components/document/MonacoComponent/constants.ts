export const MONACO_EDITOR_ID = "monaco-paper-editor"
export const MONACO_CONTENT_STORAGE_KEY = "monaco-comments-demo-content-v1"
export const MONACO_DOCUMENT_ID_STORAGE_KEY = "monaco-comments-demo-document-id"
export const MONACO_PLACEHOLDER = "Start typing..."

export const MONACO_SECTION_HEADINGS = [
  "Abstract",
  "Introduction",
  "Background",
  "Model Architecture",
  "Why Self-Attention",
  "Training",
  "Results",
  "Conclusion",
  "References",
]

export const initialContent = `/**
 * Attention Is All You Need
 *
 * Ashish Vaswani
 * Google Brain
 * avaswani@google.com
 *
 * Noam Shazeer
 * Google Brain
 * noam@google.com
 *
 * Niki Parmar
 * Google Research
 * nikip@google.com
 *
 * Jakob Uszkoreit
 * Google Research
 * usz@google.com
 *
 * Llion Jones
 * Google Research
 * llion@google.com
 *
 * Aidan N. Gomez
 * University of Toronto
 * aidan@cs.toronto.edu
 *
 * Lukasz Kaiser
 * Google Brain
 * lukaszkaiser@google.com
 *
 * Illia Polosukhin
 * illia.polosukhin@gmail.com
 *
 * Equal contribution. Listing order is random.
 */

type PaperSection = {
  heading: string
  paragraphs: string[]
}

const abstract = [
  "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder.",
  "The best performing models also connect the encoder and decoder through an attention mechanism.",
  "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
  "Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train.",
]

const sections: PaperSection[] = [
  {
    heading: "Abstract",
    paragraphs: abstract,
  },
  {
    heading: "Introduction",
    paragraphs: [
      "Recurrent neural networks, long short-term memory and gated recurrent neural networks in particular, have been firmly established as state of the art approaches in sequence modeling and transduction problems such as language modeling and machine translation.",
      "Recurrent models typically factor computation along the symbol positions of the input and output sequences. This inherently sequential nature precludes parallelization within training examples, which becomes critical at longer sequence lengths.",
      "Attention mechanisms have become an integral part of compelling sequence modeling and transduction models in various tasks, allowing modeling of dependencies without regard to their distance in the input or output sequences.",
      "In this work we propose the Transformer, a model architecture eschewing recurrence and instead relying entirely on an attention mechanism to draw global dependencies between input and output.",
    ],
  },
  {
    heading: "Background",
    paragraphs: [
      "The goal of reducing sequential computation also forms the foundation of the Extended Neural GPU, ByteNet and ConvS2S, all of which use convolutional neural networks as basic building block.",
      "Self-attention, sometimes called intra-attention, is an attention mechanism relating different positions of a single sequence in order to compute a representation of the sequence.",
      "End-to-end memory networks are based on a recurrent attention mechanism instead of sequence-aligned recurrence and have been shown to perform well on simple-language question answering and language modeling tasks.",
      "To the best of our knowledge, however, the Transformer is the first transduction model relying entirely on self-attention to compute representations of its input and output.",
    ],
  },
  {
    heading: "Model Architecture",
    paragraphs: [
      "Most competitive neural sequence transduction models have an encoder-decoder structure.",
      "The Transformer follows this overall architecture using stacked self-attention and point-wise, fully connected layers for both the encoder and decoder.",
      "Encoder: The encoder is composed of a stack of N = 6 identical layers. Each layer has two sub-layers: a multi-head self-attention mechanism and a position-wise fully connected feed-forward network.",
      "Decoder: The decoder is also composed of a stack of N = 6 identical layers. It inserts a third sub-layer, which performs multi-head attention over the output of the encoder stack.",
      "Scaled Dot-Product Attention maps a query and a set of key-value pairs to an output by computing a weighted sum of the values.",
      "Multi-Head Attention linearly projects queries, keys and values several times and performs attention in parallel.",
      "Positional Encoding injects information about token order using sine and cosine functions of different frequencies.",
    ],
  },
  {
    heading: "Why Self-Attention",
    paragraphs: [
      "In this section we compare various aspects of self-attention layers to the recurrent and convolutional layers commonly used for mapping one variable-length sequence of symbol representations to another.",
      "A self-attention layer connects all positions with a constant number of sequentially executed operations, whereas a recurrent layer requires O(n) sequential operations.",
      "The shorter the path between any two positions in the input and output sequences, the easier it is to learn long-range dependencies.",
      "As a side benefit, self-attention could yield more interpretable models because individual attention heads appear to learn different syntactic and semantic relationships.",
    ],
  },
  {
    heading: "Training",
    paragraphs: [
      "We trained on the standard WMT 2014 English-German dataset and the significantly larger WMT 2014 English-French dataset.",
      "We trained our models on one machine with 8 NVIDIA P100 GPUs. The base models were trained for a total of 100,000 steps or 12 hours.",
      "We used the Adam optimizer with beta1 = 0.9, beta2 = 0.98 and epsilon = 10^-9, varying the learning rate over the course of training.",
      "Regularization included residual dropout, embedding dropout, positional encoding dropout, and label smoothing.",
    ],
  },
  {
    heading: "Results",
    paragraphs: [
      "On the WMT 2014 English-to-German translation task, the big transformer model outperforms the best previously reported models by more than 2.0 BLEU.",
      "On the WMT 2014 English-to-French translation task, our big model achieves a BLEU score of 41.0 at less than one quarter the training cost of the previous state-of-the-art model.",
      "To evaluate the importance of different components of the Transformer, we varied the base model in several ways and measured the change in performance.",
      "To evaluate whether the Transformer can generalize to other tasks, we performed experiments on English constituency parsing.",
    ],
  },
  {
    heading: "Conclusion",
    paragraphs: [
      "In this work, we presented the Transformer, the first sequence transduction model based entirely on attention.",
      "For translation tasks, the Transformer can be trained significantly faster than architectures based on recurrent or convolutional layers.",
      "We are excited about the future of attention-based models and plan to apply them to other tasks and modalities.",
    ],
  },
]

const references = [
  "[1] Jimmy Lei Ba, Jamie Ryan Kiros, and Geoffrey E Hinton. Layer normalization. arXiv preprint arXiv:1607.06450, 2016.",
  "[2] Dzmitry Bahdanau, Kyunghyun Cho, and Yoshua Bengio. Neural machine translation by jointly learning to align. CoRR, abs/1409.0473, 2014.",
  "[3] Denny Britz, Anna Goldie, Minh-Thang Luong, and Quoc V. Le. Massive exploration of neural machine translation architectures. CoRR, abs/1703.03906, 2017.",
  "[4] Jianpeng Cheng, Li Dong, and Mirella Lapata. Long short-term memory-networks for machine reading. arXiv preprint arXiv:1601.06733, 2016.",
  "[5] Kyunghyun Cho et al. Learning phrase representations using RNN encoder-decoder for statistical machine translation. CoRR, abs/1406.1078, 2014.",
  "[6] Francois Chollet. Xception: Deep learning with depthwise separable convolutions. arXiv preprint arXiv:1610.02357, 2016.",
  "[7] Junyoung Chung et al. Empirical evaluation of gated recurrent neural networks on sequence modeling. CoRR, abs/1412.3555, 2014.",
  "[8] Chris Dyer, Adhiguna Kuncoro, Miguel Ballesteros, and Noah A. Smith. Recurrent neural network grammars. In Proc. of NAACL, 2016.",
  "[9] Jonas Gehring et al. Convolutional sequence to sequence learning. arXiv preprint arXiv:1705.03122v2, 2017.",
  "[10] Alex Graves. Generating sequences with recurrent neural networks. arXiv preprint arXiv:1308.0850, 2013.",
  "[11] Kaiming He, Xiangyu Zhang, Shaoqing Ren, and Jian Sun. Deep residual learning for image recognition. CVPR, 2016.",
  "[12] Sepp Hochreiter et al. Gradient flow in recurrent nets: the difficulty of learning long-term dependencies, 2001.",
  "[13] Sepp Hochreiter and Jurgen Schmidhuber. Long short-term memory. Neural computation, 1997.",
  "[14] Zhongqiang Huang and Mary Harper. Self-training PCFG grammars with latent annotations across languages. EMNLP, 2009.",
  "[15] Rafal Jozefowicz et al. Exploring the limits of language modeling. arXiv preprint arXiv:1602.02410, 2016.",
  "[16] Lukasz Kaiser and Samy Bengio. Can active memory replace attention? NIPS, 2016.",
  "[17] Lukasz Kaiser and Ilya Sutskever. Neural GPUs learn algorithms. ICLR, 2016.",
  "[18] Nal Kalchbrenner et al. Neural machine translation in linear time. arXiv preprint arXiv:1610.10099v2, 2017.",
  "[19] Yoon Kim, Carl Denton, Luong Hoang, and Alexander M. Rush. Structured attention networks. ICLR, 2017.",
  "[20] Diederik Kingma and Jimmy Ba. Adam: A method for stochastic optimization. ICLR, 2015.",
  "[21] Oleksii Kuchaiev and Boris Ginsburg. Factorization tricks for LSTM networks. arXiv preprint arXiv:1703.10722, 2017.",
  "[22] Zhouhan Lin et al. A structured self-attentive sentence embedding. arXiv preprint arXiv:1703.03130, 2017.",
  "[23] Minh-Thang Luong et al. Multi-task sequence to sequence learning. arXiv preprint arXiv:1511.06114, 2015.",
  "[24] Minh-Thang Luong, Hieu Pham, and Christopher D Manning. Effective approaches to attention-based neural machine translation. arXiv preprint arXiv:1508.04025, 2015.",
  "[25] Mitchell P Marcus et al. Building a large annotated corpus of English: The Penn Treebank. Computational linguistics, 1993.",
  "[26] David McClosky, Eugene Charniak, and Mark Johnson. Effective self-training for parsing. HLT-NAACL, 2006.",
  "[27] Ankur Parikh et al. A decomposable attention model. EMNLP, 2016.",
  "[28] Romain Paulus, Caiming Xiong, and Richard Socher. A deep reinforced model for abstractive summarization. arXiv preprint arXiv:1705.04304, 2017.",
  "[29] Slav Petrov et al. Learning accurate, compact, and interpretable tree annotation. ACL, 2006.",
  "[30] Ofir Press and Lior Wolf. Using the output embedding to improve language models. arXiv preprint arXiv:1608.05859, 2016.",
  "[31] Rico Sennrich, Barry Haddow, and Alexandra Birch. Neural machine translation of rare words with subword units. arXiv preprint arXiv:1508.07909, 2015.",
  "[32] Noam Shazeer et al. Outrageously large neural networks: The sparsely-gated mixture-of-experts layer. arXiv preprint arXiv:1701.06538, 2017.",
  "[33] Nitish Srivastava et al. Dropout: a simple way to prevent neural networks from overfitting. JMLR, 2014.",
  "[34] Sainbayar Sukhbaatar et al. End-to-end memory networks. NIPS, 2015.",
  "[35] Ilya Sutskever, Oriol Vinyals, and Quoc V. Le. Sequence to sequence learning with neural networks. NIPS, 2014.",
  "[36] Christian Szegedy et al. Rethinking the inception architecture for computer vision. CoRR, abs/1512.00567, 2015.",
  "[37] Vinyals, Kaiser, Koo, Petrov, Sutskever, and Hinton. Grammar as a foreign language. NIPS, 2015.",
  "[38] Yonghui Wu et al. Google's neural machine translation system: Bridging the gap between human and machine translation. arXiv preprint arXiv:1609.08144, 2016.",
  "[39] Jie Zhou et al. Deep recurrent models with fast-forward connections for neural machine translation. CoRR, abs/1606.04199, 2016.",
  "[40] Muhua Zhu et al. Fast and accurate shift-reduce constituent parsing. ACL, 2013.",
]

export const paper = {
  title: "Attention Is All You Need",
  sections,
  references,
}
`
