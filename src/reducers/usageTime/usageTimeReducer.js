import {createSlice} from '@reduxjs/toolkit'

const usg = [
    {
      id: 1,
      usageTime: "<15 mins" ,
      count: 8
    },
    {
      id: 2,
      usageTime: "15-30 mins" ,
      count: 6
    },{
      id: 3,
      usageTime: "30-45 mins" ,
      count: 5
    },{
      id: 4,
      usageTime: "45-60 mins" ,
      count: 2
    },{
      id: 1,
      usageTime: ">60 mins" ,
      count: 2
    },
  ];

export const usgSlice = createSlice({
    name: 'usageTime',
    initialState: {value:usg},
    reducers: {
        addUsageTime: (state, action)=>{
            // write coade for adding a user
            state.value.push(action.payload);
        }
    }
});

export const {addUsageTime} = usgSlice.actions;
export default usgSlice.reducer;

//make sure to import reducer in index.js