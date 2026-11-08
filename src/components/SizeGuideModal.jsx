import React, { useState } from 'react';
import { Ruler, CheckCircle2 } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  const [selectedWristCm, setSelectedWristCm] = useState(16);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(52, 24, 30, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '560px',
          width: '100%',
          padding: '2rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-blush)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-rose-dark)',
              }}
            >
              <Ruler size={18} />
            </div>
            <h3 id="size-modal-title" className="serif-heading" style={{ fontSize: '1.4rem' }}>
              Wrist Measurement Guide (in cm)
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close size guide modal"
            style={{
              fontSize: '1.4rem',
              color: 'var(--color-text-muted)',
              padding: '4px 8px',
              borderRadius: '8px',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          All Little Loops bracelets are strung on <strong>reinforced Japanese stretch elastic cord</strong>, making them comfortable and easy to slide over the hand.
        </p>

        {/* 2 Methods */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--color-card-soft)',
              borderRadius: '16px',
              border: '1px solid var(--color-border)',
            }}
          >
            <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem', color: 'var(--color-text-primary)' }}>
              Method 1: Strip of Paper & Ruler (Most Accurate at Home)
            </h4>
            <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li>Cut a narrow strip of paper or grab a piece of string.</li>
              <li>Wrap it snugly around your wrist right below your wrist bone.</li>
              <li>Mark the exact spot where the paper overlaps with a pen.</li>
              <li>Lay the paper flat against any ruler and read the length in <strong>centimeters (cm)</strong>.</li>
            </ol>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--color-card-soft)',
              borderRadius: '16px',
              border: '1px solid var(--color-border)',
            }}
          >
            <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem', color: 'var(--color-text-primary)' }}>
              Method 2: Flexible Measuring Tape
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              Wrap the measuring tape comfortably around the wrist. Note the cm reading without pulling tight.
            </p>
          </div>
        </div>

        {/* Cm Conversion Chart */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>
            Find Your Recommended Bracelet Size
          </h4>
          <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-blush)', color: 'var(--color-rose-dark)' }}>
                  <th style={{ padding: '8px 12px' }}>Your Wrist (cm)</th>
                  <th style={{ padding: '8px 12px' }}>Recommended Size</th>
                  <th style={{ padding: '8px 12px' }}>Fit Style</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '8px 12px' }}>13.0 cm – 14.5 cm</td>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>14 cm</td>
                  <td style={{ padding: '8px 12px' }}>Slender / Teenage</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: '#FFF5F8' }}>
                  <td style={{ padding: '8px 12px' }}>15.0 cm – 16.5 cm</td>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>16 cm (Standard)</td>
                  <td style={{ padding: '8px 12px' }}>Best standard fit for 85% of girls</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '8px 12px' }}>17.0 cm – 18.5 cm</td>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>18 cm</td>
                  <td style={{ padding: '8px 12px' }}>Relaxed comfort fit</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 12px' }}>19.0 cm+</td>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>20 cm</td>
                  <td style={{ padding: '8px 12px' }}>Loose / Custom Fit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Got My Size, Let's Order!
        </button>
      </div>
    </div>
  );
}
