/* @flow */
/* eslint max-lines: 0 */
/** @jsx node */
/** @jsxFrag Fragment */

import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';
import { LANG } from '@paypal/sdk-constants/src';
import { PPLogo, PayPalLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { Text, Space } from '../../ui';

export type ContentMap = {
    [ $Values<typeof LANG> ] : {
        Checkout : ({ logoColor : $Values<typeof LOGO_COLOR> }) => ChildType,
        Pay : ({ logoColor : $Values<typeof LOGO_COLOR> }) => ChildType,
        BuyNow : ({ logoColor : $Values<typeof LOGO_COLOR> }) => ChildType,
        Installment? : ({ logoColor : $Values<typeof LOGO_COLOR>, period? : ?number }) => ChildType,
        InstallmentPeriod? : ({ logoColor : $Values<typeof LOGO_COLOR>, period? : ?number }) => ChildType,
        SaferTag : () => ChildType,
        DualTag? : () => ChildType
    }
};

const PPPayPalLogo = ({ logoColor }) => <Fragment><PPLogo logoColor={ logoColor } /><Space /><PayPalLogo logoColor={ logoColor } /></Fragment>;

export const componentContent : ContentMap = {
    en: {
        Checkout:           ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Checkout</Text></Fragment>,
        SaferTag:           () => <Text>The safer, easier way to pay</Text>,
        Pay:                ({ logoColor }) => <Fragment><Text>Pay with </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        Installment:        ({ period, logoColor }) => {
            return period
                ? <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Pay up to { period.toString() }x<br /> without interest</Text></Fragment>
                : <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Interest free<br /> payments</Text></Fragment>;
        },
        DualTag:            () => <Text>Two easy ways to pay</Text>,
        BuyNow:             ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Buy Now</Text></Fragment>
    },
    fr: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Payer</Text></Fragment>,
        SaferTag: () => <Text>Votre réflexe sécurité pour payer en ligne</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>Payer avec </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Acheter</Text></Fragment>
    },
    es: {
        Checkout:           ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Pagar</Text></Fragment>,
        SaferTag:           () => <Text>La forma rápida y segura de pagar</Text>,
        Pay:                ({ logoColor }) => <Fragment><Text>Pagar con </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        Installment:        ({ period, logoColor }) => {
            return period
                ? <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Pague hasta { period.toString() }x<br /> sin interés</Text></Fragment>
                : <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Pagos en<br /> mensualidades</Text></Fragment>;
        },
        BuyNow:             ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Comprar ahora</Text></Fragment>
    },
    zh: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> 結帳</Text></Fragment>,
        SaferTag: () => <Text>更安全、更便捷的付款方式</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>用</Text><PayPalLogo logoColor={ logoColor } /><Text>付款</Text></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> 立即购买</Text></Fragment>
    },
    ar: {
        Checkout:  ({ logoColor }) => <Fragment><Text>السداد بواسطة </Text><PPPayPalLogo logoColor={ logoColor } /></Fragment>,
        SaferTag: () => <Text>الطريقة الأسهل والأكثر أماناً في الدفع</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>دفع بواسطة </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> شراء الآن</Text></Fragment>
    },
    de: {
        Checkout:  ({ logoColor }) => <Fragment><Text>Direkt zu </Text><PPPayPalLogo logoColor={ logoColor } /></Fragment>,
        SaferTag: () => <Text>Überall schnell und sicher bezahlen</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>Mit </Text><PayPalLogo logoColor={ logoColor } /><Text> zahlen</Text></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Jetzt kaufen</Text></Fragment>
    },
    nl: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Betalen</Text></Fragment>,
        SaferTag: () => <Text>De veiligere en snellere manier om te betalen</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>Betalen met </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Nu kopen</Text></Fragment>
    },
    pt: {
        Checkout:           ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Checkout</Text></Fragment>,
        SaferTag:           () => <Text>A maneira fácil e segura de pagar</Text>,
        Pay:                ({ logoColor }) => <Fragment><Text>Pague com </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        Installment:        ({ period, logoColor }) => {
            return period
                ? <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Pague em até<br /> { period.toString() }x sem juros</Text></Fragment>
                : <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Pagamentos<br /> parcelados</Text></Fragment>;
        },
        BuyNow:             ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Comprar agora</Text></Fragment>
    },
    cs: {
        Checkout:  ({ logoColor }) => <Fragment><Text>Zaplatit přes </Text><PPPayPalLogo logoColor={ logoColor } /></Fragment>,
        SaferTag: () => <Text>Jednodušší a bezpečnější způsob placení</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>Zaplatit přes </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><Text>Koupit ihned přes </Text><PPPayPalLogo logoColor={ logoColor } /></Fragment>
    },
    da: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Betal</Text></Fragment>,
        SaferTag: () => <Text>Betal nemt og sikkert</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>Betal med </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Køb nu</Text></Fragment>
    },
    ru: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Оформить покупку</Text></Fragment>,
        SaferTag: () => <Text>Более безопасный и простой способ оплаты</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>Оплатить через </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Купить сейчас</Text></Fragment>
    },
    fi: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text>-maksu</Text></Fragment>,
        SaferTag: () => <Text>Turvallisempi ja helpompi maksutapa</Text>,
        Pay:       ({ logoColor }) => <Fragment><PayPalLogo logoColor={ logoColor } /><Text>-maksu</Text></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Osta nyt</Text></Fragment>
    },
    el: {
        Checkout:  ({ logoColor }) => <Fragment><Text>Ολοκλήρωση αγοράς μέσω </Text><PPPayPalLogo logoColor={ logoColor } /></Fragment>,
        SaferTag: () => <Text>Ο ασφαλέστερος και ευκολότερος τρόπος πληρωμής</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>Πληρωμή μέσω </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Αγορά τώρα</Text></Fragment>
    },
    hu: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text>-fizetés</Text></Fragment>,
        SaferTag: () => <Text>Biztonságosabb, könnyebb fizetési mód</Text>,
        Pay:       ({ logoColor }) => <Fragment><PayPalLogo logoColor={ logoColor } /><Text>-fizetés</Text></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Vásárlás</Text></Fragment>
    },
    id: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Checkout</Text></Fragment>,
        SaferTag: () => <Text>Cara yang lebih mudah dan aman untuk membayar</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>Bayar dengan </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Beli Sekarang</Text></Fragment>
    },
    he: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> שלם</Text></Fragment>,
        SaferTag: () => <Text>.הדרך הקלה והבטוחה יותר לשלם</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>שלם באמצעות </Text><PayPalLogo logoColor={ logoColor } /><Text>‏</Text></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> קנה עכשיו</Text></Fragment>
    },
    it: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Paga adesso</Text></Fragment>,
        SaferTag: () => <Text>Il modo rapido e sicuro per pagare</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>Paga con </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Paga adesso</Text></Fragment>
    },
    ja: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text>で支払う</Text></Fragment>,
        SaferTag: () => <Text>より安全・簡単にお支払い</Text>,
        Pay:       ({ logoColor }) => <Fragment><PayPalLogo logoColor={ logoColor } /><Text>で支払う</Text></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> 購入</Text></Fragment>
    },
    ko: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> 체크 아웃</Text></Fragment>,
        SaferTag: () => <Text>더 안전하고 빠른 결제 방법</Text>,
        Pay:       ({ logoColor }) => <Fragment><PayPalLogo logoColor={ logoColor } /><Text>로 지불하기</Text></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> 바로 구매</Text></Fragment>
    },
    no: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Betal</Text></Fragment>,
        SaferTag: () => <Text>En trygg og enkel betalingsmetode</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>Betal med </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Kjøp nå</Text></Fragment>
    },
    pl: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Do kasy</Text></Fragment>,
        SaferTag: () => <Text>Płać wygodnie i bezpiecznie</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>Zapłać z </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Kup teraz</Text></Fragment>
    },
    sv: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Betala</Text></Fragment>,
        SaferTag: () => <Text>Ett tryggt och smidigt sätt att betala</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>Betala med </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Köp nu</Text></Fragment>
    },
    sk: {
        Checkout:  ({ logoColor }) => <Fragment><Text>Zaplatiť cez </Text><PPPayPalLogo logoColor={ logoColor } /></Fragment>,
        SaferTag: () => <Text>Jednoduchší a bezpečnejší spôsob platby</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>Zaplatiť cez </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Kúpiť</Text></Fragment>
    },
    th: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> ชำระเงิน</Text></Fragment>,
        SaferTag: () => <Text>วิธีชำระเงินที่ปลอดภัยและง่ายกว่า</Text>,
        Pay:       ({ logoColor }) => <Fragment><Text>ชำระเงินด้วย </Text><PayPalLogo logoColor={ logoColor } /></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> ซื้อทันที</Text></Fragment>
    },
    tr: {
        Checkout:  ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> ile Satın Alın</Text></Fragment>,
        SaferTag: () => <Text>Ödeme yapmanın daha güvenli ve kolay yolu</Text>,
        Pay:       ({ logoColor }) => <Fragment><PayPalLogo logoColor={ logoColor } /><Text> ile Öde</Text></Fragment>,
        BuyNow:    ({ logoColor }) => <Fragment><PPPayPalLogo logoColor={ logoColor } /><Text> Hemen Satın Alın</Text></Fragment>
    }
};
