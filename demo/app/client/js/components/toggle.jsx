
import React from 'react';

export let Toggle = React.createClass({

    getInitialState() {
        return {
            toggle: 'left'
        };
    },


    didRecieveProps() {
        this.setState({ toggle: this.props.default || 'left' });
    },

    onToggle(event) {

        let toggle = {
            left: 'right',
            right: 'left'
        }[this.state.toggle];

        this.setState({ toggle });

        if (this.props.onChange) {
            this.props.onChange(this.props[toggle]);
        }
    },

    render() {
        return (
            <div className={ [ 'toggle-component', this.state.toggle ].join(' ') }>
                <span className="left-toggle">{ this.props.left }</span>
                <span className="toggle" onClick={ event => this.onToggle(event) }>
                    <span className="switch"></span>
                </span>
                <span className="right-toggle">{ this.props.right }</span>
            </div>
        );
    }
});
