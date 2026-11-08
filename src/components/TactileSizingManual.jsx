import React from 'react';

export default function TactileSizingManual() {
  return (
    <section id="size-guide" className="sizing-section">
      <div className="container">
        <div className="sizing-card">
          <div className="sizing-lead-col">
            <span className="chapter-marker">PERFECT FIT GUARANTEE</span>
            <h2 className="sizing-heading">Measuring Your Wrist in Centimeters</h2>
            <p className="sizing-intro">
              No guesswork. Bracelets that fall off are annoying, and tight ones leave marks. Because we use durable high-stretch elastic, sizing in <strong>centimeters (cm)</strong> ensures a comfortable fit that glides smoothly over your hand.
            </p>

            <div className="popular-size-callout">
              <span className="callout-num">16 cm</span>
              <div className="callout-text">
                <strong>The Golden Standard</strong>
                <p>Fits 90% of Pakistani girls comfortably. If this is a surprise gift, choose 16 cm.</p>
              </div>
            </div>
          </div>

          <div className="sizing-steps-col">
            {/* Step 1 */}
            <div className="manual-step">
              <div className="step-badge">1</div>
              <div className="step-content">
                <h4 className="step-title">The Paper Ribbon Trick</h4>
                <p className="step-desc">
                  Cut a slim strip of paper or grab a sewing ribbon. Wrap it gently around the wrist bone where you want your bracelet to sit.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="manual-step">
              <div className="step-badge">2</div>
              <div className="step-content">
                <h4 className="step-title">Mark Where They Meet</h4>
                <p className="step-desc">
                  Use any ballpoint pen to put a tiny line right where the paper overlaps. Do not pull it tight like a rubber band.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="manual-step">
              <div className="step-badge">3</div>
              <div className="step-content">
                <h4 className="step-title">Lay Flat on Any Metric Ruler</h4>
                <p className="step-desc">
                  Read the measurement in <strong>centimeters (cm)</strong>. 
                  <br />
                  • 14 cm = petite / teenage
                  <br />
                  • 16 cm = standard & comfy
                  <br />
                  • 18 cm = relaxed drape
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
