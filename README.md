# MBA Hub 2

Version: 2.0  
Started: 2026-06-27  
Status: Draft / Testing

## Purpose
MBA Hub 2 is the second-generation Monterey Bay Aquarium volunteer companion hub. It is designed as a clean root navigation PWA for individual dropdown apps stored in the `apps/` folder.

## Installed Apps
- Information Center Handbook — `apps/information-center/index.html`

## Main Features
- Mobile-first responsive layout for iPhone and PC Chrome
- Hub categories based on the Core Categories v2 document
- App cards generated from `data.js`
- Search by app name, category, description, tag, version, and status
- Category filters
- Expand All / Collapse All category controls
- Top bar with MBA Hub 2, Clear Cache, and Troubleshooting
- Troubleshooting panel with visible × Close button, overlay click fallback, and Escape-key close support
- PWA manifest and service worker for offline support after first load
- README, changelog, app registry, and tag registry

## How to Add a Future App
1. Place the app folder inside `apps/app-folder-name/`.
2. Confirm the app Return to Hub button points to `../../index.html`.
3. Add a new app object to `data.js`.
4. Update `app-registry.json`.
5. Update `tag-registry.json` if new tags are added.
6. Update this README and CHANGELOG if needed.
7. Test in PC Chrome and iPhone Safari.

## Testing
Required testing before GitHub publishing:
- Open `index.html` on PC Chrome.
- Open Information Center app from Hub 2.
- Confirm Information Center Return to Hub goes back to Hub 2.
- Confirm search works.
- Confirm category filter works.
- Confirm Clear Cache reloads.
- Confirm Troubleshooting opens and closes using × Close.
- Confirm Troubleshooting closes with Escape on PC.
- Upload to GitHub Pages or hosting.
- Open on iPhone Safari.
- Add to Home Screen if desired.
- Test offline after first full online load.

## Known Issues
- Offline behavior must be confirmed after uploading to the final hosting location.
- Future app cards must be manually added to `data.js` until a larger registry automation is introduced.
