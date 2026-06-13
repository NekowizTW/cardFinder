import React from 'react';

import { Minus } from 'lucide-react';
import PropTypes from 'prop-types';

import { CustomTabs, WikiImage } from '../../../../components';
import useGetCard from '../../../../hooks/useGetCard';
import EXSlot from '../../DisplayHelper/EXSlot';
import SlotContext from '../SlotContext';
import EditCard from './EditCard';
import EditConfig from './EditConfig';
import EditEX from './EditEX';
import './style.scss';

const ClearIcon = ({ target, onClick, disabled }) => (
  <button
    aria-label={`clear-${target}-button`}
    className={`clearBtn ${disabled ? 'disabled' : ''}`}
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    <Minus size={16} />
  </button>
);

ClearIcon.propTypes = {
  target: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

ClearIcon.defaultProps = {
  onClick: () => {},
  disabled: false,
};

const TABS = [
  { key: 'EditCard', label: '選擇卡片', Slot: <EditCard /> },
  { key: 'EditAdditional', label: '強化設定', Slot: <EditConfig /> },
  { key: 'EditEX', label: '結晶設定', Slot: <EditEX /> },
];

export default function EditTabs() {
  const { slotData, onUpdate } = React.useContext(SlotContext);
  const { card } = useGetCard(slotData.id || '-1');

  const resetCard = () => onUpdate('-1', 'id');

  const removeEX = (pos) => onUpdate(slotData.exs.filter((_, idx) => idx !== pos), 'exs');

  const calculated = React.useMemo(() => ({
    hp: Number.parseInt(card.max_hp, 10) + slotData.mana,
    atk: Number.parseInt(card.max_atk, 10) + slotData.mana,
    cost: Number.parseInt(card.cost, 10),
  }), [card.cost, card.max_atk, card.max_hp, slotData.mana]);

  return (
    <div style={{ paddingBottom: 16 }}>
      <div className="pure-g cardItem">
        <div
          className="pure-u-1 pure-u-md-1-3 imgFrame center-middle"
          style={{ flexDirection: 'row' }}
        >
          <ClearIcon disabled={slotData.id === '-1'} onClick={resetCard} target="card" />
          <WikiImage filename={card.small_filename} height={60} width={60} />
        </div>
        <div className="pure-u-1 pure-u-md-1-3 center-middle">
          <h3>{card.name || '無'}</h3>
        </div>
        <table className="pure-u-1 pure-u-md-1-3 center-middle">
          <tbody>
            <tr>
              <th>HP</th>
              <td>{calculated.hp}</td>
            </tr>
            <tr>
              <th>ATK</th>
              <td>{calculated.atk}</td>
            </tr>
            <tr>
              <th>Cost</th>
              <td>{calculated.cost}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <h4>已設置結晶</h4>
        {slotData.exs
          .map((exi, i) => [exi, `slotData-${slotData.idx}-ex-${i}`, i])
          .map(([exi, key, i]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ClearIcon onClick={() => removeEX(i)} target={key} />
              <EXSlot isInEditor id={exi} />
            </div>
          ))}
      </div>
      <CustomTabs
        defaultKey="EditCard"
        tabs={TABS}
      />
    </div>
  );
}
