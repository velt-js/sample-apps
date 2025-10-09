"use client"
import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Node,
  type Edge,
  Handle,
  Position,
  BackgroundVariant,
} from "@xyflow/react"
import { useCallback, useEffect, useRef, useState, type DragEvent } from "react"
import { useVeltInitState } from "@veltdev/react"
import { useVeltReactFlowCrdtExtension } from "@veltdev/reactflow-crdt"
import "@xyflow/react/dist/style.css"
// [Velt] Presence + NotificationsTool + CommentTool + SidebarButton
import { Presence, NotificationsTool, CommentTool, SidebarButton } from '@/components/velt/VeltTools';
// [Velt] Login
// Auto-login enabled - LoginPanel removed for demo

const getId = () => crypto.randomUUID()

// [Velt] Type definitions
interface NodeData {
  label: string;
  icon?: string;
  iconBg?: string;
  badge?: string | number;
  code?: string;
  onLabelChange?: (nodeId: string, newLabel: string) => void;
}

interface ConnectionState {
  isValid: boolean | null;
  fromNode: { id: string } | null;
}

// SVG icon strings
const ICONS = {
  agent:
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4.63511 10.2207C4.6659 10.359 4.73826 10.4846 4.84249 10.5807C4.94671 10.6767 5.07782 10.7386 5.21821 10.758C5.3586 10.7774 5.50158 10.7534 5.62795 10.6893C5.75432 10.6251 5.85805 10.5238 5.92522 10.399L7.13543 8.60804L9.9768 11.4494C10.0342 11.5068 10.1023 11.5523 10.1773 11.5834C10.2522 11.6144 10.3326 11.6304 10.4137 11.6304C10.4948 11.6304 10.5752 11.6144 10.6501 11.5834C10.7251 11.5523 10.7932 11.5068 10.8506 11.4494L11.4568 10.8432C11.5142 10.7858 11.5597 10.7177 11.5908 10.6427C11.6218 10.5677 11.6378 10.4874 11.6378 10.4063C11.6378 10.3251 11.6218 10.2448 11.5908 10.1698C11.5597 10.0949 11.5142 10.0267 11.4568 9.96937L8.61547 7.128L10.418 5.91779C10.5428 5.85057 10.6441 5.7468 10.7082 5.62039C10.7724 5.49397 10.7963 5.35097 10.7768 5.21057C10.7573 5.07016 10.6954 4.93907 10.5993 4.83488C10.5032 4.73069 10.3775 4.65839 10.2391 4.62768L2.37451 2.36708L4.63511 10.2207Z" fill="#000"/></svg>',
  end: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9.88355 2.36708H4.09309C3.63238 2.36708 3.19053 2.5501 2.86475 2.87588C2.53898 3.20165 2.35596 3.6435 2.35596 4.10422V9.89468C2.35596 10.3554 2.53898 10.7972 2.86475 11.123C3.19053 11.4488 3.63238 11.6318 4.09309 11.6318H9.88355C10.3443 11.6318 10.7861 11.4488 11.1119 11.123C11.4377 10.7972 11.6207 10.3554 11.6207 9.89468V4.10422C11.6207 3.6435 11.4377 3.20165 11.1119 2.87588C10.7861 2.5501 10.3443 2.36708 9.88355 2.36708Z" fill="#000"/></svg>',
  note: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7.56737 11.6318L11.6207 7.57849M7.56737 11.6318V8.15754C7.56737 8.00397 7.62838 7.85668 7.73697 7.74809C7.84556 7.6395 7.99284 7.57849 8.14641 7.57849H11.6207M7.56737 11.6318H3.51405C3.2069 11.6318 2.91234 11.5098 2.69515 11.2926C2.47797 11.0754 2.35596 10.7809 2.35596 10.4737V3.52517C2.35596 3.21803 2.47797 2.92346 2.69515 2.70628C2.91234 2.48909 3.2069 2.36708 3.51405 2.36708H10.4626C10.7697 2.36708 11.0643 2.48909 11.2815 2.70628C11.4987 2.92346 11.6207 3.21803 11.6207 3.52517V7.57849" stroke="#000" strokeWidth="1.15809" strokeLinecap="round" strokeLinejoin="round"/></svg>',
  functions:
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.92951 1.92755C1.60916 2.24789 1.4292 2.68237 1.4292 3.1354V9.96672C1.4292 10.191 1.47338 10.4132 1.55922 10.6204C1.64507 10.8276 1.77089 11.016 1.92951 11.1746C2.08812 11.3332 2.27643 11.459 2.48367 11.5448C2.69091 11.6307 2.91303 11.6749 3.13735 11.6749H9.96868C10.193 11.6749 10.4151 11.6307 10.6224 11.5448C10.8296 11.459 11.0179 11.3332 11.1765 11.1746C11.3351 11.016 11.461 10.8276 11.5468 10.6204C11.6326 10.4132 11.6768 10.191 11.6768 9.96672V3.1354C11.6768 2.91108 11.6326 2.68896 11.5468 2.48172C11.461 2.27447 11.3351 2.08617 11.1765 1.92755C11.0179 1.76894 10.8296 1.64311 10.6224 1.55727C10.4151 1.47143 10.193 1.42725 9.96868 1.42725H3.13735C2.68432 1.42725 2.24985 1.60721 1.92951 1.92755Z" fill="#000"/><path d="M4.93018 8.44709V8.58251C4.93018 8.95626 5.23351 9.25959 5.60726 9.25959C5.99184 9.25959 6.31359 8.96818 6.35151 8.58576L6.75884 4.51676C6.77725 4.33215 6.8636 4.16096 7.00113 4.03644C7.13867 3.91192 7.31756 3.84295 7.50309 3.84293C7.87684 3.84293 8.18018 4.14626 8.18018 4.52001V4.65543M4.93018 6.55126H8.18018" stroke="#f7c44e" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/></svg>',
  fileSearch:
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.21777 3.40436C2.21777 3.83533 2.67432 4.24866 3.48698 4.55341C4.29964 4.85815 5.40184 5.02936 6.55111 5.02936C7.70038 5.02936 8.80258 4.85815 9.61524 4.55341C10.4279 4.24866 10.8844 3.83533 10.8844 3.40436M2.21777 3.40436C2.21777 2.97338 2.67432 2.56006 3.48698 2.25531C4.29964 1.95056 5.40184 1.77936 6.55111 1.77936C7.70038 1.77936 8.80258 1.95056 9.61524 2.25531C10.4279 2.56006 10.8844 2.97338 10.8844 3.40436M2.21777 3.40436V6.65436M10.8844 3.40436V6.65436M2.21777 6.65436C2.21777 7.08533 2.67432 7.49866 3.48698 7.80341C4.29964 8.10815 5.40184 8.27936 6.55111 8.27936C7.70038 8.27936 8.80258 8.10815 9.61524 7.80341C10.4279 7.49866 10.8844 7.08533 10.8844 6.65436M2.21777 6.65436V9.90436C2.21777 10.3353 2.67432 10.7487 3.48698 11.0534C4.29964 11.3582 5.40184 11.5294 6.55111 11.5294C7.70038 11.5294 8.80258 11.3582 9.61524 11.0534C10.4279 10.7487 10.8844 10.3353 10.8844 9.90436V6.65436" stroke="#000" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/></svg>',
  mcp: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><g clipPath="url(#clip0_7894_6265)"><path d="M7.63477 11.0906C7.63477 10.8033 7.52063 10.5277 7.31746 10.3246C7.1143 10.1214 6.83875 10.0073 6.55143 10.0073C6.26411 10.0073 5.98856 10.1214 5.7854 10.3246C5.58224 10.5277 5.4681 10.8033 5.4681 11.0906C5.4681 11.3779 5.58224 11.6535 5.7854 11.8566C5.98856 12.0598 6.26411 12.1739 6.55143 12.1739C6.83875 12.1739 7.1143 12.0598 7.31746 11.8566C7.52063 11.6535 7.63477 11.3779 7.63477 11.0906Z" fill="#000"/><path d="M7.63477 2.42394C7.63477 2.13662 7.52063 1.86107 7.31746 1.65791C7.1143 1.45474 6.83875 1.34061 6.55143 1.34061C6.26411 1.34061 5.98856 1.45474 5.7854 1.65791C5.58224 1.86107 5.4681 2.13662 5.4681 2.42394C5.4681 2.71126 5.58224 2.98681 5.7854 3.18997C5.98856 3.39314 6.26411 3.50727 6.55143 3.50727C6.83875 3.50727 7.1143 3.39314 7.31746 3.18997C7.52063 2.98681 7.63477 2.71126 7.63477 2.42394Z" fill="#000"/><path d="M3.30143 6.75727C3.30143 6.46995 3.1873 6.19441 2.98413 5.99124C2.78097 5.78808 2.50542 5.67394 2.2181 5.67394C1.93078 5.67394 1.65523 5.78808 1.45207 5.99124C1.2489 6.19441 1.13477 6.46995 1.13477 6.75727C1.13477 7.04459 1.2489 7.32014 1.45207 7.5233C1.65523 7.72647 1.93078 7.84061 2.2181 7.84061C2.50542 7.84061 2.78097 7.72647 2.98413 7.5233C3.1873 7.32014 3.30143 7.04459 3.30143 6.75727Z" fill="#000"/><path d="M11.9681 6.75727C11.9681 6.46995 11.854 6.19441 11.6508 5.99124C11.4476 5.78808 11.1721 5.67394 10.8848 5.67394C10.5974 5.67394 10.3219 5.78808 10.1187 5.99124C9.91557 6.19441 9.80143 6.46995 9.80143 6.75727C9.80143 7.04459 9.91557 7.32014 10.1187 7.5233C10.3219 7.72647 10.5974 7.84061 10.8848 7.84061C11.1721 7.84061 11.4476 7.72647 11.6508 7.5233C11.854 7.32014 11.9681 7.04459 11.9681 6.75727Z" fill="#000"/><path d="M7.36393 3.23644L10.0723 5.94477L7.36393 3.23644Z" fill="#000"/><path d="M3.0306 7.56977L5.73893 10.2781L3.0306 7.56977Z" fill="#000"/><path d="M7.36393 10.2781L10.0723 7.56977" stroke="#000" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.0306 5.94477L5.73893 3.23644" stroke="#000" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/></g><defs><clipPath id="clip0_7894_6265"><rect width="13" height="13" fill="white" transform="translate(0.0514526 0.257324)"/></clipPath></defs></svg>',
  guardRails:
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6.55198 1.44348L6.6159 1.44727L6.64786 1.45161L6.6809 1.45865L6.74102 1.47706C6.78255 1.49237 6.82203 1.51275 6.85856 1.53773L6.9149 1.58215L7.05302 1.70023C8.14573 2.60783 9.52674 3.09519 10.9471 3.07444L11.1323 3.06902C11.2534 3.0635 11.3729 3.09876 11.4716 3.16918C11.5703 3.23959 11.6425 3.34108 11.6767 3.4574C11.9429 4.36284 12.0243 5.31254 11.9162 6.25008C11.8081 7.18762 11.5126 8.09386 11.0473 8.91495C10.5821 9.73604 9.95651 10.4552 9.2078 11.0298C8.4591 11.6043 7.60254 12.0225 6.68902 12.2595C6.59986 12.2826 6.50627 12.2826 6.41711 12.2595C5.50354 12.0226 4.64692 11.6044 3.89816 11.0299C3.14939 10.4554 2.52376 9.7362 2.05844 8.9151C1.59311 8.09401 1.2976 7.18775 1.18945 6.25018C1.0813 5.31261 1.16273 4.36287 1.4289 3.4574C1.46308 3.34108 1.5353 3.23959 1.634 3.16918C1.73269 3.09876 1.85216 3.0635 1.97327 3.06902C3.45606 3.1368 4.91076 2.64868 6.05256 1.70023L6.19502 1.57836L6.24702 1.53773C6.28356 1.51275 6.32304 1.49237 6.36456 1.47706L6.42523 1.45865C6.44646 1.45352 6.46799 1.44972 6.48969 1.44727L6.55198 1.44348ZM8.56156 5.39386C8.51126 5.34349 8.45152 5.30354 8.38576 5.27628C8.32 5.24902 8.24952 5.23499 8.17833 5.23499C8.10715 5.23499 8.03667 5.24902 7.97091 5.27628C7.90515 5.30354 7.84541 5.34349 7.79511 5.39386L6.0114 7.17702L5.31102 6.47719L5.26011 6.43223C5.15123 6.34805 5.0144 6.30846 4.8774 6.32152C4.7404 6.33457 4.61351 6.39927 4.52249 6.5025C4.43147 6.60572 4.38316 6.73972 4.38736 6.87727C4.39156 7.01483 4.44796 7.14563 4.54511 7.24311L5.62844 8.32644L5.67936 8.3714C5.78357 8.45224 5.91371 8.49228 6.04535 8.484C6.17699 8.47573 6.30108 8.4197 6.39436 8.32644L8.56102 6.15977L8.60598 6.10886C8.68682 6.00464 8.72686 5.8745 8.71859 5.74286C8.71031 5.61122 8.65428 5.48713 8.56102 5.39386H8.56156Z" fill="#000"/></svg>',
  ifElse:
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.4263 9.12971L11.4263 11.838M11.4263 11.838L8.71794 11.838M11.4263 11.838L7.34427 7.75604C6.83652 7.24843 6.14799 6.9632 5.43002 6.96304L1.67627 6.96304M11.4263 4.79638L11.4263 2.08804L8.71794 2.08804M9.79585 3.71304L9.80127 3.71304M8.70723 4.79638L8.71265 4.79638M7.6346 5.87971L7.62919 5.87971" stroke="#000" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/></svg>',
  while:
    '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none"><path d="M1.21777 6.06598V4.44098C1.21777 4.01 1.38898 3.59668 1.69372 3.29193C1.99847 2.98718 2.4118 2.81598 2.84277 2.81598H9.88444M9.88444 2.81598L8.25944 1.19098M9.88444 2.81598L8.25944 4.44098M9.88444 6.06598V7.69098C9.88444 8.12196 9.71324 8.53528 9.40849 8.84003C9.10374 9.14477 8.69042 9.31598 8.25944 9.31598H1.21777M1.21777 9.31598L2.84277 10.941M1.21777 9.31598L2.84277 7.69098" stroke="#000" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/></svg>',
  userApproval:
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6.06485 10.3955C4.32935 10.2292 2.86685 9.15295 1.67627 7.16882C2.97627 5.00216 4.60127 3.91882 6.55127 3.91882C8.50127 3.91882 10.1263 5.00216 11.4263 7.16882C11.3125 7.35888 11.1927 7.5453 11.0671 7.72782M8.17627 10.9605L9.2596 12.0438L11.4263 9.87716M5.46794 7.16882C5.46794 7.45614 5.58207 7.73169 5.78524 7.93486C5.9884 8.13802 6.26395 8.25216 6.55127 8.25216C6.83859 8.25216 7.11414 8.13802 7.3173 7.93486C7.52047 7.73169 7.6346 7.45614 7.6346 7.16882C7.6346 6.88151 7.52047 6.60596 7.3173 6.40279C7.11414 6.19963 6.83859 6.08549 6.55127 6.08549C6.26395 6.08549 5.9884 6.19963 5.78524 6.40279C5.58207 6.60596 5.46794 6.88151 5.46794 7.16882Z" stroke="#000" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/></svg>',
  transform:
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.4263 6.73006V5.10506C11.4263 4.81774 11.3121 4.54219 11.109 4.33903C10.9058 4.13587 10.6303 4.02173 10.3429 4.02173H7.09294M7.09294 4.02173L8.71794 5.64673M7.09294 4.02173L8.71794 2.39673M1.67627 7.8134V9.4384C1.67627 9.72571 1.79041 10.0013 1.99357 10.2044C2.19673 10.4076 2.47229 10.5217 2.7596 10.5217H6.0096M6.0096 10.5217L4.3846 8.89673M6.0096 10.5217L4.3846 12.1467M1.67627 4.02173C1.67627 4.45271 1.84747 4.86603 2.15222 5.17078C2.45697 5.47552 2.87029 5.64673 3.30127 5.64673C3.73225 5.64673 4.14557 5.47552 4.45032 5.17078C4.75506 4.86603 4.92627 4.45271 4.92627 4.02173C4.92627 3.59075 4.75506 3.17743 4.45032 2.87268C4.14557 2.56793 3.73225 2.39673 3.30127 2.39673C2.87029 2.39673 2.45697 2.56793 2.15222 2.87268C1.84747 3.17743 1.67627 3.59075 1.67627 4.02173ZM8.17627 10.5217C8.17627 10.9527 8.34747 11.366 8.65222 11.6708C8.95697 11.9755 9.37029 12.1467 9.80127 12.1467C10.2322 12.1467 10.6456 11.9755 10.9503 11.6708C11.2551 11.366 11.4263 10.9527 11.4263 10.5217C11.4263 10.0908 11.2551 9.67743 10.9503 9.37268C10.6456 9.06793 10.2322 8.89673 9.80127 8.89673C9.37029 8.89673 8.95697 9.06793 8.65222 9.37268C8.34747 9.67743 8.17627 10.0908 8.17627 10.5217Z" stroke="#000" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round"/></svg>',
  setState:
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9.25977 2.68372C10.0767 3.15544 10.7564 3.83234 11.2313 4.64743C11.7063 5.46251 11.9602 6.38752 11.9678 7.33086C11.9754 8.27421 11.7365 9.2032 11.2748 10.0258C10.813 10.8485 10.1444 11.5363 9.33519 12.0211C8.52594 12.506 7.60409 12.7711 6.6609 12.7902C5.71772 12.8093 4.7859 12.5817 3.95769 12.13C3.12949 11.6783 2.43361 11.0181 1.93896 10.2148C1.44431 9.4115 1.16803 8.49294 1.13747 7.55006L1.13477 7.37456L1.13747 7.19906C1.16781 6.26359 1.44002 5.35195 1.92757 4.55301C2.41512 3.75407 3.10137 3.09509 3.91942 2.64032C4.73746 2.18556 5.65939 1.95052 6.59531 1.95813C7.53123 1.96573 8.44922 2.21572 9.25977 2.68372ZM6.55143 6.29122C6.29255 6.29121 6.04222 6.38391 5.84578 6.55253C5.64934 6.72114 5.51978 6.95453 5.48056 7.21043L5.47081 7.29385L5.4681 7.37456L5.47081 7.45581C5.48662 7.666 5.5634 7.86701 5.69175 8.03422C5.82011 8.20142 5.99445 8.32755 6.19341 8.39714C6.39238 8.46673 6.60733 8.47677 6.81191 8.42602C7.0165 8.37527 7.20184 8.26594 7.34521 8.11143C7.48859 7.95691 7.58377 7.76393 7.6191 7.55612C7.65443 7.34832 7.62836 7.13472 7.54411 6.94151C7.45985 6.74829 7.32105 6.58386 7.14473 6.46835C6.96841 6.35285 6.76222 6.29129 6.55143 6.29122Z" fill="#000"/></svg>',
  slackMessage:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z" stroke="#000" strokeWidth="1.5"/><path d="M5.5 8L7 9.5L10.5 6" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>',
}

