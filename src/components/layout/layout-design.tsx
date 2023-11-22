import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  title?: string;
  components: { title: string; items: { href: string; title: string }[] }[];
}>;

const LayoutDesign = ({ title, children, components }: Props) => {
  return (
    <main className="w-full">
      <Head>
        <title>{`Components - ${title}`}</title>
      </Head>
      <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100 bg-opacity-90 pl-80 text-base-content backdrop-blur transition-all duration-100">
        <div className="w-full">Menu</div>
      </div>
      <div className="fixed top-0 z-30 h-screen overflow-auto bg-base-200">
        <div className="w-full bg-base-200">
          <div className="hidden px-4 py-2 lg:flex">
            <Link href="/" aria-current="page" aria-label="Homepage" className="flex-0 btn-ghost btn px-2">
              <div className="font-title inline-flex text-xl text-primary transition-all duration-200 md:text-3xl font-itel font-bold">
                <span className="lowercase">itel</span> <span className="uppercase text-base-content">UI</span>
              </div>
            </Link>
          </div>
          <div>
            {components.map(({ items, title }) => {
              return <Menu key={title} title={title} items={items} />;
            })}
          </div>
          <div className="w-80"></div>
        </div>
      </div>
      <div className="pl-80">
        <div className="px-6 pb-16 xl:pr-2">
          <div className="prose max-w-4xl">{children}</div>
        </div>
      </div>
    </main>
  );
};

const Menu = ({ title, items }: { title: string; items: any[] }) => {
  const { asPath } = useRouter();
  return (
    <ul className="menu p-2 font-medium">
      <li></li>
      <li className="menu-title">
        <span className="py-2">{title}</span>
      </li>
      {items.map(({ href, title }, index) => {
        return (
          <li key={index} className={asPath === href ? 'menu-active' : ''}>
            <Link href={href!} locale="vi" className="rounded px-5 py-2 capitalize menu-selected:bg-primary menu-selected:text-base-100">
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default LayoutDesign;
