import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { RTCStoreState, RTCStoreValue } from './type';

const initialValue: RTCStoreValue = {
  audioStreamList: [],
  otherKeyList: [],
};

const useRTCStore = create<RTCStoreState>()(
  devtools(
    (set, get) => ({
      ...initialValue,
      addAudioStream: audioStream => {
        const { audioStreamList } = get();
        const filteredAudioStreamList = audioStreamList.filter(
          stream => stream.key !== audioStream.key
        );
        set({ audioStreamList: [...filteredAudioStreamList, audioStream] });
      },
      addOtherKeyList: otherKey => {
        const { otherKeyList } = get();
        const filteredOtherKeyList = otherKeyList.filter(
          key => key !== otherKey
        );
        set({ otherKeyList: [...filteredOtherKeyList, otherKey] });
      },
      memberLeave: (memberId: string) => {
        const { otherKeyList, audioStreamList } = get();

        set({
          audioStreamList: audioStreamList.filter(
            stream => stream.key !== memberId
          ),
          otherKeyList: otherKeyList.filter(key => key !== memberId),
        });
        console.log(
          '남은 멤버:',
          otherKeyList.filter(key => key !== memberId)
        );
      },
      reset: () => {
        set({ ...initialValue });
      },
    }),
    { store: 'RTCStore' }
  )
);
export default useRTCStore;
