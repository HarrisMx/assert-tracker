import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    appState: {
        addItemForm: false,
        addDepartmentForm: false,
        addShelveForm: false,
        viewItem: false,
        openedItemId: null,
        baseURL: 'https://atracking.azurewebsites.net/api',
        currentPage: '/',
        appData : null
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
        },
        setAppData: (state, action) => {
            state.appState.appData = action.payload;
        }
    }
});

export const { 
    toggleItemForm, 
    setOpenedItemId, 
    toggleDeptForm, 
    toggleShelveForm , 
    setCurrentPage, 
    setAppData
}  = appSlice.actions;
export default appSlice.reducer;