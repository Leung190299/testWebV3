import { TAB_MENU_SERVICES } from "@/constants/services.constants";
import Routers from "@/routes";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import HeaderMobileWeb from "./header-mobile-web";

const HeaderService = ({ isTop }: { isTop?: boolean }) => {
	const router = useRouter();
	const [isShowVietlott, setIsShowVietlott] = useState(false);

	if (isTop)
	  return (
		<>
		  <HeaderMobileWeb className="bg-neutral-0" title="Dịch vụ số" />
		  <div className="md:mb-2 border-b border-neutral-200 sm:hidden sticky top-16 bg-neutral-0 z-10">
			<div className="tabs -mb-px flex-nowrap md:gap-x-8 gap-x-4 overflow-auto whitespace-nowrap scrollbar-hide">
			  {TAB_MENU_SERVICES.map((tab) =>
				Routers.IFINANCE_VIETLOTT_SERVIVE === tab.path ? (
				  <div
					onClick={() => setIsShowVietlott(true)}
					className={clsx(
					  'tab-bordered border-red-500 border-opacity-0 p-4 text-base tab md:pt-4 pt-0',
					  tab.path == router.pathname && 'tab-active'
					)}
					key={tab.id}
				  >
					{tab.title}
				  </div>
				) : (
				  <Link
					href={tab.path}
					scroll={false}
					className={clsx(
					  'tab-bordered border-red-500 border-opacity-0 p-4 text-base tab md:pt-4 pt-0',
					  tab.path == router.pathname && 'tab-active'
					)}
					key={tab.id}
				  >
					{tab.title}
				  </Link>
				)
			  )}
			</div>
		  </div>
		  {/* <PopupService open={isShowVietlott} setOpen={setIsShowVietlott} handleClose={() => setIsShowVietlott(false)}>
			<ContentVietlott handleClose={() => setIsShowVietlott(false)} />
		  </PopupService> */}
		</>
	  );
	return (
	  <div className="lg:tab lg:py-0 justify-start hidden p-0 px-14 md:flex md:px-0 md:flex-nowrap whitespace-nowrap overflow-auto scrollbar-hide bg-neutral-0">
		{TAB_MENU_SERVICES.map((tab) =>
		  Routers.IFINANCE_VIETLOTT_SERVIVE === tab.path ? (
			<div
			  onClick={() => setIsShowVietlott(true)}
			  className={clsx('p-4 px-8 text-xl font-bold', tab.path == router.pathname ? 'bg-red-500 text-base-100' : 'text-neutral-800')}
			  key={tab.id}
			>
			  {tab.title}
			</div>
		  ) : (
			<Link
			  href={tab.path}
			  scroll={false}
			  className={clsx(
				'p-4 px-8 text-xl font-bold flex flex-col',
				tab.path == router.pathname ? 'bg-red-500 text-base-100 border-b-red-300 border-b-4' : 'text-neutral-800'
			  )}
			  key={tab.id}
			>
			  {tab.title}
			</Link>
		  )
		)}
		{/* <PopupService open={isShowVietlott} setOpen={setIsShowVietlott} handleClose={() => setIsShowVietlott(false)}>
		  <ContentVietlott handleClose={() => setIsShowVietlott(false)} />
		</PopupService> */}
	  </div>
	);
};

export default HeaderService
