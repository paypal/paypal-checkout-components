/* @flow */
/* eslint max-lines: 0 */

import { LANG } from '@paypal/sdk-constants/src';

type ContentMap = {
    [ $Values<typeof LANG> ] : {
        checkout : string,
        pay : string,
        installment? : string,
        installment_period? : string,
        safer_tag : string,
        dual_tag? : string
    }
};

export const componentContent : ContentMap = {
    en: {
        checkout:           '{pp} {paypal} Checkout',
        safer_tag:          'The safer, easier way to pay',
        pay:                'Pay with {paypal}',
        installment:        '{pp} {paypal}  Interest free{br}  payments',
        installment_period: '{pp} {paypal}  Pay up to {period}x{br}  without interest',
        dual_tag:           'Two easy ways to pay'
    },
    fr: {
        checkout:  '{pp} {paypal} Payer',
        safer_tag: 'Votre réflexe sécurité pour payer en ligne',
        pay:       'Payer avec {paypal}'
    },
    es: {
        checkout:           '{pp} {paypal} Pagar',
        safer_tag:          'La forma rápida y segura de pagar',
        pay:                'Pagar con {paypal}',
        installment:        '{pp} {paypal}  Pagos en{br}  mensualidades',
        installment_period: '{pp} {paypal}  Pague hasta{br}  {period}x sin interés'
    },
    zh: {
        checkout:  '{pp} {paypal} 結帳',
        safer_tag: '更安全、更便捷的付款方式',
        pay:       '用{paypal}付款'
    },
    ar: {
        checkout:  'السداد بواسطة {pp} {paypal}',
        safer_tag: 'الطريقة الأسهل والأكثر أماناً في الدفع',
        pay:       'دفع بواسطة {paypal}'
    },
    de: {
        checkout:  'Direkt zu {pp} {paypal}',
        safer_tag: 'Überall schnell und sicher bezahlen',
        pay:       'Mit {paypal} zahlen'
    },
    nl: {
        checkout:  '{pp} {paypal} Betalen',
        safer_tag: 'De veiligere en snellere manier om te betalen',
        pay:       'Betalen met {paypal}'
    },
    pt: {
        checkout:           '{pp} {paypal} Checkout',
        safer_tag:          'A maneira fácil e segura de pagar',
        pay:                'Pague com {paypal}',
        installment:        '{pp} {paypal}  Pagamentos{br}  parcelados',
        installment_period: '{pp} {paypal}  Pague em até{br}  {period}x sem juros'
    },
    cs: {
        checkout:  'Zaplatit přes {pp} {paypal}',
        safer_tag: 'Jednodušší a bezpečnější způsob placení',
        pay:       'Zaplatit přes {logo: paypal}'
    },
    da: {
        checkout:  '{pp} {paypal} Betal',
        safer_tag: 'Betal nemt og sikkert',
        pay:       'Betal med {paypal}'
    },
    ru: {
        checkout:  '{pp} {paypal} Оформить покупку',
        safer_tag: 'Более безопасный и простой способ оплаты',
        pay:       'Оплатить через {paypal}'
    },
    fi: {
        checkout:  '{pp} {paypal}-maksu',
        safer_tag: 'Turvallisempi ja helpompi maksutapa',
        pay:       '{paypal}-maksu'
    },
    el: {
        checkout:  'Ολοκλήρωση αγοράς μέσω {pp} {paypal}',
        safer_tag: 'Ο ασφαλέστερος και ευκολότερος τρόπος πληρωμής',
        pay:       'Πληρωμή μέσω {paypal}'
    },
    hu: {
        checkout:  '{pp} {paypal}-fizetés',
        safer_tag: 'Biztonságosabb, könnyebb fizetési mód',
        pay:       '{paypal}-fizetés'
    },
    id: {
        checkout:  '{pp} {paypal} Checkout',
        safer_tag: 'Cara yang lebih mudah dan aman untuk membayar',
        pay:       'Bayar dengan {paypal}'
    },
    he: {
        checkout:  '{pp} {paypal} שלם',
        safer_tag: '.הדרך הקלה והבטוחה יותר לשלם',
        pay:       'שלם באמצעות {paypal}‏'
    },
    it: {
        checkout:  '{pp} {paypal} Paga adesso',
        safer_tag: 'Il modo rapido e sicuro per pagare',
        pay:       'Paga con {paypal}'
    },
    ja: {
        checkout:  '{pp} {paypal}で支払う',
        safer_tag: 'より安全・簡単にお支払い',
        pay:       '{paypal}で支払う'
    },
    ko: {
        checkout:  '{pp} {paypal} 체크 아웃',
        safer_tag: '더 안전하고 빠른 결제 방법',
        pay:       '{paypal}로 지불하기'
    },
    no: {
        checkout:  '{pp} {paypal} Betal',
        safer_tag: 'En trygg og enkel betalingsmetode',
        pay:       'Betal med {paypal}'
    },
    pl: {
        checkout:  '{pp} {paypal} Do kasy',
        safer_tag: 'Płać wygodnie i bezpiecznie',
        pay:       'Zapłać z {paypal}'
    },
    sv: {
        checkout:  '{pp} {paypal} Betala',
        safer_tag: 'Ett tryggt och smidigt sätt att betala',
        pay:       'Betala med {paypal}'
    },
    sk: {
        checkout:  'Zaplatiť cez {pp} {paypal}',
        safer_tag: 'Jednoduchší a bezpečnejší spôsob platby',
        pay:       'Zaplatiť cez {logo: paypal}'
    },
    th: {
        checkout:  '{pp} {paypal} ชำระเงิน',
        safer_tag: 'วิธีชำระเงินที่ปลอดภัยและง่ายกว่า',
        pay:       'ชำระเงินด้วย {paypal}'
    },
    tr: {
        checkout:  '{pp} {paypal} ile Satın Alın',
        safer_tag: 'Ödeme yapmanın daha güvenli ve kolay yolu',
        pay:       '{paypal} ile Öde'
    }
};
