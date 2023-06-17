import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Modal } from './Modal.styled';

export const ModalImg = ({closeModal, children}) => {
  const handleKeyDown = e => {
    if ( e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => { window.removeEventListener('keydown', handleKeyDown); }
  });

  return (
    <Overlay onClick={handleBackDrop}>
      <Modal>{children}</Modal>
    </Overlay>
  );
}

ModalImg.propTypes = {
  closeModal: PropTypes.func.isRequired,
};