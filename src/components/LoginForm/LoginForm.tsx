import { SubmitHandler, useForm } from 'react-hook-form';

import { InputListProps } from '@/types/input';

import { Button } from '..';
import Input from '../Common/Input/Input';
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

const LOGIN_VALIDATION = {
  EMAIL: {
    pattern: {
      value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-z]*.[a-z]{2,3}$/,
      message: '이메일 형식과 맞지 않습니다.',
    },
  },
};

export default function LoginForm() {
  const { register, handleSubmit, formState, watch } = useForm<LoginInfo>({
    mode: 'onChange',
  });

  const loginEmail = watch('loginEmail');
  const loginPassword = watch('loginPassword');

  const inputPropsList: InputListProps<LoginInfo> = [
    {
      // 백엔드 swagger 확인 후 맞추는 걸로
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
