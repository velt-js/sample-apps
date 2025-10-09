import { Node } from "reactflow";

export default [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 25 },
  },
  {
    id: "2",
    data: { label: "React Flow" },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    data: { label: "Next.js" },
    position: { x: 250, y: 225 },
    style: { borderColor: "#FF0072" },
  },
  {
    id: "4",
    type: "output",
    data: { label: "Boilerplate" },
    position: { x: 100, y: 325 },
    style: { borderColor: "#944DFA" },
  },
] as Node[];
