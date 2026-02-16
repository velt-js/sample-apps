import React, { useId } from 'react';
import colors from './colors';

/**
 * Safari cannot resolve url(#id) when the ID contains special characters
 * like the colons in React's useId() output (e.g. ":r0:").
 * This helper strips non-alphanumeric chars to produce safe SVG IDs.
 */
function useSvgId(prefix: string) {
    const id = useId();
    return `${prefix}_${id.replace(/[^a-zA-Z0-9]/g, '')}`;
}

// ============================================
// Comment Tool Icons
// ============================================

export const CommentNoCommentsIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.82188 14.3819C2.74905 14.4431 2.66025 14.4823 2.56591 14.4949C2.47158 14.5074 2.37562 14.4928 2.28931 14.4527C2.20301 14.4126 2.12994 14.3487 2.07869 14.2685C2.02744 14.1883 2.00014 14.0952 2 14V4C2 3.86739 2.05268 3.74021 2.14645 3.64645C2.24021 3.55268 2.36739 3.5 2.5 3.5H13.5C13.6326 3.5 13.7598 3.55268 13.8536 3.64645C13.9473 3.74021 14 3.86739 14 4V12C14 12.1326 13.9473 12.2598 13.8536 12.3536C13.7598 12.4473 13.6326 12.5 13.5 12.5H5.15625C5.03847 12.5 4.92448 12.5416 4.83437 12.6175L2.82188 14.3819Z" stroke="#5C6C8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const CommentHasCommentsIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.82188 14.3819C2.74905 14.4431 2.66025 14.4823 2.56591 14.4949C2.47158 14.5074 2.37562 14.4928 2.28931 14.4527C2.20301 14.4126 2.12994 14.3487 2.07869 14.2685C2.02744 14.1883 2.00014 14.0952 2 14V4C2 3.86739 2.05268 3.74021 2.14645 3.64645C2.24021 3.55268 2.36739 3.5 2.5 3.5H13.5C13.6326 3.5 13.7598 3.55268 13.8536 3.64645C13.9473 3.74021 14 3.86739 14 4V12C14 12.1326 13.9473 12.2598 13.8536 12.3536C13.7598 12.4473 13.6326 12.5 13.5 12.5H5.15625C5.03847 12.5 4.92448 12.5416 4.83437 12.6175L2.82188 14.3819Z" stroke="#754CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.82188 14.3819C2.74905 14.4431 2.66025 14.4823 2.56591 14.4949C2.47158 14.5074 2.37562 14.4928 2.28931 14.4527C2.20301 14.4126 2.12994 14.3487 2.07869 14.2685C2.02744 14.1883 2.00014 14.0952 2 14V4C2 3.86739 2.05268 3.74021 2.14645 3.64645C2.24021 3.55268 2.36739 3.5 2.5 3.5H13.5C13.6326 3.5 13.7598 3.55268 13.8536 3.64645C13.9473 3.74021 14 3.86739 14 4V12C14 12.1326 13.9473 12.2598 13.8536 12.3536C13.7598 12.4473 13.6326 12.5 13.5 12.5H5.15625C5.03847 12.5 4.92448 12.5416 4.83437 12.6175L2.82188 14.3819Z" fill="#754CFF" />
    </svg>
);

// ============================================
// Comment Dialog Icons
// ============================================

export const ResolveIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.22729" y="1.22729" width="13.5455" height="13.5455" rx="6.77273" fill="white" stroke="#BFC8DC" />
    </svg>
);

export const ResolvedIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.727295" y="0.727295" width="14.5455" height="14.5455" rx="7.27273" fill="#1DCA73" />
        <rect x="11.1948" y="4.64136" width="1.5" height="8" rx="0.75" transform="rotate(45 11.1948 4.64136)" fill="white" />
        <rect x="3.74463" y="8.53052" width="1.5" height="4" rx="0.75" transform="rotate(-45 3.74463 8.53052)" fill="white" />
    </svg>
);

export const QuestionBarIcon = () => (
    <svg width="3" height="18" viewBox="0 0 3 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="18" rx="1.5" fill="currentColor" />
    </svg>
);

