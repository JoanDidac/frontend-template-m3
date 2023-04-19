import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './Login.css';

export default function Login() {
  const { storeToken, authenticateUser, isLoggedIn } = useAuth(); 
  const [formVisible, setFormVisible] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(user)
      if (response.authToken) {
        storeToken(response.authToken);
        authenticateUser();
        navigate('/');
        toast.success('Welcome back!')
      } else {
        setErrorMessage('Unable to authenticate user')
      }
    } catch (error) {
      setErrorMessage('Unable to authenticate user');
    }
  }

  useEffect(() => {
    // When the component first renders, check if user is already logged in and redirects
    if (isLoggedIn) {
      navigate('/')
    } else {
      setTimeout(() => setFormVisible(true), 2000);
    }

    // eslint-disable-next-line
  }, [isLoggedIn])

  return (
    <div className="login-page">
      <video className="background-video" autoPlay loop muted>
        <source src="https://res.cloudinary.com/ddcimekqb/video/upload/v1681432428/rocky-passage_pykzr5.mp4" type="video/mp4" />
      </video>
      {formVisible && (
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
          <h1>Log in</h1>
            <label>Email</label>
            <input required type="email" name="email" value={user.email} onChange={handleChange} />
            <label>Password</label>
            <input required type="password" name="password" value={user.password} onChange={handleChange} />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">Log in</button>
          </form>
        </div>
      )}
    </div>
  )
}
