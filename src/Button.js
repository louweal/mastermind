import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import './Button.css'


class Button extends Component {

    onClick(state, codeReady) {
        if(state && codeReady) {
            this.props.handleClick();
        }
    }

    render() {
        const {state, codeReady} = this.props; 
        const opacity = codeReady? 1: 0.2;
        const showButton = state? opacity: 0;

        return (
            <div className="check-score" style={{opacity: showButton}} onClick={() => this.onClick(state, codeReady)} >
                Check<br />code
            </div>
        );    
    }
};


export default Button;
