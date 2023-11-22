import { navigations } from '@/components/header/header-default';
import LayoutDefault from '@/components/layout/layout-default';
import { NextPage } from 'next';
import Link from 'next/link';

const SiteMap: NextPage = () => {
  return (
    <div className="container">
      <div className='w-full py-4 border-b'>
        <h2 className='text-2xl font-bold'>Bản Đồ Trang Web Của Itel</h2>
      </div>
      <div className="order-2 mt-6  flex-1 grid-cols-1 md:grid-cols-4 md:gap-x-6 md:gap-y-12 xl:grid">
        {navigations.map(({ id, childs, title }, index) => {
          return (
            <div key={id} className={[5, 6, 7].includes(index) ? 'row-span-2' : undefined}>
              <button className="flex w-full items-center justify-between dark:text-neutral-0 border-neutral-200 p-4 max-md:border-b md:mb-4 md:p-0">
                <h2 role="button" className="select-none font-bold">
                  {title}
                </h2>
              </button>
              <ul className="overflow-hidden text-sm font-medium text-subtle-content transition-all duration-500 ease-out md:block">
                {childs &&
                  childs.map(({ title, href }, index) => {
                    return (
                      <li key={index} className="p-4 md:p-0 md:pb-4">
                        <Link href={href || '/'} className="hover:underline">
                          {title}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

SiteMap.getLayout = function layout(page: any) {
  return <LayoutDefault isHomePage>{page}</LayoutDefault>;
};

export default SiteMap;
