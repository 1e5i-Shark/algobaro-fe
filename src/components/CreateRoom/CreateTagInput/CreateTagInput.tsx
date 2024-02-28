import { HTMLAttributes, KeyboardEvent, useRef } from 'react';

import { useCustomTheme } from '@/hooks/useCustomTheme';

import { Tag } from '../..';
import * as S from './CreateTagInput.style';

interface TagInputProps extends HTMLAttributes<HTMLInputElement> {
  tagList?: string[];
  onSelected?: (tagName: string) => void;
  onDeleted?: (tagName: string) => void;
}

export default function CreateTagInput({
  tagList,
  onSelected,
  onDeleted,
  ...props
}: TagInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { theme } = useCustomTheme();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const {
      code,
      nativeEvent: { isComposing },
    } = event;

    if (isComposing || !inputRef.current) return;

    if (code === 'Enter') {
      const tag = inputRef.current.value;

      if (!tag) return;

      onSelected?.(tag);

      inputRef.current.value = '';
      inputRef.current.focus();

      event.preventDefault();
    }
  };

  const handleDeleteTag = (tagName: string) => {
    console.log(tagList, tagName);
    if (tagList == null) return;

    onDeleted?.(tagName);
  };

  return (
    <S.Wrapper>
      <S.TagListWrapper>
        {tagList?.map((value, index) => (
          <S.TagItem key={index}>
            <Tag
              mode="delete"
              tagId={value}
              onDeleted={handleDeleteTag}
              backgroundColor={theme.color.secondary_color}
              fontSize={theme.size.M}
            >
              {value}
            </Tag>
          </S.TagItem>
        ))}
        <S.Input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          {...props}
        />
      </S.TagListWrapper>
    </S.Wrapper>
  );
}
