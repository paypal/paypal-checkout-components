# Test File

This is a test to see if markdown works.

## User Experience Scenarios

The Venmo payment experience varies significantly based on device type, browser capabilities, experiment configuration, and payment flow requirements. Below are all possible user experience combinations and the conditions that trigger each scenario.

### **Scenario Matrix Overview**

| **Device** | **Browser**    | **Native Support** | **Experiments** | **Flow Type** | **User Experience**   |
| ---------- | -------------- | ------------------ | --------------- | ------------- | --------------------- |
| Mobile     | iOS Safari     | ✓                  | Standard        | Purchase      | **Native App Switch** |
| Mobile     | Android Chrome | ✓                  | Standard        | Purchase      | **Native App Switch** |
| Mobile     | Other browsers | ✗                  | Web Enabled     | Purchase      | **Mobile Web Flow**   |

---

## **Detailed User Experience Scenarios**

### **🔴 Scenario 1: Button Not Shown (Ineligible)**

**Conditions Required:**

- `experiment.enableVenmo === false` **OR**
- `shippingChange === true` AND `displayOnly.includes('vaultable')` **OR**
- `flow === 'vault_without_purchase'` AND `experiment.venmoVaultWithoutPurchase !== true`

**User Experience:**

- Venmo button does not appear in payment options
- User sees other available payment methods (PayPal, Card, etc.)
- No Venmo branding or messaging visible

This should work fine.
