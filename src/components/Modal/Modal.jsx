import { useEffect, useCallback } from 'react';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ onClose, children }) => {
  const onCloseByEscape = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', onCloseByEscape);
    return () => window.removeEventListener('keydown', onCloseByEscape);
  }, [onCloseByEscape]);

  // componentDidMount() {
  //   window.addEventListener('keydown', this.onCloseByEscape);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.onCloseByEscape);
  // }

  const onBackDrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={s.overlay} onClick={onBackDrop}>
      <div className={s.modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
