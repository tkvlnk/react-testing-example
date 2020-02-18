import { ActionCreator, AnyAction, Reducer } from 'redux';
import { Selector } from 'reselect';
import { AppState } from '../store/configureStore';
import { productActions } from '../store/products/actions';
import { networkActions } from '../store/network/actions';

declare global {
  type ExtractActionInterfaces<
    T extends { [key: string]: ActionCreator<AnyAction> }
  > = ReturnType<T[keyof T]>;

  type AppActions = ExtractActionInterfaces<
    typeof productActions & typeof networkActions
  >;

  type AppReducer<S> = Reducer<S, AppActions>;

  type AppSelector<R> = Selector<AppState, R>;

  interface LoadedDataState<D> {
    data: D;
    error: string;
    loading: boolean;
  }

  type TypeOfAction<F extends Function> = ReturnType<F>;
}
