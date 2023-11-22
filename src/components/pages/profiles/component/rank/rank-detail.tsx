import { RankCard } from '@/components/pages/profiles/component/rank/rank-card';
import { RankBenefit } from '@/components/pages/profiles/component/rank/rank-benefit';

type Props = {};
export const RankDetail = (props: Props) => {
  return (
    <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1 max-lg:gap-y-6 max-lg:gap-x-0 max-md:px-4">
      <div className="...">
        <RankCard />
      </div>
      <div className="col-span-2">
        <RankBenefit />
      </div>
    </div>
  );
};
