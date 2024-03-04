import { SubmitHandler, useForm } from 'react-hook-form';

import { CheckBox, Input } from '@/components';
import { FORM_VALIDATION } from '@/constants/formValidation';
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
  const { register, handleSubmit, formState, watch } = useForm<SignUpInfo>({
    mode: 'onChange',
  });

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
      validation: {
        validate: nickname =>
          nickname.length === nickname.trim().length ||
          '앞뒤 공백을 제거해주세요.',
      },
    },
    {
      label: '백준 ID',
      name: 'bojId',
      type: 'text',
      placeholder: '백준 ID',
      required: true,
      validation: {
        validate: nickname =>
          nickname.length === nickname.trim().length ||
          '앞뒤 공백을 제거해주세요.',
      },
    },
    {
      label: '비밀번호',
      name: 'password',
      type: 'password',
      placeholder: '영문+숫자+특수기호 8~20자리',
      required: true,
      validation: FORM_VALIDATION.PASSWORD,
    },
    {
      label: '비밀번호 확인',
      name: 'passwordCheck',
      type: 'password',
      placeholder: '비밀번호 확인',
      required: true,
      validation: {
        validate: passwordCheck =>
          password === passwordCheck || '비밀번호가 일치하지 않습니다.',
      },
    },
  ];

  const onSubmitData: SubmitHandler<SignUpInfo> = async data => {
    console.log(data);
  };

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
        <CheckBox label="개인 정보 제공에 동의합니다." />
        <S.SignUpButton>가입하기</S.SignUpButton>
        <S.HomeButton>홈으로</S.HomeButton>
      </S.SignUpFormContainer>
    </S.SignUpPageWrapper>
  );
}
