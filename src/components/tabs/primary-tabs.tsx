type PrimaryTabProps = {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

const PrimaryTabs = ({ label, isActive, onClick }: PrimaryTabProps) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer whitespace-nowrap border-b-4 border-transparent px-8 py-6 text-xl font-bold ${
        isActive ? 'border-b-red-300 text-neutral-0 bg-red-500' : ''
      }`}
    >
      {label}
    </div>
  );
};

export default PrimaryTabs;
