Northern Elephant Seal — MBA Guide App
Version: 1.1
Last Updated: 2026-06-26
Status: Testing

Purpose
This app is a Monterey Bay Aquarium volunteer companion reference for northern elephant seal conversations.

Main Features
- Mobile-first PWA layout
- Top bar with ← MBA Hub, Clear Cache, and Troubleshooting
- Working troubleshooting panel with × Close button
- Escape-key close support on PC
- Search
- Expand All / Collapse All
- Dropdown guide sections
- Image-rich natural history and conservation sections
- Visitor Q&A
- Guide notes
- Tags and related app suggestions
- References and image notes
- Offline-capable after first successful load

Required Folder Structure
apps/northern-elephant-seal/
  index.html
  styles.css
  app.js
  data.js
  manifest.json
  sw.js
  icon.svg
  README.txt
  images/
    size_compare.jpg
    size_sketch.jpg
    migration_map.jpg
    cons_basics.jpg
    rookery_scene.jpg
    calendar.jpg
    diet_diagram.jpg
    sleep_diagram.jpg
    buoyancy_chart.jpg
    cons_comeback.jpg
    cons_success.jpg

How to Use
1. Open the app from the MBA Hub or directly from its index.html.
2. Use Search to find topics such as sleep, migration, diet, pup, shark, rookery, or conservation.
3. Open dropdowns for guide facts, images, Q&A, and talking points.
4. Use Clear Cache after updating files.
5. Use Troubleshooting if the app shows old content or images do not load.

Known Issues
- Related app links are placeholders until companion apps are created or connected.
- Local rescue hotline should be verified with current MBA-approved volunteer materials before being shared.
- Image source details should be improved if formal source tracking is required.

Revision Summary
v1.1 — 2026-06-26
- Added complete top bar controls.
- Added Clear Cache button.
- Added Troubleshooting panel with working × Close button.
- Added Escape-key close support.
- Added search.
- Added Expand All / Collapse All.
- Added image-rich sections using approved filenames.
- Added Sleep Science section.
- Added Buoyancy and Drift Dives section.
- Added Annual Cycle and Rookery section.
- Added Beach-Safe Visitor Message section.
- Added References and Image Notes section.
- Updated service worker cache name to v1.1.
- Updated manifest description and scope.

Backup Name
NorthernElephantSeal_Backup_20260626_172500

Testing Checklist
PC Chrome: open app, confirm layout, buttons, troubleshooting open/close, Escape close, dropdowns, search, images, Clear Cache, Return to Hub.
iPhone Safari: confirm no horizontal scrolling, tap targets, troubleshooting open/close, search, dropdowns, images, home screen launch, and offline after first full online load.

References
Images: User-provided app assets.
Content: User-provided guide app notes and standard northern elephant seal natural history topics.
