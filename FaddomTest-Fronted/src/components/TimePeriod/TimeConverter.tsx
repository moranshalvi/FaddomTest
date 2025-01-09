import { FC, useEffect } from "react";
import { convertTimePeriod } from "./timeConversionUtils";

interface TimeConverterProps {
  timePeriod: string;
  onValidConversion: (convertedTime: Date, milliseconds: number) => void;
  onError: (error: string | null) => void;
}

const TimeConverter: FC<TimeConverterProps> = ({
  timePeriod,
  onValidConversion,
  onError,
}) => {
  useEffect(() => {
    const result = convertTimePeriod(timePeriod);
    if (typeof result === "string") {
      onError(result);
    } else {
      onError(null);
      onValidConversion(result.date, result.milliseconds);
    }
  }, [timePeriod, onValidConversion, onError]);

  return null;
};

export default TimeConverter;
