import type { Node, Edge } from '@xyflow/react';

// Local Icon URLs (from /public/icons/)
export const imgImage46 = "/background-pattern.png";
export const imgTablerIconHandStop = "/icons/hand-stop.svg";
export const imgTablerIconArrowBackUp = "/icons/arrow-back-up.svg";
export const imgTablerIconArrowBackUp1 = "/icons/arrow-redo.svg";
export const imgTablerIconPlayerPlayFilled = "/icons/player-play.svg";
// Slack Message node - filled play button
export const imgTablerIconPlayerPlayFilled1 = "/icons/player-play-filled.svg";
// Bandwidth Agent node - main pointer
export const imgTablerIconPointer = "/icons/pointer.svg";
// OCR Agent node - alt pointer
export const imgTablerIconPointer1 = "/icons/pointer.svg";
// Parser node - function icon
export const imgTablerIconFunction = "/icons/function.svg";
export const imgTablerIconPlus = "/icons/plus.svg";
export const imgTablerIconMinus = "/icons/minus.svg";
export const imgTablerIconTrash = "/icons/trash.svg";

export const getId = () => crypto.randomUUID();

export const nodeOrigin: [number, number] = [0, 0];

const step1Id = getId();
const step2Id = getId();
const step3Id = getId();
const step4Id = getId();

export const initialNodes: Node[] = [
  {
    id: step1Id,
    type: 'simple',
    data: {
      id: step1Id,
      label: 'Slack Message',
      icon: imgTablerIconPlayerPlayFilled1,
      accentColor: '#99e6d0'
    },
    position: { x: 200, y: 240 },
  },
  {
    id: step2Id,
    type: 'custom',
    data: {
      id: step2Id,
      label: 'Parser',
      icon: imgTablerIconFunction,
      accentColor: '#f7c44e',
      showBadge: false,
      badgeCount: 0,
      selected: true
    },
    position: { x: 450, y: 200 },
  },
  {
    id: step3Id,
    type: 'custom',
    data: {
      id: step3Id,
      label: 'Bandwidth Agent',
      icon: imgTablerIconPointer,
      accentColor: '#99c8e6'
    },
    position: { x: 700, y: 280 },
  },
  {
    id: step4Id,
    type: 'custom',
    data: {
      id: step4Id,
      label: 'OCR Agent',
      icon: imgTablerIconPointer1,
      accentColor: '#99c8e6'
    },
    position: { x: 700, y: 390 },
  },
];

export const initialEdges: Edge[] = [
  {
    id: 'e-step1-step2',
    source: step1Id,
    target: step2Id,
    style: { stroke: '#666666', strokeWidth: 2 }
  },
  {
    id: 'e-step2-step3',
    source: step2Id,
    target: step3Id,
    style: { stroke: '#666666', strokeWidth: 2 }
  },
  {
    id: 'e-step2-step4',
    source: step2Id,
    target: step4Id,
    style: { stroke: '#666666', strokeWidth: 2 }
  },
];

export const step2IdExport = step2Id;

