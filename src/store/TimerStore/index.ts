import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TimerStateProps {
  isEnd: boolean;
  isStop: boolean;
  setIsEnd: (isEnd: boolean) => void;
  setIsStop: (isStop: boolean) => void;
}

const useTimerStore = create<TimerStateProps>()(
  devtools(set => ({
    isEnd: false,
    isStop: true,
    setIsEnd: (isEnd: boolean) => set({ isEnd }),
    setIsStop: (isStop: boolean) => set({ isStop }),
  }))
);

export default useTimerStore;