export const AssignUserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.00002 8.5C5.13102 8.5 2.77802 10.697 2.52502 13.5" stroke="#5C6C8A" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 8.5C9.65685 8.5 11 7.15685 11 5.5C11 3.84315 9.65685 2.5 8 2.5C6.34315 2.5 5 3.84315 5 5.5C5 7.15685 6.34315 8.5 8 8.5Z" stroke="#5C6C8A" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.5 9.5V13.5" stroke="#5C6C8A" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5 11.5H13.5" stroke="#5C6C8A" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const OptionsDotsIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" fill="white" fillOpacity="0.01" />
        <path d="M7 8.5C7 9.32843 7.67157 10 8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5Z" fill="#5C6C8A" />
        <path d="M12 8.5C12 9.32843 12.6716 10 13.5 10C14.3284 10 15 9.32843 15 8.5C15 7.67157 14.3284 7 13.5 7C12.6716 7 12 7.67157 12 8.5Z" fill="#5C6C8A" />
        <path d="M2 8.5C2 9.32843 2.67157 10 3.5 10C4.32843 10 5 9.32843 5 8.5C5 7.67157 4.32843 7 3.5 7C2.67157 7 2 7.67157 2 8.5Z" fill="#5C6C8A" />
    </svg>
);

export const PdfAttachmentIcon = () => {
    const filterId0 = useSvgId('f0pdf');
    const filterId2 = useSvgId('f2pdf');
    return (
        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter={`url(#${filterId0})`}>
                <path data-figma-bg-blur-radius="20" d="M26.5607 10.0607L19.9393 3.43934C19.658 3.15804 19.2765 3 18.8787 3H8C6.34315 3 5 4.34315 5 6V26C5 27.6569 6.34315 29 8 29H24C25.6569 29 27 27.6569 27 26V11.1213C27 10.7235 26.842 10.342 26.5607 10.0607Z" fill="white" fillOpacity="0.9" />
                <path d="M20.7922 24V17H25.0122V18.1H22.0422V20H24.6422V21.1H22.0422V24H20.7922Z" fill="#5C6C8A" />
                <path d="M14.1461 24V17H16.1961C17.9161 17 19.0961 18.42 19.0961 20.5C19.0961 22.58 17.9161 24 16.1961 24H14.1461ZM15.3961 22.9H16.1961C17.2061 22.9 17.8461 21.97 17.8461 20.5C17.8461 19.03 17.2061 18.1 16.1961 18.1H15.3961V22.9Z" fill="#5C6C8A" />
                <path d="M8 24V17H10.51C11.83 17 12.75 17.89 12.75 19.15C12.75 20.41 11.83 21.3 10.51 21.3H9.25V24H8ZM9.25 20.2H10.56C11.15 20.2 11.55 19.78 11.55 19.15C11.55 18.52 11.15 18.1 10.56 18.1H9.25V20.2Z" fill="#5C6C8A" />
                <g filter={`url(#${filterId2})`}>
                    <path d="M19 4V11H26" fill="white" />
                    <path d="M19 4V11H26L19 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
            </g>
            <defs>
                <filter id={filterId0} x="-2.66667" y="-1.33333" width="37.3333" height="37.3333" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1.33333" />
                    <feGaussianBlur stdDeviation="1.33333" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.643275 0 0 0 0 0.672823 0 0 0 0 0.725353 0 0 0 0.32 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
                <filter id={filterId2} x="14" y="1" width="17" height="17" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.496 0 0 0 0 0.554286 0 0 0 0 0.664 0 0 0 0.5 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export const ImgAttachmentIcon = () => {
    const filterId0 = useSvgId('f0img');
    const filterId2 = useSvgId('f2img');
    return (
        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter={`url(#${filterId0})`}>
                <path data-figma-bg-blur-radius="20" d="M26.5607 10.0607L19.9393 3.43934C19.658 3.15804 19.2765 3 18.8787 3H8C6.34315 3 5 4.34315 5 6V26C5 27.6569 6.34315 29 8 29H24C25.6569 29 27 27.6569 27 26V11.1213C27 10.7235 26.842 10.342 26.5607 10.0607Z" fill="white" fillOpacity="0.9" />
                <text x="8" y="24" fill="#5C6C8A" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="8.5" letterSpacing="0.3">IMG</text>
                <g filter={`url(#${filterId2})`}>
                    <path d="M19 4V11H26" fill="white" />
                    <path d="M19 4V11H26L19 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
            </g>
            <defs>
                <filter id={filterId0} x="-2.66667" y="-1.33333" width="37.3333" height="37.3333" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1.33333" />
                    <feGaussianBlur stdDeviation="1.33333" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.643275 0 0 0 0 0.672823 0 0 0 0 0.725353 0 0 0 0.32 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
                <filter id={filterId2} x="14" y="1" width="17" height="17" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.496 0 0 0 0 0.554286 0 0 0 0 0.664 0 0 0 0.5 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export const DownloadIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" transform="translate(4 4)" fill="white" fillOpacity="0.01" />
        <path d="M12.5 5.5L12.5 15.5" stroke="#5C6C8A" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 11.5L12.5 15.5L8.5 11.5" stroke="#5C6C8A" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 15.5V16.5C6.5 17.6046 7.39543 18.5 8.5 18.5H16.5C17.6046 18.5 18.5 17.6046 18.5 16.5V15.5" stroke="#465169" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ReplyIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 3.5V6.5C4.5 7.29565 4.81607 8.05871 5.37868 8.62132C5.94129 9.18393 6.70435 9.5 7.5 9.5H12.5" stroke="#465169" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5 6.5L12.5 9.5L9.5 12.5" stroke="#465169" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const CloseCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM10.3538 9.64625C10.4002 9.69271 10.4371 9.74786 10.4622 9.80855C10.4873 9.86925 10.5003 9.9343 10.5003 10C10.5003 10.0657 10.4873 10.1308 10.4622 10.1914C10.4371 10.2521 10.4002 10.3073 10.3538 10.3538C10.3073 10.4002 10.2521 10.4371 10.1915 10.4622C10.1308 10.4873 10.0657 10.5003 10 10.5003C9.93431 10.5003 9.86925 10.4873 9.80855 10.4622C9.74786 10.4371 9.69271 10.4002 9.64625 10.3538L8 8.70687L6.35375 10.3538C6.3073 10.4002 6.25215 10.4371 6.19145 10.4622C6.13075 10.4873 6.0657 10.5003 6 10.5003C5.93431 10.5003 5.86925 10.4873 5.80855 10.4622C5.74786 10.4371 5.69271 10.4002 5.64625 10.3538C5.5998 10.3073 5.56295 10.2521 5.53781 10.1914C5.51266 10.1308 5.49972 10.0657 5.49972 10C5.49972 9.9343 5.51266 9.86925 5.53781 9.80855C5.56295 9.74786 5.5998 9.69271 5.64625 9.64625L7.29313 8L5.64625 6.35375C5.55243 6.25993 5.49972 6.13268 5.49972 6C5.49972 5.86732 5.55243 5.74007 5.64625 5.64625C5.74007 5.55243 5.86732 5.49972 6 5.49972C6.13268 5.49972 6.25993 5.55243 6.35375 5.64625L8 7.29313L9.64625 5.64625C9.69271 5.59979 9.74786 5.56294 9.80855 5.5378C9.86925 5.51266 9.93431 5.49972 10 5.49972C10.0657 5.49972 10.1308 5.51266 10.1915 5.5378C10.2521 5.56294 10.3073 5.59979 10.3538 5.64625C10.4002 5.6927 10.4371 5.74786 10.4622 5.80855C10.4873 5.86925 10.5003 5.9343 10.5003 6C10.5003 6.0657 10.4873 6.13075 10.4622 6.19145C10.4371 6.25214 10.4002 6.3073 10.3538 6.35375L8.70688 8L10.3538 9.64625Z" fill="#9AA8C3" />
    </svg>
);

export const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.6056 7.55279L3.54513 2.02257C3.1517 1.82585 2.71428 2.19641 2.84364 2.61682L4.45476 7.85296C4.48424 7.94877 4.48424 8.05123 4.45476 8.14704L2.84364 13.3832C2.71428 13.8036 3.1517 14.1741 3.54513 13.9774L14.6056 8.44721C14.9741 8.26295 14.9741 7.73705 14.6056 7.55279Z" fill="white" />
    </svg>
);

export const AttachmentIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.85695 5.357L5.85195 8.362C5.16895 9.045 5.16895 10.153 5.85195 10.837C6.53495 11.52 7.64295 11.52 8.32695 10.837L12.393 6.771C13.76 5.404 13.76 3.188 12.393 1.821C11.026 0.453996 8.80995 0.453996 7.44295 1.821L3.02395 6.241C0.97395 8.291 0.97395 11.615 3.02395 13.666C5.07395 15.716 8.39795 15.716 10.449 13.666L14.514 9.6" stroke="#9AA8C3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const MentionIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.24976 0.489441C6.86723 -0.102535 8.63323 -0.15659 10.2839 0.335144C11.9348 0.827063 13.3831 1.83904 14.4128 3.21991C15.4426 4.60085 15.9993 6.27757 15.9998 8.00018V9.50018C15.9997 10.1632 15.7361 10.799 15.2673 11.2678C14.7985 11.7365 14.1627 12.0002 13.4998 12.0002C12.8368 12.0001 12.201 11.7365 11.7322 11.2678C11.4901 11.0257 11.3031 10.7389 11.1785 10.4269C10.4475 11.3828 9.29598 12.0002 7.99976 12.0002C5.79077 12.0001 3.99982 10.2092 3.99976 8.00018C3.99976 5.79113 5.79073 4.00031 7.99976 4.00018C9.19451 4.00018 10.2668 4.52418 10.9998 5.35468V4.50018C10.9998 4.22412 11.2237 4.0003 11.4998 4.00018C11.7759 4.00018 11.9997 4.22405 11.9998 4.50018V9.50018C11.9998 9.89789 12.158 10.2795 12.4392 10.5607C12.7205 10.8419 13.1021 11.0001 13.4998 11.0002C13.8975 11.0002 14.279 10.8419 14.5603 10.5607C14.8416 10.2795 14.9997 9.89794 14.9998 9.50018V8.00018C14.9993 6.4929 14.5121 5.02589 13.6111 3.81757C12.7101 2.60942 11.4431 1.72455 9.99878 1.29413C8.55431 0.863749 7.00891 0.910873 5.59351 1.42889C4.17831 1.947 2.96761 2.90811 2.14233 4.16913C1.3171 5.43025 0.920648 6.92455 1.01245 8.42889C1.10432 9.93308 1.67975 11.3674 2.6521 12.5187C3.62464 13.6701 4.94311 14.4774 6.41089 14.8195C7.87868 15.1615 9.41823 15.0209 10.7996 14.4182C11.0526 14.3077 11.3472 14.423 11.4578 14.676C11.5682 14.929 11.4529 15.2236 11.2 15.3342C9.6212 16.0231 7.86193 16.1841 6.18433 15.7932C4.50674 15.4022 2.99998 14.4802 1.88843 13.1642C0.77693 11.8483 0.119337 10.2088 0.0144043 8.48944C-0.0905067 6.77015 0.362238 5.06258 1.30542 3.62128C2.24862 2.18007 3.63232 1.08154 5.24976 0.489441ZM7.99976 5.00018C6.34301 5.00032 4.99976 6.34341 4.99976 8.00018C4.99982 9.6569 6.34305 11.0001 7.99976 11.0002C9.65657 11.0002 10.9997 9.65698 10.9998 8.00018C10.9998 6.34333 9.65661 5.00018 7.99976 5.00018Z" fill="#9AA8C3" />
    </svg>
);

export const DeleteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" fill="white" fillOpacity="0.01" />
        <path d="M12.5 3.5L3.5 12.5" stroke="#5C6C8A" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.5 3.5L12.5 12.5" stroke="#5C6C8A" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ConfirmDialogCloseIcon = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="16" transform="translate(4 4)" fill="white" fillOpacity="0.01" />
            <path d="M17.5 6.5L6.5 17.5" stroke={colors.neutral.p70} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.5 6.5L17.5 17.5" stroke={colors.neutral.p70} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export const LoadingSpinnerIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.3" d="M2.70923 8.39768C2.68402 7.67585 2.80124 6.95612 3.05418 6.27959C3.30713 5.60306 3.69085 4.98297 4.18343 4.45474C4.67602 3.9265 5.26783 3.50046 5.92507 3.20094C6.58231 2.90142 7.2921 2.73429 8.01393 2.70908C8.73576 2.68387 9.45549 2.80109 10.132 3.05403C10.8086 3.30698 11.4286 3.6907 11.9569 4.18328C12.4851 4.67587 12.9111 5.26768 13.2107 5.92492C13.5102 6.58215 13.6773 7.29195 13.7025 8.01378C13.7277 8.73561 13.6105 9.45534 13.3576 10.1319C13.1046 10.8084 12.7209 11.4285 12.2283 11.9567C11.7357 12.485 11.1439 12.911 10.4867 13.2105C9.82945 13.51 9.11966 13.6772 8.39783 13.7024C7.676 13.7276 6.95627 13.6104 6.27974 13.3574C5.60321 13.1045 4.98312 12.7208 4.45489 12.2282C3.92665 11.7356 3.50061 11.1438 3.20109 10.4865C2.90157 9.8293 2.73444 9.1195 2.70923 8.39767L2.70923 8.39768Z" stroke="#754CFF" />
        <path d="M2.70923 8.39768C2.67894 7.53025 2.85437 6.66796 3.22119 5.88133C3.588 5.09469 4.13578 4.40604 4.81974 3.87167C5.5037 3.3373 6.30442 2.97239 7.15643 2.80678C8.00844 2.64117 8.88755 2.67955 9.72189 2.91879" stroke="#754CFF" strokeLinecap="round" />
    </svg>
);

