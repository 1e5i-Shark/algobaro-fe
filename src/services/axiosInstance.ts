import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';

import { CustomInstance, errorData } from '@/types/api';

import handleAxiosError from './handleAxiosError';

const headers = {
  'Content-Type': 'application/json',
};

const axiosConfig = {
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 1000, // axios 통신 최대 대기 시간
  headers,
};

export const axiosInstance: CustomInstance = axios.create(axiosConfig);
export const axiosAuthInstance: CustomInstance = axios.create(axiosConfig);

/**
 * `response.data`란 코드 형태가 반복 입력해야 하는 것을
 * 줄여주는 함수이다.
 * @param response axios 기본 response 객체
 * @returns response 객체의 data
 */
const onResponse = (response: AxiosResponse): AxiosResponse => response.data;
/**
 * error를 인터셉트하여 에러 반환 전에 작업을 수행하는 함수이다.
 * 레퍼런스 : https://axios-http.com/kr/docs/interceptors
 * @param error axiosError 객체
 * @returns error 객체 반환
 */
const onError = (error: AxiosError): Promise<AxiosError> => {
  // 응답 오류가 있을 경우 추가 작업 수행
  if (isAxiosError<errorData>(error) && error.response) {
    const errorResponse = error.response;

    handleAxiosError(error);
    console.error(errorResponse.data);
  }

  return Promise.reject(error);
};
/**
 * 로컬 스토리지에 jwt 토큰이 있을 경우 해당 토큰을
 * header에 추가하여 새로운 config 객체를 반환하는 함수
 * @param config 기본 요청 config 객체
 * @returns jwt 토큰이 있을 경우 header에 추가한 config 객체
 */
const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  // const accessToken = useLocalStorage('accessToken')[0];
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    console.log(accessToken);
    config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
  }

  return config;
};
// 요청 인터셉터를 추가한다.
axiosInstance.interceptors.request.use(onRequest, onError);
// 응답 인터셉터를 추가한다.
axiosInstance.interceptors.response.use(onResponse, onError);
axiosAuthInstance.interceptors.response.use(onResponse, onError);
