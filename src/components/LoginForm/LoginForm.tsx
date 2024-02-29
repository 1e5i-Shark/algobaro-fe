import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useSignIn } from '@/hooks/Api/useAuth';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { PATH } from '@/routes/path';
import { InputListProps } from '@/types/input';

import CheckBox from '../Common/CheckBox/CheckBox';
import Input from '../Common/Input/Input';
import { LOGIN_EMIAL_VALIDATION } from './loginConstants';
import {
  LoginButton,
  LoginFormContainer,
  LoginFormWrapper,
  LoginInputContainer,
  LoginInputItem,
  LoginOptionContainer,
  SignUpTextLink,
} from './LoginForm.style';

interface LoginInfo {
  loginEmail: string;
  loginPassword: string;
}

export default function LoginForm({ width = '100%' }: { width?: string }) {
  // 저장된 accessToken
  const [accessToken] = useLocalStorage('accessToken');
  // 저장한 이메일 아이디
  const [saveEmail, setSaveEmail] = useLocalStorage('saveEmail');
  // 아이디 저장 옵션 여부
  const [isSaveEmail, setIsSaveEmail] = useState(saveEmail ? true : false);
  // login react form
  const { register, handleSubmit, formState, reset } = useForm<LoginInfo>({
    mode: 'onChange',
    defaultValues: {
      // 아이디 저장한 것을 기본값으로 불러온다.
      loginEmail: saveEmail ? saveEmail : '',
      loginPassword: '',
    },
  });
  // signIn api mutate 훅
  const { mutate: signInMutate } = useSignIn();
  // 입력값 유효성 체크
  const isValid = formState.isValid;

  const inputPropsList: InputListProps<LoginInfo> = [
    {
      label: '이메일',
      name: 'loginEmail',
      type: 'email',
      placeholder: 'algo@email.com',
      required: true,
      validation: LOGIN_EMIAL_VALIDATION.EMAIL,
    },
    {
      label: '비밀번호',
      name: 'loginPassword',
      type: 'password',
      required: true,
      placeholder: '비밀번호',
    },
  ];

  // 로그인 데이터 api 통신 후 데이터 저장 및 메인페이지(홈) 이동하는 함수
  const onSubmitData: SubmitHandler<LoginInfo> = async data => {
    // 아이디 저장 체크 시 로컬 스토리지에 저장
    // 해제 시 초기화
    const { loginEmail } = data;
    setSaveEmail(isSaveEmail ? loginEmail : '');

    // api를 호출하고 인증 성공 시 토큰을 로컬 스토리지에 저장한다.
    // 이후 메인 페이지(홈)으로 다이렉팅한다.
    signInMutate(data);

    // 성공적으로 로그인이 되면 form 리셋
    reset();
  };
  // 아이디 저장 체크 박스 변경 사항을 상태로 저장한다.
  const handleChangeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsSaveEmail(checked);
  };

  return (
    <>
      {!accessToken ? (
        <LoginFormWrapper width={width}>
          <LoginFormContainer onSubmit={handleSubmit(onSubmitData)}>
            {/* 로그인 정보 입력 영역 */}
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
            {/* 로그인 버튼 */}
            <LoginButton
              type="submit"
              disabled={isValid ? false : true}
            >
              로그인
            </LoginButton>
            {/* 로그인 정보 외 설정 및 링크 영역 */}
            <LoginOptionContainer>
              <CheckBox
                label="아이디 저장"
                onChange={handleChangeCheck}
                checked={isSaveEmail}
              />
              <SignUpTextLink to={PATH.SIGNUP}>
                아직 회원가입을 안하셨나요?
              </SignUpTextLink>
            </LoginOptionContainer>
          </LoginFormContainer>
        </LoginFormWrapper>
      ) : null}
    </>
  );
}
