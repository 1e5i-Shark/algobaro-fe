import { useEffect, useState } from 'react';

interface TimerProps {
  minutes: number;
}

const MS = 1000;
const MINUTES_IN_MS = 60 * MS;

const convertToMin = (time: number) => {
  const minutes = Math.floor((time / MINUTES_IN_MS) % 60);
  const hours = Math.floor(time / (60 * MINUTES_IN_MS));

  const convertedMinutes = String(minutes).padStart(2, '0');
  if (hours > 0) {
    return `${hours}:${convertedMinutes}`;
  } else {
    return `${convertedMinutes}`;
  }
};

const converToSec = (time: number) => {
  return String(Math.floor((time / MS) % 60)).padStart(2, '0');
};

export default function Timer({ minutes }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(minutes * MINUTES_IN_MS);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    interval = setInterval(() => {
      setTimeLeft(prevTime => prevTime - MS);
    }, MS);

    if (timeLeft <= 0) {
      clearInterval(interval);
    }

    return () => {
      if (interval != null) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <div>
      {convertToMin(timeLeft)}:{converToSec(timeLeft)}
    </div>
  );
}
