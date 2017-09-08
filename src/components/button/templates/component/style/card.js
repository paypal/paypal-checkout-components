/* @flow */

import { CARD } from '../../../../../config/constants';

import { CLASS } from './class';

export let cardStyle = `

    @media only screen and (max-width: 150px) {
        .${ CLASS.CARD } {
            display: none;
        }
    }

    @media only screen and (min-width: 150px) {
        .${ CLASS.CARD } {
            display: inline-block;
        }
    }

    .${ CLASS.FUNDINGICONS } {
        margin-top: 4px;
    }

    @media only screen and (min-width: 150px) {
        .${ CLASS.CARD } {
            background: url('https://www.paypalobjects.com/images/checkout/incontext/network_and_bank_icons_small_1x.png') no-repeat;
            height: 20px;
            margin-right: 3px;

        }
        .${ CLASS.CARD }-${ CARD.VISA } {
            background-position: -12px -40px;
            width: 28px;
        }
        .${ CLASS.CARD }-${ CARD.MASTERCARD } {
            background-position: -12px -70px;
            width: 26px;
        }
        .${ CLASS.CARD }-${ CARD.DISCOVER } {
            background-position: -12px -100px;
            width: 29px;
        }
        .${ CLASS.CARD }-${ CARD.AMEX } {
            background-position: -12px -130px;
            width: 20px;
        }
    }

    @media only screen and (min-width: 200px) {
        .${ CLASS.CARD } {
            background: url('https://www.paypalobjects.com/images/checkout/incontext/network_and_bank_icons_big_1x.png') no-repeat;
            height: 27px;
            margin-right: 5px;
        }
        .${ CLASS.CARD }-${ CARD.VISA } {
            background-position: -12px -47px;
            width: 36px;
        }
        .${ CLASS.CARD }-${ CARD.MASTERCARD } {
            background-position: -12px -84px;
            width: 35px;
        }
        .${ CLASS.CARD }-${ CARD.DISCOVER } {
            background-position: -12px -121px;
            width: 38px;
        }
        .${ CLASS.CARD }-${ CARD.AMEX } {
            background-position: -12px -158px;
            width: 25px;
        }
    }

    @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: ~"2/1"), only screen and (min-device-pixel-ratio: 2) {
        @media only screen and (min-width: 150px) {
            .${ CLASS.CARD } {
                background: url('https://www.paypalobjects.com/images/checkout/incontext/network_and_bank_icons_small_2x.png') no-repeat;
                background-size: 90px 970px;
                height: 20px;
            }
            .${ CLASS.CARD }-${ CARD.VISA } {
                background-position: -12px -40px;
                width: 28px;
            }
            .${ CLASS.CARD }-${ CARD.MASTERCARD } {
                background-position: -12px -70px;
                width: 26px;
            }
            .${ CLASS.CARD }-${ CARD.DISCOVER } {
                background-position: -12px -100px;
                width: 29px;
            }
            .${ CLASS.CARD }-${ CARD.AMEX } {
                background-position: -12px -130px;
                width: 20px;
            }
        }

        @media only screen and (min-width: 200px) {
            .${ CLASS.CARD } {
                background: url('https://www.paypalobjects.com/images/checkout/incontext/network_and_bank_icons_big_2x.png') no-repeat;
                background-size: 110px 1393px;
                height: 27px;
            }
            .${ CLASS.CARD }-${ CARD.VISA } {
                background-position: -12px -47px;
                width: 36px;
            }
            .${ CLASS.CARD }-${ CARD.MASTERCARD } {
                background-position: -12px -84px;
                width: 35px;
            }
            .${ CLASS.CARD }-${ CARD.DISCOVER } {
                background-position: -12px -121px;
                width: 38px;
            }
            .${ CLASS.CARD }-${ CARD.AMEX } {
                background-position: -12px -158px;
                width: 25px;
            }
        }
    }
`;
