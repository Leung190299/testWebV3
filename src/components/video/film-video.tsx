import { useModal } from '@/libs/modal';
import { RefObject, useState } from 'react';
import Svg from '../icon/svg';

type FilmVideoProps = {
  videoRef: RefObject<HTMLVideoElement>;
  src?: string;
};

const FilmVideo = ({ videoRef, src }: FilmVideoProps) => {
  const { close } = useModal();
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className="relative" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <video ref={videoRef} className="fixed inset-0 h-full w-full bg-neutral-800 z-50" controls loop autoPlay>
        <source
          src="https://res.cloudinary.com/dgkrchato/video/upload/v1685692569/video_film/Avatar__The_Way_of_Water___Official_Trailer_aoepcn.mp4"
          type="video/mp4"
        />
      </video>
      {isHovering && (
        <button className="absolute top-10 left-10 z-50" onClick={close}>
          <Svg src="/icons/bold/arrow-right.svg" className="w-10 h-10 inline text-neutral-0 rotate-180 transition-all delay-100 ease-linear" />
        </button>
      )}
    </div>
  );
};

export default FilmVideo;
