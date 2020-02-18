import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Endpoint } from './constants';

export const NETWORK_ACTION_TYPES = {
  API_CALL_START: 'API_CALL_START',
  API_CALL_SUCCESS: 'API_CALL_SUCCESS',
  API_CALL_FAILURE: 'API_CALL_FAILURE'
} as const;

export const networkActions = {
  apiCallStart: (payload: { req: AxiosRequestConfig; endpoint: Endpoint }) => ({
    type: NETWORK_ACTION_TYPES.API_CALL_START,
    payload
  }),
  apiCallSuccess: (payload: { res: AxiosResponse; endpoint: Endpoint }) => ({
    type: NETWORK_ACTION_TYPES.API_CALL_SUCCESS,
    payload
  }),
  apiCallFailure: (payload: { res: AxiosError; endpoint: Endpoint }) => ({
    type: NETWORK_ACTION_TYPES.API_CALL_FAILURE,
    payload
  })
};
