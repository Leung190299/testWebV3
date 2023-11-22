type CardSimDestinyProps = {
  image: string;
  title: string;
  description: string;
};

const CardSimDestiny = ({image, title, description}:CardSimDestinyProps) => {
  return (
    <div className="xl:w-[18.5rem] w-auto md:mx-2 rounded-3xl bg-neutral-0 p-6">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="mb-6 aspect-video w-full rounded-2xl bg-cover bg-center select-none"
      />
      <div className="mb-2 xl:text-xl md:text-base font-bold">{title}</div>
      <div className="xl:text-base md:text-sm font-normal text-neutral-500 line-clamp-4">
        {description}
      </div>
    </div>
  );
};
export default CardSimDestiny;
