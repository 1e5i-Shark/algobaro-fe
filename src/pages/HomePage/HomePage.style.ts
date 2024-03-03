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

const NoRoom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20rem;
  font-size: 2.5rem;
  font-weight: 700;
`;

// Footer

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  padding: 4rem 0;
  border: 2px solid red;
`;

export {
  FooterContainer,
  HomePageContainer,
  HomePageWrapper,
  HomeSectionContainer,
  NoRoom,
};
