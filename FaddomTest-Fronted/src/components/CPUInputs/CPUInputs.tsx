import { useState, useCallback } from "react";
import classes from "./CPUInputs.module.scss";
import TimePeriod from "../TimePeriod/TimePeriod";
import Period from "../Period/Period";
import IpAddress from "../IpAddress/IpAddress";
import Statistics from "../Statistics/Statistics";
import LoadBtn from "../LoadBtn/LoadBtn";
import TimeConverter from "../TimePeriod/TimeConverter";
import StartTime from "../TimePeriod/StartTime";

const CPUInputs = () => {
  const [timePeriod, setTimePeriod] = useState<string>("last day");
  const [convertedTime, setConvertedTime] = useState<Date | null>(null);
  const [timeInMilliseconds, setTimeInMilliseconds] = useState<number>(0);
  const [processedTime, setProcessedTime] = useState<Date | null>(null);
  const [period, setPeriod] = useState<number>(60);
  const [isPeriodValid, setIsPeriodValid] = useState<boolean>(true);
  const [ipAddress, setIpAddress] = useState<string>("");
  const [statistics, setStatistics] = useState<string[]>(["Average"]);
  const [error, setError] = useState<string | null>(null);

  const [submittedData, setSubmittedData] = useState<null | {
    startTime: Date;
    endTime: Date;
    period: number;
    ipAddress: string;
    statistics: string[];
  }>(null);

  const handleValidConversion = useCallback(
    (date: Date, milliseconds: number) => {
      setConvertedTime(date);
      setTimeInMilliseconds(milliseconds);
    },
    []
  );

  const handleError = useCallback((error: string | null) => {
    setError(error);
  }, []);

  const handleIpReset = () => {
    setIpAddress("");
    setSubmittedData(null);
  };

  const handleLoadClick = () => {
    if (!processedTime || !isPeriodValid || !ipAddress) {
      setError("Please correct all input errors before proceeding!");
      return;
    }

    setError(null);

    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - timeInMilliseconds);

    setSubmittedData({
      startTime,
      endTime,
      period,
      ipAddress,
      statistics,
    });
  };

  return (
    <div className={classes.Container}>
      <h2>Input Details</h2>
      <TimePeriod value={timePeriod} onChange={setTimePeriod} />
      <TimeConverter
        timePeriod={timePeriod}
        onValidConversion={handleValidConversion}
        onError={handleError}
      />
      {convertedTime && (
        <StartTime
          timePeriod={convertedTime}
          period={period}
          onProcessedTime={(date) => setProcessedTime(new Date(date))}
        />
      )}
      <Period
        value={period}
        timePeriod={timePeriod}
        onChange={setPeriod}
        onValidityChange={setIsPeriodValid}
      />
      <Statistics value={statistics} onChange={setStatistics} />
      <div className={classes.inputBtn}>
        <IpAddress value={ipAddress} onChange={setIpAddress} />
        <button onClick={handleLoadClick}>Load</button>
      </div>
      {error && <p className={classes.error}>{error}</p>}
      {submittedData && (
        <div className={classes.output}>
          <LoadBtn
            data={submittedData}
            statistics={statistics}
            onIpReset={handleIpReset}
          />
        </div>
      )}
    </div>
  );
};

export default CPUInputs;
