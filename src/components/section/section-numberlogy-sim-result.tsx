import React from 'react';
import { CardSimResult, CardSimResultProps, SimResult } from './section-sim-result';
import Svg from '../icon/svg';

type Props = {
  content?: string;
  number: number;
  attributes?: { title: string; mobileTitle: string; value: string }[];

  bannerTitle?: string;
  bannerDesc?: string;
  type?: 'primary' | 'secondary';
  className?: string;
  onClickDetail?(): void;
} & CardSimResultProps;

const SectionNumberlogySimResult = ({
  number,
  attributes,
  content,
  bannerTitle,
  bannerDesc,
  type,
  className,
  onClickDetail,
  ...rest
}: Props) => {
  const buttonTitle = type == 'primary' ? 'Xem chi tiết' : 'Xem chi tiết thần số học';
  return (
    <section className={'bg-neutral-0 md:bg-transparent ' + (className ?? '')}>
      <div className="container pb-2 pt-4 md:py-0">
        <div className="pb-3 md:pb-0">
          <CardSimResult {...rest} />
        </div>
        <hr className="border-neutral-200 md:hidden" />
        <div className="mt-4 rounded-xl bg-neutral-0 md:p-6 md:pb-4 xl:px-10 xl:pt-8">
          {type === 'primary' && (
            <div className="max-md:hidden">
              <div className="relative h-36 text-neutral-0">
                <img
                  src="/images/banner-numerology-sim.png"
                  alt=""
                  className="absolute top-0 h-full w-full rounded-lg object-cover object-left"
                />
                <div className="relative ml-40 pt-[1.875rem] xl:ml-72 xl:pt-11">
                  <h3 className="font-itel text-h-xs xl:text-h-sm">{bannerTitle}</h3>
                  <p className="mt-2 text-sm xl:text-base">{bannerDesc}</p>
                </div>
              </div>
            </div>
          )}

          <SimResult className={type === 'primary' ? 'md:mt-10' : undefined}>
            <SimResult.Image src="/images/sim-numerology-bg-1.png" alt="Banner" type={type}>
              <div className="text-center font-itel text-neutral-0">
                <span className="font-itel text-h-md font-bold text-neutral-0 md:text-[7rem] md:leading-[7rem] xl:text-[9.75rem] xl:leading-[9.75rem]">
                  {number}
                </span>
                <p className="text-xs md:hidden xl:block md:text-h-xs">Số chủ đạo</p>
              </div>
            </SimResult.Image>
            <SimResult.Attributes>
              {type == 'primary' ? (
                <div className="-mx-1 -mt-2 flex flex-wrap md:-mx-2 md:-mt-4">
                  {attributes?.map(({ title, mobileTitle, value }) => {
                    return (
                      <div key={value} className="mt-2 w-1/2 px-1 md:mt-4 md:w-full md:px-2 xl:w-1/2">
                        <p className="text-subtle-content hidden xl:block">{title}</p>
                        <p className="text-xs text-subtle-content xl:hidden">{mobileTitle}</p>
                        <p className="mt-1 text-sm font-medium md:text-base">{value}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  <div className="max-md:hidden">
                    <div className="text-xl font-bold">Số chủ đạo số {number}</div>
                    <hr className="border-neutral-200 mt-4" />
                  </div>
                  <div className="-mx-2 flex flex-wrap -mt-4 md:mt-0">
                    {attributes?.map(({ title, mobileTitle, value }) => {
                      return (
                        <div key={value} className="mt-2 w-1/2 px-1 md:mt-4 md:w-1/4 md:px-2">
                          <p className="text-subtle-content hidden xl:block">{title}</p>
                          <p className="text-xs text-subtle-content xl:hidden">{mobileTitle}</p>
                          <p className="mt-1 text-sm font-medium md:text-base">{value}</p>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </SimResult.Attributes>
            <SimResult.Content title={type === 'primary' ? 'Tóm tắt' : 'Luận giải'} type={type}>
              {content}
            </SimResult.Content>
            <SimResult.Action>
              <div className="mt-4">
                <button type="button" className="btn-ghost hover:bg-transparent btn btn-sm px-0 gap-2" onClick={onClickDetail}>
                  {buttonTitle}
                  <Svg src="/icons/bold/arrow-right.svg" className="h-4 w-4" />
                </button>
              </div>
            </SimResult.Action>
          </SimResult>
        </div>
      </div>
    </section>
  );
};

export default SectionNumberlogySimResult;
