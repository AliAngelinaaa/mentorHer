// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #4B0082; /* Dark Purple */
  padding: 20px;
  color: white;
  text-align: center;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Mentor-Mentee Matching</h1>
      <nav>
        <Link to="/" style={{ color: 'white', margin: '10px' }}>Home</Link>
        <Link to="/login" style={{ color: 'white', margin: '10px' }}>Login</Link>
        <Link to="/dashboard" style={{ color: 'white', margin: '10px' }}>Dashboard</Link>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
