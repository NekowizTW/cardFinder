import React from 'react';

import PropTypes from 'prop-types';

import EditModal from './EditModal';
import { WikiImage } from '../../../components';
import useGetLeaderExCard from '../../../hooks/useGetLeaderExCard';
import useOnScreenShotMode from '../../../hooks/useOnScreenShotMode';

export default function LeaderEXRow({
  leaderEX, onChange,
}) {
  const [open, setOpen] = React.useState(false);
  const {
    name, rank, small_filename: smallFilename, condition, skill,
  } = useGetLeaderExCard(leaderEX);
  const { isEnabled, rwd, md } = useOnScreenShotMode();

  const handleOpen = () => setOpen(true);

  const handleSave = (newValue) => onChange(newValue.leaderEX);

  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <h4 className="pure-u-1" style={{ textAlign: 'center' }}>
        {`${name} ${rank.replace(/\d+/, '')}`}
      </h4>
      <div className={`${rwd} pure-u${md}-1-4 imgFrame`}>
        <WikiImage filename={smallFilename} height={60} width={60} />
      </div>
      <div className={`${rwd} pure-u${md}-5-8 leaderEX`}>
        <p>{condition}</p>
        <p>{skill}</p>
      </div>
      <div className={`${rwd} pure-u${md}-1-8`}>
        <button
          className={`pure-button button-warning ${isEnabled ? 'hide' : ''}`}
          onClick={handleOpen}
          type="button"
        >
          編輯
        </button>
        {open ? (
          <EditModal
            open
            leaderEX={leaderEX}
            onClose={handleClose}
            onSave={handleSave}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
}

LeaderEXRow.propTypes = {
  leaderEX: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
