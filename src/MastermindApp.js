import React, { Component } from 'react';
//import shuffle from 'shuffle-array';
import Navbar from './Navbar';
import Color from './Color';
import Board from './Board';


// const SlotState = {
//   DISABLED: 0,
//   ACTIVE: 1
// }

// const KeySlotState = {
//   NONE: 0,
//   WHITE: 1,
//   BLACK: 2
// }

const GameColors = {
  TEAL: "#40AF95",
  LIME: "#B8E77C",
  PINK: "#E77CAF",
  BLUE: "#7CB3E7",
  GOLD: "#F5D424",
  GREY: "#7A7A7A",
  PURPLE: "#BF99D1",
  ORANGE: "#FFA95A"
}

const allColors = [GameColors.LIME, GameColors.BLUE, GameColors.PURPLE, GameColors.ORANGE, GameColors.PINK, GameColors.GREY, GameColors.GOLD, GameColors.TEAL];

class MemoryGame extends Component {
  constructor(props) {
    super(props);

    let slots = Array(40).fill().map((e, i) => {
      return {
        id: i,
        row: Math.floor(i / 4),
        state: (i < 4), // is current row
        pegColor: 'transparent',
        selected: false
      }
    });

    let keySlots = Array(40).fill().map((e, i) => {
      return {
        id: i,
        row: Math.floor(i / 4),
        state: false,
        keyColor: "transparent"
      }
    });

    const code = [];
    while (code.length < 4) {
      let colorIndex = Math.floor(Math.random() * allColors.length);
      if (code.indexOf(colorIndex) === -1) { // color is not yet in code
        code.push(colorIndex);
      }
    }

    this.state = {
      code,
      slots,
      keySlots,
      turn: 0,
      selectedColor: "transparent",
    };

    //this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
    this.handleSlotClick = this.handleSlotClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.updateSlot = this.updateSlot.bind(this);
    this.updateKeySlot = this.updateKeySlot.bind(this);
    //this.getCurrentCode = this.getCurrentCode.bind(this);
    this.compareCodes = this.compareCodes.bind(this);
  }

  handleNewGame() {

  }

  handleColorSelect(selectedColor) {
    this.setState({ selectedColor })
  }

  // helper function for updating a task
  updateSlot(slot, slotIndex) {
    // copy the state
    const slots = [...this.state.slots];
    // remove old task from copied state
    slots.splice(slotIndex, 1);
    // insert the updated task at its index position
    slots.splice(slotIndex, 0, slot);
    // update state
    this.setState({ slots });
  }

  // helper function for updating a task
  updateKeySlot(slot, slotIndex) {
    // copy the state
    const keySlots = [...this.state.keySlots];
    // remove old task from copied state
    keySlots.splice(slotIndex, 1);
    // insert the updated task at its index position
    keySlots.splice(slotIndex, 0, slot);
    // update state
    this.setState({ keySlots });
  }

  handleSlotClick(id) {
    // find selected slot in state list
    var slot = this.state.slots[id];

    // avoids changing previous rows ... 
    console.log(this.state.turn);
    if(slot.row === this.state.turn) { 
      // toggle selection state
      if(slot.pegColor === this.state.selectedColor) {
        slot.pegColor = "transparent";
      }
      else {
        slot.pegColor = this.state.selectedColor;
      }
      this.updateSlot(slot, id);
    }
  }

  handleButtonClick() {

    // make the keyslots state true 
    for (let i = 0; i < 4; i++) {
      let id = this.state.turn*4 + i;
      var keySlot = this.state.keySlots[id];
      keySlot.state = true;
      this.updateKeySlot(keySlot, id)
    }

    // check code
    const activeSlots = this.state.slots.filter(s => s.state === true);
    const currentCode = activeSlots.map(s => allColors.indexOf(s.pegColor));
    console.log(currentCode);
    console.log(this.state.code);
    const result = this.compareCodes(currentCode, this.state.code);
    console.log(result)

    // make next row of slots active (if game not won!)
    // copy the slot state
    const slots = [...this.state.slots];

    for (let i = 0; i < 8; i++) {
      let id = (this.state.turn)*4 + i;
      var slot = this.state.slots[id];
      slot.state = !slot.state;
      // remove old task from copied state
      slots.splice(id, 1);
      // insert the updated task at its index position
      slots.splice(id, 0, slot);
    } 

    // update state
    this.setState({ slots });


    // update turn counter
    this.setState({turn: this.state.turn+1});

   
  }

  compareCodes(code, answer) {
    const keys = [];

    for(var i=0; i<4; i++) {

      if(code[i] === answer[i]) {
        keys.push("b")
      }
      else if(answer.includes(code[i])) {
        keys.push("w")
      }
      else {
        keys.push("-")
      }
    }
    return keys;
  }

  render() {
    const isSelected = (this.state.selectedColor !== "");

    const colors = allColors.map((c, index) => (
      <Color
        key={index}
        color={c}
        selectedColor={this.state.selectedColor}
        onSelect={this.handleColorSelect}
      />
    ));

    return (
      <div className="app">
        <div className="wrapper">

          <Navbar
            onNewGame={this.handleNewGame}
          />

          <Board
            turn={this.state.turn}
            slots={this.state.slots}
            scoreSlots={this.state.keySlots}
            handleSlotClick={this.handleSlotClick}
            handleButtonClick={this.handleButtonClick}
            getCurrentCode={this.getCurrentCode}
          />

        </div>
        <div className="color-picker">
          <div className="colors">
            {colors}
          </div>
          {isSelected ? <p>Place color on the board</p> : <p>Select a color</p>}
          <p>{this.state.code}</p>
        </div>

      </div>
    );
  }
}

export default MemoryGame;