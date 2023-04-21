import {createSlice} from '@reduxjs/toolkit'

import {unverifiedDoctors} from '../../fakeData'

export const userSlice = createSlice({
    name: 'doctors',
    initialState: {value:unverifiedDoctors},
    reducers: {
        addDoctor: (state, action)=>{
            // write coade for adding a user
            state.value.push(action.payload);
        },
        deleteDoctor: (state, action) => {
            //write code for deleting a user
            state.value = state.value.filter((user) => user.id !== action.payload.id)
        },
        updateDoctorState: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {deleteDoctor, updateDoctorState} = userSlice.actions;
export default userSlice.reducer;

//make sure to import reducer in index.js