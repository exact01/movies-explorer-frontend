import { useState, useEffect, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Forther from '../Further/Further';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import './Movies.css';

function Movies() {
  const {
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
    getSavedCard } = useContext(CurrentUserContext);

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  });

  const [movies, setMovies] = useState([]);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [idx, setIdx] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [countMoviesWindow, setCountMoviesWindow] = useState(0)
  const [errorResponse, setErrorResponse] = useState(false);

  function updateWindowWidth() {
    setWindowWidth(window.innerWidth);
  }

  function filterMovies(unmovies) {
    const searchRequestData = JSON.parse(localStorage.searchRequest);
    const checkBoxState = searchRequestData.checkBox;
    const request = searchRequestData.request;
    return unmovies.filter(movie => {
      if (checkBoxState === true) {
        return movie.duration <= 41 && movie.nameRU.toLowerCase().includes(request.toLowerCase());
      } else {
        return movie.nameRU.toLowerCase().includes(request.toLowerCase());
      }
    });
  }

  function getMoviesFromLocalStorage() {
    if (localStorage.getItem('searchRequest') !== null) {
      const searchRequestData = JSON.parse(localStorage.searchRequest);
      const movies = filterMovies(searchRequestData.movies);
      setMovies(movies);
    } else {
      return;
    }
  }

  function handleSearchSubmit(moviesFromApi) {
    const movies = filterMovies(moviesFromApi);
    setRenderedMovies([]);
    setMovies(movies);
    setIdx(0);
  }

  function renderMovies() {
    if (windowWidth > 1023) {
      setIdx(prev => prev + 3)
    }
    else if (windowWidth < 1023) {
      setIdx(prev => prev + 2)
    }
    const moviesToRender = movies.slice(renderedMovies.length, countMoviesWindow + idx);
    setRenderedMovies([...renderedMovies, ...moviesToRender]);

  }
  useEffect(() => {
    if (windowWidth > 1023) {
      setCountMoviesWindow(12)
    }
    if (windowWidth < 1023) {
      setCountMoviesWindow(8)
    }
    if (windowWidth < 767) {
      setCountMoviesWindow(5)
    }

  }, [windowWidth])

  useEffect(() => {
    renderMovies()
  }, [movies]); // eslint-disable-line react-hooks/exhaustive-deps 

  useEffect(() => {
    getMoviesFromLocalStorage();
    renderMovies();
    return () => {
      setMovies([]);
      setRenderedMovies([]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps 


  return (
    <div className='movies'>
      <SearchForm
        setRenderedMovies={setRenderedMovies}
        setErrorResponse={setErrorResponse}
        setSearchForm={setSearchForm}
        handleSearchSubmit={handleSearchSubmit}
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
      />
      <MoviesCardList getSavedCard={getSavedCard} savedCards={savedCards} handleCardLike={handleCardLike} cards={renderedMovies} />
      <Forther
        setRenderedMovies={setRenderedMovies}
        errorResponse={errorResponse}
        setErrorResponse={setErrorResponse}
        handleSearchCard={handleSearchCard}
        count={renderedMovies.length}
        countMovies={movies.length}
        renderMovies={renderMovies} />
    </div>
  )
}

export default Movies;