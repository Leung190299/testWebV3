import { navigations } from '@/components/header';
import Svg from '@/components/icon/svg';
import SectionTutorialBanner from "@/components/section/section-banner-search";
import SectionQuestions from '@/components/section/section-questions';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';

const TUTORIAL_NAVIGATIONS = navigations[5].childs || [];

type PageProps = {
    className?: string;
};
type Props = PropsWithChildren<PageProps>;
const LayoutTutorialQuess: FC<Props> = ({ children, className }) => {
    const router = useRouter();
    const pages = [
        { name: TUTORIAL_NAVIGATIONS.find(item=>item.href==router.asPath)?.title+'' , href: '#', current: true }
      ];
    return (
        <>
             <div className="bg-neutral-100">
        <Breadcrumbs breadcrumbs={pages} />
      </div>
            <SectionTutorialBanner />
            <section className={clsx('bg-neutral-0 md:bg-transparent my-2 md:my-0 mt-0', className)}>
                <div className="container md:pb-12 md:pt-12 xl:pb-20 wrap-form">
                    <div className="flex xl:gap-6">
                        <div className="hidden xl:block xl:w-[300px] space-y-1">
                            {TUTORIAL_NAVIGATIONS.map((item) => (
                                <Link
                                    href={item.href}
                                    key={item.title}
                                    className={clsx(
                                        'flex items-center group gap-3 rounded-md hover:bg-neutral-0 p-4',
                                        router.asPath == item.href && 'bg-neutral-0'
                                    )}
                                >
                                    {!!item.icon && (
                                        <div className="menu-icon flex items-center justify-center bg-transparent">
                                            <Svg
                                                src={item.icon}
                                                className={clsx('h-8 w-8 group-hover:text-red-500', router.asPath == item.href && 'text-red-500')}
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="font-bold">{item.title}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="flex-1">{children}</div>
                    </div>
                </div>
            </section>
            <SectionQuestions />
        </>
    );
};

export default LayoutTutorialQuess;
