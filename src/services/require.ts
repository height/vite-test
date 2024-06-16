import axios from 'axios';

const baseUrl =
  'https://koa.web-koa.1666126356105365.cn-chengdu.fc.devsapp.net';

interface IParams {
  url: string;
  method: 'POST' | 'GET';
  data?: { [key: string]: any };
  headers?: { [key: string]: any };
}

interface IResponse {
  success: boolean;
  data?: any;
  error?: any;
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

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: response.data,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error,
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