import React, { useState } from 'react'
import { loginUser, signupUser } from '../Services/authService';


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const toggleLogin = () => setIsLogin(!isLogin);

  // Input changes 
  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    })
  }

  // Submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const response = await loginUser(formData.email, formData.password);
      console.log('Login response: ', response);
    } else {
      const response = await signupUser(formData);
      console.log('Signup response response: ', response);
    }
  }

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{isLogin ? "Login" : "Signup"}</div>
        <div className='underline'></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='input'>
          {!isLogin && (
            <>
              {/* Username */}
              <div className='input'>
                <label htmlFor="username" className='form-label'>Username:</label>              
                <input 
                  id='username'
                  type='text' 
                  name="username" 
                  placeholder="Username"
                  className='form-control' 
                  value={formData.username} 
                  onChange={handleChange}
                  required
                />
              </div>
              {/* First name */}
              <div className='input'>
                <label htmlFor='firstname' className='form-label'>First name:</label>                         
                <input 
                  id='firstname'
                  type='text' 
                  name="firstname" 
                  placeholder="firstname" 
                  className='form-control'
                  value={formData.firstname} 
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Last name */}
              <div className='input'>
                <label htmlFor='lastname' className='form-label'>Last name:</label>                         
                <input 
                  id='lastname'
                  type='text' 
                  name="lastname" 
                  placeholder="lastname" 
                  className='form-control'
                  value={formData.lastname} 
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {/* Email */}
          <div className='input'>
            <label htmlFor="email" className='form-label'>Email:</label>              
            <input 
              id='email'
              type='email' 
              name="email" 
              placeholder="Email" 
              className='form-control'
              value={formData.email} 
              onChange={handleChange}
              required
            />
          </div>
          {/* Password */}
          <div className='input'>
            <label htmlFor="password" className='form-label'>Password:</label>              
            <input 
              id='password'
              type='password' 
              name="password" 
              placeholder="Password" 
              className='form-control'
              value={formData.password} 
              onChange={handleChange}
              required
            />
          </div>
          <div className="forgot-password">Forget Password? <span>Click here</span></div>
          <button type='submit'>{isLogin ? "Login" : "Signup"}</button>
        </div>
        <p className='text-muted mt-3'>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={toggleLogin} style={{cursor: 'pointer', color:'blue'}}> {isLogin ? "Signup" : "Login"}</span>
        </p>
      </form>
    </div>
  )
}

export default AuthPage
