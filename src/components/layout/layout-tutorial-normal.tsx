import { navigations } from '@/components/header';
import Svg from '@/components/icon/svg';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import SectionTutorialBanner from "@/components/section/section-banner-search";

const TUTORIAL_NAVIGATIONS = navigations[5].childs || [];

type PageProps = {
    className?: string;
};
type Props = PropsWithChildren<PageProps>;
const LayoutTutorialNormal: FC<Props> = ({ children, className }) => {
    const router = useRouter();

    return (
        <>
            <SectionTutorialBanner />
            <section className={clsx('bg-neutral-0 md:bg-transparent my-2 md:my-0 bg-main', className)}>
                <div className="container md:pb-12 md:pt-12 xl:pb-14">
                    <div className="flex d-block-mb xl:gap-6">
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
        </>
    );
};

export default LayoutTutorialNormal;
