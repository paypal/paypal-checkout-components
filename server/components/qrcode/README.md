## Node QRCode

The node qrcode repo hasn't been updated in a while: https://github.com/soldair/node-qrcode

We've forked and updated the dependencies: https://github.com/braintree/node-qrcode

To bring in a new version:

1. Clone the [repo](https://github.com/braintree/node-qrcode)
2. Run `npm run build` in the root of that repo
3. Modify the contents of `build/qrcode.js`:

```
// from something like this:
var QRCode = function(t){"use strict";var r,e=function(){return"function"=...

// to export a const like this:
export const QRCode = function(t){"use strict";var r,e=function(){return"function"=...
```

4. Copy the modified contents of `build/qrcode.js` into the `/server/components/qrcode/node-qrcode.js` file
   used by the qrcode middleware.
