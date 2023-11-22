import { Data, Model } from '@/types/model';

const getListXu = (): Promise<Data.IzuiCheckinList> => {
  const res: Model.IzuiCheckin[] = [
    { id: 1, title: 'Hôm nay', value: 50, state: 1 },
    { id: 2, title: 'Ngày 2', value: 50, state: 0 },
    { id: 3, title: 'Ngày 3', value: 50, state: 0 },
    { id: 4, title: 'Ngày 4', value: 50, state: 0 },
    { id: 5, title: 'Ngày 5', value: 50, state: 0 },
    { id: 6, title: 'Ngày 6', value: 50, state: 0 },
    { id: 7, title: 'Ngày 7', value: 50, state: 0 }
  ];
  return Promise.resolve({ data: res });
};

const IwowIzuiServices = { getListXu };

export default IwowIzuiServices;
