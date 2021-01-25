import { Link } from 'react-router-dom';

import logo from './logo.png'
import './sidebar.css'

const Sidebar = () => (
  <div className="Sidebar">
    <div className="Sidebar-top">
      <div className="Sidebar-header">
        <div className="Sidebar-icon-wrapper">
          <img src={logo} alt="logo" className="Sidebar-icon" />
        </div>
        <h1 className="Sidebar-title">Administrator</h1>
      </div>

      <nav className="Sidebar-nav">
        <li className="Sidebar-nav-section">
          <Link className="Sidebar-link" to="/admin">Home</Link>
        </li>
      </nav>
    </div>
    <div className="Sidebar-bottom">
      <Link className="Sidebar-button" to="/">Back</Link>
      <Link className="Sidebar-button" to="/auth/logout">Logout</Link>
    </div>
  </div>
);

export default Sidebar;
