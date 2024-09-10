import { describe, expect, test, vi } from "vitest";

import { getThreeDomainSecure } from "./component";

describe("getThreeDomainSecure returns ThreeDomainSecureComp", () => {
  const getThreeDomainSecureSpy = vi.fn(getThreeDomainSecure);
  const ThreeDomainSecureComp = vi.fn();

  window.paypal = {
    ThreeDomainSecureComp: {
      ThreeDomainSecureComp,
    },
  };

  test("returns ThreeDomainSecureComp", async () => {
    console.log("inside test", ThreeDomainSecureComp);
    expect(getThreeDomainSecureSpy).toHaveReturnedWith(ThreeDomainSecureComp);
  });
});
