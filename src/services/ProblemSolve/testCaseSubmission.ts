import { API_ENDPOINT } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';
import { TestCaseResultType } from './submission';

interface TestCaseSubmissionRequest {
  roomShortUuid: string;
  language: string;
  code: string;
  problemLink: string;
  solveStatus: string;
  failureReason: string;
}

interface TestCaseSubmissionResponse {
  success: boolean;
  response: {
    testCaseResults: TestCaseResultType[];
  };
}

/**
 * 백준 문제 링크에서 입력한 코드에 대한 테스트 케이스 결과를 가져오는 함수
 * @param request TestCaseSubmissionRequest
 * @returns 테스트 결과
 */
export const testCaseSubmission = async (
  request: TestCaseSubmissionRequest
) => {
  return await axiosAuthInstance.post<TestCaseSubmissionResponse>(
    `${API_ENDPOINT.SOLVE.TEST_CASE_SUBMISSION}`,
    request
  );
};
