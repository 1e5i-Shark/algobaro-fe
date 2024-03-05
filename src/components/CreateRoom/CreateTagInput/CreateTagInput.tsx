import { HTMLAttributes, KeyboardEvent, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useCustomTheme } from '@/hooks/useCustomTheme';

import { Tag } from '../..';
import * as S from './CreateTagInput.style';

export interface TagType {
  id: string;
  value: string;
}

interface TagInputProps extends HTMLAttributes<HTMLInputElement> {
  tagList?: TagType[];
  onSelected?: (tag: TagType) => void;
  onDeleted?: (tagId: string) => void;
  maxLength?: number;
}

export default function CreateTagInput({
  tagList,
  onSelected,
  onDeleted,
  maxLength,
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
      const tagName = inputRef.current.value.trim();

      if (!tagName) return;
      if (maxLength && tagName.length > maxLength) return;

      onSelected?.({ id: uuidv4(), value: tagName });

      inputRef.current.value = '';
      inputRef.current.focus();

      event.preventDefault();
    }
  };

  const handleDeleteTag = (tagId: string) => {
    if (tagList == null) return;

    onDeleted?.(tagId);
  };

  return (
    <S.Wrapper>
      <S.TagListWrapper>
        {tagList?.map(({ id, value }, index) => (
          <S.TagItem key={index}>
            <Tag
              mode="delete"
              tagId={id}
              onDeleted={handleDeleteTag}
              backgroundColor={theme.color.secondary_color}
              fontSize={theme.size.M}
              textColor={theme.color.black_primary}
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
