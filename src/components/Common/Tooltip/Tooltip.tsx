import TooltipMui from '@mui/material/Tooltip';
import { ReactElement } from 'react';

interface TooltipProps {
  children: ReactElement;
  text: string;
}

export default function Tooltip({ children, text, ...props }: TooltipProps) {
  return (
    <TooltipMui
      title={<span style={{ fontSize: 12 }}>{text}</span>}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -14], // 위치 조정
              },
            },
          ],
        },
      }}
      {...props}
    >
      {children}
    </TooltipMui>
  );
}
