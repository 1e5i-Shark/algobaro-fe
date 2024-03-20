import './CodeEditorLibs';

import { Editor, EditorChange } from 'codemirror';
import { useEffect, useRef } from 'react';
import { UnControlled as CodeMirrorEditor } from 'react-codemirror2';
import { CodemirrorBinding } from 'y-codemirror';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';

import { DropDown } from '@/components/Common/DropDown';
import { PROBLEM_LANGUAGES_DATA_SET } from '@/constants/room';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import useCodeEditorStore from '@/store/CodeEditorStore';

import * as S from './CodeEditor.style';
import {
  codeEditorDefaultValue,
  getEditorMode,
  getRandomColors,
} from './utils';

interface CodeEditorProps {
  mode?: 'normal' | 'codeShare' | 'readonly';
  roomUuid?: string;
  width?: string;
  height?: string;
  defaultValue?: string;
}

interface CustomEditorChange extends EditorChange {
  cancel?: () => void;
}

/**
 * 코드 에디터
 * roomUuid를 넘겨주는 경우, 공동 편집 코드 에디터를 사용할 수 있습니다.
 * @param [roomUuid] - `옵션` 방에서 사용되는 shortUuid
 * @param [width] - `옵션`
 * @param [height] - `옵션`
 */
export default function CodeEditor({
  mode = 'normal',
  roomUuid,
  width,
  height,
  defaultValue = '',
}: CodeEditorProps) {
  const { theme } = useCustomTheme();

  const { language, setCode, setLanguage } = useCodeEditorStore(state => state);

  const editorRef = useRef<Editor | null>(null);
  const providerRef = useRef<WebrtcProvider | null>(null);

  const yDoc = new Y.Doc();
  const yText = yDoc.getText('codemirror');

  const connectCodeMirror = () => {
    if (!editorRef.current) return;

    providerRef.current = new WebrtcProvider(roomUuid ?? 'codeEditor', yDoc);

    const yUndoManager = new Y.UndoManager(yText);

    // 사용자 이벤트 감지
    const awareness = providerRef.current.awareness;

    const { clientID } = awareness;

    if (roomUuid) {
      // TODO: 추후 User 닉네임으로 변경
      awareness.setLocalStateField('user', {
        name: `UserID: ${clientID}`,
        color: getRandomColors(),
      });
    }

    // yjs, editor를 연동하는 기능
    new CodemirrorBinding(yText, editorRef.current, awareness, {
      yUndoManager,
    });
  };

  // 코드 share 모드 일 때만 yjs와 codeMirror를 연결
  if (mode === 'codeShare') {
    useEffect(() => {
      try {
        // 에디터 영역 CodeMirror, 텍스트를 관리하는 yText, 사용자 감지 awareness를 연동
        connectCodeMirror();

        // text 변경 감지
        const yTextListener = () => {
          const newContent = yText.toString();
          // 전역 Store의 code 변경
          setCode(newContent);
        };

        yText.observe(yTextListener);
      } catch (err) {
        // TODO: 연결이 끊어진 경우 처리 필요
        console.error('webrtc 연결이 끊어졌습니다.');
      }

      return () => {
        if (!providerRef.current) return;

        providerRef.current.disconnect();
        yDoc.destroy();
      };
    }, []);
  }

  // 코드 에디터 붙여넣기 방지 함수
  const handlePreventCopy = (
    editor: Editor,
    data: CustomEditorChange,
    value: string,
    next: () => void
  ) => {
    const beforeChangeEventProps = {
      editor,
      data,
      value,
      next,
    };

    const changeData = beforeChangeEventProps.data;
    if (changeData.origin === 'paste' && mode === 'normal') {
      changeData.cancel?.();
      alert('풀이 중 코드 붙여넣기는 금지합니다.');
      return;
    }

    if (changeData.origin === '+input' && mode !== 'readonly') {
      setCode(`${value}${data.text[0]}`);
    }
  };

  return (
    <S.Wrapper>
      {mode !== 'readonly' && (
        <S.DropDownWrapper>
          <S.DefaultGutter className="gutter" />
          <DropDown
            width="fit-content"
            dataId="languages"
            labelId="languages-label"
            defaultValue={language}
            dataSet={PROBLEM_LANGUAGES_DATA_SET}
            onSelected={value => {
              setLanguage(value);
            }}
            borderColor={theme.color.gray_50}
            fontSize={theme.size.S}
            backgroundColor={theme.color.background_editor}
            hasDefaultLabel={false}
          />
        </S.DropDownWrapper>
      )}
      <CodeMirrorEditor
        onBeforeChange={handlePreventCopy}
        options={{
          mode: getEditorMode(language),
          theme: theme.mode === 'dark' ? 'material-palenight' : 'eclipse',
          lineNumbers: true,
          tabSize: 2,
          extraKeys: {
            'Ctrl-Space': 'autocomplete',
          },
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          readOnly: mode === 'readonly' ? 'nocursor' : false,
        }}
        editorDidMount={(editor: Editor) => {
          editorRef.current = editor;
          editor.setSize(width ?? '100%', height ?? '100%');
          editor.setValue(
            mode !== 'normal' ? defaultValue : codeEditorDefaultValue[language]
          );
        }}
        editorWillUnmount={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const removeEditor = editorRef.current as any;
          removeEditor?.display.wrapper.remove();
        }}
      />
    </S.Wrapper>
  );
}
