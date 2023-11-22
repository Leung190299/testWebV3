import API from '@/network/API';

const recruitmentService = {
  getListJob: (params: recruitmentModal.ListJobParams): Promise<recruitmentModal.response & { result: recruitmentModal.ListJob }> =>
    API.instance.post('getMasterData/Recruitment', params),
  getJobDetail: (params: recruitmentModal.JobDetailParams): Promise<recruitmentModal.response & { result: recruitmentModal.DetailItem }> =>
    API.instance.post('getMasterData/RecruitmentDetail', params),
  postCV: (params: recruitmentModal.CVParams): Promise<recruitmentModal.response> => API.instance.post('recruitment', params)
};

export default recruitmentService;
