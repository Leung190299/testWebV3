import Digitalservice from '@/services/Digitalservice';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import Svg from '../icon/svg';

type IProps = {
  itemService: digitalservice.itemService;
};
const ContentService = ({ itemService }: IProps) => {
  const [pY, setPY] = useState(0);
  const [link, setlink] = useState<string>('');
  const [animation, setAnimation] = useState<boolean>();

  useEffect(() => {
    const getlinkUrl = async (link: string) => {
      let res = await Digitalservice.getLinkUrl(link);
      if (res.code == 200) {
        setlink(res.result);
      }
    };
    if (itemService.linkApi) {
      getlinkUrl(itemService.linkApi || '');
      return;
    }
    setlink(itemService.link || '');
  }, [itemService]);

  const converStringDescriptron = (description: string): ReactNode =>
    description.split('<br>').map((item: string, index: number) => (
      <div className="flex gap-2 items-center md:items-start" key={index}>
        <div className="md:pt-[2px]">
          <Svg src="/icons/bold/check.svg" className="bg-pink aspect-square rounded-full w-5 p-[2px]" />
        </div>
        <p>{item}</p>
      </div>
    ));

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' }
  };

  return (
    <>

    <div
      onScroll={(e) => setPY(e.currentTarget.scrollTop)}
      className={clsx(pY && 'z-20', 'fixed top-0 left-0 h-screen md:h-auto overflow-auto  md:static')}
    >
      <div className={pY ? 'flex w-full md:hidden sticky top-0 left-0 z-10 bg-neutral-0' : 'hidden'}>
        <div className="flex justify-center relative w-full py-4">
          <Svg src="/icons/line/close.svg" className="absolute left-4 top-5 w-6 h-6" />
          <h1 className="text-[18px] text-neutral-800 font-bold line-clamp-1 px-14">{itemService.label}</h1>
        </div>
      </div>
      <div className="lg:container lg:grid grid-flow-col lg:p-0">
        <div className="xl:aspect-[2/2] aspect-[2/1] lg:aspect-photo-vertical">
          <img src={itemService.img} alt="" className="w-full lg:h-full object-fill md:rounded-2xl lg:rounded-none" />
        </div>
        <div className="lg:px-10 overflow-hidden  lg:py-10 pt-0 lg-pt-10 px-4 md:p-0">
          <div className="md:text-base text-sm text-neutral-500 flex flex-col gap-1 md:mt-8 mt-4 lg:mt-0">
            <p>{itemService.label}</p>
            <h1 className="font-bold md:text-[32px] text-2xl text-neutral-800 leading-tight">{itemService.title}</h1>
          </div>
          <div className={animation ? 'hidden' : 'block'}>
            <motion.div variants={variants} animate={!animation ? 'open' : 'closed'}>
              <div className="mt-6 md:text-base text-sm text-neutral-800">
                <h1 className="md:text-xl text-base font-medium">Ưu đãi dành riêng cho iTel Club-er </h1>
                <div className="flex flex-col gap-5 mt-4">
                  {converStringDescriptron(itemService.description || '')}
                  {itemService.subDescription && (
                    <div className="flex gap-2 items-center md:items-start">
                      <div className="md:pt-[2px]">
                        <Svg src="/icons/bold/check.svg" className="bg-pink aspect-square rounded-full w-5 p-[2px]" />
                      </div>
                      <p>
                        {itemService.description!.split('<br>').length + 1}. Lưu ý: Thông tin chi tiết về điều kiện và điều khoản dịch vụ vui
                        lòng xem{' '}
                        <b className="text-primary cursor-pointer" onClick={() => setAnimation(true)}>
                          tại đây
                        </b>
                        .
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
          <div className={!animation ? 'hidden' : 'block'}>
            {itemService.subDescription && (
              <motion.div variants={variants} animate={animation ? 'open' : 'closed'}>
                <div className="mt-6 md:text-base text-sm text-neutral-800">
                  <h1 className="md:text-xl text-base font-medium">Điều kiện và điều khoản dịch vụ </h1>
                  <div className="flex flex-col gap-5 mt-4">{converStringDescriptron(itemService.subDescription || '')}</div>
                  <div className="ml-auto text-primary max-w-fit cursor-pointer font-bold" onClick={()=>setAnimation(false)}> Quay lại</div>
                </div>
              </motion.div>
            )}
          </div>
          <div className="flex flex-col lg:items-start items-center lg:relative w-full md:px-0 px-4 py-10 lg:py-0">
            <button
              className="btn btn-primary rounded-full px-16 lg:mt-10 mt-3 md:text-base md:py-4 text-sm py-3 w-full md:w-fit h-fit"
              onClick={() => {
                document.location.href = link;
              }}
            >
              Tiếp tục
            </button>
            <p className="mt-3 text-neutral-500 text-sm text-center pb-6">
              Bằng việc bấm <b>Tiếp tục</b>, bạn sẽ được chuyển sang trang đối tác của iTel.
            </p>
          </div>
        </div>
      </div>
      </div>
      </>
  );
};

export default ContentService;
