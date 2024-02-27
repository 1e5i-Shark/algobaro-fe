export const LOGIN_EMIAL_VALIDATION = {
  EMAIL: {
    pattern: {
      value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-z]+[.]+[a-z]{2,3}$/,
      message: '이메일 형식이 아닙니다.',
    },
  },
};

export const SIGNIN_URL = '/api/v1/auth/sign-in';
