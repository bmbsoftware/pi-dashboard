import React from 'react';
import ClockWidget from './clockwidget';
import FeedWidget from './feedwidget';

export default class Dashboard extends React.Component {
  titleRef = (c) => (this.title = c);

  render() {
    return (
      <div className="dashboard">
        <h1 ref={this.titleRef}>{this.props.title}</h1>
        <div className="wrapper">
          <ClockWidget />
          <FeedWidget feed="/api/google/news/?output=rss" size={12} delay={3600} />
          <FeedWidget feed="/api/bbc/rss.xml?edition=uk" size={5} delay={900} />
          <FeedWidget feed="/api/merkur/rssfeed.rdf" size={25} delay={300} />
          <FeedWidget feed="/api/TechCrunch/" size={15} delay={800} />
          <FeedWidget feed="/api/nytimes/Europe.xml" size={15} delay={1800} />
          <FeedWidget feed="/api/mshbl/?format=xml" size={10} delay={300} />
          <FeedWidget feed="/api/lfhack/" size={10} delay={300} />
        </div>
      </div>
    );
  }
}
