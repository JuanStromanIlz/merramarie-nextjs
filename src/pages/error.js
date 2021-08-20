import Link from '@/styled-components/common/Link';
import Wrapper from '@/styled-components/common/PageWrapper';
import List from '@/styled-components/List';
import Head from 'next/head';
import styled from 'styled-components';

const Error = styled.div`
  padding: 2.6rem;
  width: 100%;
  height: 100%;
  span {
    margin-bottom: 1.6rem;
  }
  span:hover {
    text-decoration: underline;
  }
`;

const ErrorView = () => {

  return (
    <div>
      <Head>
        {/* fonts */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet" />
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,700;1,200&display=swap" 
          rel="stylesheet" />
        {/* viewport */}
        <meta charset='utf-8'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <meta name='theme-color' content='#bd2929'/>
      </Head>
      <Wrapper>
        <Error>
          <span>Ocurrio un error</span>
          <Link href='/' className='link'>Volver al home</Link>
        </Error>
      </Wrapper>
    </div>
  );

};

export default ErrorView;