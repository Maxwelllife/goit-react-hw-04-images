import React from 'react';
import s from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ onClick }) {
  return (
    <button onClick={onClick} className={s.button} type="button">
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
