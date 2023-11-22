import styles from '@/styles/rich-text.module.scss';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import clsx from 'clsx';
import Svg from '../icon/svg';

type Props = {
  data: string;
  className: string;
};

const HTMLContent = (props: Props) => {
  const { value: isShow, toggle } = useBoolean(false);
  return (
    <>
      <div
        id="content"
        dangerouslySetInnerHTML={{ __html: props.data }}
        className={clsx(styles.rich, isShow ? '' : styles.hide, props.className)}
      ></div>

      <div className="py-4 md:pb-0 md:pt-8 text-center">
        <button
          type="button"
          onClick={toggle}
          className="max-md:text-base-content btn-ghost btn-sm md:btn-md md:btn-secondary btn w-[12.5rem] rounded-full"
        >
          <span>{!isShow ? 'Xem thêm' : 'Thu gọn'}</span>
          <span className="md:hidden">
            <Svg src="/icons/line/chevron-down.svg" width={20} height={20} />
          </span>
        </button>
      </div>
    </>
  );
};

export default HTMLContent;
