# Funding Source Eligibility

## Overview

This document provides detailed analysis of button funding source configurations, including eligibility conditions, requirements, style configurations, and test coverage for all payment methods supported by PayPal Checkout Components.

## Funding Sources to Analyze

### **High Priority Funding Sources** (Major payment methods)

1. [**Card**](#card-button) - Main card payment configuration
   - **Amex** - American Express
   - **Discover** - Discover Card
   - **Elo** - Brazilian card network
   - **Hiper** - Brazilian card network
   - **JCB** - Japanese card network
   - **Mastercard** - Mastercard network
   - **Visa** - Visa network
2. [**PayPal**](#paypal-button) - Core PayPal payment method
3. [**Credit**](#credit-button) - PayPal Credit functionality
4. [**PayLater**](#paylater-button) - Pay in 4/Pay Later functionality
5. [**Venmo**](#venmo-button) - Venmo payment method

### **Medium Priority Funding Sources** (Regional/Alternative payment methods)

#### **European Payment Methods**

6. **Apple Pay** - Apple's payment system
7. **Bancontact** - Belgian payment method
8. **EPS** - Austrian payment method
9. **Giropay** - German payment method
10. **iDEAL** - Dutch payment method
11. **Multibanco** - Portuguese payment method
12. **MyBank** - European online banking
13. **SEPA** - European bank transfers
14. **Sofort** - European instant bank transfer

#### **Global/Regional Payment Methods**

15. **BLIK** - Polish mobile payment
16. **Boleto** - Brazilian payment method
17. **Itau** - Brazilian bank payment
18. **Mercado Pago** - Latin American payment
19. **OXXO** - Mexican cash payment
20. **P24** - Polish payment method (Przelewy24)
21. **Paidy** - Japanese payment method
22. **PayU** - Central/Eastern European payment
23. **Satispay** - Italian mobile payment
24. **Trustly** - Nordic online banking
25. **WeChat Pay** - Chinese payment method

**Total**: 25 funding sources (5 completed, 20 remaining)

---

## Card Button

### **Supported Flows**

- `BUTTON_FLOW.PURCHASE` ("purchase")
- `BUTTON_FLOW.BILLING_SETUP` ("billing_setup")
- `BUTTON_FLOW.SUBSCRIPTION_SETUP` ("subscription_setup")

**File**: [`src/funding/card/config.jsx:120-124`](../src/funding/card/config.jsx#L120-L124)

### **Eligibility Conditions**

The Card button is **eligible** when ALL of the following conditions are met:

#### 1. **Card Funding Eligibility**

- **Variable**: `fundingEligibility.card.eligible`
- **Condition**: Must be `true`
- **Logic**: If `!cardEligible`, button is **NOT eligible**
- **Reason**: Card funding must be available for the merchant/buyer

**File**: [`src/funding/card/config.jsx:60-74`](../src/funding/card/config.jsx#L60-L74)

#### 2. **Branded Card Experience Priority**

- **Variable**: `fundingEligibility.card.branded`
- **Condition**: If `cardBranded` is `true`, button is **eligible** (skips other checks)
- **Logic**: Branded experiences always take priority over unbranded
- **Reason**: Merchant is not eligible for unbranded experiences

**File**: [`src/funding/card/config.jsx:96-98`](../src/funding/card/config.jsx#L96-L98)

#### 3. **Standalone Card Rendering**

- **Variable**: `fundingSource`
- **Condition**: If `fundingSource === FUNDING.CARD`, button is **eligible**
- **Logic**: Standalone card buttons are always eligible outside smart stack
- **Reason**: Independent card rendering doesn't conflict with other experiences

**File**: [`src/funding/card/config.jsx:100-102`](../src/funding/card/config.jsx#L100-L102)

#### 4. **Card Fields Component Conflict**

- **Variable**: `components` array containing "card-fields"
- **Condition**: If components include "card-fields", button is **NOT eligible**
- **Logic**: Prevents mixing branded and unbranded experiences
- **Reason**: Card fields provide unbranded experience, conflicts with card button

**File**: [`src/funding/card/config.jsx:104-106`](../src/funding/card/config.jsx#L104-L106)

#### 5. **Vaulted Card Priority**

- **Variable**: `wallet.card.instruments.length`
- **Condition**: If vaulted cards exist, button is **eligible**
- **Logic**: Vaulted cards override hosted-fields restrictions
- **Reason**: Return buyer experience for hosted-fields implementations

**File**: [`src/funding/card/config.jsx:64-69, 108-110`](../src/funding/card/config.jsx#L64-L69)

#### 6. **Hosted Fields Conflict**

- **Variable**: `components` array containing `COMPONENTS.HOSTED_FIELDS`
- **Condition**: If hosted-fields requested, button is **NOT eligible** (unless vaulted cards exist)
- **Logic**: Prevents mixing branded and unbranded experiences
- **Reason**: Hosted fields provide unbranded experience

**File**: [`src/funding/card/config.jsx:112-114`](../src/funding/card/config.jsx#L112-L114)

#### 7. **Default Eligibility**

- **Fallback**: Returns `true` if all above conditions pass

**File**: [`src/funding/card/config.jsx:117`](../src/funding/card/config.jsx#L117)

### **Requirements**

The Card button has **no specific platform requirements** - uses default requirements from `DEFAULT_FUNDING_CONFIG`:

- **Platforms**: `PLATFORM.DESKTOP`, `PLATFORM.MOBILE`
- **Requirements**: No specific platform requirements (returns empty object `{}`)

**File**: [`src/funding/common.jsx:198`](../src/funding/common.jsx#L198)

### **Style Configuration**

#### **Supported Layouts**

- `BUTTON_LAYOUT.VERTICAL` ("vertical")

**File**: [`src/funding/card/config.jsx:126`](../src/funding/card/config.jsx#L126)

#### **Available Colors**

- `BUTTON_COLOR.BLACK`
- `BUTTON_COLOR.WHITE`

**File**: [`src/funding/card/config.jsx:132`](../src/funding/card/config.jsx#L132)

#### **Maximum Cards by Country**

- **Brazil (BR)**: 5 cards maximum
- **Other countries**: No limit specified

**File**: [`src/funding/card/config.jsx:52-54`](../src/funding/card/config.jsx#L52-L54)

#### **Wallet Menu Display**

- **Function**: Complex logic based on instrument branding and token ID
- **Branded instruments**: Never show menu (`return false`)
- **Non-branded instruments**: Show menu unless token ID doesn't contain "-" and user has userIDToken
- **Behavior**: Controls wallet menu visibility for saved cards

**File**: [`src/funding/card/config.jsx:181-191`](../src/funding/card/config.jsx#L181-L191)

#### **Card Vendor Configurations**

Card supports multiple sub-card types, each with their own logo configuration:

- **Visa**: [`src/funding/card/visa/config.js`](../src/funding/card/visa/config.js)
- **Mastercard**: [`src/funding/card/mastercard/config.js`](../src/funding/card/mastercard/config.js)
- **Amex**: [`src/funding/card/amex/config.js`](../src/funding/card/amex/config.js)
- **Discover**: [`src/funding/card/discover/config.js`](../src/funding/card/discover/config.js)
- **JCB**: [`src/funding/card/jcb/config.js`](../src/funding/card/jcb/config.js)
- **Elo**: [`src/funding/card/elo/config.js`](../src/funding/card/elo/config.js)
- **Hiper**: [`src/funding/card/hiper/config.js`](../src/funding/card/hiper/config.js)

**File**: [`src/funding/card/config.jsx:34-47`](../src/funding/card/config.jsx#L34-L47)

### **Test Coverage Analysis**

#### **Eligibility Tests**

##### **Positive Eligibility Scenarios**:

1. **Branded Card Priority** (lines 53-63): `fundingEligibility.card.branded: true` -> eligible
2. **Standalone Card** (lines 65-75): `fundingSource: FUNDING.CARD` -> eligible
3. **Vaulted Card Override** (lines 105-117): wallet has card instruments -> eligible
4. **Default Behavior** (lines 131-141): no conflicting conditions -> eligible

##### **Negative Eligibility Scenarios**:

1. **No Card Eligibility** (lines 40-51): `fundingEligibility.card.eligible: false` -> not eligible
2. **Card Fields Conflict** (lines 77-88): components include "card-fields" -> not eligible
3. **Card Fields Override Vaulted** (lines 90-103): card-fields present even with vaulted cards -> not eligible
4. **Hosted Fields Conflict** (lines 119-129): components include HOSTED_FIELDS -> not eligible

**File**: [`src/funding/card/config.test.jsx:36-142`](../src/funding/card/config.test.jsx#L36-L142)

---

## PayPal Button

### **Supported Flows**

- `BUTTON_FLOW.PURCHASE` ("purchase")
- `BUTTON_FLOW.BILLING_SETUP` ("billing_setup")
- `BUTTON_FLOW.SUBSCRIPTION_SETUP` ("subscription_setup")
- `BUTTON_FLOW.FULL_STACK_SUBSCRIPTION_SETUP` ("full_stack_subscription_setup")
- `BUTTON_FLOW.VAULT_WITHOUT_PURCHASE` ("vault_without_purchase")

**File**: [`src/funding/paypal/config.jsx:21-27`](../src/funding/paypal/config.jsx#L21-L27)

### **Eligibility Conditions**

The PayPal button **has no custom eligibility conditions** - uses default eligibility logic from `DEFAULT_FUNDING_CONFIG` (always returns `true`).

### **Requirements**

The PayPal button has **no specific platform requirements** - uses default requirements from `DEFAULT_FUNDING_CONFIG`:

- **Platforms**: `PLATFORM.DESKTOP`, `PLATFORM.MOBILE`
- **Requirements**: No specific platform requirements (returns empty object `{}`)

**File**: [`src/funding/common.jsx:198`](../src/funding/common.jsx#L198)

### **Style Configuration**

#### **Supported Layouts**

- `BUTTON_LAYOUT.VERTICAL` ("vertical")
- `BUTTON_LAYOUT.HORIZONTAL` ("horizontal")

**File**: [`src/funding/paypal/config.jsx:29`](../src/funding/paypal/config.jsx#L29)

#### **Available Colors**

- `BUTTON_COLOR.GOLD`
- `BUTTON_COLOR.BLUE`
- `BUTTON_COLOR.SILVER`
- `BUTTON_COLOR.BLACK`
- `BUTTON_COLOR.WHITE`
- `BUTTON_COLOR.REBRAND_BLUE`
- `BUTTON_COLOR.REBRAND_DARKBLUE`
- `BUTTON_COLOR.REBRAND_WHITE`
- `BUTTON_COLOR.REBRAND_BLACK`

**File**: [`src/funding/paypal/config.jsx:31-41`](../src/funding/paypal/config.jsx#L31-L41)

#### **Label Text Customization**

- **Default**: Uses `FUNDING_BRAND_LABEL.PAYPAL`
- **Installment Labels**: Dynamic text based on period and content
- **Internationalization**: Supports localized labels via content object
- **Period Support**: Handles installment periods for "Paga en X plazos" style labels

**File**: [`src/funding/paypal/config.jsx:53-71`](../src/funding/paypal/config.jsx#L53-L71)

#### **Logo Component Selection**

- **Rebranded styles**: Uses `PayPalRebrandLogoExternalImage` or `PayPalRebrandLogoInlineSVG`
- **Standard styles**: Uses `PayPalLogoExternalImage` or `PayPalLogoInlineSVG`
- **Environment-based**: Web uses external images, non-web uses inline SVG

**File**: [`src/funding/paypal/template.jsx:52-77`](../src/funding/paypal/template.jsx#L52-L77)

### **Test Coverage Analysis**

#### **Template Rendering Impact**

##### **Personalization Features**:

- **Button Text Personalization**: Custom text display with animations
- **Tracking Integration**: Impression tracking for personalized content
- **Responsive Behavior**: Minimum width restrictions for personalization display
- **Animation Sequences**: Complex CSS animations for logo and text transitions

##### **Wallet Label Rendering**:

- **Multi-instrument Support**: Handles cards, banks, credit, and balance
- **Branding Logic**: Different rendering for branded vs unbranded instruments
- **Logo Selection**: Dynamic logo selection based on instrument type
- **Pay Label Display**: "Pay Now" vs "Pay With" based on instrument state

**File**: [`src/funding/paypal/template.jsx:79-516`](../src/funding/paypal/template.jsx#L79-L516)

---

## Credit Button

### **Supported Flows**

- `BUTTON_FLOW.PURCHASE` ("purchase")
- `BUTTON_FLOW.BILLING_SETUP` ("billing_setup")
- `BUTTON_FLOW.SUBSCRIPTION_SETUP` ("subscription_setup")

**File**: [`src/funding/credit/config.jsx:29-33`](../src/funding/credit/config.jsx#L29-L33)

### **Eligibility Conditions**

The Credit button **has no custom eligibility conditions** - uses default eligibility logic from `DEFAULT_FUNDING_CONFIG` (always returns `true`).

### **Requirements**

The Credit button has **no specific platform requirements** - uses default requirements from `DEFAULT_FUNDING_CONFIG`:

- **Platforms**: `PLATFORM.DESKTOP`, `PLATFORM.MOBILE`
- **Requirements**: No specific platform requirements (returns empty object `{}`)

**File**: [`src/funding/common.jsx:198`](../src/funding/common.jsx#L198)

### **Style Configuration**

#### **Supported Layouts**

- `BUTTON_LAYOUT.HORIZONTAL` ("horizontal")
- `BUTTON_LAYOUT.VERTICAL` ("vertical")

**File**: [`src/funding/credit/config.jsx:35`](../src/funding/credit/config.jsx#L35)

#### **Available Colors**

- `BUTTON_COLOR.DARKBLUE`
- `BUTTON_COLOR.BLACK`
- `BUTTON_COLOR.WHITE`

**File**: [`src/funding/credit/config.jsx:63`](../src/funding/credit/config.jsx#L63)

#### **Logo Component Configuration**

- **Germany (DE)**: Uses standalone Credit logo
- **Other countries**: Displays PayPal PP mark + PayPal wordmark + Credit logo combination
- **Environment-based**: Web uses external images, non-web uses inline SVG

**File**: [`src/funding/credit/config.jsx:37-59`](../src/funding/credit/config.jsx#L37-L59)

#### **Label Text**

- **Static**: Uses `FUNDING_BRAND_LABEL.CREDIT`

**File**: [`src/funding/credit/config.jsx:75`](../src/funding/credit/config.jsx#L75)

### **Test Coverage Analysis**

No dedicated test files found for Credit configuration.

---

## PayLater Button

### **Supported Flows**

Uses default flows from `DEFAULT_FUNDING_CONFIG`:

- `BUTTON_FLOW.PURCHASE` ("purchase")

**File**: [`src/funding/common.jsx:200`](../src/funding/common.jsx#L200)

### **Eligibility Conditions**

The PayLater button is **eligible** when ALL of the following conditions are met:

#### 1. **Experiment Enablement**

- **Variable**: `experiment.disablePaylater`
- **Condition**: Must NOT be `true` for non-standalone buttons
- **Logic**: If `experiment.disablePaylater` is `true` AND no `fundingSource` (not standalone), button is **NOT eligible**
- **Reason**: Allows experiments to disable PayLater in smart payment stack while preserving standalone functionality

**File**: [`src/funding/paylater/config.jsx:65-74`](../src/funding/paylater/config.jsx#L65-L74)

#### 2. **Default Eligibility**

- **Fallback**: Returns `true` if experiment condition passes

### **Requirements**

The PayLater button has **no specific platform requirements** - uses default requirements from `DEFAULT_FUNDING_CONFIG`:

- **Platforms**: `PLATFORM.DESKTOP`, `PLATFORM.MOBILE`
- **Requirements**: No specific platform requirements (returns empty object `{}`)

**File**: [`src/funding/common.jsx:198`](../src/funding/common.jsx#L198)

### **Style Configuration**

#### **Supported Layouts**

- `BUTTON_LAYOUT.HORIZONTAL` ("horizontal")
- `BUTTON_LAYOUT.VERTICAL` ("vertical")

**File**: [`src/funding/paylater/config.jsx:63`](../src/funding/paylater/config.jsx#L63)

#### **Available Colors**

- `BUTTON_COLOR.WHITE`
- `BUTTON_COLOR.BLACK`
- `BUTTON_COLOR.GOLD`
- `BUTTON_COLOR.BLUE`
- `BUTTON_COLOR.SILVER`

**File**: [`src/funding/paylater/config.jsx:91-97`](../src/funding/paylater/config.jsx#L91-L97)

#### **Dynamic Label Text**

PayLater uses region-specific label text based on funding eligibility:

- **Germany**: "Später Bezahlen" (if paylater.products.paylater.variant === "DE")
- **Spain**: "Paga en 3 plazos" (if payIn3.variant === "ES")
- **Italy**: "Paga in 3 rate" (if payIn3.variant === "IT")
- **France**: "4X PayPal" (if payIn4.variant === "FR")
- **Default**: "Pay in 4" (if payIn4.eligible)
- **Fallback**: "Pay Later"

**File**: [`src/funding/paylater/config.jsx:19-57`](../src/funding/paylater/config.jsx#L19-L57)

#### **Logo Component**

- **Display**: PayPal PP mark + dynamic text label
- **Environment-based**: Web uses `PPLogoExternalImage`, non-web uses `PPLogoInlineSVG`
- **Styling**: Custom CSS scoping applied via imported stylesheet

**File**: [`src/funding/paylater/config.jsx:78-89`](../src/funding/paylater/config.jsx#L78-L89)

### **Test Coverage Analysis**

No dedicated test files found for PayLater configuration.

---

## Venmo Button

### **Supported Flows**

- **File**: [`src/funding/venmo/config.jsx:20`](../src/funding/venmo/config.jsx#L20)
- `BUTTON_FLOW.PURCHASE` (`"purchase"`)
- `BUTTON_FLOW.VAULT_WITHOUT_PURCHASE` (`"vault_without_purchase"`)

### **Eligibility Conditions**

The Venmo button is **eligible** when ALL of the following conditions are met:

#### 1. **Experiment Enablement**

- **Variable**: `experiment.enableVenmo`
- **Condition**: Must NOT be `false`
- **Logic**: If `experiment?.enableVenmo === false`, button is **NOT eligible**

**File**: [`src/funding/venmo/config.jsx:26-28`](../src/funding/venmo/config.jsx#L26-L28)

#### 2. **Shipping Change & Vaultable Conflict**

- **Variables**: `shippingChange`, `displayOnly` array containing `DISPLAY_ONLY_VALUES.VAULTABLE`
- **Condition**: If `shippingChange` is true AND `displayOnly` includes `VAULTABLE`, button is **NOT eligible**
- **Reason**: Shipping change is not supported for native app switch and QR code flows, which are required for vaulting

**File**: [`src/funding/venmo/config.jsx:32-37`](../src/funding/venmo/config.jsx#L32-L37)

#### 3. **Vault Without Purchase Flow**

- **Variables**: `flow`, `experiment.venmoVaultWithoutPurchase`
- **Condition**: If `flow === BUTTON_FLOW.VAULT_WITHOUT_PURCHASE` AND `experiment?.venmoVaultWithoutPurchase !== true`, button is **NOT eligible**
- **Flow Constant**: `BUTTON_FLOW.VAULT_WITHOUT_PURCHASE` = `"vault_without_purchase"`

**Files**: [`src/funding/venmo/config.jsx:39-44`](../src/funding/venmo/config.jsx#L39-L44), [`src/constants/button.js:81`](../src/constants/button.js#L81)

#### 4. **Default Eligibility**

- **Fallback**: Returns `true` if all above conditions pass

**File**: [`src/funding/venmo/config.jsx:46`](../src/funding/venmo/config.jsx#L46)

### **Requirements**

The Venmo button has specific **platform requirements**:

#### **Mobile Platform Requirements**

- **Platform Check**: `platform === PLATFORM.MOBILE`
- **Variables**: `experiment.venmoEnableWebOnNonNativeBrowser`, `experiment.isWebViewEnabled`
- **Non-Native Support Logic**:
  - `isNonNativeSupported` = `experiment?.venmoEnableWebOnNonNativeBrowser === true` OR `experiment?.isWebViewEnabled`
- **Requirements**:
  - `native`: `false` if non-native supported, otherwise `true`
  - `popup`: `false` if non-native supported, otherwise `true`

**File**: [`src/funding/venmo/config.jsx:54-59`](../src/funding/venmo/config.jsx#L54-L59)

#### **Non-Mobile Platform Requirements**

- **Default**: Returns empty object `{}` for desktop platforms

**File**: [`src/funding/venmo/config.jsx:61`](../src/funding/venmo/config.jsx#L61)

### **Style Configuration**

#### **Supported Layouts**

- `BUTTON_LAYOUT.HORIZONTAL` (`"horizontal"`)
- `BUTTON_LAYOUT.VERTICAL` (`"vertical"`)

**File**: [`src/funding/venmo/config.jsx:22`](../src/funding/venmo/config.jsx#L22)

#### **Available Colors**

- `BUTTON_COLOR.BLUE`
- `BUTTON_COLOR.SILVER`
- `BUTTON_COLOR.BLACK`
- `BUTTON_COLOR.WHITE`

**File**: [`src/funding/venmo/config.jsx:80-85`](../src/funding/venmo/config.jsx#L80-L85)

#### **Wallet Menu Display**

- **Function**: `showWalletMenu: () => false`
- **Behavior**: Venmo buttons never show a wallet menu

**File**: [`src/funding/venmo/config.jsx:78`](../src/funding/venmo/config.jsx#L78)

### **Test Coverage Analysis**

#### **Eligibility Tests**

##### **Positive Eligibility Scenarios**:

1. **Basic Eligibility** (lines 26-35): `experiment.enableVenmo: true` -> eligible
2. **Shipping Without Vaultable** (lines 58-65): `shippingChange: true` but no `displayOnly` -> eligible
3. **Vaultable Without Shipping** (lines 67-74): `displayOnly: ['vaultable']` but no `shippingChange` -> eligible
4. **Neither Condition** (lines 76-80): No shipping or vaultable -> eligible
5. **Vault Flow with Feature** (lines 91-101): `VAULT_WITHOUT_PURCHASE` flow with `venmoVaultWithoutPurchase: true` -> eligible

##### **Negative Eligibility Scenarios**:

1. **Disabled Experiment** (lines 37-46): `experiment.enableVenmo: false` -> not eligible
2. **Shipping + Vaultable Conflict** (lines 48-56): Both `shippingChange: true` AND `displayOnly: ['vaultable']` -> not eligible
3. **Vault Flow Without Feature** (lines 82-89): `VAULT_WITHOUT_PURCHASE` flow without `venmoVaultWithoutPurchase` -> not eligible

**File**: [`src/funding/venmo/config.test.js:25-102`](../src/funding/venmo/config.test.js#L25-L102)

#### **Requirements Tests**

##### **Mobile Platform Scenarios**:

1. **WebView Enabled** (lines 105-117): `isWebViewEnabled: true` -> `{native: false, popup: false}`
2. **Non-Native Browser Enabled** (lines 119-131): `venmoEnableWebOnNonNativeBrowser: true` -> `{native: false, popup: false}`
3. **Both Features Disabled** (lines 133-146): Both flags `false` -> `{native: true, popup: true}`

##### **Desktop Platform Scenario**:

1. **Non-Mobile Platform** (lines 148-154): `PLATFORM.DESKTOP` -> `{}` (no requirements)

**File**: [`src/funding/venmo/config.test.js:104-156`](../src/funding/venmo/config.test.js#L104-L156)

#### **Template Rendering Impact**

- **WalletLabel Rendering**: Uses instrument label and logo based on `logoColor` parameter
- **Logo Selection**: Different logo components for web vs non-web environments
- **Styling**: Custom CSS scoping with `wallet-label-venmo` class

**File**: [`src/funding/venmo/template.jsx:23-54`](../src/funding/venmo/template.jsx#L23-L54)
