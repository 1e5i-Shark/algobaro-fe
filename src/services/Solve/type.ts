export interface GetSolvedHistoryListParams {
  page: number;
  size: number;
}

export interface SolvedHistory {
  id: number;
  roomUuid: string;
  language: string;
  solveStatus: 'SUCCESS' | 'FAIL';
  solvedAt: string;
  problemLink: string;
}

export interface SolvedHistoryListResponse {
  success: boolean;
  response: {
    content: SolvedHistory[];
    totalPages: number;
    totalElements: number;
  };
}

export interface SolveResult {
  memberId: number;
  language: string;
  code: string;
  solveStatus: string;
}

export interface SolvedResultResponse {
  success: boolean;
  response: {
    solveResults: SolveResult[];
  };
}
