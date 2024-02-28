import styled from 'styled-components';

// ####################### Nav #######################

const NavContainer = styled.nav`
  position: relative;
  display: flex;
  align-items: end;
  justify-content: space-between;
  height: 14rem;
  padding: 2rem 0;
  border: 1px solid red;
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4.3rem;
`;

const SearchOptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  height: 4.3rem;
  border: 2px solid yellow;
`;

const SearchInputWrapper = styled.form`
  position: relative;
  width: 28rem;
  height: 100%;
  margin-right: 2rem;

  & :last-child {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-10%, 10%);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.color.gray_10};
  border-radius: 2rem;
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
`;

export {
  NavContainer,
  NavWrapper,
  SearchInput,
  SearchInputWrapper,
  SearchOptionsContainer,
  UpdateData,
};
