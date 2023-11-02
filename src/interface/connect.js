import { loadConnectScript } from "@paypal/connect-loader-component";

export const Connect: LazyExport<ConnectComponent> = {
  __get__: () => {
    /**
     * This function, normally defined in a zoid component, should return the object.
     *  It's _not_ a zoid situation, though, so how to structure this?
     * But, for AXO, we should really be:
     * - use connect loader to load AXO asset
     * - call AXO once loaded and pass in:
     *    - CMID
     *    - client ID
     *    - user id token
     *    - _maybe_ Fraudnet
     */
  },
};
