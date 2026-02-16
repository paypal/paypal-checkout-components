# Complete Solution: Button Re-rendering After Cancel in App Switch Flows

## Problem Statement

When a customer cancels a payment in an app switch flow, the PayPal button disappears instead of remaining visible/re-rendering on the merchant's site.

## Critical Constraints

1. ❌ **NO page reloads allowed** - Must re-render button in place
2. ❌ **NO URL clearing allowed** - Hash parameters must remain (merchant may need them)
3. ✅ **Button must automatically re-render** after cancel without merchant intervention

## Root Cause Analysis

### Current Broken Behavior (Without diff.txt Changes)

**File: paypal-checkout-components/src/zoid/buttons/component.jsx (Lines 155-166)**

```javascript
const wrappedOnCancel = (...args) => {
	return ZalgoPromise.try(() => {
		if (typeof parentProps.onCancel === "function") {
			return parentProps.onCancel(...args);
		}
	}).then(() => {
		clearAppSwitchResumeParams(); // ❌ NOT ALLOWED
		window.location.reload(); // ❌ NOT ALLOWED - Forces full page reload
	});
};
```

**File: smartcomponentnodeweb/client/smart-payment-buttons/src/pixel/pixel.js (Lines 89-111)**

```javascript
function invokeOnCancel(): ZalgoPromise<void> {
	return onCancel({ orderID }, {})
		.then(() => {
			clearUrlParams(); // ❌ NOT ALLOWED
			window.location.reload(); // ❌ NOT ALLOWED
		})
		.catch((err) => {
			clearUrlParams(); // ❌ NOT ALLOWED
			window.location.reload(); // ❌ NOT ALLOWED
		});
}
```

**The Problem:**

1. User cancels payment → Returns to merchant site with `#onCancel?token=...` hash
2. `hasReturned()` returns `true` → Merchant calls `resume()`
3. `wrappedOnCancel` executes → Clears URL → Reloads page
4. Button may not re-render properly, causing it to disappear

### Why diff.txt Changes Are Essential

The `appSwitchState` tracking prevents infinite loops when URL hash is NOT cleared:

**Without state tracking:**

```javascript
// After cancel, hash is in URL: #onCancel?token=...
hasReturned() → isAppSwitchResumeFlow() → true (hash present)
// Merchant calls resume() → onCancel fires → Button re-renders
// BUT if hasReturned() is called again, still returns true!
// → Infinite resume() loop
```

**With state tracking (from diff.txt):**

```javascript
hasReturned: () => {
	return (
		isAppSwitchResumeFlow() && // true (hash still in URL)
		!parent.getHelpers()?.state?.appSwitchState // false (state = "returned")
	);
	// Returns: true && false = FALSE
};
// After first resume(), hasReturned() returns false
// → Prevents infinite loop ✅
```

## Complete Solution

### Part 1: paypal-checkout-components Changes

#### File: `src/zoid/buttons/component.jsx`

**Change 1: Keep all diff.txt changes for state tracking**

- ✅ Add `appSwitchState` tracking in hash/visibility handlers
- ✅ Modify `hasReturned()` to check state
- These changes are already in diff.txt

**Change 2: Modify `wrappedOnCancel` to re-render instead of reload**

```javascript
// BEFORE (Lines 155-166):
const wrappedOnCancel = (...args) => {
	return ZalgoPromise.try(() => {
		if (typeof parentProps.onCancel === "function") {
			return parentProps.onCancel(...args);
		}
	}).then(() => {
		clearAppSwitchResumeParams(); // ❌ REMOVE
		window.location.reload(); // ❌ REMOVE
	});
};

// AFTER:
const wrappedOnCancel = (...args) => {
	return ZalgoPromise.try(() => {
		if (typeof parentProps.onCancel === "function") {
			return parentProps.onCancel(...args);
		}
	}).then(() => {
		// Re-render button in place without reload
		// The button will re-render with the hash still present in URL
		// But hasReturned() will now return false due to appSwitchState
		// Note: Zoid component will handle re-rendering automatically
		// when the parent frame's buttons instance re-renders
		// No explicit action needed here - just don't reload!
	});
};
```

**Change 3: Similarly update `wrappedOnError`**

```javascript
// BEFORE (Lines 169-178):
const wrappedOnError = (...args) => {
	return ZalgoPromise.try(() => {
		if (typeof parentProps.onError === "function") {
			return parentProps.onError(...args);
		}
	}).then(() => {
		clearAppSwitchResumeParams(); // ❌ REMOVE
		window.location.reload(); // ❌ REMOVE
	});
};

// AFTER:
const wrappedOnError = (...args) => {
	return ZalgoPromise.try(() => {
		if (typeof parentProps.onError === "function") {
			return parentProps.onError(...args);
		}
	});
	// No .then() needed - let merchant handle error recovery
};
```

