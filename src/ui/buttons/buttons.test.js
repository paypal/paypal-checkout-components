import { describe, expect } from "vitest";
import { Buttons } from "./buttons";

describe("Smart Payment Buttons - limit button to PayPal for FSS", () => {
  test("should return only 1 PayPal button if isFsSubscription=true", async () => {
    const mockedButtonProps = {
      // isFsSubscription is the determinant of how many buttons get shown
      isFsSubscription: true,
      flow: "subscription_setup",
      fundingEligibility,
    };

    const jsxElems = Buttons(mockedButtonProps);

    const allButtonsTotalCount = jsxElems?.children.filter(
      (elem) => elem?.component?.name === "Button"
    ).length;

    const hasPayPalButton =
      jsxElems?.children.filter(
        (elem) => elem?.props?.fundingSource === "paypal"
      ).length === 1;

    expect(allButtonsTotalCount).toBe(1);
    expect(hasPayPalButton).toBe(true);
  });

  test("should return 1 or more buttons if not isFsSubscription", async () => {
    const mockedButtonProps = {
      // isFsSubscription is the determinant of how many buttons get shown
      isFsSubscription: false,
      flow: "subscription_setup",
      fundingEligibility,
    };

    const jsxElems = Buttons(mockedButtonProps);

    const allButtonsTotalCount = jsxElems?.children.filter(
      (elem) => elem?.component?.name === "Button"
    ).length;

    const hasPayPalButton =
      jsxElems?.children.filter(
        (elem) => elem?.props?.fundingSource === "paypal"
      ).length === 1;

    expect(allButtonsTotalCount).toBeGreaterThanOrEqual(1);
    expect(hasPayPalButton).toBe(true);
  });
});

/* NOTE: We want to give a "complete" fundingEligibility object since this is what determines how many buttons there will be to start with, before we try to limit the buttons */
const fundingEligibility = {
  paypal: {
    eligible: true,
    vaultable: true,
  },
  paylater: {
    eligible: true,
    vaultable: true,
    products: {
      payIn3: {
        eligible: false,
        variant: null,
      },
      payIn4: {
        eligible: false,
        variant: null,
      },
      paylater: {
        eligible: true,
        variant: null,
      },
    },
  },
  card: {
    eligible: true,
    branded: false,
    installments: false,
    vendors: {
      visa: {
        eligible: true,
        vaultable: true,
      },
      mastercard: {
        eligible: true,
        vaultable: true,
      },
      amex: {
        eligible: true,
        vaultable: true,
      },
      discover: {
        eligible: true,
        vaultable: true,
      },
      hiper: {
        eligible: false,
        vaultable: false,
      },
      elo: {
        eligible: false,
        vaultable: true,
      },
      jcb: {
        eligible: false,
        vaultable: true,
      },
      maestro: {
        eligible: true,
        vaultable: true,
      },
      diners: {
        eligible: true,
        vaultable: true,
      },
      cup: {
        eligible: true,
        vaultable: true,
      },
    },
    guestEnabled: false,
  },
  venmo: {
    eligible: false,
    vaultable: false,
  },
  itau: {
    eligible: false,
  },
  credit: {
    eligible: false,
  },
  applepay: {
    eligible: true,
  },
  sepa: {
    eligible: false,
  },
  ideal: {
    eligible: false,
  },
  bancontact: {
    eligible: false,
  },
  giropay: {
    eligible: false,
  },
  eps: {
    eligible: false,
  },
  sofort: {
    eligible: false,
  },
  mybank: {
    eligible: false,
  },
  p24: {
    eligible: false,
  },
  wechatpay: {
    eligible: false,
  },
  payu: {
    eligible: false,
  },
  blik: {
    eligible: false,
  },
  trustly: {
    eligible: false,
  },
  oxxo: {
    eligible: false,
  },
  boleto: {
    eligible: false,
  },
  boletobancario: {
    eligible: false,
  },
  mercadopago: {
    eligible: false,
  },
  multibanco: {
    eligible: false,
  },
  satispay: {
    eligible: false,
  },
  paidy: {
    eligible: false,
  },
};
