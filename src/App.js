import React, { Component } from 'react';
import _ from 'lodash';
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
    const size = 8;
    this.state = {
      size: size,
      squares: Array(5).fill(false).map(x => Array(7).fill(false)),
      isWin: 'Can you reproduce this?',
      final: [
        [false, false, true, true, true, false, false],
        [false, true, false, false, false, true, false],
        [false, true, false, false, false, true, false],
        [false, true, false, false, false, true, false],
        [false, false, true, true, true, false, false],
      ]
    };

    this.checkResult = this.checkResult.bind(this);
  }

  toggleSquare(squares, x, y) {
    if (x >= 5 || y >= 7) { return; }
    if (0 > x || 0 > y) { return; }
    if (squares[x][y]) {
      squares[x][y] = false;
    } else {
      squares[x][y] = true;
    }
  }

  handleClick(x, y) {
    const squares = this.state.squares.slice();
    this.toggleSquare(squares, x + 1, y + 1);
    this.toggleSquare(squares, x - 1, y - 1);
    this.toggleSquare(squares, x - 1, y + 1);
    this.toggleSquare(squares, x + 1, y - 1);
    this.toggleSquare(squares, x + 1, y);
    this.toggleSquare(squares, x - 1, y);
    this.toggleSquare(squares, x, y + 1);
    this.toggleSquare(squares, x, y - 1);
    this.setState({squares: squares});
    this.checkResult();
  }
  
  checkResult() {
    if (_.isEqual(this.state.squares, this.state.final)) {
      this.setState({isWin : 'You rock!' });
    } else {
      this.setState({isWin : 'Can you reproduce this?' });
    }
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

  previewSquare(x, y) {
   return (
      <Square
        value={this.state.final[x][y]}
        x={x} y={y}
        onClick={() => null}
      />
    );
  }

  render() {
    return (
      <div className="game">
        <div className="preview">
          <div className="title">
            <h1>{this.state.isWin}</h1>
          </div>
          <div className="final">
            <div className="board-row">
              {this.previewSquare(0, 0)}
              {this.previewSquare(0, 1)}
              {this.previewSquare(0, 2)}
              {this.previewSquare(0, 3)}
              {this.previewSquare(0, 4)}
              {this.previewSquare(0, 5)}
              {this.previewSquare(0, 6)}
            </div>
            <div className="board-row">
              {this.previewSquare(1, 0)}
              {this.previewSquare(1, 1)}
              {this.previewSquare(1, 2)}
              {this.previewSquare(1, 3)}
              {this.previewSquare(1, 4)}
              {this.previewSquare(1, 5)}
              {this.previewSquare(1, 6)}
            </div>
            <div className="board-row">
              {this.previewSquare(2, 0)}
              {this.previewSquare(2, 1)}
              {this.previewSquare(2, 2)}
              {this.previewSquare(2, 3)}
              {this.previewSquare(2, 4)}
              {this.previewSquare(2, 5)}
              {this.previewSquare(2, 6)}
            </div>
            <div className="board-row">
              {this.previewSquare(3, 0)}
              {this.previewSquare(3, 1)}
              {this.previewSquare(3, 2)}
              {this.previewSquare(3, 3)}
              {this.previewSquare(3, 4)}
              {this.previewSquare(3, 5)}
              {this.previewSquare(3, 6)}
            </div>
            <div className="board-row">
              {this.previewSquare(4, 0)}
              {this.previewSquare(4, 1)}
              {this.previewSquare(4, 2)}
              {this.previewSquare(4, 3)}
              {this.previewSquare(4, 4)}
              {this.previewSquare(4, 5)}
              {this.previewSquare(4, 6)}
            </div>
          </div>
        </div>
        <div className="game-board">
          <div>
            <div className="board-row">
              {this.renderSquare(0, 0)}
              {this.renderSquare(0, 1)}
              {this.renderSquare(0, 2)}
              {this.renderSquare(0, 3)}
              {this.renderSquare(0, 4)}
              {this.renderSquare(0, 5)}
              {this.renderSquare(0, 6)}
            </div>
            <div className="board-row">
              {this.renderSquare(1, 0)}
              {this.renderSquare(1, 1)}
              {this.renderSquare(1, 2)}
              {this.renderSquare(1, 3)}
              {this.renderSquare(1, 4)}
              {this.renderSquare(1, 5)}
              {this.renderSquare(1, 6)}
            </div>
            <div className="board-row">
              {this.renderSquare(2, 0)}
              {this.renderSquare(2, 1)}
              {this.renderSquare(2, 2)}
              {this.renderSquare(2, 3)}
              {this.renderSquare(2, 4)}
              {this.renderSquare(2, 5)}
              {this.renderSquare(2, 6)}
            </div>
            <div className="board-row">
              {this.renderSquare(3, 0)}
              {this.renderSquare(3, 1)}
              {this.renderSquare(3, 2)}
              {this.renderSquare(3, 3)}
              {this.renderSquare(3, 4)}
              {this.renderSquare(3, 5)}
              {this.renderSquare(3, 6)}
            </div>
            <div className="board-row">
              {this.renderSquare(4, 0)}
              {this.renderSquare(4, 1)}
              {this.renderSquare(4, 2)}
              {this.renderSquare(4, 3)}
              {this.renderSquare(4, 4)}
              {this.renderSquare(4, 5)}
              {this.renderSquare(4, 6)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;