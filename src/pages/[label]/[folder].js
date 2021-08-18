import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import Wrapper from '@/common/PageWrapper';
import Footer from '@/styled-components/common/Footer';
import Folder from '@/styled-components/Folder';
import Nav from '@/styled-components/common/Nav';

const FolderView = ({ogType, ogImage, folderInfo}) => {
  const router = useRouter();
  const { label, folder } = router.query;

  return (
    <div>
      <Head>
        {/* icon */}
        <link rel='shortcut icon' href='/heart.svg'/>
        {/* type */}
        <meta property='og:type' content={ogType}/>
        {/* title */}
        <title>{folderInfo.title}</title>
        <meta property='og:title' content={folderInfo.title}/>
        <meta name='twitter:title' content={folderInfo.title}/>
        {/* description */}
        <meta name='description' content={folderInfo.description ? folderInfo.description : 'Ver online.'}/>
        <meta property='og:description' content={folderInfo.description ? folderInfo.description : 'Ver online.'}/>
        <meta name='twitter:description' content={folderInfo.description ? folderInfo.description : 'Ver online.'}/>
        {/* url */}
        <link rel='canonical' href={`${process.env.REACT_APP_FRONTEND}${label}/${folder}`}/>
        <meta property='og:url' content={`${process.env.REACT_APP_FRONTEND}${label}/${folder}`}/>
        <meta name='twitter:url' content={`${process.env.REACT_APP_FRONTEND}${label}/${folder}`}/>
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
        <Folder folder={folderInfo} />
      </Wrapper>
      <Footer label={folderInfo.label} nextFolder={folderInfo.nextFolder} />
    </div>
  );
}

export async function getStaticProps({params}) {
  let ogType = 'website';
  let ogImage = '/heart.png';
  const res = await axios.get(`${process.env.REACT_APP_APIHOST}public/${params.label}/${params.folder}`);
  const folderInfo = await res.data;
  /* find img in folder */
  if ('images' in folderInfo) {
    ogImage = folderInfo.images[0].url;
    ogType = 'article';
  }

  return {
    props: {
      folderInfo,
      ogType,
      ogImage
    },
    revalidate: 60
  }
}

export async function getStaticPaths() {

  return { 
    paths: [{ params: { label: 'artwork', folder: 'collages_manuales' } }], 
    fallback: 'blocking' 
  }
}

export default FolderView;