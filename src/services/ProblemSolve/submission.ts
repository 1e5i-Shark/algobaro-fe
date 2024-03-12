import { SUBMISSION_URL } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';

interface SubmissionRequest {
  roomUuid: string;
  language: string;
  code: string;
  problemLink: string;
}

interface TestCaseResultType {
  caseNumber: number;
  input: string;
  output: string;
  result: string;
  success: boolean;
}

interface SubmissionResponse {
  testCaseResults: TestCaseResultType[];
}

export const submission = async (request: SubmissionRequest) => {
  return await axiosAuthInstance.post<SubmissionResponse>(
    `${SUBMISSION_URL}`,
    request
  );
};
