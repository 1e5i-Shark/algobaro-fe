export const SIGNIN_URL = '/v1/auth/sign-in';
export const SIGNUP_URL = '/v1/auth/sign-up';
export const PROBLEM_URL = '/v1/problems/html';
export const MY_INFO_URL = '/v1/members/my';

export const API_ENDPOINT = {
  ROOM: {
    ROOMS: '/v1/rooms',
    CODES: '/v1/rooms/codes',
    JOIN: '/v1/rooms-join', // 삭제
    READY: '/v1/rooms-ready', // 삭제
    CHANGE_HOST_AUTO: '/v1/rooms/auto-change-host', // 삭제
    CHANGE_HOST_MANUAL: '/v1/rooms/manual-change-host', // 삭제
  },
  SOCKET: {
    PUBLICATION: '/publication',
    SUBSCRIPTION: '/subscription',
  },
};
