import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: dataModel.Pack = {}
const slicePack = createSlice({
	name: 'pack',
	initialState,
	reducers: {
		addPack: (_, action: PayloadAction<dataModel.Pack>) => {
			return action.payload;
		},
		removePack:()=>initialState
	}
})

export const { addPack, removePack } = slicePack.actions;
export default slicePack.reducer