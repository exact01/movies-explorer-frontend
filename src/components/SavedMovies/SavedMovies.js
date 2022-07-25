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
    setSavedCards
  } = useContext(CurrentUserContext);

  const savedUserCards = savedCards.filter((value) => currentUser._id === value.owner && value);
  const resultUserCard = savedUserCards.filter((value) => {
    if (localStorage.searchRequestSavedMovies != null) {
      const searchRequestData = JSON.parse(localStorage.searchRequestSavedMovies);
      const checkBoxState = searchRequestData.checkBox;
      const request = searchRequestData.request ? searchRequestData.request : ' ';
      if (checkBoxState) {
        return value.duration <= 41 && value.nameRU.toLowerCase().includes(request.toLowerCase());
      } else {
        return value.nameRU.toLowerCase().includes(request.toLowerCase());
      }
    } else { return savedUserCards }
  })

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
        setSavedCards={setSavedCards}
      />
      <MoviesCardList handleCardLike={handleCardLike} cards={resultUserCard} />
      <div className='savedmovies__block'></div>
    </div>
  )
}

export default SavedMovies;