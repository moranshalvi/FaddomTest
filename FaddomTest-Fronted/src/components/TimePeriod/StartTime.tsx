import { FC, useEffect, useRef } from "react";

interface StartTimeProps {
  timePeriod: Date;
  period: number;
  onProcessedTime: (processedTime: string) => void;
}

const StartTime: FC<StartTimeProps> = ({
  timePeriod,
  period,
  onProcessedTime,
}) => {
  const hasProcessedTime = useRef(false);

  useEffect(() => {
    if (hasProcessedTime.current) return;

    const now = new Date();
    const diffInMilliseconds = now.getTime() - timePeriod.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    let roundedTime = new Date(timePeriod);

    if (diffInDays < 15) {
      roundedTime.setSeconds(0, 0);
    } else if (diffInDays >= 15 && diffInDays <= 63) {
      const minutes = roundedTime.getMinutes();
      roundedTime.setMinutes(Math.floor(minutes / 5) * 5, 0, 0);
    } else if (diffInDays > 63) {
      roundedTime.setMinutes(0, 0, 0);
    }

    if (period === 5 || period === 10 || period === 30) {
      const seconds = roundedTime.getSeconds();
      roundedTime.setSeconds(Math.floor(seconds / period) * period, 0);
    }

    onProcessedTime(roundedTime.toISOString());
    hasProcessedTime.current = true;
  }, [timePeriod, period, onProcessedTime]);

  return null;
};

export default StartTime;
