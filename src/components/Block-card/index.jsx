import React from 'react';
import './style.css';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onChange(this.props.name, this.props.id);
  }

  render() {
    return (
      <div className='card' onClick={this.handleClick}>
        {this.props.active ? <span>Card {this.props.name}</span> : null}
      </div>
    );
  }
}
