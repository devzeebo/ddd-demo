import React from 'react';
import test from 'jest-gwt';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import GroupColumn from './GroupColumn';

describe('components > GroupColumn', () => {
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
  render(<GroupColumn />);
}

function component_name_displayed(this: Context) {
  expect(screen.queryByText('GroupColumn Component')).toBeVisible();
}
