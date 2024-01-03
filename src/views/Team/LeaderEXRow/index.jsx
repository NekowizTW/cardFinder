import React from 'react';
import PropTypes from 'prop-types';

import { WikiImage } from '../../../components';
import useGetLeaderExCard from '../../../hooks/useGetLeaderExCard';
import useOnScreenShotMode from '../../../hooks/useOnScreenShotMode';

import EditModal from './EditModal';

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
    <>
      <h4 className="pure-u-1" style={{ textAlign: 'center' }}>
        {`${name} ${rank.replace(/\d+/, '')}`}
      </h4>
      <div className={`${rwd} pure-u${md}-1-4 imgFrame`}>
        <WikiImage filename={smallFilename} width={60} height={60} />
      </div>
      <div className={`${rwd} pure-u${md}-5-8 leaderEX`}>
        <p>{condition}</p>
        <p>{skill}</p>
      </div>
      <div className={`${rwd} pure-u${md}-1-8`}>
        <button
          type="button"
          className={`pure-button button-warning ${isEnabled ? 'hide' : ''}`}
          onClick={handleOpen}
        >
          編輯
        </button>
        {open && (
          <EditModal
            leaderEX={leaderEX}
            open
            onSave={handleSave}
            onClose={handleClose}
          />
        )}
      </div>
    </>
  );
}

LeaderEXRow.propTypes = {
  leaderEX: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
