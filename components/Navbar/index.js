import React from 'react';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div>
      <nav className='navbar'>
        <div className='brand-title'>
          <img src='/favicon.png' />
          TFT Info
        </div>

        <label htmlFor='btnControl'>
          <div className='toggle-button'>
            <span>MENU</span>

            <FaBars
              size={ 35 }
            />

            <input type="checkbox" id="btnControl"/>

            <div className='dropdown-content'>
              <ul>
                <li>
                  <a href='/'>HOME</a>
                </li>

                <li>
                  <a href='/api_info'>API INFO</a>
                </li>

                <li>
                  <a href='/about'>ABOUT</a>
                </li>
              </ul>
            </div>
          </div>
        </label>

        <div className='navbar-links'>
          <ul>
            <li>
              <a href='/'>HOME</a>
            </li>

            <li>
              <a href='/api_info'>API INFO</a>
            </li>

            <li>
              <a href='/about'>ABOUT</a>
            </li>
          </ul>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #333333;
          color: white;
        }

        .brand-title {
          display: flex;
          font-size: 1.5rem;
          margin: 10px;
          margin-left: 15px;
          align-items: center;
        }

        .brand-title img {
          margin-right: 20px;
          width: 35px;
          height: 35px;
        }

        .navbar-links ul {
          display: flex;
          margin: 0;
          padding: 0;
        }

        .navbar-links li, .dropdown-content li {
          list-style: none;
        }

        .navbar-links li a {
          display: block;
          text-decoration: none;
          color: white;
          padding: 1rem;
        }

        .navbar-links li:hover {
          background-color: #555;
        }

        .toggle-button {
          position: absolute;
          top: 15px;
          right: 20px;
          display: none;
          flex-direction: row;
          align-items: center;
        }

        .toggle-button span {
          margin-right: 10px;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #333;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          padding: 12px 16px;
          top: 50px;
          right: -15px;
          z-index: 1;
        }

        .dropdown-content ul li + li {
          border-top: 1px solid white;
        }

        .dropdown-content li a {
          display: block;
          text-decoration: none;
          color: white;
          padding: 1rem;
        }

        #btnControl {
          display: none;
        }

        #btnControl:checked + .dropdown-content {
          display: block;
        }

        @media ( max-width: 600px ) {
          .toggle-button {
            display: flex;
          }

          .navbar-links {
            display: none;
            width: 100%;
          }

          .navbar {
            flex-direction: column;
            align-items: flex-start;
          }

          .navbar-links ul {
            width: 100%;
            flex-direction: column;
          }

          .navbar-links li {
            text-align: center;
          }

          .navbar-links li a {
            padding: .5rem 1rem;
          }

          .navbar-links.active {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}

export default Navbar;
