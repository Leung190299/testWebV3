import { LayoutWithChatBox } from '@/components/layout/layout-default';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import React from 'react';

type Props = {};

const GuidePage = (props: Props) => {
  return <div>GuidePage</div>;
};
GuidePage.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation();
export { getStaticProps };
export default GuidePage;
