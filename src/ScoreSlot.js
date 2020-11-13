import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import './ScoreSlot.css'


class ScoreSlot extends Component {
    

    render() {
        const {state} = this.props;

        const opacity = state? 1 : 0.2;

        return (
            <div className="score-slot" style={{opacity: opacity}}>
            </div>
        );    
    }
};


export default ScoreSlot;
