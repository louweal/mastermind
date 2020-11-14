import React from 'react';
import PropTypes from 'prop-types';

const Color = (props) => {

    const addDashes = (props.color === props.selectedColor) ? "selected-slot" : "";

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