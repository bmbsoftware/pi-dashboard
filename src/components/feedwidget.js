import React from 'react';
import request from 'superagent';
import moment from 'moment';
import { xml2js } from 'xml-js';

function FeedItem (props) {
  return (
    <a href={props.link} target="_blank">
      <li className="feeditem">
        <div className="link">{props.title}</div>
        <div className="image" style={{ backgroundImage: `url(${props.thumbnail})` }} />
      </li>
    </a>
  );
}

export default class FeedWidget extends React.Component {
  constructor(props) {
    super(props);
    this.getFeed = this.getFeed.bind(this);
    this.tick = this.tick.bind(this);
    this.state = {
      feed: [],
      title: '',
      lastFetch: null,
      nextUpdate: (moment(new Date()) + (props.delay * 1000)),
      error: ''
    };
  }

  componentDidMount() {
    this.getFeed();
    this.interval = setInterval(this.getFeed, (this.props.delay * 1000));
    this.tickInterval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.tickInterval);
  }

  tick() {
    const { lastFetch } = this.state;
    const { delay } = this.props;
    const nextUpdate = moment(lastFetch) + (delay * 1000);
    this.setState({
      nextUpdate: nextUpdate
    });
  }

  getFeed() {
    const { size, feed } = this.props;
    request
      .get(feed)
      .accept('xml')
      .end((err, res) => {
        if (err) {
          console.log(err);
          this.setState({
            feed: [],
            error: err.message,
            lastFetch: new Date()
          });
          return;
        }

        const xml = xml2js(res.text, { compact: true });
        // console.log(xml);
        const feedItems = [];
        const feedTitle = xml.rss.channel.title._text || xml.rss.channel.title._cdata;
        const items = xml.rss.channel.item;
        if (items) {
          items.map(item => {
            let thumbnail = '';
            if (item.enclosure) {
              thumbnail = item.enclosure._attributes.url;
            } else if (item['media:thumbnail']) {
              let media = item['media:thumbnail'];
              if (media.constructor === Array){
                media = media[0];
              }
              // console.log(media);
              if (media._attributes) {
                thumbnail = media._attributes.url;
              }
            } else if (item['content:encoded']) {
              let media = item['content:encoded'];
              thumbnail = media[1]._cdata;
            } else if (item['media:content']) {
              let media = item['media:content'];
              thumbnail = media._attributes.url;
            } else {
              console.log(item);
            }
            feedItems.push({
              title: item.title._text || item.title._cdata,
              link: item.link._text || item.link._cdata,
              thumbnail: thumbnail
            });
          });
        }
        this.setState({
          feed: feedItems.slice(0, size),
          title: feedTitle,
          lastFetch: new Date()
        });
      });
  }

  feedRef = (c) => (this.feed = c);

  render() {
    const { feed, title, nextUpdate, error } = this.state;
    const feedItems = feed.map((item, index) => (
      <FeedItem {...item} key={index} />
    ));

    let nextUpdateIn = '';
    if (nextUpdate) {
      const updateIn = moment(nextUpdate) - moment(new Date());
      nextUpdateIn = moment(updateIn).format('mm:ss');
    }

    return (
      <div className="feedwidget widget">
        <div className="widget-content">
          <h2 ref={this.feedRef}>
            <a href={this.props.feed} target="_blank">{title}</a><br />
            <small>Next Update: {nextUpdateIn}</small>
          </h2>
          <div style={{ color: 'red' }}>{error}</div>
          <ul>
            {feedItems}
          </ul>
        </div>
      </div>
    );
  }
}
