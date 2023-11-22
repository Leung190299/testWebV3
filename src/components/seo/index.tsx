import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface ISeo {
  title: string;
  description: string;
  image?: string;
  keywords?: string;
}

const IS_SERVER = typeof window === "undefined";
export  function getURL(path: string) {
  const baseURL = IS_SERVER
    ? process.env.URL!
    : window.location.origin;
  return baseURL+path;
}
const Seo: FC<ISeo> = ({ title, description, image, keywords }) => {

const {pathname}= useRouter()

  return (
    <Head>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="robots" content="index, follow" />
		  <meta name="revisit-after" content="7 days" />

      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={getURL(pathname) } />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={getURL(pathname)} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};

export default Seo;
