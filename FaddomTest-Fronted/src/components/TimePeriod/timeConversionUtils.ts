export const timeMap: Record<string, number> = {
  "last minute": 1 * 60 * 1000,
  "last 5 minutes": 5 * 60 * 1000,
  "last 15 minutes": 15 * 60 * 1000,
  "last hour": 1 * 60 * 60 * 1000,
  "last 3 hours": 3 * 60 * 60 * 1000,
  "last 6 hours": 6 * 60 * 60 * 1000,
  "last 12 hours": 12 * 60 * 60 * 1000,
  "last day": 24 * 60 * 60 * 1000,
  "last 7 days": 7 * 24 * 60 * 60 * 1000,
  "last 30 days": 30 * 24 * 60 * 60 * 1000,
  "last 60 days": 60 * 24 * 60 * 60 * 1000,
};

export const convertTimePeriod = (timePeriod: string): { date: Date; milliseconds: number } | string => {
  const now = new Date();
  const milliseconds = timeMap[timePeriod];

  if (!milliseconds) {
    return `Invalid time period selected: "${timePeriod}". Please choose a valid option.`;
  }

  return {
    date: new Date(now.getTime() - milliseconds),
    milliseconds,
  };
};
