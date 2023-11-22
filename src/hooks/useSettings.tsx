import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSettings, SettingName, SettingState } from '@/store/setting/settingSlice';
import { useCallback } from 'react';

export const useSettings = () => {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const setOption = useCallback(
    <T extends keyof SettingState>(name: T, value: SettingState[T]) => {
      dispatch(setSettings({ name, value }));
    },
    [dispatch]
  );

  return { settings, setOption };
};
