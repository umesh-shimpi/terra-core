/* eslint-disable */
import React from 'react';
import IconBase from '../IconBase';

const SvgIcon = (customProps) => {
  const attributes = Object.assign({}, customProps);

  return (
    <IconBase {...attributes}>
      <path fill="#868A8C" d="M20 36.4L6.7 23.1l3.5-3.5 9.8 9.8 17.7-17.8 3.5 3.5L20 36.4zM24 1C11.3 1 1 11.3 1 24s10.3 23 23 23 23-10.3 23-23S36.7 1 24 1m0-1c13.3 0 24 10.7 24 24S37.3 48 24 48 0 37.3 0 24 10.7 0 24 0z" ></path>
    </IconBase>
  );
};

SvgIcon.displayName = "IconNoRisk";
SvgIcon.defaultProps = {"viewBox":"0 0 48 48","xmlns":"http://www.w3.org/2000/svg"};

export default SvgIcon;
/* eslint-enable */
