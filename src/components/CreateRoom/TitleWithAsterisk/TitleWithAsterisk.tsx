import { HTMLAttributes } from 'react';

import * as S from './TitleWithAsterisk.style';

interface InputTitleProps extends HTMLAttributes<HTMLSpanElement> {
  isRequired?: boolean;
}

export default function TitleWithAsterisk({
  children,
  isRequired = true,
}: InputTitleProps) {
  return (
    <S.Wrapper>
      <S.Title>{children}</S.Title>
      {isRequired && <S.RequiredMark>*</S.RequiredMark>}
    </S.Wrapper>
  );
}
