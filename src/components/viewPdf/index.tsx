import { ReactNode } from 'react';
import { ViewPDF } from './ViewPDF';

export type Props = {
  data: string;
  className?: string;
  scale?: number;
  children?: ReactNode;
};

export default ViewPDF;
