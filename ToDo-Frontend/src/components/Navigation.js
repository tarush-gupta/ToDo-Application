// For example, in your Navigation component
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <header className='top-header'>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/todoManager">View/Add Tasks</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;