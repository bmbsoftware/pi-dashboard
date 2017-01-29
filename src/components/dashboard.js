import React from 'react';
import ClockWidget from './clockwidget';
import FeedWidget from './feedwidget';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <h1 ref="title">{this.props.title}</h1>
        <div className="wrapper">
          <ClockWidget />
          <FeedWidget feed="https://news.google.com/?output=rss" size={12} delay={1200} />
          <FeedWidget feed="http://feeds.bbci.co.uk/news/rss.xml?edition=uk" size={5} delay={150} />
          <FeedWidget feed="https://www.merkur.de/welt/rssfeed.rdf" size={25} delay={120} />
          <FeedWidget feed="http://feeds.feedburner.com/TechCrunch/" size={15} delay={800} />
          <FeedWidget feed="http://rss.nytimes.com/services/xml/rss/nyt/Europe.xml" size={15} delay={1800} />
          <FeedWidget feed="http://feeds.feedburner.com/Mashable?format=xml" size={10} delay={240} />
          <FeedWidget feed="http://feeds.lifehack.org/Lifehack" size={10} delay={300} />
        </div>
      </div>
    );
  }
}
