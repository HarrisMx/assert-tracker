import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    appState: {
        addItemForm: false,
        addDepartmentForm: false,
        addShelveForm: false,
        viewItem: false,
        openedItemId: null,
        baseURL: 'https://atracking.azurewebsites.net/api',
        currentPage: '/'
    },
  }

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleItemForm: (state) => {
            state.appState.addItemForm = !state.appState.addItemForm;
        },
        toggleDeptForm: (state) => {
            state.appState.addDepartmentForm = !state.appState.addDepartmentForm;
        },
        toggleShelveForm: (state) => {
            state.appState.addShelveForm = !state.appState.addShelveForm;
        },
        setOpenedItemId: (state, action) => {
            state.appState.openedItemId = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.appState.currentPage = action.payload;
        }
    }
});

export const { toggleItemForm, setOpenedItemId, toggleDeptForm, toggleShelveForm , setCurrentPage}  = appSlice.actions;
export default appSlice.reducer;