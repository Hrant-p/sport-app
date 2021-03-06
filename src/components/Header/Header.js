import React from 'react';
import './Header.scss';
import logo from '../../img/jackpot.svg';

const Header = () => (
  <header className="general-header">
    <div>
      <img src={logo} alt="" className="src" />
    </div>
    <div>
      <h3>Bet Town</h3>
      <p>The best choice for you!</p>
    </div>
  </header>
);

export default Header;
