import HeaderWebDefault from '@/components/header/header-web-default';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import BottomSheetAddToCart from '@/components/modal/modal-add-sim';
import StepSim from '@/components/sim/step-sim';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes';
import { useAppSelector } from '@/store/hooks';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

const steps: string[] = ['Chọn SIM số', 'Chọn loại SIM <br> & Gói cước', ' Thanh toán'];
const SimSelectType: NextPage = () => {
  const data = useState(useAppSelector((state) => state.simType))[0];

  return (
    <div>
      {data.simSelect.length <= 0 ? (
        <div className="min-h-screen center-by-grid">
          <div className="text-center">
            <h1 className="text-h1 font-itel container font-bold">Bạn chưa chọn sản phẩm</h1>
            <div>
              <Link className="btn btn-primary btn-lg rounded-full w-32 mt-4" href={Routers.HOME}>
                Về
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='bg-neutral-0 md:bg-neutral-200'>
          <HeaderWebDefault title="2. Chọn loại SIM & Gói cước" withMenu withSearch />
          <StepSim step={2} steps={steps} />
          <BottomSheetAddToCart items={[data.simSelect[data.simSelect.length - 1]]} />
        </div>
      )}
    </div>
  );
};

SimSelectType.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation();
export { getStaticProps };

export default SimSelectType;
