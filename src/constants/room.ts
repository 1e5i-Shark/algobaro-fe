import { LanguagesType } from '@/types/room';

export const PS_LANGUAGES = ['JAVA', 'PYTHON', 'JAVASCRIPT', 'C++'];
export const ROOM_STATUS = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
};

export const MAX_TAG_LENGTH = 5;
export const MAX_TAG_INPUT_LENGTH = 15;

export const ROOM_LIMIT_DATASET = [1, 2, 3, 4, 5, 6].reduce(
  (acc, cur) => {
    acc[cur] = cur.toString();
    return acc;
  },
  {} as Record<number, string>
);

export const LANGUAGES_DATA_SET: Record<LanguagesType, string> = {
  JAVA: 'Java',
  PYTHON: '파이썬',
  JAVASCRIPT: '자바스크립트',
  'C++': 'C++',
};

export const MOCK_ROOM_DATA = {
  id: 33,
  roomShortUuid: '6ab92c74',
};

export const PROBLEM_LANGUAGES_DATA_SET: Record<string, string> = {
  nodejs: 'JavaScript',
  python3: 'Python',
  java: 'Java',
  cpp: 'C++',
};
