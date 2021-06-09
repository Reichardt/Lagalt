import { applyMiddleware } from '@reduxjs/toolkit';
import { projectMiddleware } from '../features/Project/projectMiddleware';
import { profileMiddleware } from '../features/Profile/profileMiddleware';

export default applyMiddleware(projectMiddleware, profileMiddleware);
