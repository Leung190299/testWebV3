import jobs from '@/mock/jobs.json';
import news from '@/mock/news.json';

export interface IJob {
  id: number;
  jobTitle: string;
  jobDes: string;
  salary: string;
  jobType: string;
  location: string;
  isNew?: boolean;
  isHot?: boolean;
  status?: string;
}

const jobInfo = {};

export interface IJobDetail extends IJob {}

class RecruitmentService {
  getListJob(params: recruitmentModal.ListJobParams) {
    throw new Error('Method not implemented.');
  }
  async searchJobs({ limit }: { limit: number }): Promise<IJob[]> {
    const listJobs = await jobs.slice(0, limit);
    if (!listJobs) return [];

    return listJobs;
  }

  getById = (id: number) => {
    return jobs.find((job) => job.id === id);
  };
}

const recruitmentService = new RecruitmentService();
export default recruitmentService;
