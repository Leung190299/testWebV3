import { Model } from '@/types/model';
import { Connector } from '@pit-ui/modules/database-ver2';
interface TableColumn<D> {
  name: keyof D;
  index?: string;
  attributes: IDBIndexParameters;
}
interface TableSchema<D> {
  name: string;
  primary?: string;
  columns?: TableColumn<D>[];
  objectStore?: IDBObjectStore | null;
}
export const connector = new Connector({
  name: 'itel',
  tables: [
    { name: 'images', columns: [] } as TableSchema<Model.BaseImage>,
    { name: 'orders', columns: [{ name: 'code', index: 'code', attributes: { unique: true } }] },
    {
      name: 'users',
      columns: [
        { name: 'phone', index: 'phone', attributes: { unique: true } },
        { name: 'email', index: 'email', attributes: { unique: true } }
      ]
    },
    { name: 'OTP' },
    {
      name: 'address',
      columns: [
        { name: 'user_id', index: 'user_id', attributes: { unique: false } },
        { name: 'created_at', attributes: { unique: false } }
      ]
    }
  ],
  version: 2
});
