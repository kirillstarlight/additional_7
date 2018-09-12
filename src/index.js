module.exports = function solveSudoku(matrix) {
  findAllZeroPosition = ((board) => {
    let zeroPositions = [];
    for(let i = 0; i < board.length; i++) {
      for(let j = 0; j < board[i].length; j++) {
        if(board[i][j] === 0) {
          zeroPositions.push([i, j]);
        }
      }
    }
    return zeroPositions;
  });

  checkRow = ((board, row, value) => {
    for(let i = 0; i < board[row].length; i++) {
      if(board[row][i] === value) {
        return false;
      }
    }
    return true;
  });

  checkColumn = ((board, column, value) => {
    for(let i = 0; i < board.length; i++) {
      if(board[i][column] === value) {
        return false;
      }
    }
    return true;
  });

  checkSquare = ((board, column, row, value) => {
    var columnCorner = 0,
        rowCorner = 0,
        squareSize = 3;
    while(column >= columnCorner + squareSize) {
      columnCorner += squareSize;
    }

    while(row >= rowCorner + squareSize) {
      rowCorner += squareSize;
    }

    for(let i = rowCorner; i < rowCorner + squareSize; i++) {
      for(let j = columnCorner; j < columnCorner + squareSize; j++) {
        if(board[i][j] === value) {
          return false;
        }
      }
    }
    return true;
  });

  checkValue = ((board, column, row, value) => {
    if(this.checkRow(board, row, value) &&
      this.checkColumn(board, column, value) &&
      this.checkSquare(board, column, row, value)) {
      return true;
    } else {
      return false;
    }
  });

  solveGame = ((board, zeroPositions) => {
    let limit = 9;
    let i, row, column, value, found;
    for(i = 0; i < zeroPositions.length;) {
      row = zeroPositions[i][0];
      column = zeroPositions[i][1];
      value = board[row][column] + 1;
      found = false;
      while(!found && value <= limit) {
        if(this.checkValue(board, column, row, value)) {
          found = true;
          board[row][column] = value;
          i++;
        }
        else {
          value++;
        }
      }
      if(!found) {
        board[row][column] = 0;
        i--;
      }
    }
    return board;
  });

  let zeroPositions = this.findAllZeroPosition(matrix);

  return solveGame(matrix, zeroPositions);
}
