'use client'

import { useState } from 'react'
import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import { VeltCommentBubble, VeltCommentTool, VeltInlineCommentsSection } from '@veltdev/react'
import JobDetailModal from './JobDetailModal'

// Types
export interface JobLineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Job {
  id: string
  cost: string
  comments: number
  ownership: { color: string; initials: string; name: string }
  due: string
  dueType?: string
  approver: { initials: string; color: string; hasIndicator?: boolean } | null
  approverTime?: string
  policy: string
  status: string
  statusType: string
  lineItems: JobLineItem[]
}

// Comment type for sidebar
interface Comment {
  id: string
  author: string
  initials: string
  color: string
  timestamp: string
  content: string
  context?: {
    type: 'field' | 'line' | 'expense'
    label: string
    value: string
  }
  replies?: number
  lastReply?: string
  reactions?: { emoji: string; count: number }[]
  isOnline?: boolean
}

// Sample data for the table with line items
const jobsData: Job[] = [
  { id: 'OE0001', cost: '', comments: 0, ownership: { color: '#10B981', initials: 'E', name: 'Ocean Freight - ...' }, due: '...', approver: null, policy: 'AP Eur Matched Appr...', status: 'Matching', statusType: 'default', lineItems: [
    { id: 'li-1', description: 'Container shipping fee', quantity: 1, unitPrice: 1200, total: 1200 },
    { id: 'li-2', description: 'Port handling charges', quantity: 2, unitPrice: 150, total: 300 },
  ]},
  { id: 'OE0002', cost: '$2,875.93', comments: 32, ownership: { color: '#EC4899', initials: 'R', name: 'Commercial' }, due: '-2 days', dueType: 'overdue', approver: { initials: 'LW', color: '#6366F1' }, approverTime: '<1d', policy: 'AP US Matched Appr...', status: 'Review & approve', statusType: 'review', lineItems: [
    { id: 'li-1', description: 'Marketing materials', quantity: 500, unitPrice: 2.5, total: 1250 },
    { id: 'li-2', description: 'Printing services', quantity: 1, unitPrice: 875.93, total: 875.93 },
    { id: 'li-3', description: 'Design consultation', quantity: 3, unitPrice: 250, total: 750 },
  ]},
  { id: 'OE0003', cost: '$1,729.18', comments: 2, ownership: { color: '#8B5CF6', initials: 'WW', name: 'General AP' }, due: '...', approver: null, policy: 'AP Eur Matched Appr...', status: 'Pending', statusType: 'pending', lineItems: [
    { id: 'li-1', description: 'Office supplies', quantity: 10, unitPrice: 89.50, total: 895 },
    { id: 'li-2', description: 'Equipment maintenance', quantity: 1, unitPrice: 834.18, total: 834.18 },
  ]},
  { id: 'OE0004', cost: '$2,432.82', comments: 0, ownership: { color: '#F59E0B', initials: 'RS', name: 'Packaged Goods' }, due: '-10 days', dueType: 'overdue', approver: { initials: 'LW', color: '#6366F1' }, approverTime: '<1d', policy: 'AP Eur Matched Appr...', status: 'Review & approve', statusType: 'review', lineItems: [
    { id: 'li-1', description: 'Packaging materials', quantity: 1000, unitPrice: 1.25, total: 1250 },
    { id: 'li-2', description: 'Label printing', quantity: 5000, unitPrice: 0.15, total: 750 },
    { id: 'li-3', description: 'Shipping boxes', quantity: 100, unitPrice: 4.33, total: 432.82 },
  ]},
  { id: 'OE0005', cost: '$16,431.76', comments: 0, ownership: { color: '#8B5CF6', initials: 'MJ', name: 'Ocean Freight - ...' }, due: 'Today', dueType: 'today', approver: { initials: 'LW', color: '#6366F1' }, approverTime: '3d', policy: 'Metals & Timber', status: 'Review & approve', statusType: 'review', lineItems: [
    { id: 'li-1', description: 'Steel beams shipment', quantity: 50, unitPrice: 250, total: 12500 },
    { id: 'li-2', description: 'Insurance premium', quantity: 1, unitPrice: 2431.76, total: 2431.76 },
    { id: 'li-3', description: 'Customs clearance', quantity: 1, unitPrice: 1500, total: 1500 },
  ]},
  { id: 'OE0006', cost: '$115,472.51', comments: 5, ownership: { color: '#10B981', initials: 'SC', name: '3rd Party Suppli...' }, due: '12 days', dueType: 'warning', approver: { initials: 'LW', color: '#6366F1' }, policy: 'Vegetable protein ap...', status: 'Conflict', statusType: 'conflict', lineItems: [
    { id: 'li-1', description: 'Bulk protein powder', quantity: 10000, unitPrice: 8.50, total: 85000 },
    { id: 'li-2', description: 'Quality testing', quantity: 1, unitPrice: 5472.51, total: 5472.51 },
    { id: 'li-3', description: 'Expedited shipping', quantity: 1, unitPrice: 25000, total: 25000 },
  ]},
  { id: 'OE0007', cost: '$5,820.91', comments: 0, ownership: { color: '#3B82F6', initials: 'JK', name: 'Commercial' }, due: '47 days', approver: { initials: 'LW', color: '#6366F1' }, policy: 'Vegetable protein ap...', status: 'Conflict', statusType: 'conflict', lineItems: [
    { id: 'li-1', description: 'Trade show booth rental', quantity: 1, unitPrice: 3500, total: 3500 },
    { id: 'li-2', description: 'Display materials', quantity: 1, unitPrice: 2320.91, total: 2320.91 },
  ]},
  { id: 'OE0008', cost: '$3,711.83', comments: 0, ownership: { color: '#6366F1', initials: 'EL', name: 'General AP' }, due: '8 days', dueType: 'warning', approver: { initials: 'AK', color: '#F59E0B' }, approverTime: '1d', policy: 'Metals & Timber', status: 'Submit for approval', statusType: 'submit', lineItems: [
    { id: 'li-1', description: 'Timber processing fee', quantity: 1, unitPrice: 2500, total: 2500 },
    { id: 'li-2', description: 'Quality inspection', quantity: 1, unitPrice: 711.83, total: 711.83 },
    { id: 'li-3', description: 'Documentation fee', quantity: 1, unitPrice: 500, total: 500 },
  ]},
  { id: 'OE0009', cost: '$8,348.07', comments: 0, ownership: { color: '#3B82F6', initials: 'JK', name: 'N. American Over...' }, due: 'Paid', dueType: 'paid', approver: { initials: 'LW', color: '#6366F1' }, policy: 'AP Eur Matched Appr...', status: 'Dispute', statusType: 'dispute', lineItems: [
    { id: 'li-1', description: 'Ground transportation', quantity: 15, unitPrice: 450, total: 6750 },
    { id: 'li-2', description: 'Fuel surcharge', quantity: 1, unitPrice: 1598.07, total: 1598.07 },
  ]},
  { id: 'OE0010', cost: '$11,096.22', comments: 3, ownership: { color: '#8B5CF6', initials: 'WW', name: 'Trucking' }, due: '11 days', approver: { initials: 'LW', color: '#6366F1' }, policy: 'AP Mex Matched App...', status: 'Verifying', statusType: 'default', lineItems: [
    { id: 'li-1', description: 'Long haul trucking', quantity: 3, unitPrice: 3200, total: 9600 },
    { id: 'li-2', description: 'Loading/unloading', quantity: 6, unitPrice: 249.37, total: 1496.22 },
  ]},
  { id: 'OE0011', cost: '$85,682.06', comments: 0, ownership: { color: '#3B82F6', initials: 'JK', name: 'Journal entries' }, due: 'Paid', dueType: 'paid', approver: { initials: 'LW', color: '#F59E0B', hasIndicator: true }, approverTime: '6d', policy: 'AP Mex Matched App...', status: 'Approvals', statusType: 'default', lineItems: [
    { id: 'li-1', description: 'Q4 inventory adjustment', quantity: 1, unitPrice: 45000, total: 45000 },
    { id: 'li-2', description: 'Depreciation entries', quantity: 1, unitPrice: 25682.06, total: 25682.06 },
    { id: 'li-3', description: 'Accrual reversal', quantity: 1, unitPrice: 15000, total: 15000 },
  ]},
  { id: 'OE0012', cost: '$7,026.34', comments: 0, ownership: { color: '#10B981', initials: 'GB', name: 'Commercial' }, due: '32 days', approver: { initials: 'MN', color: '#EC4899' }, approverTime: '8d', policy: 'Metals & Timber', status: 'Approvals', statusType: 'default', lineItems: [
    { id: 'li-1', description: 'Client entertainment', quantity: 1, unitPrice: 3500, total: 3500 },
    { id: 'li-2', description: 'Travel expenses', quantity: 1, unitPrice: 2526.34, total: 2526.34 },
    { id: 'li-3', description: 'Conference registration', quantity: 2, unitPrice: 500, total: 1000 },
  ]},
  { id: 'OE0013', cost: '$7,026.34', comments: 27, ownership: { color: '#10B981', initials: 'GB', name: 'Commercial' }, due: '32 days', approver: { initials: 'EA', color: '#6366F1' }, approverTime: '2d', policy: 'Metals & Timber', status: 'Review & approve', statusType: 'review', lineItems: [
    { id: 'li-1', description: 'Advertising spend', quantity: 1, unitPrice: 5000, total: 5000 },
    { id: 'li-2', description: 'Media placement', quantity: 1, unitPrice: 2026.34, total: 2026.34 },
  ]},
  { id: 'OE0014', cost: '$7,026.34', comments: 9, ownership: { color: '#10B981', initials: 'GB', name: 'Commercial' }, due: '32 days', approver: { initials: 'TM', color: '#F59E0B' }, approverTime: '11d', policy: 'AP Eur Matched Appr...', status: 'Approvals', statusType: 'default', lineItems: [
    { id: 'li-1', description: 'Consulting services', quantity: 20, unitPrice: 275, total: 5500 },
    { id: 'li-2', description: 'Project expenses', quantity: 1, unitPrice: 1526.34, total: 1526.34 },
  ]},
  { id: 'OE0015', cost: '$7,026.34', comments: 0, ownership: { color: '#10B981', initials: 'GB', name: 'Commercial' }, due: '32 days', approver: { initials: 'MS', color: '#6366F1' }, approverTime: '2d', policy: 'AP Mex Matched App...', status: 'Approvals', statusType: 'default', lineItems: [
    { id: 'li-1', description: 'Software licenses', quantity: 10, unitPrice: 450, total: 4500 },
    { id: 'li-2', description: 'Support contract', quantity: 1, unitPrice: 2526.34, total: 2526.34 },
  ]},
]

