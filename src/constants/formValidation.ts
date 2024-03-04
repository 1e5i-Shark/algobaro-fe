export const FORM_VALIDATION = {
  EMAIL: {
    pattern: {
      value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-z]+[.][a-z]{2,3}$/,
      message: '이메일 형식이 아닙니다.',
    },
  },
  PASSWORD: {
    minLength: {
      value: 8,
      message: '최소 8자리 이상 입력해 주세요.',
    },
    maxLength: {
      value: 20,
      message: '최대 20자리 이내로 입력해 주세요.',
    },
    pattern: {
      value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/,
      message: '영문 숫자 특수 기호 조합 8 ~ 20자리로 구성해주세요.',
    },
  },
};
