# Local Development Testing Guide

This guide explains how to test local `paypal-checkout-components` changes using the two-server development workflow with `clientsdknodeweb`.

## Overview

When developing changes to PayPal checkout components (buttons, marks, payment fields, etc.), you need a way to test them locally before deploying. This workflow uses **two servers working together**:

1. **clientsdknodeweb** - Bundles and serves the PayPal SDK with your local component changes
2. **paypal-checkout-components dev server** - Serves demo HTML pages that load the SDK

### Why Two Servers?

- **Mirrors production architecture**: SDK is served separately from merchant pages
- **Enables local testing**: Your local component changes are bundled into the SDK in real-time
- **Module aliasing**: clientsdknodeweb can point to your local checkout-components instead of npm packages

---

## Prerequisites

### 1. System Setup

Add this entry to `/etc/hosts`:

```
127.0.0.1 localhost.paypal.com
```

### 2. Required Repositories

Clone both repositories:

```bash
# PayPal checkout components
git clone https://github.com/ < forked-repo-owner > /paypal-checkout-components.git

# SDK server (bundles and serves SDK)
git clone git@github.paypal.com:Checkout-R/clientsdknodeweb.git
```

### 3. Install Dependencies

```bash
# In paypal-checkout-components
cd paypal-checkout-components
npm install

# In clientsdknodeweb
cd ../clientsdknodeweb
npm install
```

---

## Server Setup

### Server 1: clientsdknodeweb (SDK Server)

**Purpose**: Bundles your local checkout-components and serves the SDK

**Ports**:

- HTTP: `8000` (`http://localhost.paypal.com:8000`)
- HTTPS: `8443` (`https://localhost.paypal.com:8443`)

**Start Command**:

```bash
cd /path/to/clientsdknodeweb
npm start
```

**Expected Output**:

```
Listening on http://localhost:8000
Listening on https://localhost:8443
```

**Module Aliasing** (Required):

Before starting, configure clientsdknodeweb to use your local checkout-components:

```bash
cd /path/to/clientsdknodeweb
npm run alias /path/to/paypal-checkout-components
```

**Verify alias**:

```bash
cat package.json | grep -A 2 '"alias"'
```

Should show:

```json
"alias": {
  "@paypal/checkout-components": "/Users/you/path/to/paypal-checkout-components"
}
```

---

### Server 2: paypal-checkout-components (Demo Server)

**Purpose**: Serves demo HTML pages from `demo/dev/` directory

**Port**: `9001` (HTTPS only)

**Start Command**:

```bash
cd /path/to/paypal-checkout-components
npm run dev
```

**Expected Output**:

```
webpack-dev-server started on https://localhost.paypal.com:9001
```

**Serves Files From**: `demo/dev/` directory

**Access Pattern**: `https://localhost.paypal.com:9001/<filename>.htm`

---

## Testing Workflow

### Step 1: Start Both Servers

**Terminal 1** (clientsdknodeweb):

```bash
cd /path/to/clientsdknodeweb
npm start
```

**Terminal 2** (paypal-checkout-components):

```bash
cd /path/to/paypal-checkout-components
npm run dev
```

### Step 2: Make Code Changes

Edit files in `paypal-checkout-components`:

```bash
# Example: Modify button label logic
vi src/funding/paylater/config.jsx
```

### Step 3: Access Demo Page

Open browser to: `https://localhost.paypal.com:9001/<demo-file>.htm`

Examples:

- `https://localhost.paypal.com:9001/button.htm`
- `https://localhost.paypal.com:9001/button-with-message.htm`
- `https://localhost.paypal.com:9001/button-paylater-generic.htm?country=AT&currency=EUR`

### Step 4: Verify Changes

- Check browser console (F12) for errors
- Inspect button rendering
- Test button click behavior
- Verify funding eligibility

---

## Architecture: How It Works

