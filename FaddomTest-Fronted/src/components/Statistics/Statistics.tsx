import { FC } from "react";
import { statisticsOpts } from "./statisticsOpts";

interface StatisticsProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const Statistics: FC<StatisticsProps> = ({ value, onChange }) => {
  const handleStatisticsChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onChange([event.target.value]);
  };

  return (
    <div>
      <label>Statistics: </label>
      <select value={value} onChange={handleStatisticsChange}>
        {statisticsOpts.map((stat) => (
          <option key={stat} value={stat}>
            {stat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Statistics;
