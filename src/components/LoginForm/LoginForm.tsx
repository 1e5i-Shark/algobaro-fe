import { SubmitHandler, useForm } from 'react-hook-form';

import { InputListProps } from '@/types/input';

import { Button } from '..';
import Input from '../Common/Input/Input';
import { LOGIN_VALIDATION } from './loginConstants';
import {
  LoginFormContainer,
  LoginFormWrapper,
  LoginInputContainer,
  LoginInputItem,
} from './LoginForm.style';

interface LoginInfo {
  loginEmail: string;
  loginPassword: string;
}

export default function LoginForm() {
  const { register, handleSubmit, formState, watch } = useForm<LoginInfo>({
    mode: 'onChange',
  });

  const loginEmail = watch('loginEmail');
  const loginPassword = watch('loginPassword');

  const inputPropsList: InputListProps<LoginInfo> = [
    {
      label: '이메일',
      name: 'loginEmail',
      type: 'email',
      placeholder: 'algo@email.com',
      validation: LOGIN_VALIDATION.EMAIL,
    },
    {
      label: '비밀번호',
      name: 'loginPassword',
      type: 'password',
      placeholder: '비밀번호',
    },
  ];

  const onSubmitData: SubmitHandler<LoginInfo> = data => {
    // TODO: 서버 인증 로직 추가
    // 인증 성공 시 토큰 로컬 스토리지에 저장
    /* 출력 예
      {"loginEmail":"algo@naver.com","loginPassword":"algobaro"}
    */
    console.log('제출한 데이터:', JSON.stringify(data)); // 로그인 정보 테스트 출력
  };

  return (
    <LoginFormWrapper>
      <LoginFormContainer onSubmit={handleSubmit(onSubmitData)}>
        <LoginInputContainer>
          {inputPropsList.map(props => {
            return (
              <LoginInputItem key={props.name}>
                <Input
                  register={register}
                  formState={formState}
                  {...props}
                />
              </LoginInputItem>
            );
          })}
        </LoginInputContainer>
        <Button
          type="submit"
          disabled={loginEmail && loginPassword ? false : true}
        >
          로그인
        </Button>
      </LoginFormContainer>
    </LoginFormWrapper>
  );
}
