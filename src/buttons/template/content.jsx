/* @flow */
/** @jsx node */
/** @jsxFrag Fragment */

import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';
import { LANG } from '@paypal/sdk-constants/src';
import { PayPalLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { Text } from '../../ui';

type ButtonContentMap = {
    [ $Values<typeof LANG> ] : {
        PayInstantly : () => ChildType,
        PoweredBy : ({ logoColor : $Values<typeof LOGO_COLOR> }) => ChildType
    }
};

export const buttonContent : ButtonContentMap = {
    en: {
        PayInstantly: () => <Text>Pay Instantly With</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Powered by </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    fr: {
        PayInstantly: () => <Text>Payez instantanément avec</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Optimisé par </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    es: {
        PayInstantly: () => <Text>Pagar en segundos con</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Desarrollado por </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    zh: {
        PayInstantly: () => <Text>使用以下付款方式即时付款</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>技术支持提供方： </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    ar: {
        PayInstantly: () => <Text>ادفع بشكل فوري باستخدام</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>مدعوم من </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    de: {
        PayInstantly: () => <Text>Sofort bezahlen mit</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Abgewickelt durch </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    nl: {
        PayInstantly: () => <Text>Direct betalen met</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Mogelijk gemaakt door </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    pt: {
        PayInstantly: () => <Text>Pague imediatamente com</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Powered by </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    cs: {
        PayInstantly: () => <Text>Výběr způsobu okamžité platby</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Využívá službu </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    da: {
        PayInstantly: () => <Text>Betal med det samme med</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Leveret af </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    ru: {
        PayInstantly: () => <Text>Мгновенно оплачивайте счета с помощью</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Обработано </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    fi: {
        PayInstantly: () => <Text>Maksa välittömästi</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Palvelun tarjoaa </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    el: {
        PayInstantly: () => <Text>Άμεση πληρωμή μέσω</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Με την υποστήριξη του </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    hu: {
        PayInstantly: () => <Text>Azonnali fizetés a következővel</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Üzemeltető: </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    id: {
        PayInstantly: () => <Text>Bayar secara instan dengan</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Ditunjang teknologi </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    he: {
        PayInstantly: () => <Text>שליחת תשלום באופן מיידי באמצעות</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><PayPalLogo logoColor={ logoColor } /> מופעל על-ידי</Fragment>
    },
    it: {
        PayInstantly: () => <Text>Paga subito con</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Con tecnologia </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    ja: {
        PayInstantly: () => <Text>よりスピーディな支払方法</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Powered by </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    ko: {
        PayInstantly: () => <Text>다음으로 즉시 결제</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>제공: </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    no: {
        PayInstantly: () => <Text>Betal umiddelbart med</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Leveres av </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    pl: {
        PayInstantly: () => <Text>Zapłać błyskawicznie za pomocą</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Powered by </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    sv: {
        PayInstantly: () => <Text>Betala direkt med</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Tillhandahålls av </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    sk: {
        PayInstantly: () => <Text>Zaplaťte okamžite</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Používa technológiu </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    th: {
        PayInstantly: () => <Text>ชำระเงินได้ทันทีด้วย</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>ให้บริการโดย </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    },
    tr: {
        PayInstantly: () => <Text>Pay Instantly With</Text>,
        PoweredBy:    ({ logoColor }) => <Fragment><Text>Çalıştıran </Text><PayPalLogo logoColor={ logoColor } /></Fragment>
    }
};
