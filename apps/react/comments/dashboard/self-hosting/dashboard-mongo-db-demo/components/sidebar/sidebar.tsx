'use client';

import { VeltNotificationsTool } from '@veltdev/react';

// Sidebar icon assets
const imgLogo = "/icons/sidebar/open-envoy-logo.svg";
const imgHelp = "/icons/sidebar/help.svg";
const imgActivity = "/icons/sidebar/activity.svg";
const imgCopy = "/icons/sidebar/copy.svg";
const imgAccountsPayable = "/icons/sidebar/accounts-payable.svg";
const imgFolder = "/icons/sidebar/folder.svg";
const imgSearch = "/icons/sidebar/search.svg";
const imgNotifications = "/icons/sidebar/notifications.svg";
const imgHome = "/icons/sidebar/home.svg";
const imgInvoiceMatch = "/icons/sidebar/invoice-match.svg";
const imgBasicExpense = "/icons/sidebar/basic-expense.svg";
const imgAll = "/icons/sidebar/all.svg";
const imgInbox = "/icons/sidebar/inbox.svg";
const imgDocuments = "/icons/sidebar/documents.svg";
const imgAutomation = "/icons/sidebar/automation.svg";
const imgSettings = "/icons/sidebar/settings.svg";
const imgDivider = "/icons/sidebar/divider.svg";

interface NavItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
  isBold?: boolean;
  badge?: number;
  onClick?: () => void;
}

function NavItem({ icon, label, isActive = false, isBold = false, badge, onClick }: NavItemProps) {
  return (
    <button
      onClick={() => {
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
            src={imgLogo}
            alt="Dashboard Inline Demo"
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
          />
          <NavItem
            icon={imgFolder}
            label="Nexaform - AP"
          />
          <NavItem
            icon={imgSearch}
            label="Search"
          />
          <div className="relative w-100">
            {/* [Velt] Notifications Tool */}
            <VeltNotificationsTool shadowDom={false} panelShadowDom={false} />  
          </div>
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
          />
          <NavItem
            icon={imgSettings}
            label="Settings"
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
            </button>
          </div>
        </nav>
      </div>
      </aside>
    </div>
  );
}
