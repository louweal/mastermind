import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Slot extends Component {
    static propTypes = {
        state: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired,
        row: PropTypes.number.isRequired,
        pegColor: PropTypes.string.isRequired,
        handleClick: PropTypes.func.isRequired
    } 

    onClick(id, state, handleClick) {
        if(state) {
            handleClick(id);
        }
    }

    render() {
        const {turn, id, row, pegColor, state, handleClick} = this.props;
        const opacity = (row <= turn)? 1 : 0.3;
        const activeSlot = (row === turn)? "active-slot": "";
        const shadow = (pegColor==="transparent")? "none" : "inset -2px -1px 4px 0px rgba(0,0,0,.2)";
        
        return (
            <div className={`slot ${activeSlot}`} style={{opacity: opacity}} onClick={() => this.onClick(id, state, handleClick)}>
                <div className="peg" style={{backgroundColor: pegColor, boxShadow: shadow}} ></div>
            </div>
        );    
    }
};


export default Slot;
