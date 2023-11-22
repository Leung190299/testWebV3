import SimFilterModal, { ISimFilter } from '@/components/modal/modal-sim-filter';
import { modal } from '@/libs/modal';
import { arrayToKeyValue } from '@/utilities/object';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { FilterState } from '@/components/sim/sim-search-bar';
import { simTypes as mockSimType, packs, sorts } from '@/constants/sim.constants';
import { SimModel } from '@/types/pick-sim';
import _ from 'lodash';

export type TagSimTranformed = { id: number; name: string; selected: boolean };

const useSimFilter = ({ simTypes = mockSimType }: { simTypes?: SimModel.TypeOption[] } = {}) => {
  const methods = useForm<ISimFilter>({
    defaultValues: { query: '', excluded: [], packs: [], priceRange: [0, 5_000_000], sortBy: 'all', type: [], tags: [], tag: undefined }
  });
  const { byTagId, byPackId, sortById } = useMemo(() => {
    return {
      byTagId: arrayToKeyValue(simTypes, 'id'),
      byPackId: arrayToKeyValue(packs, 'id'),
      sortById: arrayToKeyValue(sorts, 'value')
    };
  }, [simTypes]);

  const handleModalFilter = (simTypes: { id: string | number; name: string }[], packs: SimModel.TypeOptionPack[]) => {
    modal.open({
      render: <SimFilterModal defaultValues={methods.getValues()} simTypes={simTypes} packs={packs} />,
      onDone(data: ISimFilter) {
        methods.reset(data);
      },
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel !bg-neutral-0',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };
  const handleRemoveAttributes = (item: FilterState) => {
    const key = item.type as keyof ISimFilter;

    const value: string | string[] | { id: string } = methods.getValues(key) as any;

    if (typeof value === 'string') {
      methods.setValue(key, 'all');
    } else if (key == 'tag') {
      let _value = value as { id: string };
      if (_value && _value.id == item.id) {
        methods.setValue(key, undefined);
      } else {
        methods.setValue(key, item);
      }
    } else if (Array.isArray(value) && key !== 'priceRange') {
      const index = value.findIndex((v) => v == item.id);
      if (index !== -1) value.splice(index, 1);
      else value.push(item.id);
      methods.setValue(key, value);
    }
  };

  const options = useWatch({ control: methods.control });



  const selectedAttributes = useMemo(() => {
    const newFilters: FilterState[] = [];
    options.excluded?.forEach((number) => {
      newFilters.push({ type: 'excluded', id: number, name: `Loại trừ số ${number}` });
    });
    if (options.packs)
      options.packs.forEach((pack) => {
        newFilters.push({ type: 'packs', id: byPackId[pack].name || '', name: byPackId[pack].name || '' });
      });
    if (options.sortBy && options.sortBy !== 'all') {
      newFilters.push({ type: 'sortBy', id: options.sortBy, name: sortById[options.sortBy]?.name });
    }
    if (options.type && !_.isArray(options.type)) newFilters.push({ type: 'type', id: options.type, name: byTagId[options.type]?.name });

    if (options.packsDesktop && options.packsDesktop !== 'all') {
      newFilters.push({
        type: 'packsDesktop',
        id: byPackId[options.packsDesktop].name || '',
        name: byPackId[options.packsDesktop].name || ''
      });
    }
    if (options.tag) {
      newFilters.push({
        type: 'tag',
        id: options.tag.id,
        name: options.tag.name
      });
    }
    if (options.priceRange) {
      newFilters.push({
        type: 'priceRange',
        priceRange: options.priceRange,
        id: 'priceRange',
        name: ''
      });
    }

    return newFilters;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return {
    selectedAttributes,
    handleModalFilter,
    handleRemoveAttributes,
    methods
  };
};

export default useSimFilter;
