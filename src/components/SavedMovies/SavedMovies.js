import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function SavedMovies() {
  const {
    currentUser,
    cards,
    handlerSearchForm,
    searchForm,
    searchFormDirty,
    searchFormError,
    setFormValid,
    formValid,
    handleSearchCard,
    setCards,
    setSearchInput,
    setSearchForm,
    handleCardLike,
    savedCards,
  } = useContext(CurrentUserContext);

  const savedUserCards = handleSearchSubmit();

  function handleSearchSubmit() {
    const savedUserCards = savedCards.filter((value) => currentUser._id === value.owner && value);
    if (localStorage.searchRequestSavedMovies != null) {
      const searchRequestData = JSON.parse(localStorage.searchRequestSavedMovies);
      const checkBoxState = searchRequestData.checkBox;
      const request = searchRequestData.request;
      return savedUserCards.filter(movie => {
        if (checkBoxState === true) {
          return movie.duration <= 41 && movie.nameRU.toLowerCase().includes(request.toLowerCase());
        } else {
          return movie.nameRU.toLowerCase().includes(request.toLowerCase());
        }
      });
    }
    return savedUserCards;
  }

  return (
    <div className='savedmovies'>
      <SearchForm
        setSearchForm={setSearchForm}
        setSearchInput={setSearchInput}
        cards={cards}
        handlerSearchForm={handlerSearchForm}
        searchForm={searchForm}
        searchFormDirty={searchFormDirty}
        searchFormError={searchFormError}
        setFormValid={setFormValid}
        formValid={formValid}
        setCards={setCards}
        handleSearchCard={handleSearchCard}
        handleSearchSubmit={handleSearchSubmit}
      />
      <MoviesCardList handleCardLike={handleCardLike} cards={savedUserCards} />
      <div className='savedmovies__block'></div>
    </div>
  )
}

export default SavedMovies;