import React from 'react';
import PropTypes from 'prop-types';

export default function Stats({
  maxHp, maxAtk, breed, evoNow, evoMax, cost,
}) {
  const statRows = [
    { key: 'hp', label: 'HP', value: maxHp },
    { key: 'atk', label: '攻擊力', value: maxAtk },
    { key: 'breed', label: '種族', value: breed },
    { key: 'evo', label: '進化', value: `${evoNow} / ${evoMax}` },
    { key: 'cost', label: 'Cost', value: cost },
  ];
  return (
    <table className="pure-table pure-table-horizontal" style={{ width: '100%' }}>
      <tbody>
        {statRows.map(({ key, label, value }) => (
          <tr key={key}>
            <th style={{ textAlign: 'right' }}>{label}</th>
            <td style={{ textAlign: 'right' }}>{value}</td>
            <td>{' '}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Stats.propTypes = {
  maxHp: PropTypes.string,
  maxAtk: PropTypes.string,
  breed: PropTypes.string,
  evoNow: PropTypes.string,
  evoMax: PropTypes.string,
  cost: PropTypes.string,
};

Stats.defaultProps = {
  maxHp: 0,
  maxAtk: 0,
  breed: '',
  evoNow: '0',
  evoMax: '0',
  cost: 0,
};
