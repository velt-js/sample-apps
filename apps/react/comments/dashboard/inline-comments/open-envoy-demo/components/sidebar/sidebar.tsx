'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  Home,
  Inbox,
  FileText,
  Settings,
  HelpCircle,
  Activity
} from 'lucide-react';
import { VeltNotificationsPanel } from '@veltdev/react';

// Figma asset URLs
const imgOpenEnvoyWordmarkSmallUsePositive1 = "http://localhost:3845/assets/4db59bc8f8b7390f5a397ddcb346d679768cd93b.svg";
const imgHelp = "http://localhost:3845/assets/cca801e9734692c0f61ffd1a12f1cc18c63126da.svg";
const imgActivity = "http://localhost:3845/assets/7f353972bce7310debc62bdf8305c750f42160de.svg";
const imgChevron = "http://localhost:3845/assets/b4a728af80346863ec1045b114046a95bb630e3f.svg";
const imgCopy = "http://localhost:3845/assets/6c23016d6889d24eeab6e3e3f67208e5cf3176cf.svg";
const imgAccountsPayable = "http://localhost:3845/assets/8e97679ba6bf3fa20883a6d7a80f2a7622afbb60.svg";
const imgChevronDown = "http://localhost:3845/assets/fa2eead75170c4fb327e3de855aaad0f1302e763.svg";
const imgFolder = "http://localhost:3845/assets/4f22e1097dbb109bfacc00cf3d79fe27ce86c18e.svg";
const imgSearch = "http://localhost:3845/assets/0868e7842bca8868cab1b3f2a987fd97f46dfb49.svg";
const imgNotifications = "http://localhost:3845/assets/546ca7d85f6caa1763811140dd044f5bd70f9011.svg";
const imgHome = "http://localhost:3845/assets/488f22887338f92a5399bcb5286bb31a82c56d06.svg";
const imgInvoiceMatch = "http://localhost:3845/assets/7ccac0d17ba06cfd950632c0b0b4d0ca5e2264ea.svg";
const imgBasicExpense = "http://localhost:3845/assets/30a8816e2995f7cdd98328a198bd9555e751f340.svg";
const imgAll = "http://localhost:3845/assets/eada38a2f1aa4d02c54c372c415e429ae296c7a8.svg";
const imgInbox = "http://localhost:3845/assets/49070ea41b48ba84a5eae736a5fd294afe3f7543.svg";
const imgDocuments = "http://localhost:3845/assets/42ead957efa73b9d8992f23f7975a586d7b1d4e0.svg";
const imgAutomation = "http://localhost:3845/assets/a97fc97dcc1b862a5edbeae06fdc9c331cf9f994.svg";
const imgSettings = "http://localhost:3845/assets/3442077240aea20dd440c084ae881b4001ff950f.svg";
const imgDivider = "http://localhost:3845/assets/369d836e879c24468e297c2d79b92d70da965fca.svg";

interface NavItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
  isBold?: boolean;
  badge?: number;
  expandable?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, isActive = false, isBold = false, badge, expandable = false, onClick }: NavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <button
      onClick={() => {
        if (expandable) setIsExpanded(!isExpanded);
        if (onClick) onClick();
      }}
      className={`
        w-full h-8 flex items-center gap-3 px-2 py-1 rounded-[3px]
        transition-colors duration-150
        ${isActive ? 'bg-[rgba(242,244,255,0.65)] border border-[#DBE1FF]' : 'hover:bg-[#F2F4FF]/40'}
      `}
    >
      <img src={icon} alt="" className="w-4 h-4 flex-shrink-0 block" />
      <span
        className={`
          flex-1 text-left text-sm leading-[21px]
          ${isActive ? 'text-[#475EE5] font-medium tracking-[-0.042px]' : 'text-[#4A4947] tracking-[-0.105px]'}
          ${isBold && !isActive ? 'font-medium' : ''}
        `}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {label}
      </span>
      {badge && (
        <span
          className="flex items-center justify-center min-w-[18px] h-[18px] px-[5px] bg-[#BD323C] rounded-[5px] text-white text-xs font-medium leading-[18px] tracking-[0.25px]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {badge}
        </span>
      )}
      {expandable && (
        <img
          src={imgChevronDown}
          alt=""
          className={`w-4 h-4 transition-transform ${isExpanded ? '' : '-rotate-90'}`}
        />
      )}
    </button>
  );
}

