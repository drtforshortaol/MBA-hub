# MBA Hub Version 1 — Finalization Reference
**Document:** v1.0 · 2026-10-11  
**Stage:** Step 1 of closeout — documentation assembled; final verification and protected release still pending.  
**Live Hub:** https://drtforshortaol.github.io/MBA-hub/  
**Source:** https://github.com/drtforshortaol/MBA-hub

## Summary
“Version 1” is the existing volunteer-facing family of apps, **not** the numeric Hub build shown on screen. The currently recorded root Hub display version is **2.2.20** (hub-registry.js); many child apps have independent version numbers. Version 2 refers to the future modular redesign, which should remain separate from daily-use Version 1.

The user has completed a hands-on visual/content review of the Hub and associated apps, approving the latest simplifications. This document records the reviewed design and maintenance approach; it **does not** claim an automated all-links audit, exhaustive offline audit, repository freeze or GitHub release.

## Purpose and operating philosophy
A mobile-first Monterey Bay Aquarium volunteer companion that makes information easy to find and use during a guide shift. Keep the experience visually clear, attractive, fast and predictable. A sophisticated architecture must not create an overwhelming user interface.

**Standards:** straightforward navigation; uncluttered controls; collapsed details by default unless an intentionally helpful short introduction; visible critical actions in urgent-use apps; natural-aspect-ratio photographs; local/offline media; source attribution; maintainable modular app boundaries; no unnecessary cache, troubleshoot, install or search panels in single-purpose apps.

## Hub organization — 11 categories
1. Aquarium Updates
2. Exhibits
3. Animals
4. Visitor Questions
5. Guide Talks
6. Concepts
7. Making the Aquarium Come Alive
8. Seafood Watch
9. Volunteer Tools
10. Visitor Services
11. Cannery Row

The Animals category has one alphabet filter row; selecting a letter shows matching entries and selecting it again resets the filter. Entries are alphabetical, initially collapsed, and provide an obvious direct **Open App** link.

## App catalog — 25 entries registered in the Hub
The master source of truth for currently registered apps is `hub-registry.js`. The following entries were inventoried from that file on 2026-10-11 (some registries may use other formatting and supplementary sources may add entries):

| App | Address/location |
|---|---|
| Whale Parasites & Associates | `apps/whale-parasites-associates/` |
| Sea Slugs & Nudibranchs | `apps/sea-slugs-nudibranchs/` |
| Hopkins’ Rose Nudibranch | `apps/hopkins-rose-nudibranch/` |
| Gray Whale Skeleton | `apps/gray-whale-skeleton/` |
| Gray Whale | `apps/gray-whale/` |
| Blue-spotted Ribbontail Ray | `apps/bluespotted-ribbontail-ray/` |
| California Sheephead | `apps/california-sheephead/` |
| Stargazer Fish | `apps/stargazer-species-guide/` |
| Whale-Associated Organisms | `apps/whale-associated-organisms/` |
| Wildlife Rescue — Important Contacts | `apps/wildlife-rescue/` |
| Information Center Handbook | `apps/information-center/` |
| Six Interpretation Principles | `apps/interpretation-principles/` |
| Using the Five Senses | `apps/five-senses-pwa/` |
| Marine Mammal Cart | `apps/mmc-narrations/` |
| Northern Elephant Seal | `apps/northern-elephant-seal-pwa-v1.2-final-hub%20(2)/` |
| MBA Leadership | `apps/mba-leadership/` |
| Open Sea Exhibit | `apps/open-sea/` |
| Applied Water Science | `apps/applied-water-science-life-support/` |
| Evolution Timeline — From Universe to Us | separate GitHub Pages repository `evolution-timeline` |
| Aquarium Library Explorer | separate GitHub Pages repository `aquarium-shift-library-` |
| California Flying Fish | `apps/california-flying-fish/` |
| Gooseneck Barnacle | `apps/gooseneck-barnacle/` |
| Green Falsejingle | `apps/green-falsejingle/` |
| Naturalist Field Notes | `apps/naturalist-field-notes/` |
| Wildfires & Ocean Health | `apps/wildfires-ocean-health/` |

