/* @flow */
/* @jsx jsxToHTML */
/* eslint max-lines: 0 */

import { COUNTRY, LANG } from 'paypal-braintree-web-client/src';
import { jsxToHTML, Fragment, type JsxHTMLNode, type PropsType, type ChildrenType } from 'belter/src'; // eslint-disable-line no-unused-vars

import { LOGO_COLOR, CLASS } from '../../constants';

import { PPLogo, PayPalLogo } from './logo';

function TextFragment(props : PropsType, children : ChildrenType) : JsxHTMLNode {
    return (
        <Fragment>
            {
                children.map(child => {
                    return (typeof child === 'string')
                        ? (<span class={ CLASS.TEXT }>{child}</span>)
                        : child;
                })
            }
        </Fragment>
    );
}

type ContentMap = {
    [ $Values<typeof COUNTRY> ] : {
        [ $Values<typeof LANG> ] : {
            Checkout : ({ logoColor : $Values<typeof LOGO_COLOR> }) => JsxHTMLNode,
            SaferTag : () => JsxHTMLNode,
            Pay : ({ logoColor : $Values<typeof LOGO_COLOR> }) => JsxHTMLNode,
            Installment? : ({ logoColor : $Values<typeof LOGO_COLOR>, period? : ?number }) => JsxHTMLNode,
            LaterTag? : () => JsxHTMLNode,
            DualTag? : () => JsxHTMLNode
        }
    }
};

