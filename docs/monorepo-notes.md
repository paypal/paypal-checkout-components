# Monorepo Notes

This doc is just to keep track of some notes as I monorepotize checkout-components.

**_We use checkout-components directly in the dev docs_**

- We grab the compiled JS in the dist folder and use it to display the buttons UI in the dev docs.
- If we move checkout-components to GH Enterprise, this is something to take into consideration to ensure we don't break all the UI examples in the devdocs.

**_Items left in root_**

- prettierrc & prettierignore
  - It would be good to ensure all packages follow the same formatting standards.
- \_\_sdk\_\_.js
  - This is used by sdk-release, which is used by CSNW.
  - Eventually, we can plan to move this or remove it... but to be safe now, I'll keep it where it is.

**_SCNW relies on dist directory_**

- The dist directory is used [by SCNW](https://github.paypal.com/Checkout-R/smartcomponentnodeweb/blob/develop/src/utils/javascriptFileHelpers.ts#L199-L218).
- We can have the dist directoy built at the root of the project...
- Or we can change the path in SCNW to grab it from /packages/checkout-components/dist.
