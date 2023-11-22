import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutDefault from '@/components/layout/layout-default';
import StepResult from '@/components/pages/checkout/step-result';
import useOrder from '@/hooks/useOrder';
import { getMessageByOrder } from '@/mock/order';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

type Props = {};

const CheckoutResultPage: NextPage<Props> = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const { data: orderData } = useOrder(id);
  const message = orderData ? getMessageByOrder(orderData) : '';

  return (
    <>
      <Head>
        <title>Itel - Kết quả</title>
      </Head>
      {!orderData ? null : <StepResult orderData={orderData} message={message} />}
    </>
  );
};
CheckoutResultPage.getLayout = (page) => {
  return (
    <>
      <LayoutDefault className="min-h-screen md:min-h-0" footerClassName="max-md:hidden bg-neutral-50">
        {page}
      </LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};

export { getStaticProps } from './index';
export default CheckoutResultPage;
