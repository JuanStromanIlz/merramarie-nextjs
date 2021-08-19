import Head from 'next/head';
import Nav from '@/styled-components/common/Nav';
import Wrapper from '@/styled-components/common/PageWrapper';
import StickyTitle from '@/styled-components/common/StickyTitle';
import NewDoc from '@/utility/NewDoc';

const New = () => {
  return (
    <div>
      <Head>
        {/* icon */}
        <link rel='shortcut icon' href='/heart.svg'/>
        {/* type */}
        <meta property='og:type' content='website'/>
        {/* title */}
        <title>Nuevo documento</title>
        <meta property='og:title' content='Nuevo documento'/>
        <meta name='twitter:title' content='Nuevo documento'/>
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
        <StickyTitle>Nueva entrada</StickyTitle>
        <NewDoc />
      </Wrapper>
    </div>
  );
}

export default New;