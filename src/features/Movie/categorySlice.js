import {createSlice} from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'category',
    initialState: '',
    reducers: {
        updateCategory(state, action) {
            return action.payload
        }
    }
})

const { actions, reducer} = categorySlice
export const {updateCategory} = actions
export default reducer