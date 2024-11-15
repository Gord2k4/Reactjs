import { Link } from 'react-router-dom';
import '../style/sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column flex-shrink-0 p-3">
      <div className="logo">
        <svg className="bi me-2" width="40" height="32"></svg>
        <span>Sidebar</span>
      </div>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link active" aria-current="page">
            <svg className="bi me-2" width="16" height="16"></svg>
            Home
          </Link>
        </li>
        <li>
          <Link to="/admin/product/list" className="nav-link text-white">
            <svg className="bi me-2" width="16" height="16"></svg>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="#" className="nav-link text-white">
            <svg className="bi me-2" width="16" height="16"></svg>
            Orders
          </Link>
        </li>
        <li>
          <Link to="/admin/products/list" className="nav-link text-white">
            <svg className="bi me-2" width="16" height="16"></svg>
            Products
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown
        </button>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li>
            <Link className="dropdown-item" to="#">
              New project...
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Settings
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
