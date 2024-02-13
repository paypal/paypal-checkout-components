/* @flow */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-globals, promise/no-native */
import { load as loadFingerprintJS } from "@fingerprintjs/fingerprintjs-pro";

const __FINGERPRINT_JS_API_KEY__ = "Eh4QKkI51U0rVUUPeQT8";

type FingerprintResults = {|
  requestId: string,
|};

type Fingerprinter = {|
  get: () => Promise<FingerprintResults>,
|};

export class Fingerprint {
  fingerprinter: ?Fingerprinter;
  results: ?FingerprintResults;

  async load(): Promise<void> {
    if (!this.fingerprinter) {
      this.fingerprinter = await loadFingerprintJS({
        apiKey: __FINGERPRINT_JS_API_KEY__,
      });
    }
  }

  async collect(): Promise<FingerprintResults> {
    if (this.results && this.results.requestId) {
      return this.results;
    }

    if (!this.fingerprinter) {
      await this.load();
    }

    if (!this.fingerprinter) {
      throw new Error("fingerprint library failed to load");
    }

    this.results = await this.fingerprinter.get();

    return this.results;
  }

  get(): Promise<FingerprintResults> {
    return this.collect();
  }
}

// $FlowIssue flow is bad with classes
export const fingerprint = new Fingerprint();
