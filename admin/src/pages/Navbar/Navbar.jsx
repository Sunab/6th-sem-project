import React from 'react';
import './Navbar.css'; // Import CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/path/to/your/icon.png" alt="Logo" />
        <span className="logo-text">Your App Name</span>
      </div>
      <div className="navbar-logout">
        <img src="/path/to/logout-icon.png" alt="Logout" />
        <span className="logout-text">Logout</span>
      </div>
    </nav>
  );
};

export default Navbar;
