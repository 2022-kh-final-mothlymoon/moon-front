import React from 'react';
import { Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <>
      <Navbar
        className="navbar navbar-expand-sm justify-content-center"
        fixed="bottom"
        bg="dark"
        style={{ color: "white" }}
      >
        Monthly-Moon &copy; 2022
      </Navbar>
    </>
  );
};

export default Footer;