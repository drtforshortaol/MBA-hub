# Information Center Handbook — Version 2.1

Drop-in PWA replacement for the MBA Hub Information Center app.

Folder target:

```text
apps/information-center/
```

## Purpose

Mobile-first Monterey Bay Aquarium Information Center volunteer handbook with quick reference, emergency information, procedures, search, and dropdown sections.

## Main features

- 18 handbook sections
- Top control bar with:
  - ← MBA Hub
  - Clear Cache
  - Troubleshooting
- Working Troubleshooting panel with:
  - visible × Close button
  - click-outside close fallback
  - Escape-key close support on PC
- Search with matching-section expansion and highlighting
- Quick navigation buttons
- Expand All / Collapse All
- PWA manifest
- Service worker/offline caching
- Installable on iPhone, Android, and desktop

## How to use

1. Open the app from the MBA Hub.
2. Use the search box for terms such as wheelchair, radio, lost child, or directions.
3. Tap a section title to open or close it.
4. Use the quick action buttons for high-priority handbook topics.
5. Use Clear Cache after updates if an old version appears.
6. Use Troubleshooting for refresh, iPhone cache, and PC hard-refresh instructions.

## Version

Version: 2.1  
Updated: June 2026

## Known issues

None known in this package. Test after upload on PC Chrome and iPhone Safari.

## Testing checklist

- App opens from `apps/information-center/index.html`
- ← MBA Hub returns to `../../index.html`
- Clear Cache reloads the newest app files
- Troubleshooting opens
- × Close closes Troubleshooting
- Escape closes Troubleshooting on PC
- Search works
- Clear Search works
- Quick navigation buttons work
- Dropdowns open and close
- Expand All / Collapse All works
- Offline mode works after first online load
