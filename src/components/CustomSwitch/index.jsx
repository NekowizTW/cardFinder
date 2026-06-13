import React from 'react';

import { Switch } from '@mui/base';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import classes from './styles.module.scss';

export default function CustomSwitch({
  label, checked, onChange, disabled,
}) {
  const inputId = React.useId();

  return (
    <label className={classes.label} htmlFor={inputId} style={{ whiteSpace: 'pre' }}>
      <Switch
        checked={checked}
        disabled={disabled}
        slotProps={{
          root: { className: classes.root },
          track: {
            className: clsx(classes.track, {
              [classes.track_checked]: checked,
              [classes.track_disabled]: disabled,
            }),
          },
          thumb: {
            className: clsx(classes.thumb, {
              [classes.thumb_checked]: checked,
              [classes.thumb_disabled]: disabled,
            }),
          },
          input: {
            id: inputId,
            className: classes.input,
            'aria-label': label,
            onChange,
          },
        }}
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
