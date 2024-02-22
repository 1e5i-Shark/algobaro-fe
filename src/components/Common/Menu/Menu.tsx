import MuiMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { HTMLAttributes, MouseEvent, ReactElement, useState } from 'react';

import { useCustomTheme } from '@/hooks/useCustomTheme';

/**
 * Menu 컴포넌트
 * @param [children] - 아이콘 등의 버튼을 입력 받습니다.
 * @param [menuList] - 메뉴바에 들어갈 옵션의 이름과 클릭 이벤트를 받습니다.
 * @param [fontSize = '1.6rem'] - 메뉴바 텍스트의 크기를 받습니다.
 * @param [color = 'black'] - 메뉴바 텍스트의 색상을 받습니다.
 * @param [shadow = ''] - 추가하여 그림자 효과를 부여할 수 있습니다.
 * @param [bgColor = 'grey'] - menu list의 배경색을 받습니다.
 */

interface MenuListProps {
  id: number;
  text: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement;
  menuList: MenuListProps[];
  fontSize?: string;
  shadow?: string;
  bgColor?: string;
}

export default function Menu({
  children,
  menuList,
  fontSize = '1.6rem',
  color = 'black',
  shadow = '',
  bgColor = 'grey',
  ...props
}: MenuProps) {
  const { theme } = useCustomTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button onClick={handleClick}>{children}</button>

      <MuiMenu
        id="basic-menu"
        slotProps={{
          paper: {
            sx: {
              bgcolor: bgColor || theme.color.gray_50,
              boxShadow: shadow || 'none',
              '& .MuiList-root': {
                p: 0,
              },
              '& .MuiMenuItem-root': {
                '&:hover': {
                  borderRadius: '.2rem',
                  bgcolor: bgColor || theme.color.gray_50,
                  filter: 'brightness(.8)',
                },
              },
            },
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        {...props}
      >
        {menuList.map((menu, index) => {
          return (
            <MenuItem
              sx={{
                fontSize,
                color,
              }}
              key={menu.text + index}
              onClick={event => {
                menu.onClick(event);
                handleClose();
              }}
            >
              {menu.text}
            </MenuItem>
          );
        })}
      </MuiMenu>
    </div>
  );
}
