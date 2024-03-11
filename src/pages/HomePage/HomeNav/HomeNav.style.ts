import styled, { css } from 'styled-components';

const NavContainer = styled.nav`
  @media (min-width: 1024px) {
    position: relative;
    display: flex;
    align-items: end;
    justify-content: space-between;
    width: 100%;
    height: 14rem;
    padding: 2rem 0;
  }

  @media (${({ theme }) => theme.device.laptop}) {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: end;
    width: 100%;
    height: 18rem;
  }
`;

const SearchOptionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  width: calc(50% - 1rem);
  min-width: 46rem;
  height: 4.3rem;
  margin-left: 2rem;

  @media (${({ theme }) => theme.device.laptop}) {
    width: 100%;
    margin-top: 2rem;
    margin-left: 0;
  }
`;

const SearchInputWrapper = styled.form`
  position: relative;
  width: 28rem;
  height: 100%;

  & :last-child {
    position: absolute;
    top: 20%;
    right: 4%;
  }
`;

const SearchInput = styled.input`
  ${({ theme }) => css`
    width: 100%;
    min-width: 19.4rem;
    height: 100%;
    padding: 0 2rem;
    color: ${theme.color.text_primary_color};
    background-color: ${theme.color.background_second};
    border-radius: 2rem;
  `}
`;

const UpdateData = styled.span`
  position: absolute;
  right: 0;
  bottom: 8rem;
  display: flex;
  align-items: center;
  font-size: 1.2rem;

  & :last-child {
    margin-left: 0.5rem;
  }

  @media (${({ theme }) => theme.device.laptop}) {
    transform: translate(-4%, 25%);
  }
`;

const UpdateText = styled.span`
  white-space: nowrap;
`;

export {
  NavContainer,
  SearchInput,
  SearchInputWrapper,
  SearchOptionsContainer,
  UpdateData,
  UpdateText,
};
