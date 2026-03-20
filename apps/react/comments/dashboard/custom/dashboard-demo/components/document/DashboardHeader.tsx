'use client'

export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-[16px] items-start leading-none mb-[24px]" style={{ color: 'var(--app-text-primary)' }}>
      <p className="font-['Urbanist',sans-serif] font-semibold text-[32px]">
        Marketing Spent
      </p>
      <p className="font-['Urbanist',sans-serif] font-normal opacity-[0.52] text-[14px]">
        Overview of marketing spent on awareness and sales
      </p>
    </div>
  )
}
