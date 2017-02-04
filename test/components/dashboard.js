import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { findDOMNode } from 'react-dom';
import { expect } from 'chai';

import Dashboard from '../../src/components/dashboard';

const { renderIntoDocument /*, scryRenderedDOMComponentsWithClass, Simulate*/ } = TestUtils;

describe('Dashboard', () => {
  let component;
  beforeEach(() => {
    component = renderIntoDocument(
      <Dashboard title="My Dashboard" />
    );
  });
  afterEach(() => {
    // component.componentWilUnmount();
  });
  it('renders the Dashboard', () => {
    const title = findDOMNode(component.title);
    expect(title).to.be.ok;
    expect(title.textContent).to.contain('My Dashboard');
  });
});
