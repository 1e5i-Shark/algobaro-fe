import { InputLabel, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { HTMLAttributes, useState } from 'react';

import { useCustomTheme } from '@/hooks/useCustomTheme';

import { DropDownWrapper } from './DropDown.style';

interface DropDownData {
  [dataKey: string | number]: string;
}

interface DropDownProps extends HTMLAttributes<HTMLDivElement> {
  dataId: string;
  dataSet: DropDownData;
  labelId: string;
  defaultValue?: string;
  labelName?: string;
  width?: string;
  borderColor?: string;
  backgroundColor?: string;
  fontSize?: string;
  labelFontSize?: string;
  hasDefaultLabel?: boolean;
  onSelected?: (value: string) => void;
}

/**
 * DropDown 컴포넌트
 * @param {string} dataId - 데이터 id `필수`, Select 컴포넌트 식별용
 * @param {DropDownData} dataSet - 데이터셋 `필수`, `{[dataKey: string | number]: string}`
 * @param {string} labelId - 라벨 id `필수`
 * @param {string} defaultValue - 기본 값 `옵션`
 * @param {string} labelName - 라벨명 `옵션`
 * @param {string} width - 너비`옵션`
 * @param {string} borderColor - border색 `옵션`
 * @param {string} backgroundColor - 배경색 `옵션`
 * @param {string} fontSize - 폰트사이즈 `옵션`, 기본값 `"2rem"`
 * @param {string} labelFontSize - 라벨폰트사이즈 `옵션`
 * @param {boolean} hasDefaultLabel - "선택 없음" 라벨 제거 `옵션`
 * @param {(value: string) => void} onSelected - 선택 값 전달 함수 `옵션`, `(value: string) => void}`
 * @returns
 */
export default function DropDown({
  dataId,
  dataSet,
  labelId,
  defaultValue,
  labelName,
  width,
  borderColor,
  backgroundColor,
  fontSize = '2rem',
  labelFontSize,
  hasDefaultLabel = true,
  onSelected,
  ...props
}: DropDownProps) {
  const { theme } = useCustomTheme();
  const [selectedValue, setSelectedValue] = useState(defaultValue ?? '');

  // 데이터 키 배열
  const dataKeys = Object.keys(dataSet);

  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setSelectedValue(value);
    onSelected?.(value);
  };

  return (
    <DropDownWrapper
      $width={width || ''}
      {...props}
    >
      <FormControl
        size="small"
        fullWidth
        sx={{
          '& .MuiInputBase-root': {
            border: borderColor ? `1px solid ${borderColor}` : '',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: borderColor ? 'none' : '',
          },
          '& .Mui-focused': {
            color: selectedValue ? '' : theme.color.text_primary_color,
          },
        }}
      >
        {/* 조건부 라벨 렌더링 */}
        {selectedValue || !labelName ? null : (
          <InputLabel
            sx={{
              fontSize: labelFontSize || fontSize,
              color: selectedValue
                ? 'transparent'
                : theme.color.text_primary_color,
              zIndex: '100',
            }}
            id={labelId}
          >
            {labelName}
          </InputLabel>
        )}
        {/* select 영역 */}
        <Select
          label={selectedValue ? '' : labelName}
          labelId={!selectedValue ? labelId : ''}
          id={dataId}
          defaultValue={defaultValue}
          value={selectedValue}
          onChange={handleChange}
          MenuProps={{
            sx: {
              // 외부 padding이 있다면 left 자체 속성이 잘 동작하므로 임시 생략
              // '& .MuiPopover-paper': {
              //   left: '0 !important',
              // },
              '& .MuiPaper-root': {
                backgroundColor: theme.color.background_primary,
              },
              '& .MuiList-root': {
                color: theme.color.text_primary_color,
                backgroundColor:
                  backgroundColor || theme.color.background_second,
                '& li:not(:first-of-type)': {
                  borderTop: `1px solid ${theme.color.text_secondary_color}`,
                },
                '& li:hover': {
                  backgroundColor: theme.color.transparent_50,
                },
              },
              '& .MuiMenuItem-root': {
                fontSize,
              },
            },
          }}
          sx={{
            fontSize,
            color: theme.color.text_primary_color,
            backgroundColor: backgroundColor || theme.color.background_second,
            '& svg': {
              color: theme.color.text_primary_color,
              fontSize,
            },
          }}
        >
          {/* 선택 메뉴 영역 */}
          {hasDefaultLabel && <MenuItem value="">선택 없음</MenuItem>}
          {dataKeys.map(dataKey => {
            return (
              <MenuItem
                key={dataKey}
                value={dataKey}
              >
                {dataSet[dataKey]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </DropDownWrapper>
  );
}
