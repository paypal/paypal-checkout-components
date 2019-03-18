/* @flow */
/* eslint max-lines: 0 */
/** @jsx node */
/** @jsxFrag Fragment */

import { node, Fragment, type ChildType, type NodePropsType, type ChildrenType, type ComponentNode } from 'jsx-pragmatic/src'; // eslint-disable-line no-unused-vars
import { LANG } from '@paypal/sdk-constants/src';
import { PPLogo, PayPalLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { Text } from '../common';

export type Content = string | ({ logoColor : $Values<typeof LOGO_COLOR>, period? : number }) => ChildType;

export type ContentMap = {
    [ $Values<typeof LANG> ] : {
        checkout : Content,
        pay : Content,
        installment? : Content,
        installment_period? : Content,
        safer_tag : Content,
        dual_tag? : Content
    }
};

const Installment = ({ logoColor } : NodePropsType, children : ChildrenType) : ChildType => {
    return (
        // $FlowFixMe
        <>
            <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> <Text>{ children }</Text>
        </>
    );
};

export const componentContent : ContentMap = {
    en: {
        checkout:           '{pp} {paypal} Checkout',
        safer_tag:          'The safer, easier way to pay',
        pay:                'Pay with {paypal}',
        installment:        ({ logoColor }) => <Installment logoColor={ logoColor }> Interest free<br /> payments</Installment>,
        installment_period: ({ logoColor, period }) => <Installment logoColor={ logoColor }> Pay up to { period ? period.toString() : '' }x<br /> without interest</Installment>,
        dual_tag:           'Two easy ways to pay',
        buynow:             '{pp} {paypal} Buy Now',
        poweredBy:          'Powered by {paypal}'
    },
    fr: {
        checkout:  '{pp} {paypal} Payer',
        safer_tag: 'Votre réflexe sécurité pour payer en ligne',
        pay:       'Payer avec {paypal}',
        buynow:    '{pp} {paypal} Acheter',
        poweredBy: 'Optimisé par {paypal}'
    },
    es: {
        checkout:           '{pp} {paypal} Pagar',
        safer_tag:          'La forma rápida y segura de pagar',
        pay:                'Pagar con {paypal}',
        installment:        ({ logoColor }) => <Installment logoColor={ logoColor }> Pagos en<br /> mensualidades</Installment>,
        installment_period: ({ logoColor, period }) => <Installment logoColor={ logoColor }> Pague hasta { period ? period.toString() : '' }x<br /> sin interés</Installment>,
        buynow:             '{pp} {paypal} Comprar ahora',
        poweredBy:          'Desarrollado por {paypal}'
    },
    zh: {
        checkout:  '{pp} {paypal} 結帳',
        safer_tag: '更安全、更便捷的付款方式',
        pay:       '用{paypal}付款',
        buynow:    '{pp} {paypal} 立即购买',
        poweredBy: '技术支持提供方： {paypal}'
    },
    ar: {
        checkout:  'السداد بواسطة {pp} {paypal}',
        safer_tag: 'الطريقة الأسهل والأكثر أماناً في الدفع',
        pay:       'دفع بواسطة {paypal}',
        buynow:    '{pp} {paypal} شراء الآن',
        poweredBy: 'مدعوم من {paypal}'
    },
    de: {
        checkout:  'Direkt zu {pp} {paypal}',
        safer_tag: 'Überall schnell und sicher bezahlen',
        pay:       'Mit {paypal} zahlen',
        buynow:    '{pp} {paypal} Jetzt kaufen',
        poweredBy: 'Abgewickelt durch {paypal}'
    },
    nl: {
        checkout:  '{pp} {paypal} Betalen',
        safer_tag: 'De veiligere en snellere manier om te betalen',
        pay:       'Betalen met {paypal}',
        buynow:    '{pp} {paypal} Nu kopen',
        poweredBy: 'Mogelijk gemaakt door {paypal}'
    },
    pt: {
        checkout:           '{pp} {paypal} Checkout',
        safer_tag:          'A maneira fácil e segura de pagar',
        pay:                'Pague com {paypal}',
        installment:        ({ logoColor }) => <Installment logoColor={ logoColor }> Pagamentos<br /> parcelados</Installment>,
        installment_period: ({ logoColor, period }) => <Installment logoColor={ logoColor }> Pague em até<br />{ period ? period.toString() : '' }x sem juros</Installment>,
        buynow:             '{pp} {paypal} Comprar agora',
        poweredBy:          'Powered by {paypal}'
    },
    cs: {
        checkout:  'Zaplatit přes {pp} {paypal}',
        safer_tag: 'Jednodušší a bezpečnější způsob placení',
        pay:       'Zaplatit přes {paypal}',
        buynow:    'Koupit ihned přes {pp} {paypal}',
        poweredBy: 'Využívá službu {paypal}'
    },
    da: {
        checkout:  '{pp} {paypal} Betal',
        safer_tag: 'Betal nemt og sikkert',
        pay:       'Betal med {paypal}',
        buynow:    '{pp} {paypal} Køb nu',
        poweredBy: 'Leveret af {paypal}'
    },
    ru: {
        checkout:  '{pp} {paypal} Оформить покупку',
        safer_tag: 'Более безопасный и простой способ оплаты',
        pay:       'Оплатить через {paypal}',
        buynow:    '{pp} {paypal} Купить сейчас',
        poweredBy: 'Обработано {paypal}'
    },
    fi: {
        checkout:  '{pp} {paypal}-maksu',
        safer_tag: 'Turvallisempi ja helpompi maksutapa',
        pay:       '{paypal}-maksu',
        buynow:    '{pp} {paypal} Osta nyt',
        poweredBy: 'Palvelun tarjoaa {paypal}'
    },
    el: {
        checkout:  'Ολοκλήρωση αγοράς μέσω {pp} {paypal}',
        safer_tag: 'Ο ασφαλέστερος και ευκολότερος τρόπος πληρωμής',
        pay:       'Πληρωμή μέσω {paypal}',
        buynow:    '{pp} {paypal} Αγορά τώρα',
        poweredBy: 'Με την υποστήριξη του {paypal}'
    },
    hu: {
        checkout:  '{pp} {paypal}-fizetés',
        safer_tag: 'Biztonságosabb, könnyebb fizetési mód',
        pay:       '{paypal}-fizetés',
        buynow:    '{pp} {paypal} Vásárlás',
        poweredBy: 'Üzemeltető: {paypal}'
    },
    id: {
        checkout:  '{pp} {paypal} Checkout',
        safer_tag: 'Cara yang lebih mudah dan aman untuk membayar',
        pay:       'Bayar dengan {paypal}',
        buynow:    '{pp} {paypal} Beli Sekarang',
        poweredBy: 'Ditunjang teknologi {paypal}'
    },
    he: {
        checkout:  '{pp} {paypal} שלם',
        safer_tag: '.הדרך הקלה והבטוחה יותר לשלם',
        pay:       'שלם באמצעות {paypal}‏',
        buynow:    '{pp} {paypal} קנה עכשיו',
        poweredBy: '{paypal} מופעל על-ידי'
    },
    it: {
        checkout:  '{pp} {paypal} Paga adesso',
        safer_tag: 'Il modo rapido e sicuro per pagare',
        pay:       'Paga con {paypal}',
        buynow:    '{pp} {paypal} Paga adesso',
        poweredBy: 'Con tecnologia {paypal}'
    },
    ja: {
        checkout:  '{pp} {paypal}で支払う',
        safer_tag: 'より安全・簡単にお支払い',
        pay:       '{paypal}で支払う',
        buynow:    '{pp} {paypal} 購入',
        poweredBy: 'Powered by {paypal}'
    },
    ko: {
        checkout:  '{pp} {paypal} 체크 아웃',
        safer_tag: '더 안전하고 빠른 결제 방법',
        pay:       '{paypal}로 지불하기',
        buynow:    '{pp} {paypal} 바로 구매',
        poweredBy: '제공: {paypal}'
    },
    no: {
        checkout:  '{pp} {paypal} Betal',
        safer_tag: 'En trygg og enkel betalingsmetode',
        pay:       'Betal med {paypal}',
        buynow:    '{pp} {paypal} Kjøp nå',
        poweredBy: 'Leveres av {paypal}'
    },
    pl: {
        checkout:  '{pp} {paypal} Do kasy',
        safer_tag: 'Płać wygodnie i bezpiecznie',
        pay:       'Zapłać z {paypal}',
        buynow:    '{pp} {paypal} Kup teraz',
        poweredBy: 'Powered by {paypal}'
    },
    sv: {
        checkout:  '{pp} {paypal} Betala',
        safer_tag: 'Ett tryggt och smidigt sätt att betala',
        pay:       'Betala med {paypal}',
        buynow:    '{pp} {paypal} Köp nu',
        poweredBy: 'Tillhandahålls av {paypal}'
    },
    sk: {
        checkout:  'Zaplatiť cez {pp} {paypal}',
        safer_tag: 'Jednoduchší a bezpečnejší spôsob platby',
        pay:       'Zaplatiť cez {paypal}',
        buynow:    '{pp} {paypal} Kúpiť',
        poweredBy: 'Používa technológiu {paypal}'
    },
    th: {
        checkout:  '{pp} {paypal} ชำระเงิน',
        safer_tag: 'วิธีชำระเงินที่ปลอดภัยและง่ายกว่า',
        pay:       'ชำระเงินด้วย {paypal}',
        buynow:    '{pp} {paypal} ซื้อทันที',
        poweredBy: 'ให้บริการโดย {paypal}'
    },
    tr: {
        checkout:  '{pp} {paypal} ile Satın Alın',
        safer_tag: 'Ödeme yapmanın daha güvenli ve kolay yolu',
        pay:       '{paypal} ile Öde',
        buynow:    '{pp} {paypal} Hemen Satın Alın',
        poweredBy: 'Çalıştıran {paypal}'
    }
};
