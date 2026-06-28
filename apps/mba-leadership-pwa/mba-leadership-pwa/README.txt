# MBA Leadership · New Arrivals PWA

Folder: `apps/mba-leadership/`

This is a mobile-first dropdown PWA for Monterey Bay Aquarium leadership/new-arrival reference. It keeps the aquarium identification images in `images/` and renders cards from `data.js`, so future additions are easier.

## Files
- `index.html` — app shell
- `styles.css` — visual layout
- `app.js` — search, tags, dropdowns, clear cache, service worker registration
- `data.js` — editable content source for future people/updates
- `manifest.json` — PWA install metadata
- `sw.js` — offline cache
- `icon.svg` — app icon
- `images/` — extracted leadership photos from the uploaded source page

## Hub placement
Place this folder at:

`MBA-hub/apps/mba-leadership/`

The Return to Hub button points to `../../index.html`.

## Future updates
Add new entries in `data.js`. Add images to `images/`, then reference them as `images/filename.jpg`. When updating deployed content, increment the cache name in `sw.js` from `v1.0.0` to a new version such as `v1.0.1`.
