import { SUBMISSION_URL } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';

interface SubmissionRequest {
  roomShortUuid: string;
  language: string;
  code: string;
  problemLink: string;
}

export interface TestCaseResultType {
  caseNumber: number;
  input: string;
  output: string;
  result: string;
  success: boolean;
}

interface SubmissionResponse {
  success: boolean;
  response: {
    testCaseResults: TestCaseResultType[];
  };
}

export const submission = async (request: SubmissionRequest) => {
  return await axiosAuthInstance.post<SubmissionResponse>(
    `${SUBMISSION_URL}`,
    request
  );
};
