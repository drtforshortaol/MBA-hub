# Monterey Bay Aquarium (MBA) Hub — Version 1 Maintenance Reference

**Hub display version:** 2.2.19 (as recorded in `index.html` and `hub-registry.js`)  
**Version 1 project status:** Finalization in progress; **not frozen or released yet**  
**Review date:** 2026-10-10

## Purpose and layout
This is the working, mobile-first MBA volunteer companion Progressive Web App (PWA). In this project's roadmap, **Version 1** means the existing deployed Hub to be stabilized and preserved; the display label **Hub 2.2.19** is the current software build number, not the separate future Version 2 rewrite.

- `index.html`, `styles.css`, `app.js`: root Hub presentation and behavior.
- `hub-registry.js`: primary category and app registry; inspect `hub-additions.js` for supplementary entries.
- `hub-tags.js`, `hub-links1.js`: tags and intentional cross-app relationships.
- `apps/`: independently maintained app folders. Do not confuse their similarly named files with Hub root files.
- `manifest.json`, `sw.js`: root PWA manifest and service worker.
- `offline-assets.json`, `hub-offline.js`: shared offline file inventory and the Prepare Offline flow.
- `install/`: user-facing recovery/reinstallation path.

Do not assume historic `data.js` instructions apply to the root Hub. Inspect the current master registry before adding or changing an app.

## Confirmed review findings (2026-10-10)
- Main Hub root files and registries were inspected.
- Twenty-one app entry-point paths referenced in the main registry and eight additional entry points in the offline list were verified as existing in GitHub.
- The offline inventory contains **337** entries with no duplicate path strings. **Not all 337 paths have been individually validated**.
- The Northern Elephant Seal folder contains spaces/parentheses; URL encoding in the registry is expected and its index file exists.
- On 2026-10-10 the root `sw.js` image-path detection regular expression was corrected in commit `c63b3f9e5ad3ae9d7657def9f255b860335ecbd2`.
- After that change, the user reported **successful iPhone offline verification of the Hub, one animal app, and its photographs**. This is targeted user testing, not certification of every offline app or every device.
- The user reported all animals tested functioned; **button appearance and presentation consistency remain to be reviewed** from screenshots.

## Offline preparation and verification
1. While connected, open the live Hub and select **Prepare Offline**; confirm the status reports completion and no failed files.
2. With Airplane Mode enabled and Wi-Fi disabled, open the installed Hub and a representative app, including its images.
3. For future changes, retest only affected apps plus root Hub navigation, unless a shared cache or navigation change warrants wider testing.
4. An offline preparation success message reports staged inventory files, not comprehensive proof of every runtime dependency. Capture any missing file or error by path before correcting it.
5. Preserve the separately available Hub Recovery / Reinstall entry point.

## Safe update workflow
1. Establish a recoverable branch or commit before functional edits.
2. Modify the smallest relevant file(s); preserve working app data and navigation.
3. Update registry, addition file, tag relationships, and offline assets **only when actually impacted**.
4. Test online plus targeted Safari / Home Screen offline paths.
5. Record change, commit SHA, test result and outstanding issues.
6. Release-tag and freeze **only after all remaining Version 1 acceptance checks pass**.

## Recovery reference
- Repository: https://github.com/drtforshortaol/MBA-hub
- Pre-finalization backup branch: `backup/pre-v1-finalization-2026-10-10`
- Backup commit: `da107c1869d66e7488d16b9d5845dfecacb0d227`
- Backup is **before** the image regex correction. Do not treat it as the final release.
- Final stable tag, release and separate Version 2 development location: **not yet created**.

## Outstanding closure checks
- [ ] Review screenshots and agree on a consistent button appearance and placement.
- [ ] Apply minimal presentation-only corrections to affected apps.
- [ ] Recheck affected apps online and offline.
- [ ] Complete remaining offline inventory / dependency validation, or explicitly document any accepted limitations.
- [ ] Reconcile outdated version labels where relevant without changing functionality.
- [ ] Create final immutable release/tag and restore instructions.
- [ ] Freeze Version 1 and begin Version 2 separately.

## Maintenance discipline
Prefer small reversible changes, explicit version history, a stable navigation interface, and a registry as the single primary reference for app discovery. Never report pending checks as passed or announce a freeze before the final release exists.
