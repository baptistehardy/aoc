const input = await Deno.readTextFile("./02.input.txt");

interface Analysis {
  safeReports: number;
  madeSafeReports: number;
}

const isReportSafe = (levels: number[]) => {
  let isWithinBounds = true;
  let isAlwaysDecreasing = true;
  let isAlwaysIncreasing = true;

  levels.map((level, index) => {
    if (index == 0) return;

    if (levels[index - 1] < level) {
      isAlwaysDecreasing = false;
    }

    if (levels[index - 1] > level) {
      isAlwaysIncreasing = false;
    }

    const difference = Math.abs(levels[index - 1] - level);

    if (difference < 1 || difference > 3) {
      isWithinBounds = false;
    }
  });

  if ((isAlwaysIncreasing || isAlwaysDecreasing) && isWithinBounds) {
    return true;
  }

  return false;
};

const safeReportCount = input
  .substring(0, input.length - 1)
  .split("\n")
  .reduce<Analysis>((sum, report) => {
    const levels = report.split(" ").map((level) => parseInt(level));

    let tolerable = false;

    levels.some((_, index) => {
      const removed = levels.filter((_, i) => i !== index);

      if (isReportSafe(removed)) {
        tolerable = true;

        return true; // break for some()
      }
    });

    if (isReportSafe(levels)) {
      sum.safeReports++;
    }

    if (isReportSafe(levels) || tolerable) {
      sum.madeSafeReports++;
    }

    return sum;
  }, { safeReports: 0, madeSafeReports: 0 });

console.log(safeReportCount); // { safeReports: 287, madeSafeReports: 354 }
