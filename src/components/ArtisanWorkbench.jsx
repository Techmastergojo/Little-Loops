import React, { useState } from 'react';
import AuthenticBeadTray from './AuthenticBeadTray.jsx';
import confetti from 'canvas-confetti';

const PALETTES = [
  {
    id: 'pink-cyan',
    title: 'Rose & Ice Cyan',
    note: 'As seen on our best-selling Instagram sets',
    dotA: '#FFB7CE',
    dotB: '#7EE3EE',
  },
  {
    id: 'pure-pink',
    title: 'Soft Blush Cotton',
    note: 'Delicate pink facets with milk pearl',
    dotA: '#FFAEC7',
    dotB: '#FFE4EE',
  },
  {
    id: 'ocean-ice',
    title: 'Glacier Blue',
    note: 'Aqua & mint crystal shimmer',
    dotA: '#7FE5F2',
    dotB: '#C8F6FC',
  },
  {
    id: 'crystal-mix',
    title: 'Pastel Sorbet',
    note: 'Lilac, soft gold, strawberry & sky',
    dotA: '#FCA5A5',
    dotB: '#93C5FD',
  },
];

const CHARMS = [
  { id: 'heart', glyph: '💗', name: 'Heart' },
  { id: 'ribbon', glyph: '🎀', name: 'Bow' },
  { id: 'star', glyph: '⭐', name: 'Star' },
];

const SIZES = [
  { cm: 14, label: '14 cm', note: 'Petite wrist / teens' },
  { cm: 16, label: '16 cm', note: 'Standard fit for 90% of girls', badge: 'Standard' },
  { cm: 18, label: '18 cm', note: 'Relaxed comfy drape' },
  { cm: 20, label: '20 cm', note: 'Loose / wider wrist' },
];

export default function ArtisanWorkbench({ onAddToCart }) {
  const [text, setText] = useState('SOUL SISTER');
  const [theme, setTheme] = useState('pink-cyan');
  const [charm, setCharm] = useState('heart');
  const [sizeCm, setSizeCm] = useState(16);
  const [added, setAdded] = useState(false);

  const presets = ['BEST MOM', 'LOVING SIS', 'AMMI', 'BEST TEACHER', 'MY PERSON', 'SUNSHINE'];

  const handleOrder = (e) => {
    e.preventDefault();
    const item = {
      id: 'custom-' + Date.now(),
      title: `Custom Bracelet: "${text.toUpperCase()}"`,
      price: 199,
      image: '/images/sister.jpg',
      badge: 'Custom Piece',
      details: {
        text: text.toUpperCase(),
        theme: PALETTES.find((p) => p.id === theme)?.title,
        charm: CHARMS.find((c) => c.id === charm)?.name,
        sizeCm: `${sizeCm} cm`,
      },
    };

    onAddToCart(item);
    setAdded(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#E68AA5', '#7EE3EE', '#FFFFFF', '#F8BBD0'],
    });

    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <section id="customizer" className="workbench-section">
      <div className="container">
        {/* Intro */}
        <div className="workbench-intro">
          <p className="kicker">Pakistan's 1st Custom Beaded Bracelet Brand</p>
          <h2 className="editorial-title">
            The Artisan Work-Table
          </h2>
          <p className="editorial-lead">
            No mockups or artificial graphics. Type your letters below to see exactly how your bracelet is laid out bead-by-bead before our craftswomen thread it.
          </p>
        </div>

        {/* The Live Workbench Board */}
        <div className="workbench-card">
          {/* Top Half: Authentic Live Strand Tray */}
          <div className="workbench-preview-zone">
            <AuthenticBeadTray
              text={text}
              theme={theme}
              charm={charm}
              sizeCm={sizeCm}
            />

            {/* Price Callout */}
            <div className="promo-ribbon-strip">
              <div className="price-tag-group">
                <span className="current-price">1 for Rs. 199</span>
                <span className="bundle-price" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#B84D6C' }}>
                  • 2 for Rs. 299
                </span>
                <span className="sale-pill">Mega Opening Special</span>
              </div>
              <p className="promo-note">
                Hand-knotted with hidden security locks. Guaranteed not to snap under normal wear.
              </p>
            </div>
          </div>

          {/* Bottom Half: Tactile Controls */}
          <form onSubmit={handleOrder} className="workbench-controls-form">
            {/* Step 1: Text */}
            <div className="control-group">
              <label htmlFor="bracelet-text" className="control-label">
                <span className="step-num">1</span>
                What would you like it to say?
              </label>
              <div className="input-wrap">
                <input
                  id="bracelet-text"
                  type="text"
                  maxLength={14}
                  value={text}
                  onChange={(e) => setText(e.target.value.toUpperCase())}
                  placeholder="e.g. LOVING SIS, BEST MOM"
                  className="handcrafted-input"
                  required
                />
              </div>

              {/* Inspiration Chips */}
              <div className="preset-chips">
                <span className="chips-label">Quick Ideas:</span>
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setText(p)}
                    className={`chip-btn ${text === p ? 'active' : ''}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Crystal Palette */}
            <div className="control-group">
              <label className="control-label">
                <span className="step-num">2</span>
                Choose Crystal Color Combination
              </label>
              <div className="palette-grid">
                {PALETTES.map((pal) => (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => setTheme(pal.id)}
                    className={`palette-card ${theme === pal.id ? 'selected' : ''}`}
                  >
                    <div className="gem-duo">
                      <span className="gem-dot" style={{ backgroundColor: pal.dotA }} />
                      <span className="gem-dot" style={{ backgroundColor: pal.dotB }} />
                    </div>
                    <div className="palette-info">
                      <div className="palette-name">{pal.title}</div>
                      <div className="palette-sub">{pal.note}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Charms & Sizing in cm */}
            <div className="control-row-split">
              {/* Charm Selection */}
              <div className="control-group split-col">
                <label className="control-label">
                  <span className="step-num">3</span>
                  Accent Spacer Charm
                </label>
                <div className="charm-row">
                  {CHARMS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCharm(c.id)}
                      className={`charm-pill ${charm === c.id ? 'active' : ''}`}
                    >
                      <span className="charm-symbol">{c.glyph}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wrist Size in cm */}
              <div className="control-group split-col">
                <div className="label-with-aside">
                  <label className="control-label">
                    <span className="step-num">4</span>
                    Wrist Size (in cm)
                  </label>
                  <a href="#size-guide" className="inline-guide-link">
                    How to measure in cm?
                  </a>
                </div>
                <div className="size-row">
                  {SIZES.map((s) => (
                    <button
                      key={s.cm}
                      type="button"
                      onClick={() => setSizeCm(s.cm)}
                      className={`size-tile ${sizeCm === s.cm ? 'active' : ''}`}
                    >
                      {s.badge && <span className="mini-badge">{s.badge}</span>}
                      <span className="size-metric">{s.label}</span>
                      <span className="size-hint">{s.note}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="action-row">
              <button type="submit" className="bag-submit-btn">
                <span>Add This Handcrafted Piece to Bag</span>
                <span className="btn-divider">•</span>
                <span className="price-btn-highlight">1 for Rs. 199 / 2 for Rs. 299</span>
              </button>

              {added && (
                <div className="confirmation-banner" role="status">
                  ✓ Threaded & placed in your bag! Order directly on website with Cash on Delivery.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
