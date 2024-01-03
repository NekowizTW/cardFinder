import { X } from 'lucide-react';
import React from 'react';
import PropTypes from 'prop-types';

import {
  modalBackdrop,
  modalCloseButton,
  modalContainer,
  modalContent,
  modalFooter,
  modalOpen,
  modalTitle,
} from './styles.module.scss';

export default function CustomModal({
  title, children, open, enableConfirm, onConfirm, onClose,
}) {
  React.useEffect(() => {
    const { overflow, paddingRight } = document.documentElement.style;

    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = '15px';

    return () => {
      document.documentElement.style.overflow = overflow;
      document.documentElement.style.paddingRight = paddingRight;
    };
  }, [open]);
  return (
    <div className={`${modalBackdrop} ${open ? modalOpen : ''}`}>
      <div className={modalContainer}>
        <div className={modalTitle}>
          <h2>{title}</h2>
          <button type="button" onClick={onClose} aria-label="close the modal" className={modalCloseButton}>
            <X />
          </button>
        </div>
        <div className={modalContent}>{children}</div>
        <div className={modalFooter}>
          {enableConfirm && (
            <button type="button" className="pure-button" onClick={onClose}>
              取消
            </button>
          )}
          <button type="button" className="pure-button pure-button-primary" onClick={enableConfirm ? onConfirm : onClose}>
            確認
          </button>
        </div>
      </div>
    </div>
  );
}

CustomModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  open: PropTypes.bool,
  enableConfirm: PropTypes.bool,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
};

CustomModal.defaultProps = {
  title: '',
  children: <div />,
  open: false,
  enableConfirm: false,
  onConfirm: () => {},
  onClose: () => {},
};
