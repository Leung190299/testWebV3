import Routers from '@/routes/routers';
import clsx from 'clsx';
import Svg from '../icon/svg';
import Schema from '../seo/Schema';

export type BreadcrumbItem = {
  name: string;
  href: string;
  current?: boolean;
};

type BreadcrumbProps = {
  breadcrumbs: BreadcrumbItem[];
  className?: string;
};


const Breadcrumbs = ({ breadcrumbs, className }: BreadcrumbProps) => {
  return (
    <>
    <nav className="flex container py-4" aria-label="Breadcrumb ">
      <ol role="list" className={clsx('flex items-center gap-2 whitespace-nowrap', className)}>
        <li>
          <div>
            <a href={Routers.HOME} className="flex items-center text-xs md:text-sm font-medium text-neutral-500">
              <span>Trang chủ</span>
            </a>
          </div>
        </li>
        {breadcrumbs.map((item, index, breadcrumbs) => (
          <li key={item.name}>
            <div className="flex items-center">
              <div className="flex h-6 md:w-6 items-center justify-center">
                <Svg src="/icons/bold/breadcrumbs-arrow.svg" className="h-3 w-2" />
              </div>
              <a
                href={item.href}
                className={`line-clamp-1 ml-2 text-xs md:text-sm font-medium ${
                  index + 1 === breadcrumbs.length ? 'text-neutral-800' : 'text-neutral-500'
                }`}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
      </nav>
      <Schema type='Breadcrumb' page={breadcrumbs.map(item=>item.name)}/>
    </>
  );
};

export default Breadcrumbs;
