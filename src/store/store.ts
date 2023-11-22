import feeReducer from '@/store/fees/feesSlice';
import { configureStore } from '@reduxjs/toolkit';
import cartApiReducer from './cart/cartApiSlice';
import cartReducer from './cart/cartSlice';
import simReducer from './cart/simTypeSlice';
import updateInfoReducer from './cart/updateInfoSlice';
import packReducer from './data/dataSlice';
import { listenerMiddleware } from './listenerMiddleware';
import settingReducer from './setting/settingSlice';
import infoEKYCReducer from './sim/actionSimSlice';

export const store = configureStore({
  reducer: {
    settings: settingReducer,
    cart: cartReducer,
    cartApi:cartApiReducer,
    activeSim: infoEKYCReducer,
    updateInfo: updateInfoReducer,
    fee: feeReducer,
    simType: simReducer,
    pack:packReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(listenerMiddleware.middleware);
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