export const ImageFileIcon = () => (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none"
        xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
        focusable="false" role="img" aria-label="Image file">
        <path
            d="M18.6667 4V9.33333C18.6667 9.68696 18.8072 10.0261 19.0572 10.2761C19.3073 10.5262 19.6464 10.6667 20 10.6667H25.3334M18.6667 4H9.33337C8.62613 4 7.94785 4.28095 7.44776 4.78105C6.94766 5.28115 6.66671 5.95942 6.66671 6.66667V16M18.6667 4L25.3334 10.6667M25.3334 10.6667V16M5 20H9M7 20V28M5 28H9M12 28V20L16 24L20 20V28M28 22C28 20.8954 27.1046 20 26 20H25C23.8954 20 23 20.8954 23 22V26C23 27.1046 23.8954 28 25 28H26C27.1046 28 28 27.1046 28 26V24H25.5"
            stroke="#754CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const VideoFileIcon = () => (
    <svg width="28" height="28" viewBox="0 0 32 32"
        fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
        focusable="false" role="img" aria-label="Video file">
        <path
            d="M2.66663 10.6667C2.66663 9.25218 3.22853 7.89563 4.22872 6.89543C5.22892 5.89524 6.58547 5.33334 7.99996 5.33334H24C25.4144 5.33334 26.771 5.89524 27.7712 6.89543C28.7714 7.89563 29.3333 9.25218 29.3333 10.6667V21.3333C29.3333 22.7478 28.7714 24.1044 27.7712 25.1046C26.771 26.1048 25.4144 26.6667 24 26.6667H7.99996C6.58547 26.6667 5.22892 26.1048 4.22872 25.1046C3.22853 24.1044 2.66663 22.7478 2.66663 21.3333V10.6667Z"
            stroke="#754CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.3333 12L20 16L13.3333 20V12Z" stroke="#754CFF" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" />
    </svg>
);