// Sample comments data for sidebar
const commentsData: Comment[] = [
  {
    id: 'c1',
    author: 'Austin Miley',
    initials: 'AM',
    color: '#6366F1',
    timestamp: '2 hours ago',
    content: 'Can we verify this amount?',
    isOnline: true,
    replies: 1,
    lastReply: 'Last reply 11 min ago'
  },
  {
    id: 'c2',
    author: 'Rachel Green',
    initials: 'RG',
    color: '#EC4899',
    timestamp: '4 hours ago',
    content: 'Please update the due date. The current timeline doesn\'t align with our quarterly reporting schedule.',
    context: {
      type: 'field',
      label: 'Due date',
      value: '2025-08-17'
    },
    isOnline: true,
    replies: 4,
    lastReply: 'Last reply 4 hours ago',
    reactions: [{ emoji: '👀', count: 2 }]
  },
  {
    id: 'c3',
    author: 'Michael Chen',
    initials: 'MC',
    color: '#10B981',
    timestamp: '1 day ago',
    content: 'Approved. This looks good to proceed.'
  },
  {
    id: 'c4',
    author: 'Sarah Williams',
    initials: 'SW',
    color: '#F59E0B',
    timestamp: '2 days ago',
    content: 'Please review the line item amounts.',
    context: {
      type: 'line',
      label: 'Apr-Jun 2025',
      value: 'Project Managem... Apr-Jun 2025 - $57,600.00'
    }
  },
]

