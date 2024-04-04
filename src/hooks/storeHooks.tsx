import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../utils/redux/appStore';

// Custom hook for strongly typed useDispatch with AppDispatch type
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Custom hook for strongly typed useSelector with RootState type
export const useAppSelector = useSelector.withTypes<RootState>();