# Monorepo Notes

This doc is just to keep track of some notes as I monorepotize checkout-components.

**_Moving \_\_sdk\_\_\.js with caution_**

- I believe this \_\_sdk\_\_\.js is used by clientsdknodeweb &/or smartcomponentnodeweb, so we may have to make adjustments to those services to account for this.

**_We use checkout-components directly in the dev docs_**

- We grab the compiled JS in the dist folder and use it to display the buttons UI in the dev docs.
- If we move checkout-components to GH Enterprise, this is something to take into consideration to ensure we don't break all the UI examples in the devdocs.
