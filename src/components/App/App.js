import './App.css';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer'
import { Route, Switch, useHistory } from 'react-router-dom';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import MovisApi from '../../utils/MoviesApi';
import Api from '../../utils/MainApi';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


function App() {
  // стейты авторизации 
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  // стейты валидации
  const [searchForm, setSearchForm] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [searchInput, setSearchInput] = useState('')
  const [searchFormDirty, setSearchFormDirty] = useState(false);
  const [searchFormError, setSearchFormError] = useState('Нужно ввести ключевое слово');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameError, setNameError] = useState('Имя не может быть пустым');
  const [emailError, setEmailError] = useState('Емейл не может быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
  const [formValid, setFormValid] = useState(false);
  const [buttonDirty, setButtonDirty] = useState({ 'success': false, 'message': '', 'color': '' });
  // ========= авторизация 

  useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      Api
        .getUserProfile()
        .then(setCurrentUser)
        .catch(() => { setLoggedIn(false) })
    } else { setLoggedIn(false) }
  }

  async function handleRegister(name, email, password) {
    return Api
      .register(name, email, password)
      .then(() => {
        setName('');
        setEmail('');
        history.push('/movies');
      })
      .catch((err) => {
        throw err;
      });
  }

  async function handleLogin(email, password) {
    return await Api
      .authorize(email, password)
      .then((data) => {
        if (!data.token) {
          return;
        }
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true)
        checkToken();
        setName('');
        setEmail('');
        history.push('/movies');
      })
      .catch((err) => {
        throw err;
      });
  }

  async function updateProfiles(email, name) {
    return await Api
      .updateProfile(email, name)
      .then((res) => {
        setCurrentUser(res.newObject)
      })
      .catch((err) => {
        throw err;
      })

  }

  async function handleSearchCard() {
    return await MovisApi
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((e) => {
        throw e
      });
  }

  function getSavedCard() {
    Api
      .getInitialSavedCards()
      .then(setSavedCards)
      .catch((e) => { throw e });
  }

  function deleteCard(card) {
    Api.deleteSavedCard(card._id)
      .then(e => setSavedCards(state => state.reduce((acc, value) => {
        if (value._id === card._id) {
          return acc;
        } else { return acc.concat(value) }
      }, [])))
  }

  function handleCardLike(card) {
    const isLiked = savedCards.some(elem => currentUser._id === elem.owner && elem.movieId === card.id)
    const cardDelete = savedCards.filter(value => value.movieId === card.id && value._id);

    const promise = isLiked ? Api.deleteSavedCard(cardDelete[0]._id) : Api.addSavedCard(card);
    promise
      .then((newCard) => {
        setSavedCards((state) => {
          if (newCard.owner) {
            return [...state, ...[newCard]]
          } else {
            return state.reduce((acc, value) => {
              if (value._id === cardDelete[0]._id) {
                return acc;
              } else { return acc.concat(value) }
            }, [])
          }
        });
      })
      .catch((e) => { console.log(e) });
  }

  function handleSignOut() {
    setCurrentUser('')
    localStorage.clear()
    setLoggedIn(false);
    history.push('/');
  }
  // =========

  useEffect(() => { // запросы данных карточек если пользователь авторизован!
    if (loggedIn) {
      MovisApi
        .getInitialCards()
        .then(setCards)
        .catch(e => console.log(e));
      Api
        .getInitialSavedCards()
        .then(setSavedCards)
        .catch(e => console.log(e))
    }
  }, [loggedIn]);

  // ========= Валидация инпутов профиля
  function handlerSearchForm(e, route) {
    if (e.target.value.length === 0) {
      setSearchFormDirty(true);
      setSearchFormError('Нужно ввести ключевое слово')
    }
    else {
      setSearchFormDirty(false);
      setSearchFormError('')
    }
    setSearchForm(e.target.value)

    if (route === '/movies') {
      localStorage.setItem('searchForm', JSON.stringify({ "searchForm": e.target.value }))
    }
    if (route === '/saved-movies') {
      localStorage.setItem('searchFormSavedMovies', JSON.stringify({ "searchFormSavedMovies": e.target.value }))
    }
  }

  function handlerName(e) {
    if (e.target.value.length > 0) {
      setNameDirty(true)
    }

    setName(e.target.value);
    if (e.target.value === currentUser.name) {
      setNameError('Повторятся нельзя!')
    }
    else if (!String(e.target.value).match(/^[а-яА-Яa-zA-ZЁёәіңғүұқөһӘІҢҒҮҰҚӨҺ\-\s]*$/)) {
      setNameError('Используйте только латиницу, кириллицу, пробел или дефис.')
    }
    else if (!String(e.target.value).trim()) {
      setNameError('Имя не может быть пустым')
    }
    else { setNameError('') }
  }

  function handlerEmail(e) {
    if (e.target.value.length > 0) {
      setEmailDirty(true);
    }
    setEmail(String(e.target.value).trim());
    if (e.target.value === currentUser.email) {
      setEmailError('Повторятся нельзя!')
    }
    else if (!String(e.target.value).trim().toLowerCase().match(/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setEmailError('Емейл не корректный')
    }
    else { setEmailError('') };
  }

  function handlerPassword(e) {
    if (e.target.value.length > 0) {
      setPasswordDirty(true)
    }
    setPassword(String(e.target.value));
    if (String(e.target.value).match(/ /)) {
      setPasswordError('Пароль не может содержать пробелы')
    }
    else if (!String(e.target.value).trim()) {
      setPasswordError('Пароль не может быть пустым')
    }
    else if (e.target.value.length < 6 || e.target.value.length > 50) {
      setPasswordError('Пароль должен быть длинее 6 и меньше 50 символов')
    }
    else { setPasswordError('') }
  }


  return (
    <CurrentUserContext.Provider value={{
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
      getSavedCard,
      deleteCard,
      setSearchFormDirty,
      setSavedCards
    }}>
      <div className='page'>
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/signup'>
            <Register
              handleRegister={handleRegister}
              handleLogin={handleLogin}
              name={name}
              nameDirty={nameDirty}
              nameError={nameError}
              email={email}
              emailDirty={emailDirty}
              emailError={emailError}
              password={password}
              passwordDirty={passwordDirty}
              passwordError={passwordError}
              formValid={formValid}
              buttonDirty={buttonDirty}
              handlerName={handlerName}
              handlerEmail={handlerEmail}
              handlerPassword={handlerPassword}
              setButtonDirty={setButtonDirty}
              setFormValid={setFormValid}
            />
          </Route>
          <Route path='/signin'>
            <Login
              handleLogin={handleLogin}
              email={email}
              handlerEmail={handlerEmail}
              emailDirty={emailDirty}
              emailError={emailError}
              password={password}
              handlerPassword={handlerPassword}
              passwordDirty={passwordDirty}
              passwordError={passwordError}
              buttonDirty={buttonDirty}
              formValid={formValid}
              setButtonDirty={setButtonDirty}
              setFormValid={setFormValid}
            />
          </Route>
          <ProtectedRoute exact path='(|/saved-movies|/profile|/movies|)' loggedIn={loggedIn}>
            <Route path='/movies'>
              <Movies />
            </Route>
            <Route path='/saved-movies'>
              <SavedMovies />
            </Route >
            <Route path='/profile'>
              <Profile
                handleSignOut={handleSignOut}
                email={email}
                handlerEmail={handlerEmail}
                handlerName={handlerName}
                emailDirty={emailDirty}
                emailError={emailError}
                name={name}
                nameDirty={nameDirty}
                nameError={nameError}
                setFormValid={setFormValid}
                updateProfiles={updateProfiles}
                setButtonDirty={setButtonDirty}
                buttonDirty={buttonDirty}
                formValid={formValid}
                setEmail={setEmail}
                setName={setName}
              />
            </Route>
          </ProtectedRoute>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
