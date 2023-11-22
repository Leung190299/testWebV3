import { SimModel } from '@/types/pick-sim';
import API from '../network/API';
import {} from './types';
import { Model } from '@/types/model';

export interface simSearch {
  columnFilters: {};
  page: number;
  pageSize: number;
  sort: any[];
}

export interface modelSimSearch{
    Phone?:          string;
    ListPrice?:      null;
    Price?:          number;
    Pack?:           string;
    PackPrice?:      number;
    Months?:         number;
    EsimPrice?:      number;
    SimPrice?:       number;
    ShipmentFee?:    number;
    Status?:         number;
    SimType?:        number;
    PackCode?:       string;
    group_name?:     string;
    ThoiGianCamKet?: number;
    TotalPrice?:     number;
    ConfigGroupId?:  number;
    Tags?:           any[];
}

const simService = {
  getListSim: (params: string): Promise<SimModel.AuditDBType & { result: Model.SimData[] }> => API.instance.get(`BoiSimBoloc${params}`),
  getDestinyInformation: (params: string):Promise<SimModel.AuditDBType & { result: SimModel.info }> => API.instance.get(`PhongThuySim${params}`),
  getSimSearch: (params: simSearch):Promise<SimModel.AuditDBType & { result: modelSimSearch[] }> => API.instance.post('sim_search', params),

  getLuckySim: (): Promise<SimModel.LuckySimResponseType> => API.instance.get(`random-sim/10`),
  getSimCategory: (params: SimModel.ParamsCategory): Promise<SimModel.CategorySimResponseType> =>
    API.instance.post('getMasterData/SimCategory', params),
  getDataPacks: (params: SimModel.ParamsAudiDB): Promise<SimModel.DataPackResponseType> =>
    API.instance.post('getMasterData/DataPack1', params),
  getSimSearchMaster: (params: SimModel.ParamsSimSearchMaster): Promise<SimModel.SimSearchMasterResponseType> =>
    API.instance.post('sim_search', params),
  getListPackFilter: (params: SimModel.ParamListPack): Promise<SimModel.ListPackResponseType> =>
    API.instance.post('package/get-list-packge', params)
};

export default simService;
