import { useEffect, useRef } from 'react';

import signUp from './sign-up.jpg'
import { Link } from 'react-router-dom';

import { useUserValue } from '../userContext';
import { toast } from 'react-toastify';



const Register = () => {
    //getting ref of name,email,password field
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    //destructuring from user context
    const { createUser, loading, setLoading, setPageToggler } = useUserValue();

    //toggling page to signup
    useEffect(() => {
        setPageToggler('signup');
    })
    //function to sign up a user
    const signUpHandler = () => {
        setLoading(true);
        //getting the values of name,email,password
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        //checking for password
        if (password.length < 6) {
            toast.error('Password should be at least 6 characters');
            return;
        }
        //creating a user
        createUser(email, password);





    }
    return (<div className="flex flex-row w-full items-center justify-between p-5">
        <div className="w-[50%] flex flex-col items-center justify-center border-r-[3px]">
            <img
                className='w-[480px] h-[480px]'
                src={signUp} />
            <h1 className='m-2 font-bold text-[2rem]'>Looks like you are new here! Sign up to get started</h1>
        </div>
        <div className='w-[50%] flex flex-col items-center justify-around'>
            <input type='text' ref={nameRef} required className='outline-0 w-[50%] m-5 p-2 border-b-[3px]' placeholder='Enter Name' />
            <input type='email' pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" ref={emailRef} required className='outline-0 w-[50%] m-5 p-2 border-b-[3px]' placeholder='Enter Email' />
            <input type='password' ref={passwordRef} required className=' outline-0 w-[50%] m-5 p-2 border-b-[3px]' placeholder='Enter Password' />
            <button onClick={signUpHandler} className='w-[30%] m-5 p-2 bg-stone-950 text-white hover:bg-orange-700 hover:text-white rounded-lg' >Signup</button>
            <Link to='/sign-in' ><h1 className='font-bold text-blue-900'>Existing user? Log in</h1></Link>
        </div>


    </div>)
}
export default Register;