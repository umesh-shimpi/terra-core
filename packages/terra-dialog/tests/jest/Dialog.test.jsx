import React from 'react';
import Dialog from '../../src/Dialog';

describe('Dialog', () => {
  const defaultRender = <Dialog header="Header Content" footer="Footer Content">some body content</Dialog>;

  // Snapshot Test
  it('should render a default component', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper).toMatchSnapshot();
  });

  // Structure Tests
  it('should have the class dialog', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.prop('className')).toContain('dialog');
  });

  it('should render a Dialog with merged attributes', () => {
    const wrapper = shallow(<Dialog header="Header Content" footer="Footer Content" className="TestClass">some body content</Dialog>);
    expect(wrapper).toMatchSnapshot();
  });
});
