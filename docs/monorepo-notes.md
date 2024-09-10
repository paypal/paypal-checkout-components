# Monorepo Notes

This doc is just to keep track of some notes as I monorepotize checkout-components.

## Notes/Considerations

**_We use checkout-components directly in the dev docs_**

- We grab the compiled JS in the dist folder and use it to display the buttons UI in the dev docs.
- If we move checkout-components to GH Enterprise, this is something to take into consideration to ensure we don't break all the UI examples in the devdocs.

**_Items left in root_**

- Configs
  - prettierrc & prettierignore
    - It would be good to ensure all packages follow the same formatting standards.
  - .eslintrc.js
    - Code standards should be standardized across all packages.
  - .editorconfig
  - .gitignore
  - .npmrc & .nvmrc
  - .husky/
  - demo/
    - This _could_ go under packages/checkout-components, but I thought it would be cool to expand the demo/ directory into it's own package with more up-to-date demos.
- \_\_sdk\_\_.js
  - This is used by sdk-release, which is used by CSNW.
  - Eventually, we can plan to move this or remove it... but to be safe now, I'll keep it where it is.
- Docs

**_SCNW relies on dist directory_**

- The dist directory is used [by SCNW](https://github.paypal.com/Checkout-R/smartcomponentnodeweb/blob/develop/src/utils/javascriptFileHelpers.ts#L199-L218).
- We can have the dist directoy built at the root of the project...
- Or we can change the path in SCNW to grab it from /packages/checkout-components/dist.

## Future Improvements

**_Move e2e tests to their own package_**

- As of right now, the e2e tests are still in /packages/checkout-components. It would be great to move them into their own package and improve them.

**_Add other components as packages and get rid of sdk-release_**

- This would be a long-term goal, but moving the other packages to this monorepo would be ideal! Eventually, we can get rid of sdk-release.

**_Audit the nx config for ways we can improve the workflow_**

- Nx provides many other ways we can enhance our workflow and CI. We should look for other ways we can improve this monorepo with Nx.
