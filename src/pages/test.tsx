
import ViewPDF from '@/components/viewPdf';
import subscriberInfoService from '@/services/subscriberInfoService';
import params from '@/utilities/test.json';
import { useEffect, useState } from 'react';
const Test = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    subscriberInfoService.updateInfoForm(params).then((res) => {
      setData(res.result?.img4!);
    });
  }, []);

  if (data) {
    return <ViewPDF data={data} />;
  }
  return;
};

export default Test;
