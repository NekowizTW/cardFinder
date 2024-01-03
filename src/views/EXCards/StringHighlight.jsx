import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a string with highlighted tokens.
 * @param {string} input - The input string to highlight.
 * @param {string[]} tokens - An array of tokens to highlight.
 * @returns {JSX.Element} A React component that renders the highlighted string.
 */
export default function StringHighlight({ input, tokens }) {
  if (!tokens.length) return input;

  try {
    const markedArr = tokens
      .reduce((acc, token) => {
        const start = input.indexOf(token);

        acc.fill(true, start, start + token.length);
        return acc;
      }, new Array(input.length).fill(false));

    const groups = markedArr
      .reduce((acc, _, idx) => {
        const prevGroup = acc[acc.length - 1];
        const isSameValue = !prevGroup || markedArr[prevGroup[0]] === idx;
        return isSameValue
          ? [...acc.slice(0, -1), [...(prevGroup || []), idx]]
          : [...acc, [idx]];
      }, []);

    return (
      <>
        {groups.map((group) => (
          <span className={markedArr[group[0]] ? 'highlight' : ''}>
            {group.map((idx) => input[idx])}
          </span>
        ))}
      </>
    );
  } catch (e) {
    return input;
  }
}

StringHighlight.propTypes = {
  input: PropTypes.string.isRequired,
  tokens: PropTypes.arrayOf(PropTypes.string).isRequired,
};
