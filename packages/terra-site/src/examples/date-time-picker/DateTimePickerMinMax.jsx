import React from 'react';
import moment from 'moment';
import DateTimePickerExampleTemplate from './DateTimePickerExampleTemplate';

const DateTimePickerExample = () => (
  <DateTimePickerExampleTemplate
    minDateTime={moment().format()}
    maxDateTime={moment().add(6, 'days').format()}
  />
);

export default DateTimePickerExample;
