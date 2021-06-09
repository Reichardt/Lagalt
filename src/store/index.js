import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import middleware from './middleware';

export default configureStore({
	reducer: rootReducer,
	enhancers: [middleware],
});
