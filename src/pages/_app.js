import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useState } from 'react';
import Router from 'next/router';
import Loading from '@/styled-components/common/Loading';
import AdminContext from '@/context/AdminContext';

const GlobalStyle = createGlobalStyle`
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    box-sizing: border-box;
    height: 100%;
    font-size: 62.5%;
  }
  ::selection {
    color: ${props => props.theme.colors.red};
    background-color: transparent;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    font-size: 1.6rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: black;
    color: ${props => props.theme.colors.pink};
  }
  *,
  :after,
  :before {
    box-sizing: inherit;
  }
  h1, h2, h3, h4, h5, h6, p, a {
    margin: 0;
    padding: 0;
    font-weight: inherit;
    font-style: inherit;
  }
  span {
    display: block;
  }
  hr {
    border: 0px;
    margin: 0px;
    padding-top: 1rem;
    :before {
      content: '';
      display: block;
      border-top: 2px solid ${props => props.theme.colors.pink};
    }
  }
  a {
    color: ${props => props.theme.colors.green};
    text-decoration: none;
    word-break: break-all;
  }
  button, input, textarea, select {
    font: inherit;
  }
  p {
    font-size: 1.3rem;
    line-height: 2.1rem;
    font-weight: 200;
  }
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';
  }
  .noClick {
      z-index: -1;
    }
  .link {
    display: contents;
  }
`;

const theme = {
  colors: {
    pink: '#f2d5d5',
    red: '#bd2929',
    green: '#aee19f'
  }
};

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  Router.onRouteChangeStart = () => {
    setLoading(true);
  }
  Router.onRouteChangeComplete = () => {
    setLoading(false);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <AdminContext>
        <GlobalStyle />
        {loading ? 
        <Loading />: 
        <Component {...pageProps} />}
      </AdminContext>
    </ThemeProvider>
  )
}

export default MyApp;
