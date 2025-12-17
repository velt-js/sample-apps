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
