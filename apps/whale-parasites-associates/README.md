# Whale Parasites & Associates

## Purpose
MBA volunteer reference app for whale parasites, whale-associated organisms, barnacles, whale lice, remoras, cookiecutter shark scars, and field identification clues.

## Intended Users
Monterey Bay Aquarium volunteers and guides using the MBA Hub on PC Chrome, iPhone Safari, or installed PWA mode.

## Main Features
- Top control bar with ← MBA Hub, Clear Cache, and Troubleshooting.
- Troubleshooting panel with visible × Close button, JavaScript close handler, fallback panel click handling, and Escape-key support on PC.
- Jump menu for quick navigation to an entry.
- Search box for hosts, scars, scientific names, and field cues.
- Filter tabs for broad host, whale-specific, host-specific, and mutualist entries.
- Dropdown cards for mobile-friendly reference use.
- References section.
- PWA manifest and service worker for offline support after first load.

## How to Use
1. Open the app from the MBA Hub.
2. Use the jump menu to go directly to an organism.
3. Use Search to find words such as barnacle, scar, blue whale, gray whale, lice, remora, or cookiecutter.
4. Use filter tabs to narrow the list.
5. Tap any card to expand or collapse it.
6. Use Clear Cache after updating the app.
7. Use Troubleshooting if the app shows old content, looks broken, or needs manual cache instructions.

## Version
Version: v1.5
Last updated: 2026-06-26

## Known Issues
- This app expects `../../index.html` to be the MBA Hub path.
- Related Hub topic rendering only appears when the Hub support files `../../apps.js` and `../../hub-links.js` are present.
- The bundled icon is SVG only. Some older PWA environments prefer PNG icons, but modern Chrome and Safari can use the included SVG for the app package.

## References
Content based on naturalist field notes and MBA volunteer reference notes, June 2025.
Images: no external photos are bundled with this version. App icon is a simple included SVG.

## Revision Summary
This revision repairs malformed HTML, restores a clean single document structure, adds the standard three-button top bar, adds a reliable troubleshooting close pattern, adds search, corrects manifest icon references, refreshes the service worker cache name, and adds documentation.
