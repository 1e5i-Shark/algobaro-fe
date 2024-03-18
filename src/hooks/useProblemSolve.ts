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
    },
  });
};

export const useSubmission = () => {
  return useMutation({
    mutationFn: submission,
    onSuccess: data => {
      if (data.response.testCaseResults) {
        return data.response.testCaseResults;
      }
      return data;
    },
  });
};
