import React from 'react';
import { Ruler, Check, HelpCircle } from 'lucide-react';

export default function SizeGuideSection({ onOpenModal }) {
  return (
    <section id="size-guide" style={{ padding: '5rem 0', backgroundColor: '#FFF7F9' }}>
      <div className="container">
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid var(--color-border)',
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem auto' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--color-rose-dark)',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '0.4rem',
              }}
            >
              <Ruler size={16} />
              Accurate Fit Guarantee
            </div>
            <h2 className="serif-heading" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '0.6rem' }}>
              Wrist Size Measuring in Centimeters (cm)
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
              We measure every bracelet in centimeters to make sure it slips comfortably over your hand and sits perfectly on your wrist.
            </p>
          </div>

          {/* 3 Step Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--color-card-soft)',
                borderRadius: '18px',
                padding: '1.5rem',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-rose)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--color-text-primary)' }}>
                Wrap a Paper Strip
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Take any thin strip of paper or ribbon and wrap it around your wrist where you normally wear bracelets.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-card-soft)',
                borderRadius: '18px',
                padding: '1.5rem',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-rose)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--color-text-primary)' }}>
                Mark With Pen
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Mark the exact overlap point where the paper meets. Keep it comfortably snug without pulling tightly.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-card-soft)',
                borderRadius: '18px',
                padding: '1.5rem',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-rose)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--color-text-primary)' }}>
                Read cm on a Ruler
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Lay it next to any standard school ruler. The reading in centimeters (cm) is your exact size (most girls are 16 cm).
              </p>
            </div>
          </div>

          {/* Quick interactive trigger */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '1.5rem',
            }}
          >
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              Unsure between sizes? All bracelets are stretchy and forgiving!
            </span>
            <button
              onClick={onOpenModal}
              className="btn-secondary"
              style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}
            >
              Open Complete cm Table & Guide
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
