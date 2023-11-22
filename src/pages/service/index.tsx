import { LayoutWithChatBox } from '@/components/layout/layout-default';
import Routers from '@/routes/routers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Service: NextPage<{}> = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(Routers.ITRAVEL_SERVIVE);
  }, []);
  return <></>;
};
Service.getLayout = LayoutWithChatBox;

export default Service;
