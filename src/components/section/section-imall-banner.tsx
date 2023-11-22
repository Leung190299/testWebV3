import useSlider from '@/hooks/useSlider';
import { Settings } from 'react-slick';
import Sliders from '../sliders';

type Props = {};

const SectionImallBanner = ({}: Props) => {
  const TOTAL_SLIDE_BANNER = 3;
  const slider = useSlider({ totalSlide: TOTAL_SLIDE_BANNER });

  const settings: Settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 0,
          speed: 500,
          autoplaySpeed: 3000,
          autoplay: true,
          pauseOnHover: false
        }
      }
    ]
  };

  return (
    // <div className="block-img block-cinema md:block-banner overflow-hidden rounded-2xl" data-theme="dark">
    //   <FullCarousel index={slider.index} numItems={TOTAL_SLIDE_BANNER} onSlide={slider.onSlide}>
    //     <FullCarouselItem direction={-slider.direction} index={slider.index} variants={variantsTranslateWithoutOpacity}>
    //        <img
    //         src="/images/home/banner-min.png"
    //         loading="lazy"
    //         draggable={false}
    //         className="h-full w-full select-none object-cover"
    //         alt="banner"
    //       />
    //     </FullCarouselItem>
    //   </FullCarousel>
    //   <div className="absolute bottom-3 z-10 w-full">
    //     <PaginationBullets active={slider.index} total={TOTAL_SLIDE_BANNER} onClick={slider.onChange} />
    //   </div>
    // </div>
    <Sliders
      data={['/images/imall/Banner-Reno8-T-5G-Front.png', '/images/imall/Banner-OPPO-Enco-Air3.png','/images/imall/Banner-Reno8-T-5G-Back.png','/images/imall/Banner-Baseus.png' ]}
      setting={settings}
      className="data--slider__container -mt-10"
      renderItem={(item: string) => (
        <div className=" bg-modern-red rounded-2xl overflow-hidden aspect-[3/1] max-h-[318px] ">
          <img
            src={item}
            loading="lazy"
            draggable={false}
            className="h-full  w-full select-none object-cover "
            alt="banner"
          />
        </div>
      )}
    />
  );
};

export default SectionImallBanner;
