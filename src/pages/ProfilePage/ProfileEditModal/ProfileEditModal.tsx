import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Input, Modal } from '@/components';
import { ModalProps } from '@/components/Common/Modal/Modal';
import { useEditMyInfo, useMyInfo } from '@/hooks/Api/useMembers';
import { InputListProps } from '@/types/input';

import * as S from './ProfileEditModal.style';

interface EditProfileInfo {
  nickname: string;
  bojId: string;
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  ...props
}: ModalProps) {
  const { register, handleSubmit, formState, reset } = useForm<EditProfileInfo>(
    {
      mode: 'onChange',
    }
  );

  const { data: myInfoData } = useMyInfo();

  const myInfo = myInfoData?.response;

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
  ];

  const { mutate: editMyInfoMutate } = useEditMyInfo();

  const onSubmitData: SubmitHandler<EditProfileInfo> = data => {
    editMyInfoMutate(data);
    onClose();
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
        style={{
          minWidth: '45rem',
        }}
      >
        <S.ModalTitle>프로필 정보 수정</S.ModalTitle>
        <S.ModalForm onSubmit={handleSubmit(onSubmitData)}>
          <S.ModalInputList>
            {inputPropsList.map(props => {
              return (
                <S.ModalInputItem key={props.name}>
                  <Input
                    register={register}
                    formState={formState}
                    {...props}
                  />
                </S.ModalInputItem>
              );
            })}
          </S.ModalInputList>
          <Button
            type="submit"
            disabled={isValid ? false : true}
          >
            수정 완료
          </Button>
        </S.ModalForm>
      </Modal>
    </>
  );
}
