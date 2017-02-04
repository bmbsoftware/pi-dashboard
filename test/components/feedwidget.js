import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { findDOMNode } from 'react-dom';
import FeedWidget from '../../src/components/feedwidget';
import { expect } from 'chai';

const { renderIntoDocument } = TestUtils;

describe('Feed Widget', () => {
  const url = 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk';
  const delay = 60;
  const size = 5;
  let component;
  beforeEach(() => {
    component = renderIntoDocument(
      <FeedWidget feed={url} size={size} delay={delay} />
    );
  });

  afterEach(() => {
    component.componentWillUnmount();
  });

  it('renders the Feed Widget', () => {
    const feed = findDOMNode(component.feed);
    expect(feed).to.be.ok;

    const feedLink = feed.querySelectorAll('a');
    expect(feedLink.length).to.be.above(0);
  });

  it('contains default state', () => {
    expect(component.state).to.be.ok;
    expect(component.state.feed).to.be.empty;
    expect(component.state.lastFetch).to.be.null;
    expect(component.state.title).to.equal('');
  });

  it('sets up interval with expected delay', () => {
    expect(component.interval).to.be.ok;
    expect(component.interval._idleTimeout).to.equal(delay * 1000);
    expect(component.interval._called).to.be.false;
    setTimeout(() => {
      expect(component.interval._called).to.be.true;
    }, delay * 1000);
  });
});
