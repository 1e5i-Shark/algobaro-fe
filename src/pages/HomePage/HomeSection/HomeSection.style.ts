import styled, { css } from 'styled-components';

const SectionWrapper = styled.section`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    background-color: ${theme.color.transparent_10};
    border-radius: 12px;
    box-shadow: ${theme.mode === 'light'
      ? `0px 2px 3px 1px rgba(200, 200, 200, 3)`
      : `0px 2px 3px 1px ${theme.color.transparent_30}`};
  `}
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
  width: 100%;
`;

const TagText = styled.span``;

const RoomFooter = styled.div`
  position: absolute;
  bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 6rem);
`;

// todo: 수영님 이미지 컴포넌트 pull 반영 후 height 사용하기
const LanguageImgs = styled.div`
  display: flex;
  /* height: 2.4rem; */

  & > * {
    margin-right: 2rem;
  }
`;

const InProgress = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 13.3rem;
    height: 4.3rem;
    font-size: 1.8rem;
    font-weight: 700;
    color: ${theme.color.red};
    cursor: default;
  `}
`;

export {
  InProgress,
  LanguageImgs,
  RoomFooter,
  RoomHeader,
  RoomLimit,
  RoomTags,
  RoomTitle,
  SectionWrapper,
  TagText,
  TitleWrapper,
};
