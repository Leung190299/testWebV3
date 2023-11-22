import ComboboxesSimple from '@/components/comboboxes/comboboxes-simple';
import { toggleModalSelectionList } from '@/components/modal/selection/modal-selection-list';
import { DELIVERY_DISTRICT, DELIVERY_HAMLET, DELIVERY_PROVINCE, DELIVERY_WARD } from '@/constants/checkout.constants';
import { useCities, useDistricts, useHamlets, useWards } from '@/hooks/useLocation';
import { IForm } from '@/types/form';
import { withMobile } from '@/utilities/function';
import React, { useRef } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

type Props = {} & React.HTMLAttributes<HTMLDivElement>;

type IFormDeliveryInformation = Pick<IForm.Checkout, 'deliveryInfomation'>;

const FormDeliveryInformation = (props: Props) => {
  const methods = useFormContext<cartModel.PaymentInfo>();
  const [CityId, DistrictId, WardId] = useWatch<cartModel.PaymentInfo>({
    name: ['cart_info.CityId', 'cart_info.DistrictId', 'cart_info.WardId'],
    control: methods.control
  });

  const provinces = useCities();
  const districts = useDistricts(CityId?.id);
  const wards = useWards(DistrictId?.id);
  const hamlets = useHamlets(WardId?.id);

  const refDistricts = useRef<HTMLDivElement>(null);

  const options = [
    {
      name: DELIVERY_PROVINCE,
      title: 'Tỉnh/Thành phố',
      placeholder: 'Chọn tỉnh thành phố',
      required: true,
      disabled: !provinces.length,
      options: provinces

    },
    {
      name: DELIVERY_DISTRICT,
      title: 'Quận/Huyện',
      placeholder: 'Chọn quận/huyện',
      required: true,
      disabled: !districts.length,
      options: districts,

    },
    {
      name: DELIVERY_WARD,
      title: 'Phường/Xã',
      placeholder: 'Chọn phường/xã',
      required: true,
      disabled: !wards?.length,
      options: wards
    },
    {
      name: DELIVERY_HAMLET,
      title: 'Khu/Ấp',
      placeholder: 'Chọn khu/ấp',
      required: false,
      disabled: !hamlets?.length,
      options: hamlets
    }
  ];

  const handleChangeLocation = (name: any) => {
    const option = options.find((op) => op.name === name);
    if (!option) return;

    toggleModalSelectionList({
      defaultValue: methods.getValues(name) ? option.options.find((pr) => methods.getValues(name).id == pr.id) : null,
      options: option.options,
      title: option.title,
      placeholder: option.placeholder,
      withSearch: true,
      maxHeight: true
    }).then((d) => {
      if (d) {
        methods.setValue(name, d);
        methods.setValue('cart_info.addr', '');
        switch (name) {
          case DELIVERY_PROVINCE:
            methods.resetField(DELIVERY_DISTRICT, { defaultValue: {} });
          case DELIVERY_DISTRICT:
            methods.resetField(DELIVERY_WARD, { defaultValue: {} });
          case DELIVERY_WARD:
            methods.resetField(DELIVERY_HAMLET, { defaultValue: {} });
          default:
            break;
        }
      }
    });
  };
  return (
    <>
      {options.map(({ disabled, name, options, placeholder, required, title }) => (
        <div key={name} {...props}>
          <div className="form-control w-full">
            <span className="label-text font-medium" aria-required={required}>
              {title}
            </span>
            <Controller
              control={methods.control}
              name={name as any}
              defaultValue={null}
              render={({ field: { ref, value, onChange, ...field } }) => {
               return (
                  <ComboboxesSimple

                   {...field}

                    value={options.find((item: cartModel.ResultDelivery) => item.id == value?.id) || {}}
                    onChange={(value) => {
                      onChange(value);
                      methods.setValue('cart_info.addr', '');
                      switch (name) {
                        case DELIVERY_PROVINCE:
                          methods.resetField(DELIVERY_DISTRICT, { defaultValue: {} });

                        case DELIVERY_DISTRICT:
                          methods.resetField(DELIVERY_WARD, { defaultValue: {} });

                        case DELIVERY_WARD:
                          methods.resetField(DELIVERY_HAMLET, { defaultValue: {} });

                        default:
                          break;
                      }
                    }}
                    options={options || []}
                    btnClassName="mt-2"
                    placeholder={placeholder}
                    disabled={disabled}
                    onClick={withMobile(() => handleChangeLocation(name))}
                    btnOnMobile
                  />
                )
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default FormDeliveryInformation;
