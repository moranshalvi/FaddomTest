import { FC, useState, useEffect } from "react";
import { periodRules } from "./periodRules";
import classes from "./PeriodValidator.module.scss";

interface PeriodValidatorProps {
  timePeriod: string;
  period: number;
  onPeriodChange: (newPeriod: number) => void;
  onValidityChange: (isValid: boolean) => void;
}

const PeriodValidator: FC<PeriodValidatorProps> = ({
  timePeriod,
  period,
  onPeriodChange,
  onValidityChange,
}) => {
  const [showError, setShowError] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const rules = periodRules[timePeriod] || {
    min: 60,
    multiples: [60],
    validatePeriod: () => true,
  };

  useEffect(() => {
    const isValid = rules.validatePeriod(period);
    onValidityChange(isValid);

    if (hasInteracted) {
      setShowError(!isValid);
    }
  }, [period, rules, onValidityChange, hasInteracted]);

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    onPeriodChange(value);

    const isValid = rules.validatePeriod(value);
    onValidityChange(isValid);
    setHasInteracted(true);
    setShowError(!isValid);
  };

  return (
    <div className={classes.container}>
      <div className={classes.inputRow}>
        <label>Period:</label>
        <input
          type="number"
          value={period}
          onChange={handlePeriodChange}
          min={rules.min}
          step={rules.multiples[0]}
          required
        />
        <span className={classes.info}>
          (Min: {rules.min}, Multiples: {rules.multiples.join(", ")})
        </span>
      </div>
      <small className={classes.tip}>
        Tip: Use the up/down arrow keys to adjust the value in multiples of{" "}
        {rules.multiples[0]}.
      </small>
      <div className={classes.errorContainer}>
        {showError && (
          <p className={classes.error}>
            Invalid period! The period must be at least {rules.min} and a
            multiple of {rules.multiples.join(", ")}.
          </p>
        )}
      </div>
    </div>
  );
};

export default PeriodValidator;
