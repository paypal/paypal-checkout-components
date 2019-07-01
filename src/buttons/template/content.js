/* @flow */

import { LANG } from '@paypal/sdk-constants/src';

type ButtonContentMap = {
    [ $Values<typeof LANG> ] : {
        payInstantly : string
    }
};

export const buttonContent : ButtonContentMap = {
    en: {
        payInstantly: 'Pay Instantly With'
    },
    fr: {
        payInstantly: 'Payez instantanément avec'
    },
    es: {
        payInstantly: 'Pagar en segundos con'
    },
    zh: {
        payInstantly: '使用以下付款方式即时付款'
    },
    ar: {
        payInstantly: 'ادفع بشكل فوري باستخدام'
    },
    de: {
        payInstantly: 'Sofort bezahlen mit'
    },
    nl: {
        payInstantly: 'Direct betalen met'
    },
    pt: {
        payInstantly: 'Pague imediatamente com'
    },
    cs: {
        payInstantly: 'Výběr způsobu okamžité platby'
    },
    da: {
        payInstantly: 'Betal med det samme med'
    },
    ru: {
        payInstantly: 'Мгновенно оплачивайте счета с помощью'
    },
    fi: {
        payInstantly: 'Maksa välittömästi'
    },
    el: {
        payInstantly: 'Άμεση πληρωμή μέσω'
    },
    hu: {
        payInstantly: 'Azonnali fizetés a következővel'
    },
    id: {
        payInstantly: 'Bayar secara instan dengan'
    },
    he: {
        payInstantly: 'שליחת תשלום באופן מיידי באמצעות'
    },
    it: {
        payInstantly: 'Paga subito con'
    },
    ja: {
        payInstantly: 'よりスピーディな支払方法'
    },
    ko: {
        payInstantly: '다음으로 즉시 결제'
    },
    no: {
        payInstantly: 'Betal umiddelbart med'
    },
    pl: {
        payInstantly: 'Zapłać błyskawicznie za pomocą'
    },
    sv: {
        payInstantly: 'Betala direkt med'
    },
    sk: {
        payInstantly: 'Zaplaťte okamžite'
    },
    th: {
        payInstantly: 'ชำระเงินได้ทันทีด้วย'
    },
    tr: {
        payInstantly: 'Pay Instantly With'
    }
};
