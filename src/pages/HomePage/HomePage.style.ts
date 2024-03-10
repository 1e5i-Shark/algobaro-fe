import styled from 'styled-components';

const HomePageContainer = styled.div`
  display: flex;
  height: 200rem;
  padding: 0 2rem;
  overflow: auto;
`;

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 128rem;
  margin: 0 auto;
  overflow-y: auto;
`;

const HomeSectionContainer = styled.main`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
`;

// ####################### Footer #######################

const HomeFooter = styled.footer`
  display: flex;
  justify-content: center;
  padding: 4rem 0;
`;

export { HomeFooter, HomePageContainer, HomePageWrapper, HomeSectionContainer };
