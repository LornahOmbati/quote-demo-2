import React, { createContext, useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Firebase auth instance
import { doc, getDoc } from 'firebase/firestore'; // For Firestore document access
import { db } from '../firebase'; // Ensure you have a `firebase.js` file exporting the Firestore instance


export const AuthContext = createContext({
  userRole: null,
  setUserRole: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // Store user role
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Store authentication state
  const [loading, setLoading] = useState(true); // For avoiding flicker during auth check

  useEffect(() => {
    // Check authentication state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);

        // Retrieve role from Firestore if needed
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUserRole(null);
      setIsAuthenticated(false);
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  if (loading) return <div>Loading...</div>; // Optional: A loading spinner while auth state initializes

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
