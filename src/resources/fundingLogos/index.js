/* @flow */

import { BUTTON_LOGO, BUTTON_LOGO_COLOR } from '../../constants';

import { p24Logo }          from './p24';
import { sofortLogo }       from './sofort';
import { idealLogo }        from './ideal';
import { giropayLogo }      from './giropay';
import { epsLogo }          from './eps';
import { mybankLogo }       from './mybank';
import { bancontactLogo }   from './bancontact';
import { blikLogo }         from './blik';
import { maximaLogo }       from './maxima';
import { boletoLogo }       from './boleto';
import { oxxoLogo }         from './oxxo';
import { mercadopagoLogo }  from './mercadopago';
import pp_white     from './pp_white.svg';
import pp_blue      from './pp_blue.svg';
import pp_black     from './pp_black.svg';
import { paypalLogo } from './paypal';
import { creditLogo } from './credit';
import venmo_white  from './venmo_white.svg';
import itau  from './itau.svg';
import venmo_blue   from './venmo_blue.svg';
import elv          from './elv.svg';
import elv_white    from './elv_white.svg';

export const fundingLogos = {

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
    [ BUTTON_LOGO.ITAU ]: {
        [ BUTTON_LOGO_COLOR.WHITE ]: itau
    },

    [ BUTTON_LOGO.IDEAL ]: idealLogo,

    [ BUTTON_LOGO.ELV ]: {
        [ BUTTON_LOGO_COLOR.ANY ]:   elv,
        [ BUTTON_LOGO_COLOR.WHITE ]: elv_white
    },

    [ BUTTON_LOGO.BANCONTACT ]: bancontactLogo,

    [ BUTTON_LOGO.GIROPAY ]: giropayLogo,

    [ BUTTON_LOGO.SOFORT ]: sofortLogo,

    [ BUTTON_LOGO.EPS ]: epsLogo,

    [ BUTTON_LOGO.MYBANK ]: mybankLogo,

    [ BUTTON_LOGO.P24 ]: p24Logo,

    [ BUTTON_LOGO.BLIK ]: blikLogo,

    [ BUTTON_LOGO.MAXIMA ]: maximaLogo,

    [ BUTTON_LOGO.BOLETO ]: boletoLogo,

    [ BUTTON_LOGO.OXXO ]: oxxoLogo,

    [ BUTTON_LOGO.MERCADOPAGO ]: mercadopagoLogo

};
