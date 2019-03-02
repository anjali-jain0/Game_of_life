import React from 'react';
import './index.css';

export class Box extends React.Component {
  
  selectBox(){
    this.props.selectBox(this.props.row,this.props.col);
  }
  
  render() {
    return (
      <div className={this.props.boxClass} onClick={this.selectBox.bind(this)} >
      </div>
      );
  }
};

