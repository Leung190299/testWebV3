import useSimAction from '@/store/cart/hooks/sim';

import Pagination from '../pagination/Pagination';
import SimItem from './sim-item';
type Props = {
  data: UpdateInfoModel.resultSim[];
  page: number;
};
const ListSim = (props: Props) => {
  const { data, page } = props;
  const { handleAddToCart } = useSimAction();

  return (
    <section className="mt-11">
      <div className="container">
        <div className="md:bg-neutral-0 rounded-2xl">
          <div className="md:mx-2">
            <table className="w-full md:table">
              <thead className="hidden md:table-header-group">
                <tr className="text-left text-sm font-medium">
                  <td className="table-cell py-4 pl-4 pr-3 xl:py-6">SỐ SIM</td>
                  <td className="table-cell px-3 py-4 xl:py-6"></td>
                  <td className="table-cell px-3 py-4 xl:py-6">GIÁ TIỀN</td>
                </tr>
                <tr>
                  <th colSpan={33} className="" aria-colspan={12}>
                    <hr className="-mx-2 border-neutral-300" />
                  </th>
                </tr>
              </thead>
              <tbody className="block align-top md:table-row-group">
                {data && data.map((item, index) => <SimItem key={index} item={item} />)}
              </tbody>
            </table>
          </div>
        </div>
        <div className="my-8">{page > 0 && <Pagination pageCount={page} />}</div>
      </div>
    </section>
  );
};

export default ListSim;
