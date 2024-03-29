import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CheckBox, Input } from '@/components';
import { FORM_VALIDATION } from '@/constants/formValidation';
import { useSignUp } from '@/hooks/Api/useAuth';
import { PATH } from '@/routes/path';
import { InputListProps } from '@/types/input';

import * as S from './SignUpPage.style';

interface SignUpInfo {
  email: string;
  nickname: string;
  bojId: string;
  password: string;
  passwordCheck: string;
}

export default function SignUpPage() {
  const { mutate: signUpMutate, isError, error } = useSignUp();
  const {
    register,
    handleSubmit,
    formState,
    watch,
    setValue,
    setFocus,
    setError,
  } = useForm<SignUpInfo>({
    mode: 'onChange',
  });
  const [isAgree, setIsAgree] = useState(false);
  const navigate = useNavigate();

  const password = watch('password');

  const isValid = formState.isValid;

  const inputPropsList: InputListProps<SignUpInfo> = [
    {
      label: '이메일',
      name: 'email',
      type: 'email',
      placeholder: 'algobaro@example.com',
      required: true,
      validation: FORM_VALIDATION.EMAIL,
    },
    {
      label: '닉네임',
      name: 'nickname',
      type: 'text',
      placeholder: '닉네임',
      required: true,
      isTrim: true,
    },
    {
      label: '백준 ID',
      name: 'bojId',
      type: 'text',
      placeholder: '백준 ID',
      required: true,
      isTrim: true,
    },
    {
      label: '비밀번호',
      name: 'password',
      type: 'password',
      placeholder: '영문+숫자+특수기호 8~20자리',
      required: true,
      isTrim: true,
      validation: {
        ...FORM_VALIDATION.PASSWORD,
      },
    },
    {
      label: '비밀번호 확인',
      name: 'passwordCheck',
      type: 'password',
      placeholder: '비밀번호 확인',
      required: true,
      isTrim: true,
      validation: {
        validate: passwordCheck =>
          password === passwordCheck || '비밀번호가 일치하지 않습니다.',
      },
    },
  ];
  // 회원가입 폼 데이터 제출 함수
  const onSubmitData: SubmitHandler<SignUpInfo> = async data => {
    signUpMutate(data);
  };
  // 개인정보동의 체크 여부 핸들러 함수
  const handleChangeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsAgree(checked);
  };
  // 홈버튼 클릭 이벤트 핸들러 함수
  const handleClickHome = () => {
    navigate(PATH.HOME);
  };

  useEffect(() => {
    if (isError) {
      const errorCode = error.response?.data.error.errorCode;

      switch (errorCode) {
        case 'E00101':
          setValue('email', '');
          setFocus('email');
          setError('email', {
            type: 'E00101',
            message: '새로운 이메일을 입력해주세요',
          });
          break;
        case 'E00102':
          setValue('nickname', '');
          setFocus('nickname');
          setError('nickname', {
            type: 'E00102',
            message: '새로운 닉네임을 입력해주세요',
          });
          break;
      }
    }
  }, [isError]);

  return (
    <S.SignUpPageWrapper>
      <S.SignUpFormContainer onSubmit={handleSubmit(onSubmitData)}>
        <S.SignUpInputContainer>
          {inputPropsList.map(props => {
            return (
              <S.SignUpInputItem key={props.name}>
                <Input
                  register={register}
                  formState={formState}
                  {...props}
                />
              </S.SignUpInputItem>
            );
          })}
        </S.SignUpInputContainer>
        <CheckBox
          label="개인 정보 제공함에 동의합니다"
          onChange={handleChangeCheck}
          checked={isAgree}
        />
        <S.SignUpButton
          type="submit"
          disabled={isValid && isAgree ? false : true}
          style={{
            cursor: isValid && isAgree ? '' : 'not-allowed',
          }}
        >
          가입하기
        </S.SignUpButton>
        <S.HomeButton onClick={handleClickHome}>시작페이지로</S.HomeButton>
      </S.SignUpFormContainer>
    </S.SignUpPageWrapper>
  );
}
