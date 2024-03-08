import './CodeEditorLibs';

import { Editor } from 'codemirror';
import { useEffect, useRef } from 'react';
import { UnControlled as CodeMirrorEditor } from 'react-codemirror2';
import { CodemirrorBinding } from 'y-codemirror';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';

import { useCustomTheme } from '@/hooks/useCustomTheme';

import * as S from './CodeEditor.style';
import { getEditorMode, getRandomColors } from './utils';

export default function CodeEditor() {
  const { theme } = useCustomTheme();

  const editorRef = useRef<Editor | null>(null);
  const providerRef = useRef<WebrtcProvider | null>(null);

  const yDoc = new Y.Doc();
  const yText = yDoc.getText('codemirror');

  useEffect(() => {
    if (!editorRef.current) return;

    try {
      // RoomName에 따라서 접속 환경이 달라짐
      // TODO: roomUuid에 따라서 다르게 처리해주어야 함
      providerRef.current = new WebrtcProvider('Any Room Name', yDoc);

      const yUndoManager = new Y.UndoManager(yText);

      // 사용자 이벤트 감지
      const awareness = providerRef.current.awareness;

      const { clientID } = awareness;

      // TODO: 추후 User 닉네임으로 변경
      awareness.setLocalStateField('user', {
        name: `UserID: ${clientID}`,
        color: getRandomColors(),
      });

      // yjs, editor를 연동하는 기능
      new CodemirrorBinding(yText, editorRef.current, awareness, {
        yUndoManager,
      });
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

  return (
    <S.Wrapper>
      <CodeMirrorEditor
        options={{
          mode: getEditorMode('javascript'),
          theme: theme.mode === 'dark' ? 'material-palenight' : 'eclipse',
          lineNumbers: true,
          tabSize: 2,
          extraKeys: {
            'Ctrl-Space': 'autocomplete',
          },
        }}
        editorDidMount={editor => {
          editorRef.current = editor;
          editor.setSize('100%', '100%');
        }}
        editorWillUnmount={() => {
          console.log('unmount');
          const removeEditor = editorRef.current as any;
          removeEditor.display.wrapper.remove();
        }}
      />
    </S.Wrapper>
  );
}
