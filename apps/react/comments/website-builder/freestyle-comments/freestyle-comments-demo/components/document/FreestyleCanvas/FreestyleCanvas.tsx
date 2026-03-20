'use client'

// Logo component - inline SVG for the "M" logo
function Logo() {
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{
        width: '38px',
        height: '38px',
        backgroundColor: '#1D1D1D',
        border: '1px solid #3D3D3D'
      }}
    >
      <span
        style={{
          fontFamily: 'Public Sans, sans-serif',
          fontSize: '18px',
          fontWeight: '600',
          color: '#FFFFFF'
        }}
      >
        M
      </span>
    </div>
  )
}

// Play button icon
function PlayIcon() {
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{
        width: '23px',
        height: '23px',
        backgroundColor: '#1D1D1D'
      }}
    >
      <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
        <path d="M8 5L0.5 9.33V0.67L8 5Z" fill="white" />
      </svg>
    </div>
  )
}

export default function FreestyleCanvas() {
  return (
    <div
      className="absolute inset-0 select-text"
      style={{ backgroundColor: 'var(--app-bg)' }}
      data-name="freestyle"
    >
      {/* Desktop label */}
      <p
        className="absolute left-1/2 -translate-x-1/2 font-mono text-xs opacity-50 uppercase tracking-tight select-text"
        style={{
          fontFamily: 'Geist Mono, monospace',
          top: '53px',
          letterSpacing: '-0.36px',
          color: 'var(--app-text-primary)',
        }}
      >
        Desktop (1440)
      </p>

      {/* Main Waitlist Container */}
      <div
        className="absolute left-1/2 -translate-x-1/2 overflow-hidden select-text"
        style={{
          width: '864px',
          height: '872px',
          top: '79px',
          background: 'linear-gradient(to bottom, rgb(248, 248, 248), rgb(199, 199, 199)), rgb(240, 240, 240)'
        }}
        data-name="Waitlist"
      >
        {/* Grid pattern background - horizontal lines */}
        <div className="absolute inset-0 pointer-events-none select-none">
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
        <div className="absolute inset-0 pointer-events-none select-none">
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
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none"
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
          <Logo />

          {/* Nav Links */}
          <div className="flex items-center gap-[6px]">
            <button
              className="flex items-center justify-center px-[10px] py-[4px] rounded-[6px]"
              style={{ backgroundColor: 'rgb(255, 239, 57)' }}
            >
              <span
                className="text-[12px] font-medium tracking-tight select-text"
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
                className="text-[12px] font-medium tracking-tight select-text"
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
                className="text-[12px] font-medium tracking-tight select-text"
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
                className="text-[12px] font-medium tracking-tight select-text"
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
              className="text-[12px] font-medium tracking-tight select-text"
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
              className="font-semibold select-text"
              style={{
                fontFamily: 'Public Sans, sans-serif',
                fontSize: '69px',
                color: 'rgb(29, 29, 29)',
                letterSpacing: '-3.46px',
                lineHeight: '1.5'
              }}
            >
              It&apos;s worth the wait...
            </h1>
          </div>

          {/* Description */}
          <p
            className="text-center mt-[5px] opacity-80 select-text"
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
              className="opacity-30 select-text"
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
            <span className="select-text">Join Waitlist</span>
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
            {/* iPhone Frame - using CSS instead of SVG images */}
            <div
              className="absolute rounded-[55px]"
              style={{
                left: '2px',
                top: '0',
                width: '366px',
                height: '749px',
                backgroundColor: '#1a1a1a',
                border: '1px solid #333'
              }}
            />
            <div
              className="absolute rounded-[52px]"
              style={{
                left: '5px',
                top: '3px',
                width: '360px',
                height: '743px',
                backgroundColor: '#0a0a0a',
                border: '1px solid #222'
              }}
            />

            {/* Side buttons */}
            <div
              className="absolute rounded-l-sm"
              style={{
                left: '0',
                top: '150px',
                width: '3px',
                height: '30px',
                backgroundColor: '#333'
              }}
            />
            <div
              className="absolute rounded-l-sm"
              style={{
                left: '0',
                top: '200px',
                width: '3px',
                height: '60px',
                backgroundColor: '#333'
              }}
            />
            <div
              className="absolute rounded-l-sm"
              style={{
                left: '0',
                top: '280px',
                width: '3px',
                height: '60px',
                backgroundColor: '#333'
              }}
            />

            {/* Screen Content */}
            <div
              className="absolute overflow-hidden rounded-[39px] select-text"
              style={{
                left: '21px',
                top: '17px',
                width: '330px',
                height: '715px',
                backgroundColor: '#f5f5f5'
              }}
            >
              {/* Phone screen content - recreated as components */}
              <div className="w-full h-full flex flex-col">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 py-3">
                  <span className="text-[14px] font-medium select-text" style={{ fontFamily: 'system-ui', color: '#000' }}>
                    12:30
                  </span>
                  <div className="flex items-center gap-1">
                    <svg width="18" height="12" viewBox="0 0 18 12" fill="black">
                      <rect x="0" y="3" width="3" height="9" rx="1" />
                      <rect x="5" y="2" width="3" height="10" rx="1" />
                      <rect x="10" y="0" width="3" height="12" rx="1" />
                      <rect x="15" y="0" width="3" height="12" rx="1" fillOpacity="0.3" />
                    </svg>
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="black">
                      <path d="M7.5 2.5C9.5 2.5 11.3 3.3 12.6 4.6L14 3.2C12.3 1.5 10 0.5 7.5 0.5C5 0.5 2.7 1.5 1 3.2L2.4 4.6C3.7 3.3 5.5 2.5 7.5 2.5Z" />
                      <path d="M7.5 5.5C8.6 5.5 9.6 5.9 10.4 6.6L11.8 5.2C10.6 4.1 9.1 3.5 7.5 3.5C5.9 3.5 4.4 4.1 3.2 5.2L4.6 6.6C5.4 5.9 6.4 5.5 7.5 5.5Z" />
                      <circle cx="7.5" cy="9" r="2" />
                    </svg>
                    <svg width="25" height="12" viewBox="0 0 25 12" fill="black">
                      <rect x="0" y="1" width="21" height="10" rx="2" stroke="black" strokeWidth="1" fill="none" />
                      <rect x="2" y="3" width="17" height="6" rx="1" fill="black" />
                      <path d="M22 4v4a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2z" fill="black" />
                    </svg>
                  </div>
                </div>

                {/* Phone content */}
                <div className="flex-1 px-5 py-4">
                  <h2
                    className="font-bold select-text"
                    style={{
                      fontFamily: 'Public Sans, sans-serif',
                      fontSize: '24px',
                      color: '#1D1D1D',
                      lineHeight: '1.3'
                    }}
                  >
                    We&apos;ve some cool Framer waitlist template
                  </h2>
                  <p
                    className="mt-3 select-text"
                    style={{
                      fontFamily: 'Public Sans, sans-serif',
                      fontSize: '13px',
                      color: '#666',
                      lineHeight: '1.5'
                    }}
                  >
                    Discover an Array of Incredible Waitlist Framer Templates, Sign up to our waitlist to be notified when we launch!
                  </p>

                  {/* Mini preview card */}
                  <div
                    className="mt-5 rounded-lg overflow-hidden"
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <div className="p-3 flex items-center justify-between" style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-yellow-400" />
                        <span className="text-[10px] text-gray-400 select-text">site.com</span>
                      </div>
                      <span className="text-[10px] text-gray-400 select-text">design</span>
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-[14px] font-medium select-text" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                        It&apos;s worth the wait...
                      </p>
                      <p className="text-[8px] text-gray-400 mt-1 select-text">
                        Discover an Array of Incredible Waitlist Framer Templates Sign
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom toolbar */}
                <div className="flex items-center justify-center gap-2 py-4">
                  <div className="p-2 rounded-lg bg-gray-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                    </svg>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                      <path d="M18 11V6a2 2 0 0 0-4 0" />
                      <path d="M14 10V4a2 2 0 0 0-4 0v2" />
                      <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
                      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                    </svg>
                  </div>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgb(5, 108, 236)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="flex justify-center pb-2">
                  <div className="w-[134px] h-[5px] bg-black rounded-full" />
                </div>
              </div>
            </div>

            {/* Notch */}
            <div
              className="absolute flex items-center justify-center rounded-b-[20px]"
              style={{
                left: '109px',
                top: '17px',
                width: '152px',
                height: '27px',
                backgroundColor: '#000'
              }}
            >
              {/* Camera */}
              <div
                className="absolute rounded-full"
                style={{
                  right: '35px',
                  top: '8px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#1a1a1a',
                  border: '2px solid #333'
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom blur gradient */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"
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
            className="uppercase opacity-80 select-text"
            style={{
              fontFamily: 'Public Sans, sans-serif',
              fontSize: '9px',
              fontWeight: '500',
              color: 'rgb(29, 29, 29)'
            }}
          >
            View Launch Video
          </span>
          <PlayIcon />
        </div>
      </div>

    </div>
  )
}
