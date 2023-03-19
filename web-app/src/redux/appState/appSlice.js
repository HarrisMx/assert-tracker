import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    appState: {
        openSideForm: false,
        viewItem: false,
        openedItemId: null
    },
  }

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleSideForm: (state) => {
            state.appState.openSideForm = !state.appState.openSideForm;
        },
        setOpenedItemId: (state, action) => {
            state.appState.openedItemId = action.payload;
        }
    }
});

export const { toggleSideForm, setOpenedItemId }  = appSlice.actions;
export default appSlice.reducer;