/* @flow */

import { setupMocks } from './mocks';

import './happy';
import './actions';
import './actions-fallback';
import './contingency';
import './contingency-fallback';
import './funding';
import './wallet';
import './error';
import './eligibility';
import './validation';
import './prerender';
import './vault';
import './clientConfig';
import './popupBridge';
import './card';
import './native';
import './native-qrcode';
import './nativePopup';
import './nativeFallback';
import './payee';
import './connect';
import './smart-fields';
import './popup';
import './applepay';
import './applepay-utils';
import './card-fields';

beforeEach(() => {
    setupMocks();
});
