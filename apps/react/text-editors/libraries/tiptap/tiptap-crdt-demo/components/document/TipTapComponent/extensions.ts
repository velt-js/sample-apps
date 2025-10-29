import { Mark, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    inlineH1: {
      toggleInlineH1: () => ReturnType
    }
    inlineH2: {
      toggleInlineH2: () => ReturnType
    }
    inlineH3: {
      toggleInlineH3: () => ReturnType
    }
  }
}

// Custom mark for H1 styling (inline)
export const InlineH1 = Mark.create({
  name: 'inlineH1',

  excludes: 'inlineH2 inlineH3',

  parseHTML() {
    return [{ tag: 'span[data-heading="h1"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, {
      'data-heading': 'h1',
      style: 'font-family: Urbanist, sans-serif; font-size: 32px; font-weight: 700; line-height: 1.5;'
    }), 0]
  },

  addCommands() {
    return {
      toggleInlineH1: () => ({ chain }) => {
        return chain()
          .unsetMark('inlineH2')
          .unsetMark('inlineH3')
          .toggleMark(this.name)
          .run()
      },
    }
  },
})

// Custom mark for H2 styling (inline)
export const InlineH2 = Mark.create({
  name: 'inlineH2',

  excludes: 'inlineH1 inlineH3',

  parseHTML() {
    return [{ tag: 'span[data-heading="h2"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, {
      'data-heading': 'h2',
      style: 'font-family: Urbanist, sans-serif; font-size: 20px; font-weight: 700; line-height: 1.5;'
    }), 0]
  },

  addCommands() {
    return {
      toggleInlineH2: () => ({ chain }) => {
        return chain()
          .unsetMark('inlineH1')
          .unsetMark('inlineH3')
          .toggleMark(this.name)
          .run()
      },
    }
  },
})

// Custom mark for H3 styling (inline)
export const InlineH3 = Mark.create({
  name: 'inlineH3',

  excludes: 'inlineH1 inlineH2',

  parseHTML() {
    return [{ tag: 'span[data-heading="h3"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, {
      'data-heading': 'h3',
      style: 'font-family: Urbanist, sans-serif; font-size: 16px; font-weight: 700; line-height: 1.5;'
    }), 0]
  },

  addCommands() {
    return {
      toggleInlineH3: () => ({ chain }) => {
        return chain()
          .unsetMark('inlineH1')
          .unsetMark('inlineH2')
          .toggleMark(this.name)
          .run()
      },
    }
  },
})
