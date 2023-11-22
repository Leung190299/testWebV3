const BodySkeletonSim = () => {
  const itemSkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div>
      {itemSkeleton.map((value) => (
        <div
          key={value.toString()}
          role="status"
          className=" space-y-4 divide-y divide-neutral-200 rounded shadow animate-pulse dark:divide-neutral-700 md:p-6 dark:border-neutral-700"
        >
          <div className="flex">
            <div>
              <div className=" h-6 bg-neutral-400 rounded-full dark:bg-neutral-600 w-40 mt-3"></div>
              <div className=" h-2 bg-neutral-400 rounded-full dark:bg-neutral-600 w-48 mt-3"></div>
              <div className="flex mx-4 mb-5 mt-3 justify-start items-start">
                <div className="w25 px-4 h-2.5 bg-neutral-400 rounded-full dark:bg-neutral-600 mb-2 "></div>
                <div className="w25 px-4 h-2.5 bg-neutral-400 rounded-full dark:bg-neutral-600 mb-2 ml-2"></div>
                <div className="w25 px-4 h-2.5 bg-neutral-400 rounded-full dark:bg-neutral-600 mb-2 mx-2"></div>
              </div>
              <div className=" h-2 bg-neutral-400 rounded-full dark:bg-neutral-600 w-52 sm:hidden  mt-3"></div>
              <div className="h-2 bg-neutral-400 rounded-full dark:bg-neutral-600 w-16 mb-2.5 sm:hidden mt-3"></div>
            </div>
            <div>
              <div className=" h-2 bg-neutral-400 hidden rounded-full dark:bg-neutral-600 w-40 sm:ml-20 mt-3 sm:block"></div>
              <div className=" h-2 bg-neutral-400 hidden rounded-full dark:bg-neutral-600 w-28 sm:ml-20 mt-3 sm:block"></div>
              <div className=" h-2 bg-neutral-400 hidden rounded-full dark:bg-neutral-600 w-28 sm:ml-20 mt-3 sm:block"></div>
            </div>
            <div className=" h-2 bg-neutral-400 hidden rounded-full dark:bg-neutral-600 w-28 sm:ml-20 mt-3 sm:block"></div>
          </div>
          <div className="flex">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>

          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </div>
  );
};

export default BodySkeletonSim;
