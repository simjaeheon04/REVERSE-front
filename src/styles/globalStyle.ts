import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Rubik+80s+Fade&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    overflow-x: hidden;
    background-color: #2C2F39;
    line-height: 1;
  }
`;

export default GlobalStyle;
