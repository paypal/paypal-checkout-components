/* @flow */
/** @jsx node */
import { node, type ChildType } from '@krakenjs/jsx-pragmatic/src';

export function ControlDesignComponent(experimentId : string) : ChildType {
    return (
        <div data-design-experiment={ experimentId } />
    );
}
