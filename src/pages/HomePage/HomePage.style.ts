import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const HomeWrapper = styled.div`
  width: 128rem;
  height: calc(100vh - 8rem);
`;

// ####################### Nav #######################

const NavContainer = styled.nav`
  position: relative;
  display: flex;
  align-items: end;
  height: 14rem;
  padding: 2rem 0;
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4.3rem;
`;

const HomeNavWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  & *:not(:first-child) {
    padding: 0 1rem;
  }
`;

const SearchWrapper = styled.form`
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

// ####################### Section #######################

const HomeMain = styled.main`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  height: 58rem;
`;

const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem;
  background-color: ${({ theme }) => theme.color.gray_10};
  border-radius: 12px;
  box-shadow: 0px 2px 3px 1px rgba(200, 200, 200, 3);
`;

const SectionUpperArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.size.L};
`;

const UpperAreaWrapper = styled.div`
  display: flex;
  align-items: center;

  & :first-child {
    margin-right: 0.5rem;
  }
`;

const SectionTitle = styled.span``;

const SectionLimit = styled.span``;

const SectionBelowArea = styled.div`
  display: flex;
  overflow-x: auto;

  & > * {
    flex-shrink: 0;
    margin-right: 0.5rem;
  }
`;

const SectionLowerArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LowerAreaImageWrapper = styled.div`
  display: flex;

  & > * {
    margin-right: 2rem;
  }
`;

export {
  HomeContainer,
  HomeMain,
  HomeNavWrapper,
  HomeWrapper,
  LowerAreaImageWrapper,
  MainSection,
  NavContainer,
  NavWrapper,
  SearchInput,
  SearchWrapper,
  SectionBelowArea,
  SectionLimit,
  SectionLowerArea,
  SectionTitle,
  SectionUpperArea,
  UpdateData,
  UpperAreaWrapper,
};
