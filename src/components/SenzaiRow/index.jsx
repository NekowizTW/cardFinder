import React from 'react';

import PropTypes from 'prop-types';

import useGetSenzai from '../../hooks/useGetSenzai';
import WikiImage from '../WikiImage';
import './styles.scss';

const SenzaiNode = React.memo(({ name, variant }) => {
  const { info, filename } = useGetSenzai(name);

  return variant === 'inline' ? (
    <WikiImage filename={filename} width={22} />
  ) : (
    <tr>
      <td aria-label="senzai-table-row">
        <WikiImage filename={filename} width={22} />
      </td>
      <td>
        <b>{name}</b>
        <br />
        {info}
      </td>
    </tr>
  );
});

SenzaiNode.propTypes = {
  name: PropTypes.string,
  variant: PropTypes.string,
};

SenzaiNode.defaultProps = {
  name: '無',
  variant: 'inline',
};

export default function SenzaiRow({
  belongsTo, senzaiArr, senzaiLArr, variant,
}) {
  const senzaiNodes = senzaiArr
    .map((name, idx) => [name, idx])
    .map(([name, idx]) => (
      <SenzaiNode key={`${belongsTo}-${idx}`} name={name} variant={variant} />
    ));

  const senzaiLNodes = senzaiLArr
    .map((name, idx) => [name, idx])
    .map(([name, idx]) => (
      <SenzaiNode key={`${belongsTo}-${idx}`} name={name} variant={variant} />
    ));

  return (
    <React.Fragment>
      {variant === 'inline' && (
        <div className="senzaiList">
          {senzaiNodes}
          {!!senzaiLArr.length && (
            <span className="legend">
              {senzaiLNodes}
            </span>
          )}
        </div>
      )}
      {variant === 'table' && (
        <React.Fragment>
          <div className="senzaiList" />
          <table style={{ border: 'none' }}>
            <tbody>
              {senzaiNodes}
            </tbody>
          </table>
          <hr />
          <div className="senzaiList Legend" />
          <table style={{ border: 'none' }}>
            <tbody>
              {senzaiLNodes}
            </tbody>
          </table>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

SenzaiRow.propTypes = {
  belongsTo: PropTypes.string.isRequired,
  senzaiArr: PropTypes.arrayOf(PropTypes.string),
  senzaiLArr: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.string,
};

SenzaiRow.defaultProps = {
  senzaiArr: [],
  senzaiLArr: [],
  variant: 'inline',
};
