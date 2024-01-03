import React from 'react';

import { CustomSwitch } from '../../../../components';
import SlotContext from '../SlotContext';

export default function EditConfig() {
  const { slotData, onUpdate } = React.useContext(SlotContext);
  const [tempSzSlot, setTempSzSlot] = React.useState(slotData.szSlot.toString());
  const [tempMana, setTempMana] = React.useState(slotData.mana.toString());

  const handleChangeSzSlot = (e) => {
    const parsedVal = Number.parseInt(e.target.value, 10) || slotData.szSlot;
    onUpdate(parsedVal, 'szSlot');
    setTempSzSlot(e.target.value);
  };

  const handleChangeMana = (e) => {
    const parsedVal = Number.parseInt(e.target.value, 10) || slotData.szSlot;
    onUpdate(parsedVal, 'mana');
    setTempMana(e.target.value);
  };

  const handleChangeManaFixed = (value) => {
    onUpdate(value, 'mana');
    setTempMana(value.toString());
  };

  const handleChangeEXAS = (e) => {
    if (slotData.idx === 5) return;
    onUpdate(e.target.checked, 'exas');
  };

  return (
    <div className="pure-u-1 pure-form pure-form-aligned">
      <div className="pure-control-group">
        <label htmlFor="szSlotInput">潛能</label>
        <input
          id="szSlotInput"
          type="number"
          min={0}
          max={10}
          value={tempSzSlot}
          onChange={handleChangeSzSlot}
        />
        <span className="pure-form-message-inline">
          可調整卡片的潛能開啟數量
        </span>
      </div>
      <div className="pure-control-group">
        <label htmlFor="manaInput">瑪娜</label>
        <input
          id="manaInput"
          type="number"
          min={0}
          max={400}
          value={tempMana}
          onChange={handleChangeMana}
        />
        <span className="pure-form-message-inline">
          可調整卡片的瑪娜值，或是使用下方的快捷按鈕迅速調整
        </span>
      </div>
      <div className="pure-controls">
        <div className="pure-button-group" role="group">
          <button type="button" className="pure-button button-small" onClick={() => handleChangeManaFixed(0)}>0</button>
          <button type="button" className="pure-button button-small" onClick={() => handleChangeManaFixed(200)}>+200</button>
          <button type="button" className="pure-button button-small" onClick={() => handleChangeManaFixed(400)}>+400</button>
        </div>
      </div>
      <div className="pure-controls">
        <CustomSwitch
          label="啟用EXAS"
          checked={slotData.exas}
          onChange={handleChangeEXAS}
          disabled={slotData.idx === 5}
        />
      </div>
    </div>
  );
}
