import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Props {
  code: string;
  language: string;
  input: string;
  result: string;
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setInput: (input: string) => void;
  setResult: (result: string) => void;
}

// TODO: 서버로부터 데이터 받아와서 교체 필요
const MOCK_LANGUAGE = 'nodejs';
const MOCK_INPUT = '1 2';

const useCodeEditorStore = create<Props>()(
  devtools(set => ({
    code: '',
    language: MOCK_LANGUAGE,
    input: MOCK_INPUT,
    result: '',
    setCode: (code: string) => set({ code }),
    setInput: (input: string) => set({ input }),
    setLanguage: (language: string) => set({ language }),
    setResult: (result: string) => set({ result }),
  }))
);

export default useCodeEditorStore;
