import React from 'react';

export default function BraceletVisualizer({
  text = 'LITTLE LOOPS',
  beadTheme = 'pink-cyan', // 'pink-cyan', 'pure-pink', 'ocean-ice', 'crystal-mix'
  charm = 'heart', // 'heart', 'ribbon', 'star'
  sizeCm = 16,
  isMini = false,
}) {
  const letters = (text.trim() || 'LOVE').toUpperCase().split('');

  // Bead color themes matching actual Little Loops photography
  const getThemeColors = (index) => {
    switch (beadTheme) {
      case 'pure-pink':
        return index % 2 === 0
          ? { bg: 'radial-gradient(circle at 35% 35%, #FFDFEB, #F28EAD)', border: '#E7789A' }
          : { bg: 'radial-gradient(circle at 35% 35%, #FFFFFF, #FFC1D6)', border: '#F49EB9' };
      case 'ocean-ice':
        return index % 2 === 0
          ? { bg: 'radial-gradient(circle at 35% 35%, #E6FAFF, #76D7EA)', border: '#5BC2D6' }
          : { bg: 'radial-gradient(circle at 35% 35%, #FFFFFF, #BDEBF5)', border: '#8AD5E7' };
      case 'crystal-mix':
        const mix = ['#F9A8D4', '#93C5FD', '#FDE047', '#C4B5FD'];
        const col = mix[index % mix.length];
        return { bg: `radial-gradient(circle at 35% 35%, #FFFFFF, ${col})`, border: col };
      case 'pink-cyan':
      default:
        // Signature Little Loops pattern: Faceted Rose & Cyan crystal beads
        return index % 2 === 0
          ? { bg: 'radial-gradient(circle at 35% 35%, #FFE3EC, #F48FB1)', border: '#EC407A' }
          : { bg: 'radial-gradient(circle at 35% 35%, #E0F7FA, #80DEEA)', border: '#4DD0E1' };
    }
  };

  const beadCountSide = isMini ? 4 : 6;

  return (
    <div
      style={{
        padding: isMini ? '10px 14px' : '28px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF5F7 100%)',
        borderRadius: isMini ? '14px' : '24px',
        border: '1px solid #F3DFE5',
        boxShadow: isMini ? 'none' : 'inset 0 2px 6px rgba(255,255,255,0.8), 0 8px 24px rgba(210, 110, 140, 0.08)',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Background Soft String Line */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '8%',
          right: '8%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #E2B8C6, #D498AC, #E2B8C6, transparent)',
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      />

      {/* Main Beaded Strand */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: isMini ? '3px' : '5px',
          zIndex: 2,
          maxWidth: '100%',
        }}
      >
        {/* Left Crystal Faceted Beads */}
        {Array.from({ length: beadCountSide }).map((_, i) => {
          const style = getThemeColors(i);
          return (
            <div
              key={`left-bead-${i}`}
              title="Faceted Crystal Bead"
              style={{
                width: isMini ? '14px' : '22px',
                height: isMini ? '14px' : '22px',
                borderRadius: '50%',
                background: style.bg,
                border: `1px solid ${style.border}`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.08), inset -1px -1px 3px rgba(0,0,0,0.1)',
                transform: 'scale(1)',
                transition: 'transform 0.2s ease',
              }}
            />
          );
        })}

        {/* Left Heart Spacer Charm */}
        <div
          style={{
            width: isMini ? '15px' : '24px',
            height: isMini ? '15px' : '24px',
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '1.5px solid #F48FB1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMini ? '9px' : '13px',
            color: '#E91E63',
            boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
          }}
        >
          {charm === 'ribbon' ? '🎀' : charm === 'star' ? '⭐' : '💗'}
        </div>

        {/* Letter Beads */}
        {letters.map((char, index) => {
          const isSpace = char === ' ';
          if (isSpace) {
            return (
              <div
                key={`space-${index}`}
                style={{
                  width: isMini ? '10px' : '16px',
                  height: isMini ? '10px' : '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: isMini ? '8px' : '12px',
                    height: isMini ? '8px' : '12px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1px solid #E68AA5',
                    fontSize: isMini ? '7px' : '10px',
                    color: '#E68AA5',
                  }}
                >
                  •
                </div>
              </div>
            );
          }

          return (
            <div
              key={`letter-${index}-${char}`}
              style={{
                width: isMini ? '16px' : '26px',
                height: isMini ? '16px' : '26px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1.5px solid #E2D3D8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: isMini ? '10px' : '14px',
                fontFamily: 'var(--font-sans)',
                color: '#2D161C',
                boxShadow: '0 2px 5px rgba(0,0,0,0.08), inset 0 1px 2px rgba(255,255,255,0.9)',
                position: 'relative',
              }}
            >
              {char}
            </div>
          );
        })}

        {/* Right Heart Spacer Charm */}
        <div
          style={{
            width: isMini ? '15px' : '24px',
            height: isMini ? '15px' : '24px',
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '1.5px solid #F48FB1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMini ? '9px' : '13px',
            color: '#E91E63',
            boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
          }}
        >
          {charm === 'ribbon' ? '🎀' : charm === 'star' ? '⭐' : '💗'}
        </div>

        {/* Right Crystal Faceted Beads */}
        {Array.from({ length: beadCountSide }).map((_, i) => {
          const style = getThemeColors(i + 1);
          return (
            <div
              key={`right-bead-${i}`}
              title="Faceted Crystal Bead"
              style={{
                width: isMini ? '14px' : '22px',
                height: isMini ? '14px' : '22px',
                borderRadius: '50%',
                background: style.bg,
                border: `1px solid ${style.border}`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.08), inset -1px -1px 3px rgba(0,0,0,0.1)',
              }}
            />
          );
        })}
      </div>

      {/* Size Tag (in centimeters as requested) */}
      {!isMini && (
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            color: 'var(--color-text-secondary)',
            fontWeight: 500,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
            }}
          />
          Live Handmade Preview: <strong>{sizeCm} cm Wrist Fit</strong> (Elastic Stretch Cord)
        </div>
      )}
    </div>
  );
}
