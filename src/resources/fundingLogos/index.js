/* @flow */

import { BUTTON_LOGO, BUTTON_LOGO_COLOR } from '../../constants';

import pp_white     from './pp_white.svg';
import pp_blue      from './pp_blue.svg';
import pp_black     from './pp_black.svg';
import paypal_white from './paypal_white.svg';
import paypal_blue  from './paypal_blue.svg';
import paypal_black from './paypal_black.svg';
import credit_white from './credit_white.svg';
import venmo_white  from './venmo_white.svg';
import venmo_blue   from './venmo_blue.svg';
import ideal        from './ideal.svg';
import elv          from './elv.svg';
import elv_white    from './elv_white.svg';
import bancontact   from './bancontact.svg';
import giropay      from './giropay.svg';
import eps          from './eps.svg';
import mybank       from './mybank.svg';


export let fundingLogos = {

    [ BUTTON_LOGO.PP ]: {
        [ BUTTON_LOGO_COLOR.WHITE ]: pp_white,
        [ BUTTON_LOGO_COLOR.BLUE ]:  pp_blue,
        [ BUTTON_LOGO_COLOR.BLACK ]: pp_black
    },

    [ BUTTON_LOGO.PAYPAL ]: {
        [ BUTTON_LOGO_COLOR.WHITE ]: paypal_white,
        [ BUTTON_LOGO_COLOR.BLUE ]:  paypal_blue,
        [ BUTTON_LOGO_COLOR.BLACK ]: paypal_black
    },

    [ BUTTON_LOGO.CREDIT ]: {
        [ BUTTON_LOGO_COLOR.WHITE ]: credit_white
    },

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
        [ BUTTON_LOGO_COLOR.ANY ]:   bancontact
    },

    [ BUTTON_LOGO.GIROPAY ]: {
        [ BUTTON_LOGO_COLOR.ANY ]:   giropay
    },

    [ BUTTON_LOGO.EPS ]: {
        [ BUTTON_LOGO_COLOR.ANY ]:   eps
    },

    [ BUTTON_LOGO.MYBANK ]: {
        [ BUTTON_LOGO_COLOR.ANY ]:   mybank
    }
};
