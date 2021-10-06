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
    this.state = { data: [], cardName: null, cardId: null };
  }

  componentDidMount() {
    axios.get('https://swapi.dev/api/people').then((response) => {
      this.setState({
        data: shuffle(
          response.data.results
            .slice(0, 10)
            .concat(response.data.results.slice(0, 10))
            .map((element) => {
              let newElement = { ...element };
              newElement.id = uuidv4();
              return newElement;
            })
        ),
      });
    });
  }

  changeCard = (name, id) => {
    if (this.state.cardName === null) {
      this.setState({
        cardName: name,
        cardId: id,
      });
    } else if (this.state.cardName === name && this.state.cardId !== id) {
      this.setState({
        data: setTimeout(
          this.state.data.map((item) => (item?.name === name ? null : item)),
          1000
        ),
        cardName: null,
        cardId: null,
      });
    } else {
      this.setState({
        cardName: null,
        cardId: null,
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
                <td key={index}>
                  {item && (
                    <Card
                      active={item.id === this.state.cardId}
                      onChange={this.changeCard}
                      {...item}
                    />
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}
