import Images from '@/components/imasge';
import { Data } from '@/types/model';

export const VoucherDetail = (data: itelClubModel.Content) => {
  return (
    <div className="mt-8 rounded-lg flex relative  bg-neutral-50">
      <Images
        source={Object.keys(data.images_rectangle!).map((key) => ({
          media: `(max-width:${key}px)`,
          //@ts-ignore
          srcSet: img[key]
        }))}
        src={data.images_rectangle!['640']}
        className={'aspect-square w-[108px] rounded-l-lg object-cover'}
      />

      <div className="absolute bottom-0 left-0">
        <div className="tag tag-vector tag-md h-auto bg-gradient-to-r from-yellow-500 to-red-500 p-2 text-xs font-bold">Giảm 50k</div>
      </div>
      <div className={'mx-4 my-3 w-full'}>
        <div className={'flex flex-col gap-y-1'}>
          <div className={'flex'}>
            <div className={'text-neutral-800 font-bold block grow'}>
              <p>The Coffee House</p>
              <p> 50.000đ</p>
            </div>
          </div>

          <div className={'text-neutral-500 block'}>
            <p>HSD: 28/02/2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};
