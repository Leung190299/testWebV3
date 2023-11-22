import React, { useRef } from 'react';
import Svg from '../icon/svg';
import { useModal } from '@/libs/modal';
import clsx from 'clsx';
import useIsSticky from '@/hooks/useIsSticky';

import BannerSimResult from '../banner/banner-sim-result';

import styles from '@/styles/sim.module.scss';
import Link from 'next/link';
import Routers from '@/routes/routers';
import HeaderAppDefault from '../header/header-app-default';

type Props = {
  type?: 'numerlogy' | 'feng_shui';
  title?: string;
  content?: string | TrustedHTML;
};

const SimModalCommentary = ({ type = 'numerlogy', title, content }: Props) => {
  const { close } = useModal();
  return (
    <div>
      <HeaderAppDefault type="fixed" mode="close" title={title} />
      <button
        type="button"
        className={clsx(
          'left-4 md:left-auto md:right-4 absolute top-4 btn-tertiary md:bg-neutral-0 z-10 transition-default btn btn-sm btn-circle'
        )}
        onClick={close}
      >
        <Svg src="/icons/line/close.svg" width={24} height={24} />
      </button>

      <div className="container md:py-12 flex gap-10">
        <div className="flex-1">
          {/* Banner */}
          <div className="md:mx-0 -mx-4 md:rounded-2xl overflow-hidden">
            <BannerSimResult type={type} />
          </div>
          {/* Content */}
          <div className={styles.content} dangerouslySetInnerHTML={content ? { __html: content } : undefined}>
            {type === 'numerlogy' ? (
              <div>
                <h2>
                  <strong>Thông tin sản phẩm</strong>
                </h2>
                <p>
                  Số 5 là con số của một linh hồn tự do. Người mang số chủ đạo 5 thường là người vô cùng linh hoạt, nhiều năng lượng, khả
                  năng xoay xở và khả năng thích nghi tuyệt vời. Điểm yếu của người mang số 5 là liều lĩnh, đôi khi vô tâm. Bạn không thích
                  kỷ luật, cả thèm chóng chán và hay thay đổi, dễ bị phân tán sự tập trung nên làm việc không đến nơi đến chốn.
                </p>
                <h3>
                  <strong>Chủ số Thái độ: 4</strong>
                </h3>
                <p>
                  Chỉ số thái độ 4 thường gây ấn tượng bởi sự đáng tin cậy, thật thà, trung thành và tài năng lãnh đạo. Bạn có thể quản lý
                  công việc rất gọn gàng ngăn nắp cùng khả năng truyền đạt kiến thức tuyệt vời, những người có chỉ số thái độ 4 còn là biểu
                  thị cho sự trách nhiệm và tài năng.
                </p>
                <h3>
                  <strong>Chỉ số Linh hồn: 9</strong>
                </h3>
                <p>
                  Bạn có thể phát triển theo hai khuynh hướng riêng biệt đó là tích cực và tiêu cực. Khi sống tích cực thì bạn sẽ vô cùng
                  hạnh phúc vui vẻ. Bạn luôn muốn hướng đến cộng đồng.
                </p>
                <h3>
                  <strong>Chỉ số nhân cách: 2</strong>
                </h3>
                <p>
                  Một người khá nhạy cảm, tâm tính hiền hòa và là một người bạn tốt của mọi người là đặc trưng của những người có chỉ số
                  nhân cách số 2. Số 2 đại diện cho Sứ giả của Hòa bình, thường là cầu nối giữa những xung đột và bất hòa của mọi người.
                </p>
                <h3>
                  <strong>Chỉ số sứ mệnh: 2</strong>
                </h3>
                <p>
                  Điểm chung của những người mang số 2 trong thần số học là muốn mọi người tập trung vào bạn. Bạn luôn là người kết nối hòa
                  giải mâu thuẫn cho người khác.
                </p>
                <h3>
                  <strong>Năm cá nhân: 2</strong>
                </h3>
                <p>
                  Hợp tác và cân bằng: Trong năm thứ hai, khi các kế hoạch đã được ươm mầm thì cần có sự chăm sóc bởi các yếu tố bên ngoài
                  khác từ sự giúp đỡ, hợp tác với những người xung quanh. Trong thời gian này bạn cần hiểu rõ giới hạn của bản thân, xem khả
                  năng của mình đến đâu và bổ sung sự thiếu sót bằng những mối quan hệ xung quanh.
                </p>
                <h3>
                  <strong>Biểu đồ ngày sinh</strong>
                </h3>
                <p>Trục mũi tên Quyết tâm (1.5.9): Bạn có đức tính kiên trì bền bỉ, sẵn sàng theo đuổi mục tiêu đến khi đạt được</p>
                <p>
                  <img
                    src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685431865/itel/images/11887cedd7affc37603d2e3af755065c_npnng5.png"
                    alt="Screenshot"
                    loading="lazy"
                  />
                </p>

                <h3>
                  <strong>Kim Tự Tháp Thần số học</strong>
                </h3>
                <p>
                  · Đỉnh cao sự nghiệp 1: 31 tuổi (2023)
                  <br />
                  · Đỉnh cao sự nghiệp 2: 40 tuổi (2039)
                  <br />
                  · Đỉnh cao sự nghiệp 3: 49 tuổi (2048)
                  <br />· Đỉnh cao sự nghiệp 4: 58 tuổi (2057)
                </p>
                <p>
                  Biểu đồ ngày sinh thiếu năng lượng các số: 2, 3, 4, 6, 8 Biểu đồ ngày sinh thiếu các trục: 1.2.3; 4.5.6; 7.8.9; 1.4.7;
                  2.5.8; 3.6.9; 3.5.7 Số đơn lẻ: 0
                </p>
                <p>
                  <img
                    src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685432233/itel/images/e1c55d35769aa04df958a3e7886fb403_wj4mtf.png"
                    alt="Screenshot"
                    loading="lazy"
                  />
                </p>
              </div>
            ) : (
              <div>
                <h2>
                  <strong>Thành đầu thổ - Đất trên thành</strong>
                </h2>
                <p>
                  Số 5 là con số của một linh hồn tự do. Người mang số chủ đạo 5 thường là người vô cùng linh hoạt, nhiều năng lượng, khả
                  năng xoay xở và khả năng thích nghi tuyệt vời. Điểm yếu của người mang số 5 là liều lĩnh, đôi khi vô tâm. Bạn không thích
                  kỷ luật, cả thèm chóng chán và hay thay đổi, dễ bị phân tán sự tập trung nên làm việc không đến nơi đến chốn.
                </p>
                <h3>
                  <strong>Chủ số Thái độ: 4</strong>
                </h3>
                <p>
                  Chỉ số thái độ 4 thường gây ấn tượng bởi sự đáng tin cậy, thật thà, trung thành và tài năng lãnh đạo. Bạn có thể quản lý
                  công việc rất gọn gàng ngăn nắp cùng khả năng truyền đạt kiến thức tuyệt vời, những người có chỉ số thái độ 4 còn là biểu
                  thị cho sự trách nhiệm và tài năng.
                </p>
                <h3>
                  <strong>Chỉ số Linh hồn: 9</strong>
                </h3>
                <p>
                  Bạn có thể phát triển theo hai khuynh hướng riêng biệt đó là tích cực và tiêu cực. Khi sống tích cực thì bạn sẽ vô cùng
                  hạnh phúc vui vẻ. Bạn luôn muốn hướng đến cộng đồng.
                </p>
                <h3>
                  <strong>Chỉ số nhân cách: 2</strong>
                </h3>
                <p>
                  Một người khá nhạy cảm, tâm tính hiền hòa và là một người bạn tốt của mọi người là đặc trưng của những người có chỉ số
                  nhân cách số 2. Số 2 đại diện cho Sứ giả của Hòa bình, thường là cầu nối giữa những xung đột và bất hòa của mọi người.
                </p>
                <h3>
                  <strong>Chỉ số sứ mệnh: 2</strong>
                </h3>
                <p>
                  Điểm chung của những người mang số 2 trong thần số học là muốn mọi người tập trung vào bạn. Bạn luôn là người kết nối hòa
                  giải mâu thuẫn cho người khác.
                </p>
                <h3>
                  <strong>Năm cá nhân: 2</strong>
                </h3>
                <p>
                  Hợp tác và cân bằng: Trong năm thứ hai, khi các kế hoạch đã được ươm mầm thì cần có sự chăm sóc bởi các yếu tố bên ngoài
                  khác từ sự giúp đỡ, hợp tác với những người xung quanh. Trong thời gian này bạn cần hiểu rõ giới hạn của bản thân, xem khả
                  năng của mình đến đâu và bổ sung sự thiếu sót bằng những mối quan hệ xung quanh.
                </p>
                <h3>
                  <strong>Biểu đồ ngày sinh</strong>
                </h3>
                <p>Trục mũi tên Quyết tâm (1.5.9): Bạn có đức tính kiên trì bền bỉ, sẵn sàng theo đuổi mục tiêu đến khi đạt được</p>
                <p>
                  <img
                    src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685431865/itel/images/11887cedd7affc37603d2e3af755065c_npnng5.png"
                    alt="Screenshot"
                    loading="lazy"
                  />
                </p>
                <h3>
                  <strong>Kim Tự Tháp Thần số học</strong>
                </h3>
                <p>
                  · Đỉnh cao sự nghiệp 1: 31 tuổi (2023)
                  <br />
                  · Đỉnh cao sự nghiệp 2: 40 tuổi (2039)
                  <br />
                  · Đỉnh cao sự nghiệp 3: 49 tuổi (2048)
                  <br />· Đỉnh cao sự nghiệp 4: 58 tuổi (2057)
                </p>
                <p>
                  Biểu đồ ngày sinh thiếu năng lượng các số: 2, 3, 4, 6, 8 Biểu đồ ngày sinh thiếu các trục: 1.2.3; 4.5.6; 7.8.9; 1.4.7;
                  2.5.8; 3.6.9; 3.5.7 Số đơn lẻ: 0
                </p>
                <p>
                  <img
                    src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685432233/itel/images/e1c55d35769aa04df958a3e7886fb403_wj4mtf.png"
                    alt="Screenshot"
                    loading="lazy"
                  />
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="max-xl:hidden w-[25.5rem]">
          <div className="block-img block-photo-vertical">
            <div className="absolute inset-0 bg-neutral-0 rounded-2xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685432824/itel/images/Block_Image_mudtus.jpg"
                alt="1231231231"
                className="absolute inset-0"
              />
              <div className="relative px-8 py-12">
                <div className="text-s-md font-bold">Bạn đã sẵn sàng chọn số, mua Sim?</div>
                <p className="text-subtle-content mt-1.5 text-sm">Cùng Anh iTel đi liền thôiiiiii! Gét gô</p>
                <div className="mt-8">
                  <Link href={Routers.SIM} className="btn btn-primary btn-lg rounded-full" style={{ width: 170 }}>
                    Gét gô!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimModalCommentary;