export const PdfFileTypeIcon = () => (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none"
        xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
        focusable="false" role="img" aria-label="PDF file">
        <path
            d="M18.6666 4V9.33333C18.6666 9.68696 18.8071 10.0261 19.0572 10.2761C19.3072 10.5262 19.6463 10.6667 20 10.6667H25.3333M18.6666 4H9.33329C8.62605 4 7.94777 4.28095 7.44767 4.78105C6.94758 5.28115 6.66663 5.95942 6.66663 6.66667V16M18.6666 4L25.3333 10.6667M25.3333 10.6667V16M6.66663 24H8.66663C9.19706 24 9.70577 23.7893 10.0808 23.4142C10.4559 23.0391 10.6666 22.5304 10.6666 22C10.6666 21.4696 10.4559 20.9609 10.0808 20.5858C9.70577 20.2107 9.19706 20 8.66663 20H6.66663V28M22.6666 24H25.3333M26.6666 20H22.6666V28M14.6666 20V28H16C16.7072 28 17.3855 27.719 17.8856 27.219C18.3857 26.7189 18.6666 26.0406 18.6666 25.3333V22.6667C18.6666 21.9594 18.3857 21.2811 17.8856 20.781C17.3855 20.281 16.7072 20 16 20H14.6666Z"
            stroke="#754CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const JsonFileIcon = () => (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none"
        xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
        focusable="false" role="img" aria-label="JSON file">
        <path
            d="M18.6667 4V9.33333C18.6667 9.68696 18.8072 10.0261 19.0572 10.2761C19.3073 10.5262 19.6464 10.6667 20 10.6667H25.3334M18.6667 4H9.33337C8.62613 4 7.94785 4.28095 7.44776 4.78105C6.94766 5.28115 6.66671 5.95942 6.66671 6.66667V16M18.6667 4L25.3334 10.6667M25.3334 10.6667V16M24 28V20L27 28V20M5 20H8V26.5C8 26.8978 7.84196 27.2794 7.56066 27.5607C7.27936 27.842 6.89782 28 6.5 28C6.10218 28 5.72064 27.842 5.43934 27.5607C5.15804 27.2794 5 26.8978 5 26.5V26M11 27C11 27.2652 11.1054 27.5196 11.2929 27.7071C11.4804 27.8946 11.7348 28 12 28H13C13.2652 28 13.5196 27.8946 13.7071 27.7071C13.8946 27.5196 14 27.2652 14 27V25C14 24.7348 13.8946 24.4804 13.7071 24.2929C13.5196 24.1054 13.2652 24 13 24H12C11.7348 24 11.4804 23.8946 11.2929 23.7071C11.1054 23.5196 11 23.2652 11 23V21C11 20.7348 11.1054 20.4804 11.2929 20.2929C11.4804 20.1054 11.7348 20 12 20H13C13.2652 20 13.5196 20.1054 13.7071 20.2929C13.8946 20.4804 14 20.7348 14 21M19 20C19.5304 20 20.0391 20.2107 20.4142 20.5858C20.7893 20.9609 21 21.4696 21 22V26C21 26.5304 20.7893 27.0391 20.4142 27.4142C20.0391 27.7893 19.5304 28 19 28C18.4696 28 17.9609 27.7893 17.5858 27.4142C17.2107 27.0391 17 26.5304 17 26V22C17 21.4696 17.2107 20.9609 17.5858 20.5858C17.9609 20.2107 18.4696 20 19 20Z"
            stroke="#754CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const DefaultFileIcon = () => (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true" focusable="false" role="img" aria-label="Default file">
        <path
            d="M18.6667 4V9.33333C18.6667 9.68696 18.8072 10.0261 19.0573 10.2761C19.3073 10.5262 19.6465 10.6667 20.0001 10.6667H25.3334M18.6667 4H9.33341C8.62617 4 7.94789 4.28095 7.4478 4.78105C6.9477 5.28115 6.66675 5.95942 6.66675 6.66667V16M18.6667 4L25.3334 10.6667M25.3334 10.6667V16L25.5001 25.3333C25.5001 26.0406 25.2192 26.7189 24.7191 27.219C24.219 27.719 23.5407 28 22.8335 28H9.50012C8.79288 28 8.1146 27.719 7.6145 27.219C7.11441 26.7189 6.83346 26.0406 6.83346 25.3333L6.66675 16.1667"
            stroke="#754CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ============================================
// Comments Sidebar Icons
// ============================================

export const FilterIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" fill="white" fillOpacity="0.01" />
        <path d="M2.5 4.5H13.5" stroke="#5C6C8A" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.5 7.5H11.5" stroke="#5C6C8A" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.5 10.5H10.5" stroke="#465169" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const CheckIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="12" height="12" fill="white" fillOpacity="0.01" />
        <path fillRule="evenodd" clipRule="evenodd" d="M3.71402 5.30066C3.62206 5.20534 3.51205 5.12931 3.39042 5.07701C3.26879 5.0247 3.13797 4.99717 3.0056 4.99602C2.87323 4.99487 2.74195 5.02012 2.61943 5.0703C2.49691 5.12048 2.3856 5.19458 2.292 5.28829C2.19839 5.38199 2.12437 5.49342 2.07424 5.61607C2.02411 5.73872 1.99889 5.87013 2.00004 6.00265C2.00119 6.13516 2.02869 6.26612 2.08094 6.38787C2.13319 6.50963 2.20914 6.61976 2.30435 6.71182L4.29823 8.7078C4.48518 8.8949 4.73871 9 5.00306 9C5.26741 9 5.52094 8.8949 5.7079 8.7078L9.69565 4.71584C9.79086 4.62377 9.86681 4.51365 9.91906 4.39189C9.97131 4.27013 9.99881 4.13918 9.99996 4.00666C10.0011 3.87415 9.97589 3.74274 9.92576 3.62009C9.87563 3.49744 9.80161 3.38601 9.708 3.29231C9.6144 3.1986 9.50309 3.1245 9.38057 3.07432C9.25805 3.02414 9.12677 2.99889 8.9944 3.00004C8.86203 3.00119 8.73121 3.02872 8.60958 3.08102C8.48795 3.13333 8.37794 3.20936 8.28598 3.30468L5.00306 6.59106L3.71402 5.30066Z" fill="#754CFF" />
    </svg>
);

