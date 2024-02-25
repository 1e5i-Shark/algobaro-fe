import { UserType } from '@/types/room';

interface ParticipantsProps {
  data: UserType[];
}

export default function Participants({ data }: ParticipantsProps) {
  return (
    <div>
      <h1>Participants</h1>
      {data.map((user, index) => (
        <div key={user.username + index}>{user.username}</div>
      ))}
    </div>
  );
}
