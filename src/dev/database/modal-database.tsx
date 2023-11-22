import type { Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { Tab } from '@headlessui/react';
import { Model as BaseModel } from '@pit-ui/modules/database-ver2';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import HeaderMiddle from '@/components/modal/header/header-middle';
import { CheckoutType } from '@/constants/checkout.constants';
import { CreateUserSchemaValidation } from '@/constants/validator.constants';
import { modal, useModal } from '@/libs/modal';
import Routers from '@/routes/routers';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { User } from '@/services/user/model';
import InputLabelOut from '@/components/input/input-label-out';
import { InputErrorForm } from '@/components/input/input-error';
import { copyTextToClipboard } from '@/utilities/copy';
import PaginationSimple from '@/components/pagination/pagination-simple';

const ModalDatabase = ({ onClose }: { onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const tabs: TableProps<any>[] = [
    {
      name: 'users',
      columns: [
        { header: 'Id', accessorKey: 'id', size: 0 },
        {
          header: 'Thông tin',
          id: 'info',
          cell(props) {
            const formatedPhone = formatPhoneNumber(props.row.original.phone);
            return (
              <div className="flex items-center whitespace-nowrap">
                <div className="w-16 mr-2">
                  <div className="block-img block-square">
                    <img
                      src={props.row.original.image || 'https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg'}
                      alt={props.row.original.name || 'https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg'}
                      className=" object-cover rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-base">
                    <b>{props.row.original.name}</b>
                  </p>
                  <b
                    className="text-sm font-medium text-neutral-500 cursor-pointer"
                    onClick={() =>
                      copyTextToClipboard(formatedPhone).then(() => toast.success('Sao chép số điện thoại thành công: ' + formatedPhone))
                    }
                  >
                    {formatedPhone}
                  </b>
                </div>
              </div>
            );
          }
        },
        { header: 'Email', accessorKey: 'email' },
        {
          header: 'Đã xác thực',
          accessorKey: 'is_verified',
          cell(props) {
            const isVerified = props.getValue<boolean>();
            return (
              <span
                className={clsx(
                  isVerified ? 'text-green-500 bg-green-100' : 'tag-primary',
                  'tag border-none rounded-md px-2 capitalize font-normal tag-sm whitespace-nowrap'
                )}
              >
                {isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
              </span>
            );
          }
        },
        { header: 'Role', accessorKey: 'role' },
        {
          header: 'Địa chỉ',
          accessorKey: 'address',
          cell(props) {
            return props.getValue<Model.DeliveryAddress[]>()?.length;
          }
        },
        {
          header: 'Tiền',
          accessorKey: 'balance',
          id: 'balance',
          cell(props) {
            const value = props.getValue<number>();
            return <p className="text-right">{toCurrency(value || 0)}</p>;
          }
        },
        {
          header: 'Edit',
          id: 'edit',
          cell(props) {
            return (
              <button
                className="btn btn-xs rounded-full"
                onClick={() =>
                  modal.open({
                    render: <InsertOrUpdateUser defaultValues={props.row.original} />,
                    classNameContainer: 'modal-middle',
                    className: 'max-w-[45rem] modal-box',
                    transition: false
                  })
                }
              >
                Sửa
              </button>
            );
          }
        }
      ],
      relations: [{ foreignKey: 'user_id', primaryKey: 'id', table: 'address', type: 'count' }]
    } as TableProps<Model.User & { address: Model.DeliveryAddress[] }>,
    {
      name: 'orders',
      columns: [
        { header: 'Id', accessorKey: 'id', size: 0 },
        {
          header: 'Mã',
          accessorKey: 'code',
          cell(props) {
            return (
              <Link
                onClick={onClose}
                href={{ pathname: Routers.CHECKOUT_RESULT, query: { id: props.row.original.id } }}
                className="hover:underline"
              >
                {props.getValue<string>()}
              </Link>
            );
          }
        },
        { header: 'Phương thức thanh toán', accessorKey: 'method' },
        {
          header: 'Loại sản phẩm',
          accessorKey: 'type',
          cell(props) {
            const value = props.getValue<CheckoutType>();
            switch (value) {
              case CheckoutType.BuyCode:
                return 'Mã thẻ';
              case CheckoutType.Card:
                return 'Trả góp qua thẻ';
              case CheckoutType.Profile:
                return 'Trả góp qua hồ sơ';
              case CheckoutType.BuyData:
                return 'Mua data';
              case CheckoutType.Item:
                return 'Mua hàng';
              case CheckoutType.Recharge:
                return 'Nạp thẻ';
              default:
                return 'Không rõ';
            }
          }
        },
        {
          header: 'Trạng thái',
          accessorKey: 'status',
          cell(props) {
            const status = props.getValue<'failed' | 'pending' | 'success'>();
            return (
              <span
                className={clsx(
                  {
                    'tag-primary': status === 'failed',
                    'text-yellow-500 bg-yellow-100': status === 'pending',
                    'text-green-500 bg-green-100': status === 'success'
                  },
                  'tag border-none rounded-md px-2 capitalize font-normal tag-sm'
                )}
              >
                {status}
              </span>
            );
          }
        },
        {
          header: 'Tổng giá trị',
          accessorKey: 'transaction_price',
          cell({ cell }) {
            return toCurrency(cell.getValue() as number);
          }
        },
        {
          header: 'Ngày tạo',
          accessorKey: 'created_at',
          cell(props) {
            const date = new Date(props.getValue<string>());

            return (
              <span>
                <span className="font-medium">{date.toLocaleDateString()}</span>
                <span className="text-xs text-neutral-500"> {date.toLocaleTimeString()}</span>
              </span>
            );
          }
        }
      ]
    } as TableProps<Model.Order>,
    {
      name: 'images',
      columns: [
        { header: 'Id', accessorKey: 'id', size: 0 },
        {
          header: 'Ảnh',
          accessorKey: 'thumbnail',
          cell(props) {
            return (
              <div className="w-24">
                <div className="block-square block-img">
                  <img src={props.getValue<string>()} alt={props.row.original.title} className="object-cover rounded-md" />
                </div>
              </div>
            );
          }
        },
        {
          header: 'Rộng',
          accessorKey: 'width'
        },
        {
          header: 'Cao',
          accessorKey: 'height'
        },
        {
          header: 'Ngày tạo',
          accessorKey: 'created_at',
          cell(props) {
            const date = new Date(props.getValue<number>() * 1e3);

            return (
              <span>
                <span className="font-medium">{date.toLocaleDateString()}</span>
                <span className="text-xs text-neutral-500"> {date.toLocaleTimeString()}</span>
              </span>
            );
          }
        }
      ]
    } as TableProps<Model.BaseImage>
  ];

  const handleTruncateTable = async () => {
    User.truncate().then(() => toast.success('truncated users'));
  };

  return (
    <div className="container pb-20">
      <Tab.Group onChange={setIndex} selectedIndex={index}>
        <Tab.List className={'tabs'}>
          {tabs.map(({ name }) => (
            <Tab key={name} className={({ selected }) => clsx(selected && 'tab-active', 'tab tab-bordered tab-primary')}>
              {name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map(({ name, columns, ...rest }) => (
            <Tab.Panel key={name}>
              <div className="overflow-auto ">
                <Table {...{ columns, name, ...rest }} />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <div className="fixed bottom-0 w-full left-0 bg-base-100 border-t border-base-200">
        <div className="container py-3 flex justify-between">
          <div className="flex gap-x-2">
            <button className="btn btn-primary rounded-full btn-sm" onClick={handleTruncateTable}>
              Xoá dữ liệu bảng
            </button>
            {index == 2 ? <button className="btn btn-primary rounded-full btn-sm">Đồng bộ ảnh</button> : null}
          </div>

          <button onClick={onClose} className="btn btn-tertiary rounded-full">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

const InsertOrUpdateUser = ({ defaultValues }: { defaultValues?: Partial<Model.UserDataBase> }) => {
  const { close } = useModal();
  const methods = useForm<Model.UserDataBase>({
    defaultValues: { balance: 0, is_verified: false, role: 'admin', ...defaultValues },
    resolver: yupResolver(CreateUserSchemaValidation),
    mode: 'onChange'
  });

  const onSubmit = (data: Model.UserDataBase) => {
    if (data.id)
      User.save(data.id, data)
        .then(() => toast('Cập nhật thành công: ' + data.id))
        .catch((e) => toast.error('Lỗi rồi'));
    else
      User.create(data)
        .then((user) => toast('user created: ' + user.id))
        .catch((e) => toast.error('Lỗi rồi'));
    close();
  };
  const fields: {
    col?: number;
    key: keyof Model.UserDataBase;
    placeholder?: string;
    type: 'checklist' | 'boolean' | 'text' | 'tel' | 'number' | 'password' | 'select';
    options?: string[];
    label: string;
  }[] = [
    {
      col: 2,
      label: 'Ảnh',
      placeholder: 'Đường dẫn ảnh',
      key: 'image',
      type: 'text'
    },
    {
      label: 'Tên',
      placeholder: 'Họ và tên',
      key: 'name',
      type: 'text'
    },
    {
      label: 'Số điện thoại',
      key: 'phone',
      type: 'tel'
    },
    {
      label: 'Email',
      key: 'email',
      type: 'tel'
    },
    {
      label: 'Số tiền',
      placeholder: 'Số dư trong ví',
      key: 'balance',
      type: 'number'
    },
    {
      label: 'Đã xác thực hay chưa',
      key: 'is_verified',
      type: 'boolean'
    },
    {
      label: 'Mật khẩu',
      placeholder: 'Mật khẩu',
      key: 'password',
      type: 'password'
    },
    {
      label: 'Vị trí',
      key: 'role',
      type: 'select',
      options: ['user', 'admin', 'merchant']
    }
  ];
  const isValid = methods.formState.isValid;

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <HeaderMiddle title="Thêm người dùng" />
      <div className="flex flex-wrap -mx-1.5 mt-8">
        {fields.map((field, idx) => {
          if (field.type === 'text' || field.type === 'password' || field.type === 'tel' || field.type === 'number') {
            return (
              <div className={clsx('px-1.5 mt-3', field.col === 2 ? 'w-full' : 'w-full md:w-1/2')} key={field.key}>
                <InputLabelOut
                  title={field.label}
                  placeholder={field.placeholder || field.label}
                  data-headlessui-focus-guard={idx == 0 ? 'true' : undefined}
                  {...methods.register(field.key as any)}
                >
                  <InputErrorForm errors={methods.formState.errors} name={field.key} />
                </InputLabelOut>
              </div>
            );
          } else if (field.type === 'boolean') {
            return (
              <div key={field.key} className="px-1.5 mt-3 w-full">
                <label className="flex items-center">
                  <input type="checkbox" {...methods.register(field.key as any)} />
                  <p className="ml-2">{field.label}</p>
                </label>
              </div>
            );
          } else if (field.type === 'select') {
            return (
              <div key={field.key} className="px-1.5 mt-3 w-1/2">
                <label>
                  <p className="label-text">{field.label}</p>
                  <select placeholder={field.label} className="input mt-2 w-full" {...methods.register(field.key as any)}>
                    {field.options?.map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                  </select>
                </label>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="mt-12">
        <button disabled={!isValid} className="btn btn-primary rounded-full w-full">
          Xác nhận
        </button>
      </div>
    </form>
  );
};

interface TableProps<T extends {}> {
  columns: ColumnDef<T>[];
  name: string;

  relations?: { foreignKey: string; primaryKey: string; type: 'count'; table: string }[];
}

const Table = <T extends {}>({ columns, name, relations = [] }: TableProps<T>) => {
  const [tableSchema, setTableSchema] = useState<BaseModel<T>>();
  const [data, setData] = useState<T[]>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });
  useEffect(() => {
    class BaseUser extends BaseModel<T> {}
    const Data = new BaseUser(name);

    const obj = relations.reduce((object, { foreignKey, primaryKey, table, type }) => {
      object[primaryKey] ||= { query: new BaseModel<any>(table), table, foreignKey, type, primaryKey };
      return object;
    }, {} as Record<string, { query: BaseModel<any>; foreignKey: string; primaryKey: string; table: string; type: 'count' }>);

    setTableSchema(Data);
    Data.all()
      .then(async (data: any[]) => {
        for (const d of data) {
          const extraData: any = {};

          for (const { foreignKey, table, primaryKey, query, type } of Object.values(obj)) {
            extraData[table] = await new Promise((resolve) => {
              const data: any[] = [];
              query
                .getTransaction(table, 'readwrite' as any)
                .objectStore(table)
                .index(foreignKey)
                .openCursor(IDBKeyRange.only(d[primaryKey])).onsuccess = (event: any) => {
                const cursor = event.target.result;
                if (cursor) {
                  data.push(cursor.value);
                  cursor.continue();
                } else {
                  resolve(data);
                }
              };
            });
          }
          Object.assign(d, extraData);
        }
        setData(data);
      })
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <>
      <table className="w-full">
        <thead>
          {/* <tr>
          <th className="text-left py-3" colSpan={888}>
            <button className="btn btn-primary btn-sm rounded-full" disabled={!tableSchema}>
              Export
            </button>
          </th>
        </tr> */}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-4 py-2 border-y border-base-300 bg-base-200 text-xs text-left font-normal text-neutral-500"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler()
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽'
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 border-b border-neutral-200">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3">
        <PaginationSimple
          page={table.getState().pagination.pageIndex + 1}
          totalPage={table.getPageCount()}
          adjacent={[2, 2]}
          onChangePage={(page) => table.setPageIndex(page - 1)}
        />
      </div>
    </>
  );
};

export default ModalDatabase;
