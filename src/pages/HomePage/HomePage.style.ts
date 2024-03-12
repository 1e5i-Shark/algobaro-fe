import styled from 'styled-components';

export const HomePageContainer = styled.div`
  display: flex;
  min-width: 360px;
  height: 100%;
  padding: 0 2rem;
  overflow: auto;
`;

export const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 128rem;
  height: 100%;
  margin: 0 auto;
`;

export const HomeSectionContainer = styled.main`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;

  @media (${({ theme }) => theme.device.laptop}) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 65rem;
  }
`;

export const NoRoom = styled.p``;
