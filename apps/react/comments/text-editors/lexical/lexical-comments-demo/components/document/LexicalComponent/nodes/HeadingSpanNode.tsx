import * as React from 'react'
import { DecoratorNode, LexicalNode, NodeKey, SerializedLexicalNode, Spread } from 'lexical'

export type HeadingLevel = 'h1' | 'h2' | 'h3'

export type SerializedHeadingSpanNode = Spread<
  {
    text: string
    level: HeadingLevel
  },
  SerializedLexicalNode
>

export class HeadingSpanNode extends DecoratorNode<React.ReactElement> {
  __text: string
  __level: HeadingLevel

  static getType(): string {
    return 'heading-span'
  }

  static clone(node: HeadingSpanNode): HeadingSpanNode {
    return new HeadingSpanNode(node.__text, node.__level, node.__key)
  }

  constructor(text: string, level: HeadingLevel, key?: NodeKey) {
    super(key)
    this.__text = text
    this.__level = level
  }

  createDOM(): HTMLElement {
    const span = document.createElement('span')
    span.setAttribute('data-heading', this.__level)
    span.textContent = this.__text

    // Apply inline styles based on heading level
    const styles = {
      h1: 'font-family: Urbanist, sans-serif; font-size: 32px; font-weight: 700; line-height: 1.5; color: white;',
      h2: 'font-family: Urbanist, sans-serif; font-size: 20px; font-weight: 700; line-height: 1.5; color: white;',
      h3: 'font-family: Urbanist, sans-serif; font-size: 16px; font-weight: 700; line-height: 1.5; color: white;',
    }

    span.style.cssText = styles[this.__level]
    return span
  }

  updateDOM(): false {
    return false
  }

  decorate(): React.ReactElement {
    return (
      <span
        data-heading={this.__level}
        style={{
          fontFamily: 'Urbanist, sans-serif',
          fontSize: this.__level === 'h1' ? '32px' : this.__level === 'h2' ? '20px' : '16px',
          fontWeight: 700,
          lineHeight: 1.5,
          color: 'white',
        }}
      >
        {this.__text}
      </span>
    )
  }

  static importJSON(serializedNode: SerializedHeadingSpanNode): HeadingSpanNode {
    const node = $createHeadingSpanNode(serializedNode.text, serializedNode.level)
    return node
  }

  exportJSON(): SerializedHeadingSpanNode {
    return {
      text: this.__text,
      level: this.__level,
      type: 'heading-span',
      version: 1,
    }
  }

  getText(): string {
    return this.__text
  }

  getLevel(): HeadingLevel {
    return this.__level
  }

  getTextContent(): string {
    return this.__text
  }
}

export function $createHeadingSpanNode(text: string, level: HeadingLevel): HeadingSpanNode {
  return new HeadingSpanNode(text, level)
}

export function $isHeadingSpanNode(node: LexicalNode | null | undefined): node is HeadingSpanNode {
  return node instanceof HeadingSpanNode
}
