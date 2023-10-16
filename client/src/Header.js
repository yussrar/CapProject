import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">Banana Binge</div>
      <nav className="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/Login">Login/Signup</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;