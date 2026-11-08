import React from 'react';

export default function EditorialStorySection() {
  return (
    <section className="editorial-story-section">
      <div className="container">
        {/* Newspaper / Editorial Two-Column Journal Layout */}
        <div className="story-frame">
          <div className="story-meta">
            <span>THE LITTLE LOOPS CHRONICLE</span>
            <span>EDITION 01 • KARACHI & LAHORE</span>
            <span>HANDMADE MEMORIES</span>
          </div>

          <div className="story-grid">
            {/* Left Column: The Problem */}
            <div className="story-col problem-col">
              <span className="chapter-marker">01 / THE COMMON REGRET</span>
              <h3 className="story-heading">
                Why are gifts for the women we love so forgettable?
              </h3>
              <p className="story-body">
                Walk through any gift store or bazaar in Pakistan and you see the exact same thing: mass-produced factory accessories, identical rhinestone keychains, or overpriced perfumes that smell nice once and sit on a vanity forever.
              </p>
              <p className="story-body">
                When Mother's Day arrives, or when your sister gets into university, or when your childhood bestie has a birthday, finding something that actually speaks to <em>your</em> story feels impossible. You want to give something that says: <em>"I remember this phrase we always share."</em>
              </p>
              <div className="story-quote">
                "Jewelry should carry your private jokes, your nicknames, and the quiet promises between sisters."
              </div>
            </div>

            {/* Right Column: The Solution */}
            <div className="story-col solution-col">
              <span className="chapter-marker">02 / PAKISTAN'S 1ST CUSTOM ATELIER</span>
              <h3 className="story-heading">
                Wearable letters, faceted glass crystals & genuine intention.
              </h3>
              <p className="story-body">
                Little Loops was started at a living-room desk with trays of imported Czech crystal beads, smooth acrylic alphabet blocks, and double-reinforced elastic cord. We wanted girls in Pakistan to wear their sisterhood on their wrists.
              </p>
              <p className="story-body">
                Whether it is <strong>AMMI JAAN</strong> for Mother's Day, <strong>LOVING SISTER</strong> for a younger sibling who looks up to you, or <strong>BEST TEACHER</strong> for the mentor who changed your life, every single loop is threaded specifically for the name you type.
              </p>

              <div className="editorial-stat-card">
                <div className="stat-highlight">
                  <span className="stat-currency">Rs.</span>
                  <span className="stat-num">299</span>
                  <span className="stat-for">for 2 Bracelets</span>
                </div>
                <p className="stat-explainer">
                  We kept the price at Rs. 299 for a pair (slashed down from Rs. 400 for our opening launch) so pocket-money budgets and student savings never get in the way of a meaningful gesture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