function WorkflowNode({ data, id }: { data: NodeData; id: string }) {
  const [isEditing, setIsEditing] = useState(false)
  const [label, setLabel] = useState(data.label)
  const inputRef = useRef<HTMLInputElement>(null)
  const hasBadge = data.badge !== undefined

  // Sync label when data changes externally
  useEffect(() => {
    if (!isEditing) {
      setLabel(data.label)
    }
  }, [data.label, isEditing])

  const handleDoubleClick = () => {
    setIsEditing(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (label.trim() && data.onLabelChange) {
      data.onLabelChange(id, label.trim())
    } else if (!label.trim()) {
      setLabel(data.label)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      inputRef.current?.blur()
    } else if (e.key === "Escape") {
      setLabel(data.label)
      setIsEditing(false)
    }
  }

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-[#777e90] !border-2 !border-[#1d1d1d] hover:!bg-[#99c8e6] transition-colors"
      />
      <div className="bg-[#1d1d1d] rounded-lg px-4 py-3 min-w-[160px] shadow-lg border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: data.iconBg || "#99e6d0" }}
            dangerouslySetInnerHTML={{ __html: data.icon || ICONS.agent }}
          />
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="text-[#ffffff] text-sm font-medium bg-[#2a2a2a] border border-[#3a3a3a] rounded px-2 py-1 outline-none focus:border-[#99c8e6] min-w-0 flex-1"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              className="text-[#ffffff] text-sm font-medium cursor-text"
              onDoubleClick={handleDoubleClick}
              title="Double-click to rename"
            >
              {label}
            </span>
          )}
        </div>
        {hasBadge && (
          <div className="absolute -top-1 -right-1 bg-[#1d1d1d] border border-[#3a3a3a] rounded-full px-2 py-0.5 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#99e6d0]" />
            <span className="text-[10px] text-[#ffffff] font-medium">{data.badge}</span>
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-[#777e90] !border-2 !border-[#1d1d1d] hover:!bg-[#99c8e6] transition-colors"
      />
    </div>
  )
}

const nodeTypes = {
  workflow: WorkflowNode,
}

const slackId = getId()
const parserId = getId()
const bandwidthId = getId()
const ocrId = getId()

const initialNodes: Node[] = [
  {
    id: slackId,
    type: "workflow",
    data: {
      label: "Slack Message",
      icon: ICONS.slackMessage,
      iconBg: "#99e6d0",
      code: "console.log($value$)\nreturn $value$",
    },
    position: { x: 100, y: 200 },
  },
  {
    id: parserId,
    type: "workflow",
    data: {
      label: "Parser",
      icon: ICONS.functions,
      iconBg: "#046ded",
      badge: "2",
      code: "console.log($value$)\nreturn $value$",
    },
    position: { x: 350, y: 200 },
  },
  {
    id: bandwidthId,
    type: "workflow",
    data: {
      label: "Bandwidth Agent",
      icon: ICONS.agent,
      iconBg: "#99c8e6",
      code: "console.log($value$)\nreturn $value$",
    },
    position: { x: 600, y: 120 },
  },
  {
    id: ocrId,
    type: "workflow",
    data: {
      label: "OCR Agent",
      icon: ICONS.agent,
      iconBg: "#99c8e6",
      code: "console.log($value$)\nreturn $value$",
    },
    position: { x: 600, y: 280 },
  },
]

const initialEdges: Edge[] = [
  { id: "e1", source: slackId, target: parserId, style: { stroke: "#777e90", strokeWidth: 2 } },
  { id: "e2", source: parserId, target: bandwidthId, style: { stroke: "#777e90", strokeWidth: 2 } },
  { id: "e3", source: parserId, target: ocrId, style: { stroke: "#777e90", strokeWidth: 2 } },
]

const nodeOrigin: [number, number] = [0.5, 0]

const PALETTE_SECTIONS = [
  {
    title: "CORE",
    items: [
      { label: "Agent", icon: ICONS.agent, iconBg: "#99C8E6" },
      { label: "End", icon: ICONS.end, iconBg: "#99C8E6" },
      { label: "Note", icon: ICONS.note, iconBg: "#99C8E6" },
    ],
  },
  {
    title: "TOOLS",
    items: [
      { label: "Functions", icon: ICONS.functions, iconBg: "#F7C44E" },
      { label: "File Search", icon: ICONS.fileSearch, iconBg: "#F7C44E" },
      { label: "MCP", icon: ICONS.mcp, iconBg: "#F7C44E" },
      { label: "Guard Rails", icon: ICONS.guardRails, iconBg: "#F7C44E" },
    ],
  },
  {
    title: "LOGIC",
    items: [
      { label: "If / Else", icon: ICONS.ifElse, iconBg: "#99C8E6" },
      { label: "While", icon: ICONS.while, iconBg: "#99C8E6" },
      { label: "User Approval", icon: ICONS.userApproval, iconBg: "#99C8E6" },
    ],
  },
  {
    title: "DATA",
    items: [
      { label: "Transform", icon: ICONS.transform, iconBg: "#99C8E6" },
      { label: "Set State", icon: ICONS.setState, iconBg: "#99C8E6" },
    ],
  },
]

function AddNodeOnEdgeDrop() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useVeltReactFlowCrdtExtension({
    editorId: "react-flow-crdt-workflow-builder",
    initialEdges,
    initialNodes,
  })

  const reactFlowWrapper = useRef<HTMLDivElement | null>(null)
  const { screenToFlowPosition } = useReactFlow()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  const selectedNode = nodes.find((node) => node.id === selectedNodeId)

  const handleNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id)
  }, [])

  const handlePaneClick = useCallback(() => {
    setSelectedNodeId(null)
  }, [])

  const handleNodeNameChange = useCallback(
    (newName: string) => {
      if (!selectedNodeId) return
      const targetNode = nodes.find((node) => node.id === selectedNodeId)
      if (targetNode) {
        onNodesChange([
          {
            type: "replace",
            id: selectedNodeId,
            item: {
              ...targetNode,
              data: { ...targetNode.data, label: newName },
            },
          },
        ])
      }
    },
    [selectedNodeId, nodes, onNodesChange]
  )

  const handleNodeCodeChange = useCallback(
    (newCode: string) => {
      if (!selectedNodeId) return
      const targetNode = nodes.find((node) => node.id === selectedNodeId)
      if (targetNode) {
        onNodesChange([
          {
            type: "replace",
            id: selectedNodeId,
            item: {
              ...targetNode,
              data: { ...targetNode.data, code: newCode },
            },
          },
        ])
      }
    },
    [selectedNodeId, nodes, onNodesChange]
  )

  const handleLabelChange = useCallback(
    (nodeId: string, newLabel: string) => {
      const targetNode = nodes.find((node) => node.id === nodeId)
      if (targetNode) {
        onNodesChange([
          {
            type: "replace",
            id: nodeId,
            item: {
              ...targetNode,
              data: { ...targetNode.data, label: newLabel },
            },
          },
        ])
      }
    },
    [nodes, onNodesChange]
  )

  // Add onLabelChange to all nodes
  const nodesWithHandlers = nodes.map((node) => ({
    ...node,
    data: { ...node.data, onLabelChange: handleLabelChange },
  }))

  const onDragStart = (event: DragEvent, nodeData: Partial<NodeData>) => {
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("application/reactflow", JSON.stringify(nodeData))
  }

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault()

      const data = event.dataTransfer.getData("application/reactflow")
      if (!data) return

      const nodeData = JSON.parse(data)
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const newNode: Node = {
        id: getId(),
        type: "workflow",
        position,
        data: { ...nodeData, code: "console.log($value$)\nreturn $value$" },
      }

      onNodesChange([{ type: "add", item: newNode }])
    },
    [screenToFlowPosition, onNodesChange],
  )

  const onConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent, connectionState: ConnectionState) => {
      if (!connectionState.isValid && connectionState.fromNode) {
        const id = getId()
        const { clientX, clientY } = "changedTouches" in event ? event.changedTouches[0] : event
        const newNode: Node = {
          id,
          type: "workflow",
          position: screenToFlowPosition({ x: clientX, y: clientY }),
          data: {
            label: "New Node",
            icon: ICONS.agent,
            iconBg: "#777e90",
            code: "console.log($value$)\nreturn $value$",
          },
          origin: [0.5, 0.0],
        }
        onNodesChange([{ type: "add", item: newNode }])
        const newEdge = {
          id,
          source: connectionState.fromNode.id,
          target: id,
          style: { stroke: "#777e90", strokeWidth: 2 },
        } as Edge
        onEdgesChange([{ type: "add", item: newEdge }])
      }
    },
    [screenToFlowPosition, onNodesChange, onEdgesChange],
  )

  return (
    <div className="flex h-screen bg-[#000000] text-[#ffffff] relative">
      {/* Sidebar with collapse functionality */}
      <div 
        className={`flex flex-col transition-all duration-300 ease-in-out relative ${
          isSidebarCollapsed ? 'w-0 overflow-hidden' : 'w-[270px]'
        }`}
        style={{ 
          maxHeight: 'calc(100vh - 120px)', 
          marginTop: '20px', 
          marginBottom: '20px',
          marginLeft: '20px'
        }}
      >
        <div 
          className="flex flex-col h-full"
          style={{
            borderRadius: '12px',
            background: '#0E0E0E',
            boxShadow: '0 -24px 100px 0 rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="px-4 py-4 border-b border-[#1d1d1d] flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div 
                className="text-white mb-1" 
                style={{ 
                  fontFamily: 'Urbanist, sans-serif', 
                  fontSize: '12px', 
                  fontWeight: 400, 
                  lineHeight: '100%' 
                }}
              >
                My Workflows
              </div>
              <div 
                className="text-white" 
                style={{ 
                  fontFamily: 'Urbanist, sans-serif', 
                  fontSize: '16px', 
                  fontWeight: 600, 
                  lineHeight: '100%' 
                }}
              >
                Slack Summarizer
              </div>
            </div>
            <button
              onClick={() => setIsSidebarCollapsed(true)}
              className="ml-2 w-5 h-5 flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0"
              aria-label="Collapse sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5.8335 5V15M15.0002 5L10.0002 10L15.0002 15" stroke="white" strokeOpacity="0.52" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {PALETTE_SECTIONS.map((section) => (
              <div key={section.title}>
                <div 
                  className="text-white uppercase mb-2" 
                  style={{ 
                    fontFamily: 'Urbanist, sans-serif', 
                    fontSize: '12px', 
                    fontWeight: 400, 
                    lineHeight: '100%' 
                  }}
                >
                  {section.title}
                </div>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div
                      key={item.label}
                      draggable
                      onDragStart={(e) => onDragStart(e, item)}
                      className="flex items-center gap-3 px-3 py-2.5 bg-[#1d1d1d] cursor-grab active:cursor-grabbing hover:bg-[#2a2a2a] transition-colors border border-transparent hover:border-[#3a3a3a]"
                      style={{ borderRadius: '12px' }}
                    >
                      <div
                        className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                        style={{ 
                          backgroundColor: item.iconBg,
                          borderRadius: '8px'
                        }}
                        dangerouslySetInnerHTML={{ __html: item.icon }}
                      />
                      <span 
                        className="text-white" 
                        style={{ 
                          fontFamily: 'Urbanist, sans-serif', 
                          fontSize: '16px', 
                          fontWeight: 400, 
                          lineHeight: '100%' 
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collapsed sidebar trigger button */}
      {isSidebarCollapsed && (
        <button
          onClick={() => setIsSidebarCollapsed(false)}
          className="absolute left-0 top-[20px] z-10 w-8 h-10 bg-[#1d1d1d] border border-[#2a2a2a] rounded-r-md flex items-center justify-center hover:bg-[#2a2a2a] transition-colors shadow-lg"
          aria-label="Expand sidebar"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4L10 8L6 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <div className="flex-1 relative" ref={reactFlowWrapper} onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlow
          nodes={nodesWithHandlers}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 2 }}
          nodeOrigin={nodeOrigin}
          className="bg-[#0e0e0e]"
          defaultEdgeOptions={{
            style: { stroke: "#777e90", strokeWidth: 2 },
            type: "smoothstep",
          }}
        >
          <Background color="#1d1d1d" variant={BackgroundVariant.Dots} gap={16} size={1} />
        </ReactFlow>

        {/* Bottom Toolbar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#1a1a1a] rounded-full px-2 py-2 shadow-2xl border border-[#2a2a2a]">

          <button 
            className="w-10 h-10 flex items-center justify-center hover:bg-[#2a2a2a] rounded-full transition-colors"
            aria-label="Hand tool"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M7.17334 10.8334V4.58335C7.17334 4.25183 7.30504 3.93389 7.53946 3.69947C7.77388 3.46505 8.09182 3.33335 8.42334 3.33335C8.75486 3.33335 9.0728 3.46505 9.30722 3.69947C9.54164 3.93389 9.67334 4.25183 9.67334 4.58335M9.67334 4.58335V10M9.67334 4.58335V2.91669C9.67334 2.75253 9.70567 2.58999 9.76849 2.43833C9.83131 2.28668 9.92338 2.14888 10.0395 2.0328C10.1555 1.91673 10.2933 1.82466 10.445 1.76184C10.5966 1.69902 10.7592 1.66669 10.9233 1.66669C11.0875 1.66669 11.25 1.69902 11.4017 1.76184C11.5534 1.82466 11.6912 1.91673 11.8072 2.0328C11.9233 2.14888 12.0154 2.28668 12.0782 2.43833C12.141 2.58999 12.1733 2.75253 12.1733 2.91669V10M12.1733 4.58335C12.1733 4.25183 12.305 3.93389 12.5395 3.69947C12.7739 3.46505 13.0918 3.33335 13.4233 3.33335C13.7549 3.33335 14.0728 3.46505 14.3072 3.69947C14.5416 3.93389 14.6733 4.25183 14.6733 4.58335V10M14.6751 6.25002C14.6751 5.9185 14.8068 5.60056 15.0412 5.36614C15.2757 5.13172 15.5936 5.00002 15.9251 5.00002C16.2566 5.00002 16.5746 5.13172 16.809 5.36614C17.0434 5.60056 17.1751 5.9185 17.1751 6.25002V13.3334C17.1751 14.6594 16.6483 15.9312 15.7107 16.8689C14.773 17.8066 13.5012 18.3334 12.1751 18.3334H10.5085H10.6818C9.85373 18.3335 9.03861 18.128 8.30961 17.7353C7.5806 17.3425 6.96055 16.7749 6.50512 16.0834C6.45046 16.0002 6.39602 15.9168 6.34179 15.8334C6.08179 15.4342 5.16929 13.8434 3.60345 11.06C3.44383 10.7763 3.40119 10.4415 3.48461 10.1268C3.56802 9.81214 3.77091 9.54242 4.05012 9.37502C4.34752 9.19658 4.69601 9.12262 5.04025 9.16489C5.38449 9.20717 5.70474 9.36325 5.95012 9.60835L7.17512 10.8334" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="w-px h-6 bg-[#2a2a2a]" />

          <button 
            className="w-10 h-10 flex items-center justify-center hover:bg-[#2a2a2a] rounded-full transition-colors"
            aria-label="Undo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M7.99984 11.6667L4.6665 8.33333M4.6665 8.33333L7.99984 5M4.6665 8.33333H13.8332C14.7172 8.33333 15.5651 8.68452 16.1902 9.30964C16.8153 9.93477 17.1665 10.7826 17.1665 11.6667C17.1665 12.5507 16.8153 13.3986 16.1902 14.0237C15.5651 14.6488 14.7172 15 13.8332 15H12.9998" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button 
            className="w-10 h-10 flex items-center justify-center hover:bg-[#2a2a2a] rounded-full transition-colors"
            aria-label="Redo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M13.8332 11.6667L17.1665 8.33333M17.1665 8.33333L13.8332 5M17.1665 8.33333H7.99984C7.11578 8.33333 6.26794 8.68452 5.64282 9.30964C5.01769 9.93477 4.6665 10.7826 4.6665 11.6667C4.6665 12.5507 5.01769 13.3986 5.64282 14.0237C6.26794 14.6488 7.11578 15 7.99984 15H8.83317" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="w-px h-6 bg-[#2a2a2a]" />

          <button 
            className="flex items-center gap-2 px-4 h-10 hover:bg-[#2a2a2a] rounded-full transition-colors"
            aria-label="Preview"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M5.5 3.33357V16.6669C5.49996 16.8152 5.53948 16.9608 5.61448 17.0887C5.68949 17.2166 5.79726 17.3222 5.92669 17.3945C6.05611 17.4669 6.20249 17.5034 6.35074 17.5003C6.49898 17.4972 6.64371 17.4546 6.77 17.3769L17.6033 10.7102C17.7247 10.6357 17.8249 10.5313 17.8944 10.407C17.9639 10.2827 18.0004 10.1426 18.0004 10.0002C18.0004 9.85783 17.9639 9.71779 17.8944 9.5935C17.8249 9.4692 17.7247 9.36479 17.6033 9.29024L6.77 2.62357C6.64371 2.54587 6.49898 2.50328 6.35074 2.50018C6.20249 2.49709 6.05611 2.5336 5.92669 2.60595C5.79726 2.67831 5.68949 2.78388 5.61448 2.91179C5.53948 3.03969 5.49996 3.18529 5.5 3.33357Z" fill="white"/>
            </svg>
            <span className="text-white font-bold text-sm leading-none tracking-[-0.56px]" style={{ fontFamily: 'Urbanist, sans-serif' }}>
              Preview
            </span>
          </button>
        </div>

        {/* Floating Functions Panel - Only show when node is selected */}
        {selectedNode && (
          <div className="absolute top-20 right-6 w-[360px] bg-[#1a1a1a] rounded-2xl shadow-2xl border border-[#2a2a2a] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#2a2a2a]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">Functions</h3>
                  <p className="text-xs text-[#888888] mt-0.5">Run JS functions using data</p>
                </div>
                <button 
                  onClick={() => setSelectedNodeId(null)}
                  className="w-7 h-7 flex items-center justify-center hover:bg-[#2a2a2a] rounded transition-colors text-[#777e90] hover:text-[#ffffff]"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4H14M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31304 14.6667 3.97391 14.5262 3.72386 14.2761C3.47381 14.0261 3.33333 13.687 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2.31304 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31304 1.33333 6.66667 1.33333H9.33333C9.68696 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31304 10.6667 2.66667V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="text-xs text-[#888888] mb-2 block">Name</label>
                <input
                  type="text"
                  value={(selectedNode.data.label as string) || ''}
                  onChange={(e) => handleNodeNameChange(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-3.5 py-2.5 text-sm text-[#e5e5e5] focus:outline-none focus:border-[#99c8e6]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-[#888888]">JS Code</label>
                  <p className="text-[10px] text-[#666666]">Available variables: $value$</p>
                </div>
                <textarea
                  value={(selectedNode.data.code as string) || 'console.log($value$)\nreturn $value$'}
                  onChange={(e) => handleNodeCodeChange(e.target.value)}
                  className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4 font-mono text-xs leading-relaxed text-[#e5e5e5] focus:outline-none focus:border-[#99c8e6] resize-none"
                  rows={6}
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ReactFlowComponent() {
  const veltInitialized = useVeltInitState()
  
  return (
    <div className="relative w-full h-screen">
      {/* [Velt] Toolbar - Auto-logged in as Jim Halpert */}
      <div className="absolute top-2 right-6 flex items-center gap-1 bg-[#1a1a1a] rounded-full px-2 py-2 shadow-2xl border border-[#2a2a2a] z-50">
        {veltInitialized && (
          <>

            {/* [Velt] SidebarButton (Comment Panel) */}
            <div className="px-2">
              <SidebarButton />
            </div>

            <div className="w-px h-6 bg-[#2a2a2a]" />

            {/* [Velt] NotificationsTool */}
            <div className="px-2">
              <NotificationsTool />
            </div>

            <div className="w-px h-6 bg-[#2a2a2a]" />

            {/* [Velt] CommentTool */}
            <div className="px-2">
              <CommentTool />
            </div>

            <div className="w-px h-6 bg-[#2a2a2a]" />

            {/* [Velt] Presence */}
            <div className="px-2">
              <Presence />
            </div>
          </>
        )}
      </div>

      {!veltInitialized ? (
        <div className="flex items-center justify-center h-screen bg-[#000000] text-white text-lg">
          Initializing collaboration...
        </div>
      ) : (
        <ReactFlowProvider>
          <AddNodeOnEdgeDrop />
        </ReactFlowProvider>
      )}
    </div>
  )
}
