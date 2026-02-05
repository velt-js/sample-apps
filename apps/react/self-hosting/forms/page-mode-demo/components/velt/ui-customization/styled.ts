"use client";

import styled, { createGlobalStyle, keyframes } from 'styled-components';

// =============================================
// ANIMATIONS
// =============================================
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// =============================================
// GLOBAL STYLES (CSS Variables & Velt Overrides)
// =============================================
export const GlobalVeltStyles = createGlobalStyle`
  /* Theme Configuration - Based on Figma Design */
  :root {
    /* Typography */
    --velt-default-font-family: 'TT Interphases Pro Variable', Inter, system-ui, sans-serif;

    /* Border Radius */
    --velt-border-radius-2xs: 0.061rem;
    --velt-border-radius-xs: 0.125rem;
    --velt-border-radius-sm: 0.375rem;
    --velt-border-radius-md: 0.750rem;
    --velt-border-radius-lg: 1.000rem;
    --velt-border-radius-xl: 1.167rem;
    --velt-border-radius-2xl: 1.500rem;
    --velt-border-radius-3xl: 2.000rem;
    --velt-border-radius-full: 5.000rem;

    /* Light Mode */
    --velt-light-mode-accent: #754cff;
    --velt-light-mode-accent-hover: #5a34d9;
    --velt-light-mode-accent-light: #d3c5fc;
    --velt-light-mode-accent-text: #ffffff;
    --velt-light-mode-accent-foreground: #ffffff;
    --velt-light-mode-accent-transparent: rgba(20, 20, 20, 0.08);
    --velt-light-mode-background-0: #ffffff;
    --velt-light-mode-background-1: #fafafa;
    --velt-light-mode-background-2: #f5f5f5;
    --velt-light-mode-background-3: #f0f0f0;
    --velt-light-mode-error: #FF7162;
    --velt-light-mode-error-hover: #DE5041;
    --velt-light-mode-success: #198F65;
    --velt-light-mode-warning: #FFCD2E;

    /* Dark Mode */
    --velt-dark-mode-accent: #754cff;
    --velt-dark-mode-accent-hover: #5a34d9;
    --velt-dark-mode-background-0: #000000;
    --velt-dark-mode-background-1: #0a0a0a;

    /* Spacing */
    --velt-spacing-2xs: 0.125rem;
    --velt-spacing-xs: 0.194rem;
    --velt-spacing-sm: 0.291rem;
    --velt-spacing-md: 0.375rem;
    --velt-spacing-lg: 0.389rem;
    --velt-spacing-xl: 0.583rem;
    --velt-spacing-2xl: 1rem;

    /* Font Size */
    --velt-font-size-2xs: 0.625rem;
    --velt-font-size-xs: 0.681rem;
    --velt-font-size-sm: 0.875rem;
    --velt-font-size-md: 0.972rem;
    --velt-font-size-lg: 1.167rem;
    --velt-font-size-xl: 1.75rem;
    --velt-font-size-2xl: 2rem;
  }

  /* Comment tool hover effects */
  .comment-tool-icon:hover {
    color: #754cff !important;
  }

  .comment-bubble-icon:hover {
    opacity: 0.8;
  }

  /* Loading spinner animation */
  .loading-spinner {
    animation: ${rotate} 1s linear infinite;
  }

  /* =============================================
     VELT COMPONENT OVERRIDES
     ============================================= */
  
  .velt-comment-dialog {
    padding: 0 !important;
    border-radius: 0 !important;
    border: 0px !important;
    box-shadow: none !important;

    &:hover {
      border: 0px !important;
      background-color: transparent !important;
    }
  }

  div[data-velt-comment-dialog-comments-status="RESOLVED"] .privado-comment-dialog-assignee-banner-wrapper-right {
    text-decoration: line-through !important;
    color: var(--Text-text-fade, #7E8DA9) !important;
  }

  .velt-comment-dialog--focused-thread-mode {
    background-color: transparent !important;
  }

  .velt-thread-card--show-actions {
    .privado-comment-dialog-thread-card-top-wrapper-right {
      visibility: visible !important;
    }
  }

  .velt-thread-card--name {
    color: var(--Text-text-secondary, #465169) !important;
    font-variant-numeric: lining-nums tabular-nums !important;
    font-size: 13px !important;
    font-style: normal !important;
    font-weight: 492 !important;
    line-height: 18px !important;
  }

  .velt-thread-card--time {
    color: var(--Text-text-fade, #7E8DA9) !important;
    text-align: right !important;
    font-variant-numeric: lining-nums tabular-nums !important;
    font-size: 12px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 16px !important;
  }

  .velt-thread-card--message {
    padding: 0 !important;
    margin: 0 !important;
    align-self: stretch !important;
    color: var(--Text-text-secondary, #465169) !important;
    font-variant-numeric: lining-nums tabular-nums !important;
    font-size: 13px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 18px !important;
  }

  app-comment-dialog-toggle-reply-text {
    color: var(--Text-text-tertiary, #5C6C8A) !important;
    font-variant-numeric: lining-nums tabular-nums !important;
    font-size: 13px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 18px !important;
    text-transform: capitalize !important;
  }

  .velt-comment-dialog--page-mode-composer {
    background-color: transparent !important;
  }

  .velt-sidebar-container {
    padding: 0 !important;
    margin: 0 !important;
    border-radius: 0 !important;
    border: 0px !important;
    box-shadow: none !important;
    width: 380px;
    border-left: 1px solid var(--border-color-default, #EDF0F8) !important;
    background: var(--Gray-10, #F2F6FC);
  }

  .velt-status-dropdown--content {
    display: flex !important;
    width: 194px !important;
    padding: 0 4px !important;
    flex-direction: column !important;
    align-items: center !important;
    align-self: stretch !important;
    border-radius: 10px !important;
    background: var(--default-canvas, #FFF) !important;
    box-shadow: 0 0 0 1px rgba(12, 55, 136, 0.14) !important;
    margin-top: 4px !important;
    position: absolute !important;
  }

  .velt-comments-sidebar-minimal-filter-dropdown {
    position: relative !important;
  }

  .velt-comment-sidebar-minimal-filter-content-item--selected {
    span {
      color: var(--Text-text-accent, #754CFF) !important;
    }
    svg {
      display: flex !important;
    }
  }

  .velt-comment-sidebar-minimal-filter-dropdown-trigger-open {
    .privado-comments-sidebar-header-filter-dropdown-trigger-wrapper {
      display: flex;
      padding: 6px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      border-radius: var(--units-base, 16px);
      background: var(--default-canvas, #FFF);
      box-shadow: 0 0 0 1px #FFF, 0 0 0 4px rgba(30, 69, 169, 0.08);
    }
  }

  .velt-sidebar--comments-block {
    margin-bottom: 0 !important;
  }

  .velt-sidebar--comments-hr {
    display: none !important;
  }

  .velt-sidebar-content {
    display: flex;
    padding: 12px;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  app-comment-sidebar-list {
    padding: 0 !important;
    height: auto !important;
    flex: 1 !important;
  }

  .velt-sidebar-page-mode-composer {
    background-color: transparent !important;
    padding-bottom: 0 !important;
  }

  app-comment-sidebar-panel {
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
  }

  app-comment-sidebar-focused-thread {
    display: flex !important;
    flex-direction: column !important;
    min-height: 0 !important;
    overflow: hidden !important;
    flex: 1 !important;

    app-comment-dialog-body {
      display: flex !important;
      flex: 1 1 0% !important;
      min-height: 0 !important;
      height: 0 !important;
      overflow: hidden !important;

      .velt-comment-dialog-body--focused-thread-mode {
        display: flex !important;
        flex-direction: column !important;
        flex: 0 1 auto !important;
        min-height: 0 !important;
        width: 100% !important;
        overflow: visible !important;

        app-comment-dialog-threads {
          max-height: none !important;
          gap: 12px !important;
          display: flex !important;
          flex-direction: column !important;
          min-height: 0 !important;
          flex: 1 1 0% !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }

        app-comment-dialog-threads::-webkit-scrollbar {
          display: none !important;
        }
      }
    }
  }

  app-comment-dialog-body {
    width: 100% !important;
  }

  .velt-comment-dialog-reply-avatars {
    margin-right: 2px;

    snippyly-user-avatar {
      --legacy-velt-user-avatar-size: 16px !important;
    }
  }

  .velt-composer-open {
    overflow: initial !important;
  }

  .velt-composer-input--message {
    padding: 0 !important;
    color: var(--Text-text-primary, #172026) !important;
    font-variant-numeric: lining-nums tabular-nums !important;
    font-size: 14px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 18px !important;
    flex: 1 0 0 !important;
    align-self: stretch !important;

    span {
      color: var(--Text-text-primary, #172026) !important;
      font-size: 14px !important;
      font-style: normal !important;
      font-weight: 492 !important;
      line-height: 18px !important;
      border-radius: 4px;
      background: var(--Purple-20, #EFE3FF);
      padding-inline: 2px;
      padding-block: 1px;
    }
  }

  .velt-composer--submit-button {
    &:disabled {
      .privado-comment-dialog-composer-submit-button-wrapper {
        background: var(--Gray-40, #BFC8DC) !important;
        cursor: not-allowed !important;
        outline: 1px solid var(--Gray-40, #BFC8DC) !important;
      }
    }
  }

  .velt-comment-attachments {
    margin: 0 !important;
    padding: 0 !important;
  }

  .velt-comment-attachment--name {
    color: var(--Text-text-accent, #754CFF) !important;
    font-variant-numeric: lining-nums tabular-nums !important;
    font-size: 13px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 18px !important;
    text-decoration-line: underline !important;
    flex: 1 0 0 !important;
  }

  app-comment-dialog-composer-attachments-other-icon,
  app-comment-dialog-composer-attachments-other-loading,
  app-comment-dialog-composer-attachments {
    &:empty {
      display: none !important;
    }
  }

  button.action__button.velt-action-button {
    width: 24px !important;
    height: 24px !important;
  }

  .velt-autocomplete--contact-chip {
    color: var(--Text-text-primary, #172026) !important;
    font-variant-numeric: lining-nums tabular-nums !important;
    font-size: 13px !important;
    font-style: normal !important;
    font-weight: 492 !important;
    line-height: 18px !important;
    background-color: transparent !important;
    padding: 0 !important;
    border-radius: 0 !important;
  }

  .velt-comment-dialog--focused-thread-mode {
    .velt-comment-dialog-composer {
      margin-block: 4px;
    }
  }

  app-comment-dialog-thread-card-attachments-other-name {
    flex: 1 !important;
  }

  .velt-composer--attachment-icon-btn {
    padding: 0 !important;
  }

  .velt-comment-dialog-options-dropdown {
    width: 24px !important;
    height: 24px !important;
    padding: 0 !important;
  }

  .velt-thread-card--name--unread {
    width: 8px;
    height: 8px;
    background-color: #FF7452;
  }

  .velt-autocomplete-panel--autocomplete.mat-mdc-autocomplete-panel {
    padding: 0 4px !important;
    border-radius: 10px !important;
    background: var(--default-canvas, #FFF) !important;
    box-shadow: 0 0 0 1px rgba(12, 55, 136, 0.14) !important;
    width: 248px !important;
  }

  .velt-autocomplete-panel--autocomplete.mat-mdc-autocomplete-panel .mat-mdc-option {
    min-height: auto !important;
  }

  .velt-autocomplete-panel--autocomplete.mat-mdc-autocomplete-panel .mat-mdc-option.mdc-list-item {
    padding: 7px 8px !important;
    border-radius: var(--units-xs, 8px) !important;
    background: var(--default-canvas, #FFF) !important;
    cursor: pointer !important;

    &:hover {
      background: var(--container, #F2F6FC) !important;
    }
  }

  velt-autocomplete-option-description-internal {
    display: none !important;
  }

  .velt-autocomplete-option-icon {
    width: 16px !important;
    height: 16px !important;
    min-width: 16px !important;
    min-height: 16px !important;
    margin-right: 0 !important;

    snippyly-user-avatar {
      --legacy-velt-user-avatar-height: 16px !important;
      --legacy-velt-user-avatar-width: 16px !important;
    }
  }

  .velt-autocomplete-option-name {
    color: var(--Text-text-secondary, #465169) !important;
    font-variant-numeric: lining-nums tabular-nums !important;
    font-size: 13px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 18px !important;
    align-self: stretch !important;
  }

  .velt-autocomplete-panel--autocomplete.mat-mdc-autocomplete-panel .mat-mdc-option.mdc-list-item.mat-mdc-option-active {
    .velt-autocomplete-option-name {
      color: var(--Text-text-accent, #754CFF) !important;
    }
  }

  .velt-comment-tool-wrapper-active {
    .privado-comment-tool-wrapper {
      background: var(--btn-secondary-btn-secondary-hover, #F5EFFF);
    }
  }

  .velt-sidebar-button {
    display: flex !important;
    padding: 8px !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 16px !important;
    background: var(--Gray-5, #F8FAFF) !important;
    position: relative;
  }

  .privado-comment-sidebar-button--active {
    .velt-sidebar-button {
      background: var(--Purple-5, #F9F5FF) !important;
    }
  }

  app-sidebar-button-unread-icon {
    right: 2px !important;
  }

  .velt-assign-dropdown {
    margin-bottom: 0px !important;
  }

  .velt-assign-dropdown > div {
    padding: 0px !important;
  }

  .velt-dropdown-assign-trigger {
    display: flex !important;
    padding: 7px 12px !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: var(--units-xs, 8px) !important;
    align-self: stretch !important;
    border-bottom: 1px solid var(--border-color-default, #EDF0F8) !important;
    background: var(--Gray-5, #F8FAFF) !important;
    border-radius: 12px 12px 0 0 !important;

    .velt-assign-dropdown--checkbox-icon {
      svg {
        width: 14px !important;
        height: 14px !important;
        color: var(--Gray-50, #9AA8C3) !important;
      }
    }

    .velt-assign-dropdown--input-label,
    .velt-assign-dropdown--contact {
      color: var(--Text-text-primary, #172026) !important;
      font-variant-numeric: lining-nums tabular-nums !important;
      font-size: 13px !important;
      font-style: normal !important;
      font-weight: 400 !important;
      line-height: 18px !important;
      opacity: 0.4;
    }

    .velt-assign-dropdown--contact {
      flex-grow: 0 !important;
      flex-basis: auto !important;
      margin-left: -4px !important;
    }

    .velt-assign-dropdown--arrow {
      margin-left: -8px !important;
    }
  }

  .v-dropdown-menu-trigger {
    &:hover {
      opacity: 1 !important;
    }
  }

  .velt-dropdown-content-assign {
    padding: 0 4px !important;
    border-radius: 10px !important;
    background: var(--default-canvas, #FFF) !important;
    box-shadow: 0 0 0 1px rgba(12, 55, 136, 0.14) !important;
    width: 248px !important;
  }

  .velt-assign-dropdown--item {
    display: flex !important;
    padding: 7px 8px !important;
    align-items: center !important;
    gap: 8px !important;
    align-self: stretch !important;
    border-radius: var(--units-xs, 8px) !important;
    background: var(--default-canvas, #FFF);

    &:hover {
      background: var(--container, #F2F6FC) !important;
    }

    snippyly-user-avatar {
      --legacy-velt-user-avatar-height: 16px !important;
      --legacy-velt-user-avatar-width: 16px !important;
    }

    .velt-assign-dropdown--item-label {
      color: var(--Text-text-secondary, #465169) !important;
      font-variant-numeric: lining-nums tabular-nums !important;
      font-size: 13px !important;
      font-style: normal !important;
      font-weight: 400 !important;
      line-height: 18px !important;
    }
  }

  .snippyly-menu .mat-mdc-menu-content .mat-mdc-menu-item {
    padding: 0px !important;
    min-height: auto !important;
  }

  app-comment-dialog-options-dropdown-content {
    display: flex !important;
    padding: 4px !important;
    flex-direction: column !important;
    align-self: stretch !important;
    border-radius: 10px !important;
    background: var(--default-canvas, #FFF) !important;
    box-shadow: 0 0 0 1px rgba(12, 55, 136, 0.14) !important;
  }

  app-comment-dialog-options-dropdown-trigger {
    display: flex !important;
    padding: 0px !important;
    justify-content: center !important;
    align-items: center !important;
    gap: var(--units-xxs, 4px) !important;
    border-radius: var(--border-radius-btn-radius-s, 4px) !important;
    background: var(--default-canvas, #FFF) !important;
    cursor: pointer !important;
  }

  .velt-comment-dialog-options-dropdown-container {
    margin-top: 6px !important;
  }

  .velt-options-dropdown-open {
    app-comment-dialog-options-dropdown-trigger {
      box-shadow: 0 0 0 1px #FFF, 0 0 0 4px rgba(30, 69, 169, 0.08) !important;
    }
  }

  .s-user-avatar-initial-container {
    border: 1px solid #FFF !important;

    .s-user-avatar-initial {
      font-size: 8px !important;
    }
  }

  .velt-comment-dialog-options-dropdown:hover,
  .velt-comment-dialog-options-dropdown[_ngcontent-ng-c317025722]:focus {
    background: transparent !important;
  }

  app-attachment-button {
    button.action__button.velt-action-button[_ngcontent-ng-c1599586684]:hover {
      background: transparent !important;
    }
  }

  .velt-thread-card--assign-to-menu {
    padding: 0px !important;
  }

  .velt-autocomplete-panel--input input {
    display: flex !important;
    padding: 6px 8px !important;
    align-items: center !important;
    gap: 8px !important;
    align-self: stretch !important;
    border-radius: var(--units-xs, 8px) !important;
    border: 1px solid var(--border-color-medium, #DDE3EE) !important;
    background: var(--Gray-5, #FFF) !important;
    color: var(--Text-text-primary, #172026) !important;
    font-variant-numeric: lining-nums tabular-nums !important;
    font-size: 14px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 18px !important;
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='16' height='16' fill='white' fill-opacity='0.01'/%3E%3Cpath d='M7.5 13.5C10.8137 13.5 13.5 10.8137 13.5 7.5C13.5 4.18629 10.8137 1.5 7.5 1.5C4.18629 1.5 1.5 4.18629 1.5 7.5C1.5 10.8137 4.18629 13.5 7.5 13.5Z' stroke='%23465169' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15.4999 15.4999L11.7419 11.7419' stroke='%23465169' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !important;
    background-repeat: no-repeat !important;
    background-position: 8px center !important;
    background-size: 16px 16px !important;
    padding-left: 32px !important;
  }

  .velt-autocomplete-panel--input input:focus {
    border: 1px solid var(--Purple-50, #754CFF) !important;
    box-shadow: 0 0 0 1px #FFF, 0 0 0 4px rgba(117, 76, 255, 0.10) !important;
  }

  .velt-thread-card--container > app-if {
    display: flex;
    flex-direction: column;
    width: 100% !important;
  }

  .privado-comment-dialog-thread-card-options-wrapper {
    .velt-comment-dialog-options-dropdown {
      width: 0px !important;
      height: 0px !important;
    }

    app-comment-dialog-options-dropdown-trigger {
      display: none !important;
    }
  }

  .velt-composer-edit-mode {
    margin: 4px !important;
  }

  .privado-reaction-pin-default-icon {
    display: none !important;
  }

  app-comment-dialog-thread-card-reaction-pin {
    .velt-reaction-pin--no-reactions {
      .privado-reaction-pin-default-icon {
        display: flex !important;
      }

      velt-reaction-pin-emoji-internal,
      velt-reaction-pin-count-internal {
        display: none !important;
      }

      .privado-reaction-pin-wrapper {
        border: none !important;
        padding: 0 !important;
        background-color: transparent !important;
      }

      &.velt-reaction-pin {
        padding: 0 !important;
      }
    }
  }

  .velt-reaction-pin--default {
    height: 22px !important;
  }

  app-reaction-pin {
    .skeleton-loader {
      --velt-skeleton-loader-height: 22px !important;
      --velt-skeleton-loader-width: 28px !important;
    }
  }

  .velt-reaction-pin--emoji img {
    width: 14px !important;
    height: 14px !important;
  }

  .velt-reaction-pin {
    gap: 2px !important;

    .velt-reaction-pin--emoji {
      svg {
        width: 14px !important;
        height: 14px !important;
      }
    }

    .velt-reaction-pin--count {
      font-size: 12px !important;
    }
  }

  app-comment-sidebar-skeleton {
    .shine {
      background-color: #e6ebf3 !important;
    }
  }

  app-comment-dialog-composer-attachments-other-name {
    flex: 1 !important;
  }
`;

