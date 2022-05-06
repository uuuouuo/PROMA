import axios, {
    AxiosRequestConfig,
    AxiosRequestHeaders,
    AxiosResponse,
    AxiosError,
    HeadersDefaults,
  } from "axios";
  import { BACKEND_URL } from "../config/index";
  
  interface CommonHeaderProperties extends HeadersDefaults {
    "Content-type": string;
    Authorization: string;
  }
  
  // axios 객체 생성
  export const apiInstance = () => {
    const instance = axios.create({
      baseURL: BACKEND_URL,
      headers: {
        "Content-type": "application/json",
      },
    });
  
    // 요청 인터셉터 추가
    instance.interceptors.request.use(
      // 요청을 보내기 전 수행해야 할 일
      (config: AxiosRequestConfig) => {
        // 모든 요청에 헤더 토큰 추가
        const Authorization = "Bearer " + localStorage.getItem("Authorization");
        if (Authorization) {
          const header = config.headers as AxiosRequestHeaders;
          header.Authorization = Authorization;
        }
        return config;
      },
      // 오류 요청을 보내기 전 수행해야 할 일
      (error) => {
        return Promise.reject(error);
      }
    );
  
    // 응답 인터셉터 추가
    instance.interceptors.response.use(
      // 응답 데이터를 가공
      (response: AxiosResponse) => {
        return response;
      },
  
      // 오류 응답 처리
      (error: AxiosError) => {
        if (error.response) {
          console.log(error.response.status);
          if (error.response.status === 401) {
            let accessTokenExpiredCode = error.response.data.code;
            //access token 만료 시
            if (accessTokenExpiredCode === "C004") {
              console.log(error.response.headers);
            }
            //refresh token 만료 시
            else if (accessTokenExpiredCode === "C006") {
            }
          }
          // console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(`Error ${error.message}`);
        }
        //   Promise.reject(error);
      }
    );
    return instance;
  };
  