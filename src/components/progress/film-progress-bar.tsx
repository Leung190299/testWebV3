import clsx from 'clsx';

type FilmProgerssBarProps = {
  totalTime: number;
  timeWatched: number;
  displayDetail?: boolean;
  inFilmSection?: boolean;
};

const FilmProgerssBar = ({ totalTime, timeWatched, displayDetail = false, inFilmSection = false }: FilmProgerssBarProps) => {
  return (
    <div className="flex justify-start items-center gap-2">
      <div className={clsx('w-full h-1 bg-neutral-0/[0.5] overflow-hidden', inFilmSection ? 'rounded-b-lg' : 'rounded-full')}>
        <div
          className={clsx('h-full bg-neutral-0 rounded-full')}
          style={{ width: Math.floor((timeWatched / totalTime) * 100).toString() + '%' }}
        />
      </div>
      {displayDetail && (
        <p className="text-sm font-medium text-neutral-0 hidden md:block">
          {timeWatched}/{totalTime}p
        </p>
      )}
    </div>
  );
};

export default FilmProgerssBar;
