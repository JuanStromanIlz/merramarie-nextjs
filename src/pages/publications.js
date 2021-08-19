import Wrapper from '@/styled-components/common/PageWrapper';
import List from '@/styled-components/List';
import Head from 'next/head';
import axios from 'axios';
import Nav from '@/styled-components/common/Nav';
import { useContext } from 'react';
import { AdminCont } from '@/context/AdminContext';

const Publications = ({labelInfo}) => {
  const {token} = useContext(AdminCont);

  return (
    <div>
      <Head>
        {/* icon */}
        <link rel='shortcut icon' href='/heart.svg'/>
          {/* type */}
          <meta property='og:type' content='website'/>
          {/* title */}
          <title>Publicaciones || Merra Marie</title>
          <meta property='og:title' content='Publicaciones || Merra Marie'/>
          <meta name='twitter:title' content='Publicaciones || Merra Marie'/>
          {/* description */}
          <meta name='description' content='Trabajos destacados.'/>
          <meta property='og:description' content='Trabajos destacados.'/>
          <meta name='twitter:description' content='Trabajos destacados.'/>
          {/* url */}
          <link rel='canonical' href={`${process.env.NEXT_PUBLIC_FRONTEND}/publications`}/>
          <meta property='og:url' content={`${process.env.NEXT_PUBLIC_FRONTEND}/publications`}/>
          <meta name='twitter:url' content={`${process.env.NEXT_PUBLIC_FRONTEND}/publications`}/>
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
        <List label={labelInfo} adminRoutes={token} />
      </Wrapper>
    </div>
  );
}

export async function getStaticProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_APIHOST}/public/publications`);
  const labelInfo = await res.data;

  return {
    props: {
      labelInfo
    },
    revalidate: 60
  }
}

export default Publications;