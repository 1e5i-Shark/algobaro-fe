import { Checkbox, InputLabel, ListItemText, MenuItem } from '@mui/material';
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
  labelName: string;
  width?: string;
  backgroundColor?: string;
  fontSize?: string;
  labelFontSize?: string;
}

/**
 * MultiDropDown 컴포넌트
 * @param {string} dataId - 데이터 id `필수`, Select 컴포넌트 식별용
 * @param {DropDownData} dataSet - 데이터셋 `필수`, `{[dataKey: string | number]: string}`
 * @param {string} labelId - 라벨 id `필수`
 * @param {string} labelName - 라벨명 `필수`
 * @param {string} width - 너비`옵션`
 * @param {string} backgroundColor - 배경색 `옵션`
 * @param {string} fontSize - 폰트사이즈 `옵션`, 기본값 `"2rem"`
 * @param {string} labelFontSize - 라벨폰트사이즈 `옵션`
 * @returns
 */
export default function MultiDropDown({
  dataId,
  dataSet,
  labelId,
  labelName,
  width,
  backgroundColor,
  fontSize = '2rem',
  labelFontSize,
  ...props
}: DropDownProps) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const { theme } = useCustomTheme();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const isEmpty = selectedValues.length === 0; // 미선택 여부

  // [키, 배열] 형태의 배열 데이터 생성
  const multiDataSet = Object.keys(dataSet).map(key => {
    return [key, dataSet[key]];
  });

  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;
    setSelectedValues(typeof value === 'string' ? value.split(',') : value);
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
          '& .Mui-focused': {
            color: !isEmpty ? '' : theme.color.text_primary_color,
          },
        }}
      >
        {/* 조건부 라벨 렌더링 */}
        {!isEmpty ? null : (
          <InputLabel
            sx={{
              fontSize: labelFontSize || fontSize,
              color: !isEmpty ? 'transparent' : theme.color.text_primary_color,
              zIndex: '100',
            }}
            id={labelId}
          >
            {labelName}
          </InputLabel>
        )}
        {/* select 영역 */}
        <Select
          label={!isEmpty ? '' : labelName}
          labelId={isEmpty ? labelId : ''}
          multiple
          id={dataId}
          value={selectedValues}
          renderValue={selected => selected.join(', ')}
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
              },
            },
            sx: {
              '& .MuiPopover-paper': {
                left: '0 !important',
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
          {multiDataSet.map(([key, value]) => {
            return (
              <MenuItem
                key={key}
                value={value}
              >
                <Checkbox checked={selectedValues.indexOf(value) > -1} />
                <ListItemText primary={value} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </DropDownWrapper>
  );
}
