import './Header.css';
import Navigation from '../Navigation/Navigation'
import logo from '../../images/__logo.svg';
import { useLocation } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';

function Header({ loggedIn }) {

  const location = useLocation();
  const modifierContainer = location.pathname === '/signup' ? 'header__container_register' : location.pathname === '/signin' ? 'header__container_register' : '';
  const modifierlogo = location.pathname === '/signup' ? 'header__logo_register' : location.pathname === '/signin' ? 'header__logo_register' : '';

  return (
    <Route path='/(movies|saved-movies|signup|signin|profile|)'>
      <header className='header'>
        <div className={`header__container ${modifierContainer}`}>
          <Link to='/' className='header__link'>
            <img
              src={logo}
              alt="Лого"
              className={`header__logo ${modifierlogo}`}
            />
          </Link>
          <Navigation loggedIn={loggedIn} />
        </div>
      </header >
    </Route>
  )
}

export default Header;