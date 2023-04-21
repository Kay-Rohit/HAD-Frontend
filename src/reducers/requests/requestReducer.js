import {createSlice} from '@reduxjs/toolkit'

const req = [{
    "id": 1,
    "firstName": "Eugen",
    "lastName": "Giamelli",
    "depressionSeverity":50
  }];

export const requestSlice = createSlice({
    name: 'requests',
    initialState: {value:req},
    reducers: {
        addRequest: (state, action)=>{
            // write coade for adding a user
            state.value.push(action.payload);
        },
        deleteRequests: (state, action) => {
            //write code for deleting a user
            state.value = state.value.filter((req) => req.id !== action.payload.id)
        },
        updateRequestState: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {addRequest, deleteRequests, updateRequestState} = requestSlice.actions;
export default requestSlice.reducer;

//make sure to import reducer in index.js