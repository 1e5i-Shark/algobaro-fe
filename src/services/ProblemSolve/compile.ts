import { COMPILE_URL } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';

interface CompileRequest {
  language: string;
  input: string;
  code: string;
}

interface CompileResponse {
  result: string;
}

export const compile = async (request: CompileRequest) => {
  return await axiosAuthInstance.post<CompileResponse>(
    `${COMPILE_URL}`,
    request
  );
};
