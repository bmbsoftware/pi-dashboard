import React from 'react';
import moment from 'moment';

export default class ClockWidget extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = {
      time: props.time || moment()
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWilUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({
      time: moment()
    });
  }

  render() {
    const time = moment(this.state.time).format('dddd, Do MMMM YYYY, h:mm:ss a');
    return (
      <div className="clockwidget widget">
        <div className="widget-content">
          <h2 ref="time">{time}</h2>
        </div>
      </div>
    );
  }
}
