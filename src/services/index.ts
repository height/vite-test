import { getFetch, postFetch } from './require';

interface ILoginParams {
  mapCode: string;
  applyPWD: string;
  sessionId?: string;
}

/** 口令登录 */
export function loginRequest(params: ILoginParams) {
  return postFetch('/title-grant/check-kingdom', params);
}

interface IApplyParams {
  sessionId: string;
  kvkMapCode: string;
  mapCode: string;
  x: number;
  y: number;
  titleType: string;
  applyPWD: string;
}
/** 申请头衔 */
export function applyRequest(params: IApplyParams) {
  return postFetch('/title-grant/apply', params);
}

interface IApplyingParams {
  mapCode: string;
  titleType?: string;
  sessionId: string;
}
/** 获取头衔申请中的状态 */
export function applyingRequest(params: IApplyingParams) {
  return postFetch('/title-grant/get-queuing', params);
}
