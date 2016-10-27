
import Symbol from 'es6-symbol';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

if (!window.Symbol) {
    window.Symbol = Symbol;
}

if (!window.Promise) {
    window.Promise = Promise;
}
