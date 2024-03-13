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