export const EmptyCommentIcon = () => {
    const filterId = useSvgId('fempty');
    return (
        <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter={`url(#${filterId})`}>
                <path d="M0.821875 10.8819C0.749049 10.9431 0.660252 10.9823 0.565914 10.9949C0.471577 11.0074 0.375619 10.9928 0.289312 10.9527C0.203006 10.9126 0.129936 10.8487 0.0786879 10.7685C0.0274397 10.6883 0.000141319 10.5952 0 10.5L0 0.5C0 0.367392 0.0526785 0.240215 0.146447 0.146447C0.240215 0.0526785 0.367392 0 0.5 0L11.5 0C11.6326 0 11.7598 0.0526785 11.8536 0.146447C11.9473 0.240215 12 0.367392 12 0.5V8.5C12 8.63261 11.9473 8.75978 11.8536 8.85355C11.7598 8.94732 11.6326 9 11.5 9H3.15625C3.03847 9.00003 2.92448 9.04164 2.83437 9.1175L0.821875 10.8819Z" fill="#9AA8C3" />
            </g>
            <defs>
                <filter id={filterId} x="0" y="0" width="12" height="11.9993" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="0.5" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
                </filter>
            </defs>
        </svg>
    );
};

export const BackArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.9999 8.66663H3.33325" stroke="#465169" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.33325 4.66669L3.33325 8.66669L7.33325 12.6667" stroke="#465169" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ============================================
// Sidebar Button Icon
// ============================================

