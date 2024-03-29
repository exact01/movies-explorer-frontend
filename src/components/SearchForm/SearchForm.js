import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import imgButton from '../../images/__pushText.svg'
import searchImg from '../../images/__serchMovies.svg'
import { CurrentUserContext } from '../../context/CurrentUserContext';
import './SearchForm.css';

function SearchForm({
  handleSearchSubmit,
  handlerSearchForm,
  searchForm,
  searchFormDirty,
  searchFormError,
  setFormValid,
  cards,
  setSearchInput,
  setSearchForm,
}) {
  const location = useLocation();
  const { setSearchFormDirty } = useContext(CurrentUserContext);

  const [statusCheckBox, setStatusCheckBox] = useState(false);
  useEffect(() => {
    setSearchForm('')
    setSearchFormDirty(false);
    getStatusCheckBoxAndInput();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function getStatusCheckBoxAndInput() {
    if (location.pathname === '/movies') {
      if (localStorage.getItem('checkBox') !== null) {
        const status = JSON.parse(localStorage.checkBox)
        setStatusCheckBox(status.checkBox)
      }
      if (localStorage.getItem('searchForm') !== null) {
        const text = JSON.parse(localStorage.searchForm)
        setSearchForm(text.searchForm)
      }
      return;
    }
    if (location.pathname === '/saved-movies') {
      localStorage.setItem('searchRequestSavedMovies', JSON.stringify({ "checkBox": false, "request": '', "movies": cards }))
      setStatusCheckBox(false)
      setSearchForm('')
    }
    return;
  }

  function soldCheckBox(e) {
    if (location.pathname === '/movies') {
      const statusCheckBox = e.target.checked;
      localStorage.setItem('checkBox', JSON.stringify({ "checkBox": statusCheckBox }))
      setStatusCheckBox(statusCheckBox)
    }
    if (location.pathname === '/saved-movies') {
      setStatusCheckBox(e.target.checked)
    }
  }

  function handleSumbit(e) {
    e.preventDefault();
    if (location.pathname === '/movies') {
      setSearchInput(searchForm);
      localStorage.setItem('searchRequest', JSON.stringify({ "checkBox": statusCheckBox, "request": searchForm, "movies": cards }))
      handleSearchSubmit(cards, location.pathname);
    }
    if (location.pathname === '/saved-movies') {
      setSearchInput(searchForm);
      localStorage.setItem('searchRequestSavedMovies', JSON.stringify({ "checkBox": statusCheckBox, "request": searchForm, "movies": cards }))
    }
  }

  useEffect(() => {
    if (searchFormError) {
      setFormValid(false)
    } else { setFormValid(true) }
  }, [searchFormError, setFormValid])

  return (
    <section className='searchform'>
      <div className='searchform__box'>
        <form id='formSearch' className='searchform__search-form' onSubmit={handleSumbit}>
          <img
            src={searchImg}
            alt='Поиск'
            className='searchform__search-img' />
          <input
            type="text"
            value={searchForm}
            onChange={(e) => { handlerSearchForm(e, location.pathname) }}
            placeholder='Фильм'
            className='searchform__input'
            required
          />
          <div className='searchform__error'>
            <span className='searchform__error-span'>{searchFormDirty && searchFormError}</span>
          </div>
        </form>
        <div className='searchform__submit-container'>
          <button form='formSearch' type="submit" className="searchform__form-submit">
            <img
              src={imgButton}
              alt='Кнопка'
              className='searchform__search-img-submit' />
          </button>
          <span className='searchform__border-right'></span>
        </div>
      </div>
      <div className='searchform__checkbox-contaioner'>
        <label className='searchform__group-checkbox'>
          <input checked={statusCheckBox} onChange={(e) => { soldCheckBox(e) }} id='searchShortMovies' type="checkbox" className='searchform__checkbox' />
          <span className='searchform__checkbox-span'></span>
        </label>
        <p className='searchform__paragraph'>Короткометражки</p>
      </div>
    </section>
  )
}

export default SearchForm;