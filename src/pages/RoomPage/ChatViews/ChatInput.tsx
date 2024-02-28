import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useForm } from 'react-hook-form';

import { Icon, Input } from '@/components';
import { InputWrapper } from '@/components/Common/Input/Input.style';

import { ChatInputWrapper, Form, SendButton } from '../RoomPage.style';

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
    console.log(data);

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
    <ChatInputWrapper className={className}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Todo: Input name 백엔드 데이터와 통일하기 */}
        <InputWrapper>
          <Input
            name="chatValue"
            register={register}
            style={inputStyle}
            onKeyDown={handleKeyDown}
          />
        </InputWrapper>
        <SendButton
          as="button"
          onClick={handleSendClick}
        >
          <Icon background={true}>
            <SendRoundedIcon />
          </Icon>
        </SendButton>
      </Form>
    </ChatInputWrapper>
  );
}
