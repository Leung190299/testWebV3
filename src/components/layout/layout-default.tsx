import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment, PropsWithChildren } from 'react';
import FooterDefault from '../footer/default';
import HeaderDefault, { navigations } from '../header/header-default';
import HeaderNavigation from '../header/header-navigation';
import Schema from '../seo/Schema';

const SettingsDrawer = dynamic(() => (process.env.NODE_ENV === 'development' ? import('@/dev/settings') : Promise.resolve(() => null)), {
  ssr: false
});

type DefaultProps = {
  footerClassName?: string;
  isHomePage?: boolean;
};
type Props = PropsWithChildren<DefaultProps & Omit<JSX.IntrinsicElements['main'], keyof DefaultProps>>;

const LayoutDefault = ({ children, footerClassName, isHomePage, ...rest }: Props) => {
  const rounter = useRouter()
  return (
    <Fragment>
            <Head>
        <link rel="canonical" href={`https://v3.itel.vn${rounter.asPath}`} />
      </Head>
      {/* <SettingsDrawer /> */}
      <HeaderDefault isHomePage={isHomePage} />
      <HeaderNavigation className={clsx(isHomePage ? 'pt-[4.5rem]' : 'pt-16', 'md:pt-[7.5rem]')} navigations={navigations} />

      <main {...rest}>{children}</main>
      <FooterDefault className={footerClassName} />
      <Schema type='all'/>
      <Schema type='business'/>

      <Schema type='Searchbox'/>
    </Fragment>
  );
};

export function LayoutWithChatBox(page: React.ReactNode) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-0">{page}</LayoutDefault>
      {/* <ChatBoxLazy /> */}
    </>
  );
}

export default LayoutDefault;