// Icon components
const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.667 1.667H5.001c-.92 0-1.667.746-1.667 1.666v13.334c0 .92.746 1.666 1.667 1.666h10c.92 0 1.666-.746 1.666-1.666V6.667l-5-5z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.667 1.667v5h5M13.333 10.833H6.667M13.333 14.167H6.667M8.333 7.5H6.667" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6l4 4 4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4.167v11.666M4.167 10h11.666" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.667 2H1.333l5.334 6.307v4.36L9.333 14V8.307L14.667 2z" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.333 12.667A5.333 5.333 0 107.333 2a5.333 5.333 0 000 10.667zM14 14l-2.9-2.9" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4h12M2 8h12M2 12h12" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.333 9.233V10a8.333 8.333 0 11-4.941-7.617" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.333 3.333L10 11.675l-2.5-2.5" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.575 3.217L1.517 14.833c-.167.292-.256.625-.256.967 0 .341.089.675.256.966.167.292.408.533.7.7.292.167.625.256.967.256h14.116c.341 0 .675-.089.966-.256.292-.167.534-.408.7-.7.167-.291.256-.625.256-.966 0-.342-.089-.675-.256-.967L11.425 3.217a1.917 1.917 0 00-2.85 0z" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 7.5v3.333M10 14.167h.008" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const DisputeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 9.583c.003.965-.238 1.915-.7 2.767a5.833 5.833 0 01-5.133 3.067 5.759 5.759 0 01-2.767-.7L5 16.25l1.533-3.9a5.759 5.759 0 01-.7-2.767 5.833 5.833 0 013.067-5.133A5.759 5.759 0 0111.667 3.75h.343a5.817 5.817 0 015.49 5.49v.343z" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const GearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 10a2 2 0 100-4 2 2 0 000 4z" stroke="#6B7280" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.933 10a1.1 1.1 0 00.22 1.213l.04.04a1.333 1.333 0 11-1.886 1.887l-.04-.04a1.1 1.1 0 00-1.214-.22 1.1 1.1 0 00-.666 1.007v.113a1.333 1.333 0 11-2.667 0v-.06a1.1 1.1 0 00-.72-1.007 1.1 1.1 0 00-1.213.22l-.04.04a1.333 1.333 0 11-1.887-1.886l.04-.04a1.1 1.1 0 00.22-1.214 1.1 1.1 0 00-1.007-.666h-.113a1.333 1.333 0 110-2.667h.06a1.1 1.1 0 001.007-.72 1.1 1.1 0 00-.22-1.213l-.04-.04a1.333 1.333 0 111.886-1.887l.04.04a1.1 1.1 0 001.214.22h.053a1.1 1.1 0 00.667-1.007v-.113a1.333 1.333 0 012.666 0v.06a1.1 1.1 0 00.667 1.007 1.1 1.1 0 001.213-.22l.04-.04a1.334 1.334 0 111.887 1.886l-.04.04a1.1 1.1 0 00-.22 1.214v.053a1.1 1.1 0 001.006.667h.114a1.333 1.333 0 010 2.666h-.06a1.1 1.1 0 00-1.007.667z" stroke="#6B7280" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12L6 8l4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12l4-4-4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const DoubleArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 12L3 8l4-4M13 12L9 8l4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const DoubleArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12l4-4-4-4M3 12l4-4-4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="5.5" stroke="#9CA3AF" strokeWidth="1.25"/>
    <path d="M7 4v3l2 1" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round"/>
  </svg>
)

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M.583 7S2.917 2.333 7 2.333 13.417 7 13.417 7 11.083 11.667 7 11.667.583 7 .583 7z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="7" cy="7" r="2" stroke="#9CA3AF" strokeWidth="1.25"/>
  </svg>
)

const ChevronLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18l-6-6 6-6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TextOptionsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.667 4h10.666M2.667 8h6.666M2.667 12h8" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round"/>
  </svg>
)

const LineIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 8h12" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round"/>
    <path d="M6 4v8M10 4v8" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round"/>
  </svg>
)

const AttachIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.167 7.367l-6.6 6.6a3.667 3.667 0 11-5.184-5.184l6.6-6.6a2.444 2.444 0 113.456 3.457l-6.606 6.593a1.222 1.222 0 01-1.728-1.728l6.1-6.095" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const EmojiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6.5" stroke="#9CA3AF" strokeWidth="1.25"/>
    <path d="M5.5 9.5s1 1.5 2.5 1.5 2.5-1.5 2.5-1.5" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round"/>
    <circle cx="6" cy="6.5" r="0.75" fill="#9CA3AF"/>
    <circle cx="10" cy="6.5" r="0.75" fill="#9CA3AF"/>
  </svg>
)

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.333 1.667L9.167 10.833M18.333 1.667l-6.666 16.666-3.334-7.5-7.5-3.333 16.667-5.833z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="1" fill="#6B7280"/>
    <circle cx="12" cy="8" r="1" fill="#6B7280"/>
    <circle cx="4" cy="8" r="1" fill="#6B7280"/>
  </svg>
)

const ResolveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.333 4L6 11.333 2.667 8" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.333 2a1.414 1.414 0 112 2L4.667 12.667 2 14l1.333-2.667L11.333 2z" stroke="#6B7280" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Status badge component
const StatusBadge = ({ status, type }: { status: string; type: string }) => {
  const getStatusStyles = () => {
    switch (type) {
      case 'review':
        return 'bg-violet-100 text-violet-700 border-violet-200'
      case 'pending':
        return 'bg-gray-100 text-gray-600 border-gray-200'
      case 'conflict':
        return 'bg-red-50 text-red-600 border-red-200'
      case 'dispute':
        return 'bg-red-50 text-red-600 border-red-200'
      case 'submit':
        return 'bg-green-50 text-green-700 border-green-200'
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'review':
        return <span className="w-2 h-2 rounded-full bg-violet-500 mr-1.5"></span>
      case 'pending':
        return <span className="mr-1"><ClockIcon /></span>
      case 'conflict':
        return <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
      case 'dispute':
        return <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
      case 'submit':
        return <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
      default:
        return <span className="mr-1"><EyeIcon /></span>
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusStyles()}`}>
      {getIcon()}
      {status}
    </span>
  )
}

// Due date badge component
const DueBadge = ({ due, type }: { due: string; type?: string }) => {
  const getStyles = () => {
    switch (type) {
      case 'overdue':
        return 'bg-red-100 text-red-700'
      case 'today':
        return 'bg-green-100 text-green-700'
      case 'warning':
        return 'bg-yellow-100 text-yellow-700'
      case 'paid':
        return 'text-gray-400'
      default:
        return 'text-gray-600'
    }
  }

  if (type === 'overdue' || type === 'today' || type === 'warning') {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStyles()}`}>
        {due}
      </span>
    )
  }

  return <span className={`text-sm ${getStyles()}`}>{due}</span>
}

