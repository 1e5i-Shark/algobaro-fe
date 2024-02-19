import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MouseEvent, ReactElement, useState } from 'react';

interface BasicMenuProps {
  children: ReactElement;
  menuList: {
    text: string;
    onClick: (event: MouseEvent<HTMLElement>) => void;
  }[];
  fontSize?: string;
  color?: string;
  shadow?: string;
}

export default function MenuBar({
  children,
  menuList,
  fontSize = '1rem',
  color = 'black',
}: BasicMenuProps) {
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

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
      </Menu>
    </div>
  );
}