export const SidebarButtonIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.82188 14.3819C2.74905 14.4431 2.66025 14.4823 2.56591 14.4949C2.47158 14.5074 2.37562 14.4928 2.28931 14.4527C2.20301 14.4126 2.12994 14.3487 2.07869 14.2685C2.02744 14.1883 2.00014 14.0952 2 14V4C2 3.86739 2.05268 3.74021 2.14645 3.64645C2.24021 3.55268 2.36739 3.5 2.5 3.5H13.5C13.6326 3.5 13.7598 3.55268 13.8536 3.64645C13.9473 3.74021 14 3.86739 14 4V12C14 12.1326 13.9473 12.2598 13.8536 12.3536C13.7598 12.4473 13.6326 12.5 13.5 12.5H5.15625C5.03847 12.5 4.92448 12.5416 4.83437 12.6175L2.82188 14.3819Z" stroke="#754CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.82188 14.3819C2.74905 14.4431 2.66025 14.4823 2.56591 14.4949C2.47158 14.5074 2.37562 14.4928 2.28931 14.4527C2.20301 14.4126 2.12994 14.3487 2.07869 14.2685C2.02744 14.1883 2.00014 14.0952 2 14V4C2 3.86739 2.05268 3.74021 2.14645 3.64645C2.24021 3.55268 2.36739 3.5 2.5 3.5H13.5C13.6326 3.5 13.7598 3.55268 13.8536 3.64645C13.9473 3.74021 14 3.86739 14 4V12C14 12.1326 13.9473 12.2598 13.8536 12.3536C13.7598 12.4473 13.6326 12.5 13.5 12.5H5.15625C5.03847 12.5 4.92448 12.5416 4.83437 12.6175L2.82188 14.3819Z" fill="#754CFF" />
    </svg>
);

