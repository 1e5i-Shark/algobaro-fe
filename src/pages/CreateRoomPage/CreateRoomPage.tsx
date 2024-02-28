import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  CheckBox,
  CreateTagInput,
  DropDown,
  Input,
  Tag,
  TitleWithAsterisk,
} from '@/components';
import { TagType } from '@/components/CreateRoom/CreateTagInput/CreateTagInput';
import {
  PS_LANGUAGES,
  ROOM_LIMIT_DATASET,
  ROOM_STATUS,
} from '@/constants/room';
import { useCustomTheme } from '@/hooks/useCustomTheme';

import * as S from './CreateRoomPage.style';

interface CreateRoomData {
  roomStatus: string;
  languages: string[];
  title: string;
  startAt: string;
  roomAccessType: string;
  password?: string;
  tags: TagType[];
  roomLimit: number;
  roomUUID: string;
}

const defaultValues = {
  roomStatus: 'RECRUITING',
  languages: [],
  title: '',
  startAt: '',
  roomAccessType: 'PUBLIC',
  password: '',
  tags: [],
};

export default function CreateRoomPage() {
  const { theme } = useCustomTheme();

  const { control, formState, register, handleSubmit, resetField } =
    useForm<CreateRoomData>({
      mode: 'onChange',
      defaultValues,
    });

  const { isValid } = formState;

  const onSubmit: SubmitHandler<CreateRoomData> = async data => {};

  const contentList = [
    {
      title: '방 제목',
      isRequired: true,
      content: (
        <Input
          name="title"
          register={register}
          formState={formState}
          required
          backgroundColor={theme.color.white_primary}
          borderColor={theme.color.gray_30}
        />
      ),
    },
    {
      title: '언어',
      isRequired: true,
      content: (
        <Controller
          name="languages"
          rules={{ required: true }}
          control={control}
          render={({ field: { value, onChange } }) => (
            <S.LanguagesWrapper>
              <S.TagWrapper>
                {PS_LANGUAGES.map((language, index) => (
                  <Tag
                    key={index}
                    tagId={language}
                    mode="select"
                    isSelected={value.includes(language)}
                    onSelected={tagName => {
                      if (value.includes(language)) {
                        onChange(value.filter(item => item !== tagName));
                      } else {
                        onChange([...value, tagName]);
                      }
                    }}
                  >
                    {language}
                  </Tag>
                ))}
              </S.TagWrapper>
            </S.LanguagesWrapper>
          )}
        />
      ),
    },
    {
      title: '비밀방',
      isRequired: true,
      content: (
        <Controller
          name="roomAccessType"
          defaultValue={ROOM_STATUS.PUBLIC}
          control={control}
          render={({ field: { value, onChange } }) => (
            <S.RoomAccessWrapper>
              <S.CheckBoxWrapper>
                <CheckBox
                  checked={value === ROOM_STATUS.PRIVATE ? true : false}
                  onChange={event => {
                    const { checked } = event.target;

                    if (checked) {
                      onChange(ROOM_STATUS.PRIVATE);
                    } else {
                      onChange(ROOM_STATUS.PUBLIC);
                      resetField('password');
                    }
                  }}
                />
              </S.CheckBoxWrapper>
              {value === ROOM_STATUS.PRIVATE && (
                <S.PasswordWrapper>
                  <S.PasswordTitle>암호</S.PasswordTitle>
                  <Input
                    type="password"
                    width="12rem"
                    name="password"
                    register={register}
                    formState={formState}
                    required={value === ROOM_STATUS.PRIVATE}
                    backgroundColor={theme.color.white_primary}
                    borderColor={theme.color.gray_30}
                  />
                </S.PasswordWrapper>
              )}
            </S.RoomAccessWrapper>
          )}
        />
      ),
    },
    {
      title: '최대 인원',
      isRequired: true,
      content: (
        <S.RoomLimitWrapper>
          <Controller
            name="roomLimit"
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange } }) => (
              <DropDown
                width="100%"
                dataId="roomLimit"
                labelId="roomLimit-label"
                labelName=""
                dataSet={ROOM_LIMIT_DATASET}
                backgroundColor={theme.color.white_primary}
                onSelected={value => {
                  if (value) {
                    onChange(parseInt(value));
                  } else {
                    onChange();
                  }
                }}
              />
            )}
          />
        </S.RoomLimitWrapper>
      ),
    },
    {
      title: '태그',
      isRequired: false,
      content: (
        <S.TagListWrapper>
          <Controller
            name="tags"
            control={control}
            render={({ field: { value: tags, onChange } }) => (
              <CreateTagInput
                tagList={tags}
                onSelected={tag => {
                  if (tags.length < 5) {
                    onChange([...tags, tag]);
                  }
                }}
                onDeleted={tagId => {
                  onChange(tags.filter(tag => tag.id !== tagId));
                }}
              />
            )}
          />
          <S.TagGuideText>
            태그는 최대 5개까지 입력할 수 있습니다.
          </S.TagGuideText>
        </S.TagListWrapper>
      ),
    },
  ];

  return (
    <S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <S.InputListWrapper>
        {contentList.map(({ title, isRequired, content }, index) => (
          <S.InputItemWrapper key={index}>
            <S.TitleWrapper>
              <TitleWithAsterisk isRequired={isRequired}>
                {title}
              </TitleWithAsterisk>
            </S.TitleWrapper>
            <S.ContentsWrapper>{content}</S.ContentsWrapper>
          </S.InputItemWrapper>
        ))}
      </S.InputListWrapper>
      <Button
        type="submit"
        width="100%"
        disabled={!isValid}
      >
        방 만들기
      </Button>
    </S.FormWrapper>
  );
}
