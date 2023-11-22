const Skeleton = () => {
  const itemSkeleton = [1, 2, 3, 4, 5, 6];
  return (
    <div className="flex gap-14 gap-y-2 flex-wrap">
      {itemSkeleton.map((value) => (
        <div
          key={value}
          role="status"
          className="max-w-sm border border-neutral-300 rounded-3xl shadow animate-pulse dark:border-neutral-500 mt-6 bg-neutral-50 w-full"
        >
          <div className=" flex items-center rounded-t-3xl bg-neutral-100 dark:bg-neutral-400 w-full h-20">
            <div className=" h-6 bg-neutral-400 rounded-full dark:bg-neutral-600 w-48 mx-6"></div>
          </div>
          <div className="flex items-center h-48 mb-4 bg-neutral-50 rounded dark:bg-gray-700">
            <div className="mb-5 rounded-2xl bg-transparent p-0 md:bg-neutral-200 md:p-3 xl:p-4 w-full mx-6">
              <div className="flex mx-4 mb-9">
                <div className="w-1/3 px-4 h-2.5 bg-neutral-400 rounded-full dark:bg-neutral-600 mb-2 mx-3"></div>
                <div className="w-1/3 px-4 h-2.5 bg-neutral-400 rounded-full dark:bg-neutral-600 mb-2 mx-3"></div>
                <div className="w-1/3 px-4 h-2.5 bg-neutral-400 rounded-full dark:bg-neutral-600 mb-2 mx-3"></div>
              </div>
              <div className="h-2.5 bg-neutral-400 rounded-full dark:bg-neutral-600 w-28 m-3 "></div>
              <div className="h-2 bg-neutral-400 rounded-full dark:bg-neutral-600  m-3 "></div>
            </div>
          </div>
          <div className="h-2 bg-neutral-400 rounded-full dark:bg-neutral-600 w-16 mb-2.5 mx-6"></div>
          <div className="px-4 md:px-5 xl:px-6">
            <div className="flex items-center justify-between border-t border-neutral-200 py-3 md:py-4"></div>
            <div className="h-2 bg-neutral-400 rounded-full dark:bg-neutral-600 w-20 mb-8"></div>
          </div>

          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
