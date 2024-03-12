import { useMutation } from '@tanstack/react-query';

import { compile } from '@/services/ProblemSolve/compile';
import { submission } from '@/services/ProblemSolve/submission';

export const useCompile = () => {
  return useMutation({
    mutationFn: compile,
    onSuccess: response => {
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
