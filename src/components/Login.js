import React, { useState, useContext } from 'react';
import { auth, db, provider } from '../firebase'; // Firebase imports
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { signInWithPopup } from 'firebase/auth';

function Login() {
    const { signup } = useContext(AuthContext); // `signup` for Google account
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserRole } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Retrieve user role from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const role = userDoc.data().role; // 'clientA' or 'clientB'
                setUserRole(role); // Store role in context
                navigate('/'); // Navigate to home page
            } else {
                setError('No user data found in Firestore.');
                console.error('No user data found');
            }
        } catch (error) {
            setError('Invalid email or password.');
            console.error('Error logging in:', error.message);
        }
    };

    // Handle Google login via Firebase
    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            // Assuming you want to store the Firebase Google user in cookies as well
            const userData = {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            };
        
            // Call signup to store Google user in cookies
            signup(userData.email, 'google-oauth'); // Using 'google-oauth' as a dummy password
        
            // Store first-time login flag in localStorage
            if (!localStorage.getItem('hasAgreedToTerms')) {
                localStorage.setItem('firstLogin', 'true');
            }
            
            navigate('/'); // Redirect to home page after successful login
        } catch (error) {
            console.error("Error signing in with Google: ", error);
            setError("Error signing in with Google. Please try again.");
        }
    };

    const handleForgotPassword = () => {
        // Placeholder functionality for password reset
        alert('Password reset link has been sent to your email.');
    };

    return (
        <div className="auth-form">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" style={{ marginBottom: '8px' }}>Login</button>
            </form>

            {/* Google Sign-in */}
            <button 
                onClick={handleGoogleSignup} 
                style={{ color: 'white', backgroundColor: 'black', border: '1px solid black', padding: '10px', cursor: 'pointer' }}
            >
                Continue with Google
            </button>
            <p>
                Don't have an account? <a href="/signup">Sign up here</a>.
            </p>

            <p>
                Forgot your password?{' '}
                <span onClick={handleForgotPassword} style={{ color: 'blue', cursor: 'pointer' }}>
                    Reset it here.
                </span>
            </p>
            <p style={{ color: 'red', marginTop: '16px' }}>
                Contact the developer to access demo.
            </p>
        </div>
    );
}

export default Login;
