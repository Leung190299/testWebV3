import { API } from '@/network';

const feedBackService = {
  postFeedback: (params: feedBackModal.FeedbackParams): Promise<feedBackModal.response> => API.instance.post('CSKH/saveFeedback',params)
};

export default feedBackService;
