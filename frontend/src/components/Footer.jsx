// src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #4B0082; /* Dark Purple */
  padding: 10px;
  color: white;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2024 Mentor-Mentee Matching App</p>
    </FooterContainer>
  );
};

export default Footer;
