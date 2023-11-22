import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

type props = {
  fees: Required<cartModel.Fee & { type: 'oppo' | 'baseus' | 'sim' }>[];
  voucher: { PromotionCode: string; DiscountAmount: number; event: string };
  sims: cartModel.ProductCart[];
  MGT: string;
};
const initialState: props = {
  fees: [],
  voucher: { PromotionCode: '', DiscountAmount: 0, event: '' },
  sims: [],
  MGT: ''
};

const feeSlice = createSlice({
  name: 'fee',
  initialState,
  reducers: {
    addFee: (state, action: PayloadAction<Required<cartModel.Fee & { type: 'oppo' | 'baseus' | 'sim' }>[]>) => {
      state.fees = action.payload;
      return state;
    },
    addVoucher: (
      state,
      action: PayloadAction<{ voucher: { PromotionCode: string; DiscountAmount: number; event: string }; sims?: cartModel.ProductCart[] }>
    ) => {
      state.voucher = action.payload.voucher;
      if (action.payload.sims) {
        state.sims = action.payload.sims;
      }
      return state;
    },
    clearFee: (state) => {
      state.fees = [];
      return state;
    },
    clear: () => initialState,

    removeVoucher: (state) => {
      state.voucher = { PromotionCode: '', DiscountAmount: 0, event: '' };
      state.sims = [];
      return state;
    },
    addMGT: (state, action: PayloadAction<string>) => {
      state.MGT = action.payload;
      return state
    },
    removeMGT: (state) => {
      state.MGT = '';
      return state
    }
  }
});

export const { addFee, clearFee, addVoucher, removeVoucher, clear,addMGT,removeMGT } = feeSlice.actions;

export default feeSlice.reducer;
