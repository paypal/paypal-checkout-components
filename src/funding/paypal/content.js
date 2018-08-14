/* @flow */
/* eslint max-lines: 0 */

import { COUNTRY, LANG } from 'paypal-braintree-web-client/src';

type ContentMap = {
    [ $Values<typeof COUNTRY> ] : {
        [ $Values<typeof LANG> ] : {
            checkout : string,
            pay : string,
            installment? : string,
            installment_period? : string,
            safer_tag : string,
            dual_tag? : string
        }
    }
};

const COMPONENT_CONTENT : ContentMap = {
    AD: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    AE: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        },
        ar: {
            checkout:  'السداد بواسطة {pp} {paypal}',
            safer_tag: 'الطريقة الأسهل والأكثر أماناً في الدفع',
            pay:       'دفع بواسطة {paypal}'
        }
    },
    AG: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    AI: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    AL: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    AM: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    AN: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    AO: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    AR: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    AT: {
        de: {
            checkout:  'Direkt zu {pp} {paypal}',
            safer_tag: 'Einfach schneller und sicherer bezahlen',
            pay:       'Mit {paypal} zahlen'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    AU: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    AW: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    AZ: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    BA: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    BB: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    BE: {
        en: {
            checkout:  'Pay with {pp} {paypal}',
            safer_tag: 'The safer, faster way to pay',
            pay:       'Pay with {paypal}'
        },
        nl: {
            checkout:  'Betalen met {pp} {paypal}',
            safer_tag: 'De veiligere en snellere manier om te betalen.',
            pay:       'Betalen met {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Le réflexe sécurité pour payer',
            pay:       'Payer avec {paypal}'
        }
    },
    BF: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    BG: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    BH: {
        ar: {
            checkout:  'السداد بواسطة {pp} {paypal}',
            safer_tag: 'الطريقة الأسهل والأكثر أماناً في الدفع',
            pay:       'دفع بواسطة {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    BI: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    BJ: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    BM: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    BN: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    BO: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    BR: {
        pt: {
            checkout:           '{pp} {paypal} Finalizar',
            safer_tag:          'A maneira fácil e segura de pagar.',
            pay:                'Pague com {paypal}',
            installment:        '{pp} {paypal}  Pagamentos{br}  parcelados',
            installment_period: '{pp} {paypal}  Pague em até{br}  {period}x sem juros'
        },
        en: {
            checkout:           '{pp} {paypal} Checkout',
            safer_tag:          'The safer, easier way to pay',
            pay:                'Pay with {paypal}',
            installment:        '{pp} {paypal}  Interest free{br}  payments',
            installment_period: '{pp} {paypal}  Pay up to {period}x{br}  without interest'
        }
    },
    BS: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    BT: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    BW: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    BY: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    BZ: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    CA: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  '{pp} {paypal} Payer',
            safer_tag: 'Votre réflexe sécurité pour payer',
            pay:       'Payer avec {paypal}'
        }
    },
    CD: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    CG: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    CH: {
        de: {
            checkout:  'Direkt zu {pp} {paypal}',
            safer_tag: 'Einfach schneller und sicherer bezahlen',
            pay:       'Mit {paypal} zahlen'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Le réflexe sécurité pour payer',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    CI: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    CK: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    CL: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    CM: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    CN: {
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    CO: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    CR: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    CV: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    CY: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    CZ: {
        cs: {
            checkout:  'Zaplatit přes {pp} {paypal}',
            safer_tag: 'Jednodušší a bezpečnější způsob placení',
            pay:       'Zaplatit přes {logo: paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    DE: {
        de: {
            checkout:  'Direkt zu {pp} {paypal}',
            safer_tag: 'Überall schnell und sicher bezahlen.',
            pay:       'Mit {paypal} zahlen'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    DJ: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    DK: {
        da: {
            checkout:  '{pp} {paypal} Betal',
            safer_tag: 'Betal nemt og sikkert',
            pay:       'Betal med {paypal}'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    DM: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    DO: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    DZ: {
        ar: {
            checkout:  'السداد بواسطة {pp} {paypal}',
            safer_tag: 'الطريقة الأسهل والأكثر أماناً في الدفع',
            pay:       'دفع بواسطة {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    EC: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    EE: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        ru: {
            checkout:  'Оформить заказ через {pp} {paypal}',
            safer_tag: 'Более безопасный и простой способ оплаты.',
            pay:       'Оплатить через {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    EG: {
        ar: {
            checkout:  'السداد بواسطة {pp} {paypal}',
            safer_tag: 'الطريقة الأسهل والأكثر أماناً في الدفع',
            pay:       'دفع بواسطة {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    ER: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    ES: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    ET: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    FI: {
        fi: {
            checkout:  '{pp} {paypal}-maksu',
            safer_tag: 'Turvallisempi ja helpompi maksutapa',
            pay:       '{paypal}-maksu'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    FJ: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    FK: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    FM: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    FO: {
        da: {
            checkout:  'Betal med {pp} {paypal}',
            safer_tag: 'Betal nemt og sikkert',
            pay:       'Betal med {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    FR: {
        fr: {
            checkout:  '{pp} {paypal} Payer',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  '{pp} {paypal} Pay',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    GA: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    GB: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    GD: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    GE: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    GF: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    GI: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    GL: {
        da: {
            checkout:  'Betal med {pp} {paypal}',
            safer_tag: 'Betal nemt og sikkert',
            pay:       'Betal med {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    GM: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    GN: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    GP: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    GR: {
        el: {
            checkout:  'Ολοκλήρωση αγοράς μέσω {pp} {paypal}',
            safer_tag: 'Ο ασφαλέστερος και ευκολότερος τρόπος πληρωμής',
            pay:       'Πληρωμή μέσω {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    GT: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    GW: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    GY: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    HK: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal} 結帳',
            safer_tag: '更安全、更方便的付款方式',
            pay:       '使用 {paypal} 付款'
        }
    },
    HN: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    HR: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    HU: {
        hu: {
            checkout:  '{pp} {paypal}-fizetés',
            safer_tag: 'Biztonságosabb, könnyebb fizetési mód.',
            pay:       '{paypal}-fizetés'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    ID: {
        id: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'Cara yang lebih mudah dan aman untuk membayar.',
            pay:       'Bayar dengan {paypal}'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    IE: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    IL: {
        he: {
            checkout:  '{pp} {paypal} שלם',
            safer_tag: '.הדרך הקלה והבטוחה יותר לשלם',
            pay:       'שלם באמצעות {paypal}‏'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    IN: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay.',
            pay:       'Pay with {paypal}'
        }
    },
    IS: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    IT: {
        it: {
            checkout:  '{pp} {paypal} Paga adesso',
            safer_tag: 'Il modo rapido e sicuro per pagare',
            pay:       'Paga con {paypal}'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    JM: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    JO: {
        ar: {
            checkout:  'السداد بواسطة {pp} {paypal}',
            safer_tag: 'الطريقة الأسهل والأكثر أماناً في الدفع',
            pay:       'دفع بواسطة {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    JP: {
        ja: {
            checkout:  '{pp} {paypal}で支払う',
            safer_tag: 'より安全・簡単にお支払い',
            pay:       '{paypal}で支払う'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    KE: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    KG: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    KH: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    KI: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    KM: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    KN: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    KR: {
        ko: {
            checkout:  '{pp} {paypal} 체크 아웃',
            safer_tag: '더 안전하고 빠른 결제 방법',
            pay:       '{paypal}로 지불하기'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay.',
            pay:       'Pay with {paypal}'
        }
    },
    KW: {
        ar: {
            checkout:  'السداد بواسطة {pp} {paypal}',
            safer_tag: 'الطريقة الأسهل والأكثر أماناً في الدفع',
            pay:       'دفع بواسطة {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    KY: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    KZ: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    LA: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    LC: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    LI: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    LK: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    LS: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    LT: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        ru: {
            checkout:  'Оформить заказ через {pp} {paypal}',
            safer_tag: 'Более безопасный и простой способ оплаты.',
            pay:       'Оплатить через {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    LU: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        de: {
            checkout:  'Direkt zu {pp} {paypal}',
            safer_tag: 'Einfach schneller und sicherer bezahlen',
            pay:       'Mit {paypal} zahlen'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    LV: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        ru: {
            checkout:  'Оформить заказ через {pp} {paypal}',
            safer_tag: 'Более безопасный и простой способ оплаты.',
            pay:       'Оплатить через {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    MA: {
        ar: {
            checkout:  'السداد بواسطة {pp} {paypal}',
            safer_tag: 'الطريقة الأسهل والأكثر أماناً في الدفع',
            pay:       'دفع بواسطة {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    MC: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    MD: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    ME: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    MG: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    MH: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    MK: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    ML: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    MN: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    MQ: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    MR: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    MS: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    MT: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    MU: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    MV: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    MW: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    MX: {
        es: {
            checkout:           'Pagar con {pp} {paypal}',
            safer_tag:          'La forma rápida y segura de pagar',
            pay:                'Pagar con {paypal}',
            installment:        '{pp} {paypal}  Pagos en{br}  mensualidades',
            installment_period: '{pp} {paypal}  Pague hasta{br}  {period}x sin interés'
        },
        en: {
            checkout:           '{pp} {paypal} Checkout',
            safer_tag:          'The safer, faster way to pay',
            pay:                'Pay with {paypal}',
            installment:        '{pp} {paypal}  Interest free{br}  payments',
            installment_period: '{pp} {paypal}  Pay up to {period}x{br}  without interest'
        }
    },
    MY: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay.',
            pay:       'Pay with {paypal}'
        }
    },
    MZ: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    NA: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    NC: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    NE: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    NF: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    NG: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    NI: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    NL: {
        nl: {
            checkout:  '{pp} {paypal} Betalen',
            safer_tag: 'Een veilige en makkelijke manier om te betalen.',
            pay:       'Betalen met {paypal}'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    NO: {
        no: {
            checkout:  '{pp} {paypal} Betal',
            safer_tag: 'En trygg og enkel betalingsmetode',
            pay:       'Betal med {paypal}'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    NP: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    NR: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    NU: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    NZ: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay.',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  '{pp} {paypal} Payer',
            safer_tag: 'Un réflexe sécurité.',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar.',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式。',
            pay:       '用{paypal}付款'
        }
    },
    OM: {
        ar: {
            checkout:  'السداد بواسطة {pp} {paypal}',
            safer_tag: 'الطريقة الأسهل والأكثر أماناً في الدفع',
            pay:       'دفع بواسطة {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    PA: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    PE: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    PF: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    PG: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    PH: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay.',
            pay:       'Pay with {paypal}'
        }
    },
    PL: {
        pl: {
            checkout:  '{pp} {paypal} Do kasy',
            safer_tag: 'Płać wygodnie i bezpiecznie',
            pay:       'Zapłać z {paypal}'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    PM: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    PN: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    PT: {
        pt: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A forma rápida e segura de pagar',
            pay:       'Pagar com {paypal}'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    PW: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    PY: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    QA: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        },
        ar: {
            checkout:  'السداد بواسطة {pp} {paypal}',
            safer_tag: 'الطريقة الأسهل والأكثر أماناً في الدفع',
            pay:       'دفع بواسطة {paypal}'
        }
    },
    RE: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    RO: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    RS: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    RU: {
        ru: {
            checkout:  '{pp} {paypal} Оформить покупку',
            safer_tag: 'Более безопасный и простой способ оплаты.',
            pay:       'Оплатить через {paypal}'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    RW: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    SA: {
        ar: {
            checkout:  'السداد بواسطة {pp} {paypal}',
            safer_tag: 'الطريقة الأسهل والأكثر أماناً في الدفع',
            pay:       'دفع بواسطة {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    SB: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    SC: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    SE: {
        sv: {
            checkout:  '{pp} {paypal} Betala',
            safer_tag: 'Ett tryggt och smidigt sätt att betala',
            pay:       'Betala med {paypal}'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    SG: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay.',
            pay:       'Pay with {paypal}'
        }
    },
    SH: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    SI: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    SJ: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    SK: {
        sk: {
            checkout:  'Zaplatiť cez {pp} {paypal}',
            safer_tag: 'Jednoduchší a bezpečnejší spôsob platby',
            pay:       'Zaplatiť cez {logo: paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    SL: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    SM: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    SN: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    SO: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    SR: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    ST: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    SV: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    SZ: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    TC: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    TD: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    TG: {
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    TH: {
        th: {
            checkout:  '{pp} {paypal} ชำระเงิน',
            safer_tag: 'วิธีชำระเงินที่ปลอดภัยและง่ายกว่า',
            pay:       'ชำระเงินด้วย {paypal}'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    TJ: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    TM: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    TN: {
        ar: {
            checkout:  'السداد بواسطة {pp} {paypal}',
            safer_tag: 'الطريقة الأسهل والأكثر أماناً في الدفع',
            pay:       'دفع بواسطة {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    TO: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    TR: {
        tr: {
            checkout:  '{pp} {paypal} ile Satın Alın',
            safer_tag: 'Ödeme yapmanın daha güvenli ve kolay yolu',
            pay:       '{paypal} ile Öde'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    TT: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    TV: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    TW: {
        zh: {
            checkout:  '{pp} {paypal} 結帳',
            safer_tag: '更安全、更方便的付款方式',
            pay:       '使用 {paypal} 付款'
        },
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    TZ: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    UA: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        ru: {
            checkout:  'Оформить заказ через {pp} {paypal}',
            safer_tag: 'Более безопасный и простой способ оплаты.',
            pay:       'Оплатить через {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    UG: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    US: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'The safer, easier way to pay',
            dual_tag:  'Two easy ways to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  '{pp} {paypal} Payer',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  'Pagar con {pp} {paypal}',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '使用{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    UY: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    VA: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    VC: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    VE: {
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    VG: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    VN: {
        en: {
            checkout:  '{pp} {paypal} Checkout',
            safer_tag: 'A safer, faster way to pay.',
            pay:       'Pay with {paypal}'
        }
    },
    VU: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    WF: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    WS: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    },
    YE: {
        ar: {
            checkout:  'السداد بواسطة {pp} {paypal}',
            safer_tag: 'الطريقة الأسهل والأكثر أماناً في الدفع',
            pay:       'دفع بواسطة {paypal}'
        },
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    YT: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    ZA: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    ZM: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        },
        fr: {
            checkout:  'Payer avec {pp} {paypal}',
            safer_tag: 'Votre réflexe sécurité pour payer en ligne',
            pay:       'Payer avec {paypal}'
        },
        es: {
            checkout:  '{pp} {paypal} Pagar',
            safer_tag: 'La forma rápida y segura de pagar',
            pay:       'Pagar con {paypal}'
        },
        zh: {
            checkout:  '{pp} {paypal}结账',
            safer_tag: '更安全、更便捷的付款方式',
            pay:       '用{paypal}付款'
        }
    },
    ZW: {
        en: {
            checkout:  'Check out with {pp} {paypal}',
            safer_tag: 'The safer, easier way to pay',
            pay:       'Pay with {paypal}'
        }
    }
};

export let componentContent = __PAYPAL_CHECKOUT__.__TREE_SHAKE__

    ? {
        [__LOCALE__.__COUNTRY__]: {
            [__LOCALE__.__LANG__]: COMPONENT_CONTENT[__LOCALE__.__COUNTRY__][__LOCALE__.__LANG__]
        }
    }

    : COMPONENT_CONTENT;
