# Quick Reference: Code Changes

## Repository: paypal-checkout-components

### File: `src/zoid/buttons/component.jsx`

**Line 99: Remove import**

```javascript
// REMOVED:
import { clearAppSwitchResumeParams } from "../../lib/appSwitchResume";
```

**Lines 155-167: Update wrappedOnCancel**

```javascript
// BEFORE:
const wrappedOnCancel = (...args) => {
	return ZalgoPromise.try(() => {
		if (typeof parentProps.onCancel === "function") {
			return parentProps.onCancel(...args);
		}
	}).then(() => {
		clearAppSwitchResumeParams();
		window.location.reload();
	});
};

// AFTER:
const wrappedOnCancel = (...args) => {
	return ZalgoPromise.try(() => {
		if (typeof parentProps.onCancel === "function") {
			return parentProps.onCancel(...args);
		}
	});
};
```

**Lines 169-180: Update wrappedOnError**

```javascript
// BEFORE:
const wrappedOnError = (...args) => {
	return ZalgoPromise.try(() => {
		if (typeof parentProps.onError === "function") {
			return parentProps.onError(...args);
		}
	}).then(() => {
		clearAppSwitchResumeParams();
		window.location.reload();
	});
};

// AFTER:
const wrappedOnError = (...args) => {
	return ZalgoPromise.try(() => {
		if (typeof parentProps.onError === "function") {
			return parentProps.onError(...args);
		}
	});
};
```

---

## Repository: smartcomponentnodeweb

### File: `client/smart-payment-buttons/src/pixel/pixel.js`

**Lines 12-21: Deprecate clearUrlParams**

```javascript
// BEFORE:
function clearUrlParams(): void {
	if (window.history && window.history.replaceState) {
		window.history.replaceState({}, document.title, window.location.pathname);
	} else {
		window.location.hash = "";
	}
}

// AFTER:
function clearUrlParams(): void {
	// DEPRECATED: No longer used to preserve URL hash with token for merchant tracking
	// appSwitchState in parent component prevents duplicate callback invocations
	// Keeping function signature for backwards compatibility
}
```

**Lines 92-114: Update invokeOnCancel**

```javascript
// BEFORE:
return onCancel({ orderID: resumeFlowParams.orderID }, {})
	.then(() => {
		logger.info("RESUME_PIXEL_ON_CANCEL_INVOKED", resumeFlowParams);
		clearUrlParams();
		window.location.reload();
	})
	.catch((err) => {
		logger.error("RESUME_PIXEL_ON_CANCEL_FAILED", err);
		clearUrlParams();
		window.location.reload();
	});

// AFTER:
return onCancel({ orderID: resumeFlowParams.orderID }, {})
	.then(() => {
		logger.info("RESUME_PIXEL_ON_CANCEL_INVOKED", resumeFlowParams);
	})
	.catch((err) => {
		logger.error("RESUME_PIXEL_ON_CANCEL_FAILED", err);
		throw err;
	});
```

**Lines 116-129: Update invokeOnError**

```javascript
// BEFORE:
return onError()
	.then(() => {
		logger.info("RESUME_PIXEL_ON_ERROR_INVOKED", resumeFlowParams);
		clearUrlParams();
		window.location.reload();
	})
	.catch((err) => {
		logger.error("RESUME_PIXEL_ON_ERROR_FAILED", err);
		clearUrlParams();
		window.location.reload();
	});

// AFTER:
return onError()
	.then(() => {
		logger.info("RESUME_PIXEL_ON_ERROR_INVOKED", resumeFlowParams);
	})
	.catch((err) => {
		logger.error("RESUME_PIXEL_ON_ERROR_FAILED", err);
		throw err;
	});
```

---

## Summary

**Total changes: 2 files, 6 modifications**

### What was removed:

- ❌ `window.location.reload()` calls (4 instances)
- ❌ `clearAppSwitchResumeParams()` calls (2 instances)
- ❌ `clearUrlParams()` calls (4 instances)
- ❌ Unused import

### What was preserved:

- ✅ onCancel/onError callback invocations
- ✅ Logger tracking
- ✅ URL hash with transaction tokens
- ✅ Post-robot messaging infrastructure

### Dependencies:

- ✅ Requires diff.txt `appSwitchState` changes to prevent infinite loops
