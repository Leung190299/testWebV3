import { Direction } from "@/components/carousel/full-carousel";
import Svg from "@/components/icon/svg";
import SectionSliderStep from '@/components/section/section-slider-step';
import SectionQuestionsTutorial from '@/components/section/section-tutorial';
import { Data, Model } from "@/types/model";
import clsx from 'clsx';
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';

type PageProps = {
    className?: string;
    tutorial: Data.TutorialDetail;
    ads: Model.Ads;
    goBack?: () => void;
};
type Props = PropsWithChildren<PageProps>;
const LayoutTutorialForm: FC<Props> = ({ tutorial, className , ads, goBack}) => {
    const slide = tutorial?.data?.content_step;
    const data = tutorial?.data;
    const scrollRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const onGoBack = () => {
        if (goBack) goBack();
        else router.back();
    };
    function handleNavigate(direction: Direction) {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTo({
            left: scrollRef.current.scrollLeft + scrollRef.current.children[0].clientWidth * direction,
            behavior: 'smooth',
        });
    }

    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const isTop = window.scrollY === 0;

            setIsScrolled(!isTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    // console.log(isScrolled)

    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {
        setIsActive(current => !current);
    };

    return (
        <>
            <div className={isScrolled ? "sticky-top-mobile aaa" : "sticky-top-mobile"}>
                <div className="close-detail">
                    <button type="button" onClick={onGoBack}>
                        <img src="/tutorial/close.png" alt=""/>
                    </button>
                </div>
                <div className="title-detail-mobile">{data.name}</div>
            </div>
            <section className={clsx('bg-neutral-0 my-2 md:my-0 mt-0', className)}>
                <div className="container md:pb-12 md:pt-10 xl:pb-14">
                    <div className="content-detail">
                        <div className="top-detail">
                            {/* <div className="category">{data.category}</div> */}
                            <h1 className='pt-2 pb-2 font-bold'>{data.name}</h1>

                        </div>
                        <div className="step-detail mb-6">
                            <p className='mb-6'>{data.descriptionTitle}</p>
                            {slide && slide.length > 0 && (

                                <div className="container mt-4 md:mt-4 xl:mt-4 ">
                                    <div className="relative -mx-1.5 md:-mx-1.5">
                                    <div className="conten-list-slide">
                                        <div className="flex overflow-auto scrollbar-hide md:py-9 xl:py-8 snap-mandatory snap-x touch-pan-x" ref={scrollRef}>
                                            {slide && slide.length > 0 && slide.map((slide, index) => (
                                                <SectionSliderStep key={index} src={slide.image} name={slide.title}  description={slide.description} index={index} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="absolute arr-slide arr-right top-1/2 right-full -translate-x-4 -translate-y-1/2">
                                            <button
                                                className="border text-neutral-800 btn-circle h-18 w-18 border-neutral-300 bg-neutral-0"
                                                onClick={() => handleNavigate(Direction.PREV)}
                                            >
                                                <Svg src="/icons/line/chevron-left.svg" className="inline h-10 w-10" />
                                            </button>
                                        </div>
                                        <div className="absolute arr-slide arr-left top-1/2 left-full translate-x-4 -translate-y-1/2">
                                            <button
                                                className="border text-neutral-800 btn-circle h-18 w-18 border-neutral-300 bg-neutral-0"
                                                onClick={() => handleNavigate(Direction.NEXT)}
                                            >
                                                <Svg src="/icons/line/chevron-right.svg" className="inline h-10 w-10" />
                                            </button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="txt-detail">
                            <div className="flex flex-wrap">
                                <div className="w-2/3 pr-5">
                                    <div className="detail">

                                        {data.description !== undefined && (
                                            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                                        )}</div>
                                    <div className="download flex p-4 px-6 mt-6 items-center justify-between">
                                        <span className="font-bold">Tải file “Hướng dẫn cách chọn sim số đẹp trên iTel”</span>
                                        <a href="" className='btn-secondary btn rounded-full px-8'>
                                            <img src="/tutorial/download.png" alt=""/>
                                            <span className='pl-2'>Tải file</span>
                                        </a>
                                    </div>
                                    <div className="huuich text-center p-4 mt-6 pt-10">
                                        <span className='block mb-4'>Câu trả lời này có hữu ích với bạn hông? Nói cho iTel nhé</span>
                                        <ul className='items-center justify-center'>
                                            <li><button className={isActive ? 'bg-salmon clc-huuich flex justify-center' : 'clc-huuich flex justify-center'} onClick={handleClick}><img src="/tutorial/emoj-1.png" alt="" className='mr-4' />Không hữu ích</button></li>
                                            <li><button className={isActive ? 'bg-salmon clc-huuich flex justify-center' : 'clc-huuich flex justify-center'} onClick={handleClick}><img src="/tutorial/emoj-2.png" alt="" className='mr-4' />Hữu ích</button></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-1/3 pl-5">
                                    <div className="side-bar-detail top-112">
                                        <div className="content-sidebar relative">
                                            <div className="avarta"><img src={ads.image} alt=""/></div>
                                            <div className="txt-sidebar absolute w-full h-full top-0 left-0 p-12 px-8">
                                                <h3 className='mb-2 font-bold'>{ads.title}</h3>
                                                <p className='mb-8'>{ads.desc}</p>
                                                <div className="btn-bar"><a href='https://itel-web.vercel.app/sim' className='btn-primary btn rounded-full p-4 px-15 md:w-[174px] h-full'>Gét gô!</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <SectionQuestionsTutorial className='bg-neutral-50' />
        </>
    );
};

export default LayoutTutorialForm;
