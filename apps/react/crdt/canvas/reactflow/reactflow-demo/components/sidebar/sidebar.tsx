'use client';

import { useState } from 'react';

// Local Icon URLs (from /public/icons/)
const imgTablerIconChevronLeftPipe = "/icons/chevron-left-pipe.svg";
const imgTablerIconPointer = "/icons/pointer.svg";
const imgTablerIconPlayerStopFilled = "/icons/player-stop.svg";
const imgTablerIconNote = "/icons/note.svg";
const imgTablerIconFunction = "/icons/function.svg";
const imgTablerIconDatabase = "/icons/database.svg";
const imgTablerIconTopologyRing = "/icons/topology-ring.svg";
const imgTablerIconShieldCheckFilled = "/icons/shield-check.svg";
const imgTablerIconRouteAltRight = "/icons/route-alt-right.svg";
const imgTablerIconRepeat = "/icons/repeat.svg";
const imgTablerIconEyeCheck = "/icons/eye-check.svg";
const imgTablerIconTransform = "/icons/transform.svg";
const imgTablerIconCircleDotFilled = "/icons/circle-dot.svg";

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
  const [isCollapsed, setIsCollapsed] = useState(true);

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
