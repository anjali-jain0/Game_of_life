import React from 'react';
import {Grid} from './grid';
import './index.css';
import {Button} from './button';

class App extends React.Component {

  constructor(){
    super();
    this.speed=100;
    this.rows=30;
    this.cols=50;

    this.state={
      generation:0,
      gridFull:Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }
  
  selectBox(row,col){
    var gridCopy=this.state.gridFull;
    gridCopy[row][col]= !gridCopy[row][col];
    this.setState({gridFull:gridCopy});
  }
  
  seed(){
      var gridCopy=this.state.gridFull;
      for(var i=0;i<this.rows;i++){
        for(var j=0;j<this.cols;j++){
          if(Math.floor(Math.random()*18)===1){
            gridCopy[i][j]=true;
          }
        }
      }
      this.setState({gridFull:gridCopy});
  }
  
  playButton(){
    this.intervalId=setInterval(this.play.bind(this),this.speed);
  }
  
  pauseButton(){
     clearInterval(this.intervalId);
  }

  play(){
    var g=this.state.gridFull;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g[i][j] = false;
        if (!g[i][j] && count === 3) g[i][j] = true;
      }
    }

    this.setState({gridFull:g,generation:this.state.generation+1});

  }

  slow(){
    this.speed=1000;
    this.playButton();
  }
  
  fast(){
    this.speed=100;
    this.playButton();
  }

  clear(){
    this.setState({generation:0,gridFull:Array(this.rows).fill().map(() => Array(this.cols).fill(false))});
  }

  gridSize(size){
    if(size===1){
      this.cols=20;
      this.rows=10;
    }
    else if(size===2){
      this.cols=50;
      this.rows=30;
    }
    else {
      this.cols=70;
      this.rows=30;
    }
    this.clear();
  }

  componentWillMount(){
    this.seed();
  }
  render() {
    return (
      <React.Fragment>
      <h1>The Game Of Life</h1>
      <Button 
      playButton={this.playButton.bind(this)}
      pauseButton={this.pauseButton.bind(this)}
      slow={this.slow.bind(this)}
      fast={this.fast.bind(this)}
      clear={this.clear.bind(this)}
      seed={this.seed.bind(this)}
      gridSize={this.gridSize.bind(this)} />

      <Grid gridFull={this.state.gridFull} rows={this.rows} cols={this.cols} selectBox={this.selectBox.bind(this)} />
      <h2> Generations:{this.state.generation} </h2>
      </React.Fragment>
      );
  }
}

export default App;
