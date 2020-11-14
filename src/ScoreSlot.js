import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ScoreSlot.css'


class ScoreSlot extends Component {
    static propTypes = {
        state: PropTypes.bool.isRequired,
        black: PropTypes.bool.isRequired,
        white: PropTypes.bool.isRequired
    }    

    render() {
        const {state, white, black} = this.props;

        const opacity = state? 1 : 0.2;
        const whiteKey = white? "white-key": "";
        const blackKey = black? "black-key": "";

        return (
            <div className={`score-slot ${whiteKey} ${blackKey}`} style={{opacity: opacity}}>
            </div>
        );    
    }
};


export default ScoreSlot;
