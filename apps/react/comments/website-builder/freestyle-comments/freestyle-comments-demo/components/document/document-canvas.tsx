'use client'

import Sidebar from '@/components/sidebar/sidebar'
import VeltTools from '@/components/velt/VeltTools'

export default function DocumentCanvas() {
  return (
    <div className="relative w-full h-full overflow-auto">
      <FreestyleCanvas />
      {/* Sidebar - positioned on left, overlays canvas */}
      <div className="absolute top-0 left-0 h-full z-10">
        <Sidebar />
      </div>
      {/* Velt Toolbar - positioned top-right */}
      <div className="absolute top-2 right-6 flex items-center gap-[6px] z-50">
        <VeltTools />
      </div>
    </div>
  )
}

function FreestyleCanvas() {
  return (
    <div
      className="relative w-full min-h-full"
      style={{ backgroundColor: 'rgb(0, 0, 0)' }}
      data-name="freestyle"
    >
      {/* Desktop label */}
      <p
        className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-white opacity-50 uppercase tracking-tight"
        style={{
          fontFamily: 'Geist Mono, monospace',
          top: '53px',
          letterSpacing: '-0.36px'
        }}
      >
        Desktop (1440)
      </p>

      {/* Main Waitlist Container */}
      <div
        className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
        style={{
          width: '864px',
          height: '872px',
          top: '79px',
          background: 'linear-gradient(to bottom, rgb(248, 248, 248), rgb(199, 199, 199)), rgb(240, 240, 240)'
        }}
        data-name="Waitlist"
      >
        {/* Grid pattern background - horizontal lines */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute" style={{ left: '-77px', top: '0', width: '888px', height: '834px' }}>
            {Array.from({ length: 30 }, (_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 33}
                x2="888"
                y2={i * 33}
                stroke="rgb(0, 0, 0)"
                strokeWidth="1"
                opacity="0.1"
              />
            ))}
          </svg>
        </div>

        {/* Grid pattern background - vertical lines */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute" style={{ left: '-77px', top: '0', width: '888px', height: '888px' }}>
            {Array.from({ length: 30 }, (_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 33}
                y1="0"
                x2={i * 33}
                y2="888"
                stroke="rgb(0, 0, 0)"
                strokeWidth="1"
                opacity="0.1"
              />
            ))}
          </svg>
        </div>

        {/* Top gradient fade */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: '864px',
            height: '168px',
            top: '0',
            background: 'linear-gradient(to bottom, white, rgba(255,255,255,0))',
            filter: 'blur(18px)'
          }}
        />

        {/* Navigation Header */}
        <nav className="absolute left-0 right-0 flex items-center justify-between px-[115px] top-[17px]">
          {/* Logo */}
          <div
            className="flex items-center justify-center"
            style={{ width: '26px', height: '26px' }}
          >
            <img
              src="/assets/group-1171275132.svg"
              alt="Logo"
              className="w-full h-full"
            />
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-[6px]">
            <button
              className="flex items-center justify-center px-[10px] py-[4px] rounded-[6px]"
              style={{ backgroundColor: 'rgb(255, 239, 57)' }}
            >
              <span
                className="text-[12px] font-medium tracking-tight"
                style={{
                  fontFamily: 'Public Sans, sans-serif',
                  color: 'rgb(29, 29, 29)',
                  letterSpacing: '-0.35px'
                }}
              >
                Home
              </span>
            </button>
            <button className="flex items-center justify-center px-[10px] py-[4px] rounded-[6px]">
              <span
                className="text-[12px] font-medium tracking-tight"
                style={{
                  fontFamily: 'Public Sans, sans-serif',
                  color: 'rgb(29, 29, 29)',
                  letterSpacing: '-0.35px'
                }}
              >
                Features
              </span>
            </button>
            <button className="flex items-center justify-center px-[10px] py-[4px] rounded-[6px]">
              <span
                className="text-[12px] font-medium tracking-tight"
                style={{
                  fontFamily: 'Public Sans, sans-serif',
                  color: 'rgb(29, 29, 29)',
                  letterSpacing: '-0.35px'
                }}
              >
                Products
              </span>
            </button>
            <button className="flex items-center justify-center px-[10px] py-[4px] rounded-[6px]">
              <span
                className="text-[12px] font-medium tracking-tight"
                style={{
                  fontFamily: 'Public Sans, sans-serif',
                  color: 'rgb(29, 29, 29)',
                  letterSpacing: '-0.35px'
                }}
              >
                About Us
              </span>
            </button>
          </div>

          {/* Login Button */}
          <button
            className="flex items-center justify-center px-[10px] py-[4px] rounded-[6px]"
            style={{ backgroundColor: 'rgb(14, 15, 14)' }}
          >
            <span
              className="text-[12px] font-medium tracking-tight"
              style={{
                fontFamily: 'Public Sans, sans-serif',
                color: 'rgb(241, 240, 240)',
                letterSpacing: '-0.35px'
              }}
            >
              Login
            </span>
          </button>
        </nav>

        {/* Main Content */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ top: '113px' }}>
          {/* Heading with dashed border */}
          <div
            className="relative px-6 py-2"
            style={{
              border: '2px dashed rgb(5, 108, 236)',
              borderRadius: '12px'
            }}
          >
            <h1
              className="font-semibold"
              style={{
                fontFamily: 'Public Sans, sans-serif',
                fontSize: '69px',
                color: 'rgb(29, 29, 29)',
                letterSpacing: '-3.46px',
                lineHeight: '1.5'
              }}
            >
              It's worth the wait...
            </h1>
          </div>

          {/* Description */}
          <p
            className="text-center mt-[5px] opacity-80"
            style={{
              fontFamily: 'Public Sans, sans-serif',
              fontSize: '18px',
              color: 'rgb(29, 29, 29)',
              letterSpacing: '-0.92px',
              lineHeight: '1.5',
              maxWidth: '489px'
            }}
          >
            Discover an Array of Incredible Waitlist Framer Templates, Sign up to our waitlist to be notified when we launch!
          </p>
        </div>

        {/* Email Input & Button */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[6px]"
          style={{ top: '304px' }}
        >
          <div
            className="flex items-center"
            style={{
              width: '346px',
              height: '42px',
              backgroundColor: 'rgb(232, 232, 232)',
              border: '1px solid rgb(203, 203, 203)',
              boxShadow: '0px 28px 55px rgba(0, 0, 0, 0.12)',
              paddingLeft: '14px',
              paddingRight: '9px'
            }}
          >
            <span
              className="opacity-30"
              style={{
                fontFamily: 'Public Sans, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                color: 'rgb(0, 0, 0)',
                letterSpacing: '-0.48px'
              }}
            >
              Enter your email
            </span>
          </div>
          <button
            className="flex items-center justify-center uppercase"
            style={{
              width: '120px',
              height: '40px',
              backgroundColor: 'rgb(254, 238, 57)',
              boxShadow: '0px 28px 55px rgba(0, 0, 0, 0.12)',
              fontFamily: 'Public Sans, sans-serif',
              fontSize: '14px',
              fontWeight: '500',
              color: 'rgb(0, 0, 0)',
              letterSpacing: '-0.41px'
            }}
          >
            Join Waitlist
          </button>
        </div>

        {/* iPhone Mockup */}
        <div
          className="absolute"
          style={{
            width: '391px',
            height: '767px',
            left: 'calc(16.67% + 104px)',
            top: '408px'
          }}
        >
          <div
            className="relative"
            style={{ width: '370px', height: '749px' }}
          >
            {/* iPhone Frame SVGs */}
            <img
              src="/assets/g1506.svg"
              alt=""
              className="absolute"
              style={{ left: '0', top: '150px', width: '10px', height: '182px' }}
            />
            <img
              src="/assets/rect2172.svg"
              alt=""
              className="absolute"
              style={{ inset: '0', width: '366px', height: '749px', left: '2px' }}
            />
            <img
              src="/assets/rect2163.svg"
              alt=""
              className="absolute"
              style={{ left: '3px', top: '1px', width: '365px', height: '748px' }}
            />
            <img
              src="/assets/rect21631.svg"
              alt=""
              className="absolute"
              style={{ left: '5px', top: '3px', width: '361px', height: '744px' }}
            />
            <img
              src="/assets/rect3540.svg"
              alt=""
              className="absolute"
              style={{ left: '7px', top: '5px', width: '357px', height: '739px' }}
            />

            {/* Screen Content */}
            <div
              className="absolute overflow-hidden"
              style={{
                left: '21px',
                top: '17px',
                width: '330px',
                height: '715px',
                borderRadius: '39px'
              }}
            >
              <img
                src="/assets/image-34.png"
                alt="App Preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Notch */}
            <img
              src="/assets/subtract.svg"
              alt=""
              className="absolute"
              style={{ left: '109px', top: '17px', width: '152px', height: '27px' }}
            />

            {/* Camera */}
            <img
              src="/assets/g2170.svg"
              alt=""
              className="absolute"
              style={{ left: '227px', top: '21px', width: '12px', height: '12px' }}
            />

            {/* Home indicator */}
            <img
              src="/assets/rect1093.svg"
              alt=""
              className="absolute"
              style={{ left: '152px', top: '5px', width: '65px', height: '5px' }}
            />
          </div>
        </div>

        {/* Bottom blur gradient */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: '865px',
            height: '85px',
            backgroundColor: 'rgb(199, 199, 199)',
            filter: 'blur(43px)'
          }}
        />

        {/* View Launch Video Button */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[7px] rounded-[23px]"
          style={{
            bottom: '14px',
            backgroundColor: 'rgb(231, 231, 231)',
            border: '1px solid rgb(165, 165, 165)',
            paddingLeft: '12px',
            paddingRight: '3px',
            paddingTop: '3px',
            paddingBottom: '3px'
          }}
        >
          <span
            className="uppercase opacity-80"
            style={{
              fontFamily: 'Public Sans, sans-serif',
              fontSize: '9px',
              fontWeight: '500',
              color: 'rgb(29, 29, 29)'
            }}
          >
            View Launch Video
          </span>
          <div className="relative" style={{ width: '23px', height: '23px' }}>
            <img
              src="/assets/group-1171275136.svg"
              alt="Play"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[2px] p-[2px] rounded-[7px]"
        style={{
          bottom: '10px',
          backgroundColor: 'rgb(47, 47, 47)'
        }}
      >
        {/* Pointer Tool */}
        <div className="flex items-center p-[6px] rounded-[6px]">
          <div style={{ width: '18px', height: '18px' }}>
            <img
              src="/assets/tabler-icon-pointer.svg"
              alt="Pointer"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Hand Tool */}
        <div className="flex items-center p-[6px] rounded-[6px]">
          <div style={{ width: '18px', height: '18px' }}>
            <img
              src="/assets/tabler-icon-hand-three-fingers.svg"
              alt="Hand"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Comment Tool (Active) */}
        <div
          className="flex items-center p-[6px] rounded-[6px]"
          style={{ backgroundColor: 'rgb(5, 108, 236)' }}
        >
          <div
            className="rounded-tl-[7.5px] rounded-tr-[7.5px] rounded-br-[7.5px] rounded-bl-[1.5px]"
            style={{
              width: '14px',
              height: '14px',
              border: '1.5px solid white'
            }}
          />
        </div>
      </div>
    </div>
  )
}
