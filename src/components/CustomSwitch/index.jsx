import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@mui/base';

import classes from './styles.module.scss';

export default function CustomSwitch({
  label, checked, onChange, disabled,
}) {
  const inputId = React.useId();

  return (
    <label className={classes.label} htmlFor={inputId} style={{ whiteSpace: 'pre' }}>
      <Switch
        checked={checked}
        slotProps={{
          root: { className: classes.root },
          track: {
            className: `${classes.track} ${checked && classes.track_checked} ${disabled && classes.track_disabled}`,
          },
          thumb: {
            className: `${classes.thumb} ${checked && classes.thumb_checked} ${disabled && classes.thumb_disabled}`,
          },
          input: {
            id: inputId,
            className: classes.input,
            'aria-label': label,
            onChange,
          },
        }}
        disabled={disabled}
      />
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
