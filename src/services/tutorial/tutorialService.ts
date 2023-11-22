import API from '@/network/API';

const tutorialService = {
    getlistTutorial: (params: tutorialModal.params) : Promise<tutorialModal.response & {result: tutorialModal.listTutorial[]}> =>
    API.instance.post('getMasterData/RelatedFaq', params),
    getlistCategory: (params: tutorialModal.params) : Promise<tutorialModal.response & {result: tutorialModal.listCategory[]}> =>
    API.instance.post('getMasterData/FaqCategory', params),
    putFaqLike: (Id: number) : Promise<tutorialModal.response> => API.instance.put('masterData/FaqLike', {Id}),
    putFaqDisLike: (Id: number) : Promise<tutorialModal.response> => API.instance.put('masterData/FaqDisLike', {Id}),  
};

export default tutorialService;