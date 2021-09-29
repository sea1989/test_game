import React from 'react';
import './style.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Card from '../Block-card';

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], card1: null };
    this.changeCard = this.changeCard.bind(this);
  }

  componentDidMount() {
    axios.get('https://swapi.dev/api/people').then((response) => {
      this.setState({
        data: shuffle(
          response.data.results
            .slice(0, 10)
            .concat(response.data.results.slice(0, 10))
        ),
      });
    });
  }

  changeCard = (x) => {
    if (this.state.card1 === null) {
      this.setState({
        card1: x,
      });
    } else if (this.state.card1 === x) {
      this.setState({
        data: this.state.data.map((item) => (item.name === x ? null : item)),
      });
    }
  };

  render() {
    return (
      <section className='table'>
        <table id='table'>
          <tbody>
            <tr>
              {this.state.data.map((item, index) => (
                <td key={uuidv4()}>
                  {item && <Card onChange={this.changeCard} {...item} />}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}
