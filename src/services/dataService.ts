import { API } from '@/network';

type Props = {
  getListPack: (param: dataModel.ParamPack) => Promise<dataModel.Response<dataModel.Pack[]>>;
  checkPhonePack: (parm: dataModel.paramCheckPack) => Promise<dataModel.Response<dataModel.resultPack>>;
  getListPackNew: () => Promise<dataModel.Response<dataModel.Pack[]>>;
  getOTP: (phone: string) => Promise<dataModel.Response<any>>;
  registerPack: (param: dataModel.paramRegister) => Promise<dataModel.Response<any>>;
  suggestion: (param: dataModel.paramSuggestion) => Promise<dataModel.Response<dataModel.Pack[]>>;
  getDetaiPack: (param: string) => Promise<dataModel.Response<dataModel.Pack[]>>;
};
const dataService: Props = {
  getListPack: (param) => API.instance.post('package/get-list-packge', param),
  checkPhonePack: (param) => API.instance.post('package/checkPackage', param),
  getListPackNew: () => API.instance.get('package/get-package-outstanding'),
  getOTP: (phone) => API.instance.get(`package/otp-package/${phone}`),
  registerPack: (param) => API.instance.post('package/registerPackage', param),
  suggestion: (param) => API.instance.post('package/get-package-suggest', param),
  getDetaiPack:(param)=>API.instance.get(`package/get-pack-detail/${param}`)
};

export default dataService;
