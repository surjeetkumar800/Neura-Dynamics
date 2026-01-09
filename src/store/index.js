import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import taskReducer from './taskSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    theme: themeReducer,
  },
});

/* -------- Custom hooks (JS version) -------- */

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
