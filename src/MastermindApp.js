import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import Navbar from './Navbar';
import Color from './Color';
import Board from './Board';

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

    this.state = {
      slots: this.initializeSlots(),
      keySlots: this.initializeKeySlots(),
      code: this.initializeCode(),
      turn: 0,
      selectedColor: "transparent",
      gameEnded: false          
    };

    console.log(this.state.code);

    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
    this.handleSlotClick = this.handleSlotClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.compareCodes = this.compareCodes.bind(this);
  }

  initializeSlots() {
    return Array(40).fill().map((e, i) => {
      return {
        id: i,
        row: Math.floor(i / 4),
        state: (i < 4), // is current row
        pegColor: 'transparent'
      }
    });   
  }

  initializeKeySlots() {
    return Array(40).fill().map((e, i) => {
      return {
        id: i,
        row: Math.floor(i / 4),
        state: false,
        whiteKey: false,
        blackKey: false
      }
    });
  }

  initializeCode() {
    const code = [];
    while (code.length < 4) {
      let colorIndex = Math.floor(Math.random() * allColors.length);
      if (code.indexOf(colorIndex) === -1) { // color is not yet in code
        code.push(colorIndex);
      }
    }
    return code;    
  }

  handleNewGame() {
    this.setState({
      slots: this.initializeSlots(),
      keySlots: this.initializeKeySlots(),
      code: this.initializeCode(),
      turn: 0,
      selectedColor: "transparent",
      gameEnded: false          
    });
  }

  handleColorSelect(selectedColor) {
    this.setState({selectedColor})
  }

  handleSlotClick(id) {
     // copy the state
     const slots = [...this.state.slots];   
    // find selected slot in state list
    var slot = this.state.slots[id];

    // remove color from slot
    if(slot.pegColor === this.state.selectedColor) {
      slot.pegColor = "transparent";
    }
    else { // add color to slot
      slot.pegColor = this.state.selectedColor;
    }
    
    slots.splice(id, 1);// remove old task from copied state
    slots.splice(id, 0, slot);// insert the updated task at its index position
    this.setState({slots});// update state
  }

  prepareNextTurn(slots) {
    if(!this.state.gameEnded) {
      // make next row active
      for (let i = 0; i < 4; i++) {
        let id = (this.state.turn+1)*4 + i;
        let slot = slots[id];
        slot.state = true;
        slots.splice(id, 1); // remove old task from copied state
        slots.splice(id, 0, slot); // insert the updated task at its index position
      } 
      this.setState({slots, turn: this.state.turn+1});  // update state
    }
    else {
      this.setState({turn: -1});
    }
  }

  handleButtonClick() {
    const slots = [...this.state.slots]; // copy the slot state
    const keySlots = [...this.state.keySlots]; // copy keyslot state

    // get code from current turn
    const currentCode = this.state.slots.filter(s => s.state === true).map(s => allColors.indexOf(s.pegColor));
    // compare code with answer, and place black/white keys
    const gameEnded = this.compareCodes(currentCode, this.state.code);

    // disable current slots and activate current keyslots
    for (let i = 0; i < 4; i++) {
      let id = this.state.turn*4 + i;

      let slot = slots[id];
      slot.state = false;
      slots.splice(id, 1); // remove old task from copied state
      slots.splice(id, 0, slot); // insert the updated task at its index position

      let keySlot = keySlots[id];
      keySlot.state = true;
      keySlots.splice(id, 1); // remove old task from copied state
      keySlots.splice(id, 0, keySlot); // insert the updated task at its index position
    }     

    this.setState({slots, keySlots, gameEnded}, () => this.prepareNextTurn(slots))
  }

  displayKeys(keys) {
    keys = shuffle(keys);
    const keySlots = [...this.state.keySlots];

    for(let i=0; i < keys.length; i++) {
      let id = this.state.turn*4 + i;
      let keySlot = keySlots[id];
      if(keys[i] === 1) {
        keySlot.blackKey = true;
      }
      else {
        keySlot.whiteKey = true;
      }
      keySlots.splice(id, 1); // remove old task from copied state
      keySlots.splice(id, 0, keySlot); // insert the updated task at its index position   
    }

    this.setState({keySlots});
  }

  compareCodes(code, answer) {
    var keys = [];
    var seen = [];
    var numCorrect = 0;

    for(let i=0; i<4; i++) {
      if(!seen.includes(code[i])) {// color is not already seen (duplicate color)
        if(code[i] === answer[i]) { // correct color & place
          keys.push(1);
          numCorrect += 1;
          seen.push(code[i]);
        }
      } 
    }

    for(let i=0; i<4; i++) {
      if(!seen.includes(code[i])) {// color is not already seen (duplicate color)
        if(answer.includes(code[i])) { // only correct color
          keys.push(0);
        }
      } 
      seen.push(code[i]);
    }

    // display keys
    this.displayKeys(keys);

    if(numCorrect === 4) { // game is won
      return true;
    }
    return false;
  }

  render() {
    console.log(this.state.slots.filter(s=>s.state));
    const isSelected = (this.state.selectedColor !== "transparent");

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
          />

        </div>
        <div className="color-picker">
          <div className="colors">
            {colors}
          </div>
          {isSelected ? <p>Place selected color on the board</p> : <p>Select a color above</p>}
        </div>
      </div>
    );
  }
}

export default MemoryGame;