// Avatar component
const Avatar = ({ initials, color, size = 24, hasIndicator = false }: { initials: string; color: string; size?: number; hasIndicator?: boolean }) => (
  <div className="relative inline-flex">
    <div
      className="rounded-full flex items-center justify-center text-white font-medium"
      style={{ backgroundColor: color, width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
    {hasIndicator && (
      <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
    )}
  </div>
)

// Comment Item Component
const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <div className="px-8 py-5 border-b border-gray-100 hover:bg-gray-50">
      {/* Comment Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Avatar initials={comment.initials} color={comment.color} size={24} />
            {comment.isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 w-[6px] h-[6px] bg-green-500 rounded-full border border-white"></span>
            )}
          </div>
          <span className="text-sm font-medium text-gray-900">{comment.author}</span>
          <span className="text-sm text-gray-500">{comment.timestamp}</span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <ResolveIcon />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <EditIcon />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <MoreIcon />
          </button>
        </div>
      </div>

      {/* Context Banner */}
      {comment.context && (
        <div className="ml-8 mb-2 px-2 py-1.5 bg-gray-50 rounded-md flex items-center gap-2">
          {comment.context.type === 'field' && <TextOptionsIcon />}
          {comment.context.type === 'line' && <LineIcon />}
          <span className="text-sm text-gray-600">
            <span className="font-medium">{comment.context.type === 'field' ? 'Field:' : 'Line:'}</span>{' '}
            {comment.context.label} - {comment.context.value}
          </span>
        </div>
      )}

      {/* Comment Content */}
      <div className="ml-8 text-sm text-gray-700 leading-relaxed">
        {comment.content}
      </div>

      {/* Replies and Reactions */}
      {(comment.replies || comment.reactions) && (
        <div className="ml-8 mt-3 flex items-center gap-3">
          {comment.replies && comment.replies > 0 && (
            <div className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded">
              <div className="flex -space-x-1">
                <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center text-[10px] text-white font-medium border border-white">A</div>
                {comment.replies > 1 && (
                  <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-[10px] text-white font-medium border border-white">R</div>
                )}
              </div>
              <span className="text-sm text-gray-600">{comment.replies} replies</span>
              {comment.lastReply && (
                <span className="text-sm text-gray-400">{comment.lastReply}</span>
              )}
            </div>
          )}
          {comment.reactions && comment.reactions.map((reaction, idx) => (
            <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded">
              <span>{reaction.emoji}</span>
              <span className="text-sm text-gray-600">{reaction.count}</span>
            </div>
          ))}
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <EmojiIcon />
          </button>
        </div>
      )}
    </div>
  )
}

// Comments Sidebar Component - Per-row thread using VeltInlineCommentsSection
const CommentsSidebar = ({
  isOpen,
  onClose,
  selectedJob
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedJob: Job | null;
}) => {
  if (!isOpen || !selectedJob) return null

  return (
    <div className="w-[400px] h-full flex flex-col bg-white border-l border-gray-200">
      {/* Header */}
      <div className="h-[56px] px-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeftIcon />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">Comments</span>
            <span className="text-sm text-gray-500">({selectedJob.id})</span>
          </div>
        </div>
      </div>

      {/* VeltInlineCommentsSection for per-row thread */}
      <div className="flex-1 overflow-y-auto" data-id={`job-${selectedJob.id}`}>
        <VeltInlineCommentsSection
          multiThread={false}
          targetElementId={`job-${selectedJob.id}`}
          shadowDom={false}
        />
      </div>
    </div>
  )
}

