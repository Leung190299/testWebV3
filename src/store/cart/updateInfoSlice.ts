import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UpdateInfoModel.resultSim = {};
const UpdateInfoSlice = createSlice({
  name: 'updateInfo',
  initialState,
  reducers: {
    addSim: (_, action: PayloadAction<UpdateInfoModel.resultSim>) => {
      return action.payload;
    }
  }
});


export const { addSim } = UpdateInfoSlice.actions;
export default UpdateInfoSlice.reducer;