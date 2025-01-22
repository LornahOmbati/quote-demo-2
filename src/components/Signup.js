// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '../firebase'; // Import Firebase auth and provider
import { signInWithPopup } from 'firebase/auth';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const { signup } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered:', userCredential.user.email);
        alert('Signup successful. You can now log in!');
        navigate('/'); // Redirect to login page
    } catch (error) {
        console.error('Error during signup:', error.message);
        if (error.code === 'auth/email-already-in-use') {
            setError('This email is already in use. Please log in.');
        } else {
            setError('Failed to sign up. Please try again.');
        }
    }
};

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // You can handle user info here if needed
      navigate('/'); // Redirect after successful signup
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return (
    <div className="auth-form">
      <h1>Sign Up</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignup}>
        <label>Email:</label>
        <input 
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <label>Password:</label>
        <input 
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        
        <button type="submit" style={{ marginBottom: '8px' }}>Sign Up</button>    
       </form>
        {/* <div style={{ margin: '8px 0', textAlign: 'center' }}>
          <span>or</span>
        </div> */}
        <button 
  onClick={handleGoogleSignup} 
  style={{ color: 'white', backgroundColor: 'black', border: '1px solid black', padding: '10px', cursor: 'pointer' }}
>
  Continue with Google
</button>          
  <p>Already have an account? <a href="/login">Log in</a></p>
  </div>
  );
}

export default Signup;
