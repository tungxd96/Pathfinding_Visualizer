import React, { Component } from 'react';
import './styles/App.css';
import './styles/illustration.css';
import './styles/fyi.css';
import NavigationBar from './components/NavigationBar';
import { ROW, COL } from './config/Constant';
import Board from './pages/Board';
import Node from './objects/Node';
import { setInitialNodes } from './algorithms/Helper/AlgorithmHelper';

class App extends Component {
  constructor(props) {
    super(props);

    this.setNode = this.setNode.bind(this);

    this.state = {
      grid: [],
      startNode: null,
      endNode: null,
    }
  }

  initGrid() {
    let grid = [];
    for (var i = 0; i < ROW; i++) {
      for (var j = 0; j < COL; j++) {
        if (!grid[i]) {
          grid.push([])
        }
        const node = new Node();
        node.setPosition(i, j);
        grid[i].push(node);
      }
    }
    return grid;
  }

  componentDidMount() {
    const grid = this.initGrid();
    
    const initialNodes = setInitialNodes(grid);

    this.setState({
      grid: grid,
      startNode: initialNodes.startNode,
      endNode: initialNodes.endNode,
      isVisualizing: false,
    });
  }

  setNode(node) {
    if (node.start) {
      this.setState({
        startNode: node
      });
    }
    if (node.end) {
      this.setState({
        endNode: node
      });
    }
  }

  render() {
    return (
      <div className="App">
        <NavigationBar
          grid={this.state.grid}
          startNode={this.state.startNode}
          endNode={this.state.endNode}
        />
        <Board
          grid={this.state.grid}
          startNode={this.state.startNode}
          endNode={this.state.endNode}
          setNode={this.setNode}
        />
      </div>
    );
  }
}

export default App;
