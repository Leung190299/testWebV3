import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: {
  phone?: string;
  seri?: string;
  psHoten?: string;
  psCmnd?: string;
  psNgaysinh?: string;
  psQuoctich?: string;
  psnoicap?: string;
  psdiachi?: string;
  psGioiTinh?: string;
  ploaigt?: string;
  psplacedate?: string;
  img1?: string;
  img2?: string;
  img3?: string;
  signatureImage?: string;
  psContactPhone?: string;
  seriValid?: boolean;
  checked?: boolean;
  serial?: string;
  placeCode?: string;
  img4?:string;
} = {
  phone: '',
  seri: '',
  psHoten: '',
  psCmnd: '',
  psNgaysinh: '',
  psQuoctich: '',
  psnoicap: '',
  psdiachi: '',
  psGioiTinh: '',
  ploaigt: '',
  psplacedate: '',
  img1: '',
  img2: '',
  img3: '',
  signatureImage: '',
  psContactPhone: '',
  seriValid: false,
  checked: false,
  serial: '',
  placeCode:'',
  img4:''
};

export const infoEKYC = createSlice({
  name: 'EKYC',
  initialState,
  reducers: {
    addInfoEKYC(
      state,
      action: PayloadAction<{
        phone?: string;
        seri?: string;
        psHoten?: string;
        psCmnd?: string;
        psNgaysinh?: string;
        psQuoctich?: string;
        psnoicap?: string;
        psdiachi?: string;
        psGioiTinh?: string;
        ploaigt?: string;
        psplacedate?: string;
        img1?: string;
        img2?: string;
        img3?: string;
        signatureImage?: string;
        psContactPhone?: string;
        seriValid?: boolean;
        checked?: boolean;
        serial?: string;
        placeCode?: string;
        img4?:string;
      }>
    ) {
      return {
        ...state, ...action.payload
      };
    },
    removeInfoEKYC(){return initialState }
  }
});

export const { addInfoEKYC } = infoEKYC.actions;
export default infoEKYC.reducer;
