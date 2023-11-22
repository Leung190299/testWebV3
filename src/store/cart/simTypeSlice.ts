import { Checkout, Model } from '@/types/model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: {
  simSelect: Model.Sim[];
  simCheckout: Checkout.Sim[];
} = {
  simCheckout: [],
  simSelect: []
};

const simTypeSlice = createSlice({
  name: 'simType',
  initialState,
  reducers: {
    addSim: (state, action: PayloadAction<Model.Sim>) => {
      state.simSelect.push(action.payload);
    },

    clearSimType: () => initialState
  }
});
export const { addSim, clearSimType } = simTypeSlice.actions;

export default simTypeSlice.reducer;
