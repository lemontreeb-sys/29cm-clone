import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent; /* 모바일 터치 시 파란 박스 제거 */
  }

  body, html {
    background-color: #000;
    overflow-x: hidden;
    color: #000;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
    line-height: 1.2;
    -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  }

  a { text-decoration: none; color: inherit; }
  button { cursor: pointer; border: none; background: none; }
  ul, li { list-style: none; }
`;

export default GlobalStyle;
