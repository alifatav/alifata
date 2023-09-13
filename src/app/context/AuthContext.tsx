'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@alifata/app/lib/firebase'; 

type User = {
 uid: string;
 displayName: string;
 email: string;
}

type AuthContextProps = {
 user: User | null;
 loading: boolean;
 login: (email: string, password: string) => Promise<void>;
 loginWithGoogle: () => Promise<void>;
 logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if(currentUser){
     setUser({
      uid: currentUser.uid,
      displayName: currentUser.displayName || '',
      email: currentUser.email || '',
     });
     setLoading(false);
    } else {
     setUser(null);
    }
   })

   return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
   await signInWithEmailAndPassword(auth,email, password)
  };

  const loginWithGoogle = async () => {
   const provider = new GoogleAuthProvider();
   await signInWithPopup(auth, provider)
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = { user, loading, login, loginWithGoogle, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in AuthProvider");
  }
  return context;
}
