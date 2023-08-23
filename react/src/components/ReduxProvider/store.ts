import { boardsApi } from '#/domain/reducers/boardsReducer';
import type { Store } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createWrapper } from 'next-redux-wrapper';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

export type AppStore = ReturnType<typeof makeStore>;
export type State = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

const makeStore = () => {
  const store = configureStore({
    reducer: {
      [boardsApi.reducerPath]: boardsApi.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => (
      getDefaultMiddleware()
        .concat(boardsApi.middleware)
    ),
  });

  setupListeners(store.dispatch);

  return store;
};

export const wrapper = createWrapper<Store<State>>(makeStore);