interface SectionHeaderProps {
  label: string;
}

function SectionHeader({ label }: SectionHeaderProps) {
  return (
    <div
      className="text-[#777572] text-xs leading-[18px] tracking-[0.1px] uppercase px-2 pt-4 pb-1"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {label}
    </div>
  );
}

export default function Sidebar() {
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);

  const toggleNotificationsPanel = () => {
    setIsNotificationsPanelOpen(!isNotificationsPanelOpen);
  };

  return (
    <div className="flex h-full">
      <aside
        className="w-60 h-full flex flex-col relative flex-shrink-0"
        style={{
          backgroundColor: 'rgba(250, 250, 250, 0.5)',
        }}
      >
      {/* Divider on right edge */}
      <div className="absolute top-0 right-0 w-px h-full">
        <img src={imgDivider} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Main content wrapper */}
      <div className="flex flex-col h-full py-6 pl-4 pr-[15px]">
        {/* Header Section */}
        <div className="flex items-center gap-2 mb-6">
          <img
            src={imgOpenEnvoyWordmarkSmallUsePositive1}
            alt="OpenEnvoy"
            className="w-[113px] h-7"
          />
          <button className="ml-auto">
            <img src={imgCopy} alt="Copy" className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 flex flex-col gap-0.5 overflow-y-auto">
          <NavItem
            icon={imgAccountsPayable}
            label="Accounts Payable"
            isBold
            expandable
          />
          <NavItem
            icon={imgFolder}
            label="Nexaform - AP"
            expandable
          />
          <NavItem
            icon={imgSearch}
            label="Search"
          />
          <NavItem
            icon={imgNotifications}
            label="Notifications"
            badge={2}
            isActive={isNotificationsPanelOpen}
            onClick={toggleNotificationsPanel}
          />
          <NavItem
            icon={imgHome}
            label="Home"
          />

          {/* Modules Section */}
          <SectionHeader label="Modules" />
          <NavItem
            icon={imgInvoiceMatch}
            label="Invoice Match"
            isActive
          />
          <NavItem
            icon={imgBasicExpense}
            label="Basic Expense Approval"
          />
          <NavItem
            icon={imgAll}
            label="All"
          />

          {/* Data Section */}
          <SectionHeader label="Data" />
          <NavItem
            icon={imgInbox}
            label="Inbox"
          />
          <NavItem
            icon={imgDocuments}
            label="Documents & Sources"
          />

          {/* Manage Section */}
          <SectionHeader label="Manage" />
          <NavItem
            icon={imgAutomation}
            label="Automation"
            expandable
          />
          <NavItem
            icon={imgSettings}
            label="Settings"
            expandable
          />

          {/* Secondary Navigation - Bottom */}
          <div className="mt-auto pt-4">
            <NavItem
              icon={imgHelp}
              label="Help"
            />
            <NavItem
              icon={imgActivity}
              label="Activity"
            />

            {/* User Profile */}
            <button className="w-full h-8 flex items-center gap-[10px] pl-[6px] pr-2 py-1 rounded-[3px] hover:bg-[#F2F4FF]/40 transition-colors duration-150">
              <div className="w-5 h-5 rounded-full bg-[#3649B9] flex items-center justify-center text-white text-[9px] font-semibold leading-[18px]">
                LW
              </div>
              <span
                className="flex-1 text-left text-sm leading-[21px] text-[#4A4947] tracking-[-0.105px]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Linda Wang
              </span>
              <img
                src={imgChevronDown}
                alt=""
                className="w-4 h-4 -rotate-90"
              />
            </button>
          </div>
        </nav>
      </div>
      </aside>

      {/* Velt Notifications Panel - Embedded beside sidebar */}
      {isNotificationsPanelOpen && (
        <div className="h-full border-r border-[#E5E5E5] bg-white">
          <VeltNotificationsPanel
            shadowDom={false}
            tabConfig={{
              forYou: { name: "For You", enable: true },
              documents: { name: "Documents", enable: true },
              all: { name: "All", enable: true },
            }}
          />
        </div>
      )}
    </div>
  );
}
