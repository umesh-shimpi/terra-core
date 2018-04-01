import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import styles from './Spacer.scss';

const cx = classNames.bind(styles);

const SpacerSizes = {
  NONE: 'none',
  'SMALL-1': 'small-1',
  'SMALL-2': 'small-2',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  'LARGE+1': 'large+1',
  'LARGE+2': 'large+2',
  'LARGE+3': 'large+3',
  'LARGE+4': 'large+4',
};

const SHORTHAND_DELIMITER = ' ';

const mapShorthandToObject = (propName = '', propVal = []) => {
  const shValues = propVal.split(SHORTHAND_DELIMITER);
  switch (shValues.length) {
    case 1:
      return {
        [`${propName}Top`]: shValues[0],
        [`${propName}Right`]: shValues[0],
        [`${propName}Bottom`]: shValues[0],
        [`${propName}Left`]: shValues[0],
      };
    case 2:
      return {
        [`${propName}Top`]: shValues[0],
        [`${propName}Right`]: shValues[1],
        [`${propName}Bottom`]: shValues[0],
        [`${propName}Left`]: shValues[1],
      };
    case 3:
      return {
        [`${propName}Top`]: shValues[0],
        [`${propName}Right`]: shValues[1],
        [`${propName}Bottom`]: shValues[2],
        [`${propName}Left`]: shValues[1],
      };
    case 4:
      return {
        [`${propName}Top`]: shValues[0],
        [`${propName}Right`]: shValues[1],
        [`${propName}Bottom`]: shValues[2],
        [`${propName}Left`]: shValues[3],
      };
    default:
      return {};
  }
};

const shorthandValidator = (props, propName, componentName) => {
  const shLengthBoundaries = { min: 1, max: 4 };
  const propVal = props[propName];
  const conflictingPropName = (() => (
    ((propVal !== SpacerSizes.NONE) && (props[`${propName}Top`] !== SpacerSizes.NONE) ? `${propName}Top` : undefined) ||
    ((propVal !== SpacerSizes.NONE) && (props[`${propName}Right`] !== SpacerSizes.NONE) ? `${propName}Right` : undefined) ||
    ((propVal !== SpacerSizes.NONE) && (props[`${propName}Bottom`] !== SpacerSizes.NONE) ? `${propName}Bottom` : undefined) ||
    ((propVal !== SpacerSizes.NONE) && (props[`${propName}Left`] !== SpacerSizes.NONE) ? `${propName}Left` : undefined)
  ))();

  if (conflictingPropName) {
    return new Error(`Expected only ${propName} or ${conflictingPropName} to be supplied to ${componentName} but both were provided. Validation failed.`);
  }

  const shValues = propVal.split(SHORTHAND_DELIMITER);
  const shValueCountValid = shValues && shValues.length >= shLengthBoundaries.min && shValues.length <= shLengthBoundaries.max;

  if (!shValueCountValid) {
    return new Error(`Invalid number of argument substrings provided to ${propName} in ${componentName}. Expected ${shLengthBoundaries.min}-${shLengthBoundaries.max}. Received ${shValues.length}`);
  }

  const invalidShValues = (() => {
    const sizes = Object.values(SpacerSizes);
    const invalidValues = shValues.filter(val => sizes.indexOf(val) === -1);
    return invalidValues.length > 0 ? invalidValues : null;
  })();

  if (invalidShValues) {
    return new Error(`Expected ${propName} shorthand values to be one of ${Object.values(SpacerSizes)} but "${invalidShValues}" supplied to ${componentName}.`);
  }

  return null;
};

