import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

// Lego user icon (yellow face) - from Figma tabler-icon-lego
export const LegoIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6667 14.6667H12.68M19.3333 14.6667H19.3467M12.6667 20C13.1012 20.4435 13.6198 20.7958 14.1922 21.0363C14.7645 21.2768 15.3792 21.4007 16 21.4007C16.6209 21.4007 17.2355 21.2768 17.8078 21.0363C18.3802 20.7958 18.8988 20.4435 19.3333 20M9.33333 6.66667H10.6667V4H21.3333V6.66667H22.6667C23.7275 6.66667 24.7449 7.08809 25.4951 7.83824C26.2452 8.58839 26.6667 9.6058 26.6667 10.6667V22.6667C26.6667 23.7275 26.2452 24.7449 25.4951 25.4951C24.7449 26.2452 23.7275 26.6667 22.6667 26.6667V28H9.33333V26.6667C8.27247 26.6667 7.25505 26.2452 6.50491 25.4951C5.75476 24.7449 5.33333 23.7275 5.33333 22.6667V10.6667C5.33333 9.6058 5.75476 8.58839 6.50491 7.83824C7.25505 7.08809 8.27247 6.66667 9.33333 6.66667Z" stroke="#FFC31C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Hierarchy icon for organization - white version for left panel
export const HierarchyIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.25 12.75H2.25V15.75H5.25V12.75ZM5.25 12.75L9 9.75M12.75 12.75H15.75V15.75H12.75V12.75ZM12.75 12.75L9 9.75M9 9.75V5.25M7.5 2.25H10.5V5.25H7.5V2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Hierarchy icon for graph badge - black version
export const HierarchyIconBlack = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.66667 11.3333H2V14H4.66667V11.3333ZM4.66667 11.3333L8 8.66667M11.3333 11.3333H14V14H11.3333V11.3333ZM11.3333 11.3333L8 8.66667M8 8.66667V4.66667M6.66667 2H9.33333V4.66667H6.66667V2Z" stroke="#111111" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Folder open icon - white version for left panel
export const FolderOpenIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.75 14.2515L5.81775 8.73821C5.87133 8.59528 5.96724 8.4721 6.09268 8.38513C6.21812 8.29815 6.36711 8.25152 6.51975 8.25146H15.75M3.75 14.2515H14.2695C14.6185 14.2514 14.9565 14.1296 15.2253 13.9072C15.4942 13.6847 15.6771 13.3755 15.7425 13.0327L16.4895 9.12446C16.5074 9.01707 16.5016 8.90707 16.4727 8.80212C16.4437 8.69717 16.3923 8.59977 16.3219 8.5167C16.2516 8.43363 16.164 8.36687 16.0652 8.32107C15.9664 8.27527 15.8589 8.25151 15.75 8.25146M3.75 14.2515C3.35218 14.2515 2.97064 14.0934 2.68934 13.8121C2.40804 13.5308 2.25 13.1493 2.25 12.7515V4.50146C2.25 4.10364 2.40804 3.72211 2.68934 3.4408C2.97064 3.1595 3.35218 3.00146 3.75 3.00146H6.75L9 5.25146H14.25C14.6478 5.25146 15.0294 5.4095 15.3107 5.6908C15.592 5.97211 15.75 6.35364 15.75 6.75146V8.25146" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Folder open icon - black version for graph badge
export const FolderOpenIconBlack = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33333 12.668L5.17133 7.7673C5.21896 7.64025 5.30421 7.53076 5.41571 7.45345C5.52722 7.37614 5.65965 7.33469 5.79533 7.33464H14M3.33333 12.668H12.684C12.9942 12.6679 13.2946 12.5597 13.5336 12.3619C13.7726 12.1642 13.9352 11.8893 13.9933 11.5846L14.6573 8.11064C14.6732 8.01517 14.6681 7.9174 14.6424 7.82411C14.6167 7.73081 14.5709 7.64424 14.5084 7.5704C14.4458 7.49656 14.368 7.43722 14.2802 7.39651C14.1924 7.35579 14.0968 7.33468 14 7.33464M3.33333 12.668C2.97971 12.668 2.64057 12.5275 2.39052 12.2774C2.14048 12.0274 2 11.6883 2 11.3346V4.0013C2 3.64768 2.14048 3.30854 2.39052 3.05849C2.64057 2.80844 2.97971 2.66797 3.33333 2.66797H6L8 4.66797H12.6667C13.0203 4.66797 13.3594 4.80844 13.6095 5.05849C13.8595 5.30854 14 5.64768 14 6.0013V7.33464" stroke="#111111" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// File description icon - white/pink version for left panel
export const FileDescriptionIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.4985 2.25V5.25C10.4985 5.44891 10.5776 5.63968 10.7182 5.78033C10.8589 5.92098 11.0496 6 11.2485 6H14.2485M10.4985 2.25H5.24854C4.85071 2.25 4.46918 2.40804 4.18787 2.68934C3.90657 2.97064 3.74854 3.35218 3.74854 3.75V14.25C3.74854 14.6478 3.90657 15.0294 4.18787 15.3107C4.46918 15.592 4.85071 15.75 5.24854 15.75H12.7485C13.1464 15.75 13.5279 15.592 13.8092 15.3107C14.0905 15.0294 14.2485 14.6478 14.2485 14.25V6M10.4985 2.25L14.2485 6M6.74854 12.75H11.2485M6.74854 9.75H11.2485" stroke="currentColor" strokeWidth="1.40625" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// File description icon - black version for graph badge
export const FileDescriptionIconBlack = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.3316 2V4.66667C9.3316 4.84348 9.40183 5.01305 9.52686 5.13807C9.65188 5.2631 9.82145 5.33333 9.99826 5.33333H12.6649M9.3316 2H4.66493C4.31131 2 3.97217 2.14048 3.72212 2.39052C3.47207 2.64057 3.3316 2.97971 3.3316 3.33333V12.6667C3.3316 13.0203 3.47207 13.3594 3.72212 13.6095C3.97217 13.8595 4.31131 14 4.66493 14H11.3316C11.6852 14 12.0244 13.8595 12.2744 13.6095C12.5245 13.3594 12.6649 13.0203 12.6649 12.6667V5.33333M9.3316 2L12.6649 5.33333M5.99826 11.3333H9.99826M5.99826 8.66667H9.99826" stroke="#111111" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Chevron down icon for dropdowns
export const ChevronDownIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Eye icon for access badge
export const EyeIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.44444 8C6.44444 8.44203 6.60833 8.86595 6.90006 9.17851C7.19178 9.49107 7.58744 9.66667 8 9.66667C8.41256 9.66667 8.80822 9.49107 9.09994 9.17851C9.39167 8.86595 9.55556 8.44203 9.55556 8C9.55556 7.55797 9.39167 7.13405 9.09994 6.82149C8.80822 6.50893 8.41256 6.33333 8 6.33333C7.58744 6.33333 7.19178 6.50893 6.90006 6.82149C6.60833 7.13405 6.44444 7.55797 6.44444 8Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 8C13.1333 11.3333 10.8 13 8 13C5.2 13 2.86667 11.3333 1 8C2.86667 4.66667 5.2 3 8 3C10.8 3 13.1333 4.66667 15 8Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Pencil icon for editor badge
export const PencilIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.74951 3.25L8.74951 5.25M1.99951 9.99991H3.99951L9.24951 4.74991C9.38083 4.61859 9.485 4.46268 9.55608 4.2911C9.62715 4.11952 9.66372 3.93562 9.66372 3.74991C9.66372 3.56419 9.62715 3.38029 9.55608 3.20871C9.485 3.03713 9.38083 2.88123 9.24951 2.74991C9.11819 2.61859 8.96229 2.51441 8.79071 2.44334C8.61913 2.37227 8.43523 2.33569 8.24951 2.33569C8.06379 2.33569 7.8799 2.37227 7.70832 2.44334C7.53674 2.51441 7.38083 2.61859 7.24951 2.74991L1.99951 7.99991V9.99991Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Clock icon
export const ClockIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.0833 11.3889L10 10V6.52778M3.75 10C3.75 10.8208 3.91166 11.6335 4.22575 12.3918C4.53984 13.1501 5.00022 13.8391 5.58058 14.4194C6.16095 14.9998 6.84994 15.4602 7.60823 15.7742C8.36651 16.0883 9.17924 16.25 10 16.25C10.8208 16.25 11.6335 16.0883 12.3918 15.7742C13.1501 15.4602 13.8391 14.9998 14.4194 14.4194C14.9998 13.8391 15.4602 13.1501 15.7742 12.3918C16.0883 11.6335 16.25 10.8208 16.25 10C16.25 9.17924 16.0883 8.36651 15.7742 7.60823C15.4602 6.84994 14.9998 6.16095 14.4194 5.58058C13.8391 5.00022 13.1501 4.53984 12.3918 4.22575C11.6335 3.91166 10.8208 3.75 10 3.75C9.17924 3.75 8.36651 3.91166 7.60823 4.22575C6.84994 4.53984 6.16095 5.00022 5.58058 5.58058C5.00022 6.16095 4.53984 6.84994 4.22575 7.60823C3.91166 8.36651 3.75 9.17924 3.75 10Z" stroke="currentColor" strokeWidth="1.38889" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Small arrow icon for user dropdown
export const SmallArrowIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 9.5 5.5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.75 0.75L4.75 4.75L8.75 0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
