import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';

import { store } from '@/store/store';
import Tracker from '@openreplay/tracker';
import LogRocket from 'logrocket';
import { Provider } from 'react-redux';

import { appWithTranslation } from '@/libs/i18n';
import config from '../../next-i18next.config';

import ToastMessage from '@/components/toast/toast-message';
import GlobalProvider from '@/context/global';
// Import css files
import '@/styles/code.scss';
import '@/styles/customize-scrollbar.scss';
import '@/styles/font.scss';
import '@/styles/globals.scss';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Head from 'next/head';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import en from '../../public/locales/en/common.json';
import vi from '../../public/locales/vi/common.json';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useRouter } from 'next/router';
dayjs.extend(customParseFormat);

type AppPropsWithLayout<P = {}, E = {}> = AppProps<P> & {
  Component: NextPage;
  initialState?: any;
} & E;

export const DMSansVN = localFont({
  src: [
    { path: '../../public/fonts/DMSansVN-Regular.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/DMSansVN-Italic.otf', weight: '400', style: 'italic' },

    { path: '../../public/fonts/DMSansVN-Medium.otf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/DMSansVN-MediumItalic.otf', weight: '500', style: 'italic' },

    { path: '../../public/fonts/DMSansVN-Bold.otf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/DMSansVN-BoldItalic.otf', weight: '700', style: 'italic' }
  ],
  display: 'swap',
  variable: '--font-sans'
});
export const Itel = localFont({
  src: [
    { path: '../../public/fonts/iTel-Regular.woff', weight: '500', style: 'normal' },
    { path: '../../public/fonts/iTel-Bold.woff', weight: '700', style: 'normal' }
  ],
  display: 'swap',
  variable: '--font-itel'
});

const tracker = new Tracker({
  projectKey: "YWyHVCovB3IEDIghwv4l",
  ingestPoint: "https://track.itel.dev/ingest",
});
export default appWithTranslation(function App({ Component, pageProps, router, ...rest }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    tracker.start();
    LogRocket.init('wnilhb/itelvn');
  },[])

  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1" />

      </Head>
      <GlobalProvider>
        {getLayout(<Component {...pageProps} router={router} />, pageProps)}
        <Toaster>{ToastMessage}</Toaster>
      </GlobalProvider>
    </Provider>
  );
},
{ ...config, resources: { en: { common: en }, vi: { common: vi } } }
);

