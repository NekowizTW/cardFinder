import { Minus, Plus } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { SenzaiRow, WikiImage } from '../../components';

import '../../assets/scss/card-item.scss';

function CardRowSelectIcon({ isSelected, onToggle, isVisible }) {
  return (
    <button
      type="button"
      className={`selectBtn ${isSelected ? 'selected' : ''}`}
      onClick={() => onToggle(!isSelected)}
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      {isSelected ? (
        <Minus size={16} />
      ) : (
        <Plus size={16} />
      )}
    </button>
  );
}

CardRowSelectIcon.propTypes = {
  isSelected: PropTypes.bool,
  onToggle: PropTypes.func,
  isVisible: PropTypes.bool,
};

CardRowSelectIcon.defaultProps = {
  isSelected: false,
  onToggle: () => {},
  isVisible: false,
};

export default function CardRow({
  data, selectEnabled, isSelected, onSelect,
}) {
  const handleChange = (id, checked) => onSelect(id, checked);

  return (
    <div className="cardItem pure-g">
      <div className="pure-u-1-6 imgFrame">
        <CardRowSelectIcon
          isSelected={isSelected}
          onToggle={(checked) => handleChange(data.id, checked)}
          isVisible={selectEnabled}
        />
        <WikiImage filename={data.small_filename} width="100%" />
      </div>
      <div className="pure-u-2-3 profileFrame">
        {data.obtainType && (
        <span className={data.obtainType.type === 'haifu' ? 'circleMark' : ''}>
          {data.obtainType.type === 'haifu' ? '配' : ''}
        </span>
        )}
        <Link to={`/card/${data.id}`}>
          {`No. ${data.id} ${data.name}`}
        </Link>
        <div className="pure-g" style={{ margin: '0.5em 0' }}>
          <span className="pure-u-1-3">{data.breed || '--'}</span>
          <span className="pure-u-1-3">{`${data.evo_now}/${data.evo_max}`}</span>
          <span className="pure-u-1-3">{data.cost || '00'}</span>
        </div>
      </div>
      <div className="pure-u-1-6 numberFrame">
        <span>{data.max_hp}</span>
        <br />
        <span>{data.max_atk}</span>
        <br />
        {data.ssData.turn && (
        <span>
          {data.ssData.cdf}
          /
          {data.ssData.cds}
        </span>
        )}
&nbsp;
        {data.ss2Data.turn && (
        <span>
          {data.ss2Data.cdf}
          /
          {data.ss2Data.cds}
        </span>
        )}
      </div>
      <div className="pure-u-1 pure-u-sm-1-6" />
      <div className="pure-u-1 pure-u-sm-5-6">
        <SenzaiRow
          belongsTo={data.id}
          senzaiArr={data.senzaiArr}
          senzaiLArr={data.senzaiLArr}
        />
      </div>
    </div>
  );
}

CardRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any.isRequired,
  selectEnabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
};

CardRow.defaultProps = {
  isSelected: false,
  selectEnabled: false,
  onSelect: () => {},
};
