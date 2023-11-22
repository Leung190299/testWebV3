import { ReactNode } from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import Svg from '../icon/svg';

const Pagination = (props: ReactPaginateProps) => {
  function replaceText(text: string, insert: string, index: number) {
    var prefix = text.substring(0, index);
    var postfix = text.substring(index + 1, text.length);

    return prefix + insert + postfix;
  }
  const formatNumberPage = (page: number): ReactNode => {
    if (typeof window != 'undefined' && innerWidth <= 768 && page.toString().length >= 4) {
      return <>{replaceText(page.toString(), '..', 1)}</>;
    }
    return <>{page}</>;
  };
  return (
    <ReactPaginate
      {...props}
      pageLabelBuilder={formatNumberPage}
      className="relative flex items-center  justify-center gap-2 md:gap-3   flex-wrap"
      breakLinkClassName="h-7 block w-7 text-xs md:flex md:text-base md:h-12 md:w-12 rounded-lg border justify-center box-border   items-center   text-center border-neutral-300 py-1"
      pageLinkClassName="h-7 block w-7 text-xs md:flex  md:text-base md:h-12 md:w-12 rounded-lg border justify-center box-border   items-center  text-center  border-neutral-300 py-1"
      activeLinkClassName="bg-red-600 border-red-600 text-base-100"
      pageRangeDisplayed={2}
      nextLabel={<Svg src="/icons/line/chevron-right.svg" className="inline h-6 w-6 md:h-10 md:w-10" />}
      previousLabel={<Svg src="/icons/line/chevron-right.svg" className="inline h-6 w-6 md:h-10 md:w-10 rotate-180" />}
    />
  );
};

export default Pagination;
