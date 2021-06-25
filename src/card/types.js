/* @flow */

export type SetupCardOptions = {|
    cspNonce : string,
    facilitatorAccessToken : string
|};

export type Card = {|
    number : string,
    cvv : string,
    expiry : string
|};
