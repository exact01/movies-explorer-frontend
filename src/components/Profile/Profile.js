import './Profile.css';
import { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function Profile({
  handleSignOut,
  email,
  handlerEmail,
  handlerName,
  emailDirty,
  emailError,
  name,
  nameDirty,
  nameError,
  setFormValid,
  updateProfiles,
  setButtonDirty,
  buttonDirty,
  formValid,
  setName,
  setEmail
}) {

  const {
    currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (nameError && emailError) {
      setFormValid(false)
    } else { setFormValid(true) }
  }, [nameError, emailError, setFormValid])


  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email)
  }, [currentUser.name, currentUser.email])

  function handleSubmit(e) {
    e.preventDefault();
    updateProfiles(name, email)
      .then(() => {
        setFormValid(false)
        setButtonDirty({ "success": true, 'message': 'Профиль обновлён!', 'color': '#2BE080' })
        setTimeout(() => { setButtonDirty({ 'success': false, 'message': '', 'color': '' }) }, 5000)
      })
      .catch(() => { setButtonDirty({ 'success': true, 'message': 'Произошла ошибка, попробуйте позже!', 'color': 'red' }) })
  }
  return (
    <div className='profile'>
      <h1 className='profile__name'>{currentUser.name}!</h1>
      <form className='profile__form' onSubmit={handleSubmit}>
        <div className='profile__group-input'>
          <input
            value={name}
            onChange={handlerName}
            placeholder='Имя'
            id='name'
            type='text'
            name='name'
            minLength='2'
            className='profile__input'
            required />
          <p className='profile__paragraph'>{currentUser.name}</p>
        </div>
        <div className='profile__error'>
          <span className='profile__error-validation'>{(nameDirty && nameError) && nameError}</span>
        </div>
        <span className='profile__line'></span>
        <div className='profile__group-input'>
          <input
            value={email}
            onChange={handlerEmail}
            placeholder='E-mail'
            type='email'
            id='email'
            name='email'
            minLength='6'
            className='profile__input'
            required />
          <p className='profile__paragraph'>{currentUser.email}</p>
        </div>
        <div className='profile__error'>
          <span className='profile__error-validation'>{(emailDirty && emailError) && emailError}</span>
        </div>
        <div className='profile__button'>
          <button disabled={!formValid} type='submit' name='edit' className='profile__button-edit'>Редактировать</button>
          <div className='profile__error profile__error_button'>
            <span className='profile__error-validation' style={{ color: buttonDirty.color }}>{buttonDirty.success && buttonDirty.message}</span>
          </div>
        </div>
      </form >
      <button type='submit' name='exit' onClick={handleSignOut} className='profile__button-exit'>Выйти из аккаунта</button>
    </div >
  )
}

export default Profile;