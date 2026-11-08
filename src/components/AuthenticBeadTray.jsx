import React from 'react';

// Actual bead palette styling mapped to authentic Little Loops photography
const THEME_STYLES = {
  'pink-cyan': {
    name: 'Rose & Ice Cyan',
    crystalA: '#FFB7CE',
    crystalB: '#7EE3EE',
    shadowA: 'rgba(255, 183, 206, 0.45)',
    shadowB: 'rgba(126, 227, 238, 0.45)',
    glow: 'rgba(255, 183, 206, 0.25)',
  },
  'pure-pink': {
    name: 'Cotton Blush',
    crystalA: '#FFAEC7',
    crystalB: '#FFE4EE',
    shadowA: 'rgba(255, 174, 199, 0.45)',
    shadowB: 'rgba(255, 228, 238, 0.45)',
    glow: 'rgba(255, 174, 199, 0.25)',
  },
  'ocean-ice': {
    name: 'Glacier Cyan',
    crystalA: '#7FE5F2',
    crystalB: '#C8F6FC',
    shadowA: 'rgba(127, 229, 242, 0.45)',
    shadowB: 'rgba(200, 246, 252, 0.45)',
    glow: 'rgba(127, 229, 242, 0.25)',
  },
  'crystal-mix': {
    name: 'Sugar Pop Mix',
    crystalA: '#FCA5A5',
    crystalB: '#93C5FD',
    shadowA: 'rgba(252, 165, 165, 0.45)',
    shadowB: 'rgba(147, 197, 253, 0.45)',
    glow: 'rgba(196, 181, 253, 0.25)',
  },
};

export default function AuthenticBeadTray({ text, theme, charm, sizeCm }) {
  const letters = (text.trim() || 'LOVE').toUpperCase().split('');
  const activeTheme = THEME_STYLES[theme] || THEME_STYLES['pink-cyan'];

  const charmGlyph = charm === 'ribbon' ? '🎀' : charm === 'star' ? '⭐' : '💗';

  // Bead count calculated from sizeCm
  const crystalCountEachSide = Math.max(4, Math.min(8, Math.round(sizeCm / 2.8)));

  return (
    <div className="atelier-tray">
      {/* Wooden / Linen Atelier Tray Background */}
      <div className="tray-inner">
        {/* Felt texture top header */}
        <div className="tray-header">
          <div className="tray-tag">
            <span className="tray-dot"></span>
            Linen Work-Mat • Scale 1:1
          </div>
          <div className="tray-measure">
            Elastic Span: <strong>{sizeCm} cm</strong>
          </div>
        </div>

        {/* The Live Beaded Strand Laid Flat on Velvet Workmat */}
        <div className="strand-stage">
          {/* Real transparent elastic stretch cord behind */}
          <div className="elastic-cord-line" />

          <div className="bead-sequence">
            {/* Left Crystal Faceted Cut Gems */}
            {Array.from({ length: crystalCountEachSide }).map((_, i) => {
              const isEven = i % 2 === 0;
              const color = isEven ? activeTheme.crystalA : activeTheme.crystalB;
              const shadow = isEven ? activeTheme.shadowA : activeTheme.shadowB;

              return (
                <div
                  key={`left-crystal-${i}`}
                  className="crystal-bead"
                  style={{
                    backgroundColor: color,
                    boxShadow: `inset -2px -3px 5px rgba(0,0,0,0.18), inset 2px 2px 4px rgba(255,255,255,0.8), 0 4px 8px ${shadow}`,
                  }}
                  title="Faceted Glass Crystal"
                >
                  <span className="crystal-facet" />
                </div>
              );
            })}

            {/* Left Accent Charm Bead */}
            <div className="charm-bead left-charm">
              <span>{charmGlyph}</span>
            </div>

            {/* Letter Beads */}
            {letters.map((char, index) => {
              if (char === ' ') {
                return (
                  <div key={`space-${index}`} className="spacer-bead">
                    <span className="space-dot" />
                  </div>
                );
              }

              return (
                <div key={`letter-${index}-${char}`} className="letter-bead">
                  <span className="letter-char">{char}</span>
                  <span className="bead-hole-left" />
                  <span className="bead-hole-right" />
                </div>
              );
            })}

            {/* Right Accent Charm Bead */}
            <div className="charm-bead right-charm">
              <span>{charmGlyph}</span>
            </div>

            {/* Right Crystal Faceted Cut Gems */}
            {Array.from({ length: crystalCountEachSide }).map((_, i) => {
              const isEven = i % 2 === 1;
              const color = isEven ? activeTheme.crystalA : activeTheme.crystalB;
              const shadow = isEven ? activeTheme.shadowA : activeTheme.shadowB;

              return (
                <div
                  key={`right-crystal-${i}`}
                  className="crystal-bead"
                  style={{
                    backgroundColor: color,
                    boxShadow: `inset -2px -3px 5px rgba(0,0,0,0.18), inset 2px 2px 4px rgba(255,255,255,0.8), 0 4px 8px ${shadow}`,
                  }}
                  title="Faceted Glass Crystal"
                >
                  <span className="crystal-facet" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Ruler Guide Directly Under the Strand */}
        <div className="tray-ruler" aria-hidden="true">
          <div className="ruler-line" />
          <div className="ruler-ticks">
            <span>0cm</span>
            <span>4cm</span>
            <span>8cm</span>
            <span>12cm</span>
            <span>{sizeCm}cm (Your Fit)</span>
          </div>
        </div>

        <div className="tray-caption">
          Each letter bead is individually threaded by hand on unbreakable 0.7mm Korean stretch elastic.
        </div>
      </div>
    </div>
  );
}
