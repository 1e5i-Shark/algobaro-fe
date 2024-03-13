export const SIGNIN_URL = '/v1/auth/sign-in';
export const COMPILE_URL = '/v1/compile';
export const SUBMISSION_URL = '/v1/solves/submission';
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
export const EDIT_MY_INFO_URL = '/v1/members/my/general';
export const EDIT_MY_PASSWORD = '/v1/members/my/password';
export const EDIT_MY_IMAGE = '/v1/members/my/profile-image';
export const SOLVED_HISTORY_LIST = '/v1/solves/history';
