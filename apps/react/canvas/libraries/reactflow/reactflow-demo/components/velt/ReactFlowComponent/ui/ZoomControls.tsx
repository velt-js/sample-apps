import { imgTablerIconPlus, imgTablerIconMinus } from '../constants';

type ZoomControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function ZoomControls({ onZoomIn, onZoomOut }: ZoomControlsProps) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        right: '9.22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        zIndex: 5
      }}
    >
      <button
        style={{
          background: '#141414',
          border: 'none',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '32px'
        }}
        onClick={onZoomIn}
      >
        <img src={imgTablerIconPlus} alt="Zoom In" style={{ width: '16px', height: '16px' }} />
      </button>
      <button
        style={{
          background: '#141414',
          border: 'none',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '32px'
        }}
        onClick={onZoomOut}
      >
        <img src={imgTablerIconMinus} alt="Zoom Out" style={{ width: '16px', height: '16px' }} />
      </button>
    </div>
  );
}

