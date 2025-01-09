export const periodRules: Record<
  string,
  {
    min: number;
    multiples: number[];
    validatePeriod: (period: number) => boolean;
  }
> = {
  "last minute": {
    min: 60,
    multiples: [60],
    validatePeriod: (period) => period >= 60 && period % 60 === 0,
  },
  "last 5 minutes": {
    min: 60,
    multiples: [60],
    validatePeriod: (period) => period >= 60 && period % 60 === 0,
  },
  "last 15 minutes": {
    min: 60,
    multiples: [60],
    validatePeriod: (period) => period >= 60 && period % 60 === 0,
  },
  "last hour": {
    min: 60,
    multiples: [60],
    validatePeriod: (period) => period >= 60 && period % 60 === 0,
  },
  "last 3 hours": {
    min: 60,
    multiples: [60],
    validatePeriod: (period) => period >= 60 && period % 60 === 0,
  },
  "last 6 hours": {
    min: 60,
    multiples: [60],
    validatePeriod: (period) => period >= 60 && period % 60 === 0,
  },
  "last 12 hours": {
    min: 60,
    multiples: [60],
    validatePeriod: (period) => period >= 60 && period % 60 === 0,
  },
  "last day": {
    min: 60,
    multiples: [60],
    validatePeriod: (period) => period >= 60 && period % 60 === 0,
  },
  "last 7 days": {
    min: 300,
    multiples: [300],
    validatePeriod: (period) => period >= 300 && period % 300 === 0,
  },
  "last 30 days": {
    min: 300,
    multiples: [300],
    validatePeriod: (period) => period >= 300 && period % 300 === 0,
  },
  "last 60 days": {
    min: 3600,
    multiples: [3600],
    validatePeriod: (period) => period >= 3600 && period % 3600 === 0,
  },
};
