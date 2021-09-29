import React from 'react';
import './style.css';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(
      (prevState) => ({ isToggleOn: !prevState.isToggleOn }),
      () => {
        this.props.onChange(this.props.name);
      }
    );
  }

  render() {
    return (
      <div
        onClick={this.handleClick}
        className={this.state.isToggleOn ? 'ON' : 'OFF'}
      >
        Card {this.props.name}
      </div>
    );
  }
}
