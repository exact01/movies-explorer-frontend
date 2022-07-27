
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, handleCardLike, savedCards, getSavedCard }) {
  return (
    <section className="moviescardlist">
      {cards.map((card) => (
        <MoviesCard getSavedCard={getSavedCard} savedCards={savedCards} handleCardLike={handleCardLike} card={card} key={card.id || card.movieId} />
      ))}
    </section>
  )
}

export default MoviesCardList;