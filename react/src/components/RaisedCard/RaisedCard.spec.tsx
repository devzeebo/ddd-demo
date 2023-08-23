import React from 'react';
import test from 'jest-gwt';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import RaisedCard from './RaisedCard';

describe('components > RaisedCard', () => {
  test('renders', {
    given: {},
    when: {
      component_renders,
    },
    then: {
      component_name_displayed,
    },
  });
});

type Context = {
};

function component_renders(this: Context) {
  render(<RaisedCard />);
}

function component_name_displayed(this: Context) {
  expect(screen.queryByText('RaisedCard Component')).toBeVisible();
}
