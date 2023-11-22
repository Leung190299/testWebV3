import { NameDelivery } from '@/constants/checkout.constants';
import CartService from '@/services/cartService';
import type { Location } from '@/types/location';
import { sleep } from '@/utilities/time';
import axios from 'axios';
import { useEffect, useState } from 'react';

const locationFetcher = axios.create({
  baseURL: 'https://vn-public-apis.fpo.vn/'
});
locationFetcher.interceptors.response.use((d) => d.data);

export const useProvinces = () => {
  const [provinces, setProvinces] = useState<Location.Province[]>([]);

  useEffect(() => {
    locationFetcher
      .get<never, Location.Response<Location.Province>>('/provinces/getAll', { params: { limit: -1 } })
      .then((d) => setProvinces(d.data.data))
      .catch(() => void 0);
  }, []);
  return provinces;
};
// export const useDistricts = (province?: string | number) => {
//   const [districts, setDisctricts] = useState<Location.District[]>([]);

//   useEffect(() => {
//     if (province) {
//       setDisctricts([]);
//       locationFetcher
//         .get<never, Location.Response<Location.District>>('/districts/getByProvince', {
//           params: {
//             provinceCode: province,
//             limit: -1
//           }
//         })
//         .then((d) => setDisctricts(d.data.data))
//         .catch(() => void 0);
//     }
//   }, [province]);
//   return districts;
// };
// export const useWards = (district?: string | number) => {
//   const [wards, setWards] = useState<Location.Ward[]>([]);
//   useEffect(() => {
//     if (district) {
//       setWards([]);
//       locationFetcher
//         .get<never, Location.Response<Location.Ward>>('/wards/getByDistrict', {
//           params: { districtCode: district, limit: -1 }
//         })
//         .then((d) => setWards(d.data.data))
//         .catch(() => void 0);
//     }
//   }, [district]);
//   return wards;
// };

export const useVillages = (ward?: string | number) => {
  const [villages, setVillages] = useState<Location.Village[]>([]);
  useEffect(() => {
    if (ward) {
      setVillages([]);
      (() =>
        sleep(500).then(() =>
          setVillages([
            {
              _id: '123',
              code: 'BS',
              isDeleted: false,
              name: 'Bằng Sở',
              name_with_type: 'Thôn Bằng Sở',
              slug: 'thon_bang_so',
              type: ''
            },
            { _id: '123123', code: 'SH', isDeleted: false, name: 'Sở Hạ', name_with_type: 'Thôn Sở Hạ', slug: 'thon_bang_so', type: '' },
            {
              _id: '1234',
              code: 'XD3',
              isDeleted: false,
              name: 'Xâm Dương 3',
              name_with_type: 'Thôn Xâm Dương 3',
              slug: 'thon_xam_duong_3',
              type: ''
            },
            { _id: '12345', code: 'DL', isDeleted: false, name: 'Đại Lộ', name_with_type: 'Thôn Đại Lộ', slug: 'thon_dai_lo', type: '' }
          ])
        ))();
    }
  }, [ward]);
  return villages;
};

export const useStoreLocation = () => {
  const [stores, setStores] = useState<Location.Store[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const param: cartModel.ParamDelivery = {
          columnFilters: {},
          sort: [],
          page: 1,
          pageSize: 1000,
          lang: 1
        };
        const res = await CartService.getStores(param);
        if (res.code == 200) {
          setStores(res.result.map((item) => ({ name: item.Name, address: item.Address, id: item.Id })));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return stores;
};

export const useCities = () => {
  const [cities, setCities] = useState<cartModel.ResultDelivery[]>([]);
  useEffect(() => {
    (async () => {
      const param: cartModel.ParamDelivery = {
        columnFilters: {},
        sort: [],
        page: 1,
        pageSize: 1000,
        lang: 1
      };
      const res = await CartService.getDelivery(param, NameDelivery.cities);
      if (res.code == 200) {
        setCities(res.result.map((item)=>({...item,name:item.text})));
      }
    })();
  }, []);
  return cities;
};

export const useDistricts = (CityId?: number) => {
  const [districts, setDistricts] = useState<cartModel.ResultDelivery[]>([]);
  useEffect(() => {
    (async () => {
      if (CityId) {
        const param: cartModel.ParamDelivery = {
          columnFilters: {
            CityId
          },
          sort: [],
          page: 1,
          pageSize: 1000,
          lang: 1
        };
        const res = await CartService.getDelivery(param, NameDelivery.districts);
        if (res.code == 200) {
          setDistricts(res.result.map((item)=>({...item,name:item.text})));
        }
      }
    })();
  }, [CityId]);
  return districts;
};
export const useWards = (DistrictId?: number) => {
  const [wards, setWards] = useState<cartModel.ResultDelivery[]>([]);
  useEffect(() => {
    (async () => {
      if (DistrictId) {
        const param: cartModel.ParamDelivery = {
          columnFilters: {
            DistrictId
          },
          sort: [],
          page: 1,
          pageSize: 1000,
          lang: 1
        };
        const res = await CartService.getDelivery(param, NameDelivery.wards);
        if (res.code == 200) {
          setWards(res.result.map((item)=>({...item,name:item.text})));
        }
      }
    })();
  }, [DistrictId]);
  return wards;
};
export const useHamlets= (WardId?: number) => {
  const [hamlets , setHamlets] = useState<cartModel.ResultDelivery[]>([]);
  useEffect(() => {
    (async () => {
      if (WardId) {
        const param: cartModel.ParamDelivery = {
          columnFilters: {
            WardId
          },
          sort: [],
          page: 1,
          pageSize: 1000,
          lang: 1
        };
        const res = await CartService.getDelivery(param, NameDelivery.hamlet);
        if (res.code == 200) {
          setHamlets(res.result.map((item)=>({...item,name:item.text})));
        }
      }
    })();
  }, [WardId]);
  return hamlets;
};
