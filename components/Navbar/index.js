import React from 'react'

const Navbar = () => {
  return (
    <>
      <Nav>
        <a>
          <img src='' alt=''></img>
        </a>

        <Bars/>

        <NavMenu>
          <a href='/about'>About</a>

          <a href='/services'>Services</a>
        </NavMenu>

        <NavBtn>
          <a href='/sign-in'>Sign In</a>
        </NavBtn>
      </Nav>
    </>
  );
}

export default Navbar;
