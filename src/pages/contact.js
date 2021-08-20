import StickyTitle from '@/styled-components/common/StickyTitle';
import Nav from '@/styled-components/common/Nav';
import Wrapper from '@/styled-components/common/PageWrapper';
import styled from 'styled-components';
import Head from 'next/head';

const ContactContainer = styled.ul`
  list-style-type:none;
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  li {
    a:hover {
      text-decoration: underline;
    }
  }
`;

const Contact = () => {

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
        {/* keywords */}
        <meta name='keywords' content='Merra Marie, Fotografia, Video, Artista Argentina, Freelance'/>
        {/* icon */}
        <link rel='shortcut icon' href='/heart.svg'/>
        {/* type */}
        <meta property='og:type' content='website'/>
        {/* title */}
        <title>Contacto || Merra Marie</title>
        <meta property='og:title' content='Contacto || Merra Marie'/>
        <meta name='twitter:title' content='Contacto || Merra Marie'/>
        {/* description */}
        <meta name='description' content='Desde Argentina con amor.'/>
        <meta property='og:description' content='Desde Argentina con amor.'/>
        <meta name='twitter:description' content='Desde Argentina con amor.'/>
        {/* url */}
        <link rel='canonical' href={`${process.env.NEXT_PUBLIC_FRONTEND}/contact`}/>
        <meta property='og:url' content={`${process.env.NEXT_PUBLIC_FRONTEND}/contact`}/>
        <meta name='twitter:url' content={`${process.env.NEXT_PUBLIC_FRONTEND}/contact`}/>
        {/* image */}
        <meta name='twitter:image' content='/heart.png'/>
        <meta name='twitter:image:secure_url' content='/heart.png'/>
        <meta property='og:image' content='/heart.png'/>
        <meta property='og:image:secure_url' content='/heart.png'/>
        <meta property='og:image:width' content={200}/>
        <meta property='og:image:height' content={200}/>
      </Head>
      <Nav />
      <Wrapper>
        <StickyTitle>Contacto</StickyTitle>
        <ContactContainer>
          <li>
            <span>Mail: <a href='mailto:muchutmaria@gmail.com' target='_blank' rel='noreferrer'>muchutmaria@gmail.com</a></span>  
          </li>
          <li>
            <span>Instagram: <a href='https://www.instagram.com/zvldlz/' target='_blank' rel='noreferrer'>@zvldlz</a></span>
          </li>
          <li>
            <span>Tumblr: <a href='https://peroquepena.tumblr.com/' target='_blank' rel='noreferrer'>peroquepena.tumblr.com</a></span>
          </li>
        </ContactContainer>
      </Wrapper>
    </div>
  );
};

export default Contact;