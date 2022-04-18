import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((state) => state.auth.userData.name);

  return (
    <nav className='navbar navbar-expand navbar-dark bg-dark'>
      <div className='container-fluid'>
        <NavLink to='/' className='navbar-brand'>
          CrossTech
        </NavLink>
        <div className='collapse navbar-collapse' id='navbarText'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink to='/all-users' className='nav-link'>
                All Users
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <FaUserCircle
            className='text-secondary m-2'
            style={{ width: '25px', height: '25px' }}
          />
          {<span className='navbar-text'>{user}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
