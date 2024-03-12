export const LANGUAGES = {
  JAVA: 'JAVA',
  PYTHON: 'PYTHON',
  JAVASCRIPT: 'JAVASCRIPT',
  'C++': 'C++',
} as const;

export type LanguagesType = keyof typeof LANGUAGES;

export const getEditorMode = (language: string) => {
  switch (language) {
    case LANGUAGES['C++']:
      return 'text/x-c++src';
    case LANGUAGES.JAVA:
      return 'text/x-java';
    case LANGUAGES.PYTHON:
      return 'text/x-python';
    case LANGUAGES.JAVASCRIPT:
      return 'text/javascript';
    default:
      return '';
  }
};

export const getRandomColors = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};
