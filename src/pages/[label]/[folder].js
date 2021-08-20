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
        <title>{folderInfo.title}</title>
        <meta property='og:title' content={folderInfo.title}/>
        <meta name='twitter:title' content={folderInfo.title}/>
        {/* description */}
        <meta name='description' content={folderInfo.description ? folderInfo.description : `${folderInfo.label}.`}/>
        <meta property='og:description' content={folderInfo.description ? folderInfo.description : `${folderInfo.label}.`}/>
        <meta name='twitter:description' content={folderInfo.description ? folderInfo.description : `${folderInfo.label}.`}/>
        {/* url */}
        <link rel='canonical' href={`${process.env.NEXT_PUBLIC_FRONTEND}/${label}/${folder}`}/>
        <meta property='og:url' content={`${process.env.NEXT_PUBLIC_FRONTEND}/${label}/${folder}`}/>
        <meta name='twitter:url' content={`${process.env.NEXT_PUBLIC_FRONTEND}/${label}/${folder}`}/>
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
  const res = await axios.get(`${process.env.NEXT_PUBLIC_APIHOST}/public/${params.label}/${params.folder}`);
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
    revalidate: 10
  }
}

export async function getStaticPaths() {
  const folders = [];
  const paths = [];
  const res = await axios.get(`${process.env.NEXT_PUBLIC_APIHOST}/public/all`);
  const labels = await res.data;
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    let res = await axios.get(`${process.env.NEXT_PUBLIC_APIHOST}/public/${label}`);
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