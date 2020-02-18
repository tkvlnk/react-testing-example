import { createBrowserHistory } from 'history';
import React, { useCallback, useEffect, useRef } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Saga, Task } from 'redux-saga';
import configureStore from '../store/configureStore';

export const history = createBrowserHistory();

export const store = configureStore({
  history
});

const AppWrapper: React.FC = ({ children }) => (
  <Provider store={store}>
    <Router history={history}>{children}</Router>
  </Provider>
);

export default AppWrapper;

export const useInjectSaga: <S extends Saga>(
  key: string,
  saga: S,
  ...args: Parameters<S>
) => void = (key, saga, ...args) => {
  useEffect(() => {
    store.injectSaga(key, saga, ...args);

    return () => {
      store.ejectSaga(key);
    };
  }, [key, saga]);
};

export const useRunSaga: <S extends Saga>(
  saga: S,
  cancelOnUnmount?: boolean
) => (
  ...args: Parameters<S>
) => Promise<
  Saga extends () => Iterator<infer Y, infer R, infer N> ? R : unknown
> = (saga, cancelOnUnmount) => {
  const taskRef = useRef<Task | null>(null);

  useEffect(
    () => () => {
      if (cancelOnUnmount) {
        taskRef.current?.cancel();
      }
    },
    []
  );

  return useCallback((...args) => {
    if (taskRef.current?.isRunning()) {
      taskRef.current.cancel();
    }

    taskRef.current = store.runSaga(saga, ...args);

    return taskRef.current.toPromise();
  }, []);
};
