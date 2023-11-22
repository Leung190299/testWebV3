import clsx from 'clsx';
import { useRouter } from 'next/router';

type props = {
  title?: string;
  step: number;
  steps: string[];

};

const StepSim = ({ title, step, steps }: props) => {
  const router = useRouter();
  const onGoBack = () => router.back();

  return (
    <div className="container bg-neutral-0 md:bg-transparent">
      <div className="flex py-6 justify-center">
        <div className="flex-1 md:flex hidden items-center  ">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-tertiary text-4xl font-normal whitespace-nowrap transition-default text-base-content bg-transparent border-transparent "
            onClick={()=>onGoBack()}
          >
            &lt;
          </button>
          <h2 className={clsx(' pointer-events-none font-itel', 'transition-colors flex-1 text-3xl uppercase select-none truncate')}>
            {title ? (
              <b>
                {title}
              </b>
            ) : (
            <b >
              {' '}
              {step}. {steps[step - 1].replaceAll('<br>','')}
            </b>
            )}
          </h2>
        </div>
        <div className="flex justify-center items-start md:items-center">
          {Array.from({ length: steps.length }, (_, index) => index + 1).map((item) => (
            <>
              <div className="hidden md:flex items-center">
                <div
                  className={clsx('py-3 px-5 rounded-[18px] ', item <= step ? 'bg-modern-red' : 'bg-neutral-100 md:bg-neutral-0')}
                  key={item}
                >
                  <span className={clsx(item <= step ? 'text-neutral-0' : 'text-neutral-300','text-center block')} dangerouslySetInnerHTML={{__html:item == step ? steps[step - 1] : item}}></span>
                </div>
                <div
                  className={clsx(
                    'w-12 h-1',
                    item < step ? 'bg-modern-red' : 'bg-neutral-100 md:bg-neutral-0',
                    item == steps.length ? 'hidden' : 'block'
                  )}
                ></div>
              </div>
              <div className="md:hidden flex">
                <div className="flex flex-col  justify-start items-center">
                  <div
                    className={clsx(
                      'py-3 px-5 min-w-[50px] rounded-[18px] flex justify-center items-center',
                      item <= step ? 'bg-modern-red' : 'bg-neutral-100 md:bg-neutral-0'
                    )}
                    key={item}
                  >
                    <span className={clsx(item <= step ? 'text-neutral-0 ' : 'text-neutral-300', 'text-center')}>{item}</span>
                  </div>

                  <span
                    className={clsx(item <= step ? 'text-[#aa182c]' : 'text-neutral-300', 'text-center text-xs mt-1')}
                    dangerouslySetInnerHTML={{ __html: steps[item - 1] }}
                  />
                </div>
				<div
                  className={clsx(
                    'w-12 h-1 mt-6',
                    item < step ? 'bg-modern-red' : 'bg-neutral-100 md:bg-neutral-0',
                    item == steps.length ? 'hidden' : 'block'
                  )}
                ></div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepSim;
