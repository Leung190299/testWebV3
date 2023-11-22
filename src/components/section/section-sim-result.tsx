import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

type CardType = 'primary' | 'secondary';

type Props = {
  imageTitle?: string;
  content?: string;
  attributes?: { label: string; value: string }[];

  bannerTitle?: string;
  bannerDesc?: string;

  type?: CardType;
  className?: string;
  onClickDetail?(): void;
} & CardSimResultProps;

const SectionGeoSimResult = ({
  imageTitle,
  type = 'primary',
  attributes,
  bannerDesc,
  bannerTitle,
  content,
  onClickDetail,
  className,
  ...rest
}: Props) => {
  const buttonTitle = type == 'primary' ? 'Xem chi tiết' : 'Xem chi tiết giải mệnh';
  return (
    <section className={'bg-neutral-0 md:bg-transparent mt-4' + (className ?? '')}>
      <div className="container pb-2 pt-4 md:py-0">
        <div className="pb-3 md:pb-0">
          <CardSimResult {...rest} />
        </div>
        <hr className="border-neutral-200 md:hidden" />
        <div className="mt-4 rounded-xl bg-neutral-0 md:p-6 md:pb-4 xl:px-10 xl:pt-8">

            <div className="max-md:hidden">
              <div className="relative h-36 text-neutral-0">
                <img
                  src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1686046611/itel/images/679141790ab52cc991ce7c1121bd1b7e_u6gzra.png"
                  className="absolute h-full w-full rounded-lg object-cover object-right"
                  alt="background"
                />
                <img
                  src="/images/apple.png"
                  className="absolute bottom-0 left-2 object-cover object-right xl:left-11"
                  style={{ height: '9.375rem' }}
                  alt="somthing"
                />
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    className="absolute right-0 object-cover h-[130%] hidden md:block"
                    src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1686046603/itel/images/d1b0f07371b92a72a45639e7833f8c27_p5on7u.png"
                    alt="ddsaassdasd"
                  />
                </div>
                <div className="relative ml-40 pt-[1.875rem] xl:ml-72 xl:pt-8">
                  <h3 className="font-itel text-h-xs xl:text-h-sm">{bannerTitle}</h3>
                  <p className="mt-2 text-sm xl:text-base">{bannerDesc}</p>
                </div>
              </div>
            </div>

          {/* <SimResult className={type === 'primary' ? 'md:mt-10' : undefined}>
            <SimResult.Image src="/images/sim-bg-1.png" alt="" type={type}>
              {type === 'primary' ? (
                <div className="whitespace-pre text-center font-itel text-h-xxs font-bold text-modern-red md:text-h-md xl:text-h-lg">
                  {imageTitle?.replaceAll(' ', '\n')}
                </div>
              ) : (
                <div className="whitespace-pre text-center font-itel text-h-xxs font-bold text-modern-red md:text-h-xs xl:text-h-sm">
                  {imageTitle?.replaceAll(' ', '\n')}
                </div>
              )}
            </SimResult.Image>
            <SimResult.Attributes>
              {type === 'primary' ? (
                <div className="-mx-2 -mt-2 flex flex-wrap md:-mt-4">
                  {attributes &&
                    attributes?.map(({ label, value }) => {
                      console.log(value);
                      return (
                        <div key={value} className="mt-2 w-full px-2 md:mt-4 xl:w-1/2">
                          <p className="text-subtle-content max-md:hidden">{label}</p>
                          <p className="text-sm font-medium md:mt-1 md:text-base">{value}</p>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <>
                  <div className="max-xl:hidden">
                    <div className="text-xl font-bold">Thành đầu thổ - Đất trên thành</div>
                    <hr className="border-neutral-200 mt-4" />
                  </div>
                  <div className="-mx-2 flex flex-wrap -mt-4 xl:mt-0">
                    {attributes?.slice(0, 3).map(({ label, value }) => {
                      return (
                        <div key={value} className="mt-2 w-full px-2 md:mt-4 xl:w-1/3">
                          <p className="text-subtle-content max-md:hidden">{label}</p>
                          <p className="text-sm font-medium md:mt-1 md:text-base">{value}</p>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </SimResult.Attributes>
          </SimResult> */}
        </div>
      </div>
    </section>
  );
};

export type CardSimResultProps = { title: string; queries?: React.ReactNode[]; onChange?(): void };
export const CardSimResult = ({ title, queries, onChange }: CardSimResultProps) => {

  return (
    <div className="flex items-center rounded-2xl bg-neutral-0 md:px-6 md:py-4">
      <div className="flex flex-1 items-center truncate whitespace-nowrap font-bold">
        <h1 className="mr-3 max-md:sr-only">{title}:</h1>
        <p className="truncate flex flex-wrap">
          {queries
            ?.map((q, index) => <span key={index}>{q}</span>)
            .reduce(
              (cur, prev, index) =>
                [
                  cur,
                  <span className="mx-1.5 font-medium text-neutral-500 md:mx-3" key={'separate_' + index}>
                    |
                  </span>,
                  prev
                ] as any
            )}
        </p>
      </div>
      <button type="button" className="btn-secondary btn btn-sm rounded-full" onClick={onChange}>
        Đổi tra cứu
      </button>
    </div>
  );
};

const SimResult = ({ children, className, ...rest }: JSX.IntrinsicElements['div']) => {
  return (
    <div className={clsx('grid grid-cols-[max-content,1fr]', className)} style={{ gridTemplateRows: 'max-content auto 1fr' }}>
      {children}
    </div>
  );
};
SimResult.Image = function SimResultImage({
  children,
  src,
  alt,
  type = 'primary'
}: PropsWithChildren<{ src?: string; alt?: string; type?: CardType }>) {
  return (
    <div className="row-span-3">
      <div
        className={clsx(
          'mr-4 w-[6.5rem] xl:mr-10',
          type === 'primary' ? 'md:mr-8 md:w-64 xl:w-[22rem]' : 'md:mr-6 md:w-[8.5rem] xl:w-[17.25rem]'
        )}
      >
        <figure className="block-img block-square center-by-grid">
          <img src={src} alt={alt} className="rounded-lg object-cover md:rounded-2xl" />
          <div className="absolute ">{children}</div>
        </figure>
      </div>
    </div>
  );
};
SimResult.Attributes = function SimResultAttributes({ children }: PropsWithChildren) {
  return <div className="col-start-2 row-start-1">{children}</div>;
};
SimResult.Content = function SimResultContent({
  children,
  title,
  type = 'primary'
}: PropsWithChildren<{ title: string; type?: CardType }>) {
  return (
    <div className="col-span-2 col-start-1 row-start-4 max-md:hidden xl:col-start-2 xl:row-start-2">
      <div className="mt-4">
        <div className="text-neutral-500">{title}</div>
        <div className={clsx('mt-2 font-medium md:rounded-lg', type === 'primary' ? 'bg-neutral-100 p-4' : '')}>{children}</div>
      </div>
    </div>
  );
};
SimResult.Action = function SimResultAction({ children }: PropsWithChildren) {
  return <div className="col-start-1 xl:col-start-2 col-end-3">{children}</div>;
};
export { SimResult };
export default SectionGeoSimResult;
