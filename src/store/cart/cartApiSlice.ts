import CartService from '@/services/cartService';
import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { startAppListening } from '../listenerMiddleware';
export const getListProductAsync = createAsyncThunk('cartApi/getlistproduct', async (id?: string) => {
  const param: cartModel.ParamCart = {
    page: 1,
    pageSize: 30
  };

  if (!id) return [];
  param.userId = id;
  const res = await CartService.getListCart(param);
  return res.result;
});

const initialState:  cartModel.ProductCart[] = [];
export const cartApiSlice = createSlice({
  name: 'cartApi',
  initialState,
  reducers: {
    addCartProduct(state) {},
    removeCartProduct(state) {},
    setQuality(state) {}
  },
  extraReducers: (builder) => {
    builder.addCase(getListProductAsync.fulfilled, (state, action) => {
      state= action.payload;
      return state;
    });
    builder.addCase(setQuality.type, (state) => {
      console.log('asda', state)
    })
  }
});

export const { addCartProduct, removeCartProduct, setQuality, } = cartApiSlice.actions;
startAppListening({
  matcher: isAnyOf(addCartProduct, removeCartProduct,setQuality),
  effect(action, api) {
    let id = localStorage.getItem('user') || '';
    api.dispatch(getListProductAsync(id));
  }
});

export default cartApiSlice.reducer;
