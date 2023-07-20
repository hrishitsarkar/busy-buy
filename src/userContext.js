import { createContext, useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const userContext = createContext();

export const useUserValue = () => {
    const value = useContext(userContext);
    return value;
}

export const UserProvider = ({ children,uid,setUid }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading,setLoading] = useState(false);
    const [pageToggler,setPageToggler] = useState("home");
    
    const navigate = useNavigate();
    const signOutUser = () => {
        setLoading(true);
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.

            setIsLoggedIn(false);
            setUid('');
            toast.success('Sign out successful');
            setTimeout(() => {
                navigate('/sign-in');
            }, 1000)

        }).catch((error) => {
            // An error happened.
        });
    }
    const createUser = (email, password) => {
        
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                // Signed in 
                const user = userCredential.user;
                
                toast.success('Account created successfully');
                
                setTimeout(() => {
                    
                    navigate('/sign-in');

                    
                    
                    
                }, 1000)
                
                


                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (error) {
                    toast.error('Enter a valid email')
                }
                // ..
            });
    }

    const signInUser = (email, password) => {

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setIsLoggedIn(true);
                setUid(user.uid);
                toast.success('Log in successful');
                setTimeout(() => {
                    
                    navigate('/');
                }, 1000);


                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (error) {
                    setLoading(false);
                    toast.error('Wrong email/password')
                }
            });



    }

    return (<userContext.Provider value={{pageToggler,setPageToggler,uid,loading,setLoading, createUser, signInUser, isLoggedIn, setIsLoggedIn, signOutUser }}>
        {children}

    </userContext.Provider>)
}