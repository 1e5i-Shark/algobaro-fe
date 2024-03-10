import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Input, Modal } from '@/components';
import { ModalProps } from '@/components/Common/Modal/Modal';
import { FORM_VALIDATION } from '@/constants/formValidation';
import { useEditMyPassword } from '@/hooks/Api/useMembers';
import { InputListProps } from '@/types/input';

interface EditPWInfo {
  currentPassword: string;
  newPassword: string;
  passwordCheck: string;
}

export default function PasswordEditModal({
  isOpen,
  onClose,
  ...props
}: ModalProps) {
  const { register, handleSubmit, formState, watch, reset } =
    useForm<EditPWInfo>({
      mode: 'onChange',
    });

  const { mutate: editMyPasswordMutate } = useEditMyPassword();

  const newPassword = watch('newPassword');
  const currentPassword = watch('currentPassword');

  const isValid = formState.isValid;

  const inputPropsList: InputListProps<EditPWInfo> = [
    {
      label: '기존 비밀번호',
      name: 'currentPassword',
      type: 'password',
      placeholder: '기존 비밀번호',
      required: true,
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

  const onSubmitData: SubmitHandler<EditPWInfo> = data => {
    const { currentPassword, newPassword, passwordCheck } = data;
    // 현재 비밀번호가 없거나 새로운 비밀번호 다르면 취소한다.
    // 모달에서도 확인하지만 재차 확인한다.
    if (!currentPassword || newPassword !== passwordCheck) return;

    const reqBody = { currentPassword, newPassword };

    console.log(reqBody, 'reqBody');
    editMyPasswordMutate(reqBody);
    handleCloseModal();
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
        <p>비밀번호 변경</p>
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
