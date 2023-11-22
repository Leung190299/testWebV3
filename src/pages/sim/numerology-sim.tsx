import { LayoutWithChatBox } from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';
import QualitySimCard from '@/components/sim/quality-sim-card';
import SearchForm from '@/components/sim/SearchForm';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import Head from 'next/head';

import HeaderWebDefault from '@/components/header/header-web-default';
import { numerologyTabs, SimQuery } from '@/constants/sim.constants';
import { simOption } from '@/mock/sim';
import Routers from '@/routes/routers';
import Link from 'next/link';
import { useMemo } from 'react';

const pages = [
  { name: 'Chọn số mua sim', href: '#', current: false },
  { name: 'Sim thần số học', href: '#', current: true }
];

const numerologyData = [
  { mainNumber: '2', description: 'Lấy việc giúp đỡ người khác làm mục tiêu sống, đồng cảm với nỗi đau khổ, mất mát của người khác...' },
  { mainNumber: '3', description: 'Sống với mục đích khám phá những điều bí ẩn trong thế giới tư duy' },
  { mainNumber: '4', description: 'Sống thực tế, quý trọng tiền bạc và cũng rất biết cách hưởng thụ cuộc sống' },
  {
    mainNumber: '5',
    description: 'Người sống thiên về cảm xúc, dễ thích nghi, linh hoạt và luôn sẵn sàng nắm bắt mọi cơ hội đến với mình.'
  },
  { mainNumber: '6', description: 'Tinh thần trách nhiệm cao, sự mạnh mẽ, kiên cường, và lòng yêu thương con người sâu sắc' },
  { mainNumber: '7', description: '... người hướng ngoại, thích cuộc sống tự do, bay nhảy, luôn thích đi tìm kiếm câu trả lời' },
  { mainNumber: '8', description: '... độc lập, tự chủ, suy nghĩ phức tạp nhưng rất mạnh mẽ tự tin, gắn liền với sự thịnh vượng, dồi dào' },
  { mainNumber: '9', description: '... đại diện cho lý tưởng sống cao đẹp, những ước vọng, hoài bão lớn lao' },
  {
    mainNumber: '10',
    description:
      'Có thể thực hiện các nhiệm vụ bằng lời nói một cách hiệu quả, đưa ra được lý lẽ thuyết phục và nhanh chóng có được quyết định'
  },
  { mainNumber: '11', description: '... có lòng tin rất lớn vào thế giới tâm linh, tôn trọng văn hóa và đạo đức' },
  { mainNumber: '22', description: '... những cá nhân tiên phong dẫn đầu cho sự tiến bộ, phát triển của nhân loại' }
];

