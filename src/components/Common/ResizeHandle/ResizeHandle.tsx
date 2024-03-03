import DragHandleIcon from '@mui/icons-material/DragHandle';

import Icon from '../Icon/Icon';
import * as S from './ResizeHandle.style';

export type DirectionType = 'horizontal' | 'vertical';

type ResizeHandleProps = {
  direction: DirectionType;
};

/**
 * react-resizable-panels를 활용해서 Panel 영역을 조정하는 ResizeHandle
 * @param [direction='horizontal'] - horizontal | vertical
 */

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
