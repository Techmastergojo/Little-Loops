import React from 'react';
import { HeartCrack, Sparkles, Gift, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function ProblemSolutionSection() {
  return (
    <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-bg)', position: 'relative' }}>
      <div className="container">
        {/* Contrast / Problem Box */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
          }}
        >
          {/* Problem Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '2.5rem 2rem',
              border: '1px solid #F1D4DB',
              boxShadow: '0 8px 24px rgba(60, 20, 30, 0.04)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#DC2626',
                marginBottom: '1.25rem',
              }}
            >
              <HeartCrack size={22} />
            </div>

            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#DC2626',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '0.4rem',
              }}
            >
              The Real Dilemma
            </span>

            <h3 className="serif-heading" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#3A141D' }}>
              No Thoughtful Gift Ideas, No Real Connection
            </h3>

            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: 1.7 }}>
              Finding a memorable, heartwarming gift for your Mom, Sister, or Bestie in Pakistan is frustrating. Everything in the local bazaar is either:
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
              {[
                'Mass-produced factory jewelry with zero personal feeling',
                'Expensive designer pieces that break student and pocket money budgets',
                'Generic gifts that are forgotten within a week',
              ].map((text, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.86rem', color: '#68454E' }}>
                  <span style={{ color: '#EF4444', fontWeight: 700 }}>✕</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Card: Pakistan's 1st Custom Beaded Bracelet Brand */}
          <div
            style={{
              backgroundColor: '#FFF4F7',
              borderRadius: '24px',
              padding: '2.5rem 2rem',
              border: '2px solid var(--color-rose)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                right: '24px',
                backgroundColor: 'var(--color-rose-dark)',
                color: '#FFFFFF',
                padding: '4px 14px',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.03em',
              }}
            >
              Pakistan’s 1st
            </div>

            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-blush)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-rose-dark)',
                marginBottom: '1.25rem',
              }}
            >
              <Sparkles size={22} />
            </div>

            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--color-rose-dark)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '0.4rem',
              }}
            >
              The Little Loops Solution
            </span>

            <h3 className="serif-heading" style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
              Wearable Memories: Hand-Strung Custom Bracelets
            </h3>

            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: 1.7 }}>
              Little Loops was created for girls who value personal gestures. Every bracelet is lovingly assembled with letter beads, faceted crystals, and sturdy stretch cords that last.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
              {[
                'Pakistan’s 1st dedicated custom letter bracelet atelier',
                'Unbeatable value: 2 custom handmade bracelets for just Rs. 299',
                'Curated themes for Mother’s Day, Sisters, Best Friends, and Teachers',
              ].map((text, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.86rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                  <span style={{ color: '#059669', fontWeight: 700 }}>✓</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
