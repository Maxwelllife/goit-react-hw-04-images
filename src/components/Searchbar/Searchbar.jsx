import { useState } from 'react';
import s from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

const Searchbar = ({ catchSubmitInfo }) => {
  const [query, setQuery] = useState('');

  const handledInputChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    catchSubmitInfo(query);
  };

  return (
    <header className={s.searchbar}>
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className={s.buttonIcon}>
          <BsSearch size="15px" />
        </button>

        <input
          onChange={handledInputChange}
          value={query}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  catchSubmitInfo: PropTypes.func.isRequired,
};

export default Searchbar;
