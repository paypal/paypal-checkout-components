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
  bg: {
    Checkout: "Финализиране",
    Subscribe: "Абониране",
    SaferTag: "По-безопасният и по-лесен начин за плащане",
    Pay: "Плащане с",
    BuyNow: "Купете сега",
    Donate: "Дарение",
  },
  cs: {
    Checkout: "Zaplatit přes",
    Subscribe: "Předplatit",
    SaferTag: "Jednodušší a bezpečnější způsob placení",
    Pay: "Zaplatit přes",
    BuyNow: "Koupit ihned přes",
    Donate: "Přispět",
  },
  da: {
    Checkout: "Betal",
    Subscribe: "Abonner",
    SaferTag: "Betal nemt og sikkert",
    Pay: "Betal med",
    BuyNow: "Køb nu",
    Donate: "Doner",
  },
  de: {
    Checkout: "Direkt zu",
    Subscribe: "Abonnieren",
    SaferTag: "Überall schnell und sicher bezahlen",
    Pay: ["Mit", "zahlen"],
    BuyNow: "Jetzt kaufen",
    Donate: "Spenden",
  },
  el: {
    Checkout: "Ολοκλήρωση αγοράς μέσω",
    Subscribe: "Εγγραφή",
    SaferTag: "Ο ασφαλέστερος και ευκολότερος τρόπος πληρωμής",
    Pay: "Πληρωμή μέσω",
    BuyNow: "Αγορά τώρα",
    Donate: "Δωρεά",
  },
  en: {
    Checkout: "Checkout",
    Subscribe: "Subscribe",
    SaferTag: "The safer, easier way to pay",
    Pay: "Pay with",
    Installment: ({ period }) => {
      if (period) {
        return `Pay up to ${period.toString()}x without interest`;
      } else {
        return `Interest free payments`;
      }
    },
    DualTag: "Two easy ways to pay",
    BuyNow: "Buy Now",
    Donate: "Donate",
  },
  es: {
    Checkout: "Pagar",
    Subscribe: "Suscribirse",
    SaferTag: "La forma rápida y segura de pagar",
    Pay: "Pagar con",
    Installment: ({ period }) => {
      if (period) {
        return `Pague hasta ${period.toString()}x sin interés`;
      } else {
        return "Pagos en mensualidades";
      }
    },
    BuyNow: "Comprar ahora",
    Donate: "Donar",
  },
  et: {
    Checkout: "Kassa",
    Subscribe: "Tellige",
    SaferTag: "Ohutum ja lihtsam viis maksmiseks",
    Pay: "Makske",
    BuyNow: "Osta kohe",
    Donate: "Annetage",
  },
  fi: {
    Checkout: "-maksu",
    Subscribe: "Tilaa",
    SaferTag: "Turvallisempi ja helpompi maksutapa",
    Pay: "-maksu",
    BuyNow: "Osta nyt",
    Donate: "Lahjoita",
  },
  fr: {
    Checkout: "Payer",
    Subscribe: "S&#39;abonner",
    SaferTag: "Votre réflexe sécurité pour payer en ligne",
    Pay: "Payer avec",
    BuyNow: "Acheter",
    Donate: "Faire un don",
  },
  he: {
    Checkout: "שלם",
    Subscribe: "הצטרפות כמנוי",
    SaferTag: ".הדרך הקלה והבטוחה יותר לשלם",
    Pay: ["שלם באמצעות", "‏"],
    BuyNow: " קנה עכשיו",
    Donate: " שליחת תרומה",
  },
  hu: {
    Checkout: "-fizetés",
    Subscribe: "Feliratkozás",
    SaferTag: "Biztonságosabb, könnyebb fizetési mód",
    Pay: "-fizetés",
    BuyNow: "Vásárlás",
    Donate: "Adományozás",
  },
  id: {
    Checkout: "Checkout",
    Subscribe: "Berlangganan",
    SaferTag: "Cara yang lebih mudah dan aman untuk membayar",
    Pay: "Bayar dengan",
    BuyNow: "Beli Sekarang",
    Donate: "Donasikan",
  },
  it: {
    Checkout: "Paga adesso",
    Subscribe: "Abbonati",
    SaferTag: "Il modo rapido e sicuro per pagare",
    Pay: "Paga con",
    BuyNow: "Paga adesso",
    Donate: "Donazione",
  },
  ja: {
    Checkout: "で支払う",
    Subscribe: "サブスクリプション登録",
    SaferTag: "より安全・簡単にお支払い",
    Pay: "で支払う",
    BuyNow: "購入",
    Donate: "寄付する",
  },
  ko: {
    Checkout: "체크 아웃",
    Subscribe: "정기결제",
    SaferTag: "더 안전하고 빠른 결제 방법",
    Pay: "로 지불하기",
    BuyNow: "바로 구매",
    Donate: "기부",
  },
  lt: {
    Checkout: "„Checkout“",
    Subscribe: "prenumeruoti",
    SaferTag: "Saugesnis ir paprastesnis mokėjimo būdas",
    Pay: "Mokėti naudojant",
    BuyNow: "pirkti dabar",
    Donate: "Paaukoti",
  },
  lv: {
    Checkout: "Checkout",
    Subscribe: "abonēt",
    SaferTag: "Drošāks, ērtāks norēķinu veids",
    Pay: "Maksāt ar",
    BuyNow: "pirkt tūlīt",
    Donate: "Ziedot",
  },
  ms: {
    Checkout: "Daftar keluar",
    Subscribe: "Langgan",
    SaferTag: "Kaedah bayaran yang lebih selamat dan mudah",
    Pay: "Bayar dengan",
    BuyNow: "Beli Sekarang",
    Donate: "Derma",
  },
  nl: {
    Checkout: "Betalen",
    Subscribe: "Abonneren",
    SaferTag: "De veiligere en snellere manier om te betalen",
    Pay: "Betalen met",
    BuyNow: "Nu kopen",
    Donate: "Doneren",
  },
  no: {
    Checkout: "Betal",
    Subscribe: "Abonner",
    SaferTag: "En trygg og enkel betalingsmetode",
    Pay: "Betal med",
    BuyNow: "Kjøp nå",
    Donate: "Doner",
  },
  pl: {
    Checkout: "Do kasy",
    Subscribe: "Subskrybuj",
    SaferTag: "Płać wygodnie i bezpiecznie",
    Pay: "Zapłać z",
    BuyNow: "Kup teraz",
    Donate: "Przekaż darowiznę",
  },
  pt: {
    Checkout: "Checkout",
    Subscribe: "Assinar",
    SaferTag: "A maneira fácil e segura de pagar",
    Pay: "Pague com",
    Installment: ({ period }) => {
      if (period) {
        return `Pague em até {period.toString()}x sem juros`;
      } else {
        return "Pagamentos parcelados";
      }
    },
    BuyNow: "Comprar agora",
    Donate: "Doar",
  },
  ro: {
    Checkout: "Checkout",
    Subscribe: "Abonează-te",
    SaferTag: "Modalitatea sigură și ușoară de plată",
    Pay: "Plătește cu",
    BuyNow: "Cumpără acum",
    Donate: "Donează",
  },
  ru: {
    Checkout: "Оформить покупку",
    Subscribe: "Подписаться",
    SaferTag: "Более безопасный и простой способ оплаты",
    Pay: "Оплатить через",
    BuyNow: "Купить сейчас",
    Donate: "Сделать пожертвование",
  },
  si: {
    Checkout: "ගෙවා පිටවීම",
    Subscribe: "දායක වන්න",
    SaferTag: "ගෙවීමට වඩා ආරක්ෂිත, පහසු ක්‍රමය",
    Pay: "සමග ගෙවන්න",
    BuyNow: "දැන් මිලදී ගන්න",
    Donate: "පරිත්‍යාග කරන්න",
  },
  sk: {
    Checkout: "Zaplatiť cez",
    Subscribe: "Predplatiť",
    SaferTag: "Jednoduchší a bezpečnejší spôsob platby",
    Pay: "Zaplatiť cez",
    BuyNow: "Kúpiť",
    Donate: "Prispieť",
  },
  sl: {
    Checkout: "Blagajna",
    Subscribe: "Naroči se",
    SaferTag: "Varnejši, lažji način plačil",
    Pay: "Plačaj z",
    BuyNow: "Kupi zdaj",
    Donate: "Donirajte",
  },
  sq: {
    Checkout: "Arka e",
    Subscribe: "Abonohu në",
    SaferTag: "Mënyra më e sigurt dhe më e lehtë për të paguar",
    Pay: "Paguaj me",
    BuyNow: "Bli tani me",
    Donate: "Dhuro",
  },
  sv: {
    Checkout: "Betala",
    Subscribe: "Prenumerera",
    SaferTag: "Ett tryggt och smidigt sätt att betala",
    Pay: "Betala med",
    BuyNow: "Köp nu",
    Donate: "Donera",
  },
  th: {
    Checkout: "ชำระเงิน",
    Subscribe: "ชำระค่าสมาชิก",
    SaferTag: "วิธีชำระเงินที่ปลอดภัยและง่ายกว่า",
    Pay: "ชำระเงินด้วย",
    BuyNow: "ซื้อทันท",
    Donate: "บริจาค",
  },
  tl: {
    Checkout: "Checkout",
    Subscribe: "Mag-subscribe",
    SaferTag: "Ang mas ligtas, mas madaling paraan para magbayad",
    Pay: "Magbayad gamit ang",
    BuyNow: "Bumili Ngayon",
    Donate: "Mag-donate",
  },
  tr: {
    Checkout: "ile Satın Alın",
    SaferTag: "Ödeme yapmanın daha güvenli ve kolay yolu",
    Pay: "ile Öde",
    BuyNow: "Hemen Satın Alın",
  },
  vi: {
    Checkout: "Thanh toán",
    Subscribe: "Đăng ký",
    SaferTag: "Cách thanh toán an toàn hơn, dễ dàng hơn",
    Pay: "Thanh toán bằng",
    BuyNow: "Mua ngay",
    Donate: "Quyên góp",
  },
  zh: {
    Checkout: "結帳",
    Subscribe: "订购",
    SaferTag: "更安全、更便捷的付款方式",
    Pay: ["用", "付款"],
    Donate: "捐赠",
    BuyNow: "立即购买",
  },
  zh_Hant: {
    Checkout: "結帳",
    Subscribe: "訂閱",
    SaferTag: "更安全方便的付款方式",
    Pay: ["使用", "付款"],
    Donate: "捐款",
    BuyNow: "立即購",
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
          {componentLabelText.bg.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.bg.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.bg.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.bg.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.bg.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.bg.Donate}
        </Text>
      </Fragment>
    ),
  },
  cs: {
    Checkout: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.cs.Checkout}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.cs.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.cs.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.cs.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.cs.BuyNow}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.cs.Donate}
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
          {componentLabelText.da.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.da.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.da.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.da.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.da.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.da.Donate}
        </Text>
      </Fragment>
    ),
  },
  de: {
    Checkout: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.de.Checkout}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.de.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.de.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.de.Pay[0]}{" "}
        </Text>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.de.Pay[1]}
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.de.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.de.Donate}
        </Text>
      </Fragment>
    ),
  },
  el: {
    Checkout: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.el.Checkout}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.el.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.el.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.el.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.el.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.el.Donate}
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
          {componentLabelText.en.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.en.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.en.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.en.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Installment: ({ period, logo }) => {
      return (
        <Fragment>
          {logo}
          <Text animate optional>
            {componentLabelText.en.Installment({
              period,
            })}
          </Text>
        </Fragment>
      );
    },
    DualTag: () => (
      <Text animate optional>
        {componentLabelText.en.DualTag}
      </Text>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.en.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.en.Donate}
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
          {componentLabelText.es.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.es.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.es.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.es.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Installment: ({ period, logo }) => {
      return (
        <Fragment>
          {logo}
          <Text animate optional>
            {componentLabelText.es.Installment({
              period,
            })}
          </Text>
        </Fragment>
      );
    },
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.es.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.es.Donate}
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
          {componentLabelText.et.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.et.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.et.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.et.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.et.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.et.Donate}
        </Text>
      </Fragment>
    ),
  },
  fi: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {componentLabelText.fi.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.fi.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.fi.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {componentLabelText.fi.Pay}
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.fi.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.fi.Donate}
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
          {componentLabelText.fr.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.fr.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.fr.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.fr.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.fr.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.fr.Donate}
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
          {componentLabelText.he.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.he.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.he.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.he.Pay[0]}{" "}
        </Text>
        {logo}
        <Text animate optional>
          {componentLabelText.he.Pay[1]}
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.he.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.he.Donate}
        </Text>
      </Fragment>
    ),
  },
  hu: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {componentLabelText.hu.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.hu.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.hu.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {componentLabelText.hu.Pay}
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.hu.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.hu.Donate}
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
          {componentLabelText.id.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.id.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.id.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.id.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.id.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.id.Donate}
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
          {componentLabelText.it.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.it.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.it.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.it.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.it.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.it.Donate}
        </Text>
      </Fragment>
    ),
  },
  ja: {
    Checkout: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {componentLabelText.ja.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.ja.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.ja.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {componentLabelText.ja.Pay}
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.ja.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.ja.Donate}
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
          {componentLabelText.ko.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.ko.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.ko.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {componentLabelText.ko.Pay}
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.ko.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.ko.Donate}
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
          {componentLabelText.lt.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.lt.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.lt.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.lt.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.lt.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.lt.Donate}
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
          {componentLabelText.lv.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.lv.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.lv.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.lv.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.lv.BuyNow}{" "}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.lv.Donate}
        </Text>
      </Fragment>
    ),
  },
  ms: {
    Checkout: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.ms.Checkout}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.ms.Subscribe}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.ms.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.ms.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.ms.BuyNow}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.ms.Donate}{" "}
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
          {componentLabelText.nl.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.nl.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.nl.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.nl.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.nl.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.nl.Donate}
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
          {componentLabelText.no.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.no.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.no.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.no.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.no.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.no.Donate}
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
          {componentLabelText.pl.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.pl.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.pl.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.pl.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.pl.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.pl.Donate}
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
          {componentLabelText.pt.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.pt.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.pt.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.pt.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Installment: ({ period, logo }) => {
      return (
        <Fragment>
          {logo}
          <Text animate optional>
            {componentLabelText.pt.Installment({
              period,
            })}
          </Text>
        </Fragment>
      );
    },
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.pt.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.pt.Donate}
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
          {componentLabelText.ro.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.ro.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.ro.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.ro.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.ro.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.ro.Donate}
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
          {componentLabelText.ru.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.ru.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.ru.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.ru.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.ru.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.ru.Donate}
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
          {componentLabelText.si.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.si.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.si.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.si.Pay}
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.si.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.si.Donate}
        </Text>
      </Fragment>
    ),
  },
  sk: {
    Checkout: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.sk.Checkout}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.sk.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.sk.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.sk.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.sk.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.sk.Donate}
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
          {componentLabelText.sl.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.sl.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.sl.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.sl.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.sl.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.sl.Donate}
        </Text>
      </Fragment>
    ),
  },
  sq: {
    Checkout: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.sq.Checkout}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.sq.Subscribe}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.sq.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.sq.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.sq.BuyNow}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.sq.Donate}{" "}
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
          {componentLabelText.sv.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.sv.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.sv.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.sv.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.sv.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.sv.Donate}
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
          {componentLabelText.th.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.th.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.th.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.th.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.th.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.th.Donate}
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
          {componentLabelText.tl.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.tl.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.tl.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.tl.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.tl.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.tl.Donate}
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
          {componentLabelText.tr.Checkout}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.tr.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.tr.Pay}
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.tr.BuyNow}
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
          {componentLabelText.vi.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.vi.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.vi.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.vi.Pay}{" "}
        </Text>
        {logo}
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.vi.BuyNow}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.vi.Donate}
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
          {componentLabelText.zh.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.zh.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.zh.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.zh.Pay[0]}
        </Text>
        {logo}
        <Text animate optional>
          {componentLabelText.zh.Pay[1]}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.zh.Donate}
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.zh.BuyNow}
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
          {componentLabelText.zh_Hant.Checkout}
        </Text>
      </Fragment>
    ),
    Subscribe: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.zh_Hant.Subscribe}
        </Text>
      </Fragment>
    ),
    SaferTag: () => (
      <Text animate optional>
        {componentLabelText.zh_Hant.SaferTag}
      </Text>
    ),
    Pay: ({ logo }) => (
      <Fragment>
        <Text animate optional>
          {componentLabelText.zh_Hant.Pay[0]}
        </Text>
        {logo}
        <Text animate optional>
          {componentLabelText.zh_Hant.Pay[1]}
        </Text>
      </Fragment>
    ),
    Donate: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.zh_Hant.Donate}
        </Text>
      </Fragment>
    ),
    BuyNow: ({ logo }) => (
      <Fragment>
        {logo}
        <Text animate optional>
          {" "}
          {componentLabelText.zh_Hant.BuyNow}
        </Text>
      </Fragment>
    ),
  },
};
