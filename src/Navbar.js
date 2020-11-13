import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = ({onNewGame}) => (
  <header>
  <div className="logo"></div>
  <h1>MASTERMIND</h1>
  <nav>
      <ul>
          <li className="button">New Game</li>
      </ul>
  </nav>
</header>
);

Navbar.propTypes = {
  onNewGame: PropTypes.func.isRequired
};

export default Navbar;
