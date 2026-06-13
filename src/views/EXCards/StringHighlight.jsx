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

  let markedArr = [];
  let groups = [];
  let hasError = false;

  try {
    markedArr = new Array(input.length).fill(false);

    tokens.forEach((token) => {
      const start = input.indexOf(token);
      if (start !== -1) {
        markedArr.fill(true, start, start + token.length);
      }
    });

    groups = markedArr.reduce((acc, _, idx) => {
      if (acc.length === 0) {
        acc.push([idx]);
        return acc;
      }

      const prevGroup = acc[acc.length - 1];
      const isSameValue = markedArr[prevGroup[0]] === markedArr[idx];

      if (isSameValue) {
        prevGroup.push(idx);
      } else {
        acc.push([idx]);
      }
      return acc;
    }, []);
  } catch {
    hasError = true;
  }

  if (hasError) return input;

  return (
    <React.Fragment>
      {groups.map((group, groupIdx) => {
        const isHighlighted = markedArr[group[0]];
        const content = group.map((idx) => input[idx]).join('');

        return (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={groupIdx}
            className={isHighlighted ? 'highlight' : ''}
          >
            {content}
          </span>
        );
      })}
    </React.Fragment>
  );
}

StringHighlight.propTypes = {
  input: PropTypes.string.isRequired,
  tokens: PropTypes.arrayOf(PropTypes.string).isRequired,
};
