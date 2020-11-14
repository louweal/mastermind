import React from 'react';
import PropTypes from 'prop-types';
import './Board.css'
import Slot from './Slot';
import ScoreSlot from './ScoreSlot';
import Button from './Button';

const Board = (props) => {
    const numbers = Array(10).fill().map((n, i) => <li key={9 - i}>{10-i}. </li>);

    const slots = props.slots.map((slot, id) => {
        return (
            <Slot
                key={id}
                turn={props.turn}
                id={id}
                row={slot.row}
                pegColor={slot.pegColor}
                state={slot.state}
                selected={slot.selected}
                handleClick={props.handleSlotClick}
            />
        )
    });

    const scoreSlots = props.scoreSlots.map((slot, id) => {
        return (
            <ScoreSlot
                key={id}
                state={slot.state}
                black={slot.blackKey}
                white={slot.whiteKey}
            />
        )
    });

    const codeReady = !props.slots.filter(s => s.state).map(s => s.pegColor).includes("transparent");

    const buttons = Array(10).fill().map((b, i) => (
        <Button
            key={i}
            state={i === props.turn}
            codeReady={codeReady}
            handleClick={props.handleButtonClick}
        />));

    return (
        <div className="board">
            <div className="rownum-area">
                <ul>
                    {numbers}
                </ul>
            </div>
            <div className="code-area">
                {slots}
            </div>

            <div className="score-area">
                {scoreSlots}
            </div>
            <div className="button-area">
                {buttons}
            </div>
        </div>
    );
};

Board.propTypes = {
    turn: PropTypes.number.isRequired,
    slots: PropTypes.arrayOf(PropTypes.object).isRequired,
    scoreSlots: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSlotClick: PropTypes.func.isRequired,
    handleButtonClick: PropTypes.func.isRequired,
};

export default Board;
