import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserList = styled.ul`
  display: flex;
  gap: 2rem;
`;

const UserItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;
  width: 8rem;
  cursor: pointer;
`;

const UserName = styled.div<{ $isSelected: boolean }>`
  ${({ theme, $isSelected }) => css`
    color: ${$isSelected ? theme.color.red : theme.color.text_primary_color};
    text-align: center;
  `};
`;

export { UserItem, UserList, UserName, Wrapper };
