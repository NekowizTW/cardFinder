import React from 'react';
import PropTypes from 'prop-types';

function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export default function SearchBar({
  defaultValue, onSearch, placeholder, disabled, style,
}) {
  const [inputValue, setInputValue] = React.useState(defaultValue);

  const debouncedSearch = React.useMemo(() => debounce(onSearch, 750), [onSearch]);

  const handleChange = React.useCallback((e) => {
    setInputValue(e.target.value);
    debouncedSearch(e.target.value);
  }, [debouncedSearch]);

  React.useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      style={style}
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
