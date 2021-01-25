import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import logo from './logo.png'
import './sidebar.css'

const Sidebar = () => (
  <div className="Sidebar">
    <div className="Sidebar-top">
      <div className="Sidebar-header">
        <div className="Sidebar-icon-wrapper">
          <img src={logo} alt="logo" className="Sidebar-icon" />
        </div>
        <h2 className="Sidebar-title">Admin</h2>
      </div>

      <nav className="Sidebar-nav">
        <li className="Sidebar-nav-section">
          <Link className="Sidebar-link" to="/admin"><FontAwesomeIcon icon={faHome} /> Home</Link>
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
