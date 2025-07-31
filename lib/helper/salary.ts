import { normalize } from "./bignumber";

/**
 * Calculate real-time incremental salary based on the new indexer logic
 * Formula: currentSalaryBalance = previousBalance + (salaryPerSecond * timeElapsed)
 */
export const getIncrementalSalary = (
  salary: string | number,
  periodTime: string,
  lastBalanceUpdate: number,
  now: number,
  currentSalaryBalance?: string | number,
  totalWithdrawn?: string | number,
  streamingActive?: boolean,
): string => {
  // If streaming is not active, return 0
  if (streamingActive === false) {
    return "0.000";
  }

  const normalizedSalary = normalize(salary, 18);
  const normalizedCurrentBalance = normalize(currentSalaryBalance || "0", 18);
  const normalizedTotalWithdrawn = normalize(totalWithdrawn || "0", 18);

  // Calculate salary per second
  const salaryPerSecond = Number(normalizedSalary) / Number(periodTime);

  // Calculate time elapsed since last balance update
  const elapsedTimeInSeconds = Math.max(0, now - lastBalanceUpdate);

  // Calculate new earnings since last update
  const newEarnings = salaryPerSecond * elapsedTimeInSeconds;

  // Calculate current total balance: previous balance + new earnings
  const totalBalance = Number(normalizedCurrentBalance) + newEarnings;

  // Calculate available balance: total balance - total withdrawn
  const availableBalance = Math.max(
    0,
    totalBalance - Number(normalizedTotalWithdrawn),
  );

  return availableBalance.toFixed(3);
};

/**
 * Legacy function for backward compatibility
 * @deprecated Use the new getIncrementalSalary with additional parameters instead
 */
export const getIncrementalSalaryLegacy = (
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
