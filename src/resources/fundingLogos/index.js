/* @flow */

import { BUTTON_LOGO, BUTTON_LOGO_COLOR } from '../../constants';

import { zimplerLogo }      from './zimpler';
import { p24Logo }      from './p24';
import { wechatpayLogo }      from './wechatpayLogo';
import pp_white     from './pp_white.svg';
import pp_blue      from './pp_blue.svg';
import pp_black     from './pp_black.svg';
import { paypalLogo } from './paypal';
import { creditLogo } from './credit';
import venmo_white  from './venmo_white.svg';
import venmo_blue   from './venmo_blue.svg';
import ideal        from './ideal.svg';
import elv          from './elv.svg';
import elv_white    from './elv_white.svg';
import bancontact   from './bancontact.svg';
import bancontact_white   from './bancontact_white.svg';
import giropay      from './giropay.svg';
import giropay_white      from './giropay_white.svg';
import eps          from './eps.svg';
import eps_white         from './eps_white.svg';
import mybank       from './mybank.svg';
import mybank_white       from './mybank_white.svg';
import sofort       from './sofort.svg';
import sofort_white       from './sofort_white.svg';

export let fundingLogos = {

    [ BUTTON_LOGO.PP ]: {
        [ BUTTON_LOGO_COLOR.WHITE ]: pp_white,
        [ BUTTON_LOGO_COLOR.BLUE ]:  pp_blue,
        [ BUTTON_LOGO_COLOR.BLACK ]: pp_black
    },

    [ BUTTON_LOGO.PAYPAL ]: paypalLogo,

    [ BUTTON_LOGO.CREDIT ]: creditLogo,

    [ BUTTON_LOGO.VENMO ]: {
        [ BUTTON_LOGO_COLOR.WHITE ]: venmo_white,
        [ BUTTON_LOGO_COLOR.BLUE ]:  venmo_blue
    },

    [ BUTTON_LOGO.IDEAL ]: {
        [ BUTTON_LOGO_COLOR.ANY ]: ideal
    },

    [ BUTTON_LOGO.ELV ]: {
        [ BUTTON_LOGO_COLOR.ANY ]:   elv,
        [ BUTTON_LOGO_COLOR.WHITE ]: elv_white
    },

    [ BUTTON_LOGO.BANCONTACT ]: {
        [ BUTTON_LOGO_COLOR.ANY ]:     bancontact,
        [ BUTTON_LOGO_COLOR.WHITE ]:   bancontact_white
    },

    [ BUTTON_LOGO.GIROPAY ]: {
        [ BUTTON_LOGO_COLOR.ANY ]:     giropay,
        [ BUTTON_LOGO_COLOR.WHITE ]:   giropay_white
    },

    [ BUTTON_LOGO.SOFORT ]: {
        [ BUTTON_LOGO_COLOR.ANY ]:     sofort,
        [ BUTTON_LOGO_COLOR.WHITE ]:   sofort_white
    },

    [ BUTTON_LOGO.EPS ]: {
        [ BUTTON_LOGO_COLOR.ANY ]:     eps,
        [ BUTTON_LOGO_COLOR.WHITE ]:   eps_white
    },

    [ BUTTON_LOGO.MYBANK ]: {
        [ BUTTON_LOGO_COLOR.ANY ]:     mybank,
        [ BUTTON_LOGO_COLOR.WHITE ]:   mybank_white
    },

    [ BUTTON_LOGO.P24 ]: p24Logo,

    [ BUTTON_LOGO.ZIMPLER ]: zimplerLogo,

    [ BUTTON_LOGO.WECHATPAY ]: wechatpayLogo
};