const propTypes = {
  /**
   * Child Nodes.
   */
  children: PropTypes.node.isRequired,
  /**
   * Sets top margin. One of 'none', 'small-2', 'small-1', 'small', 'medium', 'large', 'large+1', 'large+2', 'large+3', 'large+4'.
   */
  marginTop: PropTypes.oneOf(Object.values(SpacerSizes)),
  /**
   * Sets bottom margin. One of 'none', 'small-2', 'small-1', 'small', 'medium', 'large', 'large+1', 'large+2', 'large+3', 'large+4'.
   */
  marginBottom: PropTypes.oneOf(Object.values(SpacerSizes)),
  /**
   * Sets left margin One of 'none', 'small-2', 'small-1', 'small', 'medium', 'large', 'large+1', 'large+2', 'large+3', 'large+4'.
   */
  marginLeft: PropTypes.oneOf(Object.values(SpacerSizes)),
  /**
   * Sets right margin. One of 'none', 'small-2', 'small-1', 'small', 'medium', 'large', 'large+1', 'large+2', 'large+3', 'large+4'.
   */
  marginRight: PropTypes.oneOf(Object.values(SpacerSizes)),
  /**
   * Sets top padding. One of 'none', 'small-2', 'small-1', 'small', 'medium', 'large', 'large+1', 'large+2', 'large+3', 'large+4'.
   */
  paddingTop: PropTypes.oneOf(Object.values(SpacerSizes)),
  /**
   * Sets bottom padding. One of 'none', 'small-2', 'small-1', 'small', 'medium', 'large', 'large+1', 'large+2', 'large+3', 'large+4'.
   */
  paddingBottom: PropTypes.oneOf(Object.values(SpacerSizes)),
  /**
   * Sets left padding. One of 'none', 'small-2', 'small-1', 'small', 'medium', 'large', 'large+1', 'large+2', 'large+3', 'large+4'.
   */
  paddingLeft: PropTypes.oneOf(Object.values(SpacerSizes)),
  /**
   * Sets right padding. One of 'none', 'small-2', 'small-1', 'small', 'medium', 'large', 'large+1', 'large+2', 'large+3', 'large+4'.
   */
  paddingRight: PropTypes.oneOf(Object.values(SpacerSizes)),
  /**
   * Sets the display to be inline-block.
   */
  isInlineBlock: PropTypes.bool,
  /**
   * Sets margin in a syntax similar to the standard CSS spec https://developer.mozilla.org/en-US/docs/Web/CSS/margin. One of 'none', 'small-2', 'small-1', 'small', 'medium', 'large', 'large+1', 'large+2', 'large+3', 'large+4'.
   */
  margin: shorthandValidator,
  /**
   * Sets padding in a syntax similar to the standard CSS spec https://developer.mozilla.org/en-US/docs/Web/CSS/padding. One of 'none', 'small-2', 'small-1', 'small', 'medium', 'large', 'large+1', 'large+2', 'large+3', 'large+4'.
   */
  padding: shorthandValidator,
};

const defaultProps = {
  margin: SpacerSizes.NONE,
  marginTop: SpacerSizes.NONE,
  marginBottom: SpacerSizes.NONE,
  marginRight: SpacerSizes.NONE,
  marginLeft: SpacerSizes.NONE,
  padding: SpacerSizes.NONE,
  paddingTop: SpacerSizes.NONE,
  paddingBottom: SpacerSizes.NONE,
  paddingLeft: SpacerSizes.NONE,
  paddingRight: SpacerSizes.NONE,
  isInlineBlock: false,
};

const Spacer = ({
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  isInlineBlock,
  children,
  ...customProps
}) => {
  const spacingSizes = {
    [SpacerSizes.NONE]: 'none',
    [SpacerSizes['SMALL-1']]: 'small-minus-1',
    [SpacerSizes['SMALL-2']]: 'small-minus-2',
    [SpacerSizes.SMALL]: 'small',
    [SpacerSizes.MEDIUM]: 'medium',
    [SpacerSizes.LARGE]: 'large',
    [SpacerSizes['LARGE+1']]: 'large-plus-1',
    [SpacerSizes['LARGE+2']]: 'large-plus-2',
    [SpacerSizes['LARGE+3']]: 'large-plus-3',
    [SpacerSizes['LARGE+4']]: 'large-plus-4',
  };

  const marginShorthand = mapShorthandToObject('margin', margin);
  const paddingShorthand = mapShorthandToObject('padding', padding);

  const marginAttributes = {
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    ...marginShorthand,
  };

  const paddingAttributes = {
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    ...paddingShorthand,
  };

  const SpacerClassNames = cx([
    'spacer',
    `margin-top-${spacingSizes[marginAttributes.marginTop]}`,
    `margin-bottom-${spacingSizes[marginAttributes.marginBottom]}`,
    `margin-left-${spacingSizes[marginAttributes.marginLeft]}`,
    `margin-right-${spacingSizes[marginAttributes.marginRight]}`,
    `padding-top-${spacingSizes[paddingAttributes.paddingTop]}`,
    `padding-bottom-${spacingSizes[paddingAttributes.paddingBottom]}`,
    `padding-left-${spacingSizes[paddingAttributes.paddingLeft]}`,
    `padding-right-${spacingSizes[paddingAttributes.paddingRight]}`,
    { 'is-inline-block': isInlineBlock },
    customProps.className,
  ]);

  return <div {...customProps} className={SpacerClassNames}>{children}</div>;
};

Spacer.Opts = {};
Spacer.Opts.Sizes = SpacerSizes;
Spacer.propTypes = propTypes;
Spacer.defaultProps = defaultProps;

export default Spacer;
