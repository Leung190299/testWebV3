import Svg from '../icon/svg';

type ChipProps = {
  label: string;
  onClick?: () => void;
};

const Chip = ({ label = 'label test', onClick }: ChipProps) => {
  return (
    <span className="chip-outline chip gap-x-1 border-neutral-300">
      {label}
      <button onClick={onClick}>
        <Svg src="/icons/line/close.svg" className="inline h-5 w-5 cursor-pointer" />
      </button>
    </span>
  );
};

export default Chip;
