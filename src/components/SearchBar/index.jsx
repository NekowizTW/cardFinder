import React from 'react';

import PropTypes from 'prop-types';

export default function SearchBar({
  defaultValue, onSearch, placeholder, disabled, style,
}) {
  const [inputValue, setInputValue] = React.useState(defaultValue);

  const timeoutRef = React.useRef(null);

  const debouncedSearch = React.useCallback((value) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 750);
  }, [onSearch]);

  React.useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleChange = React.useCallback((e) => {
    setInputValue(e.target.value);
    debouncedSearch(e.target.value);
  }, [debouncedSearch]);

  return (
    <input
      disabled={disabled}
      onChange={handleChange}
      placeholder={placeholder}
      style={style}
      type="text"
      value={inputValue}
    />
  );
}

SearchBar.propTypes = {
  defaultValue: PropTypes.string,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

SearchBar.defaultProps = {
  defaultValue: '',
  onSearch: () => {},
  placeholder: '',
  disabled: false,
  style: {},
};
