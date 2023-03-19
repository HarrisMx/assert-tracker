import { createSlice } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';

const initialState = {
    user: {
        username: faker.name.fullName(),
        token: faker.random.alphaNumeric(22) 
    },
  }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state.user = null
        }
    }
});

export const { setUser, removeUser }  = userSlice.actions;
export default userSlice.reducer;