import styled from 'styled-components';

const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const HomePageWrapper = styled.div`
  width: 128rem;
  height: calc(100vh - 8rem);
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

// ####################### Footer #######################

const HomeFooter = styled.footer`
  display: flex;
  justify-content: center;
  padding: 4rem 0;
`;

export {
  HomeFooter,
  HomeMain,
  HomePageContainer,
  HomePageWrapper,
  LowerAreaImageWrapper,
  MainSection,
  SectionBelowArea,
  SectionLimit,
  SectionLowerArea,
  SectionTitle,
  SectionUpperArea,
  UpperAreaWrapper,
};
