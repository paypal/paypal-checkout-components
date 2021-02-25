/* @flow */

import { type Experiment } from 'belter/src';

import { createExperiment, isIOSSafari, isAndroidChrome } from './lib';

let platform;

if (isIOSSafari()) {
    platform = 'ios_safari';
} else if (isAndroidChrome()) {
    platform = 'android_chrome';
} else {
    platform = 'unsupported_platform';
}

export const nativeFakeoutExperiment : Experiment = createExperiment(`native_popup_fakeout_v2_${ platform }`, { sample: isIOSSafari() ? 100 : 10, sticky: false });
export const androidPopupExperiment : Experiment = createExperiment(`native_android_popup`, { sample: 10, sticky: false });
