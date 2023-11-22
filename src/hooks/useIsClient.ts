import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { useEffect } from 'react';

const useIsClient = () => {
  const bool = useBoolean(false);
  useEffect(() => bool.setTrue(), [bool]);
  return [bool.value, bool.toggle] as [boolean, () => void];
};

export default useIsClient;
