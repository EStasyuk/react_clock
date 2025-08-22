import React from 'react';
import './App.scss';
import { event } from 'cypress/types/jquery';
import { Clock } from './Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

interface Props {
  name: string;
}

interface State {
  hasClock: boolean;
  clockName: string;
}

export class App extends React.Component<Props, State> {
  private timerId?: number;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasClock: false,
      clockName: 'Clock-0',
    };
  }

  state: State = { hasClock: false, clockName: 'Clock-0' };

  handleShowClock = () => {
    this.setState({ hasClock: true });
  };

  handleHideClock = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  componentDidMount() {
    document.addEventListener('click', this.handleShowClock);
    document.addEventListener('contextmenu', this.handleHideClock);
    this.timerId = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleShowClock);
    document.removeEventListener('contextmenu', this.handleHideClock);
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>
        <div className="App">
          {this.state.hasClock ? <Clock name={this.state.clockName} /> : null}
        </div>

        <div className="Clock">
          <strong className="Clock__name">{this.props.name}</strong>
        </div>
      </div>
    );
  }
}
