import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { codeEditorDefaultValue } from '@/components/IDE/CodeEditor/utils';

interface Props {
  code: string;
  language: string;
  input: string;
  result: string;
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setInput: (input: string) => void;
  setResult: (result: string) => void;
  reset: () => void;
}

const useCodeEditorStore = create<Props>()(
  devtools(set => ({
    code: codeEditorDefaultValue['nodejs'],
    language: 'nodejs',
    input: '',
    result: '',
    setCode: (code: string) => set({ code }),
    setInput: (input: string) => set({ input }),
    setLanguage: (language: string) => set({ language }),
    setResult: (result: string) => set({ result }),
    reset: () => {
      set({
        code: codeEditorDefaultValue['nodejs'],
        language: 'nodejs',
        input: '',
        result: '',
      });
    },
  }))
);

export default useCodeEditorStore;
