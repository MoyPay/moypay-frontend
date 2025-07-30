import { normalize } from "./bignumber";

export const getIncrementalSalary = (
  salary: string | number,
  periodTime: string,
  startTimestamp: number,
  now: number,
): string => {
  const normalizedSalary = normalize(salary, 18);

  const elapsedTimeInSeconds = now - startTimestamp;

  const incrementalSalary =
    (Number(normalizedSalary) * elapsedTimeInSeconds) / Number(periodTime);

  return incrementalSalary.toFixed(3);
};