### Part 2: smartcomponentnodeweb Changes

#### File: `client/smart-payment-buttons/src/pixel/pixel.js`

**Change 1: Update `clearUrlParams()` to be optional/configurable**

```javascript
// BEFORE (Lines 12-18):
function clearUrlParams(): void {
	if (window.history && window.history.replaceState) {
		window.history.replaceState({}, document.title, window.location.pathname);
	} else {
		window.location.hash = "";
	}
}

// AFTER:
function clearUrlParams(): void {
	// Keep URL params intact - merchant may need them for analytics/tracking
	// The appSwitchState in paypal-checkout-components will prevent
	// infinite resume loops even with hash present
	// NO-OP for now, can be removed entirely or kept for future use
}
```

**Change 2: Remove reload from `invokeOnCancel()`**

```javascript
// BEFORE (Lines 89-111):
function invokeOnCancel(): ZalgoPromise<void> {
	if (!resumeFlowParams.orderID) {
		logger.error("MISSING_PROPS_FOR_ON_CANCEL", resumeFlowParams);
		return onError();
	}
	return onCancel({ orderID: resumeFlowParams.orderID }, {})
		.then(() => {
			logger.info("RESUME_PIXEL_ON_CANCEL_INVOKED", resumeFlowParams);
			clearUrlParams(); // ❌ REMOVE
			window.location.reload(); // ❌ REMOVE
		})
		.catch((err) => {
			logger.error("RESUME_PIXEL_ON_CANCEL_FAILED", err);
			clearUrlParams(); // ❌ REMOVE
			window.location.reload(); // ❌ REMOVE
		});
}

// AFTER:
function invokeOnCancel(): ZalgoPromise<void> {
	if (!resumeFlowParams.orderID) {
		logger.error("MISSING_PROPS_FOR_ON_CANCEL", resumeFlowParams);
		return onError();
	}
	return onCancel({ orderID: resumeFlowParams.orderID }, {})
		.then(() => {
			logger.info("RESUME_PIXEL_ON_CANCEL_INVOKED", resumeFlowParams);
			// Button will re-render automatically via merchant's render loop
			// Hash stays in URL, but appSwitchState prevents re-triggering resume()
		})
		.catch((err) => {
			logger.error("RESUME_PIXEL_ON_CANCEL_FAILED", err);
			// Let merchant handle error - no reload
			throw err;
		});
}
```

**Change 3: Remove reload from `invokeOnError()`**

```javascript
// BEFORE (Lines 114-128):
function invokeOnError(): ZalgoPromise<void> {
	return onError()
		.then(() => {
			logger.info("RESUME_PIXEL_ON_ERROR_INVOKED", resumeFlowParams);
			clearUrlParams(); // ❌ REMOVE
			window.location.reload(); // ❌ REMOVE
		})
		.catch((err) => {
			logger.error("RESUME_PIXEL_ON_ERROR_FAILED", err);
			clearUrlParams(); // ❌ REMOVE
			window.location.reload(); // ❌ REMOVE
		});
}

// AFTER:
function invokeOnError(): ZalgoPromise<void> {
	return onError()
		.then(() => {
			logger.info("RESUME_PIXEL_ON_ERROR_INVOKED", resumeFlowParams);
			// No reload needed
		})
		.catch((err) => {
			logger.error("RESUME_PIXEL_ON_ERROR_FAILED", err);
			throw err;
		});
}
```

**Note:** Keep the reload ONLY for `invokeOnApprove()` if needed, but remove from cancel/error paths.

## How the Complete Solution Works

### Flow 1: Initial Cancel via Visibility Change

```
1. User clicks PayPal button
   ↓
2. App switch flow initiated
   → listenForVisibilityChange() called
   → state.appSwitchState = "pending"
   ↓
3. User switches to PayPal app
   → Page visibility = "hidden"
   ↓
4. User cancels in PayPal app
   ↓
5. User returns to merchant page
   → Page visibility = "visible"
   → visibilityChangeHandler fires
   → state.appSwitchState = "returned" ✅
   → sendPostRobotMessage("paypal-visibilitychange")
   ↓
6. smartcomponentnodeweb detects cancel
   → invokeOnCancel() called
   → Merchant's onCancel callback executes
   → NO reload ✅
   → NO URL clear ✅
   ↓
7. Merchant's render loop continues
   → Calls buttons.hasReturned():
      isAppSwitchResumeFlow() = true (hash still in URL)
      !appSwitchState = false (state = "returned")
      → Returns: false ✅
   → Goes to else branch:
      buttons.render("#paypalbutton") ✅
   ↓
8. Button re-renders successfully! 🎉
```

### Flow 2: Initial Cancel via Hash Change

