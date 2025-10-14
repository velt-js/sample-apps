'use client';

import { useState } from 'react';

// Figma Asset URLs
const imgTablerIconChevronLeftPipe = "http://localhost:3845/assets/8711cbc78504775633042ade7f76f8c9b6775c18.svg";
const imgTablerIconPointer = "http://localhost:3845/assets/5020f9eedea273d5827b162835e60bf3fd91aa04.svg";
const imgTablerIconPlayerStopFilled = "http://localhost:3845/assets/a75186877e0c30c53276160e1cf17fff0234e51d.svg";
const imgTablerIconNote = "http://localhost:3845/assets/f678fa5417e4bb046e384c4a96a79ba784ede46f.svg";
const imgTablerIconFunction = "http://localhost:3845/assets/b7d1506742e92dd5a464615ffa1e0bb0472cb5fc.svg";
const imgTablerIconDatabase = "http://localhost:3845/assets/c1bf9c17882f9f7491117c55086113ee92b67eaa.svg";
const imgTablerIconTopologyRing = "http://localhost:3845/assets/d41237e3fc56722648e000d7bb5378984ecaefc6.svg";
const imgTablerIconShieldCheckFilled = "http://localhost:3845/assets/d1583a7db57259d5ca42e31f24c0587506ecfd0a.svg";
const imgTablerIconRouteAltRight = "http://localhost:3845/assets/275a5716425f11ecc8ee8fa1e95e6c781e00e86c.svg";
const imgTablerIconRepeat = "http://localhost:3845/assets/55569313b7d7aba8e7d895d69333ac68fec0ff83.svg";
const imgTablerIconEyeCheck = "http://localhost:3845/assets/f860e69817a0128b4c7ad994c307c0e40bf1c0cc.svg";
const imgTablerIconTransform = "http://localhost:3845/assets/0bb389ed5e8cce0ec63ef8978a2e2dae83be9153.svg";
const imgTablerIconCircleDotFilled = "http://localhost:3845/assets/ca34fbf9d4917e4ed77e70ee537813d79be3571e.svg";

interface SidebarItemProps {
  icon: string;
  label: string;
  bgColor: string;
  iconSize?: string;
  nodeType: string;
}

function SidebarItem({ icon, label, bgColor, iconSize = '13.897px', nodeType }: SidebarItemProps) {
  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('nodeData', JSON.stringify({
      label,
      icon,
      accentColor: bgColor,
      type: nodeType
    }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="flex items-center justify-center gap-3 px-2 py-1.5 rounded-full cursor-grab active:cursor-grabbing hover:bg-white/5 transition-colors"
      draggable
      onDragStart={onDragStart}
    >
      <div
        className="flex items-center justify-center p-[5.051px] rounded-[5.559px] shrink-0"
        style={{ backgroundColor: bgColor }}
      >
        <img
          src={icon}
          alt=""
          className="block max-w-none"
          style={{ width: iconSize, height: iconSize }}
        />
      </div>
      <p className="font-['Urbanist',_sans-serif] font-normal text-base leading-none text-white whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}

interface SidebarSectionProps {
  title: string;
  items: Array<{ icon: string; label: string; bgColor: string; iconSize?: string; nodeType: string }>;
}

function SidebarSection({ title, items }: SidebarSectionProps) {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex gap-1 items-start px-2 py-1.5 rounded-full w-full">
        <p className="font-['Urbanist',_sans-serif] font-semibold text-xs leading-none text-neutral-400 uppercase tracking-[0.96px] whitespace-nowrap">
          {title}
        </p>
      </div>
      <div className="flex flex-col gap-0.5 items-start w-full">
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            bgColor={item.bgColor}
            iconSize={item.iconSize}
            nodeType={item.nodeType}
          />
        ))}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const coreItems = [
    { icon: imgTablerIconPointer, label: 'Agent', bgColor: '#99c8e6', nodeType: 'agent' },
    { icon: imgTablerIconPlayerStopFilled, label: 'End', bgColor: '#99c8e6', nodeType: 'end' },
    { icon: imgTablerIconNote, label: 'Note', bgColor: '#99c8e6', nodeType: 'note' },
  ];

  const toolsItems = [
    { icon: imgTablerIconFunction, label: 'Functions', bgColor: '#f7c44e', iconSize: '13px', nodeType: 'function' },
    { icon: imgTablerIconDatabase, label: 'File Search', bgColor: '#f7c44e', iconSize: '13px', nodeType: 'fileSearch' },
    { icon: imgTablerIconTopologyRing, label: 'MCP', bgColor: '#f7c44e', iconSize: '13px', nodeType: 'mcp' },
    { icon: imgTablerIconShieldCheckFilled, label: 'Guard Rails', bgColor: '#f7c44e', iconSize: '13px', nodeType: 'guardRails' },
  ];

  const logicItems = [
    { icon: imgTablerIconRouteAltRight, label: 'If / Else', bgColor: '#99c8e6', iconSize: '13px', nodeType: 'ifElse' },
    { icon: imgTablerIconRepeat, label: 'While', bgColor: '#99c8e6', iconSize: '13px', nodeType: 'while' },
    { icon: imgTablerIconEyeCheck, label: 'User Approval', bgColor: '#99c8e6', iconSize: '13px', nodeType: 'userApproval' },
  ];

  const dataItems = [
    { icon: imgTablerIconTransform, label: 'Transform', bgColor: '#99c8e6', iconSize: '13px', nodeType: 'transform' },
    { icon: imgTablerIconCircleDotFilled, label: 'Set State', bgColor: '#99c8e6', iconSize: '13px', nodeType: 'setState' },
  ];

  // Collapsed state - just the button
  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="flex gap-2.5 items-center p-2 rounded-full shrink-0 hover:bg-white/5 transition-colors"
        style={{
          backgroundColor: '#141414',
        }}
      >
        <img
          src={imgTablerIconChevronLeftPipe}
          alt="Expand"
          className="block max-w-none w-5 h-5"
          style={{ transform: 'rotate(180deg)' }}
        />
      </button>
    );
  }

  // Open state - full sidebar
  return (
    <aside
      className="flex flex-col items-start overflow-hidden relative"
      style={{
        width: '270px',
        height: '668px',
        backgroundColor: '#0e0e0e',
        borderRadius: '12px',
        boxShadow: '0px -24px 100px 0px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 w-full shrink-0">
        <div className="flex flex-col gap-1.5 items-start leading-none text-white whitespace-nowrap">
          <p className="font-['Urbanist',_sans-serif] font-normal text-xs opacity-52">
            My Workflows
          </p>
          <p className="font-['Urbanist',_sans-serif] font-semibold text-base opacity-90">
            Slack Summarizer
          </p>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="flex gap-2.5 items-center p-2 rounded-full shrink-0 hover:bg-white/5 transition-colors"
        >
          <img
            src={imgTablerIconChevronLeftPipe}
            alt="Collapse"
            className="block max-w-none w-5 h-5"
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 items-start justify-center p-2 w-full shrink-0">
        <SidebarSection title="CORE" items={coreItems} />
        <SidebarSection title="TOOLS" items={toolsItems} />
        <SidebarSection title="LOGIC" items={logicItems} />
        <SidebarSection title="DATA" items={dataItems} />
      </div>
    </aside>
  );
}
