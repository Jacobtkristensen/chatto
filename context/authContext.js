import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../util/firebase';
import { set } from 'firebase/database';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContex = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        // onAuthStateChanged 
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);

    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({ ...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId})
        }
    };

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (e) {
            return { success: false, msg: e.message };
        }
    }
    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (e) {
            return { success: false, msg: e.message };
        }
    }
    const register = async (email, password, username, profileUrl) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user :', res?.user);

            await setDoc(doc(db, 'users', res?.user?.uid), {
                username,
                profileUrl,
                userId: res?.user?.uid,
            });
            return { success: true, data: res?.user };
        } catch (e) {
            return { success: false, msg: e.message };
        }
    }
    return (
        <AuthContex.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContex.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContex);

    if (!value) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return value;
}