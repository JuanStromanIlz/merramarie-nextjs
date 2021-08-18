import { useRouter } from 'next/router';
import Head from 'next/head';
import Wrapper from '@/common/PageWrapper';
import Nav from '@/common/Nav';
import axios from 'axios';
import Label from '@/styled-components/Label';

const LabelView = ({ogType, ogImage, labelName, labelInfo}) => {
  const router = useRouter();
  const { label } = router.query;

  return (
    <div>
      <Head>
        {/* icon */}
        <link rel='shortcut icon' href='/heart.svg'/>
        {/* type */}
        <meta property='og:type' content={ogType}/>
        {/* title */}
        <title>{`${labelName} || Merra Marie`}</title>
        <meta property='og:title' content={`${labelName} || Merra Marie`}/>
        <meta name='twitter:title' content={`${labelName} || Merra Marie`}/>
        {/* description */}
        <meta name='description' content='Trabajos destacados.'/>
        <meta property='og:description' content='Trabajos destacados.'/>
        <meta name='twitter:description' content='Trabajos destacados.'/>
        {/* url */}
        <link rel='canonical' href={`${process.env.REACT_APP_FRONTEND}${label}`}/>
        <meta property='og:url' content={`${process.env.REACT_APP_FRONTEND}${label}`}/>
        <meta name='twitter:url' content={`${process.env.REACT_APP_FRONTEND}${label}`}/>
        {/* image */}
        <meta name='twitter:image' content={ogImage}/>
        <meta name='twitter:image:secure_url' content={ogImage}/>
        <meta property='og:image' content={ogImage}/>
        <meta property='og:image:secure_url' content={ogImage}/>
        <meta property='og:image:width' content='200'/>
        <meta property='og:image:height' content='200'/>
      </Head>
      <Nav />
      <Wrapper>
        <Label name={labelName} label={labelInfo} adminRoutes={null}/>
      </Wrapper>
    </div>
  );
}

export async function getStaticProps(label) {
  const labelToGet = label.params.label;
  let ogType = 'website';
  let ogImage = '/heart.png';
  let labelName = 'Comercial';
  const res = await axios.get(`${process.env.REACT_APP_APIHOST}public/${labelToGet}`);
  const labelInfo = await res.data;
  /* find img in label */
  let itemFilter = labelInfo.find(folder => folder.images);
  if (itemFilter !== undefined) {
    ogImage = itemFilter.images[0].url;
    ogType = 'article';
  }
  if (label !== 'commercial') {
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