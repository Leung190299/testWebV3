import news from '@/mock/news.json';
import type { Model } from '@/types/model';

const CATEGORY: Model.INewsCategory[] = [
  {
    path: 'all',
    name: 'Tất cả',
    routeName: ''
  },
  {
    path: 'itel',
    name: 'Tin iTel',
    routeName: 'NEWS_ITEL'
  },
  {
    path: 'active',
    name: 'Tin hành động',
    routeName: 'NEWS_ACTIVE'
  },
  {
    path: 'service',
    name: 'Tin dịch vụ',
    routeName: 'NEWS_SERVICE'
  },
  {
    path: 'video',
    name: 'Video',
    routeName: 'NEWS_VIDEO'
  }
];

export interface INews {
  id: string;
  name: string;
  image: string;
  categories: string[];
  des: string;
  date: string;
}

class NewsService {
  getAllCategory = () => {
    return CATEGORY;
  };

  getCategoryByPath = (path: string) => {
    return CATEGORY.find((cate) => cate.path === path);
  };

  getNewsDetailById = (id: string) => {
    return news.find((newsItem) => newsItem.id === id);
  };

  async getNews({ limit }: { limit: number }): Promise<INews[]> {
    const listNews = await news.slice(0, limit);
    if (!listNews) return [];

    return listNews;
  }
}

const newsService = new NewsService();
export default newsService;
