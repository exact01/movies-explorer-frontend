import './Register.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Register({
  handleRegister,
  handleLogin,
  name,
  nameDirty,
  nameError,
  email,
  emailDirty,
  emailError,
  password,
  passwordDirty,
  passwordError,
  formValid,
  buttonDirty,
  handlerName,
  handlerEmail,
  handlerPassword,
  setButtonDirty,
  setFormValid }) {

  useEffect(() => {
    if (nameError || emailError || passwordError) {
      setFormValid(false)
    } else { setFormValid(true) }
  }, [nameError, emailError, passwordError, setFormValid])

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(name, email, password)
      .then(() => {
        handleLogin(email, password)
          .then(setButtonDirty({ "success": false, 'message': '', 'color': '' }))
      })
      .catch(() => {
        setButtonDirty({ "success": true, 'message': 'Произошла ошибка, попробуйте позже!', 'color': 'red' })
        setTimeout(() => { setButtonDirty({ "success": false, 'message': '', 'color': '' }) }, 8000)
      })
  }

  return (
    <div className='register'>
      <h1 className='register__welcome'>Добро пожаловать</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <fieldset className="register__set">
          <div className='register__box'>
            <label htmlFor='name' className='register__label'>Имя</label>
            <input
              value={name}
              onChange={e => handlerName(e)}
              id='name'
              className={`register__input ${(nameDirty && nameError) && 'register__input_red'}`}
              type="text"
              name="name"
              minLength="2"
              required
            />
          </div>
          <div className='register__span-error'>
            <span className='register__error'>{(nameDirty && nameError) && nameError}</span>
          </div>
          <div className='register__box'>
            <label htmlFor='email' className='register__label'>E-mail</label>
            <input
              value={email}
              onChange={e => handlerEmail(e)}
              id='email'
              className={`register__input ${(emailDirty && emailError) && 'register__input_red'}`}
              type="email"
              name="email"
              minLength="2"
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
              minLength="6"
              required
            />
          </div>
          <div className='register__span-error'>
            <span className='register__error'>{(passwordDirty && passwordError) && passwordError}</span>
          </div>
        </fieldset>
        <button disabled={!formValid} type="submit" name="save" className="register__form-submit" >Зарегистрироваться</button>
        <div className='register__span-error register__span-error_center'>
          <span className='register__error'>{buttonDirty.success && buttonDirty.message}</span>
        </div>
      </form >
      <div className='register__login'>
        <p className='register__question'>Уже зарегистрированы?</p>
        <Link to='/signin' className='register__link'>Войти</Link>
      </div>
    </div>
  )
}

export default Register;