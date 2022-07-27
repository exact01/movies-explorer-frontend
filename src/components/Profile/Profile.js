/* eslint-disable react-hooks/exhaustive-deps */
import './Profile.css';
import { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useLocation } from 'react-router-dom';

function Profile({
  handleSignOut,
  emailDirty,
  emailError,
  nameDirty,
  nameError,
  updateProfiles,
  setButtonDirty,
  buttonDirty,
  handlerEmail,
  handlerName
}) {
  const {
    currentUser,
    setFormValidProfile,
    setEmailProfile,
    setNameProfile,
    nameProfile,
    emailProfile,
    formValidProfile,
  } = useContext(CurrentUserContext);

  const location = useLocation();

  useEffect(() => {
    setNameProfile(currentUser.name)
    setEmailProfile(currentUser.email)
  }, [currentUser]);

  useEffect(() => {
    if (!nameError) {
      setFormValidProfile(true)

    } else if (!emailError) {
      setFormValidProfile(true)
    }
    else { setFormValidProfile(false) }
  }, [nameError, emailError])

  function handleSubmit(e) {
    e.preventDefault();
    updateProfiles(nameProfile, emailProfile)
      .then(() => {
        setFormValidProfile(false)
        setButtonDirty({ "success": true, 'message': 'Профиль обновлён!', 'color': '#2BE080' })
        setTimeout(() => { setButtonDirty({ 'success': false, 'message': '', 'color': '' }) }, 5000)
      })
      .catch(() => { setButtonDirty({ 'success': true, 'message': 'Произошла ошибка, попробуйте позже!', 'color': 'red' }) })
  }
  return (
    <div className='profile'>
      <h1 className='profile__name'>{currentUser.name}!</h1>
      <form className='profile__form' onSubmit={(e) => handleSubmit(e)}>
        <div className='profile__group-input'>
          <input
            value={nameProfile || ''}
            onChange={(e) => handlerName(e, location.pathname)}
            placeholder='Имя'
            id='name'
            type='text'
            name='name'
            minLength='2'
            className='profile__input'
            required />
          <p className='profile__paragraph'>Имя</p>
        </div>
        <div className='profile__error'>
          <span className='profile__error-validation'>{(nameDirty && nameError) && nameError}</span>
        </div>
        <span className='profile__line'></span>
        <div className='profile__group-input'>
          <input
            value={emailProfile || ''}
            onChange={(e) => handlerEmail(e, location.pathname)}
            placeholder='Email'
            type='email'
            id='email'
            name='email'
            minLength='6'
            className='profile__input'
            required />
          <p className='profile__paragraph'>Email</p>
        </div>
        <div className='profile__error'>
          <span className='profile__error-validation'>{(emailDirty && emailError) && emailError}</span>
        </div>
        <div className='profile__button'>
          <button disabled={!formValidProfile} type='submit' name='edit' className='profile__button-edit'>Редактировать</button>
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