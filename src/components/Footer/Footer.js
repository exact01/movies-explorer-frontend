import { Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Footer.css'

function Footer() {

  const [date, setDate] = useState('2022');

  useEffect(() => {
    setDate(new Date().getFullYear());
  }, []);

  return (
    <Route path='/(movies|saved-movies|)'>
      <footer className="footer">
        <div className="footer__container">
          <h2 className="footer__signature">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
          <div className="footer__thorough">
            <div className="footer__year">© {date}</div>
            <div className="footer__links">
              <a target="_blank" rel="noreferrer" href="https://practicum.yandex.ru/" className="footer__link">Яндекс.Практикум</a>
              <a target="_blank" rel="noreferrer" href="https://github.com/thechertan/" className="footer__link">Github</a>
              <a target="_blank" rel="noreferrer" href="https://www.facebook.com/" className="footer__link">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </Route>
  )
}

export default Footer;