import Svg from '@/components/icon/svg';
import { useRouter } from 'next/router';
import { FC } from 'react';

const SectionDownload: FC = () => {
  const router = useRouter();
  return (
    <div className="mt-2 md:mt-6 flex rounded-lg md:rounded-2xl bg-neutral-200 p-4 md:p-6 gap-3 md:gap-6">
      <div className="w-14 h-14 md:w-12 md:h-12">
        <Svg className="w-full h-full" src="/logo/logo-app.svg" />
      </div>
      <div className="flex flex-col md:flex-row gap-3 md:gap-6 flex-1">
        <p className="flex-1">
          Bạn vui lòng tải ứng dụng <b>My iTel</b> hoặc sử dụng website trên điện thoại, máy tính có chức năng chụp hình để thuận tiện cho
          quá trình kích hoạt sim.
        </p>
        <button type="button" className="block w-fit  btn-secondary btn rounded-full" onClick={() => router.push('/download-itel')}>
          Tải ứng dụng
        </button>
      </div>
    </div>
  );
};

export default SectionDownload;
