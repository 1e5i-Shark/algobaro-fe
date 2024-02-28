import { HTMLAttributes } from 'react';

import * as S from './ErrorMessage.style';

export default function ErrorMessage({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <S.Wrapper {...props}>
      <S.ErrorMessage>{children}</S.ErrorMessage>
    </S.Wrapper>
  );
}
