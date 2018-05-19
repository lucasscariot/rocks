import React, { Component } from 'react';
import Square from './Square';
import levels from './levels.json';
import Cookies from 'universal-cookie';
import moment from 'moment';
import _ from 'lodash';
import './App.css';

const cookies = new Cookies();

class Board extends Component {
  constructor() {
    super();

    this.state = {
      level: _.toInteger(cookies.get('level')) || 0,
      clicks: _.toInteger(cookies.get('clicks')) || 0,
      squares: cookies.get('squares') ||
        Array(5).fill(false).map(x => Array(7).fill(0)),
      final: levels[cookies.get('level') || 0],
      isWin: false
    };

    this.checkResult = this.checkResult.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.cookieSave = this.cookieSave.bind(this);
  }

  componentWillMount() {
    this.checkResult();
  }

  toggleSquare(squares, x, y) {
    if (x >= 5 || y >= 7) { return; }
    if (0 > x || 0 > y) { return; }
    if (squares[x][y]) {
      squares[x][y] = 0;
    } else {
      squares[x][y] = 1;
    }
  }

  cookieSave() {
    cookies.set('level', this.state.level, {
      maxAge: moment().add(1, 'years'),
      path: '/',
    });
    cookies.set('squares', this.state.squares, {
      maxAge: moment().add(1, 'years'),
      path: '/',
    });
    cookies.set('clicks', this.state.clicks, {
      maxAge: moment().add(1, 'years'),
      path: '/',
    });
  }

  resetBoard() {
    this.setState({
      squares: Array(5).fill(false).map(x => Array(7).fill(0)),
      isWin: false
    }, () => this.cookieSave());
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
    this.setState({
      squares: squares,
      clicks: this.state.clicks + 1
    }, () => this.cookieSave());
    this.checkResult();
  }
  
  checkResult() {
    if (_.isEqual(this.state.squares, this.state.final)) {
      this.setState({ isWin: true });
    } else {
      this.setState({isWin: false });
    }
  }

  startOver() {
    this.setState({
      level: 0,
      clicks: 0,
      final: levels[0],
    }, () => this.resetBoard());
  }

  nextLevel() {
    if (!levels[this.state.level + 1]) { return; }
    this.setState({
      isWin: false,
      final: levels[this.state.level + 1],
      level: this.state.level + 1
    }, () => this.resetBoard());
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
      <div>
        <div className="leaderboard">
          <div className="level">
            0:4
          </div>
          <div className="level">
            1:10
          </div>
          <div className="level">
            2:12
          </div>
        </div>
        <div className="game">
          <div className="preview">
            <div className="title">
              {this.state.isWin ? (
                <div>
                  <h1>You rock!</h1>
                </div>
              ) : (
                <h1>Can you reproduce this?</h1>
              )}
            </div>
            <div className="final">
              {Array.apply(null, Array(5)).map((c, x)=>
                <div className="board-row">
                  {Array.apply(null, Array(7)).map((c, y)=>
                    <div>{this.previewSquare(x, y)}</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="data">
            {this.state.isWin ? 
              <a className="btn" onClick={() => this.nextLevel()}>Next level</a> :
              <a className="btn" onClick={() => this.resetBoard()}>Reset board</a>
            }
            <div className="box">
              <h3>score</h3>
              <p>{this.state.level}:{this.state.clicks}</p>
            </div>
            {this.state.isWin ? 
              <a className="btn" onClick={() => this.nextLevel()}>Next level</a> :
              <a className="btn" onClick={() => this.startOver()}>Start Over</a>
            }
          </div>
          <div className="game-board">
            {Array.apply(null, Array(5)).map((c, x)=>
              <div className="board-row">
                {Array.apply(null, Array(7)).map((c, y)=>
                  <Square
                    value={this.state.squares[x][y]}
                    x={x} y={y}
                    onClick={() => this.handleClick(x, y)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
