import { Icon } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import {
  FormControl,
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useState } from 'react';

interface AudioMenuProps {
  audioStream: MediaStream;
  audioDevices: MediaDeviceInfo[];
  onChange: (deviceId: string) => Promise<void>;
}

const AudioMenu = ({ audioStream, audioDevices, onChange }: AudioMenuProps) => {
  const { theme } = useCustomTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedAudio, setSelectedAudio] = useState(() => {
    const myAudio = audioStream.getTracks()[0].label;
    return audioDevices.find(device => device.label === myAudio);
  });

  const handleOpenPopover = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleChangeDevice = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAudio(
      audioDevices.find(device => device.deviceId === e.target.value)
    );
    onChange(e.target.value);
  };

  return (
    <>
      <Icon
        aria-describedby="change-device"
        backgroundSize="XXS"
        background={true}
        onClick={handleOpenPopover}
      >
        <KeyboardArrowDownRounded />
      </Icon>
      <Popover
        id="change-device"
        open={anchorEl ? true : false}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          marginTop: '1rem',
        }}
      >
        <FormControl>
          <RadioGroup
            aria-labelledby="devices-radio-group"
            value={selectedAudio.deviceId}
            name="devices"
            onChange={handleChangeDevice}
            sx={{
              padding: '1rem 1.5rem',
              '&:MuiTypography-root': {
                fontSize: 30,
              },
            }}
          >
            {audioDevices?.map(device => {
              return (
                <FormControlLabel
                  key={device.deviceId}
                  value={device.deviceId}
                  control={<Radio />}
                  label={device.label}
                  checked={device.label === selectedAudio.label}
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: 14,
                    },
                    '&:hover': {
                      color: theme.color.gray_50,
                    },
                  }}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Popover>
    </>
  );
};

export default AudioMenu;
