import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Timer extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
      this.running = false
      this.history = []
    }
    componentWillUnmount () {
      clearInterval(this.timer)
    }
    tick () {
      this.setState({seconds: (this.state.seconds + 0.1)})
      if (this.state.seconds > 59.1){
        this.setState({
          minutes: (this.state.minutes + 1), 
          seconds: 0})
      }
      if (this.state.minutes > 59){
        this.setState({
          hours: (this.state.hours + 1),
          minutes: 0})
      }
    }
    startTimer () {
      clearInterval(this.timer)
      this.timer = setInterval(this.tick.bind(this), 100)
      this.running = !this.running
    }

    addSplits () {
        const history = this.history
        history.push(this.state);
    }

    handleClick () {
        this.running ? this.addSplits() : this.startTimer()
    }

    jumpTo (split) {
      this.setState({
        hours: split.hours,
        minutes: split.minutes,
        seconds: split.seconds
      });
      while (this.history.length > 0) {
        let last = this.history.pop();
        if (last === split){
          this.history.push(last);
          break;
        }
      }
    }

    leadingZero (number) {
      return number < 10 ? '0' + number : number;
    }

    render () {
      const splits = this.history;
      const splitItems = splits.map((split) =>
        <li key = {split.hours + split.minutes + split.seconds}> 
        <button onClick={() => this.jumpTo(split)}>
        {this.leadingZero(split.hours.toFixed(0))}
        :{this.leadingZero(split.minutes.toFixed(0))}
        :{this.leadingZero(split.seconds.toFixed(0))}
        </button>
        </li>
      );

      return (
        <div className='App'>
        <div className='timer' onClick={this.handleClick.bind(this)}>
          <h1>{this.leadingZero(this.state.hours.toFixed(0))}
            :{this.leadingZero(this.state.minutes.toFixed(0))}
            :{this.leadingZero(this.state.seconds.toFixed(0))}</h1>
        </div>
        <div className='splits'>
          <ul>{splitItems}</ul>
        </div>
        </div>
      );
    }
  }

  
  ReactDOM.render(
    <Timer />,
    document.getElementById('root')
  )