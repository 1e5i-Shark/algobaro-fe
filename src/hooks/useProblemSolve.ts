import { useMutation } from '@tanstack/react-query';

import { compile } from '@/services/ProblemSolve/compile';
import { submission } from '@/services/ProblemSolve/submission';
import useCodeEditorStore from '@/store/CodeEditorStore';

export const useCompile = () => {
  const setResult = useCodeEditorStore(state => state.setResult);

  return useMutation({
    mutationFn: compile,
    onSuccess: response => {
      if (response.success) {
        setResult(response.response.result);
      }
      console.log('compile response', response);
    },
  });
};

export const useSubmission = () => {
  return useMutation({
    mutationFn: submission,
    onSuccess: response => {
      console.log('submission response', response);
    },
  });
};
