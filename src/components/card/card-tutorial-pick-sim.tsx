import { ReactElement } from 'react';

type CardTutorialPickSimProps = {
  label: string;
  title: string;
  children: ReactElement;
  image: string;
};

const CardTutorialPickSim = ({ children, image, label, title }: CardTutorialPickSimProps) => {
  return (
    <div className="rounded-3xl md:bg-neutral-50 md:px-8 md:py-10">
      <p className="mb-1 text-base font-medium text-neutral-500">{label}</p>
      <p className="mb-6 text-xl font-bold md:w-[90%] md:text-h4">{title}</p>
      <div>{children}</div>
      <img src={`${image}`} alt="sim-destiny" className="mt-6 aspect-cinema md:w-full xl:w-[35rem]" />
    </div>
  );
};

export default CardTutorialPickSim;
