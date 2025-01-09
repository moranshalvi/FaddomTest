import { FC } from "react";
import { timePeriodOpts } from "./timePeriodOpts";

interface TimePeriodProps {
  value: string;
  onChange: (value: string) => void;
}

const TimePeriod: FC<TimePeriodProps> = ({ value, onChange }) => {
  const handleTimePeriodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label>Time Period: </label>
      <select value={value} onChange={handleTimePeriodChange}>
        {timePeriodOpts.map((period) => (
          <option key={period} value={period}>
            {period}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimePeriod;
