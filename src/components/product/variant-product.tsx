import clsx from 'clsx';
import { Dispatch, Fragment, SetStateAction, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import Tooltip from '../tooltip/tooltip';
type Props = {
  setSelectVariant: Dispatch<SetStateAction<boolean>>;
  changePrice: Dispatch<SetStateAction<{ price: number; base_price: number }>>;
  selectVariant: boolean;
  variants: imallModel.Variant[] | imallModel.VariantBaseus[];
  methods: UseFormReturn<cartModel.ProductCart & { variant: any; gift: imallModel.ResultSimSeach }>;
};
const VariantProduct = ({ variants, setSelectVariant, selectVariant, methods, changePrice }: Props) => {
  function isVariantArray(arr: any[]): arr is imallModel.Variant[] {
    return arr.length > 0 && arr[0].variant_type;
  }

  useEffect(() => {
    if (isVariantArray(variants)) {
      variants.forEach((item, index) => {
        methods.setValue(`variant.${index}.selected`, item.variants![0]);
      }
      )
    } else {
      methods.setValue(`variant`, variants[0].barcode);
   }


 },[])

  if (isVariantArray(variants)) {
    return (
      <>
        {variants.map((variant, index) => {
          return (
            <dl key={variant.variant_type} className="space-y-2 py-3">
              <dt>{variant.variant_name}</dt>
              <input
                type="text"
                hidden
                {...methods.register(`variant.${index}.variant_type`, {
                  value: variant.variant_type,

                  shouldUnregister: true
                })}
              />
              <input
                type="text"
                hidden
                {...methods.register(`variant.${index}.variant_name`, {
                  value: variant.variant_name,
                  shouldUnregister: true
                })}
              />
              <input
                type="text"
                hidden
                {...methods.register(`variant.${index}.variant_label`, {
                  value: variant.variant_label,
                  shouldUnregister: true
                })}
              />
              <input
                type="text"
                hidden
                {...methods.register(`variant.${index}.variants`, {
                  value: variant.variants,
                  shouldUnregister: true
                })}
              />
              <dd className="flex flex-wrap gap-2 text-base-content">
                {variant.variant_type !== 'color'
                  ? variant.variants &&
                    variant.variants.map((op) => {
                      return (
                        <Fragment key={op.value}>
                          <label>
                            <input
                              type="radio"
                              className="peer"
                              hidden
                              value={op.value}
                              checked={methods.watch(`variant.${index}.selected.value`) == op.value}
                              onChange={() => {
                                setSelectVariant(!selectVariant);
                                methods.setValue(`variant.${index}.selected`, op);
                              }}
                            />

                            <span className="font-medium text-sm block peer-checked:bg-red-600 peer-checked:border-red-600 border rounded-lg border-neutral-200 peer-checked:text-neutral-0 py-2 px-4">
                              {op.value}
                            </span>
                          </label>
                        </Fragment>
                      );
                    })
                  : variant.variants &&
                    variant.variants!.map((op) => {
                      return (
                        <Fragment key={op.value}>
                          <Tooltip content={op.name}>
                            <label>
                              <input
                                type="radio"
                                className="peer"
                                value={op.value}
                                checked={methods.watch(`variant.${index}.selected.value`) == op.value}
                                onChange={() => {
                                  setSelectVariant(!selectVariant);
                                  methods.setValue(`variant.${index}.selected`, op);
                                }}
                                hidden
                              />

                              <span
                                className={clsx(
                                  'font-medium text-sm block w-14 h-14   peer-checked:border-red-600  border-2 rounded-full border-neutral-200  py-2 px-4'
                                )}
                                style={{ background: op.value }}
                              ></span>
                            </label>
                          </Tooltip>
                        </Fragment>
                      );
                    })}
              </dd>
            </dl>
          );
        })}
      </>
    );
  }
  return (
    <dl className="space-y-2 py-3">
      <dt>Chọn Title</dt>
      {variants.map((item) => (
        <div key={item.barcode} className='m-2 inline-block'>
          <label>
            <input
              type="radio"
              className="peer"
              hidden
              value={item.barcode}
              checked={methods.watch(`variant`) == item.barcode}
              onChange={() => {
                setSelectVariant(!selectVariant);
                methods.setValue(`variant`, item.barcode);
                changePrice({ price: item.price || 0, base_price: item.base_price || 0 });
              }}
            />

            <span className="font-medium text-sm block peer-checked:bg-red-600 peer-checked:border-red-600 border rounded-lg border-neutral-200 peer-checked:text-neutral-0 py-2 px-4">
              {item.title}
            </span>
          </label>
        </div>
      ))}
    </dl>
  );
};

export default VariantProduct;
