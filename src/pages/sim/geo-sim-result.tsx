import Drag from '@/components/drag/drag';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';
import QualitySimCard from '@/components/sim/quality-sim-card';
import Tab from '@/components/tabs/tabs';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { gift, paramsSimSearch } from '@/constants/sim.constants';
import { simOption } from '@/mock/sim';

import Routers from '@/routes/routers';

import { modal } from '@/libs/modal';
import { generateSimNumber } from '@/services/sim';

import SimModalCommentary from '@/components/modal/modal-sim-commentary';
import Pagination from '@/components/pagination/Pagination';
import SectionGeoSimResult from '@/components/section/section-sim-result';
import SectionSimScore from '@/components/section/section-sim-score';
import SimTableFongSiu from '@/components/sim/tableSimFongSiu';
import useSimFilter from '@/hooks/useSimFilter';
import simService, { simSearch } from '@/services/simService';
import useSimAction from '@/store/cart/hooks/sim';
import { Model } from '@/types/model';
import { SimModel } from '@/types/pick-sim';
import Link from 'next/link';
import { useRef } from 'react';

import HeaderMobileWeb from '@/components/header/header-mobile-web';
import { SimModalMode } from '@/components/modal/modal-add-sim';
import SearchForm from '@/components/sim/SearchForm';
import Skeleton from '@/components/skeleton/skeleton';
import { SimQuery, fengShuiTabs } from '@/constants/sim.constants';
import dayjs from 'dayjs';
import { FormProvider } from 'react-hook-form';

// mock

type ModelTab = {
  id: number;
  label: string;
  menh?: number;
  img: string;
  sim_type: number;
};

const subTabs = [
  {
    id: 0,
    title:
      'SIM Phong thủy là dãy số cân bằng âm dương, ngũ hành tương sinh, quẻ dịch, phù hợp với mục đích của người dùng dựa vào bát tự ngày sinh và giờ sinh. SIM Phong thủy sẽ tốt hơn khi có con số thu hút vượng khí, điểm phong thủy và tổng số nút cao.'
  },
  {
    id: 1,
    title:
      'Ngoài những SIM phong thủy mang ý nghĩa công danh sự nghiệp, phong thủy tài lộc nay đã có quẻ kinh dịch phong thủy kích tình duyên sinh vượng đón duyên mới, bồi đắp tình sâu nghĩa nặng ngăn chừng sự chia lìa, tan vỡ tình cảm đôi lứa.<br/>Để tặng sự hưng vượng tình duyên, tình cảm thuận lợi thì SIM Gia đạo tình duyên sẽ là lựa chọn phù hợp nhất danh cho Quý khách'
  },
  {
    id: 2,
    title:
      'Con người cũng như vạn vật tồn tại trên thế giới này đều được sinh khí cấu thành. Sinh khí không chỉ tồn tại trong lòng đất mà còn tồn tại thông qua nguồn năng lượng con số đồng hành với mỗi con người. Khi năng lượng sinh khí của con số sinh vượng ắt tạo được phúc lộc vĩnh trinh cho người may mắn sở hữu. Quý khách hãy lựa chọn cho mình SIM phong thủy thu hút may mắn và mang lại cát khí tốt lành'
  },
  {
    id: 3,
    title:
      'Sim phong thủy kích công danh sự nghiệp hội tụ năng lượng con số đầy đủ yếu tố VẬN - DANH - TÀI thâu tóm ý nghĩa hút tài vượng sinh quan, chức trọng quyền cao trên áp đảo vạn người. Từ đó có khả năng thay đổi hết thảy số mệnh tưởng chừng không thể xoay chuyển để đón công thành danh toại giống như “sông núi khó mà chuyển dời nhưng tương giao năng lượng Trời - Đất vẫn có thể di sông, đổi hướng”. Danh sách SIM phong thủy kích công danh, sự nghiệp'
  },
  {
    id: 4,
    title:
      'Tài là gốc, là nguồn nuôi sống vận mệnh con người. Tài vận tới yên dân lạc nghiệp, của cải dồi dào, tiền bạc đầy kho, phúc lộc lâu bền, cuộc đời hạnh phúc. Tài vận gặp bại vận tiền của đi dần, tai vạ bất ngờ, khuynh gia bại sản. Do đó, bất kể ai, cương vị nào không biết cầu thụ thông suốt, kích hoạt tài vận thì ấy là cuối đời cũng khó phát tài, hiển vinh.<br/>Mỗi người sinh ra mỗi số mệnh, suy vượng khác nhau nhưng mười người thì chín người phú quý nhờ ấn thụ sinh của, hành đến vận quan. Nguyên lý này được quẻ dịch sim phong thủy phát triển, nguồn năng lượng cát của con số trong sim kích tài vận có khả năng bổ sung hành mệnh cân bằng, loại bỏ xung khắc, hút khí sinh tài cho người dùng.'
  },
  {
    id: 5,
    title:
      'Vạn vật trên trái đất đều được phát sinh ra từ 5 yếu tố cơ bản Kim, Mộc, Thủy, Hỏa, Thổ trong môi trường tự nhiên và có mỗi quan hệ tồn tại song hành, tương tác qua lại và không thể tách rời.<br/>Từ đó ngũ hành được ứng dụng vào những con số để tạo ra sim phong thủy, việc lựa chọn sim phong thủy hợp mệnh sẽ mang ý nghĩa bổ trợ, bù khuyết thiếu ngũ hành trong bát tự ngày sinh và mang lại trường khí tốt lành giúp mọi việc trở nên thuận lợi và hanh thông.'
  }
];

