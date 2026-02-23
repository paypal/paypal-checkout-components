# QR Code Component - Test Documentation

## Overview

This directory contains unit tests for the QR Code component's CSP (Content Security Policy) nonce handling. The tests verify nonce propagation through the component lifecycle in both web and non-web environments.

## Test Files

### `component.test.js`

Tests for the QR Code component creation and initialization.

**Coverage:**

- Component creation and initialization
- Component memoization (singleton pattern)

**Key Scenarios:**

- Verifies component is created as a function
- Ensures getQRCodeComponent returns the same instance on multiple calls

---

### `container.test.jsx`

Tests for the container template and QRCodeContainer component.

**Coverage:**

- CSP nonce retrieval based on `__WEB__` environment flag
- Frame validation (both frame and prerenderFrame required)
- CSS class setup for visibility transitions
- Event handler registration

**Key Scenarios:**

- `__WEB__ = true`: getCSPNonce is called and nonce value is verified
- `__WEB__ = false`: getCSPNonce is NOT called
- Missing frame/prerenderFrame: returns undefined
- Valid frames: Sets up visibility classes for prerender→render transition
- EVENT.RENDERED handler registration

---

### `prerender.test.jsx`

Tests for the prerender template and SpinnerPage integration.

**Coverage:**

- CSP nonce propagation to SpinnerPage
- Environment-based nonce handling
- Close function integration

**Key Scenarios:**

- `__WEB__ = true`: Nonce retrieved and passed to SpinnerPage
- `__WEB__ = false`: No nonce retrieval, empty nonce passed
- Verifies close function is properly integrated

---

## What Changed (CSP Nonce Implementation)

### Previous Behavior

```javascript
// Props were passed through containerTemplate/prerenderTemplate
cspNonce: {
  default: __WEB__ ? getCSPNonce : () => undefined,
}
```

### New Behavior

```javascript
// Nonce retrieved directly in templates
cspNonce: {
  value: getCSPNonce,
}

// In container.jsx and prerender.jsx:
const cspNonce = __WEB__ ? getCSPNonce() : undefined;
```

### Why This Matters

- **Security**: Ensures CSP nonce is properly applied to inline styles and scripts
- **Environment Handling**: Different behavior for web vs non-web (e.g., server-side rendering)
- **Simplification**: Removes conditional logic from component definition

---

## Running Tests

### Run all QR Code tests

```bash
npm run vitest -- run src/zoid/qr-code/
```

### Run in watch mode

```bash
npm run vitest -- src/zoid/qr-code/
```

### Run specific test file

```bash
npm run vitest -- run src/zoid/qr-code/component.test.js
```

### Run with coverage

```bash
npm run test:unit
```

---

## Test Improvements Implemented

### ✅ Critical Issues Fixed

1. **Global State Pollution**: Added `afterEach` to restore `global.__WEB__` value
2. **Flow Type Annotations**: Restored `// $FlowIssue` comments where needed
3. **Nonce Value Validation**: Added `toHaveReturnedWith()` assertions to verify actual nonce values

### ✅ Code Quality Improvements

4. **Constants Extraction**: Magic strings replaced with named constants (`TEST_UID`, `TEST_NONCE`)
5. **Documentation**: Added file headers explaining test purpose
6. **Test Descriptions**: Added comments explaining business logic (e.g., visibility transitions)
7. **Parameter Naming**: Fixed underscore prefix on used parameters
8. **Better Assertions**: Enhanced assertions to verify both call count and return values

### ✅ Test Coverage Enhancements

9. **Separated Test Cases**: Split single test into multiple focused tests
10. **Additional Scenarios**: Added test for cspNonce parameter acceptance
11. **Event Handler Testing**: Verified event handler registration with call count

---

## Known Limitations

### Not Currently Tested

- **Event Handler Behavior**: Tests verify handlers are registered but don't execute them
- **Component Cleanup**: No tests for component destruction or teardown
- **Multiple Instances**: Only single component instance tested
- **Edge Cases**: Empty nonce, malformed props, concurrent calls
- **Integration**: No end-to-end test of component → container → prerender flow

### Why These Are Deferred

- Event simulation requires complex mocking of Zoid internals
- Integration tests would be better in a separate e2e test suite
- Edge cases are low priority for initial implementation

---

## Configuration Changes

### `vite.config.js`

Added `__ZOID__` global configuration required by @krakenjs/zoid:

```javascript
__ZOID__: JSON.stringify({
	...zoidGlobals.__ZOID__,
	__DEFAULT_CONTAINER__: true,
	__DEFAULT_PRERENDER__: true,
	__FRAMEWORK_SUPPORT__: true,
	__SCRIPT_NAMESPACE__: true,
});
```

### `vitestSetup.js`

Fixed `window.crypto` assignment error:

```javascript
Object.defineProperty(window, "crypto", {
	writable: true,
	configurable: true,
	value: crypto.webcrypto,
});
```

**Impact**: These changes affect all tests in the repository, not just QR code tests.

---

## Maintenance Notes

### When Updating These Tests

1. Always restore global state in `afterEach` hooks
2. Use constants for test data (avoid magic strings)
3. Add `// $FlowIssue` comments where Flow type checking fails on test mocks
4. Verify nonce values with `toHaveReturnedWith()`, not just `toHaveBeenCalled()`
5. Update this documentation when adding new test scenarios

### Common Pitfalls

- **Don't mutate `global.__WEB__` without restoring it**
- **Don't test implementation details** (e.g., internal class names that might change)
- **Don't mock too deeply** (keep mocks simple and maintainable)

---

## Test Statistics

- **Total Test Files**: 3
- **Total Tests**: 14 (increased from 11 for better coverage)
- **Total Lines**: 256 (includes documentation and improved assertions)
- **Pass Rate**: 100% ✅
- **Coverage**: Component creation, CSP nonce handling, frame validation, visibility management

---

## Related Files

### Source Files

- `src/zoid/qr-code/component.jsx` - Component definition
- `src/zoid/qr-code/container.jsx` - Container template with CSP nonce
- `src/zoid/qr-code/prerender.jsx` - Prerender template with CSP nonce

### Related Commits

- Initial CSP nonce implementation: `4cb55fcd` (Reapply "CspNonce changes")
- Changed to value property: `b910cfa5` (Removed default)

---

## Questions or Issues?

If you encounter test failures:

1. Check that `global.__WEB__` is properly set
2. Verify mocks are cleared in `beforeEach`
3. Ensure Flow comments are present where needed
4. Check that constants are defined at module level

For questions about implementation, see the main project documentation or contact the team lead.
