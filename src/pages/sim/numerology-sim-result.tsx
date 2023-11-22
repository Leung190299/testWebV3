import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes/routers';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Svg from '@/components/icon/svg';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import SimModalCommentary from '@/components/modal/modal-sim-commentary';
import ModalSimInfo from '@/components/modal/modal-sim-info';
import SectionNumberlogySimResult from '@/components/section/section-numberlogy-sim-result';
import SectionSimCommentary from '@/components/section/section-sim-commentary';
import SectionSupports from '@/components/section/section-supports';
import QualitySimCard from '@/components/sim/quality-sim-card';
import SimTable from '@/components/sim/table';

import { modal } from '@/libs/modal';
import { generateSimNumber } from '@/services/sim';
import useSimAction from '@/store/cart/hooks/sim';

import { simOption } from '@/mock/sim';
import type { Model } from '@/types/model';

import PaginationSimple from '@/components/pagination/pagination-simple';
import useSimFilter from '@/hooks/useSimFilter';

import HeaderWebDefault from '@/components/header/header-web-default';
import { SimModalMode } from '@/components/modal/modal-add-sim';
import { toggleModalSimLookup } from '@/components/modal/modal-sim-lookup';
import { SimQuery, simTypes } from '@/constants/sim.constants';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';

type PageProps = {
  sim: ReturnType<typeof generateSimNumber>[number];
  data: ReturnType<typeof generateSimNumber>;
};
const NumerologySimResult: NextPage<PageProps> = ({ sim, data }) => {
  const router = useRouter();
  const { date, mode, phone } = router.query;
  const { selectedAttributes, handleModalFilter, handleRemoveAttributes, methods } = useSimFilter();

  const { handleAddToCart } = useSimAction();

  const isMark = mode === SimQuery.MarkPhone;
  const handleChangeLookup = () => {
    toggleModalSimLookup(
      (values) => {
        router.push({
          pathname: '/sim/numerology-sim-result',
          query: {
            phone: values.phone,
            name: values.name,
            date: values.dateOfBirth ? new Date(values.dateOfBirth).getTime() : undefined,
            mode: values.mode
          }
        });
      },
      { type: 'numerology', defaultIndex: isMark ? 1 : 0 }
    );
  };
  const handleModalCommentary = () => {
    modal.open({
      render: <SimModalCommentary title="Con số chủ đạo số 5" />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel bg-neutral-0 xl:bg-neutral-100',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  const handleModalDetail = (item: Model.Sim & { gift?: Model.Gift; pack: Model.PackOfData }) => {
    modal.open({
      render: (
        <ModalSimInfo
          title="Chi tiết luận giải"
          item={item}
          type="numerology"
          onAddToCart={() => handleAddToCart(item)}
          onBuyNow={() => handleAddToCart(item, SimModalMode.Buy)}
        />
      ),
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel bg-neutral-0 xl:bg-neutral-100',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };
  const formatedDate = useMemo(() => {
    return dayjs(String(date) || Date.now()).format('DD/MM/YYYY');
  }, [date]);

  return (
    <>
      <Head>
        <title>Kết quả thần số học</title>
      </Head>
      <HeaderWebDefault title="Kết quả tra cứu" withMenu />
      {/* Breadcrumb */}
      <section className="md:bg-neutral-0">
        <div className="container">
          <div className="breadcrumbs text-sm text-neutral-500">
            <ul aria-label="Breadcrumb">
              <li>
                <Link href={Routers.HOME}>Trang chủ</Link>
              </li>
              <li>
                <Link href={Routers.SIM} className="max-md:hidden">
                  Chọn số mua sim
                </Link>
                <span className="md:hidden">...</span>
              </li>
              <li>
                <Link href={Routers.SIM_NUMEROLOGY}>Sim thần số học</Link>
              </li>
              <li className="overflow-hidden text-neutral-800">
                <Link href={router.asPath} className="truncate">
                  {!isMark ? 'Kết quả thần số học' : 'Kết quả chấm điểm sim'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Section information */}
      <SectionNumberlogySimResult
        onChange={handleChangeLookup}
        className="md:mt-10"
        bannerTitle="Xin chào Nguyễn Bảo Ngọc"
        bannerDesc={`iTel sẽ bói cho thí chủ một quẻ để tìm ra số Sim đẹp nhất, hợp nhất nhé!`}
        type={isMark ? 'secondary' : 'primary'}
        title={isMark ? 'Chấm điểm sim' : 'Kết quả sim phong thuỷ'}
        queries={
          isMark ? [formatPhoneNumber(String(phone) || '0877123456'), 'Nguyễn Bảo Ngọc', formatedDate] : ['Nguyễn Bảo Ngọc', formatedDate]
        }
        number={7}
        attributes={[
          { title: 'Chỉ số thái độ', mobileTitle: 'Thái độ', value: 'Số 3' },
          { title: 'Chỉ số linh hồn', mobileTitle: 'Linh hồn', value: 'Số 5' },
          { title: 'Chỉ số nhân cách', mobileTitle: 'Nhân cách', value: 'Số 2' },
          { title: 'Chỉ số sứ mệnh', mobileTitle: 'Sứ mệnh', value: 'Số 8' }
        ]}
        content="Thí chủ Nam mệnh Sơn đầu hỏa mang nghĩa “lửa trên núi”. Cùng là hành Hỏa nhưng sau khi đi kèm với yếu tố nạp âm, mệnh Sơn Đầu Hỏa lại mang những đặc trưng khác biệt với những mệnh Hỏa khác. Thí chủ phù hợp với các số 3,7, 6 và kỵ với các số 1, 9, nên chọn các số thuộc mệnh Hỏa, mệnh Mộc và tránh lựa chọn các số thuê bao thuộc mệnh Thủy."
        onClickDetail={handleModalCommentary}
      />
      {isMark && (
        <SectionSimCommentary
          title="Điểm thần số học"
          point={7}
          type="numberlogy"
          isMatch
          attributes={[
            { title: 'Năng lượng Sim', value: 'Số 7' },
            { title: 'Số ô lấp đầy', value: '7/9' },
            { title: 'Số trục mũi tên', value: '7/8' }
          ]}
          item={sim}
          tags={['Tam hoa', 'Tài lộc', 'Lộc phát']}
          onCart={() => handleAddToCart(sim)}
          onBuy={() => handleAddToCart(sim, SimModalMode.Buy)}
          onViewDetail={() => handleModalDetail(sim)}
        />
      )}

      <section className="container py-6 md:mt-10 md:pb-16 xl:pb-20 md:pt-0 xl:mt-14">
        <div className="max-md:hidden w-full rounded-2xl bg-neutral-0 p-6">
          <div className="flex items-center justify-between gap-6">
            <img src="/images/sim-image-3.png" alt="sim-img" className="aspect-square w-28 rounded-lg" />
            <div>
              <p className="mb-2 text-xl font-bold">Bổ sung năng lượng chủ đạo từ Sim</p>
              <p className="font-medium text-neutral-500 md:text-sm xl:text-base">
                Xem xét số chủ đạo của sim có mối tương quan như nào với các chỉ số của bạn. Trong đó quan trọng nhất là của bạn. Sau đó tùy
                vào mục tiêu mà xem xét tới các chỉ số khác: tính cách, linh hồn, thái độ,…
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center md:hidden">
          <h3 className="text-xl flex-1">
            <b>Danh sách sim</b>
          </h3>
          <button onClick={()=>handleModalFilter([],[])}>
            <Svg src="/icons/bold/filter.svg" width={24} height={24} />
          </button>
        </div>
        <FormProvider {...methods}>
          {/* Filter for mobile */}
          {/* <SimSearchBar
            className="md:mt-8"
            selectedAttributes={selectedAttributes}
            tags={serverHighestSearch}
            onRemoveAttributes={handleRemoveAttributes}
            handleShowFilterModal={()=>handleModalFilter([],[])}
            changeBg
          /> */}
        </FormProvider>
        {/* {query && <div className="md:hidden font-bold text-xl">Kết quả cho “{query}”</div>} */}

        <div className="mt-3 md:mt-8 grid gap-x-4 gap-y-8 xl:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {data.map((item) => (
            <SimTable
              key={item.id}
              simItem={item}
              pack={item.pack}
              tags={simTypes.slice(3, 7)}
              inSearchResult
              isCardNumerologySim
              onViewCommentary={() => handleModalDetail(item)}
              onAddToCart={() => handleAddToCart(item)}
              onBuy={() => handleAddToCart(item, SimModalMode.Buy)}
              onSelectTag={(tag) => handleRemoveAttributes({ name: '', id: String(tag.id), type: 'type' })}
            />
          ))}
        </div>
        <div className="flex w-full items-center justify-center mt-3 md:mt-8">
          <div className="max-md:hidden">
            <PaginationSimple totalPage={100} adjacent={4} />
          </div>
          <div className="md:hidden">
            <PaginationSimple totalPage={100} adjacent={[3, 1]} />
          </div>
        </div>
      </section>
      <section className="bg-neutral-50 py-6 md:mt-0 md:py-16 xl:py-28">
        <QualitySimCard simOption={simOption} />
      </section>
      <SectionSupports />
    </>
  );
};

NumerologySimResult.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation<PageProps>(() => {
  return {
    props: {
      sim: generateSimNumber({ limit: 1 })[0],
      data: generateSimNumber({ limit: 12 })
    }
  };
});
export { getStaticProps };

export default NumerologySimResult;
