import Head from 'next/head';
import Banner from '@/styled-components/Banner';
import axios from 'axios';

const Home = ({imageShow, ogType, ogImage}) => {
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
        <meta property='og:type' content={ogType}/>
        {/* title */}
        <title>Merra Marie</title>
        <meta property='og:title' content='Merra Marie'/>
        <meta name='twitter:title' content='Merra Marie'/>
        {/* description */}
        <meta name='description' content='Desde Argentina con amor.'/>
        <meta property='og:description' content='Desde Argentina con amor.'/>
        <meta name='twitter:description' content='Desde Argentina con amor.'/>
        {/* url */}
        <link rel='canonical' href='https://merramarie-next.vercel.app'/>
        <meta property='og:url' content='https://merramarie-next.vercel.app'/>
        <meta name='twitter:url' content='https://merramarie-next.vercel.app'/>
        {/* image */}
        <meta name='twitter:image' content={ogImage}/>
        <meta name='twitter:image:secure_url' content={ogImage}/>
        <meta property='og:image' content={ogImage}/>
        <meta property='og:image:secure_url' content={ogImage}/>
        <meta property='og:image:width' content={ogType !== 'website' ? 871 : 200}/>
        <meta property='og:image:height' content={ogType !== 'website' ? 564 : 200}/>
      </Head>
      <Banner img={imageShow} />
    </div>
  );
}

export async function getStaticProps() {
  const promises = [];
  const urls = [];
  let ogType = 'website';
  let ogImage = '/heart.png';
  let imageShow = null;
  const res = await axios.get(`${process.env.NEXT_PUBLIC_APIHOST}/public/all`);
  const labels = await res.data;
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    const promise = axios.get(`${process.env.NEXT_PUBLIC_APIHOST}/public/${label}`);
    promises.push(promise);
  }
  const promisesList = await Promise.all(promises);
  promisesList.filter(labels => {
    labels.data.map(item => {
      if ('images' in item) {
        let images = Array.from(item.images);
        images.map(image => urls.push(image.url));
      }
    });
  });
  if (urls.length > 0) {
    imageShow = urls[Math.floor(Math.random() * (urls.length + 1))];
    ogType = 'article';
    ogImage = imageShow;
  }

  return {
    props: {
      imageShow,
      ogType,
      ogImage
    },
    revalidate: 60
  }
}

export default Home;