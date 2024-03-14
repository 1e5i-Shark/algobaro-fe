export const LANGUAGES = {
  JAVA: 'JAVA',
  PYTHON: 'PYTHON',
  JAVASCRIPT: 'JAVASCRIPT',
  'C++': 'C++',
} as const;

export type LanguagesType = keyof typeof LANGUAGES;

export const getEditorMode = (language: string) => {
  switch (language) {
    case 'c++':
      return 'text/x-c++src';
    case 'java':
      return 'text/x-java';
    case 'python':
      return 'text/x-python';
    case 'javascript':
      return 'text/javascript';
    default:
      return 'text/javascript';
  }
};

export const getRandomColors = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};