const COMPONENT_CONTENT : ContentMap = {
    AD: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    AE: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        },
        ar: {
            Checkout: ({ logoColor }) => <TextFragment>السداد بواسطة <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>الطريقة الأسهل والأكثر أماناً في الدفع</TextFragment>,
            LaterTag: () => <TextFragment>اشترِ الآن، وسدّد على دفعات</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>دفع بواسطة <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    AG: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    AI: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    AL: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    AM: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    AN: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    AO: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    AR: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    AT: {
        de: {
            Checkout: ({ logoColor }) => <TextFragment>Direkt zu <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Einfach schneller und sicherer bezahlen</TextFragment>,
            LaterTag: () => <TextFragment>Kaufen Sie jetzt und bezahlen Sie nach und nach.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Mit <PayPalLogo logoColor={ logoColor } /> zahlen</TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    AU: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    AW: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    AZ: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    BA: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    BB: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    BE: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Pay with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, faster way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        nl: {
            Checkout: ({ logoColor }) => <TextFragment>Betalen met <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>De veiligere en snellere manier om te betalen.</TextFragment>,
            LaterTag: () => <TextFragment>Koop nu. Betaal later.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Betalen met <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Le réflexe sécurité pour payer</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    BF: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    BG: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    BH: {
        ar: {
            Checkout: ({ logoColor }) => <TextFragment>السداد بواسطة <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>الطريقة الأسهل والأكثر أماناً في الدفع</TextFragment>,
            LaterTag: () => <TextFragment>اشترِ الآن، وسدّد على دفعات</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>دفع بواسطة <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    BI: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    BJ: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    BM: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    BN: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    BO: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    BR: {
        pt: {
            Checkout:    ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Finalizar</TextFragment>,
            SaferTag:    () => <TextFragment>A maneira fácil e segura de pagar.</TextFragment>,
            LaterTag:    () => <TextFragment>Compre agora e pague depois.</TextFragment>,
            Pay:         ({ logoColor }) => <TextFragment>Pague com <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            Installment: ({ logoColor, period }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> { period ? <TextFragment>Pague em até<br />{ period.toString() }x sem juros</TextFragment> : <TextFragment>Pagamentos<br />parcelados</TextFragment> }</TextFragment>
        },
        en: {
            Checkout:    ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag:    () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag:    () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:         ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            Installment: ({ logoColor, period }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> { period ? <TextFragment>Pay up to { period.toString() }x<br />without interest</TextFragment> : <TextFragment>Interest free<br />payments</TextFragment> }</TextFragment>
        }
    },
    BS: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    BT: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    BW: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    BY: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    BZ: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    CA: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Payer</TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer</TextFragment>,
            LaterTag: () => <TextFragment>Acheter. Payer plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    CD: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    CG: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    CH: {
        de: {
            Checkout: ({ logoColor }) => <TextFragment>Direkt zu <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Einfach schneller und sicherer bezahlen</TextFragment>,
            LaterTag: () => <TextFragment>Kaufen Sie jetzt und bezahlen Sie nach und nach.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Mit <PayPalLogo logoColor={ logoColor } /> zahlen</TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Le réflexe sécurité pour payer</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    CI: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    CK: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    CL: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    CM: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    CN: {
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    CO: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    CR: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    CV: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    CY: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    CZ: {
        cs: {
            Checkout: ({ logoColor }) => <TextFragment>Zaplatit přes <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Jednodušší a bezpečnější způsob placení</TextFragment>,
            LaterTag: () => <TextFragment>Nakupujte nyní, plaťte později.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Zaplatit přes <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    DE: {
        de: {
            Checkout: ({ logoColor }) => <TextFragment>Direkt zu <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Überall schnell und sicher bezahlen.</TextFragment>,
            LaterTag: () => <TextFragment>Jetzt bei uns bequem in Raten zahlen.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Mit <PayPalLogo logoColor={ logoColor } /> zahlen</TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    DJ: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    DK: {
        da: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Betal</TextFragment>,
            SaferTag: () => <TextFragment>Betal nemt og sikkert</TextFragment>,
            LaterTag: () => <TextFragment>Køb nu, betal senere.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Betal med <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    DM: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    DO: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    DZ: {
        ar: {
            Checkout: ({ logoColor }) => <TextFragment>السداد بواسطة <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>الطريقة الأسهل والأكثر أماناً في الدفع</TextFragment>,
            LaterTag: () => <TextFragment>اشترِ الآن، وسدّد على دفعات</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>دفع بواسطة <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    EC: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    EE: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        ru: {
            Checkout: ({ logoColor }) => <TextFragment>Оформить заказ через <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Более безопасный и простой способ оплаты.</TextFragment>,
            LaterTag: () => <TextFragment>Покупайте сейчас, платите потом.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Оплатить через <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    EG: {
        ar: {
            Checkout: ({ logoColor }) => <TextFragment>السداد بواسطة <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>الطريقة الأسهل والأكثر أماناً في الدفع</TextFragment>,
            LaterTag: () => <TextFragment>اشترِ الآن، وسدّد على دفعات</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>دفع بواسطة <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    ER: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    ES: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    ET: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    FI: {
        fi: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />-maksu</TextFragment>,
            SaferTag: () => <TextFragment>Turvallisempi ja helpompi maksutapa</TextFragment>,
            LaterTag: () => <TextFragment>Osta nyt. Maksa vähitellen.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment><PayPalLogo logoColor={ logoColor } />-maksu</TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    FJ: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    FK: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    FM: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    FO: {
        da: {
            Checkout: ({ logoColor }) => <TextFragment>Betal med <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Betal nemt og sikkert</TextFragment>,
            LaterTag: () => <TextFragment>Køb nu, betal senere.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Betal med <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    FR: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Payer</TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pay</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    GA: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    GB: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    GD: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    GE: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    GF: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    GI: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    GL: {
        da: {
            Checkout: ({ logoColor }) => <TextFragment>Betal med <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Betal nemt og sikkert</TextFragment>,
            LaterTag: () => <TextFragment>Køb nu, betal senere.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Betal med <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    GM: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    GN: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    GP: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    GR: {
        el: {
            Checkout: ({ logoColor }) => <TextFragment>Ολοκλήρωση αγοράς μέσω <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Ο ασφαλέστερος και ευκολότερος τρόπος πληρωμής</TextFragment>,
            LaterTag: () => <TextFragment>Αγοράστε τώρα.  Πληρώστε σε δόσεις.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Πληρωμή μέσω <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    GT: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    GW: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    GY: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    HK: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> 結帳</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更方便的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>先購買，後付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>使用 <PayPalLogo logoColor={ logoColor } /> 付款</TextFragment>
        }
    },
    HN: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    HR: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    HU: {
        hu: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />-fizetés</TextFragment>,
            SaferTag: () => <TextFragment>Biztonságosabb, könnyebb fizetési mód.</TextFragment>,
            LaterTag: () => <TextFragment>Vásároljon most. Fizessen később.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment><PayPalLogo logoColor={ logoColor } />-fizetés</TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    ID: {
        id: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>Cara yang lebih mudah dan aman untuk membayar.</TextFragment>,
            LaterTag: () => <TextFragment>Beli Sekarang. Bayar dalam Jangka Waktu Tertentu.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Bayar dengan <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    IE: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    IL: {
        he: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> שלם</TextFragment>,
            SaferTag: () => <TextFragment>.הדרך הקלה והבטוחה יותר לשלם</TextFragment>,
            LaterTag: () => <TextFragment>קנה עכשיו. שלם לאורך זמן.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>שלם באמצעות <PayPalLogo logoColor={ logoColor } />‏</TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    IN: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay.</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    IS: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    IT: {
        it: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Paga adesso</TextFragment>,
            SaferTag: () => <TextFragment>Il modo rapido e sicuro per pagare</TextFragment>,
            LaterTag: () => <TextFragment>Acquista ora. Paga più tardi.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Paga con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    JM: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    JO: {
        ar: {
            Checkout: ({ logoColor }) => <TextFragment>السداد بواسطة <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>الطريقة الأسهل والأكثر أماناً في الدفع</TextFragment>,
            LaterTag: () => <TextFragment>اشترِ الآن، وسدّد على دفعات</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>دفع بواسطة <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    JP: {
        ja: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />で支払う</TextFragment>,
            SaferTag: () => <TextFragment>より安全・簡単にお支払い</TextFragment>,
            LaterTag: () => <TextFragment>今すぐ購入して、分割してお支払い。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment><PayPalLogo logoColor={ logoColor } />で支払う</TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    KE: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    KG: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    KH: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    KI: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    KM: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    KN: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    KR: {
        ko: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> 체크 아웃</TextFragment>,
            SaferTag: () => <TextFragment>더 안전하고 빠른 결제 방법</TextFragment>,
            LaterTag: () => <TextFragment>지금 구매하고 천천히 결제하세요.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment><PayPalLogo logoColor={ logoColor } />로 지불하기</TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay.</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    KW: {
        ar: {
            Checkout: ({ logoColor }) => <TextFragment>السداد بواسطة <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>الطريقة الأسهل والأكثر أماناً في الدفع</TextFragment>,
            LaterTag: () => <TextFragment>اشترِ الآن، وسدّد على دفعات</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>دفع بواسطة <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    KY: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    KZ: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    LA: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    LC: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    LI: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    LK: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    LS: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    LT: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        ru: {
            Checkout: ({ logoColor }) => <TextFragment>Оформить заказ через <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Более безопасный и простой способ оплаты.</TextFragment>,
            LaterTag: () => <TextFragment>Покупайте сейчас, платите потом.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Оплатить через <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    LU: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        de: {
            Checkout: ({ logoColor }) => <TextFragment>Direkt zu <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Einfach schneller und sicherer bezahlen</TextFragment>,
            LaterTag: () => <TextFragment>Kaufen Sie jetzt und bezahlen Sie nach und nach.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Mit <PayPalLogo logoColor={ logoColor } /> zahlen</TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    LV: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        ru: {
            Checkout: ({ logoColor }) => <TextFragment>Оформить заказ через <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Более безопасный и простой способ оплаты.</TextFragment>,
            LaterTag: () => <TextFragment>Покупайте сейчас, платите потом.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Оплатить через <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    MA: {
        ar: {
            Checkout: ({ logoColor }) => <TextFragment>السداد بواسطة <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>الطريقة الأسهل والأكثر أماناً في الدفع</TextFragment>,
            LaterTag: () => <TextFragment>اشترِ الآن، وسدّد على دفعات</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>دفع بواسطة <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    MC: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    MD: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    ME: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    MG: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    MH: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    MK: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    ML: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    MN: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    MQ: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    MR: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    MS: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    MT: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    MU: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    MV: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    MW: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    MX: {
        es: {
            Checkout:    ({ logoColor }) => <TextFragment>Pagar con <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag:    () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag:    () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:         ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            Installment: ({ logoColor, period }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> { period ? <TextFragment>Pague hasta<br />{ period.toString() }x sin interés</TextFragment> : <TextFragment>Pagos en<br />mensualidades</TextFragment> }</TextFragment>
        },
        en: {
            Checkout:    ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag:    () => <TextFragment>The safer, faster way to pay</TextFragment>,
            LaterTag:    () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:         ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            Installment: ({ logoColor, period }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> { period ? <TextFragment>Pay up to { period.toString() }x<br />without interest</TextFragment> : <TextFragment>Interest free<br />payments</TextFragment> }</TextFragment>
        }
    },
    MY: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay.</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    MZ: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    NA: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    NC: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    NE: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    NF: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    NG: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    NI: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    NL: {
        nl: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Betalen</TextFragment>,
            SaferTag: () => <TextFragment>Een veilige en makkelijke manier om te betalen.</TextFragment>,
            LaterTag: () => <TextFragment>Koop nu. Betaal later.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Betalen met <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    NO: {
        no: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Betal</TextFragment>,
            SaferTag: () => <TextFragment>En trygg og enkel betalingsmetode</TextFragment>,
            LaterTag: () => <TextFragment>Kjøp nå, betal senere.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Betal med <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    NP: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    NR: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    NU: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    NZ: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay.</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Payer</TextFragment>,
            SaferTag: () => <TextFragment>Un réflexe sécurité.</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar.</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式。</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    OM: {
        ar: {
            Checkout: ({ logoColor }) => <TextFragment>السداد بواسطة <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>الطريقة الأسهل والأكثر أماناً في الدفع</TextFragment>,
            LaterTag: () => <TextFragment>اشترِ الآن، وسدّد على دفعات</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>دفع بواسطة <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    PA: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    PE: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    PF: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    PG: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    PH: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay.</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    PL: {
        pl: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Do kasy</TextFragment>,
            SaferTag: () => <TextFragment>Płać wygodnie i bezpiecznie</TextFragment>,
            LaterTag: () => <TextFragment>Kup teraz. Płać w ratach</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Zapłać z <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    PM: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    PN: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    PT: {
        pt: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A forma rápida e segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre agora. Vá pagando.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar com <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    PW: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    PY: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    QA: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        },
        ar: {
            Checkout: ({ logoColor }) => <TextFragment>السداد بواسطة <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>الطريقة الأسهل والأكثر أماناً في الدفع</TextFragment>,
            LaterTag: () => <TextFragment>اشترِ الآن، وسدّد على دفعات</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>دفع بواسطة <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    RE: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    RO: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    RS: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    RU: {
        ru: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Оформить покупку</TextFragment>,
            SaferTag: () => <TextFragment>Более безопасный и простой способ оплаты.</TextFragment>,
            LaterTag: () => <TextFragment>Покупайте сейчас, платите потом.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Оплатить через <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    RW: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    SA: {
        ar: {
            Checkout: ({ logoColor }) => <TextFragment>السداد بواسطة <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>الطريقة الأسهل والأكثر أماناً في الدفع</TextFragment>,
            LaterTag: () => <TextFragment>اشترِ الآن، وسدّد على دفعات</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>دفع بواسطة <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    SB: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    SC: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    SE: {
        sv: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Betala</TextFragment>,
            SaferTag: () => <TextFragment>Ett tryggt och smidigt sätt att betala</TextFragment>,
            LaterTag: () => <TextFragment>Köp nu, betala senare</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Betala med <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    SG: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay.</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    SH: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    SI: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    SJ: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    SK: {
        sk: {
            Checkout: ({ logoColor }) => <TextFragment>Zaplatiť cez <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Jednoduchší a bezpečnejší spôsob platby</TextFragment>,
            LaterTag: () => <TextFragment>Nakúpte teraz, zaplaťte postupne</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Zaplatiť cez <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    SL: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    SM: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    SN: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    SO: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    SR: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    ST: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    SV: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    SZ: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    TC: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    TD: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    TG: {
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    TH: {
        th: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> ชำระเงิน</TextFragment>,
            SaferTag: () => <TextFragment>วิธีชำระเงินที่ปลอดภัยและง่ายกว่า</TextFragment>,
            LaterTag: () => <TextFragment>ซื้อวันนี้ แล้วค่อยๆ จ่ายทีหลัง</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>ชำระเงินด้วย <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    TJ: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    TM: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    TN: {
        ar: {
            Checkout: ({ logoColor }) => <TextFragment>السداد بواسطة <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>الطريقة الأسهل والأكثر أماناً في الدفع</TextFragment>,
            LaterTag: () => <TextFragment>اشترِ الآن، وسدّد على دفعات</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>دفع بواسطة <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    TO: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    TR: {
        tr: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> ile Satın Alın</TextFragment>,
            SaferTag: () => <TextFragment>Ödeme yapmanın daha güvenli ve kolay yolu</TextFragment>,
            LaterTag: () => <TextFragment>Şimdi Alın. Daha Sonra Ödeyin.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment><PayPalLogo logoColor={ logoColor } /> ile Öde</TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    TT: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    TV: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    TW: {
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> 結帳</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更方便的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>先購買，後付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>使用 <PayPalLogo logoColor={ logoColor } /> 付款</TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    TZ: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    UA: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        ru: {
            Checkout: ({ logoColor }) => <TextFragment>Оформить заказ через <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Более безопасный и простой способ оплаты.</TextFragment>,
            LaterTag: () => <TextFragment>Покупайте сейчас, платите потом.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Оплатить через <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    UG: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    US: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            DualTag:  () => <TextFragment>Two easy ways to pay</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Payer</TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment>Pagar con <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment>使用<PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    UY: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    VA: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    VC: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    VE: {
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    VG: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    VN: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Checkout</TextFragment>,
            SaferTag: () => <TextFragment>A safer, faster way to pay.</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    VU: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    WF: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    WS: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    },
    YE: {
        ar: {
            Checkout: ({ logoColor }) => <TextFragment>السداد بواسطة <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>الطريقة الأسهل والأكثر أماناً في الدفع</TextFragment>,
            LaterTag: () => <TextFragment>اشترِ الآن، وسدّد على دفعات</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>دفع بواسطة <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    YT: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    ZA: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    ZM: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        fr: {
            Checkout: ({ logoColor }) => <TextFragment>Payer avec <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>Votre réflexe sécurité pour payer en ligne</TextFragment>,
            LaterTag: () => <TextFragment>Achetez maintenant et payez plus tard.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Payer avec <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        es: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> Pagar</TextFragment>,
            SaferTag: () => <TextFragment>La forma rápida y segura de pagar</TextFragment>,
            LaterTag: () => <TextFragment>Compre ahora y pague más adelante.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pagar con <PayPalLogo logoColor={ logoColor } /></TextFragment>
        },
        zh: {
            Checkout: ({ logoColor }) => <TextFragment><PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } />结账</TextFragment>,
            SaferTag: () => <TextFragment>更安全、更便捷的付款方式</TextFragment>,
            LaterTag: () => <TextFragment>立即购买，分期付款。</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>用<PayPalLogo logoColor={ logoColor } />付款</TextFragment>
        }
    },
    ZW: {
        en: {
            Checkout: ({ logoColor }) => <TextFragment>Check out with <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /></TextFragment>,
            SaferTag: () => <TextFragment>The safer, easier way to pay</TextFragment>,
            LaterTag: () => <TextFragment>Buy Now. Pay Over Time.</TextFragment>,
            Pay:      ({ logoColor }) => <TextFragment>Pay with <PayPalLogo logoColor={ logoColor } /></TextFragment>
        }
    }
};

export let componentContent : ContentMap = {};

if (__PAYPAL_CHECKOUT__.__TREE_SHAKE__) {
    componentContent = {
        [__LOCALE__.__COUNTRY__]: {
            [__LOCALE__.__LANG__]: COMPONENT_CONTENT[__LOCALE__.__COUNTRY__][__LOCALE__.__LANG__]
        }
    };
} else {
    componentContent = COMPONENT_CONTENT;
}