const tabs: ModelTab[] = [
  { id: 1, label: 'Tất cả', sim_type: 0, img: '/images/sim-cong-danh-result.png' },
  { id: 2, label: 'Gia đạo tình duyên', sim_type: 1, img: '/images/sim-tai-loc.png' },
  { id: 3, label: 'Đại cát', sim_type: 2, img: '/images/sim-dai-cat-result.png' },
  { id: 4, label: 'Công danh', sim_type: 3, img: '/images/sim-cong-danh-result.png' },
  { id: 5, label: 'Tài lộc', sim_type: 4, img: '/images/sim-tai-loc.png' },
  { id: 6, label: 'Mệnh Kim', menh: 1, sim_type: 1, img: '/images/sim-kim-result.png' },
  { id: 7, label: 'Mệnh Mộc', menh: 1, sim_type: 2, img: '/images/sim-moc-result.png' },
  { id: 9, label: 'Mệnh Thuỷ', menh: 1, sim_type: 3, img: '/images/sim-thuy-result.png' },
  { id: 8, label: 'Mệnh Hoả', menh: 1, sim_type: 4, img: '/images/sim-hoa-result.png' },
  { id: 10, label: 'Mệnh Thổ', menh: 1, sim_type: 5, img: '/images/sim-tho-result.png' }
];
type PageProps = {
  sim: ReturnType<typeof generateSimNumber>[number];
  data: ReturnType<typeof generateSimNumber>;
};
const GeoSimResult: NextPage<PageProps> = ({ data, sim }) => {
  const router = useRouter();
  const { gender, option, date, mode, phoneNumber } = router.query;
  const [tabSelect, setTabSelect] = useState<ModelTab>(tabs[0]);
  const [imgSelect, setImgSelect] = useState<string>('/images/sim-cong-danh-result.png');
  const { selectedAttributes, handleModalFilter, handleRemoveAttributes, methods } = useSimFilter();
  const [isLoad, setIsLoad] = useState(false);
  const { nextStepSelectType } = useSimAction();
  const [sims, setSims] = useState<Array<Model.Sim & { fongSiuData: SimModel.fongSiu[]; Months: number; SimType: number }>>([]);
  const [infoSim, setInfoSim] = useState<SimModel.info>({});
  const [simStore, setSimStore] = useState<Model.Sim>({ id: 1, phone: '', price: 0, sale_expiry: '' });
  const width = typeof window != 'undefined' ? innerWidth : 0;
  const refDiv = useRef<HTMLDivElement>(null);

  const params: simSearch = {
    columnFilters: { search: `${phoneNumber}` },
    page: 1,
    pageSize: 1,
    sort: []
  };

  const formatDate = dayjs(String(date)).format('DD/MM/YYYY');
  useEffect(() => {
    const getInformationSim = async () => {
      const informationSim = await simService.getDestinyInformation(`?phone=${phoneNumber}&dob=${formatDate}`);
      const infoSimUser = informationSim.result;
      setInfoSim(infoSimUser);
    };

    const getSearchSim = async () => {
      const searchSim = await simService.getSimSearch(params);
      if (searchSim.result) {
        setSimStore({
          ...simStore,
          phone: searchSim.result[0]?.Phone || '',
          price: searchSim.result[0]?.SimPrice || 0
        });
      }
    };
    if (phoneNumber) {
      getSearchSim();
      getInformationSim();
    }
    if (date) {
      getListSim(1, tabSelect.sim_type, tabSelect.menh);
    }
  }, [date, tabSelect, phoneNumber]);

  const getListSim = async (page: number, sim_type: number, menh?: number) => {
    setIsLoad(true);
    let url = menh
      ? `?menh=${menh}&sim_type=${sim_type}&dob=${formatDate}&page=${page}&pageSize=${width > 500 ? 15 : 10}`
      : `?sim_type=${sim_type}&dob=${formatDate}&page=${page}&pageSize=${width > 500 ? 15 : 10}`;
    const listSim = await simService.getListSim(url);

    if (listSim.code == 200) {
      setIsLoad(false);
      const listFongSiuSim: Array<
        Model.Sim & {
          fongSiuData: SimModel.fongSiu[];
          Months: number;
          SimType: number;
        }
      > = listSim.result.map((item: Model.SimData & { money?: number }, index) => {
        return {
          id: index,
          phone: item.phone,
          price: item.money || 0,
          discount_price: item.money || 0,
          is_vip: false,
          sale_expiry: null,
          fongSiuData: [
            { title: 'Mệnh', value: item.SimNguHanh },
            { title: 'Số nút', value: item.SoNut, tooltip: item.QueKinhDich },
            { title: 'Cát - hung', value: item.VanCatHung, point: item.DiemPhongThuy }
          ],
          Months: item.Months,
          SimType: item.SimType,

        };
      });
      setSims(listFongSiuSim);
    }
  };
  const getCategorySim = (tab: ModelTab) => {
    setTabSelect(tab);
    setImgSelect(tab.img);
    handleScroll();
  };

  const coverNamePackToData = (name: string) => {
    switch (name) {
      case 'ITEL100':
        return 1_000_000;
      case 'ITEL149':
        return 4_000_000;
      case 'ITEL199':
        return 5_000_000;
      case 'MAY':
        return 4_000_000;
      default:
        return 4_000_000;
    }
  };

  const handleModalCommentary = () => {
    modal.open({
      render: <SimModalCommentary title="Thành đầu thổ - Đất trên thành" type="feng_shui" />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel bg-neutral-0 xl:bg-neutral-100',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  const handleModalDetail = async (item: Model.Sim & { gift?: Model.Gift; pack: Model.PackOfData; fongSiuData: SimModel.fongSiu[] }) => {
    const inforSim = await simService.getDestinyInformation(`?phone=${item.phone}&dob=${formatDate}`);
    if (inforSim.code === 200) {
      let resultSim: SimModel.info = inforSim.result;
      modal.open({
        render: (
          <SectionSimScore
            phone={item.phone?.toString()}
            title="Điểm thần phong thuỷ"
            mobileTitle="Điểm phong thuỷ"
            point={Number(resultSim.v_diem_phongthuy)}
            meaningSim={resultSim.v_kinhdich}
            concludeSim={resultSim.v_ynghia_diemphongthuy}
            item={item}
            type="feng_shui"
            attributes={item.fongSiuData}
            onCart={() => handleBeforeAddToCart(item)}
            onBuy={() => handleBeforeAddToCart(item, SimModalMode.Buy)}
            onSelectPhone={() => handleScroll()}
            // onViewDetail={() => handleModalDetail(sim)}
          />
        ),
        transition: false,
        closeButton: true,
        className: 'modal-box shadow-itel bg-neutral-0',
        classNameContainer: 'flex flex-col justify-center items-center container',
        classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
      });
    }
  };

  const handleScroll = () => {
    if (refDiv.current) {
      window.scrollTo({
        top: refDiv.current.offsetTop - 300,
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleBeforeAddToCart = async (dataSim: Model.Sim, mode?: SimModalMode | undefined) => {
    const params = { ...paramsSimSearch, columnFilters: { search: `${dataSim.phone}` } };
    const res = await simService.getSimSearchMaster(params);
    const searchSim = res.result.map((item) => {
      const tags =
        item.SimType != 10 && item.ThoiGianCamKet > 0
          ? [
              { id: 1, name: 'Số cam kết' },
              { id: 2, name: item.group_name }
            ]
          : [{ id: 2, name: item.group_name }];
      return {
        gift: gift,
        pack: {
          data: coverNamePackToData(item.Pack),
          data_type: 'day',
          id: 1,
          name: item.Pack,
          price: item.PackPrice,
          discount_price: item.PackPrice,
          price_type: 'month',
          ThoiGianCamKet: item.ThoiGianCamKet
        } as Model.PackOfData,

        tags: tags,
        discount_price: item.SimPrice + item.Price,
        id: parseInt(item.Phone),
        is_vip: false,
        phone: item.Phone,
        price: (item.SimPrice + item.Price) * 1.1,
        sale_expiry: null,
        ThoiGianCamKet: item.ThoiGianCamKet,
        EsimPrice: item.EsimPrice,
        SimPrice: item.SimPrice,
        SimType: item.SimType
      };
    });

    return nextStepSelectType(searchSim[0]);
  };

  return (
    <>
      <Head>
        <title>Kết quả sim phong thủy</title>
      </Head>
      <HeaderMobileWeb title="Kết quả tra cứu " />
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
                <Link href={Routers.SIM_FENG_SHUI}>Sim phong thuỷ</Link>
              </li>
              <li className="overflow-hidden text-neutral-800">
                <Link href={router.asPath} className="truncate">
                  {mode === '2' ? 'Kết quả chấm điểm sim' : 'Kết quả sim phong thuỷ'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Section information */}
      <SectionGeoSimResult
        onChange={() =>
          modal.open({
            render: (
              <SearchForm
                tabIndex={mode?.toString() == '2' ? SimQuery.MarkPhone : SimQuery.Basic}
                tabs={fengShuiTabs}
                isModal
                handleCloseModal={() => {}}
              />
            ),
            transition: false,
            closeButton: true,
            className: 'modal-box shadow-itel md:max-w-[35rem]',
            classNameContainer: 'modal-full md:modal-middle',
            classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
          })
        }
        type={mode == '2' ? 'secondary' : 'primary'}
        title={mode === '2' ? 'Chấm điểm sim' : 'Kết quả sim phong thuỷ'}
        queries={mode === '2' ? [phoneNumber, formatDate] : [gender, formatDate, option]}
        bannerTitle={`Chào ${gender} thí chủ ${gender === 'Nam' ? 'bảnh bao' : 'xinh đẹp'}!`}
        bannerDesc={`iTel sẽ bói cho ${gender} thí chủ một quẻ để tìm ra số Sim đẹp nhất, hợp nhất nhé!`}
        imageTitle="Thành dầu thổ"
        attributes={[
          { label: 'Năm Can Chi', value: infoSim.v_canchi || '' },
          { label: 'Ngũ hành', value: infoSim.v_nguhanh || '' },
          { label: 'Ngũ hành khắc mệnh', value: infoSim.v_nguhanh_khacmenh || '' },
          { label: 'Ngũ hành sinh mệnh', value: infoSim.v_nguhanh_sinhmenh || '' }
        ]}
        //content="Thí chủ Nam mệnh Sơn đầu hỏa mang nghĩa “lửa trên núi”. Cùng là hành Hỏa nhưng sau khi đi kèm với yếu tố nạp âm, mệnh Sơn Đầu Hỏa lại mang những đặc trưng khác biệt với những mệnh Hỏa khác. Thí chủ phù hợp với các số 3,7, 6 và kỵ với các số 1, 9, nên chọn các số thuộc mệnh Hỏa, mệnh Mộc và tránh lựa chọn các số thuê bao thuộc mệnh Thủy."
        //onClickDetail={handleModalCommentary}
      />
      {mode === '2' && (
        <SectionSimScore
          phone={phoneNumber?.toString()}
          title="Điểm thần phong thuỷ"
          mobileTitle="Điểm phong thuỷ"
          point={Number(infoSim.v_diem_phongthuy)}
          meaningSim={infoSim.v_kinhdich}
          concludeSim={infoSim.v_ynghia_diemphongthuy}
          item={simStore}
          type="feng_shui"
          attributes={[
            { title: 'Mệnh', value: infoSim.v_menhsim || '' },
            { title: 'Số nút', value: infoSim.v_sonut || '' },
            { title: 'Cát - hung', value: infoSim.v_van_cathung || '' }
          ]}
          onCart={() => handleBeforeAddToCart(sim)}
          // onBuy={() => handleAddToCart(sim, 'buy')}
          onSelectPhone={() => handleScroll()}
          // onViewDetail={() => handleModalDetail(sim)}
          onBuy={() => handleBeforeAddToCart(sim, SimModalMode.Buy)}
          // onViewDetail={() => handleModalDetail(sim)}
        />
      )}

      <section className="container py-6 md:mt-10 md:pb-16 xl:pb-20 md:pt-0 xl:mt-14">
        {/* Heade PC */}
        <div className="max-md:hidden">
          <Drag className="select-none items-center justify-between overflow-auto scrollbar-hide md:flex">
            {tabs.map((tab) => (
              <Tab key={tab.id} label={tab.label} onClick={() => getCategorySim(tab)} isActive={tabSelect.id === tab.id} size="small" />
            ))}
          </Drag>

          <div className="mb-6 w-full border-b border-b-neutral-300" />
          <div className="mt-4 w-full rounded-2xl bg-neutral-0 p-6">
            <div className="flex items-center justify-between gap-6">
              <div className="flex">
                <img src={imgSelect} alt="sim-img" className="aspect-square w-28 h-28 rounded-lg" />
                <div className="ml-5">
                  <p className="mb-2 text-xl font-bold">{tabSelect.label}</p>
                  {!tabSelect.menh ? (
                    subTabs
                      .filter((value) => value.id == tabSelect.sim_type)
                      .map((value) => (
                        <p
                          key={value.id}
                          className="font-medium text-neutral-500 md:text-sm xl:text-base"
                          dangerouslySetInnerHTML={{ __html: value.title }}
                        />
                      ))
                  ) : (
                    <p
                      className="font-medium text-neutral-500 md:text-sm xl:text-base"
                      dangerouslySetInnerHTML={{ __html: subTabs[5].title }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <FormProvider {...methods}>
          <div className="block md:hidden text-xl font-bold ">Danh sách Sim</div>
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
        {!isLoad ? (
          <div ref={refDiv} className="mt-3 grid gap-8 gap-x-6 md:mt-8 md:grid-cols-2 xl:grid-cols-3">
            {sims.map((item: any, index: number) => (
              <SimTableFongSiu
                key={index}
                simItem={item}
                inSearchResult
                pack={item.pack}
                fongSiuData={item.fongSiuData}
                onViewCommentary={() => handleModalDetail(item)}
                onAddToCart={() => handleBeforeAddToCart(item)}
                onBuy={() => handleBeforeAddToCart(item, SimModalMode.Buy)}
                onSelectTag={(tag) => handleRemoveAttributes({ name: '', id: String(tag.id), type: 'type' })}
              />
            ))}
          </div>
        ) : (
          <Skeleton />
        )}

        <div className="flex w-full items-center justify-center">
          <div className=" mt-3 md:mt-8">
            <Pagination
              pageCount={50}
              onPageChange={(page) => {
                getListSim(page.selected + 1, tabSelect.sim_type, tabSelect.menh);
                handleScroll();
              }}
            />
          </div>
        </div>
      </section>
      <section className="md:bg-neutral-50 py-6 md:mt-0 bg-transparent md:py-16 xl:py-28">
        <QualitySimCard simOption={simOption} />
      </section>
      <SectionSupports />
    </>
  );
};

GeoSimResult.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation<PageProps>(() => {
  return {
    props: {
      sim: generateSimNumber({ limit: 1 })[0],
      data: generateSimNumber({ limit: 50 })
    }
  };
});
export { getStaticProps };

export default GeoSimResult;
