import { ReactNode } from 'react';
import styles from '@/styles/scroll.module.scss'

type WidgetScrollProps = {
  children: ReactNode;
  id?: string;
};

const WidgetScroll = ({ children, id }: WidgetScrollProps) => {
  return (
    <div id={id} className={styles.widgetScroll}>
      {children}
    </div>
  );
};

export default WidgetScroll;
