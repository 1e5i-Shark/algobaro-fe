import { LanguagesType } from '@/types/room';

export const convertLanguageValueToKey = (value: string[]) => {
  const languageKey: { [key: string]: LanguagesType } = {
    Java: 'JAVA',
    파이썬: 'PYTHON',
    자바스크립트: 'JAVASCRIPT',
    'C++': 'C++',
  };

  return value.map(v => languageKey[v]);
};
