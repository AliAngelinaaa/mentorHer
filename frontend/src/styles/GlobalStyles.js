// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f7f0ff; /* Light pastel purple background */
    color: #4b3c85; /* Darker purple text */
}

header {
    background-color: #b5a1c6; /* Pastel purple for the header */
    padding: 20px;
    text-align: center;
}

footer {
    background-color: #b5a1c6; /* Pastel purple for the footer */
    padding: 10px;
    text-align: center;
}

.card {
    background-color: #ffffff; /* White for card backgrounds */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 20px;
    padding: 20px;
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-5px); /* Hover effect */
}

h1, h2, h3 {
    color: #4b3c85; /* Consistent text color */
}

`;

export default GlobalStyles;
