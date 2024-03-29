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
  failureReason: string;
}

export interface SolvedHistoryListResponse {
  success: boolean;
  response: {
    content: SolvedHistory[];
    totalPages: number;
    totalElements: number;
  };
}

export interface SolvedDetailResponse {
  success: boolean;
  response: {
    id: number;
    roomUuid: string;
    language: string;
    code: string;
    solveStatus: string;
    solvedAt: string;
    platform: 'BOJ';
    problemLink: string;
    failureReason: string;
  };
}

export interface SolveResult {
  memberId: number;
  language: string;
  code: string;
  solveStatus: string;
  failureReason: string;
}

export interface SolvedResultResponse {
  success: boolean;
  response: {
    solveResults: SolveResult[];
  };
}
