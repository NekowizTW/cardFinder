import React from 'react';
import PropTypes from 'prop-types';

import { WikiImage } from '../../../components';
import useGetExcard from '../../../hooks/useGetExCard';

const EXSlot = React.memo(({ id, isInEditor }) => {
  const { exCard } = useGetExcard(id);

  let exName = exCard.name;
  const lbp = exCard.name.indexOf('【');
  const rbp = exCard.name.indexOf('】') + 1;
  if (exName <= 10) exName = exCard.name;
  else if (lbp > 0) exName = `${exCard.name.slice(0, lbp)}\n${exCard.name.slice(lbp)}`;
  else if (lbp === 0) exName = `${exCard.name.slice(0, rbp)}\n${exCard.name.slice(rbp)}`;

  const imageSideLength = isInEditor ? 48 : 60;

  return (
    <div className="exSlot">
      <WikiImage
        filename={exCard.small_filename}
        width={imageSideLength}
        height={imageSideLength}
      />
      <span>{exName}</span>
    </div>
  );
});

EXSlot.propTypes = {
  id: PropTypes.string.isRequired,
  isInEditor: PropTypes.bool,
};

EXSlot.defaultProps = {
  isInEditor: false,
};

export default EXSlot;
