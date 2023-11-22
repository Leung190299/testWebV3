import NewService, { Blog } from '@/services/newService';
import { useEffect, useState } from 'react';

const NewsHome = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const getListBlog = async () => {
    try {
      const paramsBlog = {
        columnFilters: { BlogCategoryId: 9 },
        sort: [],
        page: 1,
        pageSize: 9,
        lang: 1
      };
      const res = await NewService.getListBlog(paramsBlog);
      if (res.code == 200) {
        setBlogs(res.result.ListFeatureBlog!);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListBlog();
  }, []);
  return (
    <section className="bg-neutral-200">
      <div className="container py-[120px]">
        <h2 className="section-title">
          <span className="">TIN TỨC NÓNG HỔI</span>
          <br />
          <span className="text-primary">KHÁM PHÁ INEWS</span>
        </h2>

        <div className=" hidden md:grid  grid-cols-[2fr_1fr_2fr] grid-rows-3 gap-x-9 gap-y-3 mt-16">
          {blogs.slice(0, 4).map((blog) => (
            <div key={blog.Id} className="first:col-span-2 first:row-span-full first:flex-col flex group gap-4">
              <div className="group-first:w-full group-first:h-auto overflow-hidden rounded-xl w-[257px]  aspect-photo ">
                <img className=" w-full hover:scale-110 transition-default object-cover h-full " src={blog.Thumbnail} alt={blog.Thumbnail} />
              </div>
              <div className="flex-1 py-2">
                <h3 className='text-neutral-900 text-lg font-medium '>{blog.Title}</h3>
                <p>
                  {blog.Tagging}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="  mt-4 md:hidden">
          {blogs.slice(0, 4).map((blog) => (
            <div key={blog.Id} className="flex-col flex group gap-4">
              <div className="w-full group-first:h-auto overflow-hidden rounded-xl aspect-photo ">
                <img className=" w-full hover:scale-110 transition-default object-cover h-full " src={blog.Thumbnail} alt={blog.Thumbnail} />
              </div>
              <div className="flex-1 py-2">
                <h3 className='text-neutral-900 text-lg font-medium '>{blog.Title}</h3>
                <p>
                  {blog.Tagging}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsHome;
