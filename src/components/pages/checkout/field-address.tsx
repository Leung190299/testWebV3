import React from 'react';

type Props = {
  data?: { name: string; phone: string; address: string };
  onChangeAddress?(): void;
  onAddAddress?(): void;
};

const FieldAddress = ({ data, onAddAddress, onChangeAddress }: Props) => {
  return data ? (
    <div>
      <div className="flex items-center gap-4 flex-1 text-sm border border-neutral-200 rounded-lg p-4">
        <div className="flex-1">
          <p className="flex gap-2">
            <b>{data.name}</b>|<b>{data.phone}</b>
          </p>
          <p className="mt-1 text-xs text-neutral-500">{data.address}</p>
        </div>
        <div>
          <button type="button" onClick={onChangeAddress} className="font-bold text-sm md:text-base-content text-red-500">
            Thay đổi
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <button
        type="button"
        onClick={onAddAddress}
        className="py-4 bg-neutral-100 border-dashed border-neutral-300 flex items-center w-full border rounded-lg justify-center"
      >
        <div className="btn btn-ghost">Thêm địa chỉ nhận hàng</div>
      </button>
    </div>
  );
};

export default FieldAddress;
