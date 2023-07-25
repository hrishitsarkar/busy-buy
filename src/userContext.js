import { createContext, useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//creating user context
export const userContext = createContext();
//creating a custom hook to get the value
export const useUserValue = () => {
    const value = useContext(userContext);
    return value;
}
//creating user provider
export const UserProvider = ({ children, uid, setUid }) => {
    //if a user looged in or not
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //to show spinner whenever required
    const [loading, setLoading] = useState(false);
    //to toggle the pages
    const [pageToggler, setPageToggler] = useState("home");
    //useNavigate hook
    const navigate = useNavigate();
    //function to sign out user
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
    //funtion to create a user
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
    //funtion to sign in an existing user
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

    return (<userContext.Provider value={{ pageToggler, setPageToggler, uid, loading, setLoading, createUser, signInUser, isLoggedIn, setIsLoggedIn, signOutUser }}>
        {children}

    </userContext.Provider>)
}