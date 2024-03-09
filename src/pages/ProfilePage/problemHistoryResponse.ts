interface HistoryContent {
  id: number;
  roomUuid: string;
  language: string | null;
  solveStatus: 'SUCCESS' | 'FAIL';
  solvedAt: string;
}

interface ProblemHistoryResType {
  content: HistoryContent[];
  totalPages: number;
  totalElements: number;
}

export const problemHistoryResponse: ProblemHistoryResType[] = [
  {
    content: [
      {
        id: 1,
        roomUuid: '123e4567-e89b-12d3-a456-426614174000',
        language: 'java',
        solveStatus: 'FAIL',
        solvedAt: '2024-03-08T14:53:13',
      },
      {
        id: 2,
        roomUuid: '123e4567-e89b-12d3-a456-426614174001',
        language: 'python',
        solveStatus: 'SUCCESS',
        solvedAt: '2024-03-08T14:53:13',
      },
      {
        id: 3,
        roomUuid: '123e4567-e89b-12d3-a456-426614174002',
        language: 'javaScript',
        solveStatus: 'SUCCESS',
        solvedAt: '2024-03-08T14:53:13',
      },
      {
        id: 4,
        roomUuid: '123e4567-e89b-12d3-a456-426614174003',
        language: 'cPlusPlus',
        solveStatus: 'FAIL',
        solvedAt: '2024-03-08T14:53:13',
      },
    ],
    totalPages: 4,
    totalElements: 15,
  },
  {
    content: [
      {
        id: 5,
        roomUuid: '123e4567-e89b-12d3-a456-426614174004',
        language: 'java',
        solveStatus: 'FAIL',
        solvedAt: '2024-03-08T14:53:13',
      },
      {
        id: 6,
        roomUuid: '123e4567-e89b-12d3-a456-426614174005',
        language: 'python',
        solveStatus: 'SUCCESS',
        solvedAt: '2024-03-08T14:53:13',
      },
      {
        id: 7,
        roomUuid: '123e4567-e89b-12d3-a456-426614174006',
        language: 'javaScript',
        solveStatus: 'SUCCESS',
        solvedAt: '2024-03-08T14:53:13',
      },
      {
        id: 8,
        roomUuid: '123e4567-e89b-12d3-a456-426614174007',
        language: 'cPlusPlus',
        solveStatus: 'FAIL',
        solvedAt: '2024-03-08T14:53:13',
      },
    ],
    totalPages: 4,
    totalElements: 15,
  },
  {
    content: [
      {
        id: 9,
        roomUuid: '123e4567-e89b-12d3-a456-426614174008',
        language: 'java',
        solveStatus: 'FAIL',
        solvedAt: '2024-03-08T14:53:13',
      },
      {
        id: 10,
        roomUuid: '123e4567-e89b-12d3-a456-426614174009',
        language: 'python',
        solveStatus: 'SUCCESS',
        solvedAt: '2024-03-08T14:53:13',
      },
      {
        id: 11,
        roomUuid: '123e4567-e89b-12d3-a456-426614174010',
        language: 'javaScript',
        solveStatus: 'SUCCESS',
        solvedAt: '2024-03-08T14:53:13',
      },
      {
        id: 12,
        roomUuid: '123e4567-e89b-12d3-a456-426614174011',
        language: 'javaScript',
        solveStatus: 'SUCCESS',
        solvedAt: '2024-03-08T14:53:13',
      },
    ],
    totalPages: 4,
    totalElements: 15,
  },
  {
    content: [
      {
        id: 13,
        roomUuid: '123e4567-e89b-12d3-a456-426614174012',
        language: 'java',
        solveStatus: 'FAIL',
        solvedAt: '2024-03-08T14:53:13',
      },
      {
        id: 14,
        roomUuid: '123e4567-e89b-12d3-a456-426614174013',
        language: 'python',
        solveStatus: 'SUCCESS',
        solvedAt: '2024-03-08T14:53:13',
      },
      {
        id: 15,
        roomUuid: '123e4567-e89b-12d3-a456-426614174014',
        language: 'javaScript',
        solveStatus: 'SUCCESS',
        solvedAt: '2024-03-08T14:53:13',
      },
    ],
    totalPages: 4,
    totalElements: 15,
  },
];