```
1. User returns from PayPal app with hash
   → URL becomes: merchant.com#onCancel?token=...
   ↓
2. hashChangeHandler fires
   → state.appSwitchState = "returned" ✅
   → sendPostRobotMessage("paypal-hashchange")
   ↓
3. smartcomponentnodeweb processes hash
   → invokeOnCancel() called
   → Merchant's onCancel callback executes
   → NO reload ✅
   → NO URL clear ✅
   ↓
4. Button re-renders as in Flow 1 ✅
```

### Flow 3: Merchant's Integration Pattern

```javascript
// Braintree/PPCP merchant code pattern:
if (buttons.hasReturned()) {
	// First call after cancel:
	// - isAppSwitchResumeFlow() = true (hash present)
	// - appSwitchState = undefined (fresh page load)
	// - Returns: true
	buttons.resume(); // ✅ Called once

	// During resume():
	// - appSwitchState set to "returned"
	// - onCancel fires
	// - NO reload

	// Next render cycle:
	// - isAppSwitchResumeFlow() = true (hash still there)
	// - appSwitchState = "returned" (now set)
	// - Returns: false ✅
} else {
	buttons.render("#paypalbutton"); // ✅ Called on subsequent renders
}
```

## State Machine Diagram

```
[Fresh Page Load]
     ↓
appSwitchState = undefined
     ↓
hasReturned() checks:
- isAppSwitchResumeFlow()? → NO → render()
- isAppSwitchResumeFlow()? → YES → check state
  - !appSwitchState? → YES (undefined) → resume()
     ↓
[Inside resume()]
     ↓
listenForHashChanges() OR listenForVisibilityChange()
     ↓
appSwitchState = "pending"
     ↓
[User cancels]
     ↓
hashChangeHandler OR visibilityChangeHandler
     ↓
appSwitchState = "returned"
     ↓
onCancel fires → NO RELOAD
     ↓
[Next render cycle]
     ↓
hasReturned() checks:
- isAppSwitchResumeFlow()? → YES (hash still present)
- !appSwitchState? → NO (state = "returned")
- Returns: false
     ↓
render() called → Button visible! ✅
```

## Key Benefits

1. ✅ **No page reload** - Smooth UX, no flash of white screen
2. ✅ **URL preserved** - Merchant can track cancel params if needed
3. ✅ **Prevents infinite loops** - State tracking stops repeated resume() calls
4. ✅ **Consistent with web flows** - Button stays visible like web checkout
5. ✅ **Backwards compatible** - Existing merchants using `hasReturned()/resume()` pattern work correctly

## Testing Checklist

### Test Case 1: Cancel via Visibility Change (iOS/Android)

- [ ] User clicks button, switches to app
- [ ] User cancels, returns to merchant page
- [ ] onCancel callback fires
- [ ] Button re-renders WITHOUT page reload
- [ ] Hash remains in URL
- [ ] Second click on button starts fresh payment

### Test Case 2: Cancel via Hash Change

- [ ] User returns with #onCancel hash
- [ ] onCancel callback fires
- [ ] Button re-renders WITHOUT page reload
- [ ] Hash remains in URL
- [ ] hasReturned() returns false on next check

### Test Case 3: Multiple Cancels

- [ ] User cancels, button re-renders
- [ ] User clicks button again
- [ ] User cancels again
- [ ] Button re-renders each time
- [ ] No infinite loops

### Test Case 4: Error Flow

- [ ] Similar to cancel flow
- [ ] onError fires
- [ ] Button remains visible
- [ ] No reload

### Test Case 5: Successful Payment (Regression)

- [ ] User completes payment
- [ ] onApprove fires
- [ ] Merchant can redirect/reload if desired
- [ ] Existing behavior not broken

## Files to Modify

### Repository: paypal-checkout-components

1. **src/zoid/buttons/component.jsx**
   - Keep all diff.txt changes (appSwitchState tracking)
   - Modify `wrappedOnCancel` (lines 155-166)
   - Modify `wrappedOnError` (lines 169-178)

### Repository: smartcomponentnodeweb

1. **client/smart-payment-buttons/src/pixel/pixel.js**
   - Modify `clearUrlParams()` (lines 12-18)
   - Modify `invokeOnCancel()` (lines 89-111)
   - Modify `invokeOnError()` (lines 114-128)

## Summary

The complete solution requires:

1. ✅ **Keep ALL diff.txt changes** - The appSwitchState tracking is critical
2. ✅ **Remove page reloads** from both repos' cancel/error handlers
3. ✅ **Remove URL clearing** from both repos' cancel/error handlers
4. ✅ **Trust the state machine** - appSwitchState prevents issues even with hash present

This provides the smooth, reload-free button re-rendering experience that matches web checkout flows.
