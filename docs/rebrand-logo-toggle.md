# Rebrand Button Logo Toggle — Problem Analysis & Options

## What the feature does

For Pay Later and Credit rebrand buttons, two logos exist in the DOM simultaneously:

- **PayPal logo** (`paypal-logo-paypal-rebrand`) — the full wordmark, shown when the button is wide enough
- **PP monogram** (`paypal-logo-pp-rebrand`) — the small monogram, shown when the button is too narrow for the wordmark

`toggleLogos()` in `script.jsx` measures the available space and hides/shows the appropriate logo. The same logic runs on resize.

---

## Why first-render flash is hard to eliminate

### The two-render architecture

The button renders **twice**:

1. **First render (SSR / iframe initial parse)** — the server or zoid renders the button HTML with inline SVGs (`PayPalRebrandLogoInlineSVG`). The inline `<script>` tag runs as the parser reaches it.
2. **Second render (client-side)** — after the iframe's JS bundle loads, it re-renders the button using external image URLs (`PayPalRebrandLogoExternalImage`). This replaces the DOM entirely.

The flash happens because after the second render, both logos exist in the DOM with no `hidden` class — the browser paints this state before `toggleLogos` can react to the new DOM.

### Why inline script timing doesn't solve it

The `<script>` tag is at the **end** of the button HTML. The browser's rendering pipeline is:

```
Parse HTML → Layout → Paint → (script runs) → JS mutations → Paint again
```

Even with `toggleLogos(true)` (synchronous, no rAF), the browser may have already committed the first paint by the time the script executes. This is especially true for the second render, where the DOM replacement and subsequent paint happen in the client JS bundle's own rendering cycle — the inline script IIFE has already finished running and is not re-executed.

### Why `requestAnimationFrame` made it worse

The original fix used `requestAnimationFrame` to batch the show/hide into a single paint. This is correct for **resize** events (avoids mid-drag thrash), but it explicitly defers the change to _after_ the current paint — making first-render flash guaranteed rather than intermittent.

### Why the CSS default-hide + `dom-ready` approach is intermittent

The current approach:

1. CSS hides `.paypal-logo-paypal-rebrand` by default (before `dom-ready` on body)
2. `applyUpdates()` sets `dom-ready` and applies the `hidden` class atomically

This works for the **first render** when the inline script runs fast enough. It fails intermittently on the **second render** because:

- `dom-ready` is already set on `<body>` from the first render
- The CSS default-hide rule no longer applies (`dom-ready` unlocks it)
- The new DOM from the second render has both logos fully visible
- The `MutationObserver` debounces at 0ms (a `setTimeout`), which always yields to the browser paint before `toggleLogos` runs

### Why `MutationObserver` with `debounce(0)` doesn't fully fix it

`MutationObserver` callbacks are microtasks — they fire synchronously after DOM mutations, before the browser can paint. However, the `debounce()` wrapper uses `setTimeout`, which is a **macrotask**. This breaks the microtask guarantee:

```
DOM replaced → MutationObserver fires → setTimeout scheduled
→ Browser paints (both logos visible) ← flash happens here
→ setTimeout callback runs → toggleLogos hides wrong logo
```

Removing the debounce would restore the microtask timing, but the callback could fire hundreds of times during a re-render since `childList + subtree` catches every individual node insertion.

---

## Options

### Option 1 — Remove debounce from MutationObserver (targeted fix, low risk)

Replace the debounced MutationObserver callback with a direct call, but only act when a rebrand logo element is detected in the mutation:

```js
const observer = new MutationObserver((mutations) => {
	const hasLogoChange = mutations.some((m) =>
		Array.from(m.addedNodes).some(
			(n) =>
				n.nodeType === 1 &&
				(n.classList?.contains("paypal-logo-paypal-rebrand") ||
					n.querySelector?.(".paypal-logo-paypal-rebrand"))
		)
	);
	if (hasLogoChange) {
		toggleOptionals();
		toggleLogos(true);
	}
});
```

This keeps microtask timing (fires before paint) while avoiding the per-node noise. **This is the most targeted fix for the second-render flash.**

The first-render flash is also handled because the CSS default-hide (`dom-ready` gate) protects the initial paint, and `toggleLogos(true)` runs synchronously in the inline script before the browser has a chance to paint when `dom-ready` is not yet set.

