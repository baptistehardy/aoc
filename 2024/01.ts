const input = await Deno.readTextFile("./01.input.txt");

interface Columns {
  leftColumn: number[];
  rightColumn: number[];
}

const { leftColumn, rightColumn } = input
  .split("\n")
  .reduce<Columns>((accumulator, line) => {
    const [left, right] = line.split("   ");

    // deal with trailing newline
    if (right === undefined) {
      return accumulator;
    }

    accumulator.leftColumn.push(parseInt(left));
    accumulator.rightColumn.push(parseInt(right));

    return accumulator;
  }, { leftColumn: [], rightColumn: [] });

const totalDistance = leftColumn
  .sort((a, b) => a - b)
  .reduce(
    (sum, location, index) =>
      sum + Math.abs(location - rightColumn.sort((a, b) => a - b)[index]),
    0,
  );

console.log(totalDistance); // 1579939

let similarityScore = 0;

leftColumn.map((location) => {
  similarityScore += location *
    rightColumn.filter((value) => value == location).length;
});

console.log(similarityScore); // 20351745
