import React from 'react';

const SlotContext = React.createContext({
  slotData: {},
  onUpdate: () => {},
});

export default SlotContext;
