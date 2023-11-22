import API from '../network/API';

export interface simSearchParams {
  columnFilters: ColumnFilters
  extra: Extra
  sort: any[]
  page: number
  pageSize: number
}

export interface dataPackParams {
  columnFilters: ColumnFilters
  sort: any[]
  page: number
  pageSize: number
  lang: number
}

export interface simCategoryParams {
  columnFilters: ColumnFilters
  sort: any[]
  page: number
  pageSize: number
  lang: number
}


export interface ColumnFilters {
  vip?: boolean
  normal?: boolean
  year?: number
  price1?: number
  simCategory?: number
  except?: any[]
  simGroup?: number[]
  price?: number[]
}

export interface Extra {
  price_sort: string
}

const pickSimService = {
  getLuckySim: () => {
    return API.instance.get('random-sim/10');
  },
  fetchSimCategory: (params: simCategoryParams) => {
    return API.instance.post('getMasterData/SimCategory', params);
  },

  fetchSimSearch: (params: simSearchParams) => {
    return API.instance.post('sim_search', params);
  },

  fetchDataPack1: (params: dataPackParams) => {
    return API.instance.post('getMasterData/DataPack1', params);
  }
};

export default pickSimService;
