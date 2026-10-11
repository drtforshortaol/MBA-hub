# MBA Version 2 — Development Handoff
**Version:** 1.0 · 2026-10-11  
**Status:** Version 1 user review closed; Version 2 design/development may begin independently.

## Summary
The current deployed MBA Hub is the **Version 1 baseline**, despite its displayed build number **2.2.20**. Do not rename, overwrite, retire, redirect or redesign that live Hub as part of Version 2 work. The user has confirmed a successful iPhone offline test. GitHub source auditing confirmed all 23 registered local app entry points and all 345 offline-inventory files are present with no duplicate inventory entries. This is a targeted verification, not a comprehensive device/link/security audit.

## Source and recovery anchors
| Source | Current Version 1 baseline commit |
|---|---|
| [MBA Hub](https://github.com/drtforshortaol/MBA-hub) | `0903457bcccdb84b99c156ad48979df2bddf5dc9` |
| [Aquarium Library Explorer](https://github.com/drtforshortaol/aquarium-shift-library-) | `9438060bd836c46245e4af45c280e4bb37b0ab94` |
| [Evolution Timeline](https://github.com/drtforshortaol/evolution-timeline) | `c6d782d3a8a03e407861a0fbc3aab76e5fbf8d0c` |

Recovery branches `archive/version-1-approved-2026-10-11` and `version-1-final-2026-10-11` have been created from the baseline commits. **Branches can be moved or deleted and are not immutable tags or protected GitHub releases by default.** Do not modify either recovery branch. Final maintenance documentation may have newer commits on `main`; they are not a change to the approved app/UI baseline.

## Version 2 separation contract
1. Develop Version 2 in a **new repository** with independent GitHub Pages deployment, manifest, service-worker scope, asset cache names and app data namespaces. Do not use the live `/MBA-hub/` scope or its cache names.
2. Version 1 remains the user-facing production installation until Version 2 is explicitly accepted for rollout.
3. Copy only approved content/assets/configurations. Version 2 is not automatically entitled to overwrite, remotely purge or alter Version 1's offline data.
4. Retain deep links and app links as explicit migration mappings; independently hosted Library and Evolution must continue working.
5. Preserve return navigation and local/offline media. Avoid unsafe global cache-clearing actions.
6. Keep the Version 2 design simple at the surface, even if the underlying code becomes sophisticated.

## Architecture principles
- **Avoid spaghetti code:** modular components with documented responsibilities, dependencies and interface contracts. No circular dependencies, hidden globals or direct cross-module data manipulation.
- **Strict global behavior; flexible local appearance:** shared navigation, offline contracts, registry schema, and routing are centrally governed. Individual app visuals may differ where useful and intentionally approved.
- **One source of truth:** central registries for apps/categories, links, shared asset inventory, variables/data contracts; app-specific content lives with its own module.
- **Traceability:** maintain a concise versioned change log and a less-prominent in-Hub link to documentation. Explain changes briefly in chat; put implementation detail in records.
- **User communication:** state what will change and what will be preserved, especially where user approval or testing is required. Never claim unseen visual tests have passed.
- **Incremental migration:** begin with one small app and working root Hub; verify navigation, offline and upgrade logic before adding complexity.

## Approved interface patterns
- Minimal top navigation — the **← MBA Hub** action stays prominent.
- Collapsed-by-default details; short essential introductions or emergency actions may stay visible.
- Animals and Naturalist Species Highlights: direct A–Z filtering, alphabetically sorted, tappable app actions accessible without extra expansion.
- Library: compact one-line category selector, A–Z and search, individual book detail accordions.
- Quick-reference and six principles: no redundant search/tag/tools panels.
- Wildlife Rescue: urgent one-tap calls visible before educational details.
- Meaningful original photo dimensions; locally stored/offline media; contextual photo positioning.
- Preserve source Field Notes attribution, dates, scientific caveats, and appropriate credit/rights.

## Version 2 initial implementation sequence
1. Create a **separate private/working Version 2 repo and Pages test URL**; no redirects from Version 1.
2. Add minimal Hub shell, category/app registry, navigation and return-to-Hub contract.
3. Add a controlled sample app with a collapsed information section and one linked photo.
4. Test fresh online, offline, upgrade/cache freshness, return links, and iPhone install scope.
5. Add release notes and a discreet in-Hub access link to changes/version history.
6. Expand modularly, app by app; users retain Version 1 as fallback until rollout approval.

## Reference documents
- [MBA Version 1 Finalization Reference](MBA_VERSION_1_FINALIZATION_REFERENCE.md)
- [MBA Version 2 Improvement Log](MBA_VERSION_2_IMPROVEMENT_LOG.md)
- [Version 1 maintenance README](README.md)
- [Historical / finalization changelog](CHANGELOG.txt)

## End of summary
