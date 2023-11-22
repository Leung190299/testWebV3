import { Data, Model } from '@/types/model';
import shorts from '@/mock/shorts.json';
import { ImageService } from '../image/image';
import voucher from '@/mock/voucher.json';

import vouchers from '@/mock/vouchers.json';
const _voucher = vouchers[0];

type ParamsGetList<> = {
  limit: number;
  page?: number;
};

const getListVoucher = ({ limit = 10, page = 1 }: ParamsGetList): Promise<Data.Vouchers> => {
  if (page * limit > 20) return Promise.resolve({ data: [], page }); // fake limit page, items
  const res: Model.Voucher[] = Array(limit)
    .fill(null)
    .map((e, i) => {
      return {
        id: Number(`${page}${i}`),
        long: '22 ngày',
        point: 200,
        from: '4/5/2023, 3:47:03 PM',
        ..._voucher
      };
    });

  return Promise.resolve({ data: res, page });
};

const getListVoucherHOT = ({ limit = 6, page = 1 }: ParamsGetList): Promise<Data.VouchersHOT> => {
  if (page * limit > 20) return Promise.resolve({ data: [], page }); // fake limit page, items
  const res: Model.VoucherHOT[] = Array(limit)
    .fill(null)
    .map((e, i) => {
      return {
        id: Number(`${page}${i}`),
        time: '5/6/2023, 3:47:03 PM',
        img: ImageService.random(),
        title: 'Đóng cửa chặt vào, Suzume!',
        brand: 'iTel Phim',
        genre: 'Phim mới'
      };
    });

  return Promise.resolve({ data: res, page });
};

const getListShort = ({ limit = 6, page = 1 }: ParamsGetList): Promise<Data.Shorts> => {
  if (page * limit > 20) return Promise.resolve({ data: [], page }); // fake limit page, items
  const res: Model.Short[] = Array(limit)
    .fill(null)
    .map((e, i) => {
      const index = Math.floor(Math.random() * 4);
      return {
        id: Number(`${page}${i}`),
        date: '5/6/2023, 3:47:03 PM',
        thumbnail: shorts[index].thumnail,
        title: `Văn hóa Người iTel ${i}`,
        desc: 'Mô tả',
        source: shorts[index].source
      };
    });

  return Promise.resolve({ data: res, page });
};

type ParamsGetDetail = {
  id: number;
};
const find = ({ id }: ParamsGetDetail): Promise<Model.Voucher> => {
  const res: Model.Voucher = {
    id: id,
    point: 888,
    long: '',
    ..._voucher
  };

  return Promise.resolve(res);
};
const list = ({ limit }: { limit: number }) => {
  return Promise.resolve(
    Array.from({ length: limit }, (_, id) => ({
      id,
      point: 888,
      long: '',
      ..._voucher
    }))
  );
};

const getDetailVoucher = ({ id }: ParamsGetDetail): Promise<Data.VoucherDetail> => {
  const res: Data.VoucherDetail = {
    id: id,
    expired_at: '5/6/2023, 3:47:03 PM',
    banner: ImageService.random(),
    brand: _voucher.brand,
    avaiable_from: '4/5/2023, 3:47:03 PM',
    secondary_title: _voucher.secondary_title,
    logo: ImageService.random(),
    title: voucher.title,
    long: '22 ngày',
    point: 200,
    discount: 50,
    from: '4/5/2023, 3:47:03 PM',
    typeName: 'UrBox Voucher',
    infomationHTML: voucher.infomationHTML,
    require: {
      descHTML: voucher.require.descHTML
    }
  };

  return Promise.resolve(res);
};

const vouchersServices = { getListVoucher, find, getDetailVoucher, getListVoucherHOT, getListShort };
export const VouchersServices = { list, find };
export default vouchersServices;
