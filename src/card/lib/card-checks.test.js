/* @flow */

import { DEFAULT_CARD_TYPE } from "../constants";

import { detectCardType, addGapsToCardNumber, checkCardEligibility } from "./card-checks";

describe("card-checks", () => {

  describe("detectCardType", () => {

    it("returns the default card type if the number length is 0", () => {
      const number = "";

      const cardType = detectCardType(number);

      expect(cardType).toBe(DEFAULT_CARD_TYPE);
    });

    it("returns the default card type if the number length is greater than 0 but the card validator module does not return any potential card type", () => {
      // the card-validator module will return an empty array for this card number
      const number = "123";

      const cardType = detectCardType(number);

      expect(cardType).toBe(DEFAULT_CARD_TYPE);
    });

    it("returns a card type when the card validator module is able to detect a card type", () => {
      const number = "411";

      const cardType = detectCardType(number);

      expect(cardType).toStrictEqual({
        niceType: "Visa",
        type: "visa",
        patterns: [4],
        matchStrength: 1,
        gaps: [4, 8, 12],
        lengths: [16, 18, 19],
        code: {
          name: "CVV",
          size: 3,
        },
      });
    });

  });

  describe("addGapsToCardNumber", () => {

    it("should add gaps (spaces) to the card number", () => {
      const cardNumber = '4111111111111111';
      const newCardNumber = addGapsToCardNumber(cardNumber);
      expect(newCardNumber).toBe("4111 1111 1111 1111");
    });

    it("should handle card numbers with spaces and letters", () => {
      const cardNumber = ' 4111a11 11b11 11c1111 ';
      const newCardNumber = addGapsToCardNumber(cardNumber);
      expect(newCardNumber).toBe("4111 1111 1111 1111");
    });

  });

  describe("checkCardEligibility", () => {

    beforeEach(() => {
      window.xprops = {};
    });

    it("should find the card eligible", () => {
      window.xprops.fundingEligibility = {
        card: {
          eligible: true,
          vendors: {
            visa: {
              eligible: true
            }
          }
        }
      };
      const cardNumber = "4111111111111111";
      const cardType = detectCardType(cardNumber);
      expect(checkCardEligibility(cardNumber, cardType)).toBe(true);
    });

    it("should find the card not eligible", () => {
      window.xprops.fundingEligibility = {
        card: {
          eligible: true,
          vendors: {
            visa: {
              eligible: false
            }
          }
        }
      };
      const cardNumber = "4111111111111111";
      const cardType = detectCardType(cardNumber);
      expect(checkCardEligibility(cardNumber, cardType)).toBe(false);
    });

    it("should find card payments not eligible", () => {
      window.xprops.fundingEligibility = {
        card: {
          eligible: false
        }
      };
      const cardNumber = "4111111111111111";
      const cardType = detectCardType(cardNumber);
      expect(checkCardEligibility(cardNumber, cardType)).toBe(false);
    });

    it("should default to eligible if there is no funding eligibility specified", () => {
      const cardNumber = "4111111111111111";
      const cardType = detectCardType(cardNumber);
      expect(checkCardEligibility(cardNumber, cardType)).toBe(true);
    });

  });

});