export default function DocumentCanvas() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedJobForComments, setSelectedJobForComments] = useState<Job | null>(null)
  const [isCommentSidebarOpen, setIsCommentSidebarOpen] = useState(false)

  const handleJobClick = (job: Job) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedJob(null)
  }

  // Handler for opening comment sidebar for a specific row
  const handleOpenCommentsForRow = (job: Job) => {
    setSelectedJobForComments(job)
    setIsCommentSidebarOpen(true)
  }

  const handleCloseCommentSidebar = () => {
    setIsCommentSidebarOpen(false)
    setSelectedJobForComments(null)
  }

  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {/* Page Header */}
            <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FileIcon />
                <span className="text-base font-semibold text-gray-900">Active jobs</span>
                <span className="text-sm text-gray-500">(26)</span>
                <ChevronDownIcon />
              </div>
              <button className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center shadow-sm">
                <PlusIcon />
              </button>
            </div>

            {/* Filter Toolbar */}
            <div className="flex items-center justify-between px-8 py-3">
              <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <FilterIcon />
                Filter
              </button>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <SearchIcon />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <SettingsIcon />
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="flex gap-4 px-8 pb-4">
              {/* Review & approve card */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-violet-50 rounded-lg border border-violet-100">
                <div className="flex items-center justify-center w-10 h-10 bg-violet-100 rounded-lg">
                  <CheckCircleIcon />
                </div>
                <span className="flex-1 text-sm font-medium text-violet-900">Review & approve</span>
                <span className="text-2xl font-semibold text-violet-700">2</span>
              </div>

              {/* Conflict card */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-lg">
                  <WarningIcon />
                </div>
                <span className="flex-1 text-sm font-medium text-amber-900">Conflict</span>
                <span className="text-2xl font-semibold text-amber-700">2</span>
              </div>

              {/* Dispute card */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg">
                  <DisputeIcon />
                </div>
                <span className="flex-1 text-sm font-medium text-red-900">Dispute</span>
                <span className="text-2xl font-semibold text-red-700">6</span>
              </div>
            </div>

            {/* Data Table */}
            <div className="flex-1 overflow-auto px-8">
              <table className="w-full min-w-[1200px]">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b border-gray-200">
                    <th className="w-12 py-2 px-3 text-left">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">
                      <div className="flex items-center gap-1">
                        Job <ChevronDownIcon />
                      </div>
                    </th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Cost</th>
                    <th className="w-20 py-2 px-3 text-left text-xs font-medium text-gray-500">Comments</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Ownership</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Due</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Current approver</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Approval policy</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Status</th>
                    <th className="w-10 py-2 px-3">
                      <GearIcon />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {jobsData.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      id={`job-${job.id}`}
                      data-id={`job-${job.id}`}
                      onClick={() => handleOpenCommentsForRow(job)}
                    >
                      <td className="py-3 px-3">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" onClick={(e) => e.stopPropagation()} />
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleJobClick(job)
                          }}
                        >
                          {job.id}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-sm text-gray-900">{job.cost}</span>
                      </td>
                      <td className="py-3 px-3">
                        <div
                          className="flex items-center justify-center min-w-[64px] relative overflow-visible"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <VeltCommentTool targetElementId={`job-${job.id}`} />
                          <VeltCommentBubble targetElementId={`job-${job.id}`} shadowDom={false} />
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <Avatar initials={job.ownership.initials} color={job.ownership.color} />
                          <span className="text-sm text-gray-700 truncate max-w-[120px]">{job.ownership.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <DueBadge due={job.due} type={job.dueType} />
                      </td>
                      <td className="py-3 px-3">
                        {job.approver ? (
                          <div className="flex items-center gap-2">
                            <Avatar initials={job.approver.initials} color={job.approver.color} hasIndicator={job.approver.hasIndicator} />
                            {job.approverTime && <span className="text-xs text-gray-500">{job.approverTime}</span>}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">...</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-sm text-gray-700 truncate block max-w-[140px]">{job.policy}</span>
                      </td>
                      <td className="py-3 px-3">
                        <StatusBadge status={job.status} type={job.statusType} />
                      </td>
                      <td className="py-3 px-3"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-8 py-3 border-t border-gray-200 bg-white">
              <span className="text-sm text-gray-500">Showing 1-12 of 91 results (page 1 of 8)</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:bg-gray-100 rounded disabled:opacity-50" disabled>
                    <DoubleArrowLeftIcon />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded disabled:opacity-50" disabled>
                    <ArrowLeftIcon />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ArrowRightIcon />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <DoubleArrowRightIcon />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">12 rows</span>
                  <ChevronDownIcon />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Go to page:</span>
                  <input
                    type="text"
                    className="w-12 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Comments Sidebar - Per-row thread */}
          <CommentsSidebar
            isOpen={isCommentSidebarOpen}
            onClose={handleCloseCommentSidebar}
            selectedJob={selectedJobForComments}
          />
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
