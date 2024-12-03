const input = await Deno.readTextFile("./03.input.txt");

const matches = input
  .substring(0, input.length - 1)
  .match(
    /(?:.*?)(do\(\)|don't\(\))?((?:(?!do\(\)|don't\(\)).)*?)mul\((\d+),(\d+)\)/gm,
  );

if (matches === null) {
  throw Error("No instruction matching!");
}

let enabled = true;
const results = matches.reduce((sum, match) => {
  const groups = match.match(
    /(?:.*?)(do\(\)|don't\(\))?((?:(?!do\(\)|don't\(\)).)*?)mul\((\d+),(\d+)\)/,
  );

  if (!groups) {
    throw Error("No groups matching!");
  }

  const [full, lastDoOrDont, inBetween, x, y] = groups;

  if (lastDoOrDont !== undefined) {
    if (lastDoOrDont.includes("don't()")) enabled = false;
    if (lastDoOrDont.includes("do()")) enabled = true;
  }

  return enabled ? sum += parseInt(x) * parseInt(y) : sum;
}, 0);

console.log(results);