// ============================================
// Reaction Tool Icon
// ============================================

export const ReactionIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.50021 2C7.77631 2.00004 8.00021 2.22389 8.00021 2.5C8.00021 2.77611 7.77631 2.99996 7.50021 3C6.41245 3 5.34899 3.32246 4.44454 3.92676C3.54008 4.5311 2.83543 5.39053 2.41915 6.39551C2.00291 7.40047 1.89346 8.50639 2.10567 9.57324C2.31792 10.6401 2.8424 11.6195 3.61153 12.3887C4.38067 13.1578 5.36016 13.6823 6.42696 13.8945C7.49379 14.1067 8.59976 13.9973 9.6047 13.5811C10.6097 13.1648 11.4691 12.4601 12.0734 11.5557C12.6778 10.6512 13.0002 9.58776 13.0002 8.5C13.0002 8.22386 13.2241 8 13.5002 8C13.7763 8.00004 14.0002 8.22389 14.0002 8.5C14.0002 9.78556 13.6187 11.0424 12.9045 12.1113C12.1903 13.1801 11.1751 14.0129 9.98751 14.5049C8.79982 14.9968 7.4925 15.1258 6.23165 14.875C4.97098 14.6241 3.81245 14.0056 2.90353 13.0967C1.9946 12.1878 1.37607 11.0292 1.12521 9.76855C0.874402 8.50768 1.00335 7.20041 1.49532 6.0127C1.98726 4.82506 2.82006 3.80992 3.88888 3.0957C4.95778 2.3815 6.21465 2 7.50021 2Z" fill="#9AA8C3" />
        <path fillRule="evenodd" clipRule="evenodd" d="M11.0002 9.5C11.0002 11.4329 9.43313 12.9999 7.50021 13C5.56721 13 4.00021 11.433 4.00021 9.5V9H11.0002V9.5ZM5.05001 10C5.28164 11.1411 6.29072 12 7.50021 12C8.70962 11.9999 9.71879 11.1411 9.9504 10H5.05001Z" fill="#9AA8C3" />
        <path d="M5.00021 6C5.55241 6.00009 6.00021 6.44777 6.00021 7C6.00021 7.55223 5.55241 7.99991 5.00021 8C4.44792 8 4.00021 7.55228 4.00021 7C4.00021 6.44772 4.44792 6 5.00021 6Z" fill="#9AA8C3" />
        <path d="M10.0002 6C10.5524 6.00009 11.0002 6.44777 11.0002 7C11.0002 7.55223 10.5524 7.99991 10.0002 8C9.44792 8 9.00021 7.55228 9.00021 7C9.00021 6.44772 9.44792 6 10.0002 6Z" fill="#9AA8C3" />
        <path d="M12.5002 2C12.7763 2.00009 13.0002 2.22391 13.0002 2.5V4H14.5002C14.7763 4.00009 15.0002 4.22391 15.0002 4.5C15.0002 4.77609 14.7763 4.99991 14.5002 5H13.0002V6.5C13.0002 6.77609 12.7763 6.99991 12.5002 7C12.2241 7 12.0002 6.77614 12.0002 6.5V5H10.5002C10.2241 5 10.0002 4.77614 10.0002 4.5C10.0002 4.22386 10.2241 4 10.5002 4H12.0002V2.5C12.0002 2.22386 12.2241 2 12.5002 2Z" fill="#9AA8C3" />
    </svg>
);

