const input = await Deno.readTextFile("./04.input.txt");

type Matrix = string[][];

const matrix: Matrix = input
  .trim()
  .split("\n")
  .map((line) => [...line]);

const directions = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
  [1, 1], // diagonal down-right
  [-1, -1], // diagonal up-left
  [1, -1], // diagonal down-left
  [-1, 1], // diagonal up-right
];

const countWordOccurrences = (matrix: Matrix, word: string): number => {
  const isValidPosition = (row: number, col: number): boolean => {
    return row >= 0 && row < matrix.length && col >= 0 &&
      col < matrix[row].length;
  };

  const checkDirection = (
    row: number,
    col: number,
    dx: number,
    dy: number,
  ): boolean => {
    return Array.from(word)
      .map((char, i) => ({
        char,
        newRow: row + (dx * i),
        newCol: col + (dy * i),
      }))
      .every(({ char, newRow, newCol }) =>
        isValidPosition(newRow, newCol) && matrix[newRow][newCol] === char
      );
  };

  return matrix
    .flatMap((row, rowIndex) =>
      row.map((cell, colIndex) =>
        cell === word[0]
          ? directions.filter(([dx, dy]) =>
            checkDirection(rowIndex, colIndex, dx, dy)
          ).length
          : 0
      )
    )
    .reduce((sum, count) => sum + count, 0);
};

const xmasCount = countWordOccurrences(matrix, "XMAS");

console.log(xmasCount);
