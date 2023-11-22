import { modal, useModal } from '@/libs/modal';
import { CustomElementProps } from '@/types/element-type';
import { PropsWithChildren, ReactNode } from 'react';
import HeaderAppDefault from '../header/header-app-default';
import Svg from '../icon/svg';
import clsx from 'clsx';

type Props = {
  title: string;
  subtitle?: ReactNode;
  desc?: string;
  options: string[];
  badgets?: { name: string; href?: string; img?: string }[];
  banner?: string;

  privacy?: string;

  isContinue?: boolean;
};

const ModalAdventise = function ({ title, banner, children }: PropsWithChildren<{ title: string; banner?: string }>) {
  const { close } = useModal();
  return (
    <div className="md:px-20 md:pt-12 md:pb-[4.5rem] xl:p-0 xl:flex md:relative">
      <HeaderAppDefault type="fixed" mode="close" title={title} />
      <div className="max-md:hidden absolute top-4 right-4">
        <button className="btn-tertiary btn btn-circle z-50 bg-neutral-100" type="button" onClick={close}>
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      </div>
      <div className="w-full xl:w-[42.625rem] flex-shrink-0">
        <div className="block-img block-square">
          <img src={banner} alt={title} className="object-cover md:rounded-2xl xl:rounded-none" />
        </div>
      </div>
      <div>{children}</div>
      {/* <div className="p-4 md:p-0 md:pt-8 xl:p-10 xl:pr-12 flex flex-col"></div> */}
    </div>
  );
};
type HeadingProps = CustomElementProps<
  'div',
  {
    title: string;
    subtitle?: React.ReactNode;
    desc?: string;
  }
>;
ModalAdventise.Heading = function ModalAdventiseHeading(props: HeadingProps) {
  const { title, subtitle, desc, ref, ...rest } = props;
  return (
    <div {...rest}>
      {typeof subtitle === 'string' ? <p className="text-subtle-content">{subtitle}</p> : subtitle}
      <h2 className="flex items-end mt-1 text-s-sm md:text-s-md">
        <b>{title}</b>
      </h2>
      {desc && <p className="text-subtle-content mt-1">{desc}</p>}
    </div>
  );
};
ModalAdventise.Actions = function ModalAdventiseActions(
  props: CustomElementProps<
    'button',
    {
      desc?: string;
      onClick?(): void;
      children?: React.ReactNode;
    }
  >
) {
  const { className, children, desc, ref, ...rest } = props;

  return (
    <div className={clsx('mt-8 md:mt-10 text-center', className ?? 'xl:text-left')}>
      <button className="btn md:btn-lg btn-primary rounded-full w-full md:w-[14.5rem]" {...rest}>
        {children}
      </button>
      <p className="mt-4 md:mt-3 text-subtle-content text-sm" dangerouslySetInnerHTML={{ __html: desc || '' }}></p>
    </div>
  );
};

