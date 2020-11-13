import React, {Component} from 'react';
//import PropTypes from 'prop-types';
//import './Slot.css'


class Slot extends Component {
    
    onClick(id, state, handleClick) {
        if(state) {
            handleClick(id);
        }
    }

    render() {
        const {turn, id, row, pegColor, state, handleClick} = this.props;
        const opacity = (row <= turn)? 1 : 0.2;
        const shadow = (pegColor==="transparent")? "none" : "inset -2px -1px 4px 0px rgba(0,0,0,.2)";
        
        return (
            <div className="slot" style={{opacity: opacity}} onClick={() => this.onClick(id, state, handleClick)}>
                <div className="peg" style={{backgroundColor: pegColor, boxShadow: shadow}} ></div>
            </div>
        );    
    }
};


export default Slot;
