import React from 'react';

import PropTypes from 'prop-types';

import { CustomModal } from '../../../components';
import { SlotDataFormat } from '../utils';
import EditTabs from './EditTabs';
import SlotContext from './SlotContext';

export default function EditModal({
  slotData, open, onSave, onClose,
}) {
  const { idx } = slotData;
  const [updatedSlotData, setUpdatedSlotData] = React.useState(slotData);

  const handleUpdate = (value, key) => setUpdatedSlotData((prev) => ({
    ...prev,
    [key]: value,
  }));

  const handleClose = () => onClose();

  const handleSave = () => {
    onSave(updatedSlotData);
    handleClose();
  };

  return (
    <CustomModal
      enableConfirm
      onClose={handleClose}
      onConfirm={handleSave}
      open={open}
      title={`編輯${idx === 5 ? '援助者' : `隊員${idx + 1}`}`}
    >
      <SlotContext.Provider
        value={React.useMemo(
          () => ({ slotData: updatedSlotData, onUpdate: handleUpdate }),
          [updatedSlotData],
        )}
      >
        <EditTabs />
      </SlotContext.Provider>
    </CustomModal>
  );
}

EditModal.propTypes = {
  slotData: SlotDataFormat.isRequired,
  open: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
