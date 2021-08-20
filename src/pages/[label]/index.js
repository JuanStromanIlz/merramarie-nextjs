import { useRouter } from 'next/router';
import Head from 'next/head';
import Wrapper from '@/styled-components/common/PageWrapper';
import Nav from '@/styled-components/common/Nav';
import axios from 'axios';
import Label from '@/styled-components/Label';
import { useContext } from 'react';
import { AdminCont } from '@/context/AdminContext';

const LabelView = ({ogType, ogImage, labelName, labelInfo}) => {
  const {token} = useContext(AdminCont);
  const router = useRouter();
  const { label } = router.query;

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
        <title>{`${labelName} || Merra Marie`}</title>
        <meta property='og:title' content={`${labelName} || Merra Marie`}/>
        <meta name='twitter:title' content={`${labelName} || Merra Marie`}/>
        {/* description */}
        <meta name='description' content={labelName === 'Blog' ? 'Mi blog personal.' : 'Trabajos destacados.'}/>
        <meta property='og:description' content={labelName === 'Blog' ? 'Mi blog personal.' : 'Trabajos destacados.'}/>
        <meta name='twitter:description' content={labelName === 'Blog' ? 'Mi blog personal.' : 'Trabajos destacados.'}/>
        {/* url */}
        <link rel='canonical' href={`${process.env.NEXT_PUBLIC_FRONTEND}/${label}`}/>
        <meta property='og:url' content={`${process.env.NEXT_PUBLIC_FRONTEND}/${label}`}/>
        <meta name='twitter:url' content={`${process.env.NEXT_PUBLIC_FRONTEND}/${label}`}/>
        {/* image */}
        <meta name='twitter:image' content={ogImage}/>
        <meta name='twitter:image:secure_url' content={ogImage}/>
        <meta property='og:image' content={ogImage}/>
        <meta property='og:image:secure_url' content={ogImage}/>
        <meta property='og:image:width' content={ogType !== 'website' ? 871 : 200}/>
        <meta property='og:image:height' content={ogType !== 'website' ? 564 : 200}/>
      </Head>
      <Nav />
      <Wrapper>
        <Label name={labelName} label={labelInfo} adminRoutes={token}/>
      </Wrapper>
    </div>
  );
}

export async function getStaticProps({params}) {
  const labelToGet = params.label;
  let ogType = 'website';
  let ogImage = '/heart.png';
  let labelName = 'Comercial';
  const res = await axios.get(`${process.env.NEXT_PUBLIC_APIHOST}/public/${labelToGet}`);
  const labelInfo = await res.data;
  /* find img in label */
  let itemFilter = labelInfo.find(folder => folder.images);
  if (itemFilter !== undefined) {
    ogImage = itemFilter.images[0].url;
    ogType = 'article';
  }
  if (labelToGet !== 'commercial') {
    labelName = labelToGet.charAt(0).toUpperCase() + labelToGet.slice(1);
  }

  return {
    props: {
      labelInfo,
      labelName,
      ogType,
      ogImage
    },
    revalidate: 10
  }
}

export async function getStaticPaths() {
  const labels = [
    'editorial',
    'films',
    'commercial',
    'artwork',
    'blog'
  ];
  // Get the paths we want to pre-render based on labels
  const paths = labels.map((label) => ({
    params: { label: label },
  }));

  return { paths, fallback: false }
}

export default LabelView;