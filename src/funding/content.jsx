/* @flow */
/* eslint max-lines: 0 */
/** @jsx node */
/** @jsxFrag Fragment */

import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';
import { LANG } from '@paypal/sdk-constants/src';

import { Text } from '../ui/text';

export type ContentMap = {
    [ $Values<typeof LANG> ] : {|
        Checkout : ({| logo : ChildType |}) => ChildType,
        Subscribe? : ({| logo : ChildType |}) => ChildType, /** Didn't add a translation for `tr` language **/
        Pay : ({| logo : ChildType |}) => ChildType,
        BuyNow : ({| logo : ChildType |}) => ChildType,
        Installment? : ({| logo : ChildType, period? : ?number |}) => ChildType,
        InstallmentPeriod? : ({| logo : ChildType, period? : ?number |}) => ChildType,
        SaferTag : () => ChildType,
        DualTag? : () => ChildType
    |}
};

export const componentContent : ContentMap = {
    en: {
        Checkout:    ({ logo }) => <Fragment>{ logo }<Text optional> Checkout</Text></Fragment>,
        Subscribe:   ({ logo }) => <Fragment>{ logo }<Text optional> Subscribe</Text></Fragment>,
        SaferTag:    () => <Text optional>The safer, easier way to pay</Text>,
        Pay:         ({ logo }) => <Fragment><Text optional>Pay with </Text>{ logo }</Fragment>,
        Installment: ({ period, logo }) => {
            return (
                <Fragment>
                    { logo }
                    { period
                        ? <Text optional> Pay up to { period.toString() }x<br /> without interest</Text>
                        : <Text optional> Interest free<br /> payments</Text>}
                </Fragment>
            );
        },
        DualTag:            () => <Text optional>Two easy ways to pay</Text>,
        BuyNow:             ({ logo }) => <Fragment>{ logo }<Text optional> Buy Now</Text></Fragment>
    },
    fr: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> Payer</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> S&#39;abonner</Text></Fragment>,
        SaferTag:  () => <Text optional>Votre réflexe sécurité pour payer en ligne</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>Payer avec </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Acheter</Text></Fragment>
    },
    es: {
        Checkout:           ({ logo }) => <Fragment>{ logo }<Text optional> Pagar</Text></Fragment>,
        Subscribe:          ({ logo }) => <Fragment>{ logo }<Text optional> Suscribirse</Text></Fragment>,
        SaferTag:           () => <Text optional>La forma rápida y segura de pagar</Text>,
        Pay:                ({ logo }) => <Fragment><Text optional>Pagar con </Text>{ logo }</Fragment>,
        Installment:        ({ period, logo }) => {
            return (
                <Fragment>
                    { logo }
                    { period
                        ? <Text optional> Pague hasta { period.toString() }x<br /> sin interés</Text>
                        : <Text optional> Pagos en<br /> mensualidades</Text>}
                </Fragment>
            );
        },
        BuyNow:             ({ logo }) => <Fragment>{ logo }<Text optional> Comprar ahora</Text></Fragment>
    },
    zh: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> 結帳</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> 订购</Text></Fragment>,
        SaferTag:  () => <Text optional>更安全、更便捷的付款方式</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>用</Text>{ logo }<Text optional>付款</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> 立即购买</Text></Fragment>
    },
    ar: {
        Checkout:  ({ logo }) => <Fragment><Text optional>السداد بواسطة </Text>{ logo }</Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> اشتراك</Text></Fragment>,
        SaferTag:  () => <Text optional>الطريقة الأسهل والأكثر أماناً في الدفع</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>دفع بواسطة </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> شراء الآن</Text></Fragment>
    },
    de: {
        Checkout:  ({ logo }) => <Fragment><Text optional>Direkt zu </Text>{ logo }</Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Abonnieren</Text></Fragment>,
        SaferTag:  () => <Text optional>Überall schnell und sicher bezahlen</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>Mit </Text>{ logo }<Text optional> zahlen</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Jetzt kaufen</Text></Fragment>
    },
    nl: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> Betalen</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Abonneren</Text></Fragment>,
        SaferTag:  () => <Text optional>De veiligere en snellere manier om te betalen</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>Betalen met </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Nu kopen</Text></Fragment>
    },
    pt: {
        Checkout:           ({ logo }) => <Fragment>{ logo }<Text optional> Checkout</Text></Fragment>,
        Subscribe:          ({ logo }) => <Fragment>{ logo }<Text optional> Assinar</Text></Fragment>,
        SaferTag:           () => <Text optional>A maneira fácil e segura de pagar</Text>,
        Pay:                ({ logo }) => <Fragment><Text optional>Pague com </Text>{ logo }</Fragment>,
        Installment:        ({ period, logo }) => {
            return (
                <Fragment>
                    { logo }
                    { period
                        ? <Text optional> Pague em até<br /> { period.toString() }x sem juros</Text>
                        : <Text optional> Pagamentos<br /> parcelados</Text>}
                </Fragment>
            );
        },
        BuyNow:             ({ logo }) => <Fragment>{ logo }<Text optional> Comprar agora</Text></Fragment>
    },
    cs: {
        Checkout:  ({ logo }) => <Fragment><Text optional>Zaplatit přes </Text>{ logo }</Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Předplatit</Text></Fragment>,
        SaferTag:  () => <Text optional>Jednodušší a bezpečnější způsob placení</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>Zaplatit přes </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment><Text optional>Koupit ihned přes </Text>{ logo }</Fragment>
    },
    da: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> Betal</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Abonner</Text></Fragment>,
        SaferTag:  () => <Text optional>Betal nemt og sikkert</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>Betal med </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Køb nu</Text></Fragment>
    },
    ru: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> Оформить покупку</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Подписаться</Text></Fragment>,
        SaferTag:  () => <Text optional>Более безопасный и простой способ оплаты</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>Оплатить через </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Купить сейчас</Text></Fragment>
    },
    fi: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional>-maksu</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Tilaa</Text></Fragment>,
        SaferTag:  () => <Text optional>Turvallisempi ja helpompi maksutapa</Text>,
        Pay:       ({ logo }) => <Fragment>{ logo }<Text optional>-maksu</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Osta nyt</Text></Fragment>
    },
    el: {
        Checkout:  ({ logo }) => <Fragment><Text optional>Ολοκλήρωση αγοράς μέσω </Text>{ logo }</Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Εγγραφή</Text></Fragment>,
        SaferTag:  () => <Text optional>Ο ασφαλέστερος και ευκολότερος τρόπος πληρωμής</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>Πληρωμή μέσω </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Αγορά τώρα</Text></Fragment>
    },
    hu: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional>-fizetés</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Feliratkozás</Text></Fragment>,
        SaferTag:  () => <Text optional>Biztonságosabb, könnyebb fizetési mód</Text>,
        Pay:       ({ logo }) => <Fragment>{ logo }<Text optional>-fizetés</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Vásárlás</Text></Fragment>
    },
    id: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> Checkout</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Berlangganan</Text></Fragment>,
        SaferTag:  () => <Text optional>Cara yang lebih mudah dan aman untuk membayar</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>Bayar dengan </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Beli Sekarang</Text></Fragment>
    },
    he: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> שלם</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> הצטרפות כמנוי</Text></Fragment>,
        SaferTag:  () => <Text optional>.הדרך הקלה והבטוחה יותר לשלם</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>שלם באמצעות </Text>{ logo }<Text optional>‏</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> קנה עכשיו</Text></Fragment>
    },
    it: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> Paga adesso</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Abbonati</Text></Fragment>,
        SaferTag:  () => <Text optional>Il modo rapido e sicuro per pagare</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>Paga con </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Paga adesso</Text></Fragment>
    },
    ja: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional>で支払う</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> サブスクリプション登録</Text></Fragment>,
        SaferTag:  () => <Text optional>より安全・簡単にお支払い</Text>,
        Pay:       ({ logo }) => <Fragment>{ logo }<Text optional>で支払う</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> 購入</Text></Fragment>
    },
    ko: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> 체크 아웃</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> 정기결제</Text></Fragment>,
        SaferTag:  () => <Text optional>더 안전하고 빠른 결제 방법</Text>,
        Pay:       ({ logo }) => <Fragment>{ logo }<Text optional>로 지불하기</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> 바로 구매</Text></Fragment>
    },
    no: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> Betal</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Abonner</Text></Fragment>,
        SaferTag:  () => <Text optional>En trygg og enkel betalingsmetode</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>Betal med </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Kjøp nå</Text></Fragment>
    },
    pl: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> Do kasy</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Subskrybuj</Text></Fragment>,
        SaferTag:  () => <Text optional>Płać wygodnie i bezpiecznie</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>Zapłać z </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Kup teraz</Text></Fragment>
    },
    sv: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> Betala</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Prenumerera</Text></Fragment>,
        SaferTag:  () => <Text optional>Ett tryggt och smidigt sätt att betala</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>Betala med </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Köp nu</Text></Fragment>
    },
    sk: {
        Checkout:  ({ logo }) => <Fragment><Text optional>Zaplatiť cez </Text>{ logo }</Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Predplatiť</Text></Fragment>,
        SaferTag:  () => <Text optional>Jednoduchší a bezpečnejší spôsob platby</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>Zaplatiť cez </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Kúpiť</Text></Fragment>
    },
    th: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> ชำระเงิน</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> ชำระค่าสมาชิก</Text></Fragment>,
        SaferTag:  () => <Text optional>วิธีชำระเงินที่ปลอดภัยและง่ายกว่า</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>ชำระเงินด้วย </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> ซื้อทันที</Text></Fragment>
    },
    tr: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> ile Satın Alın</Text></Fragment>,
        SaferTag:  () => <Text optional>Ödeme yapmanın daha güvenli ve kolay yolu</Text>,
        Pay:       ({ logo }) => <Fragment>{ logo }<Text optional> ile Öde</Text></Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Hemen Satın Alın</Text></Fragment>
    },
    vi: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> Thanh toán</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Đăng ký</Text></Fragment>,
        SaferTag:  () => <Text optional>Cách thanh toán an toàn hơn, dễ dàng hơn</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>Thanh toán bằng </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Mua ngay</Text></Fragment>
    },
    ro: {
        Checkout:  ({ logo }) => <Fragment>{ logo }<Text optional> Checkout</Text></Fragment>,
        Subscribe: ({ logo }) => <Fragment>{ logo }<Text optional> Abonează-te</Text></Fragment>,
        SaferTag:  () => <Text optional>Modalitatea sigură și ușoară de plată</Text>,
        Pay:       ({ logo }) => <Fragment><Text optional>Plătește cu </Text>{ logo }</Fragment>,
        BuyNow:    ({ logo }) => <Fragment>{ logo }<Text optional> Cumpără acum</Text></Fragment>
    }
};