// ============================================
// Comment Bubble Icon (same as SidebarButtonIcon)
// ============================================

export const CommentBubbleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.82188 14.3819C2.74905 14.4431 2.66025 14.4823 2.56591 14.4949C2.47158 14.5074 2.37562 14.4928 2.28931 14.4527C2.20301 14.4126 2.12994 14.3487 2.07869 14.2685C2.02744 14.1883 2.00014 14.0952 2 14V4C2 3.86739 2.05268 3.74021 2.14645 3.64645C2.24021 3.55268 2.36739 3.5 2.5 3.5H13.5C13.6326 3.5 13.7598 3.55268 13.8536 3.64645C13.9473 3.74021 14 3.86739 14 4V12C14 12.1326 13.9473 12.2598 13.8536 12.3536C13.7598 12.4473 13.6326 12.5 13.5 12.5H5.15625C5.03847 12.5 4.92448 12.5416 4.83437 12.6175L2.82188 14.3819Z" stroke="#754CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.82188 14.3819C2.74905 14.4431 2.66025 14.4823 2.56591 14.4949C2.47158 14.5074 2.37562 14.4928 2.28931 14.4527C2.20301 14.4126 2.12994 14.3487 2.07869 14.2685C2.02744 14.1883 2.00014 14.0952 2 14V4C2 3.86739 2.05268 3.74021 2.14645 3.64645C2.24021 3.55268 2.36739 3.5 2.5 3.5H13.5C13.6326 3.5 13.7598 3.55268 13.8536 3.64645C13.9473 3.74021 14 3.86739 14 4V12C14 12.1326 13.9473 12.2598 13.8536 12.3536C13.7598 12.4473 13.6326 12.5 13.5 12.5H5.15625C5.03847 12.5 4.92448 12.5416 4.83437 12.6175L2.82188 14.3819Z" fill="#754CFF" />
    </svg>
);
