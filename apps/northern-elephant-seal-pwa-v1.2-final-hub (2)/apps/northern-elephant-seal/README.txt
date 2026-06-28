Northern Elephant Seal — MBA Guide App
Version: 1.2 FINAL HUB VERSION
Last Updated: 2026-06-28
Status: Ready for Hub testing

Purpose
This app is a Monterey Bay Aquarium volunteer companion reference for northern elephant seal conversations.

Final Hub Flow
1. Snapshot / Quick Facts
2. Where to See It
3. Natural History
4. Annual Cycle and Rookery
5. Sleep Science
6. Buoyancy and Drift Dives
7. Diet
8. Conservation Comeback
9. Short Fun Kids Fact
10. Story
11. Beach-Safe Visitor Message
12. Visitor Q&A
13. Guide Notes
14. Tags
15. Related Items
16. References and Image Notes
17. Version / Last Updated

Main Features
- Mobile-first PWA layout
- Top bar with ← MBA Hub, Clear Cache, and Troubleshooting
- Working troubleshooting panel with × Close button
- Escape-key close support on PC
- Search
- Expand All / Collapse All
- Dropdown guide sections
- Image-rich natural history and conservation sections
- Separate Diet section
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
  CHANGELOG.txt
  REGISTRY_UPDATE.txt
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
1. Place the full northern-elephant-seal folder inside apps/.
2. Open the app from the MBA Hub or directly from apps/northern-elephant-seal/index.html.
3. Use Search to find topics such as sleep, migration, diet, pup, shark, rookery, buoyancy, or conservation.
4. Open dropdowns for guide facts, images, Q&A, and talking points.
5. Use Clear Cache after updating files.
6. Use Troubleshooting if the app shows old content or images do not load.

Known Issues
- Related app links are placeholders until companion apps are created or connected.
- Local rescue hotline should be verified with current MBA-approved volunteer materials before being shared.
- Image source details should be improved if formal source tracking is required.

Backup Name
NorthernElephantSeal_Backup_20260628_084500

Testing Checklist
PC Chrome: open app, confirm layout, buttons, troubleshooting open/close, Escape close, dropdowns, search, images, Clear Cache, Return to Hub.
iPhone Safari: confirm no horizontal scrolling, tap targets, troubleshooting open/close, search, dropdowns, images, home screen launch, and offline after first full online load.

References
Images: User-provided app assets.
Content: User-provided guide app notes and standard northern elephant seal natural history topics. Verify public-facing content and image permissions before public release.