// =============================================
// COMMENT DIALOG STYLED COMPONENTS
// =============================================

export const CommentDialogWrapper = styled.div`
  display: flex;
  padding: var(--units-sm, 12px) var(--units-sm, 12px) var(--units-xs, 8px) var(--units-sm, 12px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--units-sm, 12px);
  align-self: stretch;
  border-radius: var(--units-sm, 12px);
  background: var(--default-canvas, #FFF);
  box-shadow: 0 1px 1px 0 rgba(92, 108, 138, 0.12), 0 2px 4px 0 rgba(70, 81, 105, 0.08);
  position: relative !important;

  & > *:first-child {
    width: 100% !important;
  }

  app-if {
    &:empty {
      display: none !important;
    }
  }

  .velt-comment-dialog--focused-thread-mode & {
    border-radius: 0 !important;
    box-shadow: none;
    display: flex !important;
    padding: 12px;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    background-color: transparent !important;
    flex: 1 1 0% !important;
    min-height: 0 !important;
    overflow: hidden !important;

    app-comment-dialog-body {
      flex: 1 1 0% !important;
      min-height: 0 !important;
      height: 0 !important;
      overflow: hidden !important;
    }
  }

  .velt-comment-dialog--page-mode-composer & {
    box-shadow: none !important;
    background-color: transparent !important;
    padding: 16px 12px !important;
    border-top: 1px solid var(--border-color-medium, #DDE3EE) !important;
    border-radius: 0 !important;
  }
`;

