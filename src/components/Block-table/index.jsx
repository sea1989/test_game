import React from 'react';
import './style.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Card from '../Block-card';
import dayjs from 'dayjs';
import CanvasComponent from '../canvas';

let date1;
let date2;

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

let isArrayNull = (item) => {
  console.log('test');
  if (item === null) return true;
};

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStart: null,
      timeFinish: null,
      result: null,
      result2: 79,
      data: [],
      cardName: null,
      cardId: null,
      card2Id: null,
      unlocked: false,
      timerId: null,
    };
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

  finish(array) {
    if (array.length === 20 && array.every(isArrayNull)) {
      date2 = dayjs();

      this.setState({
        result: date2.diff(date1, 's'),
      });

      return this.state.result;
    }
  }

  changeCard = (name, id) => {
    const timerId = setTimeout(
      () =>
        this.setState({
          cardName: null,
          cardId: null,
        }),
      5000
    );

    if (this.state.cardName === null) {
      this.setState({
        cardName: name,
        cardId: id,
        timerId,
      });
    } else if (this.state.cardName === name && this.state.cardId !== id) {
      if (this.state.timerId) {
        clearTimeout(this.state.timerId);
      }

      this.setState({
        card2Id: id,
      });

      setTimeout(
        () =>
          this.setState({
            data: this.state.data.map((item) =>
              item?.name === name ? null : item
            ),
            cardName: null,
            cardId: null,
          }),
        1000
      );

      setTimeout(() => this.finish(this.state.data), 2000);
    } else {
      if (this.state.timerId) {
        clearTimeout(this.state.timerId);
      }

      this.setState({
        card2Id: id,
      });

      setTimeout(
        () =>
          this.setState({
            cardName: null,
            card2Id: null,
            cardId: null,
          }),
        1000
      );
    }
  };

  handleButton = () => {
    this.setState({
      unlocked: true,
      timeStart: dayjs(),
    });

    date1 = dayjs();

    console.log(date1);
  };

  render() {
    return (
      <React.Fragment>
        <section className='table'>
          <button onClick={this.handleButton} className='button'>
            Играаааааааать)
          </button>
          <table id='table'>
            <tbody>
              <tr className={this.state.unlocked ? '' : 'locked'}>
                {this.state.data.map((item, index) => (
                  <td key={index}>
                    {item && (
                      <Card
                        active={
                          item.id === this.state.cardId ||
                          item.id === this.state.card2Id
                        }
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

        {this.state.result !== null ? (
          <section className='modal'>
            <CanvasComponent result={this.state.result} />
          </section>
        ) : (
          ''
        )}
      </React.Fragment>
    );
  }
}
