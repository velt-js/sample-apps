'use client'

import { NavArrowLeftIcon, NavArrowRightIcon } from './icons'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  const progress = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="flex items-center gap-[8px]">
      <span
        className="text-[13px] leading-[18px] whitespace-nowrap"
        style={{
          fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
          color: '#172026'
        }}
      >
        Step {currentStep} of {totalSteps}
      </span>

      {/* Progress Bar */}
      <div
        className="w-[108px] h-[8px] rounded-[16px] overflow-hidden"
        style={{ backgroundColor: 'rgb(221, 227, 238)' }}
      >
        <div
          className="h-full rounded-l-[4px] rounded-r-[1px] transition-all duration-300"
          style={{
            backgroundColor: 'rgb(29, 202, 115)',
            width: `${(progress / 100) * 108}px`
          }}
        />
      </div>

      <span
        className="text-[12px] leading-[16px] whitespace-nowrap"
        style={{
          fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
          color: '#465169'
        }}
      >
        {progress}%
      </span>
    </div>
  )
}

interface NavigationButtonsProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
}

const NavigationButtons = ({ currentStep, totalSteps, onPrevious, onNext }: NavigationButtonsProps) => {
  return (
    <div className="flex items-center gap-[12px]">
      {/* Arrow buttons */}
      <div
        className="flex items-center justify-center rounded-[6px] overflow-hidden"
        style={{
          backgroundColor: 'rgb(255, 255, 255)',
          boxShadow: 'var(--pia-shadow-btn-tertiary, 0px 0px 0px 1px rgba(12, 55, 136, 0.14), 0px 1px 2px rgba(92, 108, 138, 0.24))'
        }}
      >
        <button
          className="flex items-center justify-center p-[6px] rounded-[8px] overflow-hidden hover:bg-gray-50 transition-colors disabled:opacity-50"
          onClick={onPrevious}
          disabled={currentStep <= 1}
          aria-label="Previous question"
        >
          <NavArrowLeftIcon />
        </button>
        <div
          className="w-px self-stretch"
          style={{ backgroundColor: 'rgba(12, 55, 136, 0.14)' }}
        />
        <button
          className="flex items-center justify-center p-[6px] rounded-[8px] overflow-hidden hover:bg-gray-50 transition-colors disabled:opacity-50"
          onClick={onNext}
          disabled={currentStep >= totalSteps}
          aria-label="Next question"
        >
          <NavArrowRightIcon />
        </button>
      </div>

      {/* Submit Button */}
      <button
        className="flex items-center justify-center gap-[2px] px-[6px] py-[5px] rounded-[8px] overflow-hidden"
        style={{
          backgroundColor: '#754cff',
          boxShadow: '0px 0px 0px 1px #5a34d9, 0px 1px 2px rgba(23, 32, 38, 0.24), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3)'
        }}
      >
        <div className="flex items-center justify-center px-[4px]">
          <span
            className="text-[14px] leading-[18px] font-medium whitespace-nowrap"
            style={{
              fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
              color: '#ffffff'
            }}
          >
            Submit Assessment
          </span>
        </div>
      </button>
    </div>
  )
}

interface SecondHeaderBarProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
}

export const SecondHeaderBar = ({ currentStep, totalSteps, onPrevious, onNext }: SecondHeaderBarProps) => {
  return (
    <div
      className="flex items-center justify-between pl-[24px] pr-[20px] py-[12px] flex-shrink-0"
      style={{
        backgroundColor: 'var(--pia-canvas-bg, rgba(255, 255, 255, 0.6))',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--pia-border-medium, rgb(221, 227, 238))',
      }}
    >
      <div className="flex items-center">
        <p
          className="text-[16px] leading-[24px] whitespace-nowrap"
          style={{ fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif" }}
        >
          <span style={{ color: '#172026', fontWeight: 500 }}>Section 3 </span>
          <span style={{ color: '#465169' }}>– </span>
          <span style={{ color: '#465169', fontWeight: 400 }}>Fundamental principles</span>
        </p>
      </div>

      <div className="flex items-center gap-[24px]">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </div>
    </div>
  )
}
