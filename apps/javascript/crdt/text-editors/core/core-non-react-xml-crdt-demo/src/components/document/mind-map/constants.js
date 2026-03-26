/**
 * Mind Map Constants
 *
 * Store configuration, initial XML tree content, and sidebar store definitions.
 */

import * as Y from 'yjs'

export const STORE_ID = 'core-crdt-xml-mindmap-1'
export const CURSOR_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2']

export const storeItems = [
  { id: 'sdk-decision', name: 'SDK Buying Decision' },
  { id: 'design-tasks', name: 'Design Tasks' },
  { id: 'agency-tasks', name: 'Agency Tasks' },
  { id: 'devshop-tasks', name: 'Dev Shop Tasks' },
]

export const storeSections = [
  { header: 'Your Stores', items: ['sdk-decision', 'design-tasks'] },
  { header: 'External', items: ['agency-tasks', 'devshop-tasks'] },
]

function createNode(id, text, children = []) {
  const el = new Y.XmlElement('node')
  el.setAttribute('id', id)
  el.setAttribute('text', text)
  for (const child of children) el.insert(el.length, [child])
  return el
}

export function populateInitialContent(xml) {
  const root = createNode('root', 'Collaborative SDK', [
    createNode('n1', 'Build it in-house', [
      createNode('n1a', 'Requires Money'),
      createNode('n1b', 'Top Talent'),
      createNode('n1c', 'Infrastructure'),
    ]),
    createNode('n2', 'Use Velt SDK', [
      createNode('n2a', 'Ready to use Solutions'),
      createNode('n2b', 'Simple Integrations'),
    ]),
  ])
  xml.insert(0, [root])
}
