/* @flow */
/* eslint max-lines: 0 */
/** @jsx node */
/** @jsxFrag Fragment */

import { node, Fragment, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import { LANG } from "@paypal/sdk-constants/src";

import { Text } from "../ui/text";

export type ContentMap = {
  [$Values<typeof LANG>]: {|
    Checkout: ({| logo: ChildType |}) => ChildType,
    Subscribe?: ({|
      logo: ChildType,
    |}) => ChildType /** Didn't add a translation for `tr` language **/,
    Pay: ({| logo: ChildType |}) => ChildType,
    BuyNow: ({| logo: ChildType |}) => ChildType,
    Installment?: ({| logo: ChildType, period?: ?number |}) => ChildType,
    InstallmentPeriod?: ({| logo: ChildType, period?: ?number |}) => ChildType,
    SaferTag: () => ChildType,
    DualTag?: () => ChildType,
    Donate?: ({|
      logo: ChildType,
    |}) => ChildType /** Not available in `tr` language **/,
  |},
};

const componentLabelText = {
  ar: {
    Checkout: "السداد بواسطة",
    Subscribe: "اشتراك",
    SaferTag: "الطريقة الأسهل والأكثر أماناً في الدفع",
    Pay: "دفع بواسطة",
    BuyNow: "شراء الآن",
    Donate: "تبرع",
  },
};

export const componentContent: ContentMap = {
  ar: {
    Checkout: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.ar.Checkout}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.ar.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.ar.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.ar.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.ar.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.ar.Donate}{" "}
        </Text>
      </Fragment>
    ),
  },
  bg: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Финализиране
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Абониране
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        По-безопасният и по-лесен начин за плащане
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Плащане с{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Купете сега
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Дарение
        </Text>
      </Fragment>
    ),
  },
  cs: {
    Checkout: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Zaplatit přes{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Předplatit
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Jednodušší a bezpečnější způsob placení
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Zaplatit přes{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Koupit ihned přes{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Přispět
        </Text>
      </Fragment>
    ),
  },
  da: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Betal
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Abonner
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Betal nemt og sikkert
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Betal med{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Køb nu
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Doner
        </Text>
      </Fragment>
    ),
  },
  de: {
    Checkout: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Direkt zu{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Abonnieren
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Überall schnell und sicher bezahlen
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Mit{" "}
        </Text>
        {logo}
        <Text animate optional>
          {" "}
          zahlen
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Jetzt kaufen
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Spenden
        </Text>
      </Fragment>
    ),
  },
  el: {
    Checkout: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Ολοκλήρωση αγοράς μέσω{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Εγγραφή
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Ο ασφαλέστερος και ευκολότερος τρόπος πληρωμής
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Πληρωμή μέσω{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Αγορά τώρα
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Δωρεά
        </Text>
      </Fragment>
    ),
  },
  en: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Checkout pls 🙏
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Subscribe
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        The safer, easier way to pay
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Pay with{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Installment: ({ period, logo }) => {
      return (
        <Fragment>
          {logo}
          {period ? (
            <Text animate optional>
              {" "}
              Pay up to {period.toString()}x<br /> without interest
            </Text>
          ) : (
            <Text animate optional>
              {" "}
              Interest free
              <br /> payments
            </Text>
          )}
        </Fragment>
      );
    },
    DualTag: () => (
      <Text animate optional>
        Two easy ways to pay
      </Text>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Buy Now
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Donate
        </Text>
      </Fragment>
    ),
  },
  es: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Pagar
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Suscribirse
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        La forma rápida y segura de pagar
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Pagar con{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Installment: ({ period, logo }) => {
      return (
        <Fragment>
          {logo}
          {period ? (
            <Text animate optional>
              {" "}
              Pague hasta {period.toString()}x<br /> sin interés
            </Text>
          ) : (
            <Text animate optional>
              {" "}
              Pagos en
              <br /> mensualidades
            </Text>
          )}
        </Fragment>
      );
    },
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Comprar ahora
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Donar
        </Text>
      </Fragment>
    ),
  },
  et: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Kassa
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Tellige
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Ohutum ja lihtsam viis maksmiseks
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Makske{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Osta kohe
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Annetage
        </Text>
      </Fragment>
    ),
  },
  fi: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          -maksu
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Tilaa
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Turvallisempi ja helpompi maksutapa
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          -maksu
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Osta nyt
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Lahjoita
        </Text>
      </Fragment>
    ),
  },
  fr: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Payer
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          S&#39;abonner
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Votre réflexe sécurité pour payer en ligne
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Payer avec{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Acheter
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Faire un don
        </Text>
      </Fragment>
    ),
  },
  he: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          שלם
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          הצטרפות כמנוי
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        .הדרך הקלה והבטוחה יותר לשלם
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          שלם באמצעות{" "}
        </Text>
        {logo}
        <Text animate optional>
          ‏
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          קנה עכשיו
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          שליחת תרומה
        </Text>
      </Fragment>
    ),
  },
  hu: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          -fizetés
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Feliratkozás
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Biztonságosabb, könnyebb fizetési mód
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          -fizetés
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Vásárlás
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Adományozás
        </Text>
      </Fragment>
    ),
  },
  id: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Checkout
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Berlangganan
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Cara yang lebih mudah dan aman untuk membayar
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Bayar dengan{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Beli Sekarang
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Donasikan
        </Text>
      </Fragment>
    ),
  },
  it: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Paga adesso
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Abbonati
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Il modo rapido e sicuro per pagare
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Paga con{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Paga adesso
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Donazione
        </Text>
      </Fragment>
    ),
  },
  ja: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          で支払う
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          サブスクリプション登録
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        より安全・簡単にお支払い
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          で支払う
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          購入
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          寄付する
        </Text>
      </Fragment>
    ),
  },
  ko: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          체크 아웃
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          정기결제
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        더 안전하고 빠른 결제 방법
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          로 지불하기
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          바로 구매
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          기부
        </Text>
      </Fragment>
    ),
  },
  lt: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          „Checkout“
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          prenumeruoti
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Saugesnis ir paprastesnis mokėjimo būdas
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Mokėti naudojant{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          pirkti dabar
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Paaukoti
        </Text>
      </Fragment>
    ),
  },
  lv: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Checkout
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          abonēt
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Drošāks, ērtāks norēķinu veids
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Maksāt ar{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          pirkt tūlīt{" "}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Ziedot
        </Text>
      </Fragment>
    ),
  },
  ms: {
    Checkout: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Daftar keluar{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Langgan{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Kaedah bayaran yang lebih selamat dan mudah
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Bayar dengan{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Beli Sekarang{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Derma{" "}
        </Text>
        {logo}
      </Fragment>
    ),
  },
  nl: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Betalen
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Abonneren
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        De veiligere en snellere manier om te betalen
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Betalen met{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Nu kopen
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Doneren
        </Text>
      </Fragment>
    ),
  },
  no: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Betal
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Abonner
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        En trygg og enkel betalingsmetode
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Betal med{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Kjøp nå
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Doner
        </Text>
      </Fragment>
    ),
  },
  pl: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Do kasy
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Subskrybuj
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Płać wygodnie i bezpiecznie
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Zapłać z{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Kup teraz
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Przekaż darowiznę
        </Text>
      </Fragment>
    ),
  },
  pt: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Checkout
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Assinar
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        A maneira fácil e segura de pagar
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Pague com{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Installment: ({ period, logo }) => {
      return (
        <Fragment>
          {logo}
          {period ? (
            <Text animate optional>
              {" "}
              Pague em até
              <br /> {period.toString()}x sem juros
            </Text>
          ) : (
            <Text animate optional>
              {" "}
              Pagamentos
              <br /> parcelados
            </Text>
          )}
        </Fragment>
      );
    },
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Comprar agora
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Doar
        </Text>
      </Fragment>
    ),
  },
  ro: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Checkout
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Abonează-te
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Modalitatea sigură și ușoară de plată
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Plătește cu{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Cumpără acum
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Donează
        </Text>
      </Fragment>
    ),
  },
  ru: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Оформить покупку
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Подписаться
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Более безопасный и простой способ оплаты
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Оплатить через{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Купить сейчас
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Сделать пожертвование
        </Text>
      </Fragment>
    ),
  },
  si: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          ගෙවා පිටවීම
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          දායක වන්න
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        ගෙවීමට වඩා ආරක්ෂිත, පහසු ක්‍රමය
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          සමග ගෙවන්න
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          දැන් මිලදී ගන්න
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          පරිත්‍යාග කරන්න
        </Text>
      </Fragment>
    ),
  },
  sk: {
    Checkout: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Zaplatiť cez{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Predplatiť
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Jednoduchší a bezpečnejší spôsob platby
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Zaplatiť cez{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Kúpiť
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Prispieť
        </Text>
      </Fragment>
    ),
  },
  sl: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Blagajna
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Naroči se
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Varnejši, lažji način plačil
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Plačaj z{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Kupi zdaj
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Donirajte
        </Text>
      </Fragment>
    ),
  },
  sq: {
    Checkout: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Arka e{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Abonohu në{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Mënyra më e sigurt dhe më e lehtë për të paguar
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Paguaj me{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Bli tani me{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Dhuro{" "}
        </Text>
        {logo}
      </Fragment>
    ),
  },
  sv: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Betala
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Prenumerera
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Ett tryggt och smidigt sätt att betala
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Betala med{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Köp nu
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Donera
        </Text>
      </Fragment>
    ),
  },
  th: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          ชำระเงิน
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          ชำระค่าสมาชิก
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        วิธีชำระเงินที่ปลอดภัยและง่ายกว่า
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          ชำระเงินด้วย{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          ซื้อทันที
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          บริจาค
        </Text>
      </Fragment>
    ),
  },
  tl: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Checkout
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Mag-subscribe
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Ang mas ligtas, mas madaling paraan para magbayad
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Magbayad gamit ang{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Bumili Ngayon
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Mag-donate
        </Text>
      </Fragment>
    ),
  },
  tr: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          ile Satın Alın
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Ödeme yapmanın daha güvenli ve kolay yolu
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          ile Öde
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Hemen Satın Alın
        </Text>
      </Fragment>
    ),
  },
  vi: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Thanh toán
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Đăng ký
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        Cách thanh toán an toàn hơn, dễ dàng hơn
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          Thanh toán bằng{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Mua ngay
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          Quyên góp
        </Text>
      </Fragment>
    ),
  },
  zh: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          結帳
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          订购
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        更安全、更便捷的付款方式
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          用
        </Text>
        {logo}
        <Text animate optional>
          付款
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          捐赠
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          立即购买
        </Text>
      </Fragment>
    ),
  },
  zh_Hant: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          結帳
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          訂閱
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        更安全方便的付款方式
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          使用
        </Text>
        {logo}
        <Text animate optional>
          付款
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          捐款
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          立即購
        </Text>
      </Fragment>
    ),
  },
};
