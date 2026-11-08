import React, { useState, useRef } from 'react';
import BraceletCanvas3D from './BraceletCanvas3D.jsx';
import confetti from 'canvas-confetti';
import { Sparkles, Ruler, ShoppingBag, Zap } from 'lucide-react';

const PALETTE_OPTIONS = [
  {
    id: 'pink-cyan',
    label: 'Signature Crystal',
    desc: 'Rose & Ice Cyan — our most loved',
    swatch: 'linear-gradient(135deg, #F48FB1 0%, #80DEEA 100%)',
  },
  {
    id: 'pure-pink',
    label: 'Cotton Candy',
    desc: 'Full blush & pearl tones',
    swatch: 'linear-gradient(135deg, #F48FB1 0%, #FFF0F5 100%)',
  },
  {
    id: 'ocean-ice',
    label: 'Frozen Glaze',
    desc: 'Sky blue & aqua crystal',
    swatch: 'linear-gradient(135deg, #80DEEA 0%, #E0F7FA 100%)',
  },
  {
    id: 'crystal-mix',
    label: 'Rainbow Sparkle',
    desc: 'Multi-pastel faceted mix',
    swatch: 'linear-gradient(135deg, #F48FB1, #93C5FD, #FDE68A, #C4B5FD)',
  },
];

const CHARM_OPTIONS = [
  { id: 'heart', emoji: '💗', label: 'Pink Heart' },
  { id: 'ribbon', emoji: '🎀', label: 'Bow Ribbon' },
  { id: 'star', emoji: '⭐', label: 'Sweet Star' },
];

const SIZE_OPTIONS = [
  { value: 14, label: '14 cm', hint: 'Petite / Teenage' },
  { value: 16, label: '16 cm', hint: 'Standard (Most Popular)', popular: true },
  { value: 18, label: '18 cm', hint: 'Relaxed Comfort' },
  { value: 20, label: '20 cm', hint: 'Extended / Loose' },
];

const SUGGESTIONS = ['BEST MOM', 'LOVING SIS', 'MY BESTIE', 'SOUL SISTER', 'BEST TEACHER', 'AMMI JAAN', 'ZINDAGI'];

