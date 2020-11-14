import React from 'react';
import PropTypes from 'prop-types';
//import './Card.css'

const Color = (props) => {

    let addDashes = "";
    if (props.color === props.selectedColor) {
        addDashes = "selected-slot";
    }

    return (
        <div className={`slot active-slot ${addDashes}`} onClick={() => props.onSelect(props.color)}>
            <div className="peg" style={{backgroundColor: props.color }}></div>
        </div>
    )
}

Color.propTypes = {
    selectedColor: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

export default Color;