### Independent app repositories
- **Library Explorer:** https://github.com/drtforshortaol/aquarium-shift-library- → https://drtforshortaol.github.io/aquarium-shift-library-/ . Approved: A–Z titles, one compact category dropdown, search, collapsed book details, borrowing/owner fields and wishlist.
- **Evolution Timeline:** https://github.com/drtforshortaol/evolution-timeline → https://drtforshortaol.github.io/evolution-timeline/ . Structured story, strict time map and independent Learning Tools; preserves its approved lineage comparison interface. Separate release/snapshot required.

## Recent approved user-interface decisions
- **Naturalist Field Notes:** Species Highlights directory with compact A–Z filtering. Each species initially collapsed and linked to its dedicated animal guide through a visible action. Preserve original dated Field Notes. Direct linking to individual dated Field Notes supported (e.g. `?note=2026-07-09-15`). After a stale-cache incident, online content should be refreshed without sacrificing offline fallback.
- **California Sheephead:** MBA-sourced factual guide; Naturalist taxonomy update carried into app, with scientific caveats. The transitional female photograph sits in **Sex Change and Reproduction** rather than a generic highlight section. Original photo aspect ratio preserved. Image assets must be stored in repository for offline availability; source/photo rights need explicit tracking.
- **Wildlife Rescue:** Distress-oriented design. Important phone numbers immediately available as one-tap calls, other sections initially closed. Guidance on keeping distance, what to report, and species-specific contacts. Direct link to July 9–15 Field Note.
- **Information Center Handbook:** quick-access reference; only Return to Hub in header (remove Clear Cache/Troubleshooting and obsolete notification), with emergency, phone and radio shortcuts and search retained.
- **Six Interpretation Principles:** remove redundant search, tags, related links, installation, troubleshooting and cache controls; show Floor Reminder and six collapsed principles.
- **Using the Five Senses:** only Return to Hub, educational introduction, image and topical dropdowns; remove search, notice, cache/troubleshooting controls and redundant Tools panel.
- **Aquarium Library Explorer:** retain search, A–Z filter and compact categories, with each book initially collapsed and details accessible on demand.

## Technical maintenance map
- `index.html`, `styles.css`, `app.js`: root Hub shell/presentation.
- `hub-registry.js`: authoritative category/registered-app declarations; `hub-additions.js`, `hub-links1.js`, `hub-tags.js`: supplementary links, data and relationships.
- `apps/<app>/`: individual self-contained apps, usually with their own HTML, JS/CSS, data, and sometimes a service worker.
- `manifest.json`, root `sw.js`, `hub-offline.js`, `offline-assets.json`: Hub PWA and offline packaging. Preserve **`mba-shared-assets-v1`** — do not wipe it as a routine update action.
- `CHANGELOG.txt` and this file: maintenance and closeout reference.

### Release hygiene
1. Preserve approved behavior; make focused, reversible commits with change messages.
2. Update script/style cache identifiers and service-worker versions when needed, without blanket deleting shared offline content.
3. Test an updated installed iPhone app and fresh-browser online load; also test offline after the new assets are prepared.
4. Confirm navigation and direct links, previously missing guide buttons, and complete uncropped images.
5. Record source and image credits; attribution is **not** equivalent to re-use authorization.
6. If a change appears to disappear, investigate stale service-worker/shared-cache versions before rewriting correct code.
7. Record an immutable Git commit/tag for final Version 1; use a separate repository/branch for Version 2 work.

## Open items — mandatory before formal Version 1 closeout
- **Step 2:** reconcile/update the root changelog; root `README.md` currently states Hub 2.2.19 and needs correction to 2.2.20 or the release version chosen for the final snapshot.
- **Step 3:** final bounded verification: registered links, root Hub/child app Return to Hub, offline media and app availability, two independent hosted apps, and a quick mobile smoke test. Report anything unverified instead of assuming it passed.
- **Step 4:** capture stable GitHub tags/releases for root Hub **and** separately maintained Library/Evolution repositories; note commit hashes and URLs.
- **Step 5:** hand off approved design standards and detailed improvements to Version 2 strategy/implementation, leaving Version 1 operational.

## Version 2 handoff
See [MBA_VERSION_2_IMPROVEMENT_LOG.md](MBA_VERSION_2_IMPROVEMENT_LOG.md). Core priorities: **avoid spaghetti code**, modular contracts, clear data/variable ownership, strict global functions with controlled local visual flexibility, minimal user-facing controls, reliable offline media and seamless cache upgrades. Version 2 must not disturb the Version 1 working copy.

## End of summary
