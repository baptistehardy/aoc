const input = await Deno.readTextFile("./01.txt");

const leftColumn: number[] = [];
const rightColumn: number[] = [];

input.split("\n").map((line) => {
  const result = line.split("   ");

  if (isNaN(parseInt(result[0]))) {
    return;
  }

  leftColumn.push(parseInt(result[0]));
  rightColumn.push(parseInt(result[1]));
});

leftColumn.sort((a, b) => a - b);
rightColumn.sort((a, b) => a - b);

let totalDistance = 0;

leftColumn.map((location, index) => {
  totalDistance += Math.abs(location - rightColumn.at(index)!);
});

console.log(totalDistance); // 1579939

let similarityScore = 0;

leftColumn.map((location) => {
  similarityScore += location *
    rightColumn.filter((value) => value == location).length;
});

console.log(similarityScore); // 20351745
