# MBA Version 2 — Improvement Log
Version 1.0 | 2026-10-11

Purpose: capture verified Version 1 refinements as design and implementation requirements for MBA Hub Version 2. This file is a planning record, not a change to the frozen/working Version 1 interface. Update this log as improvements are approved.

## California Sheephead — lessons learned (2026-10-11)

1. **One species, linked experiences.** The animal species guide belongs under Hub → Animals and must be directly accessible with an **Open Species Guide** button in Naturalist Field Notes → Species Highlights. The link should remain visible while the species-highlight row is collapsed, not depend on opening the dropdown. Check links in the rendered interface after registration; adding a URL to source data alone does not guarantee a visible button.
2. **Preserve original field material.** A dedicated species app should incorporate pertinent Naturalist highlight material and link back to the source Field Note. Avoid duplicating entire content unnecessarily. Preserve source dates, caveats, and attribution.
3. **Contextual image placement.** Images should appear in the content section they explain. In California Sheephead, the female-to-male transition photo belongs within **Sex Change and Reproduction**, not in the generic Naturalist highlight / taxonomy section.
4. **Never crop natural-history photos unintentionally.** Use natural aspect ratio (`width:auto; height:auto; max-width:100%; object-fit:contain`) with sensible size limits and captions. Do not style field-reference photos as oversized banner crops.
5. **Offline-first images are required.** Any animal-guide photo must reside locally in the GitHub app repository and be included in offline asset handling. External hotlinked images are not acceptable as the sole image copy. After uploads, verify the filename, switch the app to the local relative path, refresh the offline manifest/caches safely, and verify offline viewing. Preserve shared caches when updating; never casually clear the user's media cache.
6. **Credits and image permissions.** Credit the source and provide the original source link. Attribution does not itself confer photo-reuse permission; record permission/licensing status for future distribution, especially if the app becomes commercial.
7. **Scientific disagreements need careful labeling.** If the Aquarium uses `Semicossyphus pulcher` but a Naturalist note reports `Bodianus pulcher`, explicitly attribute both and distinguish documented facts from speculative explanations rather than silently choosing one.
8. **Iterative approval is a design requirement.** Apply one focused adjustment, commit it, provide the live link, and ask for visual review when appropriate. Preserve layouts and behavior the user has approved.

## Cross-app Version 2 implementation implications
- Species-guide records should have structured links back to Field Notes, optional directly accessible guide CTA, educational topics, images with captions and placement, photo rights/credit fields, and offline asset references.
- Maintain a single source of truth when feasible while presenting it appropriately in both Naturalist Species Highlights and Animals; avoid losing original authored context.
- Establish a publishing checklist: app registered; CTA verified in collapsed and expanded states; images uncropped and relevant; local assets cached and offline checked; credits/source links; taxonomy notes accurate; version/changelog updated; no regressions in Version 1.
- Reuse approved global navigation strictly; allow flexible page aesthetics within the documented visual system.

## Status
Recorded from live Version 1 California Sheephead adjustments. This log is a planning input for Version 2; it does not claim all Version 2 architecture decisions have been finalized.
