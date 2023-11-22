const HeaderSkeletonSim = () => {
  return (
    <div
      role="status"
      className="border border-neutral-300 rounded-2xl shadow animate-pulse dark:border-neutral-500 mt-2 bg-neutral-50 w-full h-[200px] md:h-[228px] xl:rounded-2.5xl p-4 md:p-6 xl:pb-10 xl:px-10"
    >
      <div className="md:flex md:h-full ">
        <div className=" md:flex md:flex-col md:justify-between">
          <div className=" h-2 bg-neutral-400 rounded-full dark:bg-neutral-600 w-48 mr-6 mt-3 xl:w-80"></div>
          <div className=" h-6 bg-neutral-400 rounded-full dark:bg-neutral-600 w-40 mr-6 mt-3 xl:w-72 "></div>
          <div className="flex mx-4 mb-5 mt-3 justify-start items-start">
            <div className="w25 px-4 h-2.5 bg-neutral-400 rounded-full dark:bg-neutral-600 mb-2 mr-3 xl:w-20"></div>
            <div className="w25 px-4 h-2.5 bg-neutral-400 rounded-full dark:bg-neutral-600 mb-2 mr-3  xl:w-20"></div>
            <div className="w25 px-4 h-2.5 bg-neutral-400 rounded-full dark:bg-neutral-600 mb-2 mr-3 xl:w-20"></div>
          </div>
        </div>
        <div className="flex md:flex-col md:justify-center ">
          <div className=" h-2 bg-neutral-400 rounded-full dark:bg-neutral-600 w-52 mr-6 mt-3 sm:w-27 xl:w-48 md:ml-20  xl:ml-20"></div>
          <div className=" hidden h-2 bg-neutral-400 rounded-full dark:bg-neutral-600 w-52 mr-6 mt-3 md:w-20 md:block sm:ml-20   xl:ml-20"></div>
          <div className=" hidden h-2 bg-neutral-400 rounded-full dark:bg-neutral-600 w-52 mr-6 mt-3 md:w-20 md:block sm:ml-20  xl:ml-20"></div>
        </div>
        <div className="flex md:flex-col md:justify-center ">
          <div className="h-2 bg-neutral-400 rounded-full dark:bg-neutral-600 w-16 mb-2.5 mr-6 mt-3 md:w-27 md:ml-20  xl:ml-20"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default HeaderSkeletonSim;