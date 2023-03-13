import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    appState: {
        openSideForm: false,
    },
  }

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleSideForm: (state) => {
            state.appState = !state.appState
        }
    }
});

export const { toggleSideForm }  = appSlice.actions;
export default toggleSideForm.reducer;