```
┌─────────┐
│ Browser │
└────┬────┘
     │ (1) GET https://localhost.paypal.com:9001/button-paylater-generic.htm?country=AT&currency=EUR
     ↓
┌──────────────────────────────────┐
│ checkout-components Dev Server   │
│ Port: 9001 (HTTPS)              │
│                                  │
│ Serves: button-paylater-generic.htm
└──────────────────────────────────┘
     │
     │ (2) Page loads SDK dynamically:
     │     <script src="https://localhost.paypal.com:8443/sdk/js?buyer-country=AT&currency=EUR..."></script>
     ↓
┌─────────┐
│ Browser │ (3) Requests SDK from clientsdknodeweb
└────┬────┘
     │ GET https://localhost.paypal.com:8443/sdk/js?client-id=...&buyer-country=AT&currency=EUR
     ↓
┌──────────────────────────────────┐
│ clientsdknodeweb (SDK Server)    │
│ Port: 8443 (HTTPS)              │
│                                  │
│ 1. Reads alias config            │
│ 2. Bundles @paypal/checkout-components │
│    from local filesystem         │
│ 3. Compiles SDK with webpack    │
│ 4. Returns bundled SDK.js        │
└──────────────────────────────────┘
     │
     │ (4) Returns bundled SDK JavaScript
     ↓
┌─────────┐
│ Browser │
│         │ (5) Renders PayPal buttons with your local changes
└─────────┘
```

**Key Points**:

- Demo page loads from port **9001** (HTTPS)
- SDK loads from port **8443** (HTTPS) - **Must match protocol!**
- clientsdknodeweb bundles your **local** checkout-components code
- Changes appear immediately (webpack watch mode)

---

## SDK Parameters

When creating demo pages, you load the SDK with query parameters:

```html
<script src="https://localhost.paypal.com:8443/sdk/js?client-id=alc_client1&currency=EUR&buyer-country=AT&components=buttons,funding-eligibility&debug=true"></script>
```

### Parameter Reference

| Parameter         | Description                   | Example Values                           |
| ----------------- | ----------------------------- | ---------------------------------------- |
| `client-id`       | Merchant identifier           | `alc_client1`, `test`                    |
| `buyer-country`   | Buyer's country code          | `US`, `DE`, `AT`, `FR`, `GB`, `IT`, `ES` |
| `currency`        | Transaction currency          | `USD`, `EUR`, `GBP`, `JPY`               |
| `components`      | Components to load            | `buttons`, `marks`, `payment-fields`     |
| `debug`           | Unminified code               | `true` (readable), `false` (minified)    |
| `enable-funding`  | Force-enable funding sources  | `venmo`, `paylater`, `credit`            |
| `disable-funding` | Force-disable funding sources | `card`, `credit`                         |

### Important: HTTPS Port

⚠️ **Always use port 8443 (HTTPS)**, not 8000 (HTTP), when the demo page is served over HTTPS. Otherwise, browsers block the SDK with "Mixed Content" errors.

**Correct**:

```html
<script src="https://localhost.paypal.com:8443/sdk/js?..."></script>
```

**Incorrect** (causes errors):

```html
<script src="http://localhost.paypal.com:8000/sdk/js?..."></script>
```

---

## Example: Testing PayLater for Any Country

This example demonstrates testing country variants for PayLater using the generic test page.

### Code Changes (Already Implemented)

File: `src/funding/paylater/config.jsx`

The codebase supports multiple country variants with localized labels:

```javascript
// Austria variant
if (paylater?.products?.paylater?.variant === "AT") {
	labelText = "Später Bezahlen";
}

// Germany variant
if (paylater?.products?.paylater?.variant === "DE") {
	labelText = "Später Bezahlen";
}

// Spain variant
if (paylater?.products?.paylater?.variant === "ES") {
	labelText = "Paga a plazos";
}

// ... and more countries
```

### Test Page

File: `demo/dev/button-paylater-generic.htm`

This generic test page supports **all PayLater countries** via URL parameters or dropdown selection.

**Access URL** (with parameters):

```
https://localhost.paypal.com:9001/button-paylater-generic.htm?country=AT&currency=EUR
```

**SDK Dynamic Loading**:
The page dynamically loads the SDK based on selected country:

```javascript
// SDK URL is constructed dynamically:
// https://localhost.paypal.com:8443/sdk/js?client-id=alc_client1&currency=EUR&buyer-country=AT&...
```

**Button Configuration** (example from the test page):

```javascript
paypal
	.Buttons({
		fundingSource: paypal.FUNDING.PAYLATER,
		style: {
			color: "blue",
		},
		createOrder: function (data, actions) {
			return actions.order.create({
				purchase_units: [
					{
						amount: { value: "100.00", currency_code: "EUR" },
					},
				],
			});
		},
		onApprove: function (data, actions) {
			console.log("Order approved:", data);
		},
	})
	.render(".buttons-paylater-blue");
```

### Expected Results