export default function CustomizerEngine({ onAddToCart }) {
  const [text, setText] = useState('SOUL SISTER');
  const [palette, setPalette] = useState('pink-cyan');
  const [charm, setCharm] = useState('heart');
  const [sizeCm, setSizeCm] = useState(16);
  const [added, setAdded] = useState(false);
  const inputRef = useRef(null);

  const handleAdd = (e) => {
    e.preventDefault();
    const item = {
      id: 'custom-' + Date.now(),
      title: `Custom Bracelet: "${text.toUpperCase()}"`,
      price: 299,
      originalPrice: 400,
      image: '/images/sister.jpg',
      badge: 'Custom Order',
      details: {
        text: text.toUpperCase(),
        theme: PALETTE_OPTIONS.find(p => p.id === palette)?.label,
        charm: CHARM_OPTIONS.find(c => c.id === charm)?.label,
        sizeCm: `${sizeCm} cm`,
      },
    };
    onAddToCart(item);
    setAdded(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#E68AA5', '#80DEEA', '#FFFFFF', '#F8BBD0', '#C4B5FD'],
    });
    setTimeout(() => setAdded(false), 3200);
  };

  return (
    <section
      id="customizer"
      style={{
        padding: '6rem 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #FFF9FB 0%, #FFFBF9 100%)',
      }}
    >
      {/* Background decorative circles */}
      <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '340px', height: '340px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(230,138,165,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(128,222,234,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '6px 16px',
            background: 'linear-gradient(135deg, #FDE8EF, #E8F9FB)',
            color: 'var(--color-rose-dark)', borderRadius: '9999px',
            fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: '1rem', border: '1px solid var(--color-border)',
          }}>
            <Zap size={13} />
            Pakistan's 1st — Live 3D Bracelet Customizer
          </span>
          <h2 className="serif-heading" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', marginBottom: '0.75rem', lineHeight: 1.15 }}>
            Design Your <span style={{ color: 'var(--color-rose-dark)', fontStyle: 'italic' }}>Own Bracelet</span> in 3D
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Type a name, pick crystal colours, choose a charm. Watch your unique bracelet spin in real-time 3D before you order.
          </p>
        </div>

        {/* Main Engine Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
          background: '#FFFFFF',
          borderRadius: '28px',
          border: '1px solid var(--color-border)',
          boxShadow: '0 20px 60px rgba(92, 38, 51, 0.09)',
          padding: 'clamp(1.75rem, 4vw, 3rem)',
        }}>

          {/* LEFT: 3D Live Canvas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="serif-heading" style={{ fontSize: '1.2rem' }}>Live 3D Preview</h3>
              <span style={{
                fontSize: '0.72rem', fontWeight: 700, color: '#059669',
                background: '#ECFDF5', padding: '4px 10px', borderRadius: '20px',
              }}>
                Rotate by moving mouse
              </span>
            </div>

            {/* Three.js Canvas */}
            <BraceletCanvas3D text={text} palette={palette} charm={charm} sizeCm={sizeCm} />

            {/* Price Block */}
            <div style={{
              padding: '1.1rem 1.3rem',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #FFF5F8, #F0FCFF)',
              border: '1.5px dashed var(--color-border-hover)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-rose-dark)' }}>Rs. 299</span>
                  <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>Rs. 400</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#B91C1C', background: '#FEE2E2', padding: '2px 7px', borderRadius: '6px' }}>SAVE 25%</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginTop: '2px', fontWeight: 500 }}>
                  Mega Opening Sale: 2 Custom Bracelets for Rs. 299
                </p>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, background: '#DCFCE7', padding: '5px 11px', borderRadius: '20px' }}>
                Premium Elastic Cord
              </span>
            </div>
          </div>

          {/* RIGHT: Controls Form */}
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>

            {/* Input */}
            <div>
              <label htmlFor="bead-text" style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem', color: 'var(--color-text-primary)' }}>
                What should it spell? (Max 14 letters)
              </label>
              <input
                id="bead-text"
                ref={inputRef}
                type="text"
                maxLength={14}
                value={text}
                onChange={e => setText(e.target.value.toUpperCase())}
                placeholder="e.g. BEST MOM, AYESHA, MY BESTIE"
                required
                style={{
                  width: '100%', padding: '0.85rem 1rem',
                  borderRadius: '14px', border: '2px solid var(--color-border)',
                  fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.12em',
                  background: '#FEFEFF', outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--color-rose)'}
                onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
              />
              {/* Quick suggestion chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s} type="button"
                    onClick={() => setText(s)}
                    style={{
                      fontSize: '0.72rem', fontWeight: 600, padding: '4px 10px',
                      borderRadius: '20px', border: '1px solid var(--color-border)',
                      background: text === s ? 'var(--color-blush)' : '#FAFAFA',
                      color: text === s ? 'var(--color-rose-dark)' : 'var(--color-text-secondary)',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Crystal Palette */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.6rem', color: 'var(--color-text-primary)' }}>
                Choose Crystal Bead Palette
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                {PALETTE_OPTIONS.map(opt => (
                  <button
                    key={opt.id} type="button"
                    onClick={() => setPalette(opt.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 12px', borderRadius: '14px',
                      border: palette === opt.id ? '2px solid var(--color-rose)' : '1.5px solid var(--color-border)',
                      background: palette === opt.id ? 'var(--color-blush-light)' : '#FAFAFA',
                      cursor: 'pointer', textAlign: 'left',
                      boxShadow: palette === opt.id ? '0 0 0 3px rgba(230,138,165,0.15)' : 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: opt.swatch, flexShrink: 0, border: '1.5px solid rgba(0,0,0,0.08)' }} />
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{opt.label}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: '1px' }}>{opt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Charms */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
                Pick Your Charm Accents
              </label>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                {CHARM_OPTIONS.map(c => (
                  <button
                    key={c.id} type="button"
                    onClick={() => setCharm(c.id)}
                    style={{
                      flex: 1, padding: '10px 8px', borderRadius: '14px',
                      border: charm === c.id ? '2px solid var(--color-rose)' : '1.5px solid var(--color-border)',
                      background: charm === c.id ? 'var(--color-blush-light)' : '#FAFAFA',
                      fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ fontSize: '1.4rem' }}>{c.emoji}</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Wrist Size in cm */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-text-primary)' }}>
                  Wrist Size (in centimeters)
                </label>
                <a href="#size-guide" style={{ fontSize: '0.76rem', color: 'var(--color-rose-dark)', fontWeight: 600, textDecoration: 'underline' }}>
                  How to measure?
                </a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {SIZE_OPTIONS.map(sz => (
                  <button
                    key={sz.value} type="button"
                    onClick={() => setSizeCm(sz.value)}
                    style={{
                      padding: '10px 4px', borderRadius: '12px',
                      border: sizeCm === sz.value ? '2px solid var(--color-rose)' : '1.5px solid var(--color-border)',
                      background: sizeCm === sz.value ? 'var(--color-blush-light)' : '#FAFAFA',
                      cursor: 'pointer', textAlign: 'center',
                      boxShadow: sz.popular && sizeCm !== sz.value ? '0 0 0 2px rgba(230,138,165,0.2)' : 'none',
                      transition: 'all 0.2s',
                      position: 'relative',
                    }}
                  >
                    {sz.popular && (
                      <span style={{
                        position: 'absolute', top: '-9px', left: '50%', transform: 'translateX(-50%)',
                        fontSize: '0.6rem', fontWeight: 700, background: 'var(--color-rose)',
                        color: '#fff', padding: '1px 6px', borderRadius: '20px', whiteSpace: 'nowrap',
                      }}>
                        Popular
                      </span>
                    )}
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>{sz.label}</div>
                    <div style={{ fontSize: '0.62rem', color: 'var(--color-text-muted)', marginTop: '2px', lineHeight: 1.2 }}>{sz.hint}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '1rem', padding: '1rem' }}>
                <ShoppingBag size={19} />
                Add This Design to Bag — Rs. 299
              </button>
              {added && (
                <div style={{
                  textAlign: 'center', color: '#059669',
                  fontSize: '0.85rem', fontWeight: 700,
                  padding: '8px', borderRadius: '10px',
                  background: '#ECFDF5', border: '1px solid #A7F3D0',
                }}>
                  Added to your bag! Check the top right corner.
                </div>
              )}
              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Order confirmed directly via WhatsApp to your artisan.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
