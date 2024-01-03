import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@mui/base';

import './styles.scss';

export default function CustomSwitch({
  label, checked, onChange, disabled,
}) {
  const inputId = React.useId();

  return (
    <label className="customSwitchLabel" htmlFor={inputId} style={{ whiteSpace: 'pre' }}>
      <Switch
        checked={checked}
        slotProps={{
          input: {
            id: inputId, 'aria-label': label, onChange,
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
