import { CheckoutType } from '@/constants/checkout.constants';
import { Cart, Checkout, Model } from '@/types/model';
import { debounce } from '@/utilities/debounce';
import { pick } from '@/utilities/object';
import { generateRandomId } from '@/utilities/string';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { startAppListening } from '../listenerMiddleware';

interface CheckoutItem {
  id: number;
  price: number;
  quantity: number;
  name: string;
}

type Id = string;

export interface AddToCartPayload {
  variant: { id: number; discount_price?: number | null; price: number; name: string };
  product: { id: number; name: string; thumbnail: string };
  gift?: {
    options: Model.Gift[];
    selected?: number;
  };
  quantity?: number;
}
export interface PayloadAddSimToCart {
  sims: {
    quantity?: number;
    type: 'esim' | 'physic';
    phone: string;
    pack: Model.PackOfData;
    price: number;
    discount_price?: number;
  }[];
  gift?: {
    options: Model.Gift[];
    selected?: number;
  };
}

export interface CartState {
  checkoutItems: CheckoutItem[];
  cartItems: Cart.ProductItem[];
  cartSimItem: Cart.SimItem[];
  checkoutData: Checkout.DataPack | Checkout.ProductAndSim | Checkout.Recharge | Checkout.InstallmentItem | null;
}

const initialState: CartState = {
  checkoutItems: [],
  cartItems: [],
  cartSimItem: [],
  checkoutData: null
};
const VALID_TYPE = [CheckoutType.Item];
const isValid = (data: any): data is Checkout.ProductAndSim => VALID_TYPE.includes(data?.type);

const saveToLocalStorage = debounce(
  (data: any) => {
    localStorage.setItem('itel.cart-data', JSON.stringify(data));
  },
  1000,
  false,
  true
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Persit
    loadFromLocal(state) {
      try {
        const d = localStorage.getItem('itel.cart-data');
        if (d) {
          const data = JSON.parse(d);
          if (Object.hasOwn(data, 'cartItems') && Object.hasOwn(data, 'cartSimItem')) {
            state.cartItems = data.cartItems;
            state.cartSimItem = data.cartSimItem;
          }
        }
      } catch (error) {}
    },

    // Checkout
    addToCheckout(state, action: PayloadAction<Checkout.DataPack | Checkout.ProductAndSim | Checkout.Recharge | Checkout.InstallmentItem>) {
      state.checkoutData = action.payload;
    },
    addSimToCheckout(state, action: PayloadAction<Checkout.Sim[]>) {
      if (isValid(state.checkoutData)) {
        const array=[...state.checkoutData.sims, ...action.payload]
        state.checkoutData.sims = array.reduce<Checkout.Sim[]>((arr, item, index) => arr.some(it=>item.id==it.id)?arr:[...arr,item],[]);

      }
    },

    removeFromCheckout(state, action: PayloadAction<number>) {
      // state.checkoutItems = state.checkoutItems.filter((item) => item.id !== action.payload);
    },
    setQuantityCheckoutItem(state, action: PayloadAction<{ quantity: number; id: number }>) {
      const { quantity, id } = action.payload;
      const item = state.checkoutItems.find((item) => item.id === id)!;
      if (isNaN(quantity) || quantity < 1) return;
      item.quantity = quantity;
    },

    // Gift
    changeGift(state, action: PayloadAction<{ itemId: Id; giftId: number }>) {
      const item = state.cartItems.find((item) => item.id === action.payload.itemId);
      if (!item || !item.gift) return;
      item.gift.selected[0] = action.payload.giftId;
    },

    // Cart
    removeFromCart(state, action: PayloadAction<Id>) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      state.cartSimItem = state.cartSimItem.filter((item) => item.id !== action.payload);
    },

    // Cart product
    addToCart(state, action: PayloadAction<AddToCartPayload>) {
      const { product, variant, gift } = action.payload;
      const cart = state.cartItems.find((item) => item.merchandise.id === variant.id);
      if (cart) {
        cart.quantity += action.payload.quantity ?? 1;
      } else {
        const item: Cart.ProductItem = {
          id: generateRandomId(),
          merchandise: {
            id: variant.id,
            price: variant.price,
            discountPrice: variant.discount_price,
            product: pick(product, ['id', 'name', 'thumbnail']),
            title: variant.name
          },
          quantity: 1
        };
        if (gift) {
          item.gift = {
            byId: {},
            ids: [],
            selected: []
          };
          gift?.options.forEach((option) => {
            item.gift!.byId[option.id] = option;
            item.gift!.ids.push(option.id);
          });
          if (gift.selected) item.gift.selected!.push(gift.selected);
          else item.gift.selected!.push(item.gift.ids[0]);
        }
        state.cartItems.push(item);
      }
    },

    increamentQuantity(state, action: PayloadAction<Id>) {
      const item = state.cartItems.find((item) => item.id === action.payload)!;
      item.quantity++;
    },
    decrementQuantity(state, action: PayloadAction<Id>) {
      const item = state.cartItems.find((item) => item.id === action.payload)!;
      if (item.quantity == 1) return;
      item.quantity--;
    },
    setQuantity(state, action: PayloadAction<{ quantity: number; id: Id; phone?: string }>) {
      const { quantity, id } = action.payload;
      if (isNaN(quantity) || quantity < 1) return;

      const item =
        'phone' in action.payload
          ? state.cartSimItem.find((item) => item.id === id)?.merchandise.find((p) => p.sim.phone === action.payload.phone)
          : state.cartItems.find((item) => item.id === id)!;
      if (!item) return;
      item.quantity = quantity;
    },
    // Cart sim
    addSimToCart(state, action: PayloadAction<PayloadAddSimToCart>) {
      const { sims, gift } = action.payload;
      const id = generateRandomId();
      const cartItem: Cart.SimItem = {
        id,
        merchandise: sims.map((sim) => ({
          data: sim.pack,
          sim: {
            ...sim,
            quantity: sim.quantity || 1
          },
          quantity: sim.quantity || 1
        }))
      };

      if (gift) {
        cartItem.gift = {
          byId: {},
          ids: [],
          selected: []
        };
        gift?.options.forEach((option) => {
          cartItem.gift!.byId[option.id] = option;
          cartItem.gift!.ids.push(option.id);
        });
        if (gift.selected) cartItem.gift.selected!.push(gift.selected);
        else cartItem.gift.selected!.push(cartItem.gift.ids[0]);
      }
      state.cartSimItem.push(cartItem);
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  addToCheckout,
  addSimToCheckout,
  decrementQuantity,
  increamentQuantity,
  removeFromCart,
  setQuantity,
  loadFromLocal,
  changeGift,
  addSimToCart
} = cartSlice.actions;

startAppListening({
  matcher: isAnyOf(addToCart, decrementQuantity, increamentQuantity, removeFromCart, setQuantity, addSimToCart),
  effect(action, api) {
    saveToLocalStorage({ cartItems: api.getState().cart.cartItems, cartSimItem: api.getState().cart.cartSimItem });
  }
});

export default cartSlice.reducer;
