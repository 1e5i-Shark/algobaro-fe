import { COMPILE_URL } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';

interface CompileRequest {
  language: string;
  input: string;
  code: string;
}

interface CompileResponse {
  success: boolean;
  response: {
    result: string;
  };
}

export const compile = async (request: CompileRequest) => {
  return await axiosAuthInstance.post<CompileResponse>(
    `${COMPILE_URL}`,
    request
  );
};
