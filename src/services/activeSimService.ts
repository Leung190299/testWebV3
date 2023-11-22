import API from '@/network/API';

const activeSimService = {
  checkSeri: (params: activeModal.ParamsActive[]): Promise<activeModal.Response & { result: activeModal.Result }> =>
    API.instance.post('check_msisdn_seri', params),
  ekycCard: (
    params: activeModal.ParamsEKYC,
    payload: activeModal.PayloadEKYC
  ): Promise<activeModal.ResponseEKYC & { result: activeModal.resultEYKC }> => API.instance.post('ovs/ekyc/cards', payload, { params }),
  checkId: (phone: string, id: string): Promise<activeModal.Response> => API.instance.get(`check_id_number/${phone}/${id}`),
  issuedPlace: (params: activeModal.ParamsIssued): Promise<activeModal.ResponseIssued> =>
    API.instance.post('https://app.itel.vn/api/v3/integration-api/pps/issuedPlace ', params),
  faceMatching: (
    params: activeModal.ParamsFace,
    payload: activeModal.PayloadEKYC
  ): Promise<activeModal.ResponseFace & { result: activeModal.ResultFace }> =>
    API.instance.post('/ovs/ekyc/face_matching', payload, { params }),
  registrationForm: (params: activeModal.ParamsForm): Promise<activeModal.ResponseForm> =>
    API.instance.post('pos_sub_registration_form_pdf', params),
  subRegistration: (params: activeModal.ParamsForm): Promise<activeModal.ResponseSub> =>
    API.instance.post('pos_sub_registration', params)

};

export default activeSimService;
