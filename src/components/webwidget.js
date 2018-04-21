import React from 'react';
import request from 'superagent';

export default class WebWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Loading...',
      result: null
    };
  }
  componentWillMount() {
    request
    .get(this.props.url)
    .end((err, res) => {
      if (err){
        this.setState({
          status: err.message,
          result: null
        });
      } else if (res.type === 'application/json') {
        this.setState({
          status: res.statusText,
          result: res.body
        });
      } else {
        this.setState({
          status: res.text,
          result: null
        });
      }
    });
  }

  render() {
    return (
      <div className="webwidget widget">
        <h2>{this.props.title}</h2>
        <div className="content">
          Status: {this.state.status}
          { this.state.result &&
            <ul>
              {
                Object.keys(this.state.result).map(key => (
                  <li key={key}>{key}: {this.state.result[key]}</li>
                ))
              }
            </ul>
          }
        </div>
      </div>
    );
  }
}
