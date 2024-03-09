import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Input, Modal } from '@/components';
import { ModalProps } from '@/components/Common/Modal/Modal';
import { FORM_VALIDATION } from '@/constants/formValidation';
import { useMyInfo } from '@/hooks/Api/useMembers';
import { InputListProps } from '@/types/input';

interface EditProfileInfo {
  nickname: string;
  bojId: string;
  currentPassword: string;
  newPassword: string;
  passwordCheck: string;
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  ...props
}: ModalProps) {
  const { register, handleSubmit, formState, watch, reset } =
    useForm<EditProfileInfo>({
      mode: 'onChange',
    });

  const { data: myInfoData } = useMyInfo();

  const myInfo = myInfoData?.response;

  const newPassword = watch('newPassword');
  const currentPassword = watch('currentPassword');

  const isValid = formState.isValid;

  const inputPropsList: InputListProps<EditProfileInfo> = [
    {
      label: '닉네임',
      name: 'nickname',
      type: 'text',
      placeholder: '변경할 닉네임',
      required: true,
      isTrim: true,
      defaultValue: myInfo?.nickname,
    },
    {
      label: '백준 ID',
      name: 'bojId',
      type: 'text',
      placeholder: '백준 ID',
      required: true,
      isTrim: true,
      defaultValue: myInfo?.bojId,
    },
    {
      label: '기존 비밀번호',
      name: 'currentPassword',
      type: 'password',
      placeholder: '기존 비밀번호',
      // required: true,
      isTrim: true,
      defaultValue: '',
    },
    {
      label: '새로운 비밀번호',
      name: 'newPassword',
      type: 'password',
      placeholder: '새로운 비밀번호',
      required: !!currentPassword,
      isTrim: true,
      defaultValue: '',
      validation: {
        ...FORM_VALIDATION.PASSWORD,
      },
    },
    {
      label: '비밀번호 확인',
      name: 'passwordCheck',
      type: 'password',
      placeholder: '비밀번호 확인',
      required: !!newPassword,
      isTrim: true,
      defaultValue: '',
      validation: {
        validate: passwordCheck =>
          newPassword === passwordCheck || '비밀번호가 일치하지 않습니다.',
      },
    },
  ];

  const onSubmitData: SubmitHandler<EditProfileInfo> = data => {
    console.log(data);
  };

  const handleCloseModal = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        {...props}
      >
        <p>프로필 수정</p>
        <form onSubmit={handleSubmit(onSubmitData)}>
          <ul>
            {inputPropsList.map(props => {
              return (
                <li key={props.name}>
                  <Input
                    register={register}
                    formState={formState}
                    {...props}
                  />
                </li>
              );
            })}
          </ul>
          <Button
            type="submit"
            disabled={isValid ? false : true}
          >
            수정 완료
          </Button>
        </form>
      </Modal>
    </>
  );
}
