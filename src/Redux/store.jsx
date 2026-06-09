import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/searchSlice';


const store = configureStore({
    
    reducer: {
        // Add your reducers here
        search: searchReducer,
    },

    
});

export default store;