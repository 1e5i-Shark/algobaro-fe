export const PS_LANGUAGES = ['Java', 'Python', 'JavaScript', 'C++'];
export const ROOM_STATUS = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
};

export const MAX_TAG_LENGTH = 5;

export const ROOM_LIMIT_DATASET = [1, 2, 3, 4, 5, 6].reduce(
  (acc, cur) => {
    acc[cur] = cur.toString();
    return acc;
  },
  {} as Record<number, string>
);
