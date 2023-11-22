import { ReactNode } from 'react';
import Slider, { Settings } from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


type props = {
  setting: Settings;
  data: any[];
  renderItem: (item: any) => ReactNode;
  className?: string;
};
const Sliders = ({ setting, className, data, renderItem }: props) => {
  return (
    <div className="relative w-full h-full">
      <Slider {...setting} className={className} useCSS>
        {data.map((item) => renderItem(item))}
      </Slider>
    </div>
  );
};

export default Sliders;
