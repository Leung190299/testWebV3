import CardSimDestiny from '@/components/card/card-sim-destiny';
import CardTutorialPickSim from '@/components/card/card-tutorial-pick-sim';
import Drag from '@/components/drag/drag';
import Svg from '@/components/icon/svg';
import SectionSupports from '@/components/section/section-supports';
import QualitySimCard from '@/components/sim/quality-sim-card';
import SearchForm from '@/components/sim/SearchForm';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import Head from 'next/head';

import HeaderWebDefault from '@/components/header/header-web-default';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import { fengShuiTabs, SimQuery } from '@/constants/sim.constants';
import { simOption } from '@/mock/sim';
import Routers from '@/routes/routers';
import Link from 'next/link';
import { useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import clsx from 'clsx';

const cardSim = [
  {
    id: 1,
    image: '/images/sim-image-3.png',
    title: 'Sim Gia đạo tình duyên',
    description: 'Kích tình duyên sinh vượng đón duyên mới, bồi đắp tình sâu nghĩa nặng ngăn chừng sự chia lìa, tan vỡ tình cảm đôi lứa'
  },
  {
    id: 2,
    image: '/images/sim-image-4.png',
    title: 'Sim Đại cát',
    description:
      'Khi năng lượng sinh khí của con số sinh vượng ắt tạo được phúc lộc vĩnh trinh cho người may mắn sở hữu. SIM Đạt cát thu hút may mắn và mang lại cát khí tốt lành.'
  },
  {
    id: 3,
    image: '/images/sim-image-5.png',
    title: 'Sim Công danh',
    description:
      'Kích công danh sự nghiệp, hội tụ năng lượng con số đầy đủ yếu tố VẬN - DANH - TÀI thâu tóm ý nghĩa hút tài vượng sinh quan, chức trọng quyền cao trên áp đảo vạn người, xoay chuyển để đón công thành danh toại'
  },
  {
    id: 4,
    image: '/images/sim-image-3.png',
    title: 'Sim Tài lộc',
    description:
      'Tài là gốc, là nguồn nuôi sống vận mệnh con người. Tài vận tới yên dân lạc nghiệp, của cải dồi dào, tiền bạc đầy kho, phúc lộc lâu bền, cuộc đời hạnh phúc. Tài vận gặp bại vận tiền của đi dần, tai vạ bất ngờ, khuynh gia bại sản. Do đó, bất kể ai, cương vị nào không biết cầu thụ thông suốt, kích hoạt tài vận thì ấy là cuối đời cũng khó phát tài, hiển vinh.'
  },
  {
    id: 5,
    image: '/images/simHoa.png',
    title: 'Sim Mệnh hoả ',
    description: 'Kích tình duyên sinh vượng đón duyên mới, bồi đắp tình sâu nghĩa nặng ngăn chừng sự chia lìa, tan vỡ tình cảm đôi lứa'
  },
  {
    id: 6,
    image: '/images/simThuy.png',
    title: 'Sim Mệnh thuỷ',
    description:
      'Khi năng lượng sinh khí của con số sinh vượng ắt tạo được phúc lộc vĩnh trinh cho người may mắn sở hữu. SIM Đạt cát thu hút may mắn và mang lại cát khí tốt lành.'
  },
  {
    id: 7,
    image: '/images/simMoc.png',
    title: 'Sim Mệnh mộc',
    description:
      'Kích công danh sự nghiệp, hội tụ năng lượng con số đầy đủ yếu tố VẬN - DANH - TÀI thâu tóm ý nghĩa hút tài vượng sinh quan, chức trọng quyền cao trên áp đảo vạn người, xoay chuyển để đón công thành danh toại'
  },
  {
    id: 8,
    image: '/images/simKim.png',
    title: 'Sim Mệnh kim',
    description:
      'Tài là gốc, là nguồn nuôi sống vận mệnh con người. Tài vận tới yên dân lạc nghiệp, của cải dồi dào, tiền bạc đầy kho, phúc lộc lâu bền, cuộc đời hạnh phúc. Tài vận gặp bại vận tiền của đi dần, tai vạ bất ngờ, khuynh gia bại sản. Do đó, bất kể ai, cương vị nào không biết cầu thụ thông suốt, kích hoạt tài vận thì ấy là cuối đời cũng khó phát tài, hiển vinh.'
  },
  {
    id: 9,
    image: '/images/simTho.png',
    title: 'Sim Mệnh thổ',
    description:
      'Tài là gốc, là nguồn nuôi sống vận mệnh con người. Tài vận tới yên dân lạc nghiệp, của cải dồi dào, tiền bạc đầy kho, phúc lộc lâu bền, cuộc đời hạnh phúc. Tài vận gặp bại vận tiền của đi dần, tai vạ bất ngờ, khuynh gia bại sản. Do đó, bất kể ai, cương vị nào không biết cầu thụ thông suốt, kích hoạt tài vận thì ấy là cuối đời cũng khó phát tài, hiển vinh.'
  }
];

const GeoSim: NextPage = ({ router }) => {
  const refDiv = useRef<HTMLDivElement>(null);
  const ref = useRef(null);

  //@ts-ignore
  const Next = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={clsx(
          'before:hidden btn btn-circle w-10 h-10 right-[-40px]  border border-neutral-300 bg-neutral-0 hover:bg-neutral-50 !flex',
          className
        )}
        style={{ ...style }}
        onClick={onClick}
      >
        <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2 text-overlay-popup" />
      </div>
    );
  };
  //@ts-ignore
  const Prev = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={clsx(
          'before:hidden rotate-180 btn btn-circle w-10 h-10 left-[-55px] border border-neutral-300 bg-neutral-0 hover:bg-neutral-50 !flex',
          className
        )}
        style={{ ...style }}
        onClick={onClick}
      >
        <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2 text-overlay-popup" />
      </div>
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Next />,
    prevArrow: <Prev />,
    responsive: [
      {
        breakpoint: 820,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots:true
        }
      }
    ]
  };
  const handleClickScroll = () => {
    if (refDiv.current) {
      window.scrollTo({
        top: refDiv.current.offsetTop - 300,
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Head>
        <title>Sim phong thủy</title>
      </Head>
      <HeaderWebDefault title="Sim phong thuỷ" type="fixed" withMenu />
      <div className="bg-neutral-0 xl:pb-28">
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
                  <Link href={router.asPath}>Sim phong thủy</Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section
          id="search-form"
          className="relative h-full bg-cover bg-left md:bg-neutral-100 md:pb-11 md:pt-20 xl:bg-[url('/images/bannerFongShiu.png')] xl:py-10"
        >
          <div
            ref={refDiv}
            className="absolute left-0 right-0 top-0 h-[40%] w-full bg-[url('/images/bannerTabletFongShiu.png')] bg-cover bg-center md:h-[70%] xl:hidden"
          />
          <div className="relative flex h-full flex-col justify-between gap-6 md:container md:flex-col xl:flex-row pt-20 ml:pt-0">
            <div className="flex h-full flex-col justify-center md:w-full xl:w-[55%]">
              <div className="text-center md:text-start xl:mt-[16%]">
                <div className="image-title mb-1 text-neutral-0">sim phong thủy số đẹp</div>
                <div className="mb-12 text-base font-medium text-neutral-0 md:mb-2 md:text-2xl md:font-bold xl:mb-12">
                  Hợp Bản mệnh - Thuận Công danh
                </div>
                <div className="hidden text-sm font-normal text-neutral-0 md:block">
                  <strong>SIM Phong thủy</strong> là dãy số cân bằng âm dương, ngũ hành tương sinh, quẻ dịch, phù hợp với mục đích của người
                  dùng dựa vào bát tự ngày sinh và giờ sinh. <strong>SIM Phong thủy</strong> sẽ tốt hơn khi có con số thu hút vượng khí,
                  điểm phong thủy và tổng số nút cao.
                </div>
              </div>
            </div>
            <div className="w-full md:w-full xl:w-[47%]">
              <SearchForm tabs={fengShuiTabs} tabIndex={SimQuery.Basic} />
            </div>
          </div>
        </section>
        <section className="bg-neutral-100 px-4 py-6 md:py-16 xl:py-28">
          <div className="section-title-sub mb-1 w-[80%] md:w-full">
            Chọn SIM theo <span className="text-red-500">bản mệnh</span>
          </div>
          <div className="mx-auto mb-6 text-center text-sm font-normal text-neutral-500 md:mb-14 xl:text-base xl:font-medium">
            Lựa chọn sim phong thủy hợp mệnh sẽ mang ý nghĩa bổ trợ, bù khuyết thiếu ngũ hành trong bát tự <br /> ngày sinh và mang lại
            trường khí tốt lành.
          </div>
          <div className="mb-0 container flex items-center justify-center gap-4 text-start md:mb-14">
            <Slider ref={ref} {...settings} className="w-full">
              {/* <Drag className="flex w select-none overflow-auto scrollbar-hide">
                <div className="flex items-center justify-center gap-8 md:px-10 xl:px-0"> */}
              {cardSim.map((card) => (
                <CardSimDestiny key={card.id} image={card.image} title={card.title} description={card.description} />
              ))}
              {/* </div>
              </Drag> */}
            </Slider>
          </div>
          <div className="hidden justify-center md:flex">
            <button className="btn-primary btn btn-lg w-[15.5rem] rounded-full" onClick={handleClickScroll}>
              Chọn số hợp tuổi
            </button>
          </div>
        </section>
        <section className="bg-neutral-0 py-6 md:py-16 xl:py-28">
          <div className="container flex w-full flex-col justify-center md:gap-10 xl:flex-row xl:gap-6">
            <div className="flex flex-col justify-start md:w-full md:items-center xl:w-1/2 xl:items-start">
              <div>
                <div className="section-title-sub mb-1 xl:mx-0 xl:text-start">
                  <span className="text-red-500 ">Hướng dẫn</span> chọn <br /> sim phong thủy
                </div>
                <p className="mb-6 text-center text-base font-normal text-neutral-500 md:mb-10 xl:mb-36 xl:text-start">
                  Để Thần Sim iTel giúp bạn lựa chọn Sim Phong thuỷ như ý
                </p>
              </div>
              <CardTutorialPickSim
                label="Tiêu chí lựa chọn"
                title="Sim phong thủy được luận theo các thuyết phong thủy nào?"
                image="/images/sim-destiny-1.png"
              >
                <>
                  <div className="mb-2 text-base font-bold">04 tiêu chí quan trọng để luận giải và lựa chọn sim phong thuỷ phù hợp:</div>
                  <ul className="mb-2 ml-3 text-base font-normal text-neutral-500">
                    <li className="flex items-start justify-start gap-3">
                      <div className="mt-[0.625rem]">
                        <div className="h-1 w-1 rounded-full bg-neutral-500" />
                      </div>
                      <div>
                        <span className="font-bold">Ngũ hành sinh mệnh:</span> Trong ngũ hành có tương sinh, tương khắc. Khi chọn sim cần
                        lấy sim có ngũ hành tương sinh, tương hỗ với bản mệnh chủ nhân. Bên cạnh đó cần đảm bảo yếu tố bổ khuyết tứ trụ, tức
                        là ngũ hành của sim bổ khuyết cho ngũ hành tứ trụ (ngày, giờ, tháng, năm sinh) của người dùng sim.
                      </div>
                    </li>
                    <li className="flex items-start justify-start gap-3">
                      <div className="mt-[0.625rem]">
                        <div className="h-1 w-1 rounded-full bg-neutral-500" />
                      </div>
                      <div>
                        <span className="font-bold">Tổng số nút cao:</span> Số nút cao thì sim có nhiều vượng khí. Do đó, khi chọn sim cần
                        xem tổng điểm dãy số. Số điện thoại có sự xuất hiện của các cặp số đẹp lại càng thêm tốt.
                      </div>
                    </li>
                    <li className="flex items-start justify-start gap-3">
                      <div className="mt-[0.625rem]">
                        <div className="h-1 w-1 rounded-full bg-neutral-500" />
                      </div>
                      <div>
                        <span className="font-bold">Vân Cát - Hung:</span> Dựa vào 81 linh số để tra cứu được số điện thoại là Cát hay Hung,
                        ý nghĩa đại cát mang lại nguồn năng lượng cát khí mạnh mẽ, mọi việc hanh thông
                      </div>
                    </li>
                    <li className="flex items-start justify-start gap-3">
                      <div className="mt-[0.625rem]">
                        <div className="h-1 w-1 rounded-full bg-neutral-500" />
                      </div>
                      <div>
                        <span className="font-bold">Hành quẻ bát quái: </span>Khi xem bói sim theo kinh dịch, nếu quẻ dịch của số điện thoại
                        là quẻ cát thì dãy số sẽ được đánh giá cao hơn về mặt phong thủy.
                      </div>
                    </li>
                  </ul>
                  <div className="text-base font-bold">
                    Nếu chấm điểm sim theo 4 yếu tố trên đều cho kết quả tốt thì đây là sim phong thủy lý tưởng, mang tới mọi điều tốt lành
                    cho chủ nhân
                  </div>
                </>
              </CardTutorialPickSim>
            </div>
            <div className="flex flex-col md:gap-16 md:w-full xl:w-1/2 gap-6 mt-6 md:mt-0">
              <CardTutorialPickSim label="Ý nghĩa" title="Sim phong thủy mang ý nghĩa gì?" image="/images/sim-destiny-2.png">
                <>
                  <div className="mb-2 text-base font-normal text-neutral-500">
                    <span className="font-bold">
                      Mang đến tài lộc, may mắn trong mọi mặt cho chủ nhân: Vạn vật từ khi sinh ra đều mang con số đặc trưng với những ý
                      nghĩa riêng biệt.
                    </span>{' '}
                    <br />
                    Việc mỗi người biết tận dụng con số gắn liền với bản mệnh của mình sẽ dễ dàng có được sự như ý trong cuộc sống và sự
                    nghiệp.
                  </div>
                  <div className="text-base font-normal">
                    <span className="font-bold">“Vật phẩm phong thuỷ" hộ thân cho người sở hữu.</span> Sim phong thủy là dãy số cân bằng âm
                    dương, ngũ hành tương sinh, quẻ dịch phù hợp với mục đích của người dùng dựa vào bát tự ngày sinh và giờ sinh.
                  </div>
                </>
              </CardTutorialPickSim>
              <CardTutorialPickSim label="Hướng dẫn" title="Hướng dẫn chọn Sim phong thủy hợp tuổi" image="/images/sim-destiny-3.png">
                <>
                  <div className="tex-base mb-2 font-bold">Chọn Sim theo ngày giờ sinh</div>
                  <div className="text-base font-normal text-neutral-500">
                    Nhập ngày/tháng/năm sinh, giờ sinh và giới tính. iTel sẽ đưa ra danh sách Sim phong thủy phù hợp nhất, sắp xếp mặc định
                    theo điểm phong thủy giảm dần. Bạn có thể lựa chọn những Sim được phân loại sẵn theo các bộ Sim Tài Lộc, Đại Cát, Gia
                    đạo tình duyên, ... trong các kết quả đã đề xuất.
                  </div>
                  <div className="tex-base my-2 font-bold">Chấm điểm phong thủy theo số điện thoại</div>
                  <div className="text-base font-normal text-neutral-500">
                    Nhập Số điện thoại Nhập thông tin ngày/tháng/năm sinh, giờ sinh và giới tính Hệ thống dựa trên các thông tin của khách
                    hàng để luận giải 4 yếu tố có phù hợp về mặt phong thủy với chủ nhân hay không. Từ đó đưa ra các gợi ý về số điện thoại
                    khác phù hợp hơn, mang lại nhiều may mắn và tài lộc.
                  </div>
                </>
              </CardTutorialPickSim>
            </div>
          </div>
          <div className="md:mt-10 mt-6 flex justify-center">
            <button className="btn-primary btn btn-lg rounded-full" onClick={handleClickScroll}>
              Khám phá ngay!
            </button>
          </div>
        </section>
        <section className="bg-neutral-50 md:py-16 xl:py-28 py-6">
          <QualitySimCard simOption={simOption} />
        </section>
        <SectionSupports />
      </div>
    </>
  );
};

GeoSim.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation();
export { getStaticProps };

export default GeoSim;
