import { ChatListWrapper } from '../RoomPage.style';
import ChatInput from './ChatInput';

export default function ChatViews() {
  return (
    <>
      <ChatListWrapper />
      <ChatInput className="chatinput" />
    </>
  );
}