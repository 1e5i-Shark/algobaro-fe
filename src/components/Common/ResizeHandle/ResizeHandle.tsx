import DragHandleIcon from '@mui/icons-material/DragHandle';

import Icon from '../Icon/Icon';
import * as S from './ResizeHandle.style';

export type DirectionType = 'horizontal' | 'vertical';

type ResizeHandleProps = {
  direction: DirectionType;
};

export default function ResizeHandle({
  direction = 'horizontal',
}: ResizeHandleProps) {
  return (
    <S.ResizeHandleWrapper $direction={direction}>
      <S.IconWrapper $direction={direction}>
        <Icon>
          <DragHandleIcon />
        </Icon>
      </S.IconWrapper>
    </S.ResizeHandleWrapper>
  );
}
