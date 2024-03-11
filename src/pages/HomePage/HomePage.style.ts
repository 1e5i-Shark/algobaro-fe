import styled from 'styled-components';

const HomePageContainer = styled.div`
  display: flex;
  min-width: 360px;
  height: 100%;
  padding: 0 2rem;
  overflow: auto;
`;

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 128rem;
  margin: 0 auto;
`;

const HomeSectionContainer = styled.main`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  margin-top: 2%;

  @media (${({ theme }) => theme.device.laptop}) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 65rem;
  }
`;

// ####################### Footer #######################

const HomeFooter = styled.footer`
  display: flex;
  justify-content: center;
  padding: 4rem 0;
`;

export { HomeFooter, HomePageContainer, HomePageWrapper, HomeSectionContainer };
