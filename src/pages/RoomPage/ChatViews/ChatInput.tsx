import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useForm } from 'react-hook-form';

import { Icon, Input } from '@/components';

import * as S from '../RoomPage.style';

interface ChatInputProps {
  className: string;
}

interface FormProps {
  chatValue: string;
}

export default function ChatInput({ className }: ChatInputProps) {
  const { register, handleSubmit, reset } = useForm<FormProps>();

  const inputStyle = {
    height: '4rem',
  };

  const onSubmit = (data: FormProps) => {
    if (!data.chatValue) return;

    reset();
    alert('submit!');
  };

  const handleSendClick = () => {
    handleSubmit(onSubmit)();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return;
    } else {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <S.ChatInputWrapper className={className}>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.InputWrapper>
          <Input
            name="chatValue"
            register={register}
            style={inputStyle}
            onKeyDown={handleKeyDown}
          />
        </S.InputWrapper>
        <S.SendButton onClick={handleSendClick}>
          <Icon background={true}>
            <SendRoundedIcon />
          </Icon>
        </S.SendButton>
      </S.Form>
    </S.ChatInputWrapper>
  );
}
