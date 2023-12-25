import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  font-family{
    @import url('https://fonts.cdnfonts.com/css/ghibli');
  } 
`;

export default GlobalStyle;