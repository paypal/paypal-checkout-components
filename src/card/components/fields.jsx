/* @flow */
/** @jsx h */

import { h, Fragment, Node } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import type { Card } from '../types';

type CardFieldProps = {|
    cspNonce : string,
    onChange : ({| value : Card, valid : boolean |}) => void
|};

export function CardField({ cspNonce, onChange } : CardFieldProps) : typeof Node {
    const [ number, setNumber ] = useState('');
    const [ cvv, setCVV ] = useState('');
    const [ expiry, setExpiry ] = useState('');

    useEffect(() => {
        const valid = Boolean(number && cvv && expiry);
        const value = { number, cvv, expiry };
        onChange({ value, valid });
    }, [ number, cvv, expiry ]);

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                {`
                    input {
                        border: none;
                        background: transparent;
                        height: 100%;
                        font-family: monospace;
                        font-size: 50vh;
                        display: inline-block;
                    }

                    input.number {
                        width: 60vw;
                        margin-right: 2vw;
                    }

                    input.cvv {
                        width: 16vw;
                        margin-right: 2vw;
                    }

                    input.expiry {
                        width: 20vw;
                    }
                `}
            </style>

            <input
                type='text'
                class='number'
                placeholder='XXXX-XXXX-XXXX-XXXX'
                value={ number }
                onChange={ event => setNumber(event.target.value) }
            />

            <input
                type='text'
                class='cvv'
                placeholder='CVV'
                value={ cvv }
                onChange={ event => setCVV(event.target.value) }
            />

            <input
                type='text'
                class='expiry'
                placeholder='MM/YY'
                value={ expiry }
                onChange={ event => setExpiry(event.target.value) }
            />
        </Fragment>
    );
}

type CardNumberFieldProps = {|
    cspNonce : string,
    onChange : ({| value : string, valid : boolean |}) => void
|};

export function CardNumberField({ cspNonce, onChange } : CardNumberFieldProps) : typeof Node {
    const [ number, setNumber ] = useState('');

    useEffect(() => {
        const valid = Boolean(number);
        const value = number;
        onChange({ value, valid });
    }, [ number ]);

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                {`
                    input {
                        border: none;
                        background: transparent;
                        height: 100%;
                        font-family: monospace;
                        font-size: 50vh;
                        width: 100vw;
                        display: inline-block;
                    }
                `}
            </style>

            <input
                type='text'
                class='number'
                placeholder='XXXX-XXXX-XXXX-XXXX'
                value={ number }
                onChange={ event => setNumber(event.target.value) }
            />
        </Fragment>
    );
}

type CardCvvFieldProps = {|
    cspNonce : string,
    onChange : ({| value : string, valid : boolean |}) => void
|};

export function CardCVVField({ cspNonce, onChange } : CardCvvFieldProps) : typeof Node {
    const [ cvv, setCvv ] = useState('');

    useEffect(() => {
        const valid = Boolean(cvv);
        const value = cvv;
        onChange({ value, valid });
    }, [ cvv ]);

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                {`
                    input {
                        border: none;
                        background: transparent;
                        height: 100%;
                        font-family: monospace;
                        font-size: 50vh;
                        width: 100vw;
                        display: inline-block;
                    }
                `}
            </style>

            <input
                type='text'
                class='cvv'
                placeholder='CVV'
                value={ cvv }
                onChange={ event => setCvv(event.target.value) }
            />
        </Fragment>
    );
}

type CardExpiryFieldProps = {|
    cspNonce : string,
    onChange : ({| value : string, valid : boolean |}) => void
|};

export function CardExpiryField({ cspNonce, onChange } : CardExpiryFieldProps) : typeof Node {
    const [ expiry, setExpiry ] = useState('');

    useEffect(() => {
        const valid = Boolean(expiry);
        const value = expiry;
        onChange({ value, valid });
    }, [ expiry ]);

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                {`
                    input {
                        border: none;
                        background: transparent;
                        height: 100%;
                        font-family: monospace;
                        font-size: 50vh;
                        width: 100vw;
                        display: inline-block;
                    }
                `}
            </style>

            <input
                type='text'
                class='expiry'
                placeholder='MM/YY'
                value={ expiry }
                onChange={ event => setExpiry(event.target.value) }
            />
        </Fragment>
    );
}
