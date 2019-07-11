/* @flow */
/* eslint max-lines: 0 */
/** @jsx node */
/** @jsxFrag Fragment */

import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';
import { LANG } from '@paypal/sdk-constants/src';

import { Text } from '../../ui';

export type ContentMap = {
    [ $Values<typeof LANG> ] : {
        Checkout : ({ logo : ChildType }) => ChildType,
        Pay : ({ logo : ChildType }) => ChildType,
        BuyNow : ({ logo : ChildType }) => ChildType,
        Installment? : ({ logo : ChildType, period? : ?number }) => ChildType,
        InstallmentPeriod? : ({ logo : ChildType, period? : ?number }) => ChildType,
        SaferTag : () => ChildType,
        DualTag? : () => ChildType
    }
};

export const componentContent : ContentMap = {
    en: {
        Checkout:           ({ logo }) => <Fragment>{ logo }<Text> Checkout</Text></Fragment>,
        SaferTag:           () => <Text>The safer, easier way to pay</Text>,
        Pay:                ({ logo }) => <Fragment><Text>Pay with </Text>{ logo }</Fragment>,
        Installment:        ({ period, logo }) => {
            return (
                <Fragment>
                    { logo }
                    { period
                        ? <Text> Pay up to { period.toString() }x<br /> without interest</Text>
                        : <Text> Interest free<br /> payments</Text>
                    }
                </Fragment>
            );
        },
        DualTag:            () => <Text>Two easy ways to pay</Text>,
        BuyNow:             ({ logo }) => <Fragment>{ logo }<Text> Buy Now</Text></Fragment>
    },
    fr: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text> Payer</Text></Fragment>,
        SaferTag: () => <Text>Votre réflexe sécurité pour payer en ligne</Text>,
        Pay:       ({ logo }) => <Fragment><Text>Payer avec </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> Acheter</Text></Fragment>
    },
    es: {
        Checkout:           ({ logo }) => <Fragment>{ logo }<Text> Pagar</Text></Fragment>,
        SaferTag:           () => <Text>La forma rápida y segura de pagar</Text>,
        Pay:                ({ logo }) => <Fragment><Text>Pagar con </Text>{ logo }</Fragment>,
        Installment:        ({ period, logo }) => {
            return (
                <Fragment>
                    { logo }
                    { period
                        ? <Text> Pague hasta { period.toString() }x<br /> sin interés</Text>
                        : <Text> Pagos en<br /> mensualidades</Text>
                    }
                </Fragment>
            );
        },
        BuyNow:             ({ logo }) => <Fragment>{ logo }<Text> Comprar ahora</Text></Fragment>
    },
    zh: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text> 結帳</Text></Fragment>,
        SaferTag: () => <Text>更安全、更便捷的付款方式</Text>,
        Pay:       ({ logo }) => <Fragment><Text>用</Text>{ logo }<Text>付款</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> 立即购买</Text></Fragment>
    },
    ar: {
        Checkout:  ({ logo }) => <Fragment><Text>السداد بواسطة </Text>{ logo }</Fragment>,
        SaferTag: () => <Text>الطريقة الأسهل والأكثر أماناً في الدفع</Text>,
        Pay:       ({ logo }) => <Fragment><Text>دفع بواسطة </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> شراء الآن</Text></Fragment>
    },
    de: {
        Checkout:  ({ logo }) => <Fragment><Text>Direkt zu </Text>{ logo }</Fragment>,
        SaferTag: () => <Text>Überall schnell und sicher bezahlen</Text>,
        Pay:       ({ logo }) => <Fragment><Text>Mit </Text>{ logo }<Text> zahlen</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> Jetzt kaufen</Text></Fragment>
    },
    nl: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text> Betalen</Text></Fragment>,
        SaferTag: () => <Text>De veiligere en snellere manier om te betalen</Text>,
        Pay:       ({ logo }) => <Fragment><Text>Betalen met </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> Nu kopen</Text></Fragment>
    },
    pt: {
        Checkout:           ({ logo }) => <Fragment>{ logo }<Text> Checkout</Text></Fragment>,
        SaferTag:           () => <Text>A maneira fácil e segura de pagar</Text>,
        Pay:                ({ logo }) => <Fragment><Text>Pague com </Text>{ logo }</Fragment>,
        Installment:        ({ period, logo }) => {
            return (
                <Fragment>
                    { logo }
                    { period
                        ? <Text> Pague em até<br /> { period.toString() }x sem juros</Text>
                        : <Text> Pagamentos<br /> parcelados</Text>
                    }
                </Fragment>
            );
        },
        BuyNow:             ({ logo }) => <Fragment>{ logo }<Text> Comprar agora</Text></Fragment>
    },
    cs: {
        Checkout:  ({ logo }) => <Fragment><Text>Zaplatit přes </Text>{ logo }</Fragment>,
        SaferTag: () => <Text>Jednodušší a bezpečnější způsob placení</Text>,
        Pay:       ({ logo }) => <Fragment><Text>Zaplatit přes </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment><Text>Koupit ihned přes </Text>{ logo }</Fragment>
    },
    da: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text> Betal</Text></Fragment>,
        SaferTag: () => <Text>Betal nemt og sikkert</Text>,
        Pay:       ({ logo }) => <Fragment><Text>Betal med </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> Køb nu</Text></Fragment>
    },
    ru: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text> Оформить покупку</Text></Fragment>,
        SaferTag: () => <Text>Более безопасный и простой способ оплаты</Text>,
        Pay:       ({ logo }) => <Fragment><Text>Оплатить через </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> Купить сейчас</Text></Fragment>
    },
    fi: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text>-maksu</Text></Fragment>,
        SaferTag: () => <Text>Turvallisempi ja helpompi maksutapa</Text>,
        Pay:       ({ logo }) => <Fragment>{ logo }<Text>-maksu</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> Osta nyt</Text></Fragment>
    },
    el: {
        Checkout:  ({ logo }) => <Fragment><Text>Ολοκλήρωση αγοράς μέσω </Text>{ logo }</Fragment>,
        SaferTag: () => <Text>Ο ασφαλέστερος και ευκολότερος τρόπος πληρωμής</Text>,
        Pay:       ({ logo }) => <Fragment><Text>Πληρωμή μέσω </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> Αγορά τώρα</Text></Fragment>
    },
    hu: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text>-fizetés</Text></Fragment>,
        SaferTag: () => <Text>Biztonságosabb, könnyebb fizetési mód</Text>,
        Pay:       ({ logo }) => <Fragment>{ logo }<Text>-fizetés</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> Vásárlás</Text></Fragment>
    },
    id: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text> Checkout</Text></Fragment>,
        SaferTag: () => <Text>Cara yang lebih mudah dan aman untuk membayar</Text>,
        Pay:       ({ logo }) => <Fragment><Text>Bayar dengan </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> Beli Sekarang</Text></Fragment>
    },
    he: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text> שלם</Text></Fragment>,
        SaferTag: () => <Text>.הדרך הקלה והבטוחה יותר לשלם</Text>,
        Pay:       ({ logo }) => <Fragment><Text>שלם באמצעות </Text>{ logo }<Text>‏</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> קנה עכשיו</Text></Fragment>
    },
    it: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text> Paga adesso</Text></Fragment>,
        SaferTag: () => <Text>Il modo rapido e sicuro per pagare</Text>,
        Pay:       ({ logo }) => <Fragment><Text>Paga con </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> Paga adesso</Text></Fragment>
    },
    ja: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text>で支払う</Text></Fragment>,
        SaferTag: () => <Text>より安全・簡単にお支払い</Text>,
        Pay:       ({ logo }) => <Fragment>{ logo }<Text>で支払う</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> 購入</Text></Fragment>
    },
    ko: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text> 체크 아웃</Text></Fragment>,
        SaferTag: () => <Text>더 안전하고 빠른 결제 방법</Text>,
        Pay:       ({ logo }) => <Fragment>{ logo }<Text>로 지불하기</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> 바로 구매</Text></Fragment>
    },
    no: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text> Betal</Text></Fragment>,
        SaferTag: () => <Text>En trygg og enkel betalingsmetode</Text>,
        Pay:       ({ logo }) => <Fragment><Text>Betal med </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> Kjøp nå</Text></Fragment>
    },
    pl: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text> Do kasy</Text></Fragment>,
        SaferTag: () => <Text>Płać wygodnie i bezpiecznie</Text>,
        Pay:       ({ logo }) => <Fragment><Text>Zapłać z </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> Kup teraz</Text></Fragment>
    },
    sv: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text> Betala</Text></Fragment>,
        SaferTag: () => <Text>Ett tryggt och smidigt sätt att betala</Text>,
        Pay:       ({ logo }) => <Fragment><Text>Betala med </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> Köp nu</Text></Fragment>
    },
    sk: {
        Checkout:  ({ logo }) => <Fragment><Text>Zaplatiť cez </Text>{ logo }</Fragment>,
        SaferTag: () => <Text>Jednoduchší a bezpečnejší spôsob platby</Text>,
        Pay:       ({ logo }) => <Fragment><Text>Zaplatiť cez </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> Kúpiť</Text></Fragment>
    },
    th: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text> ชำระเงิน</Text></Fragment>,
        SaferTag: () => <Text>วิธีชำระเงินที่ปลอดภัยและง่ายกว่า</Text>,
        Pay:       ({ logo }) => <Fragment><Text>ชำระเงินด้วย </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> ซื้อทันที</Text></Fragment>
    },
    tr: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text> ile Satın Alın</Text></Fragment>,
        SaferTag: () => <Text>Ödeme yapmanın daha güvenli ve kolay yolu</Text>,
        Pay:       ({ logo }) => <Fragment>{ logo }<Text> ile Öde</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text> Hemen Satın Alın</Text></Fragment>
    }
};
