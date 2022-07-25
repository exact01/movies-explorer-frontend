import './MoviesCard.css'
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours === 0 ? minutes + 'м' : hours + 'ч ' + minutes + 'м';
};

function MoviesCard({ card, handleCardLike }) {

  const { currentUser, savedCards, deleteCard } = useContext(CurrentUserContext);

  const isLiked = savedCards.some((elem) => currentUser._id === elem.owner ? elem.movieId === card.id : false)
  const cardLike = `moviescard__img ${isLiked && 'moviescard__img_active'}`
  const location = useLocation();
  
  function handleSavedCard(savedCard) {
    handleCardLike(savedCard);
  }

  function handleDeletCard(card) {
    deleteCard(card)
  }
  return (
    <div className="moviescard" key={card.id || card.moviesId}>
      <div className='moviescard__container'>
        <div className='moviescard__box-data'>
          <h2 className='moviescard__name-film'>{card.nameRU}</h2>
          <div className='moviescard__duration'>{getTimeFromMins(card.duration)}</div>
        </div>
        {location.pathname === '/movies' && <button type='button' className={cardLike} onClick={() => { handleSavedCard(card) }}></button>}
        {location.pathname === '/saved-movies' && <button type='button' className='moviescard__img-saved' onClick={() => handleDeletCard(card)}></button>}
      </div>
      <a href={card.trailerLink} target='_blank' className='moviescard__link' rel="noreferrer">
        <img src={card.thumbnail ? card.thumbnail : `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`} alt='Обложка' className='moviescard__cover' />
      </a>
    </div>
  )
}

export default MoviesCard;