import React from 'react';
import './Sidebar.css'; // Import CSS for styling
import { BrowserRouter as Router,  Link } from "react-router-dom";
import { logout } from '../../Action/UserAction';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    // NavigationService.push(logout());
  };

  return (
    <Router>
      <div className="sidebar">
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link to="/admin">Dashboard</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/users">Users</Link>
            <ul className="sub-menu">
              <li className="sub-item">
                <Link to="/users/add">Add User</Link>
              </li>
              <li className="sub-item">
                <Link to="/users/details">User Details</Link>
              </li>
            </ul>
          </li>
          <li className="sidebar-item">
            <button type="submit" onClick={logoutHandler}>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </Router>
  );
};

export default Sidebar;
