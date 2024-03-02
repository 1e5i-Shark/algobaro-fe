import styled from 'styled-components';

const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const HomePageWrapper = styled.div`
  width: 128rem;
`;

const HomeSectionContainer = styled.main`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: calc(50% - 1rem) calc(50% - 1rem);
  grid-gap: 2rem;
  height: 58rem;
`;
// ####################### Footer #######################

const HomeFooter = styled.footer`
  display: flex;
  justify-content: center;
  padding: 4rem 0;
`;

export { HomeFooter, HomePageContainer, HomePageWrapper, HomeSectionContainer };
