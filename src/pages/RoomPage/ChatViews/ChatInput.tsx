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
    console.log(data);
    reset();
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
          />
        </InputWrapper>
        <SendButton as="button">
          <Icon background={true}>
            <SendRoundedIcon />
          </Icon>
        </SendButton>
      </Form>
    </ChatInputWrapper>
  );
}
