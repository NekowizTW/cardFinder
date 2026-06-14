import React from 'react';

import {
  Content,
  List,
  Root,
  Trigger,
} from '@radix-ui/react-tabs';
import PropTypes from 'prop-types';

/**
 * CustomTabs - Built on top of Radix UI Tabs Primitive, fully styled with Pure CSS classes.
 * @component
 * @param {Object} props
 * @param {Array} props.tabs
 * @param {string} [props.defaultKey='']
 */
export default function CustomTabs({ tabs, defaultKey }) {
  const [tabKey, setTabKey] = React.useState(defaultKey);

  return (
    <Root onValueChange={setTabKey} value={tabKey}>
      <List className="pure-menu pure-menu-horizontal pure-menu-scrollable">
        <ul className="pure-menu-list">
          {tabs.map(({ key, label }) => {
            const isSelected = tabKey === key;

            return (
              <Trigger key={key} asChild value={key}>
                <li
                  className={`pure-menu-item ${isSelected ? 'pure-menu-selected' : ''}`}
                  style={{
                    backgroundColor: isSelected ? '#eee' : 'inherit',
                    cursor: 'pointer', // 確保使用者知道可以點擊
                  }}
                >
                  <span className="pure-menu-link">{label}</span>
                </li>
              </Trigger>
            );
          })}
        </ul>
      </List>

      {tabs.map(({ key, Slot }) => (
        <Content key={key} className="pure-g" value={key}>
          {Slot}
        </Content>
      ))}
    </Root>
  );
}

const tabProps = PropTypes.shape({
  key: PropTypes.string,
  label: PropTypes.string,
  Slot: PropTypes.element,
});

CustomTabs.propTypes = {
  tabs: PropTypes.arrayOf(tabProps).isRequired,
  defaultKey: PropTypes.string,
};

CustomTabs.defaultProps = {
  defaultKey: '',
};
