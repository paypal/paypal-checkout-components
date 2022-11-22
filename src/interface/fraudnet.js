/* @flow */
import type { LazyExport } from '../types';
import { getFraudnetComponent, type FraudnetComponent } from '../zoid/fraudnet'

export const Fraudnet : LazyExport<FraudnetComponent> = {
    __get__: () => getFraudnetComponent() // protectedExport necessary?
};
