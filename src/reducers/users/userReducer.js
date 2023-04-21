import {createSlice} from '@reduxjs/toolkit'

import {patients} from '../../fakeData'

export const userSlice = createSlice({
    name: 'users',
    initialState: {value:[]},
    reducers: {
        addUser: (state, action)=>{
            // write coade for adding a user
            state.value.push(action.payload);
        },
        deleteUser: (state, action) => {
            //write code for deleting a user
            state.value = state.value.filter((user) => user.id !== action.payload.id)
        },
        updateUserState: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {addUser, deleteUser, updateUserState} = userSlice.actions;
export default userSlice.reducer;

//make sure to import reducer in index.js