For Austria (AT):

- ✅ **SDK loads** with Austria configuration (`buyer-country=AT`)
- ✅ **PayLater is eligible** (backend determines based on buyer-country parameter)
- ✅ **Button displays** "Später Bezahlen" label
- ✅ **Variant is AT** (backend returns correct variant)

### Testing Multiple Countries

Simply change the URL parameters:

**Germany**:

```
https://localhost.paypal.com:9001/button-paylater-generic.htm?country=DE&currency=EUR
```

Expected label: "Später Bezahlen"

**Spain**:

```
https://localhost.paypal.com:9001/button-paylater-generic.htm?country=ES&currency=EUR
```

Expected label: "Paga a plazos"

**Italy**:

```
https://localhost.paypal.com:9001/button-paylater-generic.htm?country=IT&currency=EUR
```

Expected label: "Paga a rate"

### Debugging

**Check funding sources**:

```javascript
paypal.getFundingSources();
// Returns: ['paypal', 'paylater', 'card', ...]
```

**Check PayLater eligibility**:

```javascript
paypal.isFundingEligible(paypal.FUNDING.PAYLATER);
// Returns: true or false
```

**Check variant** (requires mocking):

Since `getFundingEligibility()` is not public, you need to **pass funding eligibility directly** to the button:

```javascript
paypal.Buttons({
	fundingSource: paypal.FUNDING.PAYLATER,
	fundingEligibility: {
		paylater: {
			eligible: true,
			products: {
				paylater: {
					eligible: true,
					variant: "AT", // Austria, DE, IT, ES, etc.
				},
			},
		},
	},
	// ... rest of config
});
```

---

## Common Test Scenarios

### Testing New Funding Sources

**Goal**: Verify a new payment method appears

**Parameters**:

```
?enable-funding=<source>&buyer-country=<country>
```

**Example**:

```html
<script src="https://localhost.paypal.com:8443/sdk/js?client-id=test&enable-funding=venmo&buyer-country=US"></script>
```

### Testing Country-Specific Labels

**Goal**: Verify button labels change by country

**Parameters**:

```
?buyer-country=<country>&currency=<currency>
```

**Test Cases**:

- Austria (AT): `buyer-country=AT&currency=EUR` → "Später Bezahlen"
- Germany (DE): `buyer-country=DE&currency=EUR` → "Später Bezahlen"
- France (FR): `buyer-country=FR&currency=EUR` → "Payer plus tard"
- Italy (IT): `buyer-country=IT&currency=EUR` → "Paga più tardi"

---

## Generic PayLater Test Page

For testing **any** PayLater country/currency combination, use the generic test page:

### Access URL

**With URL Parameters (Recommended)**:

```
https://localhost.paypal.com:9001/button-paylater-generic.htm?country=<CODE>&currency=<CURRENCY>
```

**Interactive Mode** (without parameters):

```
https://localhost.paypal.com:9001/button-paylater-generic.htm
```

When accessed without parameters, the page displays a configuration form where you can select a country from a dropdown.

### Supported Countries

| Country | URL Parameters             | Expected Label    |
| ------- | -------------------------- | ----------------- |
| Austria | `?country=AT&currency=EUR` | "Später Bezahlen" |
| Germany | `?country=DE&currency=EUR` | "Später Bezahlen" |
| Italy   | `?country=IT&currency=EUR` | "Paga a rate"     |
| Spain   | `?country=ES&currency=EUR` | "Paga a plazos"   |
| France  | `?country=FR&currency=EUR` | "4X PayPal"       |
| Canada  | `?country=CA&currency=CAD` | "Payer en 4"      |
| USA     | `?country=US&currency=USD` | "Pay in 4"        |

### Usage Examples

**Test Germany**:

```
https://localhost.paypal.com:9001/button-paylater-generic.htm?country=DE&currency=EUR
```

**Test Spain**:

```
https://localhost.paypal.com:9001/button-paylater-generic.htm?country=ES&currency=EUR
```

**Test France**:

```
https://localhost.paypal.com:9001/button-paylater-generic.htm?country=FR&currency=EUR
```

### How It Works

1. **URL Parameters**: The page reads `country` and `currency` from URL query parameters
2. **Dynamic SDK Loading**: SDK is loaded dynamically with the specified configuration
3. **Automatic Validation**: Console logs show whether the expected label was found on the page
4. **Configuration Form**: If no URL parameters are provided, an interactive form is shown

