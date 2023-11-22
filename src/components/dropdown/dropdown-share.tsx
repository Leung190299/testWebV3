import ShareInforItem, { ShareInforItemProps } from '../common/share-info-item';

type DropdownShareProps = {} & ShareInforItemProps;

const DropdownShare = (props: DropdownShareProps) => {
  return (
    <div className="space-y-4 px-6 py-4">
      <p className="font-bold">Chia sẻ</p>
      <div>
        <ShareInforItem {...props} />
      </div>
    </div>
  );
};

export default DropdownShare;
