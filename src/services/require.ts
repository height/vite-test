import axios from 'axios';

const baseUrl = 'http://koa.web-koa.1666126356105365.cn-chengdu.fc.devsapp.net';

interface IParams<T = any> {
  url: string;
  method: 'POST' | 'GET';
  data?: { [key: string]: T };
  headers?: { [key: string]: any };
}

export interface IResponse {
  success: boolean;
  resolve?: any;
  reject?: any;
}

export const request = async (params: IParams): Promise<IResponse> => {
  const { url, method = 'GET', data = {}, headers = {} } = params;

  try {
    const response = await axios({
      url: `${baseUrl}${url}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data: method === 'POST' ? data : undefined,
      params: method === 'GET' ? data : undefined,
    });

    if (response.status === 200 && response?.data?.success === true) {
      return {
        success: true,
        resolve: response.data,
      };
    } else {
      return {
        success: false,
        reject: response.data,
      };
    }
  } catch (error) {
    return {
      success: false,
      reject: error,
    };
  }
};

// 封装GET请求
export const getFetch = (url: string, data = {}, headers = {}) => {
  return request({
    url,
    method: 'GET',
    data,
    headers,
  });
};

// 封装POST请求
export const postFetch = (url: string, data = {}, headers = {}) => {
  return request({
    url,
    method: 'POST',
    data,
    headers,
  });
};