export const AssigneeBannerWrapper = styled.div`
  display: flex;
  padding: 7px 12px;
  align-items: center;
  justify-content: space-between;
  gap: var(--units-xs, 8px);
  align-self: stretch;
  border-bottom: 1px solid var(--border-color-default, #EDF0F8);
  background: var(--Gray-5, #F8FAFF);
  margin-inline: -12px;
  margin-top: -12px;
  border-radius: 12px 12px 0 0;

  .velt-comment-dialog--focused-thread-mode & {
    border-radius: 0 !important;
  }
`;

export const AssigneeBannerWrapperLeft = styled.div`
  display: flex;
  gap: var(--units-xs, 8px);

  app-resolve-button,
  app-unresolve-button {
    .velt-tooltip-button {
      width: auto !important;
      height: auto !important;
      display: flex;
      gap: var(--units-xs, 8px);
      background-color: transparent !important;
    }
  }
`;

export const ResolveButtonText = styled.span`
  flex: 1 0 0;
  align-self: stretch;
  color: var(--Text-text-secondary, #465169);
  font-variant-numeric: lining-nums tabular-nums;
  display: flex;
  gap: 3px;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

export const AssigneeBannerWrapperRight = styled.div`
  display: flex;
  align-self: stretch;
  color: var(--Text-text-secondary, #465169);
  text-align: right;
  font-variant-numeric: lining-nums tabular-nums;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;

  app-data {
    margin-left: 3px;
  }
`;

export const QuestionWrapperContainer = styled.div`
  width: 100% !important;

  &:has(app-if:empty) {
    display: none !important;
  }

  app-if {
    width: 100% !important;
  }
`;

export const QuestionWrapper = styled.div`
  display: flex;
  padding: 8px;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--border-color-default, #EDF0F8);
  background: var(--container, #F2F6FC);
  cursor: pointer !important;
  width: 100% !important;

  svg {
    color: #D3C5FC !important;
  }

  &:hover {
    svg {
      color: #A080FF !important;
    }
    background: var(--Purple-10, #F5EFFF);
  }
`;

export const QuestionText = styled.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  align-self: stretch;
  overflow: hidden;
  color: var(--Text-text-secondary, #465169);
  font-variant-numeric: lining-nums tabular-nums;
  text-overflow: ellipsis;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

export const ThreadCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--units-xs, 8px);
  align-self: stretch;
  width: 100% !important;


  .privado-comment-dialog-thread-card-reactions-wrapper {
    width: 100%;
  }

  .privado-comment-dialog-thread-card-top-wrapper-right {
    visibility: hidden;
  }

  &:hover {
    .privado-comment-dialog-thread-card-top-wrapper-right {
      visibility: visible;
    }
  }

  .velt-comment-dialog--focused-thread-mode & {
    display: flex;
    padding: var(--units-sm, 12px) var(--units-sm, 12px) var(--units-xs, 8px) var(--units-sm, 12px);
    flex-direction: column;
    align-items: flex-start;
    gap: var(--units-sm, 12px);
    align-self: stretch;
    border-radius: var(--units-sm, 12px);
    background: var(--default-canvas, #FFF);
    box-shadow: 0 1px 1px 0 rgba(92, 108, 138, 0.12), 0 2px 4px 0 rgba(70, 81, 105, 0.08);
  }
`;

export const ThreadCardTopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--units-xs, 8px);
  align-self: stretch;
`;

export const ThreadCardTopWrapperLeft = styled.div`
  display: flex;
  align-items: center;
  gap: var(--units-xs, 8px);
  flex: 1 0 0;

  snippyly-user-avatar {
    --legacy-velt-user-avatar-height: 24px !important;
    --legacy-velt-user-avatar-width: 24px !important;
  }
`;

export const ThreadCardTopWrapperRight = styled.div`
  display: flex;
  align-items: center;
  gap: var(--units-xxs, 4px);
`;

export const AssignButtonWrapper = styled.div`
  position: relative;

  &:hover {
    .velt-comment-tool-tooltip {
      display: inline-flex;
    }
  }
`;

export const ThreadCardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--units-sm, 12px);
  width: 100%;
`;

export const AttachmentsOther = styled.div`
  display: flex;
  padding: var(--units-xs, 8px);
  align-items: center;
  gap: var(--units-sm, 12px);
  border-radius: var(--units-sm, 12px);
  border: 1px solid var(--border-color-default, #EDF0F8);
  background: var(--Gray-5, #F8FAFF);
  cursor: pointer;

  app-comment-dialog-thread-card-attachments-other-download {
    display: none !important;
  }

  &:hover {
    background: var(--Others-White, #FFF) !important;

    app-comment-dialog-thread-card-attachments-other-download {
      display: block !important;
    }

    .velt-comment-attachment--name {
      text-decoration: none !important;
    }
  }
`;

export const ThreadCardBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin-top: 4px;
  width: 100%;
`;

export const ThreadCardBottomWrapperLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  .s-emoji-block {
    padding: 0 !important;
    margin: 0 !important;
    gap: 3px !important;
  }
`;

export const ThreadCardBottomWrapperRight = styled.div`
  display: flex;
  padding: 3px 6px;
  justify-content: center;
  align-items: center;
  gap: 3px;
  cursor: pointer;
`;

export const ReplyIconWrapper = styled.div`
  margin-right: 3px;
`;

export const ReplyCountWrapper = styled.div`
  app-comment-dialog-toggle-reply-count,
  app-comment-dialog-toggle-reply-text {
    color: var(--btn-primary-btn-primary-fill, #754CFF) !important;
    font-variant-numeric: lining-nums tabular-nums !important;
    font-size: 13px !important;
    font-style: normal;
    font-weight: 492 !important;
    line-height: 18px !important;
  }
`;

export const ThreadCardReplyCount = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  padding-top: 12px;
  flex: 1;
  color: var(--Text-text-tertiary, #5C6C8A);
  font-variant-numeric: lining-nums tabular-nums;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;

  app-comment-dialog-toggle-reply-count {
    color: var(--Text-text-tertiary, #5C6C8A) !important;
  }
`;

export const ReplyCountLine = styled.div`
  flex: 1;
  height: 1px;
  background: var(--border-color-strong, #BFC8DC);
`;

export const ReplyCountText = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ComposerDividerWrapper = styled.div`
  &:has(app-if:empty) {
    display: none !important;
  }
`;

export const FocusedThreadModeComposerDivider = styled.div`
  height: 1px;
  background-color: var(--border-color-medium, #DDE3EE);
  width: 385px;
  margin-left: -57px;
  margin-right: -48px;
`;

export const PageModeComposerHeaderWrapper = styled.div`
  width: 100%;

  &:has(app-if:empty) {
    display: none;
  }

  app-if {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
    margin-top: -16px;
    margin-inline: -12px;
    border-radius: 0px;
    padding-inline: 12px;
    background-color: var(--transparent-canvas, #fff9);

    app-data {
      -webkit-line-clamp: 1;
      color: var(--Text-text-secondary, #465169);
      font-variant-numeric: lining-nums tabular-nums;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      align-self: stretch;
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      display: -webkit-box;
      overflow: hidden;
    }

    &:empty {
      display: none;
    }
  }
`;

export const OptionsContentItemWrapper = styled.div`
  align-self: stretch;
  color: var(--Text-text-secondary, #465169);
  font-variant-numeric: lining-nums tabular-nums;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  display: flex;
  padding: 7px 8px;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  border-radius: var(--units-xs, 8px);
  background: var(--default-canvas, #FFF);

  &:hover {
    background: var(--container, #F2F6FC) !important;
  }
`;

export const ReactionsWrapper = styled.div`
  width: 100% !important;
`;

export const ReplyCountWrapperOuter = styled.div`
  width: 100% !important;
`;

// =============================================
// COMPOSER STYLED COMPONENTS
// =============================================

export const ComposerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  align-self: stretch;
  border-radius: var(--units-sm, 12px);
  background: var(--default-canvas, #FFF);
  box-shadow: 0 1px 2px 0 rgba(92, 108, 138, 0.24), 0 0 0 1px rgba(12, 55, 136, 0.14);

  .velt-composer-open & {
    box-shadow: 0 1px 2px 0 rgba(92, 108, 138, 0.24), 0 0 0 1px rgba(12, 55, 136, 0.14), 0 0 0 2px #FFF, 0 0 0 5px rgba(126, 141, 169, 0.10);
  }
`;

export const ComposerInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 8px 8px 12px;
  gap: var(--units-sm, 12px);
  align-self: stretch;
  justify-content: center;

  .velt-composer-open & {
    padding: 11px 12px;

    .privado-comment-dialog-composer-actions-right {
      display: none !important;
    }
  }
`;

export const ComposerInputWrapperInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--units-sm, 12px);
  align-self: stretch;
`;

export const ComposerActionsWrapper = styled.div`
  display: none;
  width: 100%;
  padding: 8px;
  align-items: center;
  justify-content: space-between;
  gap: var(--units-sm, 12px);

  .velt-composer-open & {
    display: flex !important;
  }
`;

export const ComposerActionsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`;

export const ComposerActionsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`;

export const ComposerActionButtonWrapper = styled.div`
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: var(--units-sm, 12px);
  cursor: pointer;

  &:hover {
    background: var(--Gray-10, #F2F6FC);
  }
`;

export const ComposerSubmitButtonWrapper = styled.div`
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: var(--units-sm, 24px);
  background: var(--btn-primary-btn-primary-fill, #754CFF);
  cursor: pointer;
  outline: 1px solid #5A34D9;
`;

export const ComposerAttachmentsOther = styled.div`
  display: flex;
  padding: 7px var(--units-xs, 8px);
  align-items: center;
  gap: var(--units-sm, 12px);
  border-radius: var(--units-sm, 12px);
  border: 1px solid var(--border-color-default, #EDF0F8);
  background: var(--Gray-5, #F8FAFF);
  cursor: pointer !important;

  app-comment-dialog-composer-attachments-other-icon {
    svg {
      width: 16px !important;
      height: 16px !important;
    }
  }

  app-comment-dialog-composer-attachments-other-delete {
    display: none !important;
  }

  .velt-composer--attachment-name {
    color: var(--Text-text-primary, #172026) !important;
    font-variant-numeric: lining-nums tabular-nums !important;
    font-size: 13px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 18px !important;
    flex: 1 0 0 !important;
  }

  &:hover {
    background: var(--Gray-10, #F2F6FC);

    app-comment-dialog-composer-attachments-other-delete {
      display: block !important;
    }
  }
`;

// =============================================
// SIDEBAR STYLED COMPONENTS
// =============================================

export const SidebarWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const SidebarHeaderWrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--border-color-default, #EDF0F8);
  background: var(--transparent-canvas, rgba(255, 255, 255, 0.60));
  position: relative !important;
`;

export const SidebarHeaderLeftWrapper = styled.div`
  flex: 1 0 0;
  gap: 2px;
  display: flex;
  color: var(--Text-text-primary, #172026);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'ss02' on;
  font-size: 14px;
  font-style: normal;
  font-weight: 492;
  line-height: 18px;
`;

export const SidebarHeaderRightWrapper = styled.div`
  position: relative !important;
`;

export const FilterDropdownTriggerWrapper = styled.div`
  display: flex;
  padding: 6px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: var(--units-base, 16px);
`;

export const FilterDropdownContentItemWrapper = styled.div`
  display: flex;
  padding: 7px 8px;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  border-radius: 4px;
  background: var(--default-canvas, #FFF);

  span {
    align-self: stretch;
    color: var(--Text-text-secondary, #465169);
    font-variant-numeric: lining-nums tabular-nums;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  }

  svg {
    display: none !important;
  }
`;

export const FilterDropdownContentDivider = styled.div`
  width: 192px;
  height: 1px;
  background: var(--border-color-medium, #DDE3EE);
`;

export const EmptyPlaceholderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  app-if {
    width: fit-content;
  }
`;

export const EmptyPlaceholderIconWrapper = styled.div`
  display: flex;
  padding: 6.667px;
  align-items: flex-start;
  gap: 6.667px;
  border-radius: 13.333px;
  background: var(--transparent-canvas, rgba(255, 255, 255, 0.60));
  box-shadow: 0 0 0 0.833px rgba(70, 81, 105, 0.10), 0 0.833px 0.833px 0 rgba(70, 81, 105, 0.08), 0 3.333px 6.667px 0 rgba(70, 81, 105, 0.08);
  margin-bottom: 24px;
`;

export const EmptyPlaceholderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--Text-text-secondary, #465169);
  text-align: center;
  font-feature-settings: 'ss02' on, 'calt' off;
  font-size: 16px;
  font-style: normal;
  font-weight: 492;
  line-height: 24px;
  align-self: stretch;
  margin-bottom: 4px;
`;

export const EmptyPlaceholderDescription = styled.div`
  color: var(--Text-text-fade, #7E8DA9);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  align-self: stretch;
`;

export const FocusedThreadHeaderWrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--border-color-default, #EDF0F8);
  background: var(--transparent-canvas, rgba(255, 255, 255, 0.60));
  backdrop-filter: blur(20px);
`;

export const FocusedThreadBackButtonWrapper = styled.div`
  display: flex;
  padding: 3px 6px;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const FocusedThreadBackButtonText = styled.span`
  color: var(--Text-text-tertiary, #5C6C8A);
  font-variant-numeric: lining-nums tabular-nums;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

export const FocusedThreadQuestionWrapper = styled.div`
  &:has(app-data:empty) {
    display: none !important;
  }

  display: flex;
  width: 380px;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color-default, #EDF0F8);
  background: var(--transparent-canvas, rgba(255, 255, 255, 0.60));
  backdrop-filter: blur(20px);

  app-data {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    flex: 1 0 0;
    overflow: hidden;
    color: var(--Text-text-secondary, #465169);
    font-variant-numeric: lining-nums tabular-nums;
    text-overflow: ellipsis;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  }
`;

// =============================================
// COMMENT TOOL STYLED COMPONENTS
// =============================================

export const CommentToolWrapper = styled.div`
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius-btn-radius-xs, 6px);
  cursor: pointer;
  gap: 4px;
  position: relative;

  &:hover {
    background: var(--btn-tertiary-btn-tertiary-hover, #F8FAFF);

    .velt-comment-tool-tooltip {
      display: inline-flex;
    }
  }

  app-comment-bubble-comments-count {
    color: var(--Text-text-accent, #754CFF) !important;
    font-variant-numeric: lining-nums tabular-nums !important;
    font-size: 12px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 16px !important;
  }
`;

export const CommentToolTooltip = styled.span`
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  display: none;
  padding: 6px 12px;
  align-items: flex-end;
  gap: 10px;
  border-radius: 12px;
  background: var(--Gray-100, #12161F);
  color: #F8F9F9;
  font-variant-numeric: lining-nums tabular-nums;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

export const CommentBubbleWrapper = styled.div`
  display: flex;
  padding: 4px;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  border-radius: var(--border-radius-btn-radius-xs, 6px);

  app-comment-bubble-comments-count {
    color: var(--Text-text-accent, #754CFF) !important;
    font-variant-numeric: lining-nums tabular-nums !important;
    font-size: 12px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 16px !important;
  }

  &:hover {
    background: var(--btn-secondary-btn-secondary-hover, #F5EFFF);
  }
`;

// =============================================
// REACTION STYLED COMPONENTS
// =============================================

export const ReactionWrapper = styled.div`
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: var(--border-radius-btn-radius-s, 8px);
`;

export const ReactionPinWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 1px 4px !important;
  border: 1px solid var(--velt-accent);
  border-radius: var(--velt-border-radius-sm);
  cursor: pointer;
  background-color: var(--velt-accent-transparent);
`;

// =============================================
// AUTOCOMPLETE STYLED COMPONENTS
// =============================================

export const AutocompleteOptionWrapper = styled.div`
  display: flex !important;
  gap: 8px !important;
  align-self: stretch !important;
  align-items: center !important;

  svg {
    display: none !important;
  }

  .velt-autocomplete-panel--autocomplete.mat-mdc-autocomplete-panel .mat-mdc-option.mdc-list-item.mat-mdc-option-active & {
    svg {
      display: flex !important;
    }
  }
`;

// =============================================
// SIDEBAR BUTTON STYLED COMPONENTS
// =============================================

export const SidebarButtonUnreadIconWrapper = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: var(--Red-300, #FF7452);
`;