**Limitation:** Intermittent on very slow devices where the browser paints between individual node insertions before MutationObserver fires. Rare in practice.

---

### Option 2 — Server-side logo selection (eliminates the problem entirely)

Pass the button width (or a size tier) from the parent page into the iframe as a prop, and render **only one logo** server-side — no JS toggle needed.

The parent page knows the button's container width before rendering the iframe. This can be passed as a zoid prop (e.g. `buttonWidth`) and used in the `Logo` component to conditionally render only `PayPalRebrandLogo` or only `PPRebrandLogo`.

```jsx
Logo: ({ buttonWidth, ... }) => {
  const useLargelogo = buttonWidth >= LARGE_LOGO_THRESHOLD;
  return (
    <Style css={css} nonce={nonce}>
      {useLargeLogo ? (
        <PayPalRebrandLogo ... />
      ) : (
        __WEB__ ? <PPRebrandLogoExternalImage ... /> : <PPRebrandLogoInlineSVG ... />
      )}
      <Text>...</Text>
    </Style>
  );
}
```

The resize case still needs `toggleLogos` for when the button container changes after initial render, but there would be no first or second render flash because the correct logo is rendered from the start.

**Trade-off:** Requires passing additional props through zoid and changes the data flow. Resize handling still needs the JS approach. The threshold calculation needs to account for font loading and text width, which varies by locale.

---

### Option 3 — CSS container queries (no JS needed for the toggle)

If the browser support requirements allow it (all modern browsers as of 2023), CSS container queries can replace `toggleLogos` entirely:

```css
.paypal-button-label-container {
	container-type: inline-size;
}

/* Show PP monogram by default (small) */
.paypal-logo-paypal-rebrand {
	display: none;
}
.paypal-logo-pp-rebrand {
	display: inline-block;
}

/* Switch to full wordmark when label container is wide enough */
@container (min-width: 120px) {
	.paypal-logo-paypal-rebrand {
		display: inline-block;
	}
	.paypal-logo-pp-rebrand {
		display: none;
	}
}
```

The threshold value (`120px` above is illustrative) would need to match the actual measured breakpoint for each locale's text width.

**Advantages:**

- Zero JS involvement — no timing issues, no flash on any render
- Works correctly on first paint, second render, and resize
- No `toggleLogos` function needed at all

**Trade-offs:**

- The breakpoint is a fixed pixel value in CSS, not dynamically calculated from actual text width. Locale differences (longer text in some languages) mean a single threshold may not work for all markets.
- Requires determining per-locale thresholds either statically or by generating locale-specific CSS server-side.
- Container query browser support must be confirmed against the project's target browsers.

---

### Option 4 — Render both logos, use CSS `overflow: hidden` on the label container

Rather than toggling visibility, constrain the label container width and let CSS clip the wordmark naturally when there isn't room. Both logos are always in the DOM and visible; the wordmark simply gets clipped out of view when the container is too narrow.

This avoids the show/hide problem entirely but requires the logo layout to work correctly under `overflow: hidden` — the PP monogram would need to be positioned after the wordmark so it's always visible, and the wordmark would be clipped on the right when the container is narrow.

**Trade-off:** Changes the visual layout model significantly. The PP monogram and wordmark would need to overlap or be arranged so the monogram is always within the visible area. Likely requires significant layout rework.

---

## Summary table

| Option                               | Fixes first render | Fixes second render | Fixes resize                        | Complexity |
| ------------------------------------ | ------------------ | ------------------- | ----------------------------------- | ---------- |
| Current (debounced MutationObserver) | Intermittent       | No                  | Yes                                 | Low        |
| Option 1 — Targeted MutationObserver | Yes                | Yes                 | Yes                                 | Low        |
| Option 2 — Server-side prop          | Yes                | Yes                 | Partial (still needs JS for resize) | Medium     |
| Option 3 — CSS container queries     | Yes                | Yes                 | Yes                                 | Medium     |
| Option 4 — CSS overflow clipping     | Yes                | Yes                 | Yes                                 | High       |

**Recommended path:** Option 1 as an immediate fix (low risk, targeted change). Option 3 (container queries) as the long-term solution if browser support is acceptable, since it removes the dependency on JS measurement entirely.
