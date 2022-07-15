import './Navigation.css'
import { Link, NavLink, Route } from 'react-router-dom';
function Navigation() {

  return (

    <div className='navigation'>
      <Route exact path='/'>
        <nav>
          <Link to='/signup' className='navigation__link'>Регистрация</Link>
          <Link to='/signin' className='navigation__link navigation__link_item'>Войти</Link>
        </nav>
      </Route>
      <Route path='/(movies|saved-movies|profile)'>
        <div className='navigation__hamburger-menu'>
          <input className='navigation__toggle' type='checkbox' />
          <label className='navigation__btn' htmlFor='navigation__toggle'>
            <span></span>
          </label>
          <nav className='navigation__links-container'>
            <ul className='navigation__list-links'>
              <li className='navigation__list-link'><NavLink to='/' exact className='navigation__link-burger'>Главная</NavLink></li>
              <li className='navigation__list-link'><NavLink to='/movies' className='navigation__link-burger'>Фильмы</NavLink></li>
              <li className='navigation__list-link'><NavLink to='/saved-movies' className='navigation__link-burger'>Сохранённые фильмы</NavLink></li>
              <li className='navigation__list-link'><Link to='/profile' className='navigation__link-profile'>Аккаунт</Link></li>
            </ul>
          </nav>
        </div >
        <nav className='navigation__login'>
          <div className='navigation__links-films'>
            <Link to='/movies' className='navigation__link-film'>Фильмы</Link>
            <Link to='/saved-movies' className='navigation__link-film navigation__link-film_saved'>Сохранённые фильмы</Link>
          </div>
          <Link to='/profile' className='navigation__link-profile'>Аккаунт</Link>
        </nav>
      </Route >
    </div >

  )
}

export default Navigation;