### Adding New Countries

When new PayLater countries are added in the future:

1. **Update COUNTRY_CONFIG** in `button-paylater-generic.htm`:

   ```javascript
   const COUNTRY_CONFIG = {
   	// ... existing countries ...
   	XX: { currency: "XXX", label: "Expected Label", product: "paylater" },
   };
   ```

2. **Add to dropdown** in the configuration form:

   ```html
   <option value="XX|XXX">Country Name (XX) - XXX - "Label Text"</option>
   ```

3. **Test immediately**:
   ```
   https://localhost.paypal.com:9001/button-paylater-generic.htm?country=XX&currency=XXX
   ```

---

### Testing Button Styles

**Goal**: Verify button renders in different colors/layouts

**Code**:

```javascript
// Blue vertical stack
paypal
	.Buttons({
		style: {
			color: "blue",
			layout: "vertical",
		},
	})
	.render("#buttons");

// Gold horizontal stack
paypal
	.Buttons({
		style: {
			color: "gold",
			layout: "horizontal",
			tagline: false,
		},
	})
	.render("#buttons-horizontal");
```

### Testing Smart Payment Buttons

**Goal**: Verify correct funding sources appear automatically

**Code**:

```javascript
// No fundingSource specified - SDK decides
paypal.Buttons({
  style: { layout: 'vertical' },
  createOrder: ...,
  onApprove: ...
}).render('#smart-buttons');
```

**Expected**: Buttons for PayPal, PayLater, Venmo (if eligible)

---

## Troubleshooting

### Issue: SDK Doesn't Load

**Symptoms**:

- Browser shows "SDK failed to load" error
- Console shows `paypal` is undefined

**Solutions**:

1. **Check mixed content error** (most common):

   - Page is HTTPS (port 9001), SDK must also be HTTPS (port 8443)
   - Fix: Change `http://localhost.paypal.com:8000` to `https://localhost.paypal.com:8443`

2. **Verify clientsdknodeweb is running**:

   ```bash
   # Should see both ports listening
   Listening on http://localhost:8000
   Listening on https://localhost:8443
   ```

3. **Check /etc/hosts**:

   ```bash
   cat /etc/hosts | grep localhost.paypal.com
   # Should show: 127.0.0.1 localhost.paypal.com
   ```

4. **Test SDK URL directly**:
   - Open: `https://localhost.paypal.com:8443/sdk/js?client-id=test`
   - Should show JavaScript code

### Issue: Module Alias Not Working

**Symptoms**:

- Changes to checkout-components don't appear
- SDK loads but with old code

**Solutions**:

1. **Verify alias configuration**:

   ```bash
   cd /path/to/clientsdknodeweb
   cat package.json | grep -A 2 '"alias"'
   ```

2. **Re-run alias command**:

   ```bash
   npm run alias /Users/you/path/to/paypal-checkout-components
   ```

3. **Restart clientsdknodeweb**:

   ```bash
   # Kill server (Ctrl+C)
   npm start
   ```

4. **Check for webpack errors** in clientsdknodeweb console

### Issue: Buttons Don't Render

**Symptoms**:

- SDK loads but buttons don't appear
- Empty div where button should be

**Solutions**:

1. **Check funding eligibility**:

   ```javascript
   paypal.isFundingEligible(paypal.FUNDING.PAYLATER);
   ```

2. **Check for JavaScript errors** in browser console

3. **Verify createOrder returns valid order ID**:

   ```javascript
   createOrder: function(data, actions) {
     return actions.order.create({
       purchase_units: [{ amount: { value: '100.00' } }]
     });
   }
   ```

4. **Try with explicit funding eligibility**:
   ```javascript
   paypal.Buttons({
   	fundingSource: paypal.FUNDING.PAYLATER,
   	fundingEligibility: {
   		paylater: { eligible: true },
   	},
   });
   ```

### Issue: Wrong Label Text

**Symptoms**:

- Button appears but wrong label
- Expected "Später Bezahlen", got "Pay Later"

**Solutions**:

1. **Check buyer-country parameter** in SDK URL

2. **Verify variant** (if using fundingEligibility prop):

   ```javascript
   fundingEligibility: {
     paylater: {
       products: {
         paylater: {
           variant: 'AT'  // Should match country
         }
       }
     }
   }
   ```

3. **Clear browser cache** and hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)

