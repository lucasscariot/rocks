import React, { Component } from 'react';
import './App.css';

class Square extends Component {
  render() {
    return (
      <div className={'square ' + (this.props.value ? 'active' : '')}
      onClick={() => this.props.onClick()}>
      </div>
    );
  }
}

class Board extends Component {
  constructor() {
    super();
    const size = 5;
    this.state = {
      size: size,
      squares: Array(size).fill(false).map(x => Array(size).fill(false))
    };
  }

  toggleSquare(squares, x, y) {
    if (this.state.size <= x || this.state.size <= y) { return; }
    if (0 > x || 0 > y) { return; }
    if (squares[x][y]) {
      squares[x][y] = false;
    } else {
      squares[x][y] = true;
    }
  }

  handleClick(x, y) {
    const squares = this.state.squares.slice();
    this.toggleSquare(squares, x, y);
    this.toggleSquare(squares, x + 1, y);
    this.toggleSquare(squares, x - 1, y);
    this.toggleSquare(squares, x, y + 1);
    this.toggleSquare(squares, x, y - 1);
    this.setState({squares: squares});
  }

  renderSquare(x, y) {
   return (
      <Square
        value={this.state.squares[x][y]}
        x={x} y={y}
        onClick={() => this.handleClick(x, y)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, 0)}
          {this.renderSquare(0, 1)}
          {this.renderSquare(0, 2)}
          {this.renderSquare(0, 3)}
        </div>
        <div className="board-row">
          {this.renderSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
          {this.renderSquare(1, 3)}
        </div>
        <div className="board-row">
          {this.renderSquare(2, 0)}
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2)}
          {this.renderSquare(2, 3)}
        </div>
        <div className="board-row">
          {this.renderSquare(3 , 0)}
          {this.renderSquare(3 , 1)}
          {this.renderSquare(3 , 2)}
          {this.renderSquare(3 , 3)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default Game;
