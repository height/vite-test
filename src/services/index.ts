import { getFetch, postFetch } from './require';

interface ILoginParams {
  mapCode: string;
  applyPWD: string;
  sessionId?: string;
}
export function loginRequest(params: ILoginParams) {
  postFetch('/title-grant/check-kingdom', params);
}
