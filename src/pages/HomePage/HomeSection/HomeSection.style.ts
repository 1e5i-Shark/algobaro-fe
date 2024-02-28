import styled from 'styled-components';

// ####################### Section #######################

const SectionWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  background-color: ${({ theme }) => theme.color.gray_10};
  border-radius: 12px;
  box-shadow: 0px 2px 3px 1px rgba(200, 200, 200, 3);
`;

const RoomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.6rem;
  font-size: ${({ theme }) => theme.size.L};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 80%;
`;

const RoomTitle = styled.span`
  margin-right: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RoomLimit = styled.span``;

const RoomTags = styled.div`
  display: flex;
  overflow-x: auto;

  & > * {
    flex-shrink: 0;
    margin-right: 0.5rem;
  }
`;

const RoomFooter = styled.div`
  position: absolute;
  bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 6rem);
`;

const LanguageImgs = styled.div`
  display: flex;

  & > * {
    margin-right: 2rem;
  }
`;

export {
  LanguageImgs,
  RoomFooter,
  RoomHeader,
  RoomLimit,
  RoomTags,
  RoomTitle,
  SectionWrapper,
  TitleWrapper,
};
