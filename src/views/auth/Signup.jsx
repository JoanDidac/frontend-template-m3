import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './Signup.css';

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: ''
  })
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // const lightningEffect = () => {
  //   const lightningColors = ["#fff", "#333", "#666"];
  //   const randomIndex = () => Math.floor(Math.random() * lightningColors.length);
  
  //   const h1 = document.querySelector(".metal-gradient");
  //   h1.style.background = `linear-gradient(45deg, ${lightningColors[randomIndex()]}, ${lightningColors[randomIndex()]}, ${lightningColors[randomIndex()]})`;
  
  //   setTimeout(() => {
  //     h1.style.background = `linear-gradient(45deg, #333, #666, #333)`;
  //   }, 200);
  // };
  
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     lightningEffect();
  //   }, 3000); // Adjust the timing for the lightning effect as desired
  
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);
  

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match")
    } else {
      setErrorMessage(undefined)
    }
  }, [passwordControl, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup({ username: user.username, email: user.email, password });
      navigate('/login');
    } catch (error) {
      console.error(error)
      setErrorMessage('Unable to create user account')
    }
  }

  return (
   
    <div className='login-page login-form-container ' >
    <div className='signup-title'>
   <h1 className='metal-gradient'> Welcome to Sky Pulse</h1>
   
     <video
        className='background-video background-video-signup'
        autoPlay
        loop
        muted
      >
        <source
          src="https://res.cloudinary.com/ddcimekqb/video/upload/v1681432281/city-timelapse_bg04ol.mp4"
          type="video/mp4"
        />
      </video>
      
      <form className='login-form' onSubmit={handleSubmit}>
        <label>Username</label>
        <input required type="text" name="username" value={user.username} onChange={handleChange} />
        <label>Email</label>
        <input required type="email" name="email" value={user.email} onChange={handleChange} />
        <label>Password</label>
        <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } />
        <label>Repeat the password</label>
        <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Register</button>
        <a href='/login'>Alredy have an account? <strong>☞ Login</strong></a>
      </form>
    </div>
    </div>


  )
}