const turtorial: TurtorialStep[] = [
  {
    lable: 'Nhập thông tin',
    steps: [
      {
        content: 'Phân bổ các số sim trong dãy số vào biểu đồ ngày sinh.'
      },
      {
        content: 'Xem xét các số điền thêm vào biểu đồ ngày sinh có tác động như nào tới các trường năng lượng số'
      },
      {
        no_list: true,
        content:
          'Ví dụ, nếu biểu đồ ngày sinh bị trống ô 1, nếu trong sim số có từ một đến hai số 1 để điền vào biểu đồ ngày sinh thì rất tốt. Ngược lại nếu biểu đồ ngày sinh đã có số 1 rồi thì việc bổ sung thêm số 1 vào lại không hợp.'
      }
    ],
    banner: '/images/sim-numerology-3.png'
  },
  {
    lable: 'Chọn Sim trong danh sách Sim',
    steps: [
      { content: 'Tính năng lượng chủ đạo của SIM, xem xét mối quan hệ với con số chủ đạo, phân tích biểu đồ ngày sinh.' },
      {
        content:
          'Phân bố các số trong SIM vào biểu đồ ngày sinh, hình thành các trục mũi tên, Con số đơn lẻPhân bố các số trong SIM vào biểu đồ ngày sinh, hình thành các trục mũi tên, Con số đơn lẻ'
      },
      { content: 'Từ các yếu tố trên quy đổi ra điểm' }
    ],
    banner: '/images/sim-numerology-1.png'
  },
  {
    lable: 'Xem ý nghĩa và thanh toán',
    steps: [
      { content: 'Phân bổ các số sim trong dãy số vào biểu đồ ngày sinh.' },
      {
        content: 'Xem xét các số điền thêm vào biểu đồ ngày sinh có tác động như nào tới các trường năng lượng số'
      },
      {
        content:
          'Ví dụ, nếu biểu đồ ngày sinh bị trống ô 1, nếu trong sim số có từ một đến hai số 1 để điền vào biểu đồ ngày sinh thì rất tốt. Ngược lại nếu biểu đồ ngày sinh đã có số 1 rồi thì việc bổ sung thêm số 1 vào lại không hợp.',
        no_list: true
      }
    ],
    banner: '/images/sim-numerology-2.png'
  }
];
type TurtorialStep = { lable: string; steps: Array<{ content: string; no_list?: boolean }>; banner: string };
const NumerologySim: NextPage = ({ router }) => {
  const { leftColumns, rightColumns } = useMemo(() => {
    const leftColumns: TurtorialStep[] = [];
    const rightColumns: TurtorialStep[] = [];
    turtorial.forEach((s, i) => {
      i % 2 ? leftColumns.push(s) : rightColumns.push(s);
    });
    return { leftColumns, rightColumns };
  }, []);

  return (
    <>
      <Head>
        <title>Sim thần số học</title>
      </Head>
      <HeaderWebDefault title="Sim thần số học" type="fixed" withMenu />
      {/* Breadcrumb */}
      <section className="bg-neutral-0 max-md:hidden">
        <div className="container">
          <div className="breadcrumbs text-sm text-neutral-500">
            <ul aria-label="Breadcrumb">
              <li>
                <Link href={Routers.HOME}>Trang chủ</Link>
              </li>
              <li>
                <Link href={Routers.SIM}>Chọn số mua sim</Link>
              </li>
              <li className="text-neutral-800">
                <Link href={router.asPath}>Sim thần số học</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Banner */}
      <section id="calculate_form" className="relative">
        <div className="absolute top-0 inset-x-0 block-img block-tivi xl:pb-0 xl:h-full overflow-hidden">
          <img
            src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685194687/itel/images/bg-sim_1_r1xj1z.png"
            className="object-cover"
            alt="BG"
          />
          <div className="absolute top-0 h-full max-xl:hidden" style={{ right: '-8.375rem' }}>
            <img
              src="https://res.cloudinary.com/dgkrchato/image/upload/v1684464351/itel-web/sim_ylnubt.png"
              className="h-full"
              alt="Bnner"
            />
          </div>
          <div className="absolute inset-0 bg-overlay-popup/60" />
        </div>

        <div className="container relative xl:flex h-full pt-20 md:pb-20 xl:py-0 items-stretch max-md:mx-auto max-md:px-0">
          {/* Left content */}
          <div className="md:w-full flex-1 xl:py-[4.5rem] bg-transparent text-center md:text-left" data-theme="dark">
            <div className="xl:mt-[6.25rem]">
              <h1 className="text-h-xs md:text-h-sm xl:text-h-xl font-itel">Sim thần số học</h1>
              <p className="md:text-2xl mt-2 xl:mt-1 font-medium">Chu kỳ vận tốt - Năng lượng Tích cực</p>
            </div>
            <p className="max-md:hidden text-sm md:mt-2 xl:mt-12">
              <strong>SIM Thần số học</strong> thường mang tính chất bổ sung các trường năng lượng còn thiếu cho người sử dụng, từ đó giúp
              họ phát triển/hoàn thiện các sức mạnh nội tại để thực hiện mọi việc trong cuộc sống.
            </p>
          </div>
          {/* Right content */}
          <div className="mt-12 md:mt-8 xl:ml-6 md:w-full xl:w-[33.5rem] flex-shrink-0 xl:my-[5.75rem]">
            <SearchForm tabs={numerologyTabs} isSearchByNumerology tabIndex={SimQuery.Basic} />
          </div>
        </div>
      </section>
      <section className="bg-neutral-0 flex flex-col">
        <div className="order-2 relative">
          <img
            src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685194687/itel/images/bg-sim_1_r1xj1z.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative container py-10 md:py-16 xl:py-28 bg-transparent" data-theme="dark">
            <div className="w-full text-center">
              <h2 className="text-h-sm md:text-h-lg xl:text-h-xl font-itel max-lg:whitespace-pre-line">
                <b>{'Số chủ đạo trong \nthần số học'}</b>
              </h2>
              <p className="md:text-sm xl:text-base mt-1 md:mt-2 xl:mt-1">
                Mỗi một con số đều mang cho mình một năng lượng riêng và chúng đều có những ý nghĩa khác nhau.
              </p>
            </div>
            <div className="mt-8 md:mt-14">
              <div className="flex md:flex-wrap md:justify-center items-stretch overflow-auto -mx-4 md:-mt-6 md:-mx-2 scrollbar-hide">
                {numerologyData.map((item, index) => (
                  <div key={index} className="md:w-1/3 xl:w-1/4 px-2 md:mt-6 max-md:h-[12.75rem]">
                    <div className="w-[12.5rem] md:w-auto h-full bg-opacity-50 bg-overlay-popup/50 rounded-2.5xl border border-neutral-600">
                      <div className="text-center p-4 md:py-6 xl:px-6 xl:py-8">
                        <div className="text-h1 font-itel">{item.mainNumber}</div>
                        <div className="xl:mt-2 line-clamp-3">{item.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="max-md:hidden text-center mt-14">
              <a href="#calculate_form" className="btn-primary btn btn-lg rounded-full">
                Tìm số của bạn ngay
              </a>
            </div>
          </div>
        </div>
        <div className="py-6 md:py-16 xl:py-28 container order-2 md:order-1">
          <div className="flex flex-col xl:block columns-2 gap-x-6">
            <div className="md:mb-10 xl:mb-36 text-center xl:text-left">
              <h2 className="font-itel text-h4 xl:text-h1 md:text-h2 font-bold text-center">
                Cách tính <span className="text-red-500"> thần số học </span>
                số điện thoại
              </h2>
              <p className="md:text-sm xl:text-xl mt-1 max-w-xs md:max-w-max text-center mx-auto text-neutral-500">
                Để iTel chỉ bạn cách tính thần số học số điện thoại của bạn
              </p>
            </div>
            {leftColumns.map((step, index) => {
              return <RenderTurtorial data={step} key={index} step={index * 2 + 2} />;
            })}
            {rightColumns.map((step, index) => {
              return <RenderTurtorial data={step} key={index} step={index * 2 + 1} />;
            })}
          </div>
          <div className="mt-6 md:mt-10 xl:hidden text-center">
            <a href="#calculate_form" className="btn md:btn-lg btn-primary rounded-full">
              Khám phá ngay
            </a>
          </div>
        </div>
      </section>
      <section className="bg-neutral-50 py-6 md:py-16 xl:py-28">
        <QualitySimCard simOption={simOption} />
      </section>
      <SectionSupports />
    </>
  );
};

const RenderTurtorial = ({ data, step }: { data: TurtorialStep; step: number }) => {
  return (
    <div
      className="mt-6 xl:mt-16 break-inside-avoid md:bg-neutral-50 md:px-8 md:py-6 xl:py-10 rounded-2.5xl space-y-4"
      style={{ order: step }}
    >
      <div>
        <p className="uppercase text-subtle-content">Bước {step}</p>
        <h3 className="mt-1 text-xl md:text-s-sm xl:text-s-md">
          <strong>{data.lable}</strong>
        </h3>
      </div>
      <ol className="list-decimal list-inside space-y-2">
        {data.steps.map(({ content, no_list }, index) => {
          return (
            <li className={no_list ? 'list-none text-subtle-content' : undefined} key={index}>
              {content}
            </li>
          );
        })}
      </ol>
      <figure className="block-img block-cinema">
        <img src={data.banner} alt={data.lable} className="rounded-2xl" />
      </figure>
    </div>
  );
};

NumerologySim.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation();
export { getStaticProps };

export default NumerologySim;
