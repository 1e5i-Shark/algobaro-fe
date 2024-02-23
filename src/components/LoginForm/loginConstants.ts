export const LOGIN_VALIDATION = {
  EMAIL: {
    pattern: {
      value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-z]*.[a-z]{2,3}$/,
      message: '이메일 형식과 맞지 않습니다.',
    },
  },
};
