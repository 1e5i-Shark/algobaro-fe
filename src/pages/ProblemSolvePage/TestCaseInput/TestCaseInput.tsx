import { ChangeEvent, useRef, useState } from 'react';

import * as S from './TestCaseInput.style';

interface TestCaseInputProps {
  onChange: (newText: string) => void;
}

export default function TestCaseInput({ onChange }: TestCaseInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [isFocus, setIsFocus] = useState(false);

  const handleResizeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.currentTarget.value;
    onChange(newText);
    // textarea 높이 조절
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '1rem';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  };

  const handleFocusInput = () => {
    setIsFocus(true);
  };

  const handleBlurInput = () => {
    setIsFocus(false);
  };

  return (
    <S.Wrapper>
      <S.TestCaseTitle>테스트 입력</S.TestCaseTitle>
      <S.TestInputWrapper>
        <S.TestInput
          ref={textareaRef}
          onChange={handleResizeTextarea}
          onFocus={handleFocusInput}
          onBlur={handleBlurInput}
          placeholder={!isFocus ? '테스트 케이스를 입력하세요.' : ''}
        />
      </S.TestInputWrapper>
    </S.Wrapper>
  );
}