4. **Check if your code changes are bundled**:
   - Open SDK in browser: `https://localhost.paypal.com:8443/sdk/js?debug=true`
   - Search for your code changes (e.g., "Später Bezahlen")

### Issue: Invalid Label Error

**Symptoms**:

- Console error: `Uncaught Error: Invalid label: paylater`
- Buttons fail to render

**Explanation**:
When using `fundingSource` to render a specific funding source button, the `label` is automatically determined. You cannot specify `label` in the `style` object.

**Solution**:
Remove the `label` from style configuration:

```javascript
// ❌ Incorrect - causes error
paypal.Buttons({
	fundingSource: paypal.FUNDING.PAYLATER,
	style: {
		color: "blue",
		label: "paylater", // Remove this!
	},
});

// ✅ Correct
paypal.Buttons({
	fundingSource: paypal.FUNDING.PAYLATER,
	style: {
		color: "blue",
		// No label - it's automatic
	},
});
```

### Issue: getFundingEligibility() Not Available

**Symptoms**:

- Console error: `paypal.getFundingEligibility is not a function`

**Explanation**:
`getFundingEligibility()` is an **internal SDK function**, not exposed in the public API.

**Solution**:
Use alternative APIs:

```javascript
// Check available funding sources
const sources = paypal.getFundingSources();
// Returns: ['paypal', 'paylater', 'venmo', ...]

// Check if specific source is eligible
const eligible = paypal.isFundingEligible(paypal.FUNDING.PAYLATER);
// Returns: true or false

// Or pass fundingEligibility directly to button:
paypal.Buttons({
	fundingEligibility: {
		paylater: {
			eligible: true,
			products: {
				paylater: {
					eligible: true,
					variant: "AT",
				},
			},
		},
	},
});
```

---

## Tips & Best Practices

### Development Workflow

1. **Keep both servers running** throughout your session
2. **Make incremental changes** and test immediately
3. **Use debug=true** during development to see readable code
4. **Check browser console** for errors after every change
5. **Clear browser cache** if changes don't appear

### Creating Test Pages

1. **Copy existing demo file** as a starting point (e.g., button-with-message.htm)
2. **Change SDK URL** to point to clientsdknodeweb (port 8443)
3. **Add SDK parameters** for your test scenario (buyer-country, currency)
4. **Keep it simple** - focus on one feature per test page
5. **Add debugging info** - display eligibility, log events

### Debugging Strategies

1. **Start simple** - Test with basic button configuration first
2. **Add complexity gradually** - Colors, layouts, funding sources
3. **Use browser DevTools**:
   - Console: Check for errors and log SDK state
   - Network tab: Verify SDK request/response
   - Elements: Inspect button DOM structure
4. **Compare with working examples** - Look at index.htm, button.htm

---

## Additional Resources

### Demo Files (Examples)

- `demo/dev/index.htm` - Interactive playground with many configurations
- `demo/dev/button.htm` - Basic button example
- `demo/dev/button-with-message.htm` - Buttons with messaging
- `demo/dev/button-paylater-generic.htm` - **Generic PayLater test page for all countries** (supports URL parameters or interactive form)

### Integration Tests

- `test/integration/tests/funding/paylater/index.js` - PayLater variant tests
- Shows how to mock funding eligibility for different countries

### Configuration Files

**clientsdknodeweb**:

- `package.json` - Contains module alias configuration

**paypal-checkout-components**:

- `package.json` - Dev server configuration (port 9001, static files)
- `webpack.config.dev.js` - Webpack dev server setup

---

## Quick Reference

### Start Servers

```bash
# Terminal 1: SDK server
cd /path/to/clientsdknodeweb && npm start

# Terminal 2: Demo server
cd /path/to/paypal-checkout-components && npm run dev
```

### Access Demo Page

```
https://localhost.paypal.com:9001/<filename>.htm
```

### SDK URL Format

```html
<script src="https://localhost.paypal.com:8443/sdk/js?client-id=alc_client1&buyer-country=AT&currency=EUR&debug=true"></script>
```

### Check Funding

```javascript
// Available sources
paypal.getFundingSources();

// Check eligibility
paypal.isFundingEligible(paypal.FUNDING.PAYLATER);
```

### Verify Alias

```bash
cat /path/to/clientsdknodeweb/package.json | grep -A 2 '"alias"'
```

---

**Happy Testing! 🚀**

For questions or issues, refer to the troubleshooting section or check the integration tests for examples.
