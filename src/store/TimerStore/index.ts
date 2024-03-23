import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TimerStateProps {
  endDateIOSString: string;
  isEnd: boolean;
  isStop: boolean;
  setEndDateIOSString: (endDateIOSString: string) => void;
  setIsEnd: (isEnd: boolean) => void;
  setIsStop: (isStop: boolean) => void;
}

const useTimerStore = create<TimerStateProps>()(
  devtools(set => ({
    endDateIOSString: '',
    isEnd: false,
    isStop: true,
    setEndDateIOSString: (endDateIOSString: string) =>
      set({ endDateIOSString }),
    setIsEnd: (isEnd: boolean) => set({ isEnd }),
    setIsStop: (isStop: boolean) => set({ isStop }),
  }))
);

export default useTimerStore;
