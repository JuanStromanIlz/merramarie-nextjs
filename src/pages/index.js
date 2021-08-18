import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='twitter:title' content='Merra Marie' />
        <meta name='twitter:description' content='Desde Argentina con amor' />
        <meta name='twitter:image' content='https://merramarie.vercel.app/heart.png' />
        <meta name='twitter:image:secure_url' content='https://merramarie.vercel.app/heart.png' />
        <meta property='og:image' content='https://merramarie.vercel.app/heart.png' />
        <meta property='og:image:secure_url' content='https://merramarie.vercel.app/heart.png' />
        <meta property='og:image:width' content='200' />
        <meta property='og:image:height' content='200' />
        <meta property='og:url' content='https://merramarie.vercel.app' />
        <meta property='og:site_name' content='Merra Marie'/>
        <meta property='og:title' content='Merra Marie Portfolio'/>
        <meta property='og:type' content='website'/>
        <meta
          name='description'
          content='Desde Argentina con amor'
        />
        <title>Merra Marie</title>
      </Head>
      <h1> NextJS Blog with Butter CMS</h1>
    </div>
  );
}