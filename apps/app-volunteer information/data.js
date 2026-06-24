:root {
  --mba-blue: #005f73;
  --mba-blue-dark: #003f4f;
  --mba-teal: #0a9396;
  --mba-sand: #f4ead7;
  --mba-cream: #fffaf0;
  --mba-gold: #ee9b00;
  --mba-coral: #ca6702;
  --text: #18323a;
  --muted: #5c737a;
  --card: #ffffff;
  --border: #d7e2e5;
  --shadow: 0 12px 30px rgba(0, 63, 79, 0.14);
  --radius: 18px;
}

* {
  box-sizing: border-box;
}

html {
  min-height: 100%;
  background: var(--mba-cream);
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--text);
  background:
    radial-gradient(circle at top left, rgba(10, 147, 150, 0.18), transparent 36rem),
    linear-gradient(180deg, #eef9f8 0%, var(--mba-cream) 42%, #ffffff 100%);
  line-height: 1.5;
}

button,
input,
a {
  font: inherit;
}

.app-header {
  padding: 1rem;
  max-width: 1050px;
  margin: 0 auto;
}

.top-buttons {
  display: flex;
  gap: 0.65rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.hub-button,
.cache-button,
.controls button {
  border: 0;
  border-radius: 999px;
  padding: 0.7rem 0.95rem;
  font-weight: 750;
  cursor: pointer;
  text-decoration: none;
  min-height: 44px;
}

.hub-button {
  color: #ffffff;
  background: var(--mba-blue);
  box-shadow: 0 8px 18px rgba(0, 95, 115, 0.22);
}

.cache-button {
  color: var(--mba-blue-dark);
  background: #ffffff;
  border: 1px solid var(--border);
}

.update-message {
  margin: 0 0 0.85rem;
  padding: 0.65rem 0.85rem;
  color: var(--mba-blue-dark);
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.9rem;
}

.hero {
  background:
    linear-gradient(135deg, rgba(0, 95, 115, 0.95), rgba(10, 147, 150, 0.9)),
    url("images/icon.svg");
  background-size: cover, 180px;
  background-repeat: no-repeat;
  background-position: center, right -30px bottom -40px;
  color: white;
  border-radius: 28px;
  padding: 1.35rem;
  box-shadow: var(--shadow);
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: #d8ffff;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 8vw, 4rem);
  line-height: 0.98;
  letter-spacing: -0.05em;
}

.subtitle {
  margin: 0.8rem 0 0;
  max-width: 52rem;
  color: #ecffff;
  font-size: 1.02rem;
}

.search-wrap {
  margin-top: 1rem;
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.85rem;
  box-shadow: 0 8px 18px rgba(0, 63, 79, 0.08);
}

.search-wrap label {
  display: block;
  color: var(--mba-blue-dark);
  font-weight: 800;
  margin-bottom: 0.4rem;
}

.search-wrap input {
  width: 100%;
  border: 2px solid #c9dcdf;
  border-radius: 14px;
  padding: 0.85rem;
  color: var(--text);
  background: #fbffff;
  outline: none;
}

.search-wrap input:focus {
  border-color: var(--mba-teal);
  box-shadow: 0 0 0 4px rgba(10, 147, 150, 0.15);
}

main {
  width: min(1050px, calc(100% - 2rem));
  margin: 0 auto;
}

.quick-cards {
  display: grid;
  gap: 0.85rem;
  margin: 1rem 0;
}

.quick-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-left: 7px solid var(--mba-gold);
  border-radius: var(--radius);
  padding: 1rem;
  box-shadow: 0 8px 18px rgba(0, 63, 79, 0.08);
}

.quick-card h2 {
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
}

.quick-card p {
  margin: 0;
  color: var(--muted);
}

.controls {
  display: flex;
  gap: 0.65rem;
  margin: 1rem 0;
}

.controls button {
  flex: 1;
  color: white;
  background: var(--mba-blue);
}

.sections-container {
  display: grid;
  gap: 0.85rem;
  margin-bottom: 2rem;
}

.info-section {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: clip;
  box-shadow: 0 8px 18px rgba(0, 63, 79, 0.08);
}

.section-toggle {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: center;
  text-align: left;
  border: 0;
  background: white;
  color: var(--text);
  padding: 1rem;
  cursor: pointer;
}

.section-title-wrap {
  min-width: 0;
}

.section-title {
  display: block;
  color: var(--mba-blue-dark);
  font-size: 1.08rem;
  font-weight: 850;
}

.section-summary {
  display: block;
  margin-top: 0.2rem;
  color: var(--muted);
  font-size: 0.92rem;
}

.chevron {
  width: 2rem;
  height: 2rem;
  display: inline-grid;
  place-items: center;
  border-radius: 50%;
  color: white;
  background: var(--mba-teal);
  transition: transform 0.18s ease;
}

.info-section.open .chevron {
  transform: rotate(180deg);
}

.section-content {
  display: none;
  border-top: 1px solid var(--border);
  padding: 1rem;
  background: linear-gradient(180deg, #ffffff, #fbffff);
}

.info-section.open .section-content {
  display: block;
}

.item-grid {
  display: grid;
  gap: 0.75rem;
}

.info-item {
  border: 1px solid #dfe9eb;
  border-radius: 16px;
  padding: 0.9rem;
  background: white;
}

.info-item h3 {
  margin: 0 0 0.35rem;
  color: var(--mba-blue-dark);
  font-size: 1rem;
}

.info-item p {
  margin: 0.35rem 0 0;
  color: var(--text);
}

.info-item ul {
  margin: 0.55rem 0 0;
  padding-left: 1.2rem;
}

.info-item li {
  margin: 0.25rem 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.7rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.28rem 0.55rem;
  color: var(--mba-blue-dark);
  background: #e5f6f5;
  font-size: 0.78rem;
  font-weight: 750;
}

.script-box {
  border-radius: 16px;
  padding: 0.85rem;
  margin-top: 0.65rem;
  background: #fff6dd;
  border: 1px solid #f2d58c;
}

.script-box strong {
  color: var(--mba-coral);
}

.no-results {
  margin: 1.5rem 0 2rem;
  padding: 1rem;
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-align: center;
}

.hidden {
  display: none;
}

.app-footer {
  width: min(1050px, calc(100% - 2rem));
  margin: 0 auto 2rem;
  padding: 1rem;
  color: var(--muted);
  text-align: center;
  font-size: 0.9rem;
}

mark {
  color: inherit;
  background: #ffec99;
  border-radius: 0.25rem;
  padding: 0 0.12rem;
}

@media (min-width: 720px) {
  .app-header {
    padding-top: 1.25rem;
  }

  .quick-cards {
    grid-template-columns: repeat(3, 1fr);
  }

  .item-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero {
    padding: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto !important;
    transition: none !important;
  }
}