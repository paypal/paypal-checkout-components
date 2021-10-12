/* @flow */
/** @jsx h */

import { h, render, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { getBody } from '../../lib';
import { setupExports } from '../lib';
import { CARD_FIELD_TYPE_TO_FRAME_NAME, CARD_FIELD_TYPE } from '../constants';
import { submitCardFields } from '../interface';
import { getCardProps, type CardProps } from '../props';
import type { SetupCardOptions } from '../types';

import { CardField, CardNumberField, CardCVVField, CardExpiryField } from './fields';

type PageProps = {|
    cspNonce : string,
    props : CardProps
|};

function Page({ cspNonce, props } : PageProps) : mixed {
    const { facilitatorAccessToken, style, placeholder, type, onChange, export: xport } = props;

    const [ fieldValue, setFieldValue ] = useState();
    const [ fieldValid, setFieldValid ] = useState(false);
    const [ fieldErrors, setFieldErrors ] = useState([]);

    const getFieldValue = () => {
        return fieldValue;
    };

    const isFieldValid = () => {
        return fieldValid;
    };

    useEffect(() => {
        onChange({
            valid:    fieldValid,
            errors: fieldErrors
        });
    }, [ fieldValid, fieldErrors ]);

    useEffect(() => {
        setupExports({
            name: CARD_FIELD_TYPE_TO_FRAME_NAME[type],
            isFieldValid,
            getFieldValue
        });

        xport({
            submit: () => {
                return submitCardFields({ facilitatorAccessToken });
            }
        });
    }, [ fieldValid, fieldValue ]);

    const onFieldChange = ({ value, valid, errors }) => {
        setFieldValue({ ...value });
        setFieldErrors([ ...errors ]);
        setFieldValid(valid);
    };

    return (
        <Fragment>
            <style nonce={ cspNonce }>
                {`
                    * {
                        box-sizing: border-box;
                    }

                    html, body {
                        margin: 0;
                        padding: 0;
                        height: 100%;
                    }

                    body {
                        display: inline-block;
                        width: 100%;
                        font-size: 100%;
                        font-family: monospace;
                    }

                    *:focus {
                        outline: none;
                    }
                `}
            </style>

            {
                (type === CARD_FIELD_TYPE.SINGLE)
                    ? <CardField
                        cspNonce={ cspNonce }
                        onChange={ onFieldChange }
                        styleObject={ style }
                        placeholder={ placeholder }
                    /> : null
            }

            {
                (type === CARD_FIELD_TYPE.NUMBER)
                    ? <CardNumberField
                        cspNonce={ cspNonce }
                        onChange={ onFieldChange }
                        styleObject={ style }
                        placeholder={ placeholder }
                    /> : null
            }

            {
                (type === CARD_FIELD_TYPE.CVV)
                    ? <CardCVVField
                        cspNonce={ cspNonce }
                        onChange={ onFieldChange }
                        styleObject={ style }
                        placeholder={ placeholder }
                    /> : null
            }

            {
                (type === CARD_FIELD_TYPE.EXPIRY)
                    ? <CardExpiryField
                        cspNonce={ cspNonce }
                        onChange={ onFieldChange }
                        styleObject={ style }
                        placeholder={ placeholder }
                    /> : null
            }
        </Fragment>
    );
}

export function setupCard({ cspNonce, facilitatorAccessToken } : SetupCardOptions) {
    const props = getCardProps({
        facilitatorAccessToken
    });

    render(<Page cspNonce={ cspNonce } props={ props } />, getBody());
}
 
