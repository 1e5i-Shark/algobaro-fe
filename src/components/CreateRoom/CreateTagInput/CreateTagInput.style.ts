import styled, { css } from 'styled-components';

import { Row } from '@/styles/GlobalStyle';

const Wrapper = styled(Row)`
  flex-wrap: wrap;
  width: 100%;
`;

const TagListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  width: 100%;
  padding-right: 1rem;
`;

const TagItem = styled.li``;

const Input = styled.input`
  ${({ theme }) => css`
    display: flex;
    flex: 1;
    height: 4rem;
    padding: 0.4rem;
    color: ${theme.color.text_primary_color};
    background-color: ${theme.color.background_primary};
    border-bottom: 3px solid ${theme.color.secondary_color};
    border-radius: ${theme.shape.round} ${theme.shape.round} 0 0;
  `}
`;

export { Input, TagItem, TagListWrapper, Wrapper };
