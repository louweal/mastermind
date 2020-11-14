import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css'


class Button extends Component {

    static propTypes = { 
        state: PropTypes.bool.isRequired,
        codeReady: PropTypes.bool.isRequired,
        handleClick: PropTypes.func.isRequired
    }

    onClick(state, codeReady) {
        if(state && codeReady) {
            this.props.handleClick();
        }
    }

    render() {
        const {state, codeReady} = this.props; 
        const isReady = codeReady? "check-score-ready": ""; 
        const showButton = state? "1": "0";
        
        return (
            <div className={`check-score ${isReady}`} style={{opacity: showButton}} onClick={() => this.onClick(state, codeReady)} >
                Check<br />code
            </div>
        );    
    }
};



export default Button;
