using System.Diagnostics;
using day06;

var content = File.ReadAllText("/Users/moritz/Desktop/tmp/day06/day06/input.in");
var matrix = content.Split("\n")
    .Select(line => line
        .Select(character => character)
        .ToArray())
    .ToArray();

int y = Array.FindIndex(matrix, chars => chars.Contains('^'));
int x = Array.FindIndex(matrix[y], c => c == '^');

var currentDirection = Direction.Up;
var inMaze = true;

move();

printMatrix(matrix);

void printMatrix(char[][] matrix) {
    var countX = 1;
    for (int i = 0; i < matrix.Length; i++) {
        for (int j = 0; j < matrix[i].Length; j++) {
            if (matrix[i][j] == 'X') {
                countX++;
            }
        }
    }

    Console.WriteLine(countX);
}

void move() {
    var (oldx, oldy) = (x, y);
    
    if (currentDirection == Direction.Up) {
        if (CheckStep(y - 1, x))
            y -= 1;
    }
    else if (currentDirection == Direction.Right) {
        if (CheckStep(y, x + 1))
            x += 1;
    }
    else if (currentDirection == Direction.Down) {
        if (CheckStep(y + 1, x))
            y += 1;
    }
    else if (currentDirection == Direction.Left) {
        if (CheckStep(y, x - 1))
            x -= 1;
    }

    if (!inMaze) {
        return;
    }

    if (matrix[y][x] == '#') {
        //turn 90 deg right
        if (currentDirection == Direction.Up) {
            currentDirection = Direction.Right;
        }
        else if (currentDirection == Direction.Right) {
            currentDirection = Direction.Down;
        }
        else if (currentDirection == Direction.Down) {
            currentDirection = Direction.Left;
        }
        else if (currentDirection == Direction.Left) {
            currentDirection = Direction.Up;
        }

        (x, y) = (oldx, oldy);
    }

    matrix[y][x] = 'X';
    
    move();
}


bool CheckStep(int y, int x) {
    if (y < 0 || y >= matrix.Length) {
        inMaze = false;
        return false;
    }

    if (x < 0 || x >= matrix[0].Length) {
        inMaze = false;
        return false;
    }

    return true;
}