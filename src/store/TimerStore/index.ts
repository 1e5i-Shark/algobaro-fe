import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TimerStateProps {
  isStop: boolean;
  setIsStop: (isStop: boolean) => void;
}

const useTimerStore = create<TimerStateProps>()(
  devtools(set => ({
    isStop: true,
    setIsStop: (isStop: boolean) => set({ isStop }),
  }))
);

export default useTimerStore;
