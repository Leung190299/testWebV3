
import {FC, useRef, useState} from 'react';
import {motion, MotionValue, useScroll, useTransform} from "framer-motion";

interface Props {
    src: string;
    index: number;
    description: string;
    name: string;
}

const SectionSliderStep: FC<Props> = ({
        src,
        index ,
        description,
        name, }) => {
    return (
        <div className="w-1/4 flex-shrink-0 px-1.5 md:px-5 snap-center flex-item-step">
                <motion.div className="relative item-slide-step">
                    <div className="w-full block-img block-tivi-vertical image-scale">
                        <div className="numb-step font-itel">{index + 1}</div>
                        <img src={src} className="object-cover rounded-md md:rounded-2xl xl:rounded-3xl" alt={name} />
                    </div>
                    <div className="info">
                        <div className="relative">
                            <h4 className='font-bold mb-2'>{name}</h4>
                            <div className="desc">{description}</div>
                        </div>
                    </div>
                </motion.div>
        </div>

    );
};
export default SectionSliderStep;
