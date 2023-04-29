import {createSlice} from '@reduxjs/toolkit'

export const defaultQuestionaire = createSlice({
    name: 'questions',
    initialState: {value:[]},
    reducers: {
        updateQuestion: (state, action) => {
            state.value = action.payload;
        },

        updateSingleQuestion: (state, action) => {
            state.value = state.value.filter((question) => question.id !== action.payload.id);
            state.value.push(action.payload);
        }
    }
});

export const {updateQuestion, updateSingleQuestion} = defaultQuestionaire.actions;
export default defaultQuestionaire.reducer;

//make sure to import reducer in index.js