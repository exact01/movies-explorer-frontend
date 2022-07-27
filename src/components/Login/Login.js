import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
function Login({
  handleLogin,
  email,
  handlerEmail,
  emailDirty,
  emailError,
  password,
  handlerPassword,
  passwordDirty,
  passwordError,
  buttonDirty,
  formValid,
  setButtonDirty,
  setFormValid,
  loggedIn,
}) {

  const {
    setName,
    setEmail,
    setPassword
  } = useContext(CurrentUserContext);

  const history = useHistory()
  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('')
    if (loggedIn) {
      history.push('/movies');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else { setFormValid(true) }
  }, [emailError, passwordError, setFormValid])

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    handleLogin(email, password)
      .then(setButtonDirty({ "success": false, 'message': '', 'color': '' }))
      .catch((err) => {
        setButtonDirty({ "success": true, 'message': 'Произошла ошибка, попробуйте позже!', 'color': 'red' })
        setTimeout(() => { setButtonDirty({ "success": false, 'message': '', 'color': '' }) }, 8000)
      })
  }

  return (
    <div className='register'>
      <h1 className='register__welcome'>Рады видеть!</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <fieldset className="register__set">
          <div className='register__box'>
            <label htmlFor='email' className='register__label'>E-mail</label>
            <input
              value={email}
              onChange={e => handlerEmail(e)}
              id='email'
              className={`register__input ${(emailDirty && emailError) && 'register__input_red'}`}
              type="email"
              name="email"
              minLength="6"
              required
            />
          </div>
          <div className='register__span-error'>
            <span className='register__error'>{(emailDirty && emailError) && emailError}</span>
          </div>
          <div className='register__box'>
            <label htmlFor='password' className='register__label'>Пароль</label>
            <input
              value={password}
              onChange={e => handlerPassword(e)}
              id='password'
              type="password"
              className={`register__input ${(passwordDirty && passwordError) && 'register__input_red'}`}
              name="password"
              required
            />
          </div>
          <div className='register__span-error'>
            <span className='register__error'>{(passwordDirty && passwordError) && passwordError}</span>
          </div>
        </fieldset>
        <button disabled={!formValid} type="submit" name="save" className="register__form-submit register__form-submit_login">Войти</button>
        <div className='register__span-error register__span-error_center'>
          <span className='register__error'>{buttonDirty.success && buttonDirty.message}</span>
        </div>
      </form >
      <div className='register__login'>
        <p className='register__question'>Ещё не зарегистрированы?</p>
        <Link to='/signup' className='register__link'>Регистрация</Link>
      </div>
    </div>
  )
}

export default Login;