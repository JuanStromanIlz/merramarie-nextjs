import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import Wrapper from '@/styled-components/common/PageWrapper';
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
        <meta name='description' content={folderInfo.description ? folderInfo.description : `${folderInfo.label}.`}/>
        <meta property='og:description' content={folderInfo.description ? folderInfo.description : `${folderInfo.label}.`}/>
        <meta name='twitter:description' content={folderInfo.description ? folderInfo.description : `${folderInfo.label}.`}/>
        {/* url */}
        <link rel='canonical' href={`https://merramarie-next.vercel.app/${label}/${folder}`}/>
        <meta property='og:url' content={`https://merramarie-next.vercel.app/${label}/${folder}`}/>
        <meta name='twitter:url' content={`https://merramarie-next.vercel.app/${label}/${folder}`}/>
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
  const res = await axios.get(`https://merramarieportfolio.herokuapp.com/public/${params.label}/${params.folder}`);
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
  const folders = [];
  const paths = [];
  const res = await axios.get(`https://merramarieportfolio.herokuapp.com/public/all`);
  const labels = await res.data;
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    let res = await axios.get(`https://merramarieportfolio.herokuapp.com/public/${label}`);
    let foldersInLabel = await res.data;
    folders.push(...foldersInLabel);
  }
  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];
    paths.push({ params: {label: folder.label, folder: folder.route_title} });
  }
  return { 
    paths, 
    fallback: 'blocking' 
  }
}

export default FolderView;