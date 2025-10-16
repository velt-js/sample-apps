import {
  imgTablerIconHandStop,
  imgTablerIconArrowBackUp,
  imgTablerIconArrowBackUp1,
  imgTablerIconPlayerPlayFilled
} from '../constants';

export function BottomToolbar() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#121212',
        borderRadius: '32px',
        padding: '4px',
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        zIndex: 5
      }}
    >
      <button
        style={{
          background: 'transparent',
          border: 'none',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '32px'
        }}
      >
        <img src={imgTablerIconHandStop} alt="Hand" style={{ width: '20px', height: '20px' }} />
      </button>
      <button
        style={{
          background: 'transparent',
          border: 'none',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '32px'
        }}
      >
        <img src={imgTablerIconArrowBackUp} alt="Undo" style={{ width: '20px', height: '20px' }} />
      </button>
      <button
        style={{
          background: 'transparent',
          border: 'none',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '32px'
        }}
      >
        <img src={imgTablerIconArrowBackUp1} alt="Redo" style={{ width: '20px', height: '20px' }} />
      </button>
      <button
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: 'none',
          padding: '8px 12px 8px 8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderRadius: '32px'
        }}
      >
        <img src={imgTablerIconPlayerPlayFilled} alt="Play" style={{ width: '20px', height: '20px' }} />
        <span
          style={{
            fontFamily: 'Urbanist, sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            color: 'white',
            letterSpacing: '-0.56px'
          }}
        >
          Preview
        </span>
      </button>
    </div>
  );
}

