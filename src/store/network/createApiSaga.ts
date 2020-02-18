import { AxiosRequestConfig } from 'axios';
import { call, put } from 'redux-saga/effects';
import httpClient from './httpClient';
import { networkActions } from './actions';
import { Endpoint } from './constants';

const createApiSaga = <In extends unknown[]>({
  buildReqConfig,
  addApiKey,
  endpoint
}: {
  buildReqConfig: (...args: In) => AxiosRequestConfig;
  addApiKey: boolean;
  readonly endpoint: Endpoint;
}) =>
  function* apiSaga(...args: Parameters<typeof buildReqConfig>) {
    const reqConfig = buildReqConfig(...args);

    yield put(
      networkActions.apiCallStart({
        req: reqConfig,
        endpoint
      })
    );

    if (addApiKey) {
      if (!reqConfig.headers) {
        reqConfig.headers = {};
      }

      reqConfig.headers.Authorization = process.env.REACT_APP_API_KEY;
    }

    try {
      const response = yield call(httpClient.request, reqConfig);

      yield put(
        networkActions.apiCallSuccess({
          res: response,
          endpoint
        })
      );

      return response.data;
    } catch (e) {
      yield put(
        networkActions.apiCallFailure({
          res: e,
          endpoint
        })
      );

      throw e.response?.data?.error ?? e;
    }
  };

export default createApiSaga;
