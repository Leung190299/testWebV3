import NewService, { Blog } from '@/services/newService';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const NewsSidlerBar = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const getListBlog = async () => {
    try {
      const paramsBlog = {
        columnFilters: { BlogCategoryId: 9 },
        sort: [],
        page: 1,
        pageSize: 3,
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
    <div className='mt-4'>
      <div className='text-lg font-bold mb-1'>Bài viết nổi bật</div>
      <div className='w-full flex flex-col gap-2'>

        {blogs.slice(0,3).map((blog) => (
          <div key={blog.Id} className="flex-col flex group">
            <div className="w-full  overflow-hidden rounded-xl  aspect-photo ">
              <Image className=" w-full hover:scale-110 transition-default object-cover h-full " width={300} height={200} priority src={blog.Thumbnail!} alt={blog.Thumbnail!} />
            </div>
            <div className="flex-1 py-2">
					<h3 className="text-neutral-900 text-base font-bold ">{blog.Title}</h3>

              <p className='text-neutral-400'>{blog.Tagging}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSidlerBar;
