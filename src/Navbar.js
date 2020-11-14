import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';
//  <div className="logo"></div>

const Navbar = ({onNewGame}) => (
  <header>
  <h1>MASTER MIND</h1>
  <nav>
      <ul>
          <li className="button" onClick={onNewGame}>New Game</li>
      </ul>
  </nav>
</header>
);

Navbar.propTypes = {
  onNewGame: PropTypes.func.isRequired
};

export default Navbar;
