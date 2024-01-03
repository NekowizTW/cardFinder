import React from 'react';
import PropTypes from 'prop-types';

import { WikiImage } from '../../components';

export default function Cover({
  id, name, cardFilename, smallFilename,
}) {
  return (
    <div style={{ marginTop: '0.5em' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <WikiImage filename={cardFilename} width={215} height={300} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

        <WikiImage filename={smallFilename} width={60} height={60} />
        <h3 style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0,
        }}
        >
          <span style={{ fontSize: 'large' }}>{`No. ${id}`}</span>
          <span style={{ fontSize: 'x-large', whiteSpace: 'pre-wrap' }}>{name.replace(' ', '\n')}</span>
        </h3>
      </div>
    </div>
  );
}

Cover.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  cardFilename: PropTypes.string,
  smallFilename: PropTypes.string,
};

Cover.defaultProps = {
  id: '0000',
  name: '',
  cardFilename: '0000.png',
  smallFilename: '0000.png',
};
