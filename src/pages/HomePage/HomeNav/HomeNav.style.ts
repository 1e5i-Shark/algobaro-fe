import styled, { css } from 'styled-components';

export const NavContainer = styled.nav`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    padding: 4rem 0 2rem 0;

    & :first-child {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
      justify-self: start;
    }
    & :nth-child(2) {
      grid-row: 2 / 3;
      grid-column: 2 / 3;
      justify-self: end;
    }
    & :last-child {
      grid-row: 1 / 2;
      grid-column: 2 / 3;
    }
  }

  @media (${({ theme }) => theme.device.laptop}) {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    min-width: 48rem;
    padding: 6rem 0 4rem 0;

    & :first-child {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }
    & :nth-child(2) {
      grid-row: 2 / 3;
      grid-column: 1 / -1;
    }
    & :last-child {
      grid-row: 1 / 2;
      grid-column: 2 / 3;
    }
  }
`;

export const SearchOptionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 1rem);
  min-width: 46rem;

  @media (${({ theme }) => theme.device.laptop}) {
    width: 100%;
    height: 100%;
    margin-top: 1rem;
  }
`;

export const SearchInputWrapper = styled.form`
  position: relative;
  width: 28rem;
  height: 100%;

  & :last-child {
    position: absolute;
    top: 20%;
    right: 4%;
  }
`;

export const SearchInput = styled.input`
  ${({ theme }) => css`
    width: 100%;
    min-width: 19.4rem;
    height: 100%;
    padding-right: 4rem;
    padding-left: 2rem;

    color: ${theme.color.text_primary_color};
    background-color: ${theme.color.background_second};
    border-radius: 2rem;
  `}
`;

export const UpdateData = styled.span`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.2rem;
`;

export const UpdateText = styled.span`
  white-space: nowrap;
`;
