## <small>4.0.258 (2019-02-22)</small>

* Add fpti logs for button style ([1deff0e](https://github.com/paypal/paypal-checkout/commit/1deff0e))
* Remove payment timeout ([e8ac846](https://github.com/paypal/paypal-checkout/commit/e8ac846))



## <small>4.0.256 (2019-02-06)</small>

* chore(whitelist-apm): Add whitelisted merchants to first increment of APMs (#1010) ([96f70ff](https://github.com/paypal/paypal-checkout/commit/96f70ff)), closes [#1010](https://github.com/paypal/paypal-checkout/issues/1010)



## <small>4.0.255 (2019-02-04)</small>

* fix(funding-prop): Addressing bug when null value passed through funding prop (#1008) ([6152323](https://github.com/paypal/paypal-checkout/commit/6152323)), closes [#1008](https://github.com/paypal/paypal-checkout/issues/1008)



## <small>4.0.254 (2019-02-01)</small>

* fix(inline-guest): Removing hack which always returned an EC token for IG treatments (#1005) ([ee3ab5e](https://github.com/paypal/paypal-checkout/commit/ee3ab5e)), closes [#1005](https://github.com/paypal/paypal-checkout/issues/1005)
* fix(shipping-options): Adding stop-gap for legacy integrated merchants (#1004) ([1f4db0f](https://github.com/paypal/paypal-checkout/commit/1f4db0f)), closes [#1004](https://github.com/paypal/paypal-checkout/issues/1004)
* Only get token from url for fpti when on paypal domain ([b77724d](https://github.com/paypal/paypal-checkout/commit/b77724d))
* Remove demo client id ([234a4de](https://github.com/paypal/paypal-checkout/commit/234a4de))
* chore(whitelist-apm): Enable apm for whitelisted merchants (#1001) ([0647d2c](https://github.com/paypal/paypal-checkout/commit/0647d2c)), closes [#1001](https://github.com/paypal/paypal-checkout/issues/1001)



## <small>4.0.240 (2019-01-09)</small>

*  fix(callback-default-reject): Adding default noop function for `actions.reject` for the onShippingC ([36cbdd9](https://github.com/paypal/paypal-checkout/commit/36cbdd9)), closes [#967](https://github.com/paypal/paypal-checkout/issues/967)
* Add logs for click color and responsive width ([1c5bea2](https://github.com/paypal/paypal-checkout/commit/1c5bea2))
* Add sdkMeta param to each component ([74d4038](https://github.com/paypal/paypal-checkout/commit/74d4038))
* Card interface changes for standalone inline-guest (#977) ([a4160ee](https://github.com/paypal/paypal-checkout/commit/a4160ee)), closes [#977](https://github.com/paypal/paypal-checkout/issues/977)
* Clean up child window logging ([290ae3d](https://github.com/paypal/paypal-checkout/commit/290ae3d))
* Delete implement-checkout.md ([9c63764](https://github.com/paypal/paypal-checkout/commit/9c63764))
* Revert "Enable iframe for bt popup bridge" ([ca28454](https://github.com/paypal/paypal-checkout/commit/ca28454))
* chore(venmo-blacklist): New venmo blacklist items for December (#973) ([473aca8](https://github.com/paypal/paypal-checkout/commit/473aca8)), closes [#973](https://github.com/paypal/paypal-checkout/issues/973)
* chore(venmo): Adding stitchfix and plunderdesign to blacklist (#979) ([a73e4e4](https://github.com/paypal/paypal-checkout/commit/a73e4e4)), closes [#979](https://github.com/paypal/paypal-checkout/issues/979)
* a11y(overlay-dialog): Adding a11y attributes to the overlay (#971) ([1a504dd](https://github.com/paypal/paypal-checkout/commit/1a504dd)), closes [#971](https://github.com/paypal/paypal-checkout/issues/971)
* fix(electron): more robust way of detection (#969) ([4f9a07f](https://github.com/paypal/paypal-checkout/commit/4f9a07f)), closes [#969](https://github.com/paypal/paypal-checkout/issues/969)
* feat(callback-api): moving shipping options patch into payment patch (#852) ([94ce3ab](https://github.com/paypal/paypal-checkout/commit/94ce3ab)), closes [#852](https://github.com/paypal/paypal-checkout/issues/852)



## <small>4.0.234 (2018-11-14)</small>

* chore(commitizen): Add commitizen packages for commit message convention (#943) ([42b2709](https://github.com/paypal/paypal-checkout/commit/42b2709)), closes [#943](https://github.com/paypal/paypal-checkout/issues/943)
* chore(venmo-blacklist): Blacklisting chick-fil-a from venmo (#947) ([3bdad5f](https://github.com/paypal/paypal-checkout/commit/3bdad5f)), closes [#947](https://github.com/paypal/paypal-checkout/issues/947)
* Add ancestry.com to venmo blacklist ([ae45ef9](https://github.com/paypal/paypal-checkout/commit/ae45ef9))
* Add to venmo blacklist ([57e6060](https://github.com/paypal/paypal-checkout/commit/57e6060))
* refactor(publishing): fixing postversion script to push both tags and release commit (#941) ([a528d3d](https://github.com/paypal/paypal-checkout/commit/a528d3d)), closes [#941](https://github.com/paypal/paypal-checkout/issues/941)



## <small>4.0.233 (2018-11-07)</small>

* refactor(device-x-domain-utils): Importing the source for `cross-domain-utils` to preserve flow type ([702c8b7](https://github.com/paypal/paypal-checkout/commit/702c8b7)), closes [#939](https://github.com/paypal/paypal-checkout/issues/939)
* refactor(publishing): post-version script will push to paypal repo (#940) ([b8a932d](https://github.com/paypal/paypal-checkout/commit/b8a932d)), closes [#940](https://github.com/paypal/paypal-checkout/issues/940)



## <small>4.0.232 (2018-11-07)</small>

* chore(package): Updating zoid (#938) ([a1ff39d](https://github.com/paypal/paypal-checkout/commit/a1ff39d)), closes [#938](https://github.com/paypal/paypal-checkout/issues/938)
* refactor(publishing): Splitting up publish/version logic and automating changelog (#913) ([de898c8](https://github.com/paypal/paypal-checkout/commit/de898c8)), closes [#913](https://github.com/paypal/paypal-checkout/issues/913)
* fix(error-focus-closed): Catching the error from the promise (#919) ([d71800e](https://github.com/paypal/paypal-checkout/commit/d71800e)), closes [#919](https://github.com/paypal/paypal-checkout/issues/919)
* fix(resp-container-height): Removing extra space from vertical responsive (#937) ([f51f29f](https://github.com/paypal/paypal-checkout/commit/f51f29f)), closes [#937](https://github.com/paypal/paypal-checkout/issues/937)
*  fix(iframe-standalone): Leveraging cross-domain-utils... Catching use-case for nested iframe inside ([46b6fe8](https://github.com/paypal/paypal-checkout/commit/46b6fe8)), closes [#929](https://github.com/paypal/paypal-checkout/issues/929)
* Add to venmo blacklist ([747fea8](https://github.com/paypal/paypal-checkout/commit/747fea8))
* Add to venmo blacklist ([c2f9913](https://github.com/paypal/paypal-checkout/commit/c2f9913))
* Add to venmo blacklist ([7683935](https://github.com/paypal/paypal-checkout/commit/7683935))



## <small>4.0.228 (2018-10-18)</small>

* feat(a11y-trap-tab): Trapping tab gestures in parent window while popup is enabled (#896) ([41b11f4](https://github.com/paypal/paypal-checkout/commit/41b11f4)), closes [#896](https://github.com/paypal/paypal-checkout/issues/896)
* feat(a11y-close-contrast): Improving the close button visibility in high contrast mode (#898) ([fbf212f](https://github.com/paypal/paypal-checkout/commit/fbf212f)), closes [#898](https://github.com/paypal/paypal-checkout/issues/898)



## <small>4.0.226 (2018-10-17)</small>

* Fix fundingOffered query value ([f8dce25](https://github.com/paypal/paypal-checkout/commit/f8dce25))



## <small>4.0.225 (2018-10-16)</small>

* Add fundingOffered prop to checkout component ([8d997c3](https://github.com/paypal/paypal-checkout/commit/8d997c3))
* Add link to documentation for intranet error. (#888) ([3c744b2](https://github.com/paypal/paypal-checkout/commit/3c744b2)), closes [#888](https://github.com/paypal/paypal-checkout/issues/888)
* Allow non-unique pxp events, use standard transition and state ([e719fc2](https://github.com/paypal/paypal-checkout/commit/e719fc2))
* BOPIS fix (#884) ([fe01368](https://github.com/paypal/paypal-checkout/commit/fe01368)), closes [#884](https://github.com/paypal/paypal-checkout/issues/884)
* Checkout component integration guide ([d887ef3](https://github.com/paypal/paypal-checkout/commit/d887ef3))
* removing urls from bml test (#893) ([1a5a4e0](https://github.com/paypal/paypal-checkout/commit/1a5a4e0)), closes [#893](https://github.com/paypal/paypal-checkout/issues/893)
* Update documentation (#887) ([4ec16ea](https://github.com/paypal/paypal-checkout/commit/4ec16ea)), closes [#887](https://github.com/paypal/paypal-checkout/issues/887)
* Updated package.json repository.url (#880) ([cd80fa3](https://github.com/paypal/paypal-checkout/commit/cd80fa3)), closes [#880](https://github.com/paypal/paypal-checkout/issues/880)
* Updating Venmo Blacklist (#883) ([57e6176](https://github.com/paypal/paypal-checkout/commit/57e6176)), closes [#883](https://github.com/paypal/paypal-checkout/issues/883)



## <small>4.0.224 (2018-10-01)</small>

* Adding domain to Venmo blacklist (#876) ([fa37cc2](https://github.com/paypal/paypal-checkout/commit/fa37cc2)), closes [#876](https://github.com/paypal/paypal-checkout/issues/876)
* make the billing popup scrollable (#873) ([302a1c3](https://github.com/paypal/paypal-checkout/commit/302a1c3)), closes [#873](https://github.com/paypal/paypal-checkout/issues/873)
* Ramp loggernodeweb logs to 100% (#862) ([a32ff77](https://github.com/paypal/paypal-checkout/commit/a32ff77)), closes [#862](https://github.com/paypal/paypal-checkout/issues/862)
* Remove cup screenshot for now ([b59d0dd](https://github.com/paypal/paypal-checkout/commit/b59d0dd))
* temporary remove screenshot test for CUP zh_CN ([1b08863](https://github.com/paypal/paypal-checkout/commit/1b08863))



## <small>4.0.223 (2018-09-26)</small>

* Send correct true/false value for credit throttle to server ([be7aa28](https://github.com/paypal/paypal-checkout/commit/be7aa28))



## <small>4.0.222 (2018-09-26)</small>

* add CUP card for CN (#869) ([36ec179](https://github.com/paypal/paypal-checkout/commit/36ec179)), closes [#869](https://github.com/paypal/paypal-checkout/issues/869)
* Bml funding test (#850) ([648ea55](https://github.com/paypal/paypal-checkout/commit/648ea55)), closes [#850](https://github.com/paypal/paypal-checkout/issues/850)



## <small>4.0.221 (2018-09-20)</small>

* fix the issue that does not show inline guest (#867) ([3b3ebc9](https://github.com/paypal/paypal-checkout/commit/3b3ebc9)), closes [#867](https://github.com/paypal/paypal-checkout/issues/867)
* fix the missing funding icons bug (#868) ([81fe53c](https://github.com/paypal/paypal-checkout/commit/81fe53c)), closes [#868](https://github.com/paypal/paypal-checkout/issues/868)



## <small>4.0.220 (2018-09-19)</small>

* adding more BA merchants to Venmo blacklist (#857) ([b09ddc6](https://github.com/paypal/paypal-checkout/commit/b09ddc6)), closes [#857](https://github.com/paypal/paypal-checkout/issues/857)
* Bml funding test (#850) ([ab881b7](https://github.com/paypal/paypal-checkout/commit/ab881b7)), closes [#850](https://github.com/paypal/paypal-checkout/issues/850)
* only display label "powered by PayPal" when FUNDING.CARD is allowed (#854) ([8ad0418](https://github.com/paypal/paypal-checkout/commit/8ad0418)), closes [#854](https://github.com/paypal/paypal-checkout/issues/854)
* Ramp loggernodeweb logs to 50% (#856) ([e26ade9](https://github.com/paypal/paypal-checkout/commit/e26ade9)), closes [#856](https://github.com/paypal/paypal-checkout/issues/856)
* refactoring Venmo without cookie experiment. Adding a venmo without cookie experiment blacklist. (#8 ([6294723](https://github.com/paypal/paypal-checkout/commit/6294723)), closes [#858](https://github.com/paypal/paypal-checkout/issues/858)
* removing the Venmo button rendering without cookie experiment. (#863) ([c3539ea](https://github.com/paypal/paypal-checkout/commit/c3539ea)), closes [#863](https://github.com/paypal/paypal-checkout/issues/863)
* Revert "Bml funding test" (#859) ([ff990b6](https://github.com/paypal/paypal-checkout/commit/ff990b6)), closes [#859](https://github.com/paypal/paypal-checkout/issues/859) [#855](https://github.com/paypal/paypal-checkout/issues/855) [#858](https://github.com/paypal/paypal-checkout/issues/858) [#854](https://github.com/paypal/paypal-checkout/issues/854) [#856](https://github.com/paypal/paypal-checkout/issues/856) [#857](https://github.com/paypal/paypal-checkout/issues/857) [#850](https://github.com/paypal/paypal-checkout/issues/850)
* Revert "Bml funding test" (#865) ([0549861](https://github.com/paypal/paypal-checkout/commit/0549861)), closes [#865](https://github.com/paypal/paypal-checkout/issues/865) [#863](https://github.com/paypal/paypal-checkout/issues/863) [#859](https://github.com/paypal/paypal-checkout/issues/859) [#860](https://github.com/paypal/paypal-checkout/issues/860)
* Revert "Revert "Bml funding test" (#859)" (#860) ([f3db8c3](https://github.com/paypal/paypal-checkout/commit/f3db8c3)), closes [#859](https://github.com/paypal/paypal-checkout/issues/859) [#860](https://github.com/paypal/paypal-checkout/issues/860)
* fix(button outline): adding button outline to individual card icons. removing from transparent (#855 ([ae25033](https://github.com/paypal/paypal-checkout/commit/ae25033)), closes [#855](https://github.com/paypal/paypal-checkout/issues/855)
* fix(button outline): Moving card props up to containing div (#861) ([585035f](https://github.com/paypal/paypal-checkout/commit/585035f)), closes [#861](https://github.com/paypal/paypal-checkout/issues/861)



## <small>4.0.218 (2018-09-11)</small>

* Add __DEBUG__ compile-time global ([b0f5d78](https://github.com/paypal/paypal-checkout/commit/b0f5d78))
* Add additional protection on checkout render and button child for intranet mode ([68dee44](https://github.com/paypal/paypal-checkout/commit/68dee44))
* Add logging to identify gap between user, geo and browser country ([afcea15](https://github.com/paypal/paypal-checkout/commit/afcea15))
* Ramp loggernodeweb logs to 25% (#851) ([72cce19](https://github.com/paypal/paypal-checkout/commit/72cce19)), closes [#851](https://github.com/paypal/paypal-checkout/issues/851)
* Ramp up new browser locale resolution rule ([02658ab](https://github.com/paypal/paypal-checkout/commit/02658ab))
* Run buttondiff at end of test cycle ([f82c17f](https://github.com/paypal/paypal-checkout/commit/f82c17f))
* fix(button-outline): Adding default browser outline to buttons on focus (#853) ([b37e2a8](https://github.com/paypal/paypal-checkout/commit/b37e2a8)), closes [#853](https://github.com/paypal/paypal-checkout/issues/853)



## <small>4.0.217 (2018-09-04)</small>

* Fix stageUrl prop setting in config ([cb09231](https://github.com/paypal/paypal-checkout/commit/cb09231))
* Point client-side logs at /xoplatform/logger, not /webapps/hermes (#839) ([eca45bf](https://github.com/paypal/paypal-checkout/commit/eca45bf)), closes [#839](https://github.com/paypal/paypal-checkout/issues/839)
* Update grumbler-scripts on publish ([9f78dcc](https://github.com/paypal/paypal-checkout/commit/9f78dcc))



## <small>4.0.216 (2018-08-30)</small>

* (fix)Removing webviews, Edge for IOS, and Firefox for IOS form Venmo button eligibility (#835) ([a0862dd](https://github.com/paypal/paypal-checkout/commit/a0862dd)), closes [#835](https://github.com/paypal/paypal-checkout/issues/835)
* (test):  Add test for rendering button in hidden container. (#825) ([430c6c5](https://github.com/paypal/paypal-checkout/commit/430c6c5)), closes [#825](https://github.com/paypal/paypal-checkout/issues/825)
* Allow full response to be passed through in Component.jsx (#816) ([180dc6f](https://github.com/paypal/paypal-checkout/commit/180dc6f)), closes [#816](https://github.com/paypal/paypal-checkout/issues/816)
* Error out if integrating with minor locked version of sceript on a non-paypal domain ([7c222b3](https://github.com/paypal/paypal-checkout/commit/7c222b3))
* Export logger on paypal domains ([82c5326](https://github.com/paypal/paypal-checkout/commit/82c5326))
* Replacing APM svg images with jsx files and replacing klarna image with sofort (#800) ([c6c8221](https://github.com/paypal/paypal-checkout/commit/c6c8221)), closes [#800](https://github.com/paypal/paypal-checkout/issues/800)
* Updating Venmo blacklist. (#833) ([cc28298](https://github.com/paypal/paypal-checkout/commit/cc28298)), closes [#833](https://github.com/paypal/paypal-checkout/issues/833)
* White Buttons and Tests (#821) ([6f090fd](https://github.com/paypal/paypal-checkout/commit/6f090fd)), closes [#821](https://github.com/paypal/paypal-checkout/issues/821)
* fix(blacklist-gamer-saloon): Adding gamersaloon.com to venmo blacklist (#832) ([ce6f192](https://github.com/paypal/paypal-checkout/commit/ce6f192)), closes [#832](https://github.com/paypal/paypal-checkout/issues/832)
* fix(blacklist-jjill-venmo): Adding jjill.com to venmo blacklist (#834) ([835c0d7](https://github.com/paypal/paypal-checkout/commit/835c0d7)), closes [#834](https://github.com/paypal/paypal-checkout/issues/834)
* fix(missing-uk-cards): Adding Maestro and Discover for en_GB (#826) ([f3cd293](https://github.com/paypal/paypal-checkout/commit/f3cd293)), closes [#826](https://github.com/paypal/paypal-checkout/issues/826)
* fix(venmo-blacklist-qvc): Adding qvc.com to venmo blacklist (#836) ([9a4f475](https://github.com/paypal/paypal-checkout/commit/9a4f475)), closes [#836](https://github.com/paypal/paypal-checkout/issues/836)
* fix(white-uk-screenshot): Adding missing screenshot for white UK buttons (#837) ([9eda02e](https://github.com/paypal/paypal-checkout/commit/9eda02e)), closes [#837](https://github.com/paypal/paypal-checkout/issues/837)



## <small>4.0.215 (2018-08-23)</small>

* Ramping to 10% for venmo_uncookied_render (#813) ([f9dcb64](https://github.com/paypal/paypal-checkout/commit/f9dcb64)), closes [#813](https://github.com/paypal/paypal-checkout/issues/813)
* fix(pt-es-installment-label): Adding installment label to vertical layout (#814) ([0f7c623](https://github.com/paypal/paypal-checkout/commit/0f7c623)), closes [#814](https://github.com/paypal/paypal-checkout/issues/814)



## <small>4.0.214 (2018-08-21)</small>

* Add grumbler-scripts type declarations ([a44fd5e](https://github.com/paypal/paypal-checkout/commit/a44fd5e))
* add missing content for inline guest (#783) ([2edb466](https://github.com/paypal/paypal-checkout/commit/2edb466)), closes [#783](https://github.com/paypal/paypal-checkout/issues/783)
* Bump memory threshold ([537bca7](https://github.com/paypal/paypal-checkout/commit/537bca7))
* Experiment to improve browser locale resolution ([4c8e48e](https://github.com/paypal/paypal-checkout/commit/4c8e48e))
* Experimenting with ramping presentment of Venmo without a cookie (#809) ([f57822a](https://github.com/paypal/paypal-checkout/commit/f57822a)), closes [#809](https://github.com/paypal/paypal-checkout/issues/809)
* Fleisher white button variants (#796) ([e21d4c7](https://github.com/paypal/paypal-checkout/commit/e21d4c7)), closes [#796](https://github.com/paypal/paypal-checkout/issues/796)
* Remove paypal-braintree-web-client ([7020457](https://github.com/paypal/paypal-checkout/commit/7020457))
* Removing searsoutlet.com from venmo blacklist (#806) ([8ce23f5](https://github.com/paypal/paypal-checkout/commit/8ce23f5)), closes [#806](https://github.com/paypal/paypal-checkout/issues/806)
* Reverting PR #796 for failing during snapshot tests (#811) ([a5861bd](https://github.com/paypal/paypal-checkout/commit/a5861bd)), closes [#796](https://github.com/paypal/paypal-checkout/issues/796) [#811](https://github.com/paypal/paypal-checkout/issues/811)
* feat(callback-api): Adding `onShippingChange` callback prop (#766) ([abfd642](https://github.com/paypal/paypal-checkout/commit/abfd642)), closes [#766](https://github.com/paypal/paypal-checkout/issues/766)
* feat(zapbuy-blacklist): Adding `app.zapbuy.it` to the Venmo blacklist (#795) ([f1b0aa4](https://github.com/paypal/paypal-checkout/commit/f1b0aa4)), closes [#795](https://github.com/paypal/paypal-checkout/issues/795)
* fix(es-installments-label): New label text for installment period in es_MX (#808) ([5303f7d](https://github.com/paypal/paypal-checkout/commit/5303f7d)), closes [#808](https://github.com/paypal/paypal-checkout/issues/808)
* fix(overlay): Adding more contrast to the overlays (#780) ([2034656](https://github.com/paypal/paypal-checkout/commit/2034656)), closes [#780](https://github.com/paypal/paypal-checkout/issues/780)
* Feature: Inline guest (#758) ([e1ddaeb](https://github.com/paypal/paypal-checkout/commit/e1ddaeb)), closes [#758](https://github.com/paypal/paypal-checkout/issues/758)



## <small>4.0.213 (2018-08-09)</small>

* Coerce accessToken string to object ([9458f28](https://github.com/paypal/paypal-checkout/commit/9458f28))
* Fix flow ([512ef7f](https://github.com/paypal/paypal-checkout/commit/512ef7f))
* Only use babel-browser for src ([bd04033](https://github.com/paypal/paypal-checkout/commit/bd04033))
* Update venmo blacklist ([11c9f5e](https://github.com/paypal/paypal-checkout/commit/11c9f5e))



## <small>4.0.212 (2018-08-07)</small>

* Adding p24 and zimpler payment methods for PL,FI countries (#745) ([0cf3eae](https://github.com/paypal/paypal-checkout/commit/0cf3eae)), closes [#745](https://github.com/paypal/paypal-checkout/issues/745)
* remove input  mutation (#760) ([878cd11](https://github.com/paypal/paypal-checkout/commit/878cd11)), closes [#760](https://github.com/paypal/paypal-checkout/issues/760)
* Revert "APM blacklisting functionality" (#777) ([32b8329](https://github.com/paypal/paypal-checkout/commit/32b8329)), closes [#777](https://github.com/paypal/paypal-checkout/issues/777)
* Switch api auth url to xoonboarding ([1e9c41f](https://github.com/paypal/paypal-checkout/commit/1e9c41f))
* Update venmo blacklist ([e28e9e0](https://github.com/paypal/paypal-checkout/commit/e28e9e0))
* fix(config): Removing ELV from horizontal layouts (#771) ([671c761](https://github.com/paypal/paypal-checkout/commit/671c761)), closes [#771](https://github.com/paypal/paypal-checkout/issues/771)



## <small>4.0.211 (2018-07-24)</small>

* v2 order api (#761) ([748e0ee](https://github.com/paypal/paypal-checkout/commit/748e0ee)), closes [#761](https://github.com/paypal/paypal-checkout/issues/761)
* fix(redirect): Fixing spinner loop when calling `actions.redirect` in `onCancel` (#764) ([30fd0f5](https://github.com/paypal/paypal-checkout/commit/30fd0f5)), closes [#764](https://github.com/paypal/paypal-checkout/issues/764)



## <small>4.0.209 (2018-07-20)</small>

* Revert "Point client-side logs at /xoplatform/logger, not /webapps/hermes (#757)" ([4b0d62c](https://github.com/paypal/paypal-checkout/commit/4b0d62c)), closes [#757](https://github.com/paypal/paypal-checkout/issues/757)



## <small>4.0.208 (2018-07-19)</small>

* donot support popup for edge on ios -_- (#759) ([0daf768](https://github.com/paypal/paypal-checkout/commit/0daf768)), closes [#759](https://github.com/paypal/paypal-checkout/issues/759)
* Fix venmo filter logic ([f053dba](https://github.com/paypal/paypal-checkout/commit/f053dba))



## <small>4.0.207 (2018-07-19)</small>

* avoiding changes to package.json when doing an `npm install` ([a4d1f33](https://github.com/paypal/paypal-checkout/commit/a4d1f33))
* Point client-side logs at /xoplatform/logger, not /webapps/hermes (#757) ([092f9ba](https://github.com/paypal/paypal-checkout/commit/092f9ba)), closes [#757](https://github.com/paypal/paypal-checkout/issues/757)
* Remove input mutation from funding decorator ([90e834f](https://github.com/paypal/paypal-checkout/commit/90e834f))
* Update ie-intranet.md (#755) ([d86b465](https://github.com/paypal/paypal-checkout/commit/d86b465)), closes [#755](https://github.com/paypal/paypal-checkout/issues/755)
* feat(credit): PayPal Credit button will use DE logo for DE locales (#697) ([bf25778](https://github.com/paypal/paypal-checkout/commit/bf25778)), closes [#697](https://github.com/paypal/paypal-checkout/issues/697)
* fix(redirect): Fixing `actions.redirect` from within iOS webviews. (#753) ([7040c0e](https://github.com/paypal/paypal-checkout/commit/7040c0e)), closes [#753](https://github.com/paypal/paypal-checkout/issues/753)



## <small>4.0.206 (2018-07-17)</small>

* Reverting https://github.com/paypal/paypal-checkout/pull/689/ as it's causing log abnormalities in p ([bbf9fd6](https://github.com/paypal/paypal-checkout/commit/bbf9fd6)), closes [#754](https://github.com/paypal/paypal-checkout/issues/754)



## <small>4.0.205 (2018-07-16)</small>

* adding `getPaymentDetails` to check the state from Checkout Apps (#737) ([834801d](https://github.com/paypal/paypal-checkout/commit/834801d)), closes [#737](https://github.com/paypal/paypal-checkout/issues/737)
* adding sofort to countries AT, BE, ES, IT, NL and logo change (#726) ([e874408](https://github.com/paypal/paypal-checkout/commit/e874408)), closes [#726](https://github.com/paypal/paypal-checkout/issues/726)
* APM blacklisting functionality (#748) ([14f2f25](https://github.com/paypal/paypal-checkout/commit/14f2f25)), closes [#748](https://github.com/paypal/paypal-checkout/issues/748)
* APM blacklisting functionality (#748) ([d2581df](https://github.com/paypal/paypal-checkout/commit/d2581df)), closes [#748](https://github.com/paypal/paypal-checkout/issues/748)
* APMs should not be showing in horizontal layout (#717) ([4be1416](https://github.com/paypal/paypal-checkout/commit/4be1416)), closes [#717](https://github.com/paypal/paypal-checkout/issues/717)
* Force iframe flow for MacOS CNA (Captive Network Assistant / Captive Portal) (#710) ([1a813eb](https://github.com/paypal/paypal-checkout/commit/1a813eb)), closes [#710](https://github.com/paypal/paypal-checkout/issues/710)
* gql query for epm to enable card (#720) ([9c4a406](https://github.com/paypal/paypal-checkout/commit/9c4a406)), closes [#720](https://github.com/paypal/paypal-checkout/issues/720)
* merchant venmo blacklist (#751) ([7e350b5](https://github.com/paypal/paypal-checkout/commit/7e350b5)), closes [#751](https://github.com/paypal/paypal-checkout/issues/751)
* new blacklists (#746) ([5551384](https://github.com/paypal/paypal-checkout/commit/5551384)), closes [#746](https://github.com/paypal/paypal-checkout/issues/746)
* Point client-side logs at /xoplatform/logger, not /webapps/hermes (#689) ([b484fce](https://github.com/paypal/paypal-checkout/commit/b484fce)), closes [#689](https://github.com/paypal/paypal-checkout/issues/689)
* Update browser compatibility ([7518a7d](https://github.com/paypal/paypal-checkout/commit/7518a7d))
* Use jsx to programatically generate svgs for button logos (#730) ([e6b57ff](https://github.com/paypal/paypal-checkout/commit/e6b57ff)), closes [#730](https://github.com/paypal/paypal-checkout/issues/730)
* feat(iframe): Use the iFrame for all standalone apps; native and non-native (#747) ([ed97181](https://github.com/paypal/paypal-checkout/commit/ed97181)), closes [#747](https://github.com/paypal/paypal-checkout/issues/747)
* feat(label): Label support for vertical PayPal button (#696) ([04f71fb](https://github.com/paypal/paypal-checkout/commit/04f71fb)), closes [#696](https://github.com/paypal/paypal-checkout/issues/696)
* style: Making the linter happy with colon spacing and compatibility errors (#738) ([7d0cef7](https://github.com/paypal/paypal-checkout/commit/7d0cef7)), closes [#738](https://github.com/paypal/paypal-checkout/issues/738)
* fix(locale): Changing translations for BR/MX installment labels (#714) ([5cb3286](https://github.com/paypal/paypal-checkout/commit/5cb3286)), closes [#714](https://github.com/paypal/paypal-checkout/issues/714)



## <small>4.0.204 (2018-06-15)</small>

* Fixing tests (#716) ([57e4740](https://github.com/paypal/paypal-checkout/commit/57e4740)), closes [#716](https://github.com/paypal/paypal-checkout/issues/716)
* Update config.js (#702) ([812aefe](https://github.com/paypal/paypal-checkout/commit/812aefe)), closes [#702](https://github.com/paypal/paypal-checkout/issues/702)
* Updating config (#704) ([4d60abd](https://github.com/paypal/paypal-checkout/commit/4d60abd)), closes [#704](https://github.com/paypal/paypal-checkout/issues/704)
* fix(config): Disabling Venmo checkout for `getcargo.today` (#713) ([7803816](https://github.com/paypal/paypal-checkout/commit/7803816)), closes [#713](https://github.com/paypal/paypal-checkout/issues/713)
* feat(button): Support for SOFORT button (#692) ([f2016c9](https://github.com/paypal/paypal-checkout/commit/f2016c9)), closes [#692](https://github.com/paypal/paypal-checkout/issues/692)



## <small>4.0.203 (2018-05-29)</small>

* (docs): Revise upgrade doc (#690) ([188fe7f](https://github.com/paypal/paypal-checkout/commit/188fe7f)), closes [#690](https://github.com/paypal/paypal-checkout/issues/690)
* adding dist file to .flowconfig ignore ([88cb73a](https://github.com/paypal/paypal-checkout/commit/88cb73a))
* fixing flow config ([ac41315](https://github.com/paypal/paypal-checkout/commit/ac41315))
* Inlined card fields (#670) ([3faf421](https://github.com/paypal/paypal-checkout/commit/3faf421)), closes [#670](https://github.com/paypal/paypal-checkout/issues/670)
* Ramping experiment down to zero (#693) ([394fa6c](https://github.com/paypal/paypal-checkout/commit/394fa6c)), closes [#693](https://github.com/paypal/paypal-checkout/issues/693)
* Update config.js (#694) ([9a9d889](https://github.com/paypal/paypal-checkout/commit/9a9d889)), closes [#694](https://github.com/paypal/paypal-checkout/issues/694)
* chore: add webpack dev server command to build and watch checkout code (#683) ([085aecd](https://github.com/paypal/paypal-checkout/commit/085aecd)), closes [#683](https://github.com/paypal/paypal-checkout/issues/683)



## <small>4.0.202 (2018-05-07)</small>

* Make stage url configurable ([b0c4ba9](https://github.com/paypal/paypal-checkout/commit/b0c4ba9))
* Use stage and stageurl from props in child ([1084838](https://github.com/paypal/paypal-checkout/commit/1084838))



## <small>4.0.201 (2018-05-04)</small>

* Remove flow from globals.js ([1ccee21](https://github.com/paypal/paypal-checkout/commit/1ccee21))



## <small>4.0.200 (2018-05-04)</small>

* Add warning for object assign bad polyfill ([971c5ab](https://github.com/paypal/paypal-checkout/commit/971c5ab))
* Do not try to deserialize json for build vars ([d922b5b](https://github.com/paypal/paypal-checkout/commit/d922b5b))
* Edge stability fixes ([1e833d3](https://github.com/paypal/paypal-checkout/commit/1e833d3))
* Fresh install on fastpublish ([6b0218e](https://github.com/paypal/paypal-checkout/commit/6b0218e))
* Include globals in __sdk__.js ([bc62ba7](https://github.com/paypal/paypal-checkout/commit/bc62ba7))
* Namespace and export globals ([71563d6](https://github.com/paypal/paypal-checkout/commit/71563d6))
* Remove package-lock ([084191c](https://github.com/paypal/paypal-checkout/commit/084191c))
* Shipping Options changes (#667) ([9b903b0](https://github.com/paypal/paypal-checkout/commit/9b903b0)), closes [#667](https://github.com/paypal/paypal-checkout/issues/667)
* Upgrade common client ([a8b8a06](https://github.com/paypal/paypal-checkout/commit/a8b8a06))
* white logos, spl css for alt pay btns (#663) ([a2c2feb](https://github.com/paypal/paypal-checkout/commit/a2c2feb)), closes [#663](https://github.com/paypal/paypal-checkout/issues/663)



## <small>4.0.199 (2018-04-26)</small>

* Revert "Upgrade common client" ([a76a57c](https://github.com/paypal/paypal-checkout/commit/a76a57c))



## <small>4.0.198 (2018-04-25)</small>

* Fix doc typos ([a076351](https://github.com/paypal/paypal-checkout/commit/a076351))
* Upgrade common client ([c73a473](https://github.com/paypal/paypal-checkout/commit/c73a473))



## <small>4.0.197 (2018-04-24)</small>

* Log browser for button render ([933b34e](https://github.com/paypal/paypal-checkout/commit/933b34e))



## <small>4.0.196 (2018-04-24)</small>

* Add logging for button style ([8e55d13](https://github.com/paypal/paypal-checkout/commit/8e55d13))
* Add to venmo blacklist ([6f64ff6](https://github.com/paypal/paypal-checkout/commit/6f64ff6))
* Add to venmo blacklist ([25cc9b7](https://github.com/paypal/paypal-checkout/commit/25cc9b7))
* Add to venmo blacklist ([c76e3bf](https://github.com/paypal/paypal-checkout/commit/c76e3bf))
* Better stringifyError and consistent use ([2f1b6e9](https://github.com/paypal/paypal-checkout/commit/2f1b6e9))
* Do not expose get and execute rest payment functions ([c7f5c87](https://github.com/paypal/paypal-checkout/commit/c7f5c87))
* Flow fixes ([0c1d3fc](https://github.com/paypal/paypal-checkout/commit/0c1d3fc))
* Return promise from renderTo hack ([358b28b](https://github.com/paypal/paypal-checkout/commit/358b28b))
* Upgrade flow ([78afff9](https://github.com/paypal/paypal-checkout/commit/78afff9))
* Walk up element tree to find parent element to base button size on ([338781c](https://github.com/paypal/paypal-checkout/commit/338781c))



## <small>4.0.195 (2018-04-18)</small>

* Locale fix take two ([0795806](https://github.com/paypal/paypal-checkout/commit/0795806))
* Revert "Default to browser locale for credit experiment eligibility" ([3cd25c2](https://github.com/paypal/paypal-checkout/commit/3cd25c2))



## <small>4.0.194 (2018-04-18)</small>

* Default to browser locale for credit experiment eligibility ([dc3e600](https://github.com/paypal/paypal-checkout/commit/dc3e600))



## <small>4.0.193 (2018-04-18)</small>

* Upgrade to latest shared client ([a918075](https://github.com/paypal/paypal-checkout/commit/a918075))



## <small>4.0.192 (2018-04-17)</small>

* changing stage ports to test on paypal staging env (#656) ([775810f](https://github.com/paypal/paypal-checkout/commit/775810f)), closes [#656](https://github.com/paypal/paypal-checkout/issues/656)
* enable alt pay button only for commit=true (#654) ([5aa15f3](https://github.com/paypal/paypal-checkout/commit/5aa15f3)), closes [#654](https://github.com/paypal/paypal-checkout/issues/654)
* Use new __sdk__.js format ([5df47c1](https://github.com/paypal/paypal-checkout/commit/5df47c1))



## <small>4.0.191 (2018-04-11)</small>

* Add meta object for both button and checkout components ([c7c52b9](https://github.com/paypal/paypal-checkout/commit/c7c52b9))
* Upgrade hi-base32 ([e02b76a](https://github.com/paypal/paypal-checkout/commit/e02b76a))



## <small>4.0.190 (2018-04-11)</small>

* Use commonjs export for __sdk__.js ([869cdf2](https://github.com/paypal/paypal-checkout/commit/869cdf2))



## <small>4.0.189 (2018-04-11)</small>

* Add __sdk__.js in package.json ([bb6425e](https://github.com/paypal/paypal-checkout/commit/bb6425e))



## <small>4.0.188 (2018-04-11)</small>

* Add __sdk__.js ([f91c4f5](https://github.com/paypal/paypal-checkout/commit/f91c4f5))
* Add to venmo blacklist ([37546a5](https://github.com/paypal/paypal-checkout/commit/37546a5))
* alt pay button: url config (#652) ([89c793c](https://github.com/paypal/paypal-checkout/commit/89c793c)), closes [#652](https://github.com/paypal/paypal-checkout/issues/652)
* Point to web-client declarations ([9f05c44](https://github.com/paypal/paypal-checkout/commit/9f05c44))



## <small>4.0.187 (2018-04-04)</small>

* Add spacing to RU checkout label ([28e8a14](https://github.com/paypal/paypal-checkout/commit/28e8a14))
* Fix typo in config ([f328dfb](https://github.com/paypal/paypal-checkout/commit/f328dfb))
* Underline continue link, not entire container ([55104a2](https://github.com/paypal/paypal-checkout/commit/55104a2))



## <small>4.0.186 (2018-04-02)</small>

* Accessibility fixes for close button ([bddf347](https://github.com/paypal/paypal-checkout/commit/bddf347))
* Add HowTo Integration Videos (#642) ([fe64f3a](https://github.com/paypal/paypal-checkout/commit/fe64f3a)), closes [#642](https://github.com/paypal/paypal-checkout/issues/642)
* Add to venmo blacklist ([fbe2f82](https://github.com/paypal/paypal-checkout/commit/fbe2f82))
* Add underline to continue link ([3163e7f](https://github.com/paypal/paypal-checkout/commit/3163e7f))
* Altpay (#638) ([6e52a0d](https://github.com/paypal/paypal-checkout/commit/6e52a0d)), closes [#638](https://github.com/paypal/paypal-checkout/issues/638)
* Better type declarations for button props ([17f7aaa](https://github.com/paypal/paypal-checkout/commit/17f7aaa))
* Lock babel-eslint to working version ([5363927](https://github.com/paypal/paypal-checkout/commit/5363927))
* Log errors and warnings silently (#643) ([1a1a451](https://github.com/paypal/paypal-checkout/commit/1a1a451)), closes [#643](https://github.com/paypal/paypal-checkout/issues/643) [#548](https://github.com/paypal/paypal-checkout/issues/548)
* Remove Object.assign polyfill ([b78a3a4](https://github.com/paypal/paypal-checkout/commit/b78a3a4))



## <small>4.0.185 (2018-03-23)</small>

* Add electron check to popup support check ([5e41ef7](https://github.com/paypal/paypal-checkout/commit/5e41ef7))
* Only call isCreditDualEligible once ([e4d8e56](https://github.com/paypal/paypal-checkout/commit/e4d8e56))



## <small>4.0.184 (2018-03-21)</small>

* Add another venmo blacklisted domain ([20b1c3b](https://github.com/paypal/paypal-checkout/commit/20b1c3b))
* Persist throttle percentiles for each experiment ([fe1a1ca](https://github.com/paypal/paypal-checkout/commit/fe1a1ca))
* Use constants for throttle groups ([6c80119](https://github.com/paypal/paypal-checkout/commit/6c80119))



## <small>4.0.183 (2018-03-19)</small>

* Only allow logs for started experiments ([555b137](https://github.com/paypal/paypal-checkout/commit/555b137))



## <small>4.0.182 (2018-03-19)</small>

* Make sure credit experiment logging includes button session id ([272f259](https://github.com/paypal/paypal-checkout/commit/272f259))
* Remove actions.order ([6e16113](https://github.com/paypal/paypal-checkout/commit/6e16113))
* Remove postinstall from publish script ([531b69e](https://github.com/paypal/paypal-checkout/commit/531b69e))



## <small>4.0.181 (2018-03-15)</small>

* Add a click log to credit throttle ([8646867](https://github.com/paypal/paypal-checkout/commit/8646867))
* Better typing for throttle objects ([7117551](https://github.com/paypal/paypal-checkout/commit/7117551))
* Use original onKey for ready ([69f8188](https://github.com/paypal/paypal-checkout/commit/69f8188))



## <small>4.0.180 (2018-03-13)</small>

* Fix country eligibility check for credit experiment ([ec38f51](https://github.com/paypal/paypal-checkout/commit/ec38f51))
* Remove extraneous function bind check ([fe6a65f](https://github.com/paypal/paypal-checkout/commit/fe6a65f))



## <small>4.0.179 (2018-03-13)</small>

* Add assertions for version being passed in url and window name ([1646120](https://github.com/paypal/paypal-checkout/commit/1646120))
* Add more warnings for broken library behavior ([f6161ae](https://github.com/paypal/paypal-checkout/commit/f6161ae))
* Add new venmo blacklisted sites ([5d4012d](https://github.com/paypal/paypal-checkout/commit/5d4012d))
* Add test case for new prop which is unknown to child ([8c86637](https://github.com/paypal/paypal-checkout/commit/8c86637))
* Add tests for button server-side render in node env ([f88fb27](https://github.com/paypal/paypal-checkout/commit/f88fb27))
* Allow passing in a filename for screenshot button configs ([30274cd](https://github.com/paypal/paypal-checkout/commit/30274cd))
* Better error messaging for multiple load ([99c3322](https://github.com/paypal/paypal-checkout/commit/99c3322))
* Disable sandbox prefill login ([8b216e2](https://github.com/paypal/paypal-checkout/commit/8b216e2))
* Do not disable iframe mode for checkout after onAuthorize and onCancel ([cc2f28f](https://github.com/paypal/paypal-checkout/commit/cc2f28f))
* Do not hard-code width of modal message ([830eb40](https://github.com/paypal/paypal-checkout/commit/830eb40))
* Enable automatic dual-credit button experiment ([2d77d73](https://github.com/paypal/paypal-checkout/commit/2d77d73))
* Fail earlier for any button diff errors ([cbe72fc](https://github.com/paypal/paypal-checkout/commit/cbe72fc))
* Fix overlay modal position ([5808f36](https://github.com/paypal/paypal-checkout/commit/5808f36))
* Fix race condition for meta listener ([07d2365](https://github.com/paypal/paypal-checkout/commit/07d2365))
* Fix webpack filename assertion ([9d6409d](https://github.com/paypal/paypal-checkout/commit/9d6409d))
* Include paypal-braintree-web-client and attach button to public api ([db8e5ad](https://github.com/paypal/paypal-checkout/commit/db8e5ad))
* Increase screenshot jasmine timeout ([7e7fc0b](https://github.com/paypal/paypal-checkout/commit/7e7fc0b))
* Manually bump to v4.0.178 to match rollback version ([62a167d](https://github.com/paypal/paypal-checkout/commit/62a167d))
* More specific imports for button render path ([7db6f96](https://github.com/paypal/paypal-checkout/commit/7db6f96))
* New PayPal languages for CZ, FI, GR, HU, SK (#619) ([717a176](https://github.com/paypal/paypal-checkout/commit/717a176)), closes [#619](https://github.com/paypal/paypal-checkout/issues/619)
* Only run credit test for US locale ([6d9a452](https://github.com/paypal/paypal-checkout/commit/6d9a452))
* Only use WebpackPromiseShimPlugin when chunking is enabled ([c9f4a9a](https://github.com/paypal/paypal-checkout/commit/c9f4a9a))
* small typo on the Reactjs implementation (#622) ([0907cda](https://github.com/paypal/paypal-checkout/commit/0907cda)), closes [#622](https://github.com/paypal/paypal-checkout/issues/622)
* Switch instanceof to typeof for function checks ([58e0ad4](https://github.com/paypal/paypal-checkout/commit/58e0ad4))
* Treat lib build as minor version ([360c93a](https://github.com/paypal/paypal-checkout/commit/360c93a))
* Use Component.xprops where possible ([3a63ae4](https://github.com/paypal/paypal-checkout/commit/3a63ae4))
* Use webpack config builder for karma ([fb4cf88](https://github.com/paypal/paypal-checkout/commit/fb4cf88))



## <small>4.0.176 (2018-02-16)</small>

* Fix versioning ([9738520](https://github.com/paypal/paypal-checkout/commit/9738520))



## <small>4.0.175 (2018-02-15)</small>

* Remove flow-typed from postinstall ([da61749](https://github.com/paypal/paypal-checkout/commit/da61749))



## <small>4.0.174 (2018-02-15)</small>

* Add checkout.button.v4.js, begin lazy-loading refactor ([e19a65e](https://github.com/paypal/paypal-checkout/commit/e19a65e))
* Add dist and node_modules to .eslintignore ([cec8445](https://github.com/paypal/paypal-checkout/commit/cec8445))
* Add paypal.logFundingEligibility ([a03fb39](https://github.com/paypal/paypal-checkout/commit/a03fb39))
* Add shipping options and risk tracking to client side payment api ([feb98c7](https://github.com/paypal/paypal-checkout/commit/feb98c7))
* Add support for optional chunking in webpack builds ([15cf4b7](https://github.com/paypal/paypal-checkout/commit/15cf4b7))
* Add title to iframe overlay container ([c8fbad1](https://github.com/paypal/paypal-checkout/commit/c8fbad1))
* Add webpack base config ([97e2494](https://github.com/paypal/paypal-checkout/commit/97e2494))
* Add webpack-base task to build just checkout.js ([8f8dca0](https://github.com/paypal/paypal-checkout/commit/8f8dca0))
* Bump complexity limit ([5e410f0](https://github.com/paypal/paypal-checkout/commit/5e410f0))
* Clean up unused dependencies ([70af5c3](https://github.com/paypal/paypal-checkout/commit/70af5c3))
* Correct PayerID mapping in return uri for NativeXO (#586) ([f16af1c](https://github.com/paypal/paypal-checkout/commit/f16af1c)), closes [#586](https://github.com/paypal/paypal-checkout/issues/586)
* Enable ModuleConcatenationPlugin ([ed723b9](https://github.com/paypal/paypal-checkout/commit/ed723b9))
* Ensure eslint is applied to jsx file ([21c2398](https://github.com/paypal/paypal-checkout/commit/21c2398))
* Env fixes ([f2173f6](https://github.com/paypal/paypal-checkout/commit/f2173f6))
* ES6ify and flow-type webpack config ([b5a1dfd](https://github.com/paypal/paypal-checkout/commit/b5a1dfd))
* Fix onCancel for Checkout to call even with no token ([a5ad16a](https://github.com/paypal/paypal-checkout/commit/a5ad16a))
* Move from gulp to npm scripts ([b3f4b48](https://github.com/paypal/paypal-checkout/commit/b3f4b48))
* Refactor to group config and constants avoid deep nested directories ([f38eb61](https://github.com/paypal/paypal-checkout/commit/f38eb61))
* Remove flow and babel from build step ([2a14cc6](https://github.com/paypal/paypal-checkout/commit/2a14cc6))
* Support popupBridge onCancel ([ac2a9ea](https://github.com/paypal/paypal-checkout/commit/ac2a9ea))
* Switch interface back to non-lazy mode ([4f290a6](https://github.com/paypal/paypal-checkout/commit/4f290a6))
* Use Object.assign when available ([31b13c1](https://github.com/paypal/paypal-checkout/commit/31b13c1))
* Use qs in webpack config ([7a4e946](https://github.com/paypal/paypal-checkout/commit/7a4e946))
* Use webpack-promise-shim-plugin to enable lazy loading in older browsers ([770e38f](https://github.com/paypal/paypal-checkout/commit/770e38f))



## <small>4.0.173 (2018-01-16)</small>

* Add jcb logo ([7434725](https://github.com/paypal/paypal-checkout/commit/7434725))
* Add more venmo blacklists ([8601c3b](https://github.com/paypal/paypal-checkout/commit/8601c3b))
* Fixes for params passed through popup bridge ([c4656a7](https://github.com/paypal/paypal-checkout/commit/c4656a7))
* Improve logo size ([b68034f](https://github.com/paypal/paypal-checkout/commit/b68034f))
* Raise test memory ([43ef7a0](https://github.com/paypal/paypal-checkout/commit/43ef7a0))



## <small>4.0.172 (2018-01-10)</small>

* Add actions.order.get and actions.order.capture ([51e3a2b](https://github.com/paypal/paypal-checkout/commit/51e3a2b))
* Add rest bindings for payment and order api get, capture, execute ([8e7a213](https://github.com/paypal/paypal-checkout/commit/8e7a213))
* Allow rendering checkout to any port on localhost ([a011928](https://github.com/paypal/paypal-checkout/commit/a011928))
* Enable ideal button and point to alt pay url ([c5861e7](https://github.com/paypal/paypal-checkout/commit/c5861e7))
* Fix domain setting hostname lookup ([20528a4](https://github.com/paypal/paypal-checkout/commit/20528a4))
* Fix logger to prioritize token as context id, when available ([a3f6c86](https://github.com/paypal/paypal-checkout/commit/a3f6c86))
* Memoize props.payment to avoid double call for popup blocker case ([68d090a](https://github.com/paypal/paypal-checkout/commit/68d090a))
* Only call onError if present ([e8a8cea](https://github.com/paypal/paypal-checkout/commit/e8a8cea))
* Update performance.md ([362401d](https://github.com/paypal/paypal-checkout/commit/362401d))
* Update performance.md ([2a6c710](https://github.com/paypal/paypal-checkout/commit/2a6c710))



## <small>4.0.171 (2017-12-16)</small>

* Fix sandbox credential typer to only trigger on page load ([ee5e992](https://github.com/paypal/paypal-checkout/commit/ee5e992))



## <small>4.0.170 (2017-12-15)</small>

* Prefill credentials on sandbox ([a74ced3](https://github.com/paypal/paypal-checkout/commit/a74ced3))



## <small>4.0.169 (2017-12-12)</small>

* Add demo_sandbox_client_id and demo_production_client_id ([3cc440d](https://github.com/paypal/paypal-checkout/commit/3cc440d))
* Export actions.request in onAuthorize ([56b03ad](https://github.com/paypal/paypal-checkout/commit/56b03ad))



## <small>4.0.168 (2017-12-08)</small>

* (readme): Add Create REst application video (#547) ([775c2cb](https://github.com/paypal/paypal-checkout/commit/775c2cb)), closes [#547](https://github.com/paypal/paypal-checkout/issues/547)
* Add extra experiment instrumentation ([b8238e5](https://github.com/paypal/paypal-checkout/commit/b8238e5))
* Add new ELV logo ([92075ca](https://github.com/paypal/paypal-checkout/commit/92075ca))
* Allow more than four card buttons ([f3874f7](https://github.com/paypal/paypal-checkout/commit/f3874f7))
* Better version-matching logic for child windows ([cba487c](https://github.com/paypal/paypal-checkout/commit/cba487c))
* Config cleanup ([7c75e7a](https://github.com/paypal/paypal-checkout/commit/7c75e7a))
* Do not destroy button for onAuthorize failures ([471fcec](https://github.com/paypal/paypal-checkout/commit/471fcec))
* Fix api calls from file protocol pages ([fb52607](https://github.com/paypal/paypal-checkout/commit/fb52607))
* Fix max width for card logo ([df3afb5](https://github.com/paypal/paypal-checkout/commit/df3afb5))
* Integrate with braintree-paypal-client-config ([62db93f](https://github.com/paypal/paypal-checkout/commit/62db93f))
* Pass back object from actions.payment.tokenize ([bd4c255](https://github.com/paypal/paypal-checkout/commit/bd4c255))
* Update domain level settings to support top-level domains ([84b620c](https://github.com/paypal/paypal-checkout/commit/84b620c))
* Use Checkout.canRenderTo to decide whether to render to top or parent ([8268f9e](https://github.com/paypal/paypal-checkout/commit/8268f9e))



## <small>4.0.167 (2017-11-30)</small>

* Adjust button styles ([d3516fc](https://github.com/paypal/paypal-checkout/commit/d3516fc))
* Experiment cleanup ([9082369](https://github.com/paypal/paypal-checkout/commit/9082369))
* Fall back to iframe mode for popup open failures ([b31e4a0](https://github.com/paypal/paypal-checkout/commit/b31e4a0))
* Mark QQ browser as not supporting popups ([88115a4](https://github.com/paypal/paypal-checkout/commit/88115a4))



## <small>4.0.166 (2017-11-17)</small>

* Add token to all fpti events when available ([1a17df9](https://github.com/paypal/paypal-checkout/commit/1a17df9))
* Default button session id to regular session id if not present ([8facdaf](https://github.com/paypal/paypal-checkout/commit/8facdaf))
* Do not throw if can not parse query params ([5516fa9](https://github.com/paypal/paypal-checkout/commit/5516fa9))
* Revert "Ramp top pay button to 100%" ([451b994](https://github.com/paypal/paypal-checkout/commit/451b994))
* Throttle instrumentation fixes ([aabab5a](https://github.com/paypal/paypal-checkout/commit/aabab5a))



## <small>4.0.165 (2017-11-15)</small>

* Fix issue getting session id from url ([16723c1](https://github.com/paypal/paypal-checkout/commit/16723c1))



## <small>4.0.164 (2017-11-15)</small>

* Fix typo in button session id lookup ([45e0998](https://github.com/paypal/paypal-checkout/commit/45e0998))



## <small>4.0.163 (2017-11-15)</small>

* Log client-side payment call using pay id as context type ([ba64912](https://github.com/paypal/paypal-checkout/commit/ba64912))



## <small>4.0.162 (2017-11-14)</small>

* Add domain-specific settings ([1743bd8](https://github.com/paypal/paypal-checkout/commit/1743bd8))
* Expose actions.payment.tokenize in onAuthorize ([ffd1132](https://github.com/paypal/paypal-checkout/commit/ffd1132))
* Fix focus test ([3b45780](https://github.com/paypal/paypal-checkout/commit/3b45780))
* Instrumentation fixes ([3b3ac87](https://github.com/paypal/paypal-checkout/commit/3b3ac87))
* Log gets on data.nonce ([319d624](https://github.com/paypal/paypal-checkout/commit/319d624))
* Patch onAuthorize onProps to determine if intent present ([7ec4642](https://github.com/paypal/paypal-checkout/commit/7ec4642))
* Ramp top pay button to 100% ([4848041](https://github.com/paypal/paypal-checkout/commit/4848041))
* Re-add onRememberUser as a fully-fledged prop ([1cd97af](https://github.com/paypal/paypal-checkout/commit/1cd97af))



## <small>4.0.161 (2017-11-09)</small>

* Add allowpaymentrequest prop to iframe button ([9802f5f](https://github.com/paypal/paypal-checkout/commit/9802f5f))
* Add aria-label to the button ([77ca2fb](https://github.com/paypal/paypal-checkout/commit/77ca2fb))
* Add elo card icon ([2206b21](https://github.com/paypal/paypal-checkout/commit/2206b21))
* Add paypal.isFundingRemembered ([7c985a8](https://github.com/paypal/paypal-checkout/commit/7c985a8))
* Add temporary onRememberUser callback and remove component-meta remember hack ([1780aff](https://github.com/paypal/paypal-checkout/commit/1780aff))
* Allow postMessage to popups in tests and add specific post-bridge tests ([d2b9a35](https://github.com/paypal/paypal-checkout/commit/d2b9a35))
* Clean up bridges after each test ([a9d5884](https://github.com/paypal/paypal-checkout/commit/a9d5884))
* Disable venmo for more sites ([b0d9606](https://github.com/paypal/paypal-checkout/commit/b0d9606))
* Enforce return or done in mocha tests ([66ed913](https://github.com/paypal/paypal-checkout/commit/66ed913))
* Fix button logo rendering in Firefox ([dc6c5bd](https://github.com/paypal/paypal-checkout/commit/dc6c5bd))
* Fix venmo blacklist ([e948aa6](https://github.com/paypal/paypal-checkout/commit/e948aa6))
* Improve overlay continue button text ([004367a](https://github.com/paypal/paypal-checkout/commit/004367a))
* In iOS show alert explaining next step to re-focus popup ([52a0590](https://github.com/paypal/paypal-checkout/commit/52a0590))
* Log individual cards ([25e7f79](https://github.com/paypal/paypal-checkout/commit/25e7f79))
* Log initial token using button guid ([2ac0e4d](https://github.com/paypal/paypal-checkout/commit/2ac0e4d))
* Pass in closeComponent to onAuthorize and onCancel for popup bridge case ([ad57623](https://github.com/paypal/paypal-checkout/commit/ad57623))
* Support intent for popup bridge case ([b14d5c5](https://github.com/paypal/paypal-checkout/commit/b14d5c5))
* Switch sandbox payment create back to www url ([a21a0ba](https://github.com/paypal/paypal-checkout/commit/a21a0ba))



## <small>4.0.160 (2017-11-06)</small>




## <small>4.0.159 (2017-11-06)</small>




## <small>4.0.158 (2017-11-05)</small>

* Ramp up top-pay-button to 50% ([b28a4c8](https://github.com/paypal/paypal-checkout/commit/b28a4c8))



## <small>4.0.157 (2017-11-02)</small>

* Add lint and typecheck to fastpublish ([11ed276](https://github.com/paypal/paypal-checkout/commit/11ed276))
* Hard-code quick fix for demo app ([7a26846](https://github.com/paypal/paypal-checkout/commit/7a26846))
* Style prop fixes for login component ([298afe1](https://github.com/paypal/paypal-checkout/commit/298afe1))



## <small>4.0.156 (2017-11-02)</small>

* Fix top button click action ([6f956c3](https://github.com/paypal/paypal-checkout/commit/6f956c3))



## <small>4.0.155 (2017-11-02)</small>

* Add client-side order create support ([b6ff6dc](https://github.com/paypal/paypal-checkout/commit/b6ff6dc))
* Add domain-level venmo opt-out ([5610e46](https://github.com/paypal/paypal-checkout/commit/5610e46))
* Add experiment for top pay button ([6c5d9d0](https://github.com/paypal/paypal-checkout/commit/6c5d9d0))
* Improve http response header and error handling ([40e94ed](https://github.com/paypal/paypal-checkout/commit/40e94ed))



## <small>4.0.154 (2017-11-01)</small>

* Go directly to xoon for elv and card buttons ([e30cfb2](https://github.com/paypal/paypal-checkout/commit/e30cfb2))



## <small>4.0.153 (2017-10-31)</small>




## <small>4.0.152 (2017-10-31)</small>

* [fix] 100% width on iPhone 5 portrait (#519) ([f766779](https://github.com/paypal/paypal-checkout/commit/f766779)), closes [#519](https://github.com/paypal/paypal-checkout/issues/519)
* Detect desktop Macintosh webviews ([0c32ee4](https://github.com/paypal/paypal-checkout/commit/0c32ee4))
* Fix lint error ([5028572](https://github.com/paypal/paypal-checkout/commit/5028572))



## <small>4.0.151 (2017-10-28)</small>




## <small>4.0.150 (2017-10-28)</small>

* Default Object.assign in checkout flow if not present ([8b265a5](https://github.com/paypal/paypal-checkout/commit/8b265a5))
* Fallback in full-page mode if allowed ([a704ce7](https://github.com/paypal/paypal-checkout/commit/a704ce7))



## <small>4.0.149 (2017-10-28)</small>

* Add logging for edge ([6c159e7](https://github.com/paypal/paypal-checkout/commit/6c159e7))
* Warn if prerender ends up running actual code (IE/Edge issue) ([d49971c](https://github.com/paypal/paypal-checkout/commit/d49971c))



## <small>4.0.148 (2017-10-27)</small>

* Add fastpublish script ([45d6c40](https://github.com/paypal/paypal-checkout/commit/45d6c40))
* Fix timeout ([2fb0452](https://github.com/paypal/paypal-checkout/commit/2fb0452))



## <small>4.0.147 (2017-10-27)</small>

* Fix venmo disallowed check ([2b2e6af](https://github.com/paypal/paypal-checkout/commit/2b2e6af))



## <small>4.0.146 (2017-10-27)</small>

* Add card funding source attribute to funding icons ([153e551](https://github.com/paypal/paypal-checkout/commit/153e551))
* Adjust button height ([8731781](https://github.com/paypal/paypal-checkout/commit/8731781))
* Adjust discover button ([3ccbd4f](https://github.com/paypal/paypal-checkout/commit/3ccbd4f))
* Allow disabling payment timeout for certain domains ([6f7ab2f](https://github.com/paypal/paypal-checkout/commit/6f7ab2f))
* Disable rendering venmo button on server-side for non-devices ([990ad11](https://github.com/paypal/paypal-checkout/commit/990ad11))
* Fall back to full page mode on any error for configured merchants ([0559b12](https://github.com/paypal/paypal-checkout/commit/0559b12))
* Fix logo height ([6b16276](https://github.com/paypal/paypal-checkout/commit/6b16276))
* Fix showing loading spinner on overlay ([0609429](https://github.com/paypal/paypal-checkout/commit/0609429))
* Lint fixes ([c64130b](https://github.com/paypal/paypal-checkout/commit/c64130b))
* Only enable discover card for US buyers ([24815eb](https://github.com/paypal/paypal-checkout/commit/24815eb))
* Throw better error messages for remembered test ([6db8098](https://github.com/paypal/paypal-checkout/commit/6db8098))



## <small>4.0.145 (2017-10-26)</small>

* Fix lint errors ([a57277a](https://github.com/paypal/paypal-checkout/commit/a57277a))
* Fix locale issues ([fb5ede5](https://github.com/paypal/paypal-checkout/commit/fb5ede5))



## <small>4.0.144 (2017-10-26)</small>

* Do not wrap card icons in span ([971d6c2](https://github.com/paypal/paypal-checkout/commit/971d6c2))



## <small>4.0.143 (2017-10-25)</small>

* Accept promise for client id ([0f7501a](https://github.com/paypal/paypal-checkout/commit/0f7501a))
* Consider locales before languages in browser settings ([c321347](https://github.com/paypal/paypal-checkout/commit/c321347))
* Remove button fix hack ([75a3d2c](https://github.com/paypal/paypal-checkout/commit/75a3d2c))



## <small>4.0.142 (2017-10-23)</small>

* Allow fundingicons to be clicked ([c29e160](https://github.com/paypal/paypal-checkout/commit/c29e160))
* Clean up responsive styles ([6167dcd](https://github.com/paypal/paypal-checkout/commit/6167dcd))
* Improve button validation logic ([0ccc9c1](https://github.com/paypal/paypal-checkout/commit/0ccc9c1))
* Improve locale detection logic ([90e6691](https://github.com/paypal/paypal-checkout/commit/90e6691))



## <small>4.0.141 (2017-10-19)</small>

* Allow maxbuttons 1 for vertical ([c09759b](https://github.com/paypal/paypal-checkout/commit/c09759b))
* Button style adjustments ([40ae3f1](https://github.com/paypal/paypal-checkout/commit/40ae3f1))
* Do not show paypal in horizontal dual credit button ([b97b57c](https://github.com/paypal/paypal-checkout/commit/b97b57c))
* Fix imgur upload path ([de7802c](https://github.com/paypal/paypal-checkout/commit/de7802c))
* Improve button validation messages ([3061b79](https://github.com/paypal/paypal-checkout/commit/3061b79))
* Only show ELV by default in vertical mode ([98bd0a5](https://github.com/paypal/paypal-checkout/commit/98bd0a5))
* Only show venmo button for mobile devices ([fd78175](https://github.com/paypal/paypal-checkout/commit/fd78175))
* Show full credit logo for vertical layout ([fa227b0](https://github.com/paypal/paypal-checkout/commit/fa227b0))
* Use Lastschrift in ELV logo ([c33f942](https://github.com/paypal/paypal-checkout/commit/c33f942))



## <small>4.0.140 (2017-10-18)</small>

* Fix button instrumentation ([d6bd947](https://github.com/paypal/paypal-checkout/commit/d6bd947))



## <small>4.0.139 (2017-10-18)</small>

* Add button screenshot test improvements ([899d4d6](https://github.com/paypal/paypal-checkout/commit/899d4d6))
* Add new pill screenshots ([58065ad](https://github.com/paypal/paypal-checkout/commit/58065ad))
* Fix pill styles ([b7accee](https://github.com/paypal/paypal-checkout/commit/b7accee))
* Flush logs from button iframe ([c32e83e](https://github.com/paypal/paypal-checkout/commit/c32e83e))
* Redirect to guest app from login page ([684da06](https://github.com/paypal/paypal-checkout/commit/684da06))



## <small>4.0.138 (2017-10-17)</small>

* Ensure credit is only defaulted on for vertical integrations ([2fed7bd](https://github.com/paypal/paypal-checkout/commit/2fed7bd))
* Make sure to call original style validation after patching ([06ab4df](https://github.com/paypal/paypal-checkout/commit/06ab4df))
* Patch window.Promise in button iframe if not present ([6fa4fde](https://github.com/paypal/paypal-checkout/commit/6fa4fde))
* Update screenshot test images ([b9cdc9f](https://github.com/paypal/paypal-checkout/commit/b9cdc9f))



## <small>4.0.137 (2017-10-17)</small>

* Enable credit by default for US ([f930ec7](https://github.com/paypal/paypal-checkout/commit/f930ec7))
* Fix old style props for framework integrations ([67d8d0f](https://github.com/paypal/paypal-checkout/commit/67d8d0f))
* Go to regular checkout for card/elv button ([bf185a9](https://github.com/paypal/paypal-checkout/commit/bf185a9))
* Make card button lowest priority ([db4257a](https://github.com/paypal/paypal-checkout/commit/db4257a))
* Redirect to guest app if card or elv button clicked ([8103df0](https://github.com/paypal/paypal-checkout/commit/8103df0))
* Show PayPal wordmark in small credit button ([bac1fbf](https://github.com/paypal/paypal-checkout/commit/bac1fbf))
* Style card button transparently ([47b7096](https://github.com/paypal/paypal-checkout/commit/47b7096))
* Update screenshot test images ([49eb2cc](https://github.com/paypal/paypal-checkout/commit/49eb2cc))



## <small>4.0.136 (2017-10-17)</small>

* Add compatibility fixes ([dbd5f42](https://github.com/paypal/paypal-checkout/commit/dbd5f42))



## <small>4.0.135 (2017-10-17)</small>

* Add button count kv ([f5f2b91](https://github.com/paypal/paypal-checkout/commit/f5f2b91))
* Add extra window type options ([c6d62f8](https://github.com/paypal/paypal-checkout/commit/c6d62f8))
* Add jsx eslint rules ([cdf3301](https://github.com/paypal/paypal-checkout/commit/cdf3301))
* Adjust default funding mix ([fcb1b9e](https://github.com/paypal/paypal-checkout/commit/fcb1b9e))
* Instrument button_layout ([d195ad9](https://github.com/paypal/paypal-checkout/commit/d195ad9))
* Lock flow to 0.56 ([1f0967c](https://github.com/paypal/paypal-checkout/commit/1f0967c))
* Only run timeout for payment in production mode ([3d7652e](https://github.com/paypal/paypal-checkout/commit/3d7652e))
* Remove production client id from demos ([249b660](https://github.com/paypal/paypal-checkout/commit/249b660))
* Switch to enum for country and lang ([958e4fb](https://github.com/paypal/paypal-checkout/commit/958e4fb))
* Temporarily map generic label to paypal in button template ([471a2ff](https://github.com/paypal/paypal-checkout/commit/471a2ff))
* Temporarily skip responsive resize test ([6e5c030](https://github.com/paypal/paypal-checkout/commit/6e5c030))
* Upgrade post-robot and zalgo-promise and use ifdef-loader ([2b2f000](https://github.com/paypal/paypal-checkout/commit/2b2f000))
* Upgrade to latest cross-domain-utils ([9bc5541](https://github.com/paypal/paypal-checkout/commit/9bc5541))
* Use latest fpti kv names for buttons rendered and clicked ([f761f88](https://github.com/paypal/paypal-checkout/commit/f761f88))



## <small>4.0.134 (2017-10-10)</small>

* Add data-merchant-id prop, pass to fpti and muse ([f2bad55](https://github.com/paypal/paypal-checkout/commit/f2bad55))
* Add version number to rendered button template ([43e44bd](https://github.com/paypal/paypal-checkout/commit/43e44bd))
* Default ELV to guest app ([e6af477](https://github.com/paypal/paypal-checkout/commit/e6af477))
* Start work on turning enums into flow enums ([ad60c7a](https://github.com/paypal/paypal-checkout/commit/ad60c7a))
* Update ISSUE_TEMPLATE.md ([eabcc72](https://github.com/paypal/paypal-checkout/commit/eabcc72))
* Upgrade dependencies ([454b582](https://github.com/paypal/paypal-checkout/commit/454b582))
* Use style.maxbuttons instead of style.max ([28860ed](https://github.com/paypal/paypal-checkout/commit/28860ed))



## <small>4.0.133 (2017-10-04)</small>

* Add dist/checkout.button.render.js to npm package ([4585cd0](https://github.com/paypal/paypal-checkout/commit/4585cd0))
* Add option for white overlay ([771aca4](https://github.com/paypal/paypal-checkout/commit/771aca4))
* Encode key name for jsx-to-html ([6ea180a](https://github.com/paypal/paypal-checkout/commit/6ea180a))
* Move out checkout container styles ([3aa05cd](https://github.com/paypal/paypal-checkout/commit/3aa05cd))
* Set min width and height for checkout overlay ([768a744](https://github.com/paypal/paypal-checkout/commit/768a744))
* Update api.md ([3b134c0](https://github.com/paypal/paypal-checkout/commit/3b134c0))
* Upgrade xcomponent with new static typing ([bf276f2](https://github.com/paypal/paypal-checkout/commit/bf276f2))
* Use included svgs to render paypal logo on checkout overlay ([8249e3c](https://github.com/paypal/paypal-checkout/commit/8249e3c))
* Vertical button arrangement (#472) ([121b09b](https://github.com/paypal/paypal-checkout/commit/121b09b)), closes [#472](https://github.com/paypal/paypal-checkout/issues/472)



## <small>4.0.131 (2017-10-01)</small>

* Add button screenshot tests ([0e1fd70](https://github.com/paypal/paypal-checkout/commit/0e1fd70))
* Add new check for facebook webview ([0981791](https://github.com/paypal/paypal-checkout/commit/0981791))
* Cache bowser based on user-agent ([e75e7f1](https://github.com/paypal/paypal-checkout/commit/e75e7f1))
* Log experiment click from pre-render click fallback ([2dde8b6](https://github.com/paypal/paypal-checkout/commit/2dde8b6))
* Register driver in angular example ([41a3929](https://github.com/paypal/paypal-checkout/commit/41a3929))
* Remove Edge 15 eligibility rule ([1181b6f](https://github.com/paypal/paypal-checkout/commit/1181b6f))
* Support new-style payment ID with PAYID- prefix ([2db77f2](https://github.com/paypal/paypal-checkout/commit/2db77f2))
* Update ISSUE_TEMPLATE.md ([493b428](https://github.com/paypal/paypal-checkout/commit/493b428))
* Update performance.md ([3039068](https://github.com/paypal/paypal-checkout/commit/3039068))



## <small>4.0.130 (2017-09-18)</small>

* Add small delay on experiment return log ([18a2b4e](https://github.com/paypal/paypal-checkout/commit/18a2b4e))
* Improve resize test ([eae5f16](https://github.com/paypal/paypal-checkout/commit/eae5f16))
* Simplify event names ([fa5ff15](https://github.com/paypal/paypal-checkout/commit/fa5ff15))



## <small>4.0.129 (2017-09-18)</small>

* Cleanup hacks ([b34d3a8](https://github.com/paypal/paypal-checkout/commit/b34d3a8))
* Immediately flush missing intent logs ([2d4d8ec](https://github.com/paypal/paypal-checkout/commit/2d4d8ec))
* Improve button resize test ([afdf8db](https://github.com/paypal/paypal-checkout/commit/afdf8db))
* Simplify external experiment instrumentation ([3d2ed05](https://github.com/paypal/paypal-checkout/commit/3d2ed05))



## <small>4.0.128 (2017-09-15)</small>

* Destroy entire session after expiry time, not just guid ([fcb00e5](https://github.com/paypal/paypal-checkout/commit/fcb00e5))
* Do not send start/complete beacon for experiments which have already been instrumented ([2f240d9](https://github.com/paypal/paypal-checkout/commit/2f240d9))



## <small>4.0.127 (2017-09-14)</small>

* Only log complete for external experiment if experiment is active ([504b4ee](https://github.com/paypal/paypal-checkout/commit/504b4ee))
* Write new session to storage ([d93f922](https://github.com/paypal/paypal-checkout/commit/d93f922))



## <small>4.0.126 (2017-09-14)</small>

* Always validate props prior to doing template render ([a3d4d0c](https://github.com/paypal/paypal-checkout/commit/a3d4d0c))



## <small>4.0.125 (2017-09-14)</small>

* Add const-immutable eslint plugin ([8c35ecc](https://github.com/paypal/paypal-checkout/commit/8c35ecc))
* Add more logs for missing intent ([9447bbf](https://github.com/paypal/paypal-checkout/commit/9447bbf))
* Do not default externalExperimentComplete flag to unknown ([565925a](https://github.com/paypal/paypal-checkout/commit/565925a))
* For proxy, use last available frame, and fall back to original ([02a1591](https://github.com/paypal/paypal-checkout/commit/02a1591))
* Update cdn-npm.md ([9cf71b9](https://github.com/paypal/paypal-checkout/commit/9cf71b9))
* Update content.json (#461) ([8edb7df](https://github.com/paypal/paypal-checkout/commit/8edb7df)), closes [#461](https://github.com/paypal/paypal-checkout/issues/461)



## <small>4.0.124 (2017-09-07)</small>

* (docs) Add missing parameter to callback functions (#456) ([df7926d](https://github.com/paypal/paypal-checkout/commit/df7926d)), closes [#456](https://github.com/paypal/paypal-checkout/issues/456)



## <small>4.0.123 (2017-09-07)</small>

* Call onRememberUser prop when user is remembered ([09b5325](https://github.com/paypal/paypal-checkout/commit/09b5325))



## <small>4.0.122 (2017-09-06)</small>

* Improve late-render test to make sure button iframe is visible ([b254155](https://github.com/paypal/paypal-checkout/commit/b254155))
* Log token and payment id with missing intent ([82d3b54](https://github.com/paypal/paypal-checkout/commit/82d3b54))
* Revert "Temporarily revert flat buttons" ([c762424](https://github.com/paypal/paypal-checkout/commit/c762424))



## <small>4.0.121 (2017-09-02)</small>

* Re-run componentScript when computedStyle is null ([81b3778](https://github.com/paypal/paypal-checkout/commit/81b3778))
* Treat null computedStyle as being hidden ([07ede9c](https://github.com/paypal/paypal-checkout/commit/07ede9c))



## <small>4.0.120 (2017-09-02)</small>

* Add warning for no intent in onAuthorize data ([a45ee01](https://github.com/paypal/paypal-checkout/commit/a45ee01))
* Make interface hacks more resilient ([3fd35ac](https://github.com/paypal/paypal-checkout/commit/3fd35ac))
* Temporarily revert flat buttons ([898e51e](https://github.com/paypal/paypal-checkout/commit/898e51e))
* Use eslint-plugin-import ([77dc238](https://github.com/paypal/paypal-checkout/commit/77dc238))



## <small>4.0.119 (2017-09-01)</small>

* Allow line break in type declarations ([3795f9f](https://github.com/paypal/paypal-checkout/commit/3795f9f))
* Fix proxying ([7941d85](https://github.com/paypal/paypal-checkout/commit/7941d85))



## <small>4.0.118 (2017-08-30)</small>

* Add angular2 demo ([61f1512](https://github.com/paypal/paypal-checkout/commit/61f1512))
* Clean up angular2 demo ([b9e89af](https://github.com/paypal/paypal-checkout/commit/b9e89af))
* Make edge 15 ineligible until issues resolved ([0dfd91e](https://github.com/paypal/paypal-checkout/commit/0dfd91e))
* npm run demo point to demo directory ([c03dfa6](https://github.com/paypal/paypal-checkout/commit/c03dfa6))
* Remove arrow function from template script ([827de06](https://github.com/paypal/paypal-checkout/commit/827de06))
* Require valid flow annotations ([08ec64b](https://github.com/paypal/paypal-checkout/commit/08ec64b))
* Simplify storage logic ([ae360fb](https://github.com/paypal/paypal-checkout/commit/ae360fb))



## <small>4.0.117 (2017-08-29)</small>

* Add actions.payment.get to Braintree integration ([4c6a8a9](https://github.com/paypal/paypal-checkout/commit/4c6a8a9))
* Add window types ([2d9d2fe](https://github.com/paypal/paypal-checkout/commit/2d9d2fe))
* Allow actions.payment.create for Braintree integrations ([b184791](https://github.com/paypal/paypal-checkout/commit/b184791))
* Fade in button from prerender template ([bf5157c](https://github.com/paypal/paypal-checkout/commit/bf5157c))
* Fail on circular dependencies ([db821da](https://github.com/paypal/paypal-checkout/commit/db821da))
* Fix indentation ([6810163](https://github.com/paypal/paypal-checkout/commit/6810163))
* Flatten buttons, support any label for dual button, fix dual hover, fix unbranded wide content ([8aae84f](https://github.com/paypal/paypal-checkout/commit/8aae84f))
* Have travis run full build ([98274c6](https://github.com/paypal/paypal-checkout/commit/98274c6))
* Remove circular dependency ([279fe55](https://github.com/paypal/paypal-checkout/commit/279fe55))
* Split out payment hacks ([e5f011d](https://github.com/paypal/paypal-checkout/commit/e5f011d))
* Strengthen eslint config ([28ca485](https://github.com/paypal/paypal-checkout/commit/28ca485))
* Update performance.md ([c58a44f](https://github.com/paypal/paypal-checkout/commit/c58a44f))
* Upgrade build dependencies ([826ba3c](https://github.com/paypal/paypal-checkout/commit/826ba3c))



## <small>4.0.116 (2017-08-22)</small>

* Simplify iframe eligibility ([d2f8436](https://github.com/paypal/paypal-checkout/commit/d2f8436))



## <small>4.0.115 (2017-08-21)</small>

* Re-enable tests ([cc5ccd4](https://github.com/paypal/paypal-checkout/commit/cc5ccd4))



## <small>4.0.114 (2017-08-21)</small>

* Group together allow-iframe logic ([29eb65b](https://github.com/paypal/paypal-checkout/commit/29eb65b))
* Improve allow-iframe logic ([702d85a](https://github.com/paypal/paypal-checkout/commit/702d85a))
* Improved button sizing and resizing logic ([b264864](https://github.com/paypal/paypal-checkout/commit/b264864))
* Use npm 4 ([962181f](https://github.com/paypal/paypal-checkout/commit/962181f))



## <small>4.0.113 (2017-08-18)</small>

* Allow getting session and session state ([d9915b6](https://github.com/paypal/paypal-checkout/commit/d9915b6))
* Auto convert tiny buttons to small ([cfa5edf](https://github.com/paypal/paypal-checkout/commit/cfa5edf))
* Position real and sacrifical iframes in the same place ([1bdd5fd](https://github.com/paypal/paypal-checkout/commit/1bdd5fd))



## <small>4.0.112 (2017-08-17)</small>

* Allow passing style.tagline=false to disable button tagline ([144e8b5](https://github.com/paypal/paypal-checkout/commit/144e8b5))
* Clean up legacy button rendering instrumentation ([771fbbc](https://github.com/paypal/paypal-checkout/commit/771fbbc))
* Clean up localStorage and session code ([d2f832b](https://github.com/paypal/paypal-checkout/commit/d2f832b))
* Create cdn-npm.md ([433bf1d](https://github.com/paypal/paypal-checkout/commit/433bf1d))
* Load logging cleanup ([32efbcb](https://github.com/paypal/paypal-checkout/commit/32efbcb))
* Move doc images to img directory ([e055fe1](https://github.com/paypal/paypal-checkout/commit/e055fe1))
* Remove legacy mobile throttle ([fc4532b](https://github.com/paypal/paypal-checkout/commit/fc4532b))
* Remove outliers from resource load time check ([363dc5f](https://github.com/paypal/paypal-checkout/commit/363dc5f))
* Store remembered state in parent page so future renders are faster ([afdbd6e](https://github.com/paypal/paypal-checkout/commit/afdbd6e))
* Try/catch correlation id header check to avoid CORS error ([a447034](https://github.com/paypal/paypal-checkout/commit/a447034))
* Update cdn-npm.md ([c8ceac2](https://github.com/paypal/paypal-checkout/commit/c8ceac2))
* Update cdn-npm.md ([75e0a78](https://github.com/paypal/paypal-checkout/commit/75e0a78))



## <small>4.0.111 (2017-08-15)</small>

* Check xprops in forceIframe ([bb0f694](https://github.com/paypal/paypal-checkout/commit/bb0f694))
* Set minimum width of button to 100px ([bc10f86](https://github.com/paypal/paypal-checkout/commit/bc10f86))



## <small>4.0.110 (2017-08-11)</small>

* Allow enabling iframe any time prefetchLogin is enabled ([d47f4ea](https://github.com/paypal/paypal-checkout/commit/d47f4ea))
* Allow paypal domains to enable checkout iframe with a public method ([f1d5bd1](https://github.com/paypal/paypal-checkout/commit/f1d5bd1))
* Blank env prop for login prerender ([53ef96e](https://github.com/paypal/paypal-checkout/commit/53ef96e))
* Break out button hacks and tech debt to single place ([6aed79d](https://github.com/paypal/paypal-checkout/commit/6aed79d))
* Fix pre-template button click log ([a987da6](https://github.com/paypal/paypal-checkout/commit/a987da6))
* Log current script version ([fca12ea](https://github.com/paypal/paypal-checkout/commit/fca12ea))
* Update frameworks.md ([a1f5d52](https://github.com/paypal/paypal-checkout/commit/a1f5d52))



## <small>4.0.109 (2017-08-11)</small>

* Add init log for checkout component ([83b7f4c](https://github.com/paypal/paypal-checkout/commit/83b7f4c))
* Add process_recieve_payment log the moment the button recieves the token or payment id ([ef2880d](https://github.com/paypal/paypal-checkout/commit/ef2880d))
* Add specific log for no token passed ([913fcb0](https://github.com/paypal/paypal-checkout/commit/913fcb0))
* Allow falling back to full page on popup failure ([cb3c4e8](https://github.com/paypal/paypal-checkout/commit/cb3c4e8))
* Allow forcing iframe after login render ([5f7782b](https://github.com/paypal/paypal-checkout/commit/5f7782b))
* Default locale for button component ([c339866](https://github.com/paypal/paypal-checkout/commit/c339866))
* Do not hide the button when the viewport is too small ([15c4419](https://github.com/paypal/paypal-checkout/commit/15c4419))
* Do not try to access window.performance if it is not available ([01f390c](https://github.com/paypal/paypal-checkout/commit/01f390c))
* Domain setting updates ([8ce0a78](https://github.com/paypal/paypal-checkout/commit/8ce0a78))
* Fixes for experiment beacons ([1608691](https://github.com/paypal/paypal-checkout/commit/1608691))
* Log currentScript download time ([313f3ca](https://github.com/paypal/paypal-checkout/commit/313f3ca))
* Pick up jsx files for lint task ([01bdbb9](https://github.com/paypal/paypal-checkout/commit/01bdbb9))
* Take whatever size is available for checkout on mobile devices, remove min width ([a4fa9bc](https://github.com/paypal/paypal-checkout/commit/a4fa9bc))
* Update frameworks.md ([077575c](https://github.com/paypal/paypal-checkout/commit/077575c))
* Use jsx-dom for all templates and upgrade xcomponent ([d0b7ae2](https://github.com/paypal/paypal-checkout/commit/d0b7ae2))
* Use only ES5 in dev demo ([2f7da0d](https://github.com/paypal/paypal-checkout/commit/2f7da0d))



## <small>4.0.108 (2017-08-09)</small>

* Add dev demo for in-iframe usecase ([5700e40](https://github.com/paypal/paypal-checkout/commit/5700e40))
* Add dev demo for legacy form hijack case ([a0535a3](https://github.com/paypal/paypal-checkout/commit/a0535a3))
* Add dev demo for legacy integration ([f74f6fc](https://github.com/paypal/paypal-checkout/commit/f74f6fc))
* Add more supported browsers ([176e8a4](https://github.com/paypal/paypal-checkout/commit/176e8a4))
* Improve button dev demo ([cca5eb6](https://github.com/paypal/paypal-checkout/commit/cca5eb6))
* Only check version if bowser returns it ([2b0e020](https://github.com/paypal/paypal-checkout/commit/2b0e020))



## <small>4.0.107 (2017-08-09)</small>

* Use bowser.compareVersions rather than simple lessthan check ([b1ed904](https://github.com/paypal/paypal-checkout/commit/b1ed904))



## <small>4.0.106 (2017-08-09)</small>

* Add more supported browsers to config ([0b5528b](https://github.com/paypal/paypal-checkout/commit/0b5528b))
* Do not resolve promise for restart cases ([b7cfb1b](https://github.com/paypal/paypal-checkout/commit/b7cfb1b))



## <small>4.0.105 (2017-08-09)</small>

* Disable checkout iframe in authorize and cancel ([6fabfd9](https://github.com/paypal/paypal-checkout/commit/6fabfd9))
* Move recognized browser check to onAuthorize ([dec382b](https://github.com/paypal/paypal-checkout/commit/dec382b))



## <small>4.0.104 (2017-08-08)</small>

* Add correlation id to all http error responses ([13f971a](https://github.com/paypal/paypal-checkout/commit/13f971a))
* Add logging on return ([bb244e5](https://github.com/paypal/paypal-checkout/commit/bb244e5))
* Add setup tests and refactor pptm tests ([95b4b19](https://github.com/paypal/paypal-checkout/commit/95b4b19))
* Always call setup at least one, allow multiple configures ([a62d83b](https://github.com/paypal/paypal-checkout/commit/a62d83b))
* Do not go into headless mode when keep-open passed ([f922035](https://github.com/paypal/paypal-checkout/commit/f922035))
* Do not send entire error stack to fpti ([bbe9bc9](https://github.com/paypal/paypal-checkout/commit/bbe9bc9))
* Enable headless mode ([4406805](https://github.com/paypal/paypal-checkout/commit/4406805))
* Fix button debouncer on close event ([c61d718](https://github.com/paypal/paypal-checkout/commit/c61d718))
* Update flow ([7cc2925](https://github.com/paypal/paypal-checkout/commit/7cc2925))
* Update performance.md ([83c512d](https://github.com/paypal/paypal-checkout/commit/83c512d))
* Update performance.md ([de71661](https://github.com/paypal/paypal-checkout/commit/de71661))
* Use bowser for browser detection ([f72ab37](https://github.com/paypal/paypal-checkout/commit/f72ab37))
* Use latest ZalgoPromise type rules ([516fa67](https://github.com/paypal/paypal-checkout/commit/516fa67))



## <small>4.0.103 (2017-08-03)</small>

* Do not open bridge on paypal domain ([f04fa21](https://github.com/paypal/paypal-checkout/commit/f04fa21))



## <small>4.0.102 (2017-08-03)</small>

* Fix force bridge loader ([6c96560](https://github.com/paypal/paypal-checkout/commit/6c96560))



## <small>4.0.101 (2017-08-03)</small>

* Update ISSUE_TEMPLATE.md ([1a79aa5](https://github.com/paypal/paypal-checkout/commit/1a79aa5))
* Update ISSUE_TEMPLATE.md ([294725d](https://github.com/paypal/paypal-checkout/commit/294725d))



## <small>4.0.100 (2017-08-03)</small>

* Add tests for cancel on close window ([7c4daf9](https://github.com/paypal/paypal-checkout/commit/7c4daf9))
* Allow forcing bridge on per-domain basis ([8de8b83](https://github.com/paypal/paypal-checkout/commit/8de8b83))
* Do not override onClose ([d68cc0e](https://github.com/paypal/paypal-checkout/commit/d68cc0e))
* Fix log proxying for different envs ([da03504](https://github.com/paypal/paypal-checkout/commit/da03504))



## <small>4.0.99 (2017-08-02)</small>

* Add commented auto-devtools chrome option ([d2d71c6](https://github.com/paypal/paypal-checkout/commit/d2d71c6))
* Adjust per-domain settings ([6d672ff](https://github.com/paypal/paypal-checkout/commit/6d672ff))
* Create performance.md ([2b81ecb](https://github.com/paypal/paypal-checkout/commit/2b81ecb))
* Do not proxy logs to popup opener by default ([bca44aa](https://github.com/paypal/paypal-checkout/commit/bca44aa))
* Fix script detection logic ([4c5a449](https://github.com/paypal/paypal-checkout/commit/4c5a449))
* Update performance.md ([80d86ad](https://github.com/paypal/paypal-checkout/commit/80d86ad))



## <small>4.0.98 (2017-07-31)</small>

* Make sure iframe can not be disabled in force-iframe mode ([9b86ccb](https://github.com/paypal/paypal-checkout/commit/9b86ccb))



## <small>4.0.97 (2017-07-28)</small>

* Add legacy dev demo ([009bbbc](https://github.com/paypal/paypal-checkout/commit/009bbbc))
* Add option to go to full page for IE ([f4f16d7](https://github.com/paypal/paypal-checkout/commit/f4f16d7))
* Add option to go to full page when clicking on prerendered button ([4d92744](https://github.com/paypal/paypal-checkout/commit/4d92744))
* Add option to memoize result of button payment call ([7ffc8a9](https://github.com/paypal/paypal-checkout/commit/7ffc8a9))
* Catch errors on full page redirects ([cd57e49](https://github.com/paypal/paypal-checkout/commit/cd57e49))
* Do not enable lightbox by default for logged in users ([c207c57](https://github.com/paypal/paypal-checkout/commit/c207c57))
* Enable per-domain settings ([cd33efc](https://github.com/paypal/paypal-checkout/commit/cd33efc))
* Extend isIE check ([f84fcb3](https://github.com/paypal/paypal-checkout/commit/f84fcb3))
* Fix button demo url ([410c12c](https://github.com/paypal/paypal-checkout/commit/410c12c))
* Fix intranet check to only apply to older IE versions ([fc59188](https://github.com/paypal/paypal-checkout/commit/fc59188))
* Fix merchant settings hashes ([b93a596](https://github.com/paypal/paypal-checkout/commit/b93a596))
* Get domain setting from parent domain if available ([8f45af8](https://github.com/paypal/paypal-checkout/commit/8f45af8))
* Log ineligible before throwing intranet error ([9a295de](https://github.com/paypal/paypal-checkout/commit/9a295de))
* Remove lightbox throttle for legacy ([51b8059](https://github.com/paypal/paypal-checkout/commit/51b8059))
* Send proxy regardless of current domain ([5ccb8e0](https://github.com/paypal/paypal-checkout/commit/5ccb8e0))



## <small>4.0.96 (2017-07-25)</small>

* Add commented headless chrome options ([8c2857c](https://github.com/paypal/paypal-checkout/commit/8c2857c))
* Enable lightbox/popup experiment ([b0a67d4](https://github.com/paypal/paypal-checkout/commit/b0a67d4))
* Load pptm script from stage for local env ([fc91f85](https://github.com/paypal/paypal-checkout/commit/fc91f85))
* Proxy logger flushes into frames ([379fba7](https://github.com/paypal/paypal-checkout/commit/379fba7))
* Reset button debouncer on error ([47ca7eb](https://github.com/paypal/paypal-checkout/commit/47ca7eb))
* Use vh and vm for overlay width and height, to fix WKWebView ([1f7d34f](https://github.com/paypal/paypal-checkout/commit/1f7d34f))



## <small>4.0.95 (2017-07-20)</small>

* Add log for domain specific custom paypal button ([295e3f9](https://github.com/paypal/paypal-checkout/commit/295e3f9))
* Add more instrumentation around repeat button click behavior ([a898286](https://github.com/paypal/paypal-checkout/commit/a898286))
* Do not allow button clicks while the Checkout component is open ([ba43841](https://github.com/paypal/paypal-checkout/commit/ba43841))
* Expose paypal.logExperimentTreatment for external experiments ([de4c5ea](https://github.com/paypal/paypal-checkout/commit/de4c5ea))



## <small>4.0.94 (2017-07-20)</small>

* Do not cancel setup for ineligible browsers ([db4b994](https://github.com/paypal/paypal-checkout/commit/db4b994))
* Fix z-index ([f1a438c](https://github.com/paypal/paypal-checkout/commit/f1a438c))
* Log pptm load error ([d2a32ca](https://github.com/paypal/paypal-checkout/commit/d2a32ca))



## <small>4.0.93 (2017-07-20)</small>

* Add log for onAuthorize in ineligible browser ([78a0b11](https://github.com/paypal/paypal-checkout/commit/78a0b11))
* Log warning for ineligible button render ([2263d07](https://github.com/paypal/paypal-checkout/commit/2263d07))



## <small>4.0.92 (2017-07-20)</small>

* Add domain specific setting for logger prefix ([23aeed1](https://github.com/paypal/paypal-checkout/commit/23aeed1))
* Add domain specific setting util ([2dccb0c](https://github.com/paypal/paypal-checkout/commit/2dccb0c))
* Add log for button clicked after cancel ([70abccd](https://github.com/paypal/paypal-checkout/commit/70abccd))
* Add log for multiple clicks ([72d9504](https://github.com/paypal/paypal-checkout/commit/72d9504))
* Add logs for button cancel ([4258f33](https://github.com/paypal/paypal-checkout/commit/4258f33))
* Add some intranet docs ([49c782d](https://github.com/paypal/paypal-checkout/commit/49c782d))
* CAL log for button click ([e2d7677](https://github.com/paypal/paypal-checkout/commit/e2d7677))
* CAL warning for ineligible ([141a6df](https://github.com/paypal/paypal-checkout/commit/141a6df))
* Do not render button in ineligible browser ([b83773d](https://github.com/paypal/paypal-checkout/commit/b83773d))
* Fix doc images ([0f56317](https://github.com/paypal/paypal-checkout/commit/0f56317))
* FPTI log for authorize ([bbc2be4](https://github.com/paypal/paypal-checkout/commit/bbc2be4))
* Log if button clicked before fully loaded ([11350b0](https://github.com/paypal/paypal-checkout/commit/11350b0))
* Update frameworks.md ([e620629](https://github.com/paypal/paypal-checkout/commit/e620629))
* Update frameworks.md ([733b52b](https://github.com/paypal/paypal-checkout/commit/733b52b))
* Use latest example for React doc ([6dd3618](https://github.com/paypal/paypal-checkout/commit/6dd3618))



## <small>4.0.91 (2017-07-18)</small>

* Add an accessToken prop to checkout ([8b3e505](https://github.com/paypal/paypal-checkout/commit/8b3e505))
* Add cross-domain-utils and zalgo-promise to quickbuild script ([0bb128d](https://github.com/paypal/paypal-checkout/commit/0bb128d))
* Add dev demo ([05eac5e](https://github.com/paypal/paypal-checkout/commit/05eac5e))
* Add flow declaration for __IE_POPUP_SUPPORT__ ([d444a52](https://github.com/paypal/paypal-checkout/commit/d444a52))
* Add issue template ([73562e1](https://github.com/paypal/paypal-checkout/commit/73562e1))
* Buy Now Button bug fix (#391) ([386a271](https://github.com/paypal/paypal-checkout/commit/386a271)), closes [#391](https://github.com/paypal/paypal-checkout/issues/391)
* Convert checkout component template to jsx ([b4781ec](https://github.com/paypal/paypal-checkout/commit/b4781ec))
* Correct alt-text for button svgs ([e479db0](https://github.com/paypal/paypal-checkout/commit/e479db0))
* Fix button size test assertions ([d3cb9c6](https://github.com/paypal/paypal-checkout/commit/d3cb9c6))
* Login component ([82586b5](https://github.com/paypal/paypal-checkout/commit/82586b5))
* Paypal venmo button logic (#406) ([9c23921](https://github.com/paypal/paypal-checkout/commit/9c23921)), closes [#406](https://github.com/paypal/paypal-checkout/issues/406)
* Prevent infinite loop from log flushing ([309059b](https://github.com/paypal/paypal-checkout/commit/309059b))
* Set up no-tagline experiment ([9b07b9d](https://github.com/paypal/paypal-checkout/commit/9b07b9d))
* Simplify responsive button container styles ([eb04403](https://github.com/paypal/paypal-checkout/commit/eb04403))
* Use jsx for templates ([7a67a39](https://github.com/paypal/paypal-checkout/commit/7a67a39))



## <small>4.0.89 (2017-06-27)</small>

* Re-start tagline experiment ([96f459a](https://github.com/paypal/paypal-checkout/commit/96f459a))



## <small>4.0.88 (2017-06-27)</small>

* Add timing log for button render ([0b4bfb9](https://github.com/paypal/paypal-checkout/commit/0b4bfb9))
* Fix memoize typing ([50fe9df](https://github.com/paypal/paypal-checkout/commit/50fe9df))
* Fix zalgo-promise ref ([fecff14](https://github.com/paypal/paypal-checkout/commit/fecff14))
* More throttle potential fixes ([04d9924](https://github.com/paypal/paypal-checkout/commit/04d9924))



## <small>4.0.87 (2017-06-26)</small>




## <small>4.0.86 (2017-06-26)</small>

* Advanced session logic, throttle fixes and verifications ([b3a0851](https://github.com/paypal/paypal-checkout/commit/b3a0851))
* Fix legacy env setting regression ([c050dbb](https://github.com/paypal/paypal-checkout/commit/c050dbb))
* Upgrade post-robot ([1161447](https://github.com/paypal/paypal-checkout/commit/1161447))



## <small>4.0.85 (2017-06-22)</small>

* Add Gitter Badge (#378) ([a7894a0](https://github.com/paypal/paypal-checkout/commit/a7894a0)), closes [#378](https://github.com/paypal/paypal-checkout/issues/378)
* Create NOOP pptm.js script upon setup (#385) ([b425166](https://github.com/paypal/paypal-checkout/commit/b425166)), closes [#385](https://github.com/paypal/paypal-checkout/issues/385)
* Disable ModuleConcatenationPlugin for now ([86f2eca](https://github.com/paypal/paypal-checkout/commit/86f2eca))
* Fixes for buy now button ([1e2fd59](https://github.com/paypal/paypal-checkout/commit/1e2fd59))
* If not button or container passed to legacy, assume custom button for instrumentation ([61245f3](https://github.com/paypal/paypal-checkout/commit/61245f3))
* Legacy button options normalization and cleanup ([dc12deb](https://github.com/paypal/paypal-checkout/commit/dc12deb))
* Set 5 minute lifespan for session id, across multiple tabs ([89940b1](https://github.com/paypal/paypal-checkout/commit/89940b1))
* Switch to validate for intranet check ([4cc641e](https://github.com/paypal/paypal-checkout/commit/4cc641e))
* Type safety fix ([c8733d6](https://github.com/paypal/paypal-checkout/commit/c8733d6))
* Upgrade to webpack 3 with scope hoisting (#382) ([2afa78b](https://github.com/paypal/paypal-checkout/commit/2afa78b)), closes [#382](https://github.com/paypal/paypal-checkout/issues/382)
* Use user_session_guid rather than user_guid for fpti logging ([d933966](https://github.com/paypal/paypal-checkout/commit/d933966))



## <small>4.0.84 (2017-06-17)</small>

* Add button_source enum and fpti log ([12036ca](https://github.com/paypal/paypal-checkout/commit/12036ca))
* Add fpti error logging ([8af47e6](https://github.com/paypal/paypal-checkout/commit/8af47e6))
* Allow passing partnerAttributionID in payment create ([effd944](https://github.com/paypal/paypal-checkout/commit/effd944))
* Api tests and fixes ([bc17e0d](https://github.com/paypal/paypal-checkout/commit/bc17e0d))
* Do not allow rendering button in IE intranet mode ([d68dd60](https://github.com/paypal/paypal-checkout/commit/d68dd60))
* Do not try to parse non-json responses ([b1872a4](https://github.com/paypal/paypal-checkout/commit/b1872a4))
* Export isCheckoutXComponent from loader script ([0225d57](https://github.com/paypal/paypal-checkout/commit/0225d57))
* Fix media queries for zooming subpixel issues ([7646eee](https://github.com/paypal/paypal-checkout/commit/7646eee))
* Fix typos in tests ([4913fc2](https://github.com/paypal/paypal-checkout/commit/4913fc2))
* Make initial height 535px for mobile rather than 100% ([c906bc7](https://github.com/paypal/paypal-checkout/commit/c906bc7))
* Make logger state checkoutjs ([273bd5f](https://github.com/paypal/paypal-checkout/commit/273bd5f))
* Temporarily use cors api urls for sandbox ([5b1b84b](https://github.com/paypal/paypal-checkout/commit/5b1b84b))
* Update all buttons to Checkout from Check out ([c652687](https://github.com/paypal/paypal-checkout/commit/c652687))
* Use configuration for all button differences and validations (#366) ([bd67d55](https://github.com/paypal/paypal-checkout/commit/bd67d55)), closes [#366](https://github.com/paypal/paypal-checkout/issues/366)
* Use getSessionID rather than getPageID ([0444add](https://github.com/paypal/paypal-checkout/commit/0444add))
* Use ZalgoPromise ([c7d6632](https://github.com/paypal/paypal-checkout/commit/c7d6632))



## <small>4.0.82 (2017-06-07)</small>

* Fix typo ([7cf69a9](https://github.com/paypal/paypal-checkout/commit/7cf69a9))



## <small>4.0.81 (2017-06-07)</small>

* Fix fpti logging for payment create ([e22bede](https://github.com/paypal/paypal-checkout/commit/e22bede))
* Use latest cross-domain-utils on publish ([56c50d3](https://github.com/paypal/paypal-checkout/commit/56c50d3))



## <small>4.0.80 (2017-06-06)</small>

* Better hash function for test groups ([41f2e97](https://github.com/paypal/paypal-checkout/commit/41f2e97))
* branded buy now button (#343) ([369075c](https://github.com/paypal/paypal-checkout/commit/369075c)), closes [#343](https://github.com/paypal/paypal-checkout/issues/343)
* Fix checkout iframe scrolling ([dd24889](https://github.com/paypal/paypal-checkout/commit/dd24889))
* Run tag content test as AA test ([564544f](https://github.com/paypal/paypal-checkout/commit/564544f))
* feat(http): Add XHR Timeout configuration (#360) ([e01b747](https://github.com/paypal/paypal-checkout/commit/e01b747)), closes [#360](https://github.com/paypal/paypal-checkout/issues/360)



## <small>4.0.78 (2017-05-23)</small>




## <small>4.0.77 (2017-05-23)</small>

* Fix minimum widths ([73981e7](https://github.com/paypal/paypal-checkout/commit/73981e7))



## <small>4.0.76 (2017-05-23)</small>

* Fix typo in data.braintree ([889ccf7](https://github.com/paypal/paypal-checkout/commit/889ccf7))
* Lightbox size fixes for mobile ([e8ec09c](https://github.com/paypal/paypal-checkout/commit/e8ec09c))



## <small>4.0.75 (2017-05-19)</small>

* Doc fixes ([2f6a770](https://github.com/paypal/paypal-checkout/commit/2f6a770))
* Downgrade `uglify-js` version to work properly with webpack 2 (#348) ([4c07751](https://github.com/paypal/paypal-checkout/commit/4c07751)), closes [#348](https://github.com/paypal/paypal-checkout/issues/348)
* Expose data.braintree in payment ([9a8544f](https://github.com/paypal/paypal-checkout/commit/9a8544f))
* Improve react demo for button ([762cff3](https://github.com/paypal/paypal-checkout/commit/762cff3))
* Switch lightbox to animation which does not break centering in safari ([ac8e104](https://github.com/paypal/paypal-checkout/commit/ac8e104))



## <small>4.0.74 (2017-05-18)</small>

* Add experience prop for paypal.Checkout ([2031888](https://github.com/paypal/paypal-checkout/commit/2031888))
* Change to payment(data, actions) to match onAuthorize ([b5119a6](https://github.com/paypal/paypal-checkout/commit/b5119a6))



## <small>4.0.73 (2017-05-16)</small>

* Add hoverstate for button ([0ca304b](https://github.com/paypal/paypal-checkout/commit/0ca304b))
* Adjust tagline experiment ([8e31d76](https://github.com/paypal/paypal-checkout/commit/8e31d76))
* buy now button (#338) ([594c282](https://github.com/paypal/paypal-checkout/commit/594c282)), closes [#338](https://github.com/paypal/paypal-checkout/issues/338)
* Change Check out to Checkout ([2de8bb2](https://github.com/paypal/paypal-checkout/commit/2de8bb2))
* Instrumentation fixes ([2a8ac49](https://github.com/paypal/paypal-checkout/commit/2a8ac49))
* Remove button fix hacks ([84cd2c8](https://github.com/paypal/paypal-checkout/commit/84cd2c8))
* User onRemember rather than onAuth ([abd6df4](https://github.com/paypal/paypal-checkout/commit/abd6df4))
* docs(http): Add HTTP function documentation and features section on README. (#340) ([4ba2908](https://github.com/paypal/paypal-checkout/commit/4ba2908)), closes [#340](https://github.com/paypal/paypal-checkout/issues/340)



## <small>4.0.72 (2017-05-15)</small>

* David-DM badges and devDependency updates. (#328) ([8488720](https://github.com/paypal/paypal-checkout/commit/8488720)), closes [#328](https://github.com/paypal/paypal-checkout/issues/328)



## <small>4.0.71 (2017-05-11)</small>

* Add additional fpti keys ([6c71567](https://github.com/paypal/paypal-checkout/commit/6c71567))
* Revert "Remove old prop aliases" ([5defb27](https://github.com/paypal/paypal-checkout/commit/5defb27))



## <small>4.0.70 (2017-05-11)</small>

* Add additional FPTI instrumentation ([b6de15f](https://github.com/paypal/paypal-checkout/commit/b6de15f))
* Remove old prop aliases ([84dc3a0](https://github.com/paypal/paypal-checkout/commit/84dc3a0))
* Remove redundant css ([a3fe690](https://github.com/paypal/paypal-checkout/commit/a3fe690))
* Return better error for ajax failures ([de6d31b](https://github.com/paypal/paypal-checkout/commit/de6d31b))



## <small>4.0.69 (2017-05-10)</small>

* Add experiment for tag content ([b504b3c](https://github.com/paypal/paypal-checkout/commit/b504b3c))
* Add test for button rendered before element ready ([ffa9fbf](https://github.com/paypal/paypal-checkout/commit/ffa9fbf))
* Add test for window.open iframe name case ([ce22472](https://github.com/paypal/paypal-checkout/commit/ce22472))
* Better error handling and tests for error cases ([9427918](https://github.com/paypal/paypal-checkout/commit/9427918))
* Break out isElementVisible util ([03f825b](https://github.com/paypal/paypal-checkout/commit/03f825b))
* Bump test memory thresholds ([d5cb1d2](https://github.com/paypal/paypal-checkout/commit/d5cb1d2))
* Display button as inline-block so it can be centered ([e31328c](https://github.com/paypal/paypal-checkout/commit/e31328c))
* Fixed formatting formatting of README (#317) ([c18cedd](https://github.com/paypal/paypal-checkout/commit/c18cedd)), closes [#317](https://github.com/paypal/paypal-checkout/issues/317) [#316](https://github.com/paypal/paypal-checkout/issues/316)
* Have popout tests render to parentRenderWindow ([03e3f58](https://github.com/paypal/paypal-checkout/commit/03e3f58))
* Remove incorrect semi-colon in example (#324) ([d328452](https://github.com/paypal/paypal-checkout/commit/d328452)), closes [#324](https://github.com/paypal/paypal-checkout/issues/324)
* Set default log level to "warn" (#316) ([67866b2](https://github.com/paypal/paypal-checkout/commit/67866b2)), closes [#316](https://github.com/paypal/paypal-checkout/issues/316)
* Show that response can be obtained after successful promise (#320) ([01ab5dd](https://github.com/paypal/paypal-checkout/commit/01ab5dd)), closes [#320](https://github.com/paypal/paypal-checkout/issues/320)
* Tests and fixes for centered buttons ([6821962](https://github.com/paypal/paypal-checkout/commit/6821962))
* Update SECURITY.md to reference bug bounty program (Issue #314) (#327) ([e91870b](https://github.com/paypal/paypal-checkout/commit/e91870b)), closes [#314](https://github.com/paypal/paypal-checkout/issues/314) [#327](https://github.com/paypal/paypal-checkout/issues/327)
* Upgrade post-robot ([c23a49a](https://github.com/paypal/paypal-checkout/commit/c23a49a))
* Use actions.payment.create in docs ([5dced8f](https://github.com/paypal/paypal-checkout/commit/5dced8f))
* Use logLevel info by default when keeping browser open for debugging ([093b5e9](https://github.com/paypal/paypal-checkout/commit/093b5e9))



## <small>4.0.67 (2017-05-03)</small>

* Determine initial dimensions in container template ([b8431b4](https://github.com/paypal/paypal-checkout/commit/b8431b4))
* Do not use css classes for svgs ([1b90e68](https://github.com/paypal/paypal-checkout/commit/1b90e68))
* Fix logo color ([e42b694](https://github.com/paypal/paypal-checkout/commit/e42b694))
* Responsive button fixes and tests ([353262f](https://github.com/paypal/paypal-checkout/commit/353262f))



## <small>4.0.66 (2017-05-02)</small>

* Break button dimensions to separate file ([ffce18d](https://github.com/paypal/paypal-checkout/commit/ffce18d))
* Improve responsive button ([5bcf7af](https://github.com/paypal/paypal-checkout/commit/5bcf7af))
* Pass element for auto-resizing button ([ab538c2](https://github.com/paypal/paypal-checkout/commit/ab538c2))
* Simplified Braintree Integration (#309) ([d8ecf69](https://github.com/paypal/paypal-checkout/commit/d8ecf69)), closes [#309](https://github.com/paypal/paypal-checkout/issues/309)



## <small>4.0.65 (2017-04-27)</small>

* Add tests for button sizes ([fdecf02](https://github.com/paypal/paypal-checkout/commit/fdecf02))
* Safeguard for button logo not displaying in button frame ([7abb7fc](https://github.com/paypal/paypal-checkout/commit/7abb7fc))
* Send actions to payment() method ([dbfc713](https://github.com/paypal/paypal-checkout/commit/dbfc713))
* Upgrade flow and flow-runtime ([1492477](https://github.com/paypal/paypal-checkout/commit/1492477))



## <small>4.0.64 (2017-04-26)</small>

* Disable auto-resize on the button ([311d615](https://github.com/paypal/paypal-checkout/commit/311d615))
* Log button size ([4395fb0](https://github.com/paypal/paypal-checkout/commit/4395fb0))
* Move out demo app ([f47b3a9](https://github.com/paypal/paypal-checkout/commit/f47b3a9))



## <small>4.0.63 (2017-04-25)</small>

* Re-allow setting Checkout.contexts.lightbox manually ([c6c87b7](https://github.com/paypal/paypal-checkout/commit/c6c87b7))



## <small>4.0.62 (2017-04-25)</small>

* Call error from child not onError ([ef8c186](https://github.com/paypal/paypal-checkout/commit/ef8c186))



## <small>4.0.61 (2017-04-25)</small>

* Add event for window having opener and parent ([69cbd79](https://github.com/paypal/paypal-checkout/commit/69cbd79))
* Add fpti feed name ([72e7f31](https://github.com/paypal/paypal-checkout/commit/72e7f31))
* Add tests for error cases in payment method ([30de0eb](https://github.com/paypal/paypal-checkout/commit/30de0eb))
* Check out dist before publish ([9bb0520](https://github.com/paypal/paypal-checkout/commit/9bb0520))
* Fix console.karma ([673a2fc](https://github.com/paypal/paypal-checkout/commit/673a2fc))
* Fix publish script ([9cef40b](https://github.com/paypal/paypal-checkout/commit/9cef40b))
* Have popout tests ensure payment is only called once ([1e9c193](https://github.com/paypal/paypal-checkout/commit/1e9c193))
* Prevent publish with uncommited changes ([f7893d7](https://github.com/paypal/paypal-checkout/commit/f7893d7))
* Remove only ([e675aa3](https://github.com/paypal/paypal-checkout/commit/e675aa3))



## <small>4.0.60 (2017-04-22)</small>




## <small>4.0.59 (2017-04-21)</small>




## <small>4.0.58 (2017-04-21)</small>




## <small>4.0.57 (2017-04-20)</small>

* Make Chrome default test browser ([b4564e7](https://github.com/paypal/paypal-checkout/commit/b4564e7))
* Re-add window.ppxo to exports ([78ee834](https://github.com/paypal/paypal-checkout/commit/78ee834))



## <small>4.0.56 (2017-04-20)</small>

* Add a v4 build without legacy support ([86212d0](https://github.com/paypal/paypal-checkout/commit/86212d0))
* Add flag to exclude legacy support ([2f600be](https://github.com/paypal/paypal-checkout/commit/2f600be))
* Add FPTI tracking ([f8a3ca8](https://github.com/paypal/paypal-checkout/commit/f8a3ca8))
* Add paypal-button id ([866abf2](https://github.com/paypal/paypal-checkout/commit/866abf2))
* Enable feature flags for xcomponent ([b421516](https://github.com/paypal/paypal-checkout/commit/b421516))
* Fix quickbuild script ([68e44f1](https://github.com/paypal/paypal-checkout/commit/68e44f1))
* Fix svg buttons to work for all supported browsers ([a58c9e4](https://github.com/paypal/paypal-checkout/commit/a58c9e4))
* Give button hover state and aria role ([95db867](https://github.com/paypal/paypal-checkout/commit/95db867))
* Kick babel plugins into loose mode ([83d093e](https://github.com/paypal/paypal-checkout/commit/83d093e))
* Move bridge and meta listener to legacy ([56c698f](https://github.com/paypal/paypal-checkout/commit/56c698f))
* Remove polyfills ([c072da9](https://github.com/paypal/paypal-checkout/commit/c072da9))
* Simplify child loader ([1461248](https://github.com/paypal/paypal-checkout/commit/1461248))
* Upgrade beaver-logger ([919d296](https://github.com/paypal/paypal-checkout/commit/919d296))
* Use raw svg code for button logos ([df58673](https://github.com/paypal/paypal-checkout/commit/df58673))
* Use wordmark for pay button ([d3a8e3e](https://github.com/paypal/paypal-checkout/commit/d3a8e3e))



## <small>4.0.55 (2017-04-14)</small>

* Add cross-domain-safe-weakmap to publish script ([32f4d21](https://github.com/paypal/paypal-checkout/commit/32f4d21))
* Add data-paypal-checkout to test child scripts ([23aa9df](https://github.com/paypal/paypal-checkout/commit/23aa9df))
* Add loglevel karma commandline option ([3dabeea](https://github.com/paypal/paypal-checkout/commit/3dabeea))
* Add logs for remembered button ([816fd3f](https://github.com/paypal/paypal-checkout/commit/816fd3f))
* Add pay content ([1971d47](https://github.com/paypal/paypal-checkout/commit/1971d47))
* Add validation demo ([f0018d2](https://github.com/paypal/paypal-checkout/commit/f0018d2))
* Add validation for button locale ([b5821d4](https://github.com/paypal/paypal-checkout/commit/b5821d4))
* Add validation for buttons ([2c377fa](https://github.com/paypal/paypal-checkout/commit/2c377fa))
* Add warning for bind breaking function arrity ([af15a8c](https://github.com/paypal/paypal-checkout/commit/af15a8c))
* Add YouTube deep-dive to readme ([e68d7b8](https://github.com/paypal/paypal-checkout/commit/e68d7b8))
* Allow publish script to take semver major/minor/patch ([3890041](https://github.com/paypal/paypal-checkout/commit/3890041))
* Clean up iframe for button-in-iframe test ([ccc7efe](https://github.com/paypal/paypal-checkout/commit/ccc7efe))
* content and validations for pay with button (#293) ([9076fbb](https://github.com/paypal/paypal-checkout/commit/9076fbb)), closes [#293](https://github.com/paypal/paypal-checkout/issues/293)
* Disable phantom exitOnResourceError ([2e2c0e8](https://github.com/paypal/paypal-checkout/commit/2e2c0e8))
* Do not comma-separate sequences for non-minified build ([6b97143](https://github.com/paypal/paypal-checkout/commit/6b97143))
* Do not warn about multiple legacy setup in test mode ([6d954bc](https://github.com/paypal/paypal-checkout/commit/6d954bc))
* Enable babel caching for karma tests ([fae403d](https://github.com/paypal/paypal-checkout/commit/fae403d))
* Enable caching for babel-loader ([50b9537](https://github.com/paypal/paypal-checkout/commit/50b9537))
* Enable lightbox on parent when button returns onAuth ([8f8df03](https://github.com/paypal/paypal-checkout/commit/8f8df03))
* Expose paypal.forceIframe for child windows to prevent frame-bust ([cb23b8e](https://github.com/paypal/paypal-checkout/commit/cb23b8e))
* Fail when memory crosses over a certain threshold ([baf6ea5](https://github.com/paypal/paypal-checkout/commit/baf6ea5))
* Fix flow errors ([515ad9e](https://github.com/paypal/paypal-checkout/commit/515ad9e))
* Fix flow type errors ([6052dbe](https://github.com/paypal/paypal-checkout/commit/6052dbe))
* Fix priorities of languages for each country  (#279) ([e654a3d](https://github.com/paypal/paypal-checkout/commit/e654a3d)), closes [#279](https://github.com/paypal/paypal-checkout/issues/279)
* Flow errors should fail the build ([3a7efb1](https://github.com/paypal/paypal-checkout/commit/3a7efb1))
* Flow type and lint fixes ([d0c167d](https://github.com/paypal/paypal-checkout/commit/d0c167d))
* IE Compatible Header Detection (#277) ([b366106](https://github.com/paypal/paypal-checkout/commit/b366106)), closes [#277](https://github.com/paypal/paypal-checkout/issues/277)
* IE Intranet Ineligibility Test (#283) ([801bbd8](https://github.com/paypal/paypal-checkout/commit/801bbd8)), closes [#283](https://github.com/paypal/paypal-checkout/issues/283)
* Karma cleanup / fixes ([fa0fe27](https://github.com/paypal/paypal-checkout/commit/fa0fe27))
* Karma Debug (#290) ([bf0850e](https://github.com/paypal/paypal-checkout/commit/bf0850e)), closes [#290](https://github.com/paypal/paypal-checkout/issues/290)
* Make demo app faster to eval code on page changes ([037eff2](https://github.com/paypal/paypal-checkout/commit/037eff2))
* Make logging clearer for startFlow token matching ([b6774f8](https://github.com/paypal/paypal-checkout/commit/b6774f8))
* Only log multiple redirects for full-page redirects ([45abcc7](https://github.com/paypal/paypal-checkout/commit/45abcc7))
* Organize checkout component templates ([18c878f](https://github.com/paypal/paypal-checkout/commit/18c878f))
* Populate missing keys ([2a3c27f](https://github.com/paypal/paypal-checkout/commit/2a3c27f))
* Pre-render entire button into sacrifical iframe for instant button renders ([ee713b8](https://github.com/paypal/paypal-checkout/commit/ee713b8))
* Remove remoteRenderDomain ([1ceb779](https://github.com/paypal/paypal-checkout/commit/1ceb779))
* Set client-side demo to use commit by default ([c97810f](https://github.com/paypal/paypal-checkout/commit/c97810f))
* Set logLevel to warn for tests by default ([44a8ec2](https://github.com/paypal/paypal-checkout/commit/44a8ec2))
* Support for latest xcomponent and post-robot ([f011e99](https://github.com/paypal/paypal-checkout/commit/f011e99))
* Update README.md ([fc6d07a](https://github.com/paypal/paypal-checkout/commit/fc6d07a))
* Update README.md ([6c1f373](https://github.com/paypal/paypal-checkout/commit/6c1f373))
* Upgrade karma ([1c59846](https://github.com/paypal/paypal-checkout/commit/1c59846))
* Use babel-preset-env ([2ae0fb3](https://github.com/paypal/paypal-checkout/commit/2ae0fb3))
* Use browser locale to determine button language for pre-render ([01dbf03](https://github.com/paypal/paypal-checkout/commit/01dbf03))



## <small>4.0.54 (2017-03-20)</small>

* Add DS_Store to gitignore ([f46114c](https://github.com/paypal/paypal-checkout/commit/f46114c))
* Build and use checkout.js once for all tests windows ([324cb91](https://github.com/paypal/paypal-checkout/commit/324cb91))
* Button window responsible for clicking button during tests ([d260310](https://github.com/paypal/paypal-checkout/commit/d260310))
* Change testAction to object with test.action key ([8615f22](https://github.com/paypal/paypal-checkout/commit/8615f22))
* Disable lonely if lint rule ([c2900ba](https://github.com/paypal/paypal-checkout/commit/c2900ba))
* Make karma not depend on lint ([265acf9](https://github.com/paypal/paypal-checkout/commit/265acf9))
* Migrate to babel-plugin-istanbul from babel-plugin-__coverage__ ([fa21614](https://github.com/paypal/paypal-checkout/commit/fa21614))
* Minor test cleanup and fixes ([873c3f5](https://github.com/paypal/paypal-checkout/commit/873c3f5))
* Only give checkout.lib.js a module name ([de787cb](https://github.com/paypal/paypal-checkout/commit/de787cb))
* Pass down flow in test object, to selectively enable lightbox ([2a76920](https://github.com/paypal/paypal-checkout/commit/2a76920))
* Prevent minifying on all files (#268) ([8a5aa36](https://github.com/paypal/paypal-checkout/commit/8a5aa36)), closes [#268](https://github.com/paypal/paypal-checkout/issues/268)
* Prevent uglify warnings ([43a111d](https://github.com/paypal/paypal-checkout/commit/43a111d))
* Render iFrame if Firefox Mobile is detected (#269) ([c6c9573](https://github.com/paypal/paypal-checkout/commit/c6c9573)), closes [#269](https://github.com/paypal/paypal-checkout/issues/269)
* Use correct ES6 semantics and enable tree-shaking ([b3ca908](https://github.com/paypal/paypal-checkout/commit/b3ca908))
* Webpack 2 (#267) ([2eafd55](https://github.com/paypal/paypal-checkout/commit/2eafd55)), closes [#267](https://github.com/paypal/paypal-checkout/issues/267)



## <small>4.0.53 (2017-03-16)</small>

* Add correct props to child loader script ([c282c38](https://github.com/paypal/paypal-checkout/commit/c282c38))
* Clean up dependencies ([8b7c411](https://github.com/paypal/paypal-checkout/commit/8b7c411))
* Disable Braintree demo ([545b8e3](https://github.com/paypal/paypal-checkout/commit/545b8e3))



## <small>4.0.52 (2017-03-15)</small>

* Add checkout.child.loader.js to load the correct version of checkout.js on a child window ([b01833a](https://github.com/paypal/paypal-checkout/commit/b01833a))
* Add parent template for button to enforce minimum width ([6790419](https://github.com/paypal/paypal-checkout/commit/6790419))
* Allow setting different base-url for demo app ([495265f](https://github.com/paypal/paypal-checkout/commit/495265f))
* Always refer to popup bridge as popupBridge rather than just bridge ([e3a84ee](https://github.com/paypal/paypal-checkout/commit/e3a84ee))
* Better validation around payment prop ([5f117c2](https://github.com/paypal/paypal-checkout/commit/5f117c2))
* Cache-bust for retried child loader ([6d3e593](https://github.com/paypal/paypal-checkout/commit/6d3e593))
* Credit Button Demo (#261) ([abbcc62](https://github.com/paypal/paypal-checkout/commit/abbcc62)), closes [#261](https://github.com/paypal/paypal-checkout/issues/261)
* Do all validation inline in props ([c1c1df0](https://github.com/paypal/paypal-checkout/commit/c1c1df0))
* Exclude .idea universally in gitignore ([509c392](https://github.com/paypal/paypal-checkout/commit/509c392))
* Make typecheck task depend on lint ([77f088c](https://github.com/paypal/paypal-checkout/commit/77f088c))
* Reduce timeout for running tests locally ([0b9ea52](https://github.com/paypal/paypal-checkout/commit/0b9ea52))
* Remove build.sh ([42d7b0a](https://github.com/paypal/paypal-checkout/commit/42d7b0a))
* Remove renderPopupTo hack ([b36adf2](https://github.com/paypal/paypal-checkout/commit/b36adf2))
* Revert "fix(Logger): Point client-side logs at /xoplatform/logger, not /webapps/hermes (#237)" ([ca5e395](https://github.com/paypal/paypal-checkout/commit/ca5e395)), closes [#237](https://github.com/paypal/paypal-checkout/issues/237)
* Run tests in parent window (and maybe speed up on travis?) ([7d7a922](https://github.com/paypal/paypal-checkout/commit/7d7a922))
* Use postBridge to refer to postRobot bridge ([b66ce11](https://github.com/paypal/paypal-checkout/commit/b66ce11))
* Use rsync for quickbuild script ([633dd4c](https://github.com/paypal/paypal-checkout/commit/633dd4c))



## <small>4.0.51 (2017-03-09)</small>

* Add postinstall script to npm package ([0f9ed65](https://github.com/paypal/paypal-checkout/commit/0f9ed65))



## <small>4.0.50 (2017-03-09)</small>




## <small>4.0.49 (2017-03-09)</small>

* Add more robust post-install script to resolve flow-bin version issue ([db0b89d](https://github.com/paypal/paypal-checkout/commit/db0b89d))
* Demo app only takes $0.01 and no-op execute in production mode ([3ac6980](https://github.com/paypal/paypal-checkout/commit/3ac6980))
* Log if same-page button is visible after render ([5bb49b0](https://github.com/paypal/paypal-checkout/commit/5bb49b0))
* Remove v3 preventDefault for form integrations with condition ([4911fe2](https://github.com/paypal/paypal-checkout/commit/4911fe2))
* Use correct redirect_uri for popup-bridge flow ([7c27c85](https://github.com/paypal/paypal-checkout/commit/7c27c85))
* fix(Logger): Point client-side logs at /xoplatform/logger, not /webapps/hermes (#237) ([8111868](https://github.com/paypal/paypal-checkout/commit/8111868)), closes [#237](https://github.com/paypal/paypal-checkout/issues/237)



## <small>4.0.48 (2017-03-08)</small>




## <small>4.0.47 (2017-03-08)</small>

* Add development quickstart docs ([524fb61](https://github.com/paypal/paypal-checkout/commit/524fb61))
* Add tests for condition for hijack cases, and stub out tests for hybrid cases ([bae9713](https://github.com/paypal/paypal-checkout/commit/bae9713))
* Add Travis build status on README.md (#218) ([c11a2cd](https://github.com/paypal/paypal-checkout/commit/c11a2cd)), closes [#218](https://github.com/paypal/paypal-checkout/issues/218)
* Clear old version of flow-bin before publishing ([a02e2e9](https://github.com/paypal/paypal-checkout/commit/a02e2e9))
* Credit button validations (#223) ([8f82206](https://github.com/paypal/paypal-checkout/commit/8f82206)), closes [#223](https://github.com/paypal/paypal-checkout/issues/223)
* Dockerize and document demo app (#224) ([a767c59](https://github.com/paypal/paypal-checkout/commit/a767c59)), closes [#224](https://github.com/paypal/paypal-checkout/issues/224)
* Enable Braintree demo and use latest published scripts ([c029ab0](https://github.com/paypal/paypal-checkout/commit/c029ab0))
* Fix indentation for build files ([a501073](https://github.com/paypal/paypal-checkout/commit/a501073))
* Fix package.json formatting ([84b2714](https://github.com/paypal/paypal-checkout/commit/84b2714))
* Fix WARN on npm install command (#219) ([264ef5a](https://github.com/paypal/paypal-checkout/commit/264ef5a)), closes [#219](https://github.com/paypal/paypal-checkout/issues/219)
* Log any errors from popup bridge render ([484be97](https://github.com/paypal/paypal-checkout/commit/484be97))
* Normalize spinner css ([446ef45](https://github.com/paypal/paypal-checkout/commit/446ef45))
* Pass minify parameter so minimization will happen in build. (#221) ([44e1321](https://github.com/paypal/paypal-checkout/commit/44e1321)), closes [#221](https://github.com/paypal/paypal-checkout/issues/221)
* Remove unicode line-separator characters ([c2ada02](https://github.com/paypal/paypal-checkout/commit/c2ada02))
* Render iframe when unable to render popup from button ([66e7e68](https://github.com/paypal/paypal-checkout/commit/66e7e68))
* Set default logLevel to info ([a3296b1](https://github.com/paypal/paypal-checkout/commit/a3296b1))
* Use gulp-flowtype to run flow, with latest flow-bin ([e02f361](https://github.com/paypal/paypal-checkout/commit/e02f361))
* Use vmin to size button spinner, remove sizing javascript ([6355190](https://github.com/paypal/paypal-checkout/commit/6355190))



## <small>4.0.46 (2017-03-03)</small>

* Abstract out onKey method to wait for props to be set ([afde30f](https://github.com/paypal/paypal-checkout/commit/afde30f))
* Adopt popupBridge api for webviews ([d994b41](https://github.com/paypal/paypal-checkout/commit/d994b41))
* Allow window.ppnativexo to be set at any time, and used for any webview ([28d2c05](https://github.com/paypal/paypal-checkout/commit/28d2c05))
* Fix flow error ([d355c31](https://github.com/paypal/paypal-checkout/commit/d355c31))
* Improve mark demo ([8e1f842](https://github.com/paypal/paypal-checkout/commit/8e1f842))



## <small>4.0.45 (2017-02-28)</small>




## <small>4.0.44 (2017-02-28)</small>

* Add large and responsive button sizes ([491d987](https://github.com/paypal/paypal-checkout/commit/491d987))
* Cleanup ([ca7fd36](https://github.com/paypal/paypal-checkout/commit/ca7fd36))
* Only allow autoResize for height, for button and checkout ([402ee0f](https://github.com/paypal/paypal-checkout/commit/402ee0f))
* Pass logLevel down as a prop ([a675143](https://github.com/paypal/paypal-checkout/commit/a675143))
* Set initial size of small button to 42px ([99b1ea1](https://github.com/paypal/paypal-checkout/commit/99b1ea1))
* Update to latest flow-runtime with fixed arrow function argument issue ([f92d11a](https://github.com/paypal/paypal-checkout/commit/f92d11a))



## <small>4.0.43 (2017-02-16)</small>

* Fix typo ([178c2ab](https://github.com/paypal/paypal-checkout/commit/178c2ab))
* Fixing repo in `git remote add upstream` call (#195) ([b08298e](https://github.com/paypal/paypal-checkout/commit/b08298e)), closes [#195](https://github.com/paypal/paypal-checkout/issues/195)
* Removed direct lint calls in instructions (#196) ([0548c9b](https://github.com/paypal/paypal-checkout/commit/0548c9b)), closes [#196](https://github.com/paypal/paypal-checkout/issues/196)



## <small>4.0.42 (2017-02-15)</small>

* Add body-parser dependency ([86232ea](https://github.com/paypal/paypal-checkout/commit/86232ea))
* Add demo page for experience profiles ([1f6696c](https://github.com/paypal/paypal-checkout/commit/1f6696c))
* Comment out agreements and braintree demo ([f3b1296](https://github.com/paypal/paypal-checkout/commit/f3b1296))
* Correctly fail for json parse error in http call ([d6280f6](https://github.com/paypal/paypal-checkout/commit/d6280f6))
* Fix type errors ([7cfa592](https://github.com/paypal/paypal-checkout/commit/7cfa592))
* Propagate window.ppxonative.start to child windows and frames ([8c1f686](https://github.com/paypal/paypal-checkout/commit/8c1f686))



## <small>4.0.41 (2017-02-14)</small>

* Accept a logLevel option ([f5a9a71](https://github.com/paypal/paypal-checkout/commit/f5a9a71))
* Add demo app to build/publish jobs ([b591bb3](https://github.com/paypal/paypal-checkout/commit/b591bb3))
* Add onRemembered callback prop to button ([7365580](https://github.com/paypal/paypal-checkout/commit/7365580))
* Bump up default timeout for onHashChange in tests ([bcc57bf](https://github.com/paypal/paypal-checkout/commit/bcc57bf))
* Demo app - add env toggle, css fixes ([cb211ea](https://github.com/paypal/paypal-checkout/commit/cb211ea))
* Demo app - display button above description ([44437dc](https://github.com/paypal/paypal-checkout/commit/44437dc))
* Ensure button is correctly centered in demo ([4dcf4b6](https://github.com/paypal/paypal-checkout/commit/4dcf4b6))
* IE css fixes for demo ([be445da](https://github.com/paypal/paypal-checkout/commit/be445da))
* Include latest versioned file in dist ([36f02cf](https://github.com/paypal/paypal-checkout/commit/36f02cf))
* Make intranet IE ineligible, with a warning ([b655af7](https://github.com/paypal/paypal-checkout/commit/b655af7))
* Move demo app to react, with new design ([f9cb317](https://github.com/paypal/paypal-checkout/commit/f9cb317))
* Remove duplicate babel preset from package.json ([498abe9](https://github.com/paypal/paypal-checkout/commit/498abe9))
* Render js errors to page ([27718df](https://github.com/paypal/paypal-checkout/commit/27718df))
* Set up demo app to be mounted on other express servers ([bdec9e7](https://github.com/paypal/paypal-checkout/commit/bdec9e7))
* Test fixes for Chrome ([a76c2a4](https://github.com/paypal/paypal-checkout/commit/a76c2a4))
* Use flow-runtime for runtime type validations in karma tests ([6f5202a](https://github.com/paypal/paypal-checkout/commit/6f5202a))



## <small>4.0.40 (2017-02-09)</small>

* Add files param to package.json to reduce file size of npm package (#184) ([fba3e45](https://github.com/paypal/paypal-checkout/commit/fba3e45)), closes [#184](https://github.com/paypal/paypal-checkout/issues/184)
* Allow all v3 mobile users to throttle, but disable lightbox if no meta viewport ([e9968c2](https://github.com/paypal/paypal-checkout/commit/e9968c2))
* Simplify and comment code examples ([c114803](https://github.com/paypal/paypal-checkout/commit/c114803))



## <small>4.0.39 (2017-02-03)</small>

* Add billingAgreement as alias for payment to Checkout component ([2c9fd47](https://github.com/paypal/paypal-checkout/commit/2c9fd47))
* Add debugging docs ([240a67a](https://github.com/paypal/paypal-checkout/commit/240a67a))
* Add displayTo tests ([6c1caa0](https://github.com/paypal/paypal-checkout/commit/6c1caa0))
* Add karma browser timeouts ([da9c014](https://github.com/paypal/paypal-checkout/commit/da9c014))
* Add native sdk bindings ([f752acb](https://github.com/paypal/paypal-checkout/commit/f752acb))
* Add SlimerJS as karma option ([ae04e0a](https://github.com/paypal/paypal-checkout/commit/ae04e0a))
* Add tests to ensure billingAgreement prop works ([e898437](https://github.com/paypal/paypal-checkout/commit/e898437))
* Add travis retry ([6bd198a](https://github.com/paypal/paypal-checkout/commit/6bd198a))
* Cleanup and refactoring ([3c4f954](https://github.com/paypal/paypal-checkout/commit/3c4f954))
* Do not pass stage prop when not in stage env ([57d0ef9](https://github.com/paypal/paypal-checkout/commit/57d0ef9))
* Do not pipe out eslint result, causes a bug which deletes file contents ([9922f42](https://github.com/paypal/paypal-checkout/commit/9922f42))
* Enable source maps ([83914e6](https://github.com/paypal/paypal-checkout/commit/83914e6))
* Enable sourcemaps for tests ([5c2a9e1](https://github.com/paypal/paypal-checkout/commit/5c2a9e1))
* Export PopupOpenError to be consumed by public callers ([db28533](https://github.com/paypal/paypal-checkout/commit/db28533))
* Fix case when hijack button is rendered inside a link, inside a form ([457c2c6](https://github.com/paypal/paypal-checkout/commit/457c2c6))
* Fix document.body type errors ([0c2c8c1](https://github.com/paypal/paypal-checkout/commit/0c2c8c1))
* Fix error and restart tests ([a42c918](https://github.com/paypal/paypal-checkout/commit/a42c918))
* Force checkout child to render popup to parentRenderWindow ([33f142e](https://github.com/paypal/paypal-checkout/commit/33f142e))
* Improve memoize type checking ([ecb4e8f](https://github.com/paypal/paypal-checkout/commit/ecb4e8f))
* Make onCancel a noop by default ([bac0d3e](https://github.com/paypal/paypal-checkout/commit/bac0d3e))
* More tests and fixes for native integration ([cc2f843](https://github.com/paypal/paypal-checkout/commit/cc2f843))
* Normalize headers to lowercase for request() ([a4ebfda](https://github.com/paypal/paypal-checkout/commit/a4ebfda))
* Only log authorize checkpoint for device group ([be04fe3](https://github.com/paypal/paypal-checkout/commit/be04fe3))
* Only run mobile throttle when the site has the correct meta viewport ([891c626](https://github.com/paypal/paypal-checkout/commit/891c626))
* preliminary sample app to show case the different kinds of palpal-checkout integrations (#159) ([f87bfd4](https://github.com/paypal/paypal-checkout/commit/f87bfd4)), closes [#159](https://github.com/paypal/paypal-checkout/issues/159)
* Ramp v3 mobile to 10% ([c63e08b](https://github.com/paypal/paypal-checkout/commit/c63e08b))
* Remove hacks to enable lightbox, leave this up to button ([adefdd6](https://github.com/paypal/paypal-checkout/commit/adefdd6))
* Remove logReturnUrl code ([81d45a6](https://github.com/paypal/paypal-checkout/commit/81d45a6))
* Remove onPayment* aliases ([46f1ff6](https://github.com/paypal/paypal-checkout/commit/46f1ff6))
* Remove redundant window.console.karma ([e88a11e](https://github.com/paypal/paypal-checkout/commit/e88a11e))
* Remove separate billingAgreement field ([fa05da1](https://github.com/paypal/paypal-checkout/commit/fa05da1))
* Send stage prop for local env as well as stage ([2d22755](https://github.com/paypal/paypal-checkout/commit/2d22755))
* Set Travis to use Chrome ([02642e9](https://github.com/paypal/paypal-checkout/commit/02642e9))
* Support renderTo prop to show button to remembered users ([34cfb3f](https://github.com/paypal/paypal-checkout/commit/34cfb3f))
* Type fixes ([5849d32](https://github.com/paypal/paypal-checkout/commit/5849d32))
* Type safety in tests ([3746bf5](https://github.com/paypal/paypal-checkout/commit/3746bf5))
* Use vanilla js for mark example ([8b56a9f](https://github.com/paypal/paypal-checkout/commit/8b56a9f))



## <small>4.0.38 (2017-01-13)</small>

* Add AB test for legacy mobile in popup/lightbox ([d06517e](https://github.com/paypal/paypal-checkout/commit/d06517e))
* Add flow annotations ([dcba31a](https://github.com/paypal/paypal-checkout/commit/dcba31a))
* Add flow-typed and type check /test ([0c890bc](https://github.com/paypal/paypal-checkout/commit/0c890bc))
* Add flow-typed to .flowconfig ([3a6e86f](https://github.com/paypal/paypal-checkout/commit/3a6e86f))
* Add index.js ([7532b63](https://github.com/paypal/paypal-checkout/commit/7532b63))
* Add return types ([73c6e75](https://github.com/paypal/paypal-checkout/commit/73c6e75))
* Add set of flow eslint rules ([7e0b65e](https://github.com/paypal/paypal-checkout/commit/7e0b65e))
* Add support for flow ([beb4c27](https://github.com/paypal/paypal-checkout/commit/beb4c27))
* Add support for gulp lint --fix ([8b8c9f4](https://github.com/paypal/paypal-checkout/commit/8b8c9f4))
* Better type safety for memoize ([6d86d2c](https://github.com/paypal/paypal-checkout/commit/6d86d2c))
* Chai fix ([90b2b7f](https://github.com/paypal/paypal-checkout/commit/90b2b7f))
* Do not allow any type ([5e6dc4e](https://github.com/paypal/paypal-checkout/commit/5e6dc4e))
* Do not use flow loose mode ([7e28f78](https://github.com/paypal/paypal-checkout/commit/7e28f78))
* Fix flow type error ([cb6001a](https://github.com/paypal/paypal-checkout/commit/cb6001a))
* Fix legacy fallback test ([fcd21e3](https://github.com/paypal/paypal-checkout/commit/fcd21e3))
* Fix typechecks and tests ([2c442bb](https://github.com/paypal/paypal-checkout/commit/2c442bb))
* Fix typo ([809aea6](https://github.com/paypal/paypal-checkout/commit/809aea6))
* Flow fixes ([6afdc88](https://github.com/paypal/paypal-checkout/commit/6afdc88))
* Have redirect/fallback in legacy return a non-resolving promise ([5a20519](https://github.com/paypal/paypal-checkout/commit/5a20519))
* Lint fixes ([a4d29b8](https://github.com/paypal/paypal-checkout/commit/a4d29b8))
* Lint src and test separately ([c034fc1](https://github.com/paypal/paypal-checkout/commit/c034fc1))
* Remove console logs from tests ([19525c1](https://github.com/paypal/paypal-checkout/commit/19525c1))
* Set karma mocha test timeout to 5000ms ([9db35d5](https://github.com/paypal/paypal-checkout/commit/9db35d5))
* Statically include button.js for tests ([e93f869](https://github.com/paypal/paypal-checkout/commit/e93f869))
* Typing and lint fixes ([b4ce633](https://github.com/paypal/paypal-checkout/commit/b4ce633))
* Use absolute urls in README so images and links work on NPM (#155) ([e816e30](https://github.com/paypal/paypal-checkout/commit/e816e30)), closes [#155](https://github.com/paypal/paypal-checkout/issues/155)
* Use GenericFunction rather than MemoizedFunction ([c1abdae](https://github.com/paypal/paypal-checkout/commit/c1abdae))
* Use SyncPromise directly to play nicely with type system ([12b2cc0](https://github.com/paypal/paypal-checkout/commit/12b2cc0))
* Use typeof window rather than window for type checks ([46e3b5d](https://github.com/paypal/paypal-checkout/commit/46e3b5d))



## <small>4.0.37 (2016-12-16)</small>

* Add a test for checkout with no click event error case ([0ad6562](https://github.com/paypal/paypal-checkout/commit/0ad6562))
* Add cancel tests for each use case ([c35afe2](https://github.com/paypal/paypal-checkout/commit/c35afe2))
* Add karma to build task ([4909ceb](https://github.com/paypal/paypal-checkout/commit/4909ceb))
* Add logging to REST calls ([626c2c5](https://github.com/paypal/paypal-checkout/commit/626c2c5))
* Add test for embedded frame renderTo ([3d5595e](https://github.com/paypal/paypal-checkout/commit/3d5595e))
* Build dist/checkout.lib.js with UMD and point index.js towards it ([3378465](https://github.com/paypal/paypal-checkout/commit/3378465))
* Cleanup and tests ([96d2a26](https://github.com/paypal/paypal-checkout/commit/96d2a26))
* Disallow opening window outside of click event ([af2fa35](https://github.com/paypal/paypal-checkout/commit/af2fa35))
* Handle fullpage-redirect-on-error for multiple use cases ([30a7d66](https://github.com/paypal/paypal-checkout/commit/30a7d66))
* Legacy error cases tests and fixes ([727e6cd](https://github.com/paypal/paypal-checkout/commit/727e6cd))
* More cleanup ([387c221](https://github.com/paypal/paypal-checkout/commit/387c221))
* More legacy error test cases ([0493941](https://github.com/paypal/paypal-checkout/commit/0493941))
* Refactoring and cleanup ([f5e5c45](https://github.com/paypal/paypal-checkout/commit/f5e5c45))
* Remove test from publish.sh ([313c14c](https://github.com/paypal/paypal-checkout/commit/313c14c))
* Run legacy error cases on both context types ([b7dd15f](https://github.com/paypal/paypal-checkout/commit/b7dd15f))
* Test for full-page redirect for invalid env ([be01c79](https://github.com/paypal/paypal-checkout/commit/be01c79))
* Tests and fixes for legacy onError cases ([79cb017](https://github.com/paypal/paypal-checkout/commit/79cb017))



## <small>4.0.36 (2016-12-09)</small>

* Add throttle code to AB test full-page vs in-context ([1a8a950](https://github.com/paypal/paypal-checkout/commit/1a8a950))
* Update README.md ([0cb17cc](https://github.com/paypal/paypal-checkout/commit/0cb17cc))



## <small>4.0.35 (2016-12-08)</small>

* Fix link to checkout.js in demos ([610c4bf](https://github.com/paypal/paypal-checkout/commit/610c4bf))



## <small>4.0.34 (2016-12-08)</small>

* Add angular demo ([0de2e67](https://github.com/paypal/paypal-checkout/commit/0de2e67))
* Add default xcomponent timeout of 500ms for tests ([034e5c9](https://github.com/paypal/paypal-checkout/commit/034e5c9))
* Add popout redirect tests to button ([9869a49](https://github.com/paypal/paypal-checkout/commit/9869a49))
* Add React demo ([bbb0099](https://github.com/paypal/paypal-checkout/commit/bbb0099))
* Add restart tests ([794d7f6](https://github.com/paypal/paypal-checkout/commit/794d7f6))
* Add test cases for onError ([c57d113](https://github.com/paypal/paypal-checkout/commit/c57d113))
* Add tests for popout then redirect ([077e4aa](https://github.com/paypal/paypal-checkout/commit/077e4aa))
* Add tests for React and Angular driver integrations ([af7d728](https://github.com/paypal/paypal-checkout/commit/af7d728))
* Do not destroy postRobot bridges between each test ([072f35c](https://github.com/paypal/paypal-checkout/commit/072f35c))
* Ensure errors are passed up as Error objects to onError ([3b45198](https://github.com/paypal/paypal-checkout/commit/3b45198))
* Force iframe mode for restart ([1b9b20e](https://github.com/paypal/paypal-checkout/commit/1b9b20e))
* Have checkout mock component call onAuth, if passed ([5333339](https://github.com/paypal/paypal-checkout/commit/5333339))
* Return bridge promise in legacy setup call ([393bf63](https://github.com/paypal/paypal-checkout/commit/393bf63))
* Use config.checkoutUrl rather than CHILD_URI constant ([376e2eb](https://github.com/paypal/paypal-checkout/commit/376e2eb))



## <small>4.0.33 (2016-12-06)</small>

* Add debugging docs ([e6404a8](https://github.com/paypal/paypal-checkout/commit/e6404a8))
* Add debugging docs ([92e1d74](https://github.com/paypal/paypal-checkout/commit/92e1d74))
* Add img directory to docs ([2777172](https://github.com/paypal/paypal-checkout/commit/2777172))



## <small>4.0.32 (2016-12-05)</small>

* Add tests for popout-from-lightbox case ([56d7b12](https://github.com/paypal/paypal-checkout/commit/56d7b12))
* Re-export config from paypal object ([a6c199c](https://github.com/paypal/paypal-checkout/commit/a6c199c))
* Refactor test file structure ([afaf803](https://github.com/paypal/paypal-checkout/commit/afaf803))



## <small>4.0.31 (2016-12-05)</small>

* Remove old code ([9c0ef90](https://github.com/paypal/paypal-checkout/commit/9c0ef90))



## <small>4.0.30 (2016-12-05)</small>

* Add beacon file ([4e92497](https://github.com/paypal/paypal-checkout/commit/4e92497))
* Add bridge support to tests ([db0d9c5](https://github.com/paypal/paypal-checkout/commit/db0d9c5))
* Add mock domains to tests ([5feed67](https://github.com/paypal/paypal-checkout/commit/5feed67))
* Add validation tests ([e12f804](https://github.com/paypal/paypal-checkout/commit/e12f804))
* Allow xcomponent to do log proxying for tests ([94eb085](https://github.com/paypal/paypal-checkout/commit/94eb085))
* Do a full-page redirect for legacy integration fallbacks ([e23b165](https://github.com/paypal/paypal-checkout/commit/e23b165))
* Do not call proxyRest methods if window closed ([1e5dc98](https://github.com/paypal/paypal-checkout/commit/1e5dc98))
* Do not export paypal.config ([4e518fe](https://github.com/paypal/paypal-checkout/commit/4e518fe))
* Do not export paypal.xcomponent by default ([4286a31](https://github.com/paypal/paypal-checkout/commit/4286a31))
* Fix eslint errors ([f0628f9](https://github.com/paypal/paypal-checkout/commit/f0628f9))
* Fix git url ([e8bf3e0](https://github.com/paypal/paypal-checkout/commit/e8bf3e0))
* Fix protocol log ([b1ebba8](https://github.com/paypal/paypal-checkout/commit/b1ebba8))
* Get tests working in popup-bridge mode ([88f2c6d](https://github.com/paypal/paypal-checkout/commit/88f2c6d))
* Go to correct url / url param when BA- token passed ([e317266](https://github.com/paypal/paypal-checkout/commit/e317266))
* More test cases ([d5d25a4](https://github.com/paypal/paypal-checkout/commit/d5d25a4))
* Only enable lightbox for 5 minutes after auth ([ac890df](https://github.com/paypal/paypal-checkout/commit/ac890df))
* Propagate errors up from checkout to button ([d779a9c](https://github.com/paypal/paypal-checkout/commit/d779a9c))
* Refactor and test fallback logic ([6974db3](https://github.com/paypal/paypal-checkout/commit/6974db3))
* Remove unused code ([cf1380a](https://github.com/paypal/paypal-checkout/commit/cf1380a))
* Update button.md (#121) ([6bc07c2](https://github.com/paypal/paypal-checkout/commit/6bc07c2)), closes [#121](https://github.com/paypal/paypal-checkout/issues/121)
* Update LICENSE.txt ([1ef802c](https://github.com/paypal/paypal-checkout/commit/1ef802c))
* Update LICENSE.txt ([10fd497](https://github.com/paypal/paypal-checkout/commit/10fd497))
* Update package.json name ([552249d](https://github.com/paypal/paypal-checkout/commit/552249d))



## <small>4.0.28 (2016-11-18)</small>

* Clean up 3pc disabled code -- handling correctly in button/checkout apps ([8af7055](https://github.com/paypal/paypal-checkout/commit/8af7055))
* Move beacon code into repo ([03acebd](https://github.com/paypal/paypal-checkout/commit/03acebd))



## <small>4.0.27 (2016-11-18)</small>

* Fix button->checkout tests ([ecd9ba0](https://github.com/paypal/paypal-checkout/commit/ecd9ba0))
* Fixes for 3rd party cookies disabled mode in button ([a2e2918](https://github.com/paypal/paypal-checkout/commit/a2e2918))



## <small>4.0.26 (2016-11-17)</small>

* Add onAuth function ([6a3d14d](https://github.com/paypal/paypal-checkout/commit/6a3d14d))



## <small>4.0.25 (2016-11-16)</small>

* Quick fix to enable auth requests from button in cookies disabled mode ([b39e0e1](https://github.com/paypal/paypal-checkout/commit/b39e0e1))



## <small>4.0.24 (2016-11-16)</small>

* Extend existing window.PAYPAL if found ([1b17eec](https://github.com/paypal/paypal-checkout/commit/1b17eec))



## <small>4.0.23 (2016-11-16)</small>

* Add tests and account for another corner case for button and container case ([5eadfbe](https://github.com/paypal/paypal-checkout/commit/5eadfbe))



## <small>4.0.22 (2016-11-16)</small>

* Emulate strange legacy button logic ([5a78758](https://github.com/paypal/paypal-checkout/commit/5a78758))
* Fix to use isArray ([bcac2a1](https://github.com/paypal/paypal-checkout/commit/bcac2a1))
* If passed options.button, ignore options.container ([3cda4ba](https://github.com/paypal/paypal-checkout/commit/3cda4ba))



## <small>4.0.21 (2016-11-16)</small>

* Add a warning for fallback ([a3ccabd](https://github.com/paypal/paypal-checkout/commit/a3ccabd))
* Add test gulp task ([2099833](https://github.com/paypal/paypal-checkout/commit/2099833))
* Add test to publish.sh ([9ccb2bb](https://github.com/paypal/paypal-checkout/commit/9ccb2bb))
* Add travis.yml ([f53db4d](https://github.com/paypal/paypal-checkout/commit/f53db4d))
* Ensure v4 script gets picked up as current script ([c50e533](https://github.com/paypal/paypal-checkout/commit/c50e533))
* Log errors which make it to onError in legacy.js ([78cf375](https://github.com/paypal/paypal-checkout/commit/78cf375))



## <small>4.0.20 (2016-11-15)</small>




## <small>4.0.19 (2016-11-15)</small>

* Make setup callable once only ([9abbb3f](https://github.com/paypal/paypal-checkout/commit/9abbb3f))



## <small>4.0.18 (2016-11-15)</small>

* Pull in latest files during publish ([e488217](https://github.com/paypal/paypal-checkout/commit/e488217))



## <small>4.0.17 (2016-11-15)</small>

* Fix quick build script ([a05a5a8](https://github.com/paypal/paypal-checkout/commit/a05a5a8))
* Work correctly when different url passed than specified env ([450f84d](https://github.com/paypal/paypal-checkout/commit/450f84d))



## <small>4.0.16 (2016-11-15)</small>

* Fix gitignore rule ([a77c10a](https://github.com/paypal/paypal-checkout/commit/a77c10a))
* Reduce redirect delay for legacy ([abb24c1](https://github.com/paypal/paypal-checkout/commit/abb24c1))
* Remove minor versions from dist ([2a5b94f](https://github.com/paypal/paypal-checkout/commit/2a5b94f))
* Set publish script to actually publish ([486fbac](https://github.com/paypal/paypal-checkout/commit/486fbac))



## <small>4.0.15 (2016-11-15)</small>

* Build checkout.js, etc ([8d9dac1](https://github.com/paypal/paypal-checkout/commit/8d9dac1))
* Remove old dist files ([fb2b0c9](https://github.com/paypal/paypal-checkout/commit/fb2b0c9))



## <small>4.0.14 (2016-11-14)</small>

* Add all varieties of hijack test ([895a606](https://github.com/paypal/paypal-checkout/commit/895a606))
* Add basic button demo ([69e131a](https://github.com/paypal/paypal-checkout/commit/69e131a))
* Add button tests ([b9a586d](https://github.com/paypal/paypal-checkout/commit/b9a586d))
* Add closeFlow check to click check ([d66a03c](https://github.com/paypal/paypal-checkout/commit/d66a03c))
* Add custom button tests ([0e91c61](https://github.com/paypal/paypal-checkout/commit/0e91c61))
* Add custom click tests for merchants listening on click of the button ([d906f4c](https://github.com/paypal/paypal-checkout/commit/d906f4c))
* Add first hijack test ([c24c012](https://github.com/paypal/paypal-checkout/commit/c24c012))
* Add legacy locale option tests ([9bab273](https://github.com/paypal/paypal-checkout/commit/9bab273))
* Added hybrid setup/hijack tests ([b826a13](https://github.com/paypal/paypal-checkout/commit/b826a13))
* Break out non legacy-specific code from legacy ([e4c9336](https://github.com/paypal/paypal-checkout/commit/e4c9336))
* Bridge failure should only be a hard error for IE ([60bce7b](https://github.com/paypal/paypal-checkout/commit/60bce7b))
* Change default prod client id ([f150195](https://github.com/paypal/paypal-checkout/commit/f150195))
* Clean up docs ([4c07b39](https://github.com/paypal/paypal-checkout/commit/4c07b39))
* Clean up old minor versions from dist/ ([86179d3](https://github.com/paypal/paypal-checkout/commit/86179d3))
* Clear up old demo files ([ead9e2f](https://github.com/paypal/paypal-checkout/commit/ead9e2f))
* Export http ([7551579](https://github.com/paypal/paypal-checkout/commit/7551579))
* Fail hard when env does not match startFlow url ([2a07c91](https://github.com/paypal/paypal-checkout/commit/2a07c91))
* Fix build script ([f80f594](https://github.com/paypal/paypal-checkout/commit/f80f594))
* Fix button renderer ([2a88125](https://github.com/paypal/paypal-checkout/commit/2a88125))
* Fix dynamic bridge urls ([dbbf225](https://github.com/paypal/paypal-checkout/commit/dbbf225))
* Fix for hybrid startflow ([0dd5d5f](https://github.com/paypal/paypal-checkout/commit/0dd5d5f))
* Ignore minor version files in dist/ ([9eb1f15](https://github.com/paypal/paypal-checkout/commit/9eb1f15))
* Locale tests and refactoring ([f38f5cc](https://github.com/paypal/paypal-checkout/commit/f38f5cc))
* More button tests ([85b4bb4](https://github.com/paypal/paypal-checkout/commit/85b4bb4))
* More button tests ([e0f33f8](https://github.com/paypal/paypal-checkout/commit/e0f33f8))
* More test cases and cleanup ([5c7ebe0](https://github.com/paypal/paypal-checkout/commit/5c7ebe0))
* Only allow ready method to be called once ([c00f653](https://github.com/paypal/paypal-checkout/commit/c00f653))
* Promisify tests ([94b1a62](https://github.com/paypal/paypal-checkout/commit/94b1a62))
* Ready tests and improvements ([93ebea8](https://github.com/paypal/paypal-checkout/commit/93ebea8))
* Remove additional complexity from ready handler ([610d4d0](https://github.com/paypal/paypal-checkout/commit/610d4d0))
* Remove resize delay ([fd5908a](https://github.com/paypal/paypal-checkout/commit/fd5908a))
* Run tests for both popup and lightbox ([a4abf85](https://github.com/paypal/paypal-checkout/commit/a4abf85))
* Simplify hijack case ([511c54d](https://github.com/paypal/paypal-checkout/commit/511c54d))
* Simplify legacy compatibility layer ([a6c0926](https://github.com/paypal/paypal-checkout/commit/a6c0926))
* Split legacy tests ([8a5bcb0](https://github.com/paypal/paypal-checkout/commit/8a5bcb0))
* Tests refactoring ([319523d](https://github.com/paypal/paypal-checkout/commit/319523d))
* Update contrib doc ([a106bcc](https://github.com/paypal/paypal-checkout/commit/a106bcc))
* Use payment id by default for client side rest ([fc197f8](https://github.com/paypal/paypal-checkout/commit/fc197f8))



## <small>4.0.13 (2016-11-07)</small>

* Add Braintree support ([92eaad1](https://github.com/paypal/paypal-checkout/commit/92eaad1))
* Add click listener to container for legacy integrations, not button ([55e2385](https://github.com/paypal/paypal-checkout/commit/55e2385))
* Add function to check for common errors in the page ([e96f38d](https://github.com/paypal/paypal-checkout/commit/e96f38d))
* Add iterator shim ([5ad429b](https://github.com/paypal/paypal-checkout/commit/5ad429b))
* Add locale prop to checkout component ([3364292](https://github.com/paypal/paypal-checkout/commit/3364292))
* Add logger messages for broken json ([3bdd7fd](https://github.com/paypal/paypal-checkout/commit/3bdd7fd))
* Add options to enable lightbox and bridge ([397a36d](https://github.com/paypal/paypal-checkout/commit/397a36d))
* Add polyfills to compat ([fbc12f0](https://github.com/paypal/paypal-checkout/commit/fbc12f0))
* Add support for experience profiles ([c750ca0](https://github.com/paypal/paypal-checkout/commit/c750ca0))
* Add support for payments standard button ID ([78ed8b6](https://github.com/paypal/paypal-checkout/commit/78ed8b6))
* Add temporary window.Promise shim ([dca5cdb](https://github.com/paypal/paypal-checkout/commit/dca5cdb))
* Additional validation ([faeb88d](https://github.com/paypal/paypal-checkout/commit/faeb88d))
* Additonal error handling around env/url ([68e4bac](https://github.com/paypal/paypal-checkout/commit/68e4bac))
* Allow compatible browsers to message between windows ([1176152](https://github.com/paypal/paypal-checkout/commit/1176152))
* Allow messaging into iframe to make rest requests ([4adc441](https://github.com/paypal/paypal-checkout/commit/4adc441))
* Better detection for button click with no initxo or startflow ([589f9e6](https://github.com/paypal/paypal-checkout/commit/589f9e6))
* Change autoExecute to commit ([6c14d72](https://github.com/paypal/paypal-checkout/commit/6c14d72))
* Cleanup ([209ba24](https://github.com/paypal/paypal-checkout/commit/209ba24))
* Decode uri on any token we're passed ([2b245ce](https://github.com/paypal/paypal-checkout/commit/2b245ce))
* Default redirect to window.top ([db30a7c](https://github.com/paypal/paypal-checkout/commit/db30a7c))
* Do close lazily in onCancel to prevent circular unresolved promise loop with close->onClose->onCance ([98bb62f](https://github.com/paypal/paypal-checkout/commit/98bb62f))
* Do not autoresize button ([47648c3](https://github.com/paypal/paypal-checkout/commit/47648c3))
* Do not autoresize for devices ([960bf89](https://github.com/paypal/paypal-checkout/commit/960bf89))
* Do not include head and body tags in parent template ([3f21029](https://github.com/paypal/paypal-checkout/commit/3f21029))
* Do not open in click handler if initXO is not called, and log if render is called out of click event ([dfc3772](https://github.com/paypal/paypal-checkout/commit/dfc3772))
* Docs ([39c0eb1](https://github.com/paypal/paypal-checkout/commit/39c0eb1))
* Docs ([db2b302](https://github.com/paypal/paypal-checkout/commit/db2b302))
* Docs ([2ae61bf](https://github.com/paypal/paypal-checkout/commit/2ae61bf))
* Docs ([e7a680b](https://github.com/paypal/paypal-checkout/commit/e7a680b))
* Docs ([203655d](https://github.com/paypal/paypal-checkout/commit/203655d))
* Docs ([79f1705](https://github.com/paypal/paypal-checkout/commit/79f1705))
* Enable Checkout in inline iframe when user is authed ([dfb65a5](https://github.com/paypal/paypal-checkout/commit/dfb65a5))
* Export enableCheckoutIframe function ([c314b0d](https://github.com/paypal/paypal-checkout/commit/c314b0d))
* Export version in config ([cea3e47](https://github.com/paypal/paypal-checkout/commit/cea3e47))
* Expose paypal.checkout.win for legacy integrations which rely on it ([db8d125](https://github.com/paypal/paypal-checkout/commit/db8d125))
* fix Lightbox scrolling for iOS (#92) ([361ccfb](https://github.com/paypal/paypal-checkout/commit/361ccfb)), closes [#92](https://github.com/paypal/paypal-checkout/issues/92)
* fix linting ([073477e](https://github.com/paypal/paypal-checkout/commit/073477e))
* Fix logger prefixes ([a0c3e7d](https://github.com/paypal/paypal-checkout/commit/a0c3e7d))
* Fix query params ([026c4f5](https://github.com/paypal/paypal-checkout/commit/026c4f5))
* Fix redirects and aliases ([a74adf6](https://github.com/paypal/paypal-checkout/commit/a74adf6))
* Fix typo ([6ba6567](https://github.com/paypal/paypal-checkout/commit/6ba6567))
* Fix typo ([d922b10](https://github.com/paypal/paypal-checkout/commit/d922b10))
* Fix typo ([1b04d6e](https://github.com/paypal/paypal-checkout/commit/1b04d6e))
* Fixes for remote rendering and redirecting ([8a96843](https://github.com/paypal/paypal-checkout/commit/8a96843))
* Handle array of custom buttons correctly ([2630556](https://github.com/paypal/paypal-checkout/commit/2630556))
* Handle multiple loads more gracefully ([2902933](https://github.com/paypal/paypal-checkout/commit/2902933))
* Honor hash redirects vs full redirects using promises, rather than autocloseParentTemplate flag ([442f974](https://github.com/paypal/paypal-checkout/commit/442f974))
* Log for initxo and startflow not called ([8c95ecf](https://github.com/paypal/paypal-checkout/commit/8c95ecf))
* Log if button is clicked in a context which does not allow popups ([941812a](https://github.com/paypal/paypal-checkout/commit/941812a))
* Logging and hijack fixes ([a3b8bd8](https://github.com/paypal/paypal-checkout/commit/a3b8bd8))
* More robust click handler ([ff1eec6](https://github.com/paypal/paypal-checkout/commit/ff1eec6))
* Only listen to click on container when a tag ([2ef7d20](https://github.com/paypal/paypal-checkout/commit/2ef7d20))
* Only open bridge on legacy setup ([c4125af](https://github.com/paypal/paypal-checkout/commit/c4125af))
* Only send proxyRest message from button or bridge ([0f49d40](https://github.com/paypal/paypal-checkout/commit/0f49d40))
* Parent template head and ie9 fixes ([cb7e161](https://github.com/paypal/paypal-checkout/commit/cb7e161))
* Prop to disable Lightbox rendering on mobile devices that contain no viewport or screen size less th ([b672453](https://github.com/paypal/paypal-checkout/commit/b672453)), closes [#91](https://github.com/paypal/paypal-checkout/issues/91)
* Remove Braintree client ([61ba70d](https://github.com/paypal/paypal-checkout/commit/61ba70d))
* Remove paypal.Checkout docs ([efe08fc](https://github.com/paypal/paypal-checkout/commit/efe08fc))
* Remove paypal.Checkout docs ([a7d1aa7](https://github.com/paypal/paypal-checkout/commit/a7d1aa7))
* Restructuring ([9ed4ed3](https://github.com/paypal/paypal-checkout/commit/9ed4ed3))
* Send commit flag to child ([e716dc6](https://github.com/paypal/paypal-checkout/commit/e716dc6))
* Set correct urlPrefix for current environment ([251b623](https://github.com/paypal/paypal-checkout/commit/251b623))
* Set size units in px ([f733b13](https://github.com/paypal/paypal-checkout/commit/f733b13))
* Support XDomainRequest in request method ([e1e548b](https://github.com/paypal/paypal-checkout/commit/e1e548b))
* Update docs to use latest public api ([c4283ae](https://github.com/paypal/paypal-checkout/commit/c4283ae))
* upgrading beaver-logger, new settings for button js (#82) ([7dde44e](https://github.com/paypal/paypal-checkout/commit/7dde44e)), closes [#82](https://github.com/paypal/paypal-checkout/issues/82)
* Use 3rd party base64 lib, to support ie9 ([1a6d36f](https://github.com/paypal/paypal-checkout/commit/1a6d36f))
* Use button.style prop ([7a799c5](https://github.com/paypal/paypal-checkout/commit/7a799c5))
* Use CSS for all lightbox sizing and animations ([1062d9b](https://github.com/paypal/paypal-checkout/commit/1062d9b))
* Use file name as module name ([41e8e3b](https://github.com/paypal/paypal-checkout/commit/41e8e3b))
* Various compatibility fixes ([df09f54](https://github.com/paypal/paypal-checkout/commit/df09f54))
* Wait for document ready to listen on body click ([b6571ad](https://github.com/paypal/paypal-checkout/commit/b6571ad))
* Wait for onAuthorize and onCancel to complete before closing Checkout ([2cf4fad](https://github.com/paypal/paypal-checkout/commit/2cf4fad))
* Warn for init without setup ([6799ecb](https://github.com/paypal/paypal-checkout/commit/6799ecb))



## <small>4.0.12 (2016-10-04)</small>

* Add additional checkpoints ([f687eb7](https://github.com/paypal/paypal-checkout/commit/f687eb7))
* Add more logs and checkpoints ([dc774b0](https://github.com/paypal/paypal-checkout/commit/dc774b0))
* Add quickbuild script ([40f5929](https://github.com/paypal/paypal-checkout/commit/40f5929))
* Add tests for legacy compatibility layer ([7b0709f](https://github.com/paypal/paypal-checkout/commit/7b0709f))
* Added support for calling components with env, and loading bridge on render ([505639a](https://github.com/paypal/paypal-checkout/commit/505639a))
* adding locale prop (#55) ([6ccecfd](https://github.com/paypal/paypal-checkout/commit/6ccecfd)), closes [#55](https://github.com/paypal/paypal-checkout/issues/55)
* Additional warnings and safeguards ([36e7f31](https://github.com/paypal/paypal-checkout/commit/36e7f31))
* Clarify docs ([5b53264](https://github.com/paypal/paypal-checkout/commit/5b53264))
* Enable autoExecute flag ([2726764](https://github.com/paypal/paypal-checkout/commit/2726764))
* Export paypal.request for ease of calling server to call paypal rest api ([8b9dfb8](https://github.com/paypal/paypal-checkout/commit/8b9dfb8))
* exposing public isEligible()  (#62) ([68644b8](https://github.com/paypal/paypal-checkout/commit/68644b8)), closes [#62](https://github.com/paypal/paypal-checkout/issues/62)
* Fix test for ineligible with only token ([55091cc](https://github.com/paypal/paypal-checkout/commit/55091cc))
* Fixes for latest post-robot ([64bd660](https://github.com/paypal/paypal-checkout/commit/64bd660))
* Flush logs before redirecting ([b744dca](https://github.com/paypal/paypal-checkout/commit/b744dca))
* Make initial height of lightbox 300px ([d2fbfd0](https://github.com/paypal/paypal-checkout/commit/d2fbfd0))
* Make legacy integration layer more functional ([5086488](https://github.com/paypal/paypal-checkout/commit/5086488))
* Make sure bridge is used in tests ([ef38b7a](https://github.com/paypal/paypal-checkout/commit/ef38b7a))
* Miscellaneous (#61) ([e3533f4](https://github.com/paypal/paypal-checkout/commit/e3533f4)), closes [#61](https://github.com/paypal/paypal-checkout/issues/61)
* More logs for domain match ([f314b9b](https://github.com/paypal/paypal-checkout/commit/f314b9b))
* More tests and fixes for legacy compatibility layer ([5042504](https://github.com/paypal/paypal-checkout/commit/5042504))
* Normalize component names in docs ([d7ba557](https://github.com/paypal/paypal-checkout/commit/d7ba557))
* Open bridge after calling paypal.checkout.setup with the correct env ([c64c3ce](https://github.com/paypal/paypal-checkout/commit/c64c3ce))
* Refactor legacy interface ([af5adde](https://github.com/paypal/paypal-checkout/commit/af5adde))
* Replace ppxo with paypal ([3d6bcc3](https://github.com/paypal/paypal-checkout/commit/3d6bcc3))
* return a string instead of an object for locale ([43b813e](https://github.com/paypal/paypal-checkout/commit/43b813e))
* Tests for ineligible full page redirect ([2820d03](https://github.com/paypal/paypal-checkout/commit/2820d03))
* Update docs ([5655b6e](https://github.com/paypal/paypal-checkout/commit/5655b6e))
* Updated docs ([97e19a1](https://github.com/paypal/paypal-checkout/commit/97e19a1))
* Updated docs ([d515aff](https://github.com/paypal/paypal-checkout/commit/d515aff))
* Updated docs ([68401ec](https://github.com/paypal/paypal-checkout/commit/68401ec))
* Updated docs ([fcd6343](https://github.com/paypal/paypal-checkout/commit/fcd6343))
* Updated docs ([0ce67a3](https://github.com/paypal/paypal-checkout/commit/0ce67a3))
* Updated docs ([68b99e0](https://github.com/paypal/paypal-checkout/commit/68b99e0))
* Updated docs ([42472c9](https://github.com/paypal/paypal-checkout/commit/42472c9))
* Updated docs ([2c47b75](https://github.com/paypal/paypal-checkout/commit/2c47b75))
* Updated docs ([856a6f3](https://github.com/paypal/paypal-checkout/commit/856a6f3))
* Upgrade post-robot ([f8f64bb](https://github.com/paypal/paypal-checkout/commit/f8f64bb))
* feat(gulp): Task to start web server and run live demo (#48) ([0233d73](https://github.com/paypal/paypal-checkout/commit/0233d73)), closes [#48](https://github.com/paypal/paypal-checkout/issues/48)



## <small>4.0.11 (2016-09-15)</small>

* Add a resize delay to account for transition time ([3f5ca85](https://github.com/paypal/paypal-checkout/commit/3f5ca85))
* Add BillingAgreement component, better env-url handling ([092fac2](https://github.com/paypal/paypal-checkout/commit/092fac2))
* Add button component ([2d9a7e7](https://github.com/paypal/paypal-checkout/commit/2d9a7e7))
* Add button doc ([5ce8507](https://github.com/paypal/paypal-checkout/commit/5ce8507))
* Add button doc ([787c4d6](https://github.com/paypal/paypal-checkout/commit/787c4d6))
* Add button doc ([18dc3d5](https://github.com/paypal/paypal-checkout/commit/18dc3d5))
* Add button doc ([0451b4c](https://github.com/paypal/paypal-checkout/commit/0451b4c))
* Add button doc ([327284f](https://github.com/paypal/paypal-checkout/commit/327284f))
* Add button doc ([39cd5cd](https://github.com/paypal/paypal-checkout/commit/39cd5cd))
* Add button doc ([4f94f9f](https://github.com/paypal/paypal-checkout/commit/4f94f9f))
* Add button doc ([53e16a2](https://github.com/paypal/paypal-checkout/commit/53e16a2))
* Add button doc ([0ecd9c1](https://github.com/paypal/paypal-checkout/commit/0ecd9c1))
* Add button doc ([466b9f8](https://github.com/paypal/paypal-checkout/commit/466b9f8))
* Add button doc ([11a9816](https://github.com/paypal/paypal-checkout/commit/11a9816))
* Add button doc ([d619486](https://github.com/paypal/paypal-checkout/commit/d619486))
* Add button doc ([e1fa83e](https://github.com/paypal/paypal-checkout/commit/e1fa83e))
* Add button doc ([8b3989e](https://github.com/paypal/paypal-checkout/commit/8b3989e))
* Add button doc ([84f55f2](https://github.com/paypal/paypal-checkout/commit/84f55f2))
* Add button doc ([eeeae5b](https://github.com/paypal/paypal-checkout/commit/eeeae5b))
* Add button doc ([750f076](https://github.com/paypal/paypal-checkout/commit/750f076))
* Add button doc ([f4268f8](https://github.com/paypal/paypal-checkout/commit/f4268f8))
* Add button doc ([cfd459d](https://github.com/paypal/paypal-checkout/commit/cfd459d))
* Add checkpoints to measure ramp/conversion ([483d4aa](https://github.com/paypal/paypal-checkout/commit/483d4aa))
* Add component template spinner for button ([a92689e](https://github.com/paypal/paypal-checkout/commit/a92689e))
* Add correct dimensions for different button sizes ([f298025](https://github.com/paypal/paypal-checkout/commit/f298025))
* Add instructions for sandbox ([e7129ec](https://github.com/paypal/paypal-checkout/commit/e7129ec))
* Add onClick callback to button ([7fdc9ec](https://github.com/paypal/paypal-checkout/commit/7fdc9ec))
* Add parent template styles ([0d19c09](https://github.com/paypal/paypal-checkout/commit/0d19c09))
* Added locale prop ([11eca19](https://github.com/paypal/paypal-checkout/commit/11eca19))
* Added support for client side token creation ([b4546e1](https://github.com/paypal/paypal-checkout/commit/b4546e1))
* Additional safeguards and logging ([5bd5ad7](https://github.com/paypal/paypal-checkout/commit/5bd5ad7))
* Allow billingToken to be sent to child ([416d2ee](https://github.com/paypal/paypal-checkout/commit/416d2ee))
* Allow list of elements to be passed in options.buttons ([60c3e14](https://github.com/paypal/paypal-checkout/commit/60c3e14))
* Assume user is logged in after having completed a transaction ([739eb9b](https://github.com/paypal/paypal-checkout/commit/739eb9b))
* Break props validation into common lib ([753d104](https://github.com/paypal/paypal-checkout/commit/753d104))
* Default options.environment when invalid env passed ([910e76f](https://github.com/paypal/paypal-checkout/commit/910e76f))
* Do not pass event to click handlers expecting error, and raise a warning ([cdb6fbf](https://github.com/paypal/paypal-checkout/commit/cdb6fbf))
* Ensure onClose is promisified ([8f23cbc](https://github.com/paypal/paypal-checkout/commit/8f23cbc))
* Exclude mobile devices from v4 ramp for now ([e6097a3](https://github.com/paypal/paypal-checkout/commit/e6097a3))
* Extra Docs ([6ecb84c](https://github.com/paypal/paypal-checkout/commit/6ecb84c))
* Extra Docs ([9ce92ba](https://github.com/paypal/paypal-checkout/commit/9ce92ba))
* Extra Docs ([985e6f8](https://github.com/paypal/paypal-checkout/commit/985e6f8))
* Fix button options present check ([f3be051](https://github.com/paypal/paypal-checkout/commit/f3be051))
* Fix button rendering code ([6e6033f](https://github.com/paypal/paypal-checkout/commit/6e6033f))
* Fix config envs ([70e8d45](https://github.com/paypal/paypal-checkout/commit/70e8d45))
* Fix default cancel and return urls ([c0555f5](https://github.com/paypal/paypal-checkout/commit/c0555f5))
* Fix demo to prevent default on custom click handlers ([e5542d9](https://github.com/paypal/paypal-checkout/commit/e5542d9))
* Fix full page redirects ([bc6f22f](https://github.com/paypal/paypal-checkout/commit/bc6f22f))
* Fix heights for button component ([e9296e1](https://github.com/paypal/paypal-checkout/commit/e9296e1))
* Fix typo ([d1c5439](https://github.com/paypal/paypal-checkout/commit/d1c5439))
* Fix typo ([b7720d8](https://github.com/paypal/paypal-checkout/commit/b7720d8))
* Fix url regex ([217e047](https://github.com/paypal/paypal-checkout/commit/217e047))
* If container and buttons passed, prioritize buttons and raise a warning ([621f07b](https://github.com/paypal/paypal-checkout/commit/621f07b))
* Improve button element code and log warnings ([27550fb](https://github.com/paypal/paypal-checkout/commit/27550fb))
* Improve startFlow logic ([9d3de64](https://github.com/paypal/paypal-checkout/commit/9d3de64))
* Improve startFlow logic ([080d54b](https://github.com/paypal/paypal-checkout/commit/080d54b))
* In case of error from rendering paypal checkout component, redirect to full page ([083b57c](https://github.com/paypal/paypal-checkout/commit/083b57c))
* Legacy fallback incontext support ([5a8af21](https://github.com/paypal/paypal-checkout/commit/5a8af21))
* Log if url is a match with cancel url ([5c57376](https://github.com/paypal/paypal-checkout/commit/5c57376))
* More conversion and error logging ([8808ff2](https://github.com/paypal/paypal-checkout/commit/8808ff2))
* More envs and better env decisioning ([6cfe57e](https://github.com/paypal/paypal-checkout/commit/6cfe57e))
* Only call onPaymentCancel if we have been given a paymentToken and cancelUrl in init ([8f73a4d](https://github.com/paypal/paypal-checkout/commit/8f73a4d))
* Only decorate callbacks if they exist ([e9833f7](https://github.com/paypal/paypal-checkout/commit/e9833f7))
* Pass env and stage props to child ([6b67384](https://github.com/paypal/paypal-checkout/commit/6b67384))
* Raise a warning when no target element is found for form hijack case ([4c4cdba](https://github.com/paypal/paypal-checkout/commit/4c4cdba))
* Remove readme section on legacy to avoid confusion ([f977c5d](https://github.com/paypal/paypal-checkout/commit/f977c5d))
* Send billingToken to child for button ([aeefb84](https://github.com/paypal/paypal-checkout/commit/aeefb84))
* Simplify button handling logic ([d3b844e](https://github.com/paypal/paypal-checkout/commit/d3b844e))
* Support creating billing agreement tokens ([e66f55f](https://github.com/paypal/paypal-checkout/commit/e66f55f))
* Support making create token request through bridge ([88bc671](https://github.com/paypal/paypal-checkout/commit/88bc671))
* Switch from payNow to autoExecute ([e54bb24](https://github.com/paypal/paypal-checkout/commit/e54bb24))
* Update docs ([95d612a](https://github.com/paypal/paypal-checkout/commit/95d612a))
* Updated docs with client side EC ([bec76e3](https://github.com/paypal/paypal-checkout/commit/bec76e3))
* Use new format for default props ([0590417](https://github.com/paypal/paypal-checkout/commit/0590417))
* Use prod hermes for live_demo ([eb60e82](https://github.com/paypal/paypal-checkout/commit/eb60e82))



## <small>4.0.10 (2016-08-26)</small>




## <small>4.0.9 (2016-08-26)</small>

* Show hidden buttons on document load ([8d3dc20](https://github.com/paypal/paypal-checkout/commit/8d3dc20))



## <small>4.0.8 (2016-08-25)</small>

* Add correct z-index for overlay ([afb1f17](https://github.com/paypal/paypal-checkout/commit/afb1f17))
* Better onDocumentReady ([7f2d2ac](https://github.com/paypal/paypal-checkout/commit/7f2d2ac))
* Check for existence of this.props.onPaymentCancel ([54e9c47](https://github.com/paypal/paypal-checkout/commit/54e9c47))
* Do not clear interval until document is ready ([2a8cc1d](https://github.com/paypal/paypal-checkout/commit/2a8cc1d))
* Do not preventDefault on click ([7262318](https://github.com/paypal/paypal-checkout/commit/7262318))
* Ensure box-sizing does not affect spinner sie ([5cc18d6](https://github.com/paypal/paypal-checkout/commit/5cc18d6))
* Export onPossiblyUnhandledException; ([e3c6823](https://github.com/paypal/paypal-checkout/commit/e3c6823))
* Fix for startFlow with custom url ([d8008f9](https://github.com/paypal/paypal-checkout/commit/d8008f9))
* Fix paypalCheckoutReady ([13374f6](https://github.com/paypal/paypal-checkout/commit/13374f6))
* Limit to global export for now, to avoid issue when loaded into page with global define function ([cb6a9e6](https://github.com/paypal/paypal-checkout/commit/cb6a9e6))
* Match legacy logic for determining target element ([efb565a](https://github.com/paypal/paypal-checkout/commit/efb565a))
* Rely on xcomponent to provide fixed position for overlay container ([ed9bbe8](https://github.com/paypal/paypal-checkout/commit/ed9bbe8))



## <small>4.0.7 (2016-08-19)</small>

* Add extra window.paypal namespaces for backwards compatibility ([3e68c4f](https://github.com/paypal/paypal-checkout/commit/3e68c4f))
* Add logging for button render type ([281ffe4](https://github.com/paypal/paypal-checkout/commit/281ffe4))
* Allow window.paypalCheckoutReady to be set after the window is loaded ([b01fdda](https://github.com/paypal/paypal-checkout/commit/b01fdda))
* Call click function with event ([2fb5785](https://github.com/paypal/paypal-checkout/commit/2fb5785))
* Factor out global env state ([a879c35](https://github.com/paypal/paypal-checkout/commit/a879c35))
* Fix argument order for handleClick ([fdcec63](https://github.com/paypal/paypal-checkout/commit/fdcec63))
* Handle more button options and types ([ac407df](https://github.com/paypal/paypal-checkout/commit/ac407df))
* Ignore multiple script loads ([e181225](https://github.com/paypal/paypal-checkout/commit/e181225))
* Run window.paypalCheckoutReady after setting up interface entirely ([acc5105](https://github.com/paypal/paypal-checkout/commit/acc5105))
* Simplify data-paypal-button compat code ([3fcf941](https://github.com/paypal/paypal-checkout/commit/3fcf941))
* Simplify env logic ([e1967f6](https://github.com/paypal/paypal-checkout/commit/e1967f6))
* Use paymentToken rather than token ([d83434c](https://github.com/paypal/paypal-checkout/commit/d83434c))



## <small>4.0.6 (2016-08-18)</small>

* Allow button array to use parent click method ([b4dedd8](https://github.com/paypal/paypal-checkout/commit/b4dedd8))
* Keep pp_uid non-sticky for now ([8866210](https://github.com/paypal/paypal-checkout/commit/8866210))
* Updated name ([ff9812e](https://github.com/paypal/paypal-checkout/commit/ff9812e))
* Updated name ([23f36ce](https://github.com/paypal/paypal-checkout/commit/23f36ce))
* Use locale from setup() call for overlay locale ([1b3ca3a](https://github.com/paypal/paypal-checkout/commit/1b3ca3a))



## <small>4.0.5 (2016-08-17)</small>

* Pass down uid to checkout component ([a1e24ee](https://github.com/paypal/paypal-checkout/commit/a1e24ee))



## <small>4.0.4 (2016-08-17)</small>

* Make ppobjects configurable in setup call ([2aa8179](https://github.com/paypal/paypal-checkout/commit/2aa8179))



## <small>4.0.3 (2016-08-16)</small>

* Export ppxo.version ([ddb4331](https://github.com/paypal/paypal-checkout/commit/ddb4331))
* Fix current script logic ([a887e7a](https://github.com/paypal/paypal-checkout/commit/a887e7a))



## <small>4.0.2 (2016-08-16)</small>

* Add some additional legacy safeguards and logs ([ffc9a80](https://github.com/paypal/paypal-checkout/commit/ffc9a80))
* Allow overriding paypal url for both bridge and logger ([78b8569](https://github.com/paypal/paypal-checkout/commit/78b8569))
* Break up legacy ([96dc914](https://github.com/paypal/paypal-checkout/commit/96dc914))
* Cleanup button rendering and add options.condition support ([3a792cf](https://github.com/paypal/paypal-checkout/commit/3a792cf))
* Log error messaging when eventing is used. ([8e9937d](https://github.com/paypal/paypal-checkout/commit/8e9937d))
* Use renderHijack, not hijackButton ([6c82e04](https://github.com/paypal/paypal-checkout/commit/6c82e04))



## <small>4.0.1 (2016-08-15)</small>

* Add a demo folder using actual hermes flow ([674de51](https://github.com/paypal/paypal-checkout/commit/674de51))
* Add beaver logger support and inject into xcomponent ([84c5997](https://github.com/paypal/paypal-checkout/commit/84c5997))
* Add comments and fix close issues ([3396ccd](https://github.com/paypal/paypal-checkout/commit/3396ccd))
* Add content for templates, keep overlay open, better overlay functionality ([639be5a](https://github.com/paypal/paypal-checkout/commit/639be5a))
* Add eligibility and animations ([b0b6dfc](https://github.com/paypal/paypal-checkout/commit/b0b6dfc))
* Add incontext eligibility check, support specifying any url in the legacy api ([2a4ddec](https://github.com/paypal/paypal-checkout/commit/2a4ddec))
* Add loading spinner to initial checkout template ([353597d](https://github.com/paypal/paypal-checkout/commit/353597d))
* Add mock components for button, checkout ([0ac2982](https://github.com/paypal/paypal-checkout/commit/0ac2982))
* Add remove content button to demo ([e7ddade](https://github.com/paypal/paypal-checkout/commit/e7ddade))
* Add versioning to build scripts ([be274df](https://github.com/paypal/paypal-checkout/commit/be274df))
* Added merchant lightbox demo page, changed name to paypal.checkout.v4 ([8d0e463](https://github.com/paypal/paypal-checkout/commit/8d0e463))
* Break redirect to method ([0642dd9](https://github.com/paypal/paypal-checkout/commit/0642dd9))
* Build unminified file ([4b68339](https://github.com/paypal/paypal-checkout/commit/4b68339))
* Bump version on each publish ([1952198](https://github.com/paypal/paypal-checkout/commit/1952198))
* Button Rendering ([17af9b1](https://github.com/paypal/paypal-checkout/commit/17af9b1))
* Call onPaymentCancel when window is closed by the user ([dcdd7e8](https://github.com/paypal/paypal-checkout/commit/dcdd7e8))
* Convert element list to array ([8051404](https://github.com/paypal/paypal-checkout/commit/8051404))
* Default to locale from config ([949ece3](https://github.com/paypal/paypal-checkout/commit/949ece3))
* Do not add padding in lightbox container element ([3d9212c](https://github.com/paypal/paypal-checkout/commit/3d9212c))
* Do not show content behind iframe ([d1b9036](https://github.com/paypal/paypal-checkout/commit/d1b9036))
* Downscale checkout image ([6d892ff](https://github.com/paypal/paypal-checkout/commit/6d892ff))
* Encode content as unicode ([007f59f](https://github.com/paypal/paypal-checkout/commit/007f59f))
* First commit ([4b672c8](https://github.com/paypal/paypal-checkout/commit/4b672c8))
* First pass at docs ([1f4b28c](https://github.com/paypal/paypal-checkout/commit/1f4b28c))
* Fix checkout layout for mobile devices ([0a2c182](https://github.com/paypal/paypal-checkout/commit/0a2c182))
* Fix components to use latest xcomponent ([7e6f973](https://github.com/paypal/paypal-checkout/commit/7e6f973))
* Fix docs ([6b5424b](https://github.com/paypal/paypal-checkout/commit/6b5424b))
* Fix lint errors ([da41d7d](https://github.com/paypal/paypal-checkout/commit/da41d7d))
* Fixes ([5ee1b6a](https://github.com/paypal/paypal-checkout/commit/5ee1b6a))
* Flesh out merchant_legacy demo page ([6f8cb64](https://github.com/paypal/paypal-checkout/commit/6f8cb64))
* For legacy compatibility layer, wait for token to be ready before loading url ([83fa37c](https://github.com/paypal/paypal-checkout/commit/83fa37c))
* IE11 fixes ([d847ce0](https://github.com/paypal/paypal-checkout/commit/d847ce0))
* Improve logo and overlay ([a343aed](https://github.com/paypal/paypal-checkout/commit/a343aed))
* Improved docs ([e215036](https://github.com/paypal/paypal-checkout/commit/e215036))
* Improved docs ([aff8cba](https://github.com/paypal/paypal-checkout/commit/aff8cba))
* Improved docs ([c26f41b](https://github.com/paypal/paypal-checkout/commit/c26f41b))
* Improved docs ([ea4097c](https://github.com/paypal/paypal-checkout/commit/ea4097c))
* Improved docs ([baaf521](https://github.com/paypal/paypal-checkout/commit/baaf521))
* Improved docs ([5d97bc6](https://github.com/paypal/paypal-checkout/commit/5d97bc6))
* Improved docs ([f9eada9](https://github.com/paypal/paypal-checkout/commit/f9eada9))
* Improved docs ([212f925](https://github.com/paypal/paypal-checkout/commit/212f925))
* Improved docs ([cda22a5](https://github.com/paypal/paypal-checkout/commit/cda22a5))
* Improved docs ([d03a12b](https://github.com/paypal/paypal-checkout/commit/d03a12b))
* Improved docs ([9ed8d70](https://github.com/paypal/paypal-checkout/commit/9ed8d70))
* Improved docs ([cf4cfcc](https://github.com/paypal/paypal-checkout/commit/cf4cfcc))
* Improved docs ([d9be730](https://github.com/paypal/paypal-checkout/commit/d9be730))
* Improved docs ([ca541b3](https://github.com/paypal/paypal-checkout/commit/ca541b3))
* Improved docs ([cad45f0](https://github.com/paypal/paypal-checkout/commit/cad45f0))
* Improved docs ([c2014ce](https://github.com/paypal/paypal-checkout/commit/c2014ce))
* Improved docs ([4b77130](https://github.com/paypal/paypal-checkout/commit/4b77130))
* Increase specificity of css class names ([5fa6084](https://github.com/paypal/paypal-checkout/commit/5fa6084))
* Lightbox Animation CSS ([aa60794](https://github.com/paypal/paypal-checkout/commit/aa60794))
* Lightbox Ease Transition ([7cb4732](https://github.com/paypal/paypal-checkout/commit/7cb4732))
* Load button.js on demand ([364592a](https://github.com/paypal/paypal-checkout/commit/364592a))
* Make source clearer ([31fc601](https://github.com/paypal/paypal-checkout/commit/31fc601))
* merchant.htm: Button added for Lightob alongwith Add Conent ([1aa5fee](https://github.com/paypal/paypal-checkout/commit/1aa5fee))
* Minor eligibility and styling fixes ([e824de9](https://github.com/paypal/paypal-checkout/commit/e824de9))
* Minor tweaks to checkout component ([d441858](https://github.com/paypal/paypal-checkout/commit/d441858))
* overlay.css file added ([a20ae48](https://github.com/paypal/paypal-checkout/commit/a20ae48))
* overlay.css: css for logo,msg,continue ([87d166a](https://github.com/paypal/paypal-checkout/commit/87d166a))
* overlay.html file added ([2a926e8](https://github.com/paypal/paypal-checkout/commit/2a926e8))
* Overlay.html updated for logo message link ([45d4cc5](https://github.com/paypal/paypal-checkout/commit/45d4cc5))
* Refactored and split docs ([44bc5c1](https://github.com/paypal/paypal-checkout/commit/44bc5c1))
* Remove coverage webpack plugin for now (was generating coverage into dist) ([32d3b4f](https://github.com/paypal/paypal-checkout/commit/32d3b4f))
* Remove old dist files ([c63d0a3](https://github.com/paypal/paypal-checkout/commit/c63d0a3))
* Remove redundant version param ([c8471d7](https://github.com/paypal/paypal-checkout/commit/c8471d7))
* Render bridge automatically ([c231e0c](https://github.com/paypal/paypal-checkout/commit/c231e0c))
* Restructuring ([b0c6af6](https://github.com/paypal/paypal-checkout/commit/b0c6af6))
* Send onClose to onPaymentCancel for all integrations where onClose is not specified ([02e79e8](https://github.com/paypal/paypal-checkout/commit/02e79e8))
* Style iframe wrapper element with border radius and background color to avoid browser issues ([008b458](https://github.com/paypal/paypal-checkout/commit/008b458))
* Support environments and load correct bridge urls ([5b35054](https://github.com/paypal/paypal-checkout/commit/5b35054))
* Update docs ([59f2f88](https://github.com/paypal/paypal-checkout/commit/59f2f88))
* Update docs ([1769412](https://github.com/paypal/paypal-checkout/commit/1769412))
* Update docs ([068597e](https://github.com/paypal/paypal-checkout/commit/068597e))
* Update docs ([e3bee81](https://github.com/paypal/paypal-checkout/commit/e3bee81))
* Update docs ([151b90e](https://github.com/paypal/paypal-checkout/commit/151b90e))
* Update docs ([ef5b2c2](https://github.com/paypal/paypal-checkout/commit/ef5b2c2))
* Update docs ([6cb9ebc](https://github.com/paypal/paypal-checkout/commit/6cb9ebc))
* Update docs ([15e8dc5](https://github.com/paypal/paypal-checkout/commit/15e8dc5))
* Update docs ([4047c90](https://github.com/paypal/paypal-checkout/commit/4047c90))
* Update docs ([31285fd](https://github.com/paypal/paypal-checkout/commit/31285fd))
* Update docs ([511c266](https://github.com/paypal/paypal-checkout/commit/511c266))
* Update docs ([b66f2d2](https://github.com/paypal/paypal-checkout/commit/b66f2d2))
* Update docs ([3e81be9](https://github.com/paypal/paypal-checkout/commit/3e81be9))
* Update docs for clarity ([7631c0e](https://github.com/paypal/paypal-checkout/commit/7631c0e))
* Use correct format of mock window urls ([05ae946](https://github.com/paypal/paypal-checkout/commit/05ae946))
* Use mock token generator for demo ([01bbf23](https://github.com/paypal/paypal-checkout/commit/01bbf23))
* Use the new style spinner ([6b85605](https://github.com/paypal/paypal-checkout/commit/6b85605))
* Various IE fixes ([2386665](https://github.com/paypal/paypal-checkout/commit/2386665))
* When in lightbox mode, open the iframe 200px high ([997ebb3](https://github.com/paypal/paypal-checkout/commit/997ebb3))
* feat(editorconfig): Add editor config ([53700a5](https://github.com/paypal/paypal-checkout/commit/53700a5))
* feat(karma): Config file ([f3b55e1](https://github.com/paypal/paypal-checkout/commit/f3b55e1))
* feat(test): Unit tests working ([f46679c](https://github.com/paypal/paypal-checkout/commit/f46679c))
* feat(webpack):  Move to config file ([15b450c](https://github.com/paypal/paypal-checkout/commit/15b450c))
* fix(gulp): Babelified gulp file ([7d38240](https://github.com/paypal/paypal-checkout/commit/7d38240))



