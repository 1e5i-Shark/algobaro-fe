export const SIGNIN_URL = '/v1/auth/sign-in';
export const COMPILE_URL = '/v1/compile';
export const SUBMISSION_URL = '/v1/solves/submission';
export const SIGNUP_URL = '/v1/auth/sign-up';
export const PROBLEM_URL = '/v1/problems/html';
export const MY_INFO_URL = '/v1/members/my';

export const API_ENDPOINT = {
  ROOM: {
    ROOMS: '/v1/rooms',
  },
  SOCKET: {
    PUBLICATION: '/publication',
    SUBSCRIPTION: '/subscription',
  },
  AUDIO: {
    PUBLICATION: '/publication',
    SUBSCRIPTION: '/subscription',
  },
  PROBLEM: {
    PROBLEM_INFO: '/v1/problems/html',
  },
  SOLVE: {
    SOLVED_HISTORY_LIST: '/v1/solves/history',
    SOVLED_HISTORY_DETAIL: '/v1/solves/history/',
    RESULT: '/v1/solves/result',
    TEST_CASE_SUBMISSION: '/v1/solves/submission-and-compile',
  },
  MEMBER: {
    EDIT_MY_INFO_URL: '/v1/members/my/general',
    EDIT_MY_PASSWORD: '/v1/members/my/password',
    EDIT_MY_IMAGE: '/v1/members/my/profile-image',
  },
};
