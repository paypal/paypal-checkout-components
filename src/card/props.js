/* @flow */

import type { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, CARD, type FundingEligibilityType } from '@paypal/sdk-constants/src';

import type { ProxyWindow } from '../types';
import { getProps, type XProps, type Props } from '../props/props';

import { CARD_FIELD_TYPE } from './constants';

// export something to force webpack to see this as an ES module
export const TYPES = true;

export type PrerenderDetailsType = {|
    win? : ?ProxyWindow,
    fundingSource : $Values<typeof FUNDING>,
    card? : ?$Values<typeof CARD>
|};

export type CardStyle = {|
    height? : number
|};

export type CardExport = ({|
    submit : () => ZalgoPromise<void>
|}) => ZalgoPromise<void>;

export type OnChange = ({|
    valid : boolean
|}) => ZalgoPromise<void>;

export type CardXProps = {|
    ...XProps,

    type : $Values<typeof CARD_FIELD_TYPE>,
    style : CardStyle,
    cardSessionID : string,
    fundingEligibility : FundingEligibilityType,
    onChange : OnChange,
    export : CardExport,
    parent? : {|
        props : XProps,
        export : CardExport
    |}
|};

export type CardProps = {|
    ...Props,

    type : $Values<typeof CARD_FIELD_TYPE>,
    branded : boolean,
    style : CardStyle,
    cardSessionID : string,
    fundingEligibility : FundingEligibilityType,
    export : CardExport,
    onChange : OnChange,
    facilitatorAccessToken : string
|};

type GetCardPropsOptions = {|
    facilitatorAccessToken : string
|};

export function getCardProps({ facilitatorAccessToken } : GetCardPropsOptions) : CardProps {
    const xprops : CardXProps = window.xprops;

    const {
        type,
        cardSessionID,
        style,
        fundingEligibility,
        onChange,
        branded = fundingEligibility?.card?.branded ?? true,
        parent,
        export: xport
    } = xprops;

    const props = getProps({ facilitatorAccessToken, branded });

    return {
        ...props,
        type,
        branded,
        style,
        cardSessionID,
        fundingEligibility,
        onChange,
        export: parent ? parent.export : xport,
        facilitatorAccessToken
    };
}