const ModalContent = ({ title, desc, options, subtitle, banner, privacy, badgets, isContinue }: Props) => {
  const { close } = useModal();

  return (
    <ModalAdventise title={title} banner={banner}>
      <div className="p-4 md:p-0 md:pt-8 xl:p-10 xl:pr-12 flex flex-col h-full">
        <ModalAdventise.Heading title={title} subtitle={subtitle} />
        <div className="flex-1">
          {badgets && (
            <div className="mt-4 flex">
              {badgets.map(({ name, href, img }) => (
                <div key={name} className="flex-1 text-center">
                  <div className="w-12 md:w-16 mx-auto">
                    <div className="block-img block-square">
                      <img src={img || banner} alt={name} className="rounded-full overflow-hidden" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-bold whitespace-pre">{name}</p>
                </div>
              ))}
            </div>
          )}
          {desc && <p className="md:text-lg mt-6 font-bold">{desc}</p>}
          <ul className="mt-4 space-y-4 text-sm md:text-base">
            {options.map((text, index) => (
              <li key={index} className="flex items-start">
                <Svg src="/icons/bold/tick-circle.svg" className="text-pink mr-2 flex-shrink-0" width={24} height={24} />
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
        <ModalAdventise.Actions onClick={close} desc={privacy}>
          <span className="max-md:hidden">{isContinue ? 'Tiếp tục' : 'Vay ngay'}</span>
          <span className="md:hidden">Tiếp tục</span>
        </ModalAdventise.Actions>
      </div>
    </ModalAdventise>
  );
};

const options: (Props & { type: string })[] = [
  {
    type: 'trip',
    banner: '/images/service/popupVnTrip.png',
    title: 'Deal khủng mùa thu - Vi vu khắp chốn cùng iTel x Vntrip',
    subtitle: 'iTel Du Lịch',
    desc: 'Ưu đãi dành riêng cho iTel Club-er',
    options: [
      'Sản phẩm áp dụng: Vé máy bay, phòng khách sạn, Combo đồng gia của Vntrip',
      'Bạn sẽ được chuyển đến màn hình đặt phòng, vé máy bay của Công ty TNHH Công nghệ VNTRIP. ',
      'Hoàn đến 20% thanh toán qua thẻ'
    ]
  },
  {
    type: 'bank',
    banner: 'https://res.cloudinary.com/dvqbggeri/image/upload/v1688463190/itel/d7900081d006b867fb93981921aa42d1_ec4cdy.png',
    title: 'Mở tài khoản OCB, nhận quà lên đến 100.000 triệu!',
    subtitle: 'iTel Du Lịch',
    desc: 'Ưu đãi dành riêng cho iTel Club-er',
    options: [
      'Bạn sẽ được chuyển hướng sang màn hình của VIB',
      'VIB (Ngân hàng Thương mại Cổ phần Quốc tế) cung cấp sản phẩm/dịch vụ tài chính - ngân hàng giúp khách hàng và đối tác một cách minh bạch, thuận tiện, hiệu quả.',
      'Hoàn đến 20% thanh toán qua thẻ'
    ],
    badgets: [{ name: 'Thanh toán \nnhanh chóng' }, { name: 'Bảo mật \ntuyệt đối' }, { name: 'Miễn phí \nthường niên' }]
  }
];

export const showModalBanner = (type = 'tpbank') => {
  let option: any = {
    options: []
  };
  if (type === 'tpbank') {
    option.subtitle = (
      <div className="flex items-end mb-3 md:mb-4">
        <Svg src="/logo/logo-color.svg" width={78} height={32} className="text-red-500" />
        <b className="leading-4">x TPBANK</b>
      </div>
    );
    option.banner = 'https://res.cloudinary.com/dt1oay7cv/image/upload/v1686907840/itel/banner/dbb351ef80f488dc2d9493dcbb6245f4_cpyfut.png';
    option.title = 'iTel hợp tác cùng TPBank cung cấp gói vay trả góp';
    option.description = 'Ưu đãi dành riêng cho iTel Club-er';
    option.options = [
      'TPBank (Ngân hàng Thương mại Cổ phần Tiên Phong) cung cấp gói vay trả góp dành cho khách hàng của iTel một cách minh bạch, thuận tiện, hiệu quả.',
      'Việc vay sẽ được thực hiện trên nền tảng TPBank 4CUST',
      'Mọi thông tin cung cấp đều được bảo mật tuyệt đối'
    ];
    option.privacy =
      'Bằng việc bấm <b>Yêu cầu vay trả góp</b>, bạn đã đồng ý để iTel chia sẻ thông tin cho đối tác TPBank để thực hiện khoản vay';
  } else {
    const ops = options.filter((op) => op.type === type);
    option = ops[Math.floor(Math.random() * ops.length)];
    option.privacy = 'Bằng việc bấm <b>Tiếp tục</b>, bạn sẽ được chuyển sang trang đối tác của iTel.';
    option.isContinue = true;
  }
  modal.open({
    render: <ModalContent {...option} />,
    classNameContainer: 'modal-full md:modal-bottom-sheet xl:modal-middle xl:mx-6',
    classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50',
    className: 'modal-box xl:p-0 xl:max-w-[79.5rem]',
    transition: false
  });
};
export default ModalAdventise;
