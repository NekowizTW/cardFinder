import React from 'react';
import PropTypes from 'prop-types';

import { SenzaiRow, WikiImage } from '../../../components';
import useGetCard from '../../../hooks/useGetCard';
import useOnScreenShotMode from '../../../hooks/useOnScreenShotMode';
import EXSlot from '../DisplayHelper/EXSlot';
import SkillStringIcon from '../DisplayHelper/SkillStringIcon';
import { SenzaiSummandFormat, SlotDataFormat } from '../utils';

import EditModal from './EditModal';

const getCalculatedData = (card, senzaiSummand) => {
  const calcData = {};

  // ability value
  calcData.hp = Number.parseInt(card.max_hp, 10) + senzaiSummand.hp;
  calcData.atk = Number.parseInt(card.max_atk, 10) + senzaiSummand.atk;
  calcData.cost = Math.ceil(Number.parseInt(card.cost, 10) * 0.8) + senzaiSummand.cost;

  // generate if ss exist
  calcData.cdf = [];
  calcData.cds = [];
  if (card.ssData.turn) {
    calcData.cdf.push(card.ssData.cdf + senzaiSummand.cdf);
    calcData.cds.push(card.ssData.cds + senzaiSummand.cds);
  }
  if (card.ss2Data.turn) {
    calcData.cdf.push(card.ss2Data.cdf + senzaiSummand.cdf);
    calcData.cds.push(card.ss2Data.cds + senzaiSummand.cds);
  }
  // clear negative value
  calcData.cdf = calcData.cdf.map((value) => Math.max(0, value));
  calcData.cds = calcData.cds.map((value) => Math.max(0, value));

  // return the calculated data
  return calcData;
};

function CDColumnComponent({ cdArray }) {
  if (cdArray.length === 0) return <span>0</span>;

  return (
    <span>
      {cdArray[0]}
      {cdArray.length > 1 && `(${cdArray[1]})`}
    </span>
  );
}

CDColumnComponent.propTypes = {
  cdArray: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default function SlotDataRow({
  slotData, onChange, senzaiSummand,
}) {
  const {
    idx, id, exas = false, szSlot, mana, exs,
  } = slotData;
  const [open, setOpen] = React.useState(false);
  const { card } = useGetCard(id);
  const { isEnabled, md, rwd } = useOnScreenShotMode();

  const calcData = React.useMemo(
    () => getCalculatedData(card, senzaiSummand),
    [card, senzaiSummand],
  );

  const handleOpen = () => setOpen(true);

  const handleSave = (newValue) => onChange(newValue);

  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="cardItem teamItem pure-g">
        <div className={`${rwd} pure-u${md}-3-8`}>
          <div className="pure-g basicProfile">
            <div className={`${rwd} pure-u${md}-1-2`}>
              <div className="imgFrame" style={{ justifyContent: 'center' }}>
                {idx === 0 && <span className="teamCardBadge">隊長</span>}
                {idx === 5 && <span className="teamCardBadge">援助</span>}
                {exas && <div className="exasBadge" />}
                <WikiImage filename={card?.small_filename} width={60} height={60} />
              </div>
              <h4>{id !== -1 ? `No. ${card?.id}` : '-'}</h4>
            </div>
            <div className={`${rwd} pure-u${md}-1-2 numberData`}>
              <p>{calcData.hp}</p>
              <p>{calcData.atk}</p>
              <p>{calcData.cost}</p>
              <p className={`${isEnabled ? 'hide' : ''}`}>
                <CDColumnComponent cdArray={calcData.cdf} />
              </p>
              <p className={`${isEnabled ? 'hide' : ''}`}>
                <CDColumnComponent cdArray={calcData.cds} />
              </p>
            </div>
          </div>
        </div>
        <div className={`${rwd} pure-u${md}-1-2`}>
          <div className={`pure-g ${isEnabled ? 'hide' : ''}`}>
            <div className={`${rwd} pure-u${md}-1-2 teamAS`}>
              {card?.asData && <SkillStringIcon idx={idx} type="as" skillTypes={[card.asData.type, card.as2Data.type]} />}
            </div>
            {(!exas || idx === 5) && (
            <div className={`${rwd} pure-u${md}-1-2 teamSS`}>
              {card?.ssData && <SkillStringIcon idx={idx} type="ss" skillTypes={[card.ssData.type, card.ss2Data.type]} />}
            </div>
            )}
            {(exas && idx !== 5) && (
            <div className={`pure-u-1 pure-u${md}-1-2 teamEXAS`}>
              {card?.EXASData && <SkillStringIcon idx={idx} type="exas" skillTypes={[card.EXASData.type]} />}
            </div>
            )}
          </div>
          <div className="pure-g">
            <SenzaiRow belongsTo={`${id}`} senzaiArr={card?.senzaiArr} senzaiLArr={card?.senzaiLArr} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {exs
              .map((exi, i) => [exi, `slotData-${idx}-ex-${i}`])
              .map(([exi, key]) => (
                <EXSlot key={key} id={exi} />
              ))}
          </div>
        </div>
        <div className={`${rwd} pure-u${md}-1-8`}>
          <button
            type="button"
            className={`pure-button button-warning ${isEnabled ? 'hide' : ''}`}
            onClick={handleOpen}
          >
            編輯
          </button>
          <p style={{ paddingTop: isEnabled ? '0' : '2em' }}>
            <b>
              {id !== -1 ? szSlot : '0'}
              潛
            </b>
          </p>
          <p style={{ paddingTop: '2em', color: (mana > 200 ? 'green' : 'blue') }}>
            <b>
              +
              {mana}
            </b>
          </p>
        </div>
      </div>
      {open && (
      <EditModal
        slotData={slotData}
        open
        onSave={handleSave}
        onClose={handleClose}
      />
      )}
    </>
  );
}

SlotDataRow.propTypes = {
  slotData: SlotDataFormat.isRequired,
  onChange: PropTypes.func.isRequired,
  senzaiSummand: SenzaiSummandFormat,
};

SlotDataRow.defaultProps = {
  senzaiSummand: {
    hp: 0, atk: 0, cost: 0, cdf: [0, 0], cds: [0, 0],
  },
};
