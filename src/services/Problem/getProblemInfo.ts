import { API_ENDPOINT } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';

interface GetProblemResponse {
  success: boolean;
  response: {
    problemInfoHtml: string;
  };
}

const getProblemInfo = async (problemLink: string) => {
  return await axiosAuthInstance.get<GetProblemResponse>(
    `${API_ENDPOINT.PROBLEM.PROBLEM_INFO}`,
    {
      params: {
        problemLink,
      },
    }
  );
};

export default getProblemInfo;
