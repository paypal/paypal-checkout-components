# Debugging PayPal Checkout

The following guide explains common ways to debug PayPal Checkout integrations

## Keep your dev console open

PayPal Checkout logs a lot of information to the browser console. You may see errors or useful logs here to help track
down issues with your integration.

All logs from the popup window will automatically appear in the console for the **parent window**. But in certain
browsers, logs will only start appearing after the dev tools are opened for the first time. So remember to **keep the
dev tools open at all times when debugging**.

> **Note:** Always include the **full** set of console logs when raising any issue or bug with `paypal-checkout`.

### Chrome

<img src="./img/chrome-dev-tools-1.png" alt="Chrome Dev Tools 1" width="300"><hr>
<img src="./img/chrome-dev-tools-2.png" alt="Chrome Dev Tools 2" width="300"><hr>

### Safari

<img src="./img/safari-dev-tools-1.png" alt="Safari Dev Tools 1" width="300"><hr>
<img src="./img/safari-dev-tools-2.png" alt="Safari Dev Tools 2" width="300"><hr>
<img src="./img/safari-dev-tools-3.png" alt="Safari Dev Tools 3" width="300"><hr>
<img src="./img/safari-dev-tools-4.png" alt="Safari Dev Tools 4" width="300"><hr>

### Firefox

<img src="./img/firefox-dev-tools-1.png" alt="FireFox Dev Tools 1" width="300"><hr>
<img src="./img/firefox-dev-tools-2.png" alt="Firefox Dev Tools 2" width="300"><hr>

### Internet Explorer

<img src="./img/ie-dev-tools-1.png" alt="IE Dev Tools 1" width="300"><hr>
<img src="./img/ie-dev-tools-2.png" alt="IE Dev Tools 2" width="300"><hr>
