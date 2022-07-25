import Preloader from '../Preloader/Preloader';
import { useState } from 'react';
import './Further.css';

function Further({
  count,
  renderMovies,
  handleSearchCard,
  countMovies,
  setErrorResponse,
  errorResponse,
  setRenderedMovies
}) {
  const [isLoading, setIsLoading] = useState(false);

  function handleClickFurther() {
    renderMovies()
    setIsLoading(true);
    handleSearchCard()
      .catch((e) => {
        setRenderedMovies([]);
        setIsLoading(false); setErrorResponse(true); setTimeout(() => {
          setErrorResponse(false)
        }, 10000)
      })
      .finally(setIsLoading(false))
  }

  return (
    <div className={`further ${isLoading && 'further_active'}`}>
      <div className='further__container'>
        {(localStorage.getItem('searchRequest') === null)
          ? <div className='further__paragraph'>Совершите свой первый поиск</div>
          : errorResponse ? <div className='further__paragraph' style={{ color: 'red' }}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</div>
            : count === 0 ?
              <div className='further__paragraph'>Ничего не найдено</div>
              : count === countMovies ? ''
                : isLoading ? <Preloader /> : <button className='further__button' onClick={handleClickFurther} >Еще</button>}
      </div>
    </div>
  )
}

export default Further;