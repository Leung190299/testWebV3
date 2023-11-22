import { modal } from '@/libs/modal';
import React from 'react';
import SectionFilmSeriesDetail, { SectionFilmSeriesDetailProps } from '../section/section-film-series-detail';

const modalFilm = (props: SectionFilmSeriesDetailProps) => {
  modal.open({
    render: <SectionFilmSeriesDetail {...props} />,
    closeButton: false,
    className: 'modal-box shadow-itel bg-neutral-0 md:bg-neutral-800',
    classNameContainer: 'modal-full md:modal-bottom-sheet',
    classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
  });
};

export default modalFilm;
