export const CheckUserLogin = () => {
  // 유저가 로그인 했는지 검사하는 로직
  const accessToken = localStorage.getItem('accessToken');
  return accessToken;
};
