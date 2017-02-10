
import React from 'react';

export let Toggle = React.createClass({

    render() {
        return (
            <div className="sandbox-toggle left">
                <span className="left-toggle">sandbox</span>
                <span className="toggle">
                    <span className="switch"></span>
                </span>
                <span className="right-toggle">production</span>
            </div>
        );
    }
});
