import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ seacrhSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form onSubmit={seacrhSubmit} className={css.searchForm}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  seacrhSubmit: PropTypes.func.isRequired,
};
