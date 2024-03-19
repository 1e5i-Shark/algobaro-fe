import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { SOCKET_TYPE } from '@/constants/socket';
import { PATH } from '@/routes/path';
import { compile } from '@/services/ProblemSolve/compile';
import { submission } from '@/services/ProblemSolve/submission';
import useCodeEditorStore from '@/store/CodeEditorStore';
import useMessageStore from '@/store/MessageStore';
import useRoomStore from '@/store/RoomStore';

export const useCompile = () => {
  const setResult = useCodeEditorStore(state => state.setResult);

  return useMutation({
    mutationFn: compile,
    onSuccess: response => {
      if (response.success) {
        setResult(response.response.result);
      }
    },
  });
};

export const useSubmission = () => {
  const { sendMessage } = useMessageStore();
  const {
    roomData: { roomShortUuid },
  } = useRoomStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: submission,
    onSuccess: () => {
      // 코드 제출 성공 시 소켓 END_CODING 전송 -> 공유 페이지로 이동
      sendMessage(SOCKET_TYPE.ROOM.END_CODING);
      navigate(`${PATH.PROBLEMSHARE}/${roomShortUuid}`, { replace: true });
    },
  });
};
