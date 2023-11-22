import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SettingState {
  defaultLogin?: boolean;
}
export type SettingName = keyof SettingState;

const initialState: SettingState = {
  defaultLogin: false
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setSettings(state, action: PayloadAction<{ name: SettingName; value: any }>) {
      (state as any)[action.payload.name] = action.payload.value;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setSettings } = settingSlice.actions;

export default settingSlice.reducer;
