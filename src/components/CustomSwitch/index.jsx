import React from 'react';

import { Root, Thumb } from '@radix-ui/react-switch';
import PropTypes from 'prop-types';

import classes from './styles.module.scss';

/**
 * CustomSwitch - Built on top of Radix UI Switch Primitive
 * @component
 * @param {Object} props
 * @param {string} props.label
 * @param {boolean} props.checked
 * @param {import('@radix-ui/react-switch').SwitchProps['onCheckedChange']} props.onChange
 * @param {boolean} [props.disabled=false]
 */
export default function CustomSwitch({
  label, checked, onChange, disabled,
}) {
  return (
    <label className={classes.label} style={{ whiteSpace: 'pre' }}>
      <Root
        checked={checked}
        className={classes.root}
        disabled={disabled}
        onCheckedChange={onChange}
      >
        <Thumb className={classes.thumb} />
      </Root>
      {label}
    </label>
  );
}

CustomSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

CustomSwitch.defaultProps = {
  disabled: false,
};
