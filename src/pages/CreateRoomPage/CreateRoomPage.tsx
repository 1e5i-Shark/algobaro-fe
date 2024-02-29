import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  CheckBox,
  CreateTagInput,
  DropDown,
  ErrorMessage,
  Input,
  Tag,
  TitleWithAsterisk,
} from '@/components';
import { TagType } from '@/components/CreateRoom/CreateTagInput/CreateTagInput';
import {
  MAX_TAG_LENGTH,
  PS_LANGUAGES,
  ROOM_LIMIT_DATASET,
  ROOM_STATUS,
} from '@/constants/room';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { useCreateRoom } from '@/hooks/useRooms';

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

  const {
    control,
    formState,
    register,
    handleSubmit,
    resetField,
    setError,
    clearErrors,
  } = useForm<CreateRoomData>({
    mode: 'onChange',
    defaultValues,
  });

  const { isValid, errors } = formState;

  const { mutateAsync: createRoom } = useCreateRoom();

  const onSubmit: SubmitHandler<CreateRoomData> = async data => {
    // 서버에서 정의한 date 형식으로 변환하기 위해 ISOString 사용. 예시: 2024-02-27T13:36:49.089Z
    const currentDate = new Date().toISOString();

    // 서버의 string[] 형식과 맞추기 위해 Tag 데이터의 value만 갖도록 필터링
    const filteredTag = data.tags.map(tag => tag.value);

    const submitData = { ...data, statAt: currentDate, tags: filteredTag };

    console.log('submit data: ', submitData);

    // response를 출력해서 확인하기 위해 async-await 사용 (확인용이라 추후 제거할 예정)
    const response = await createRoom(submitData);
    console.log('response', response);
  };

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
    // 외부 컴포넌트를 react-hook-form과 연동하려면 Controller를 사용하면 됩니다!
    // value, onChange를 이용해서 상태를 관리하고 name에 명시된 상태가 변경돼요
    {
      title: '언어',
      isRequired: true,
      content: (
        <Controller
          name="languages"
          rules={{ required: true }}
          control={control}
          render={({ field: { value: languages, onChange } }) => (
            <S.LanguagesWrapper>
              <S.TagWrapper>
                {PS_LANGUAGES.map((language, index) => (
                  <Tag
                    key={index}
                    tagId={language}
                    mode="select"
                    isSelected={languages.includes(language)}
                    onSelected={tagName => {
                      if (languages.includes(language)) {
                        onChange(languages.filter(item => item !== tagName));
                      } else {
                        onChange([...languages, tagName]);
                      }
                    }}
                  >
                    {language}
                  </Tag>
                ))}
              </S.TagWrapper>
              {/*
                useForm의 mode가 onChange 상태라서 클릭했다가 다시 삭제하면
                바로 에러 메세지가 표시됩니다
              */}
              {errors.languages && (
                <ErrorMessage>언어를 선택해 주세요</ErrorMessage>
              )}
            </S.LanguagesWrapper>
          )}
        />
      ),
    },
    {
      title: '비밀방',
      isRequired: false,
      content: (
        <Controller
          name="roomAccessType"
          defaultValue={ROOM_STATUS.PUBLIC}
          control={control}
          render={({ field: { value: roomAccessType, onChange } }) => (
            <S.RoomAccessWrapper>
              <S.CheckBoxWrapper>
                <CheckBox
                  checked={
                    roomAccessType === ROOM_STATUS.PRIVATE ? true : false
                  }
                  onChange={event => {
                    const { checked } = event.target;

                    if (checked) {
                      onChange(ROOM_STATUS.PRIVATE);
                    } else {
                      // 공개방으로 전환시 password 값을 초기화합니다.
                      onChange(ROOM_STATUS.PUBLIC);
                      resetField('password');
                    }
                  }}
                />
              </S.CheckBoxWrapper>
              {roomAccessType === ROOM_STATUS.PRIVATE && (
                <S.PasswordWrapper>
                  <S.PasswordTitle>
                    <TitleWithAsterisk>암호</TitleWithAsterisk>
                  </S.PasswordTitle>
                  {/*
                    password는 비밀방인 경우에만 required 입니다.
                  */}
                  <Input
                    type="password"
                    width="12rem"
                    name="password"
                    register={register}
                    formState={formState}
                    required={roomAccessType === ROOM_STATUS.PRIVATE}
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
          {errors.roomLimit && (
            <ErrorMessage>최대 인원을 선택해 주세요</ErrorMessage>
          )}
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
                // 입력 중일 때는 에러를 표기하지 않습니다.
                onChange={() => {
                  clearErrors('tags');
                }}
                onSelected={tag => {
                  if (tags.length < MAX_TAG_LENGTH) {
                    onChange([...tags, tag]);
                  } else if (tags.length === MAX_TAG_LENGTH) {
                    // 5개가 입력된 상태에서 입력을 하면 에러를 표시합니다. rules에 적절한 메서드가 없어서 setError 함수를 사용했어요.
                    setError('tags', {
                      type: 'custom',
                      message:
                        '최대 입력 개수를 초과했습니다. 태그를 삭제하고 다시 추가해 주세요.',
                    });
                  }
                }}
                // id에 따라서 tag를 제거합니다. id는 uuid 라이브러리를 사용했어요.
                onDeleted={tagId => {
                  onChange(tags.filter(tag => tag.id !== tagId));
                }}
              />
            )}
          />
          {errors.tags && <ErrorMessage>{errors.tags.message}</ErrorMessage>}
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
