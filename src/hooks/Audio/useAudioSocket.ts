import * as Stomp from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';
import { sendMessageService } from '@/services/Audio/sendMessageService';
import { subscribeMessage } from '@/services/Audio/subscribeMessage';
import useRTCStore from '@/store/RTCStore';

const BASE_SOCKET_URL = import.meta.env.VITE_BASE_SOCKET_URL;

interface AudioSocketProps {
  myKey: string;
  roomShortUuid: string;
}

export const useAudioSocket = ({ myKey, roomShortUuid }: AudioSocketProps) => {
  const [isConnected, setIsConnected] = useState(false);

  const client = useRef<Stomp.Client | null>(null);
  const pcListMap = useRef<Map<string, RTCPeerConnection>>(new Map());
  const audioStream = useRef<MediaStream | null>(null);

  const { otherKeyList, addAudioStream } = useRTCStore();

  useEffect(() => {
    if (otherKeyList.length > 0 && isConnected) {
      console.log('otherKeyList', otherKeyList);
      createOtherPeerConnection();
    }
  }, [otherKeyList, isConnected]);

  const connectSocket = (stream: MediaStream) => {
    if (client.current !== null) return;

    audioStream.current = stream;

    const socket = new SockJS(BASE_SOCKET_URL);
    client.current = new Stomp.Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem(LOCAL_ACCESSTOKEN)}`,
      },
      reconnectDelay: 3000,
    });

    client.current.onConnect = () => {
      if (isConnected) return;
      setIsConnected(() => true);
      console.log('음성채팅 connect!', isConnected);

      // iceCandidate subscribe
      subscribeMessage({
        client: client.current,
        destination: `/peer/iceCandidate/${myKey}/${roomShortUuid}`,
        callback: candidate => {
          const key = JSON.parse(candidate.body).key;
          const message = JSON.parse(candidate.body).body;

          const currentPc = pcListMap.current.get(key);

          console.log(
            'socket flow: receive candidate from',
            key,
            '번 유저',
            pcListMap
          );

          currentPc?.addIceCandidate(message);
        },
      });

      // offer subscribe
      subscribeMessage({
        client: client.current,
        destination: `/peer/offer/${myKey}/${roomShortUuid}`,
        callback: async offer => {
          const key = JSON.parse(offer.body).key;
          const message = JSON.parse(offer.body).body;

          let currentPc = pcListMap.current.get(key);
          if (!currentPc) {
            currentPc = createPeerConnection(key);
          }

          console.log(
            'socket flow: 5. setRemoteDescription from',
            key,
            '번 유저',
            pcListMap.current
          );

          currentPc.setRemoteDescription(message);

          sendAnswer(currentPc, key);
        },
      });

      // answer subscribe
      subscribeMessage({
        client: client.current,
        destination: `/peer/answer/${myKey}/${roomShortUuid}`,
        callback: async answer => {
          const key = JSON.parse(answer.body).key;
          const message = JSON.parse(answer.body).body;

          const currentPc = pcListMap.current.get(key);

          currentPc?.setRemoteDescription(message);

          console.log(
            'socket flow: 8. getAnswer setRemoteDescription from',
            key,
            '번 유저',
            currentPc,
            pcListMap
          );
        },
      });
    };

    client.current.activate();
  };

  const createOtherPeerConnection = () => {
    otherKeyList.forEach(otherKey => {
      sendOffer(otherKey);
    });
  };

  const sendOffer = async (otherKey: string) => {
    let pc = pcListMap.current.get(otherKey);
    if (!pc) {
      pc = createPeerConnection(otherKey);
    }

    console.log(
      'socket flow: 3. createOffer 후 setLocalDescription',
      otherKey,
      '번 유저'
    );

    const offer = await pc.createOffer();
    pc.setLocalDescription(offer);

    sendMessageService({
      client: client.current,
      destination: `/peer/offer/${otherKey}/${roomShortUuid}`,
      body: {
        key: myKey,
        body: offer,
      },
    });
  };

  const sendAnswer = async (pc: RTCPeerConnection, otherKey: string) => {
    const answer = await pc.createAnswer();
    pc.setLocalDescription(answer);

    console.log(
      'socket flow: 6. createAnswer 후 setLocalDescription',
      otherKey,
      '번 유저',
      pcListMap
    );

    sendMessageService({
      client: client.current,
      destination: `/peer/answer/${otherKey}/${roomShortUuid}`,
      body: {
        key: myKey,
        body: answer,
      },
    });
  };

  const createPeerConnection = (otherKey: string) => {
    const configuration = {
      iceServers: [
        {
          urls: ['stun:stun1.l.google.com:19302'],
        },
      ],
    };

    const pc = new RTCPeerConnection(configuration);
    pcListMap.current.set(otherKey, pc);

    pc.addEventListener('icecandidate', event => {
      if (event.candidate) {
        const stompClient = client.current;
        if (stompClient !== null) {
          console.log('socket flow: send candidate to', otherKey, '번 유저');

          sendMessageService({
            client: stompClient,
            destination: `/peer/iceCandidate/${otherKey}/${roomShortUuid}`,
            body: {
              key: myKey,
              body: event.candidate,
            },
          });
        }
      }
    });

    pc.addEventListener('track', event => {
      console.log(
        'socket flow: onTrack',
        otherKey,
        '번 유저',
        event.streams[0]
      );

      addAudioStream({ key: otherKey, stream: event.streams[0] });
    });

    audioStream.current?.getTracks().forEach(track => {
      if (audioStream.current !== null) {
        console.log(`socket flow: 2. addTrack ${otherKey}번 유저: `, track);
        pc.addTrack(track, audioStream.current);
      }
    });

    return pc;
  };

  const resetState = () => {
    console.log('reset');

    client.current = null;
    audioStream.current = null;
    pcListMap.current = new Map();
  };

  const disconnectSocket = () => {
    console.log('disconnect');

    audioStream.current?.getTracks().forEach(track => {
      track.stop();
    });

    client.current?.deactivate();
    resetState();
  };

  return {
    isConnected,
    client: client.current,
    audioStream: audioStream.current,
    pcListMap: pcListMap.current,
    connectSocket,
    disconnectSocket,
    createOtherPeerConnection,
    sendOffer,
  };
};
