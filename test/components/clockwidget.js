import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { findDOMNode } from 'react-dom';
import ClockWidget from '../../src/components/clockwidget';
import { expect } from 'chai';

const { renderIntoDocument } = TestUtils;

describe('Clock Widget', () => {
  let component;
  const currentTime = 1465160300530;
  beforeEach(() => {
    component = renderIntoDocument(
      <ClockWidget time={currentTime} />
    );
  });

  afterEach(() => {
    component.componentWilUnmount();
    expect(component.interval._repeat).to.be.null;
  });

  it('renders the clock widget', () => {
    const time = findDOMNode(component.time);
    expect(time).to.be.ok;
    expect(time.textContent).to.contain('Sunday');
  });

  it('registers the tick command to run on an interval', () => {
    const interval = component.interval;
    expect(interval).to.be.ok;
    expect(interval._idleTimeout).to.equal(1000);
    expect(interval._called).to.be.false;

    setTimeout(() => {
      expect(interval._called).to.be.true;
    }, 1000);
  });

  it('sets the state time to current time on tick command', () => {
    expect(component.state).to.be.ok;
    expect(component.state.time).to.equal(currentTime);

    component.tick();
    expect(component.state.time).to.not.equal(currentTime);
  });
});
