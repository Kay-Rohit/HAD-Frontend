import {createSlice} from '@reduxjs/toolkit'

import {newArticles} from '../fakeData'

export const articleSlice = createSlice({
    name: 'articles',
    initialState: {value:[]},
    reducers: {
        addArticle: (state, action)=>{
            // write coade for adding a user
            state.value.push(action.payload);
        },
        deleteArticle: (state, action) => {
            //write code for deleting an article
            state.value = state.value.filter((article) => article.articleUrl !== action.payload.articleUrl)
        },
        updateArticleState: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {deleteArticle, updateArticleState, addArticle} = articleSlice.actions;
export default articleSlice.reducer;

//make sure to import reducer in index.js