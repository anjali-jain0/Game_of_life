import React from 'react';
import './index.css';
import {MenuItem,DropdownButton} from 'react-bootstrap';

export class Button extends React.Component {
 
  handleSelect(e){
  	this.props.gridSize(e);
  }

  render() {
    return (
      <div className='center'>
      <button className='btn btn-default' onClick={this.props.playButton} > Play</button>
      <button className='btn btn-default' onClick={this.props.pauseButton} > Pause </button>
      <button className='btn btn-default' onClick={this.props.clear} > Clear</button>
      <button className='btn btn-default' onClick={this.props.slow} > Slow</button>
      <button className='btn btn-default' onClick={this.props.fast} > Fast</button>
      <button className='btn btn-default' onClick={this.props.seed} > Seed</button>
      <DropdownButton 
      title='Grid Size'
      id='Size-menu'
      onSelect={this.handleSelect.bind(this)} >
      <MenuItem eventKey='1'>20 x 10</MenuItem>
      <MenuItem eventKey='2'>50 x 30</MenuItem>
      <MenuItem eventKey='3'>70 x 50</MenuItem>
      </DropdownButton >
     
      </div>
      );
  }
};

