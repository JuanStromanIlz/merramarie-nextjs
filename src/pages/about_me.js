import Nav from '@/styled-components/common/Nav';
import Wrapper from '@/styled-components/common/PageWrapper';
import StickyTitle from '@/styled-components/common/StickyTitle';
import About from '@/styled-components/About';
import Head from 'next/head';

const AboutMe = () => {

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
        <title>Sobre mi || Merra Marie</title>
        <meta property='og:title' content='Sobre mi || Merra Marie'/>
        <meta name='twitter:title' content='Sobre mi || Merra Marie'/>
        {/* description */}
        <meta name='description' content='Desde Argentina con amor.'/>
        <meta property='og:description' content='Desde Argentina con amor.'/>
        <meta name='twitter:description' content='Desde Argentina con amor.'/>
        {/* url */}
        <link rel='canonical' href={`${process.env.NEXT_PUBLIC_FRONTEND}/about_me`}/>
        <meta property='og:url' content={`${process.env.NEXT_PUBLIC_FRONTEND}/about_me`}/>
        <meta name='twitter:url' content={`${process.env.NEXT_PUBLIC_FRONTEND}/about_me`}/>
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
        <About>
          <StickyTitle>Sobre mi</StickyTitle>
          <div id='infoWrapper'>
            <p className='text'>
              Hola! Soy Merra Marie, artista visual, audiovisual y poeta.<br />
              <br/>
              Actualmente estoy radicada en Buenos Aires, Argentina donde me desempeño en áreas de fotografía de moda, dirección de arte, edición y montaje. He realizado numerosos fashion films, cortos, videos musicales y video ensayos. En este momento estoy terminando la Licenciatura en Artes Audiovisuales orientada en Dirección de Fotografía.<br/>
              <br />
              En mi día a día llevo un diario de fotos por lo que también trabajo con amigos, amor, lugares, pequeñas fantasías!<br/>
              Dibujo y pinto también! En múltiples soportes y variadas técnicas.<br />
              <br/>
              Por último: escribo un montón. Poesía, cuentos y reflexiones de mi vida.
            </p>
          </div>
        </About>
      </Wrapper>
    </div>
  );
};

export default AboutMe;