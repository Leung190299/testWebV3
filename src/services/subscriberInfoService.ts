import API from '@/network/API';

const subscriberInfoService = {
    checkSubRegistration: (params:string): Promise<subInfoRegistrationModal.Response & {result: subInfoRegistrationModal.Result}> => API.instance.get(`check_sub_registration/${params}`),
    updateInfoForm: (params: activeModal.ParamsForm): Promise<activeModal.ResponseForm> =>
    API.instance.post('pos_sub_update_info_form_pdf', params),
    getOTP: (params: string): Promise<subInfoRegistrationModal.ResponeOTP> => API.instance.get(`sent_otp_update/${params}`),
    subUpdateInfo: (params: activeModal.ParamsForm): Promise<subInfoRegistrationModal.ResponseSubInfo> => API.instance.post('pos_sub_update_info',params)
};

export default subscriberInfoService;