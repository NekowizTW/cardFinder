import React from 'react';

import {
  Tab, TabPanel, Tabs, TabsList,
} from '@mui/base';
import PropTypes from 'prop-types';

export default function CustomTabs({ tabs, defaultKey }) {
  const [tabKey, setTabKey] = React.useState(defaultKey);

  const handleChange = (_, newTabKey) => setTabKey(newTabKey);

  return (
    <Tabs onChange={handleChange} value={tabKey}>
      <TabsList
        slotProps={{
          root: { className: 'pure-menu pure-menu-horizontal pure-menu-scrollable' },
        }}
      >
        <ul className="pure-menu-list">
          {tabs.map(({ key, label }) => (
            <Tab
              key={key}
              slots={{ root: 'li' }}
              value={key}
              slotProps={{
                root: (ownerState) => ({
                  className: `pure-menu-item ${
                    ownerState.selected ? 'pure-menu-selected' : ''
                  }`,
                  style: {
                    backgroundColor: ownerState.selected ? '#eee' : 'inherit',
                  },
                }),
              }}
            >
              <span className="pure-menu-link">{label}</span>
            </Tab>
          ))}
        </ul>
      </TabsList>

      {tabs.map(({ key, Slot }) => (
        <TabPanel
          key={key}
          className="pure-g"
          value={key}
        >
          {Slot}
        </TabPanel>
      ))}
    </Tabs>
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
