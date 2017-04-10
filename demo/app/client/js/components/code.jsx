
import React from 'react';
import { findDOMNode } from 'react-dom';

export let Code = React.createClass({

    render() {
        return (
            <div id="code" className={ [ 'code', this.props.pattern ].join(' ') } dangerouslySetInnerHTML={ { __html: this.props.code } }></div>
        );
    },

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.code !== nextProps.code;
    },

    runScripts() {
        Array.prototype.slice.call(findDOMNode(this).querySelectorAll('script')).forEach(script => {
            try {
                eval(script.innerHTML);
            } catch (err) {

                if (this.props.onError) {
                    this.props.onError(err);
                }

                setTimeout(() => {
                    throw err;
                });
            }
        });
    },

    componentDidMount() {
        this.runScripts();
    },

    componentDidUpdate() {
        this.runScripts();
    }
});
