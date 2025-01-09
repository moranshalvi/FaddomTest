import { FC, useEffect, useState } from "react";
import PeriodValidator from "./PeriodValidator";
import { periodRules } from "./periodRules";

interface PeriodProps {
  value: number;
  timePeriod: string;
  onChange: (value: number) => void;
  onValidityChange: (isValid: boolean) => void;
}

const Period: FC<PeriodProps> = ({
  value,
  timePeriod,
  onChange,
  onValidityChange,
}) => {
  const [currentPeriod, setCurrentPeriod] = useState<number>(value);

  useEffect(() => {
    const rules = periodRules[timePeriod];
    if (rules) {
      const initialPeriod = rules.min;
      setCurrentPeriod(initialPeriod);
      onChange(initialPeriod);
    }
  }, [timePeriod, onChange]);

  const handlePeriodChange = (newPeriod: number) => {
    setCurrentPeriod(newPeriod);
    onChange(newPeriod);
  };

  return (
    <div>
      <PeriodValidator
        timePeriod={timePeriod}
        period={currentPeriod}
        onPeriodChange={handlePeriodChange}
        onValidityChange={onValidityChange}
      />
    </div>
  );
};

export default Period;
