import React from 'react';
import {Nav,Navbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const Header = () => { 
   
    
    return (
       
    <Navbar color='white' variant="dark" >
    <Navbar.Brand href="">Air Bus Ticket</Navbar.Brand>
    <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/destination">Destination</Nav.Link>
          <Nav.Link href="/blog">Blog</Nav.Link>
          <Nav.Link href="/contact">Features</Nav.Link>
          <Button variant="danger" href="/login">Login</Button>{' '}
          
    </Nav>
 
    </Navbar>
    );
};

export default Header;