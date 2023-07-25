import { useEffect, useRef } from 'react';
import { useProductValue } from '../productContext';
import signUp from './sign-up.jpg'
import { Link } from 'react-router-dom';
import { auth } from '../firebaseInIt';
import { useUserValue } from '../userContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const { createUser ,loading,setLoading ,setPageToggler} = useUserValue();
    const navigate = useNavigate();
    useEffect(() => {
        setPageToggler('signup');
    })

    const signUpHandler = () => {
        setLoading(true);
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;


        if (password.length < 6) {
            toast.error('Password should be at least 6 characters');
            return;
        }
        createUser(email, password);





    }
    return (<div className="flex flex-row w-full items-center justify-between p-5">
        <div className="w-[50%] flex flex-col items-center justify-center border-r-[3px]">
            <img
                className='w-[480px] h-[480px]'
                src={signUp} />
            <h1 className='m-2 font-bold text-[2rem]'>Looks like you are new here! Sign up to get started</h1>
        </div>
        <div  className='w-[50%] flex flex-col items-center justify-around'>
            <input type='text' ref={nameRef} required className='outline-0 w-[50%] m-5 p-2 border-b-[3px]' placeholder='Enter Name' />
            <input type='email' pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" ref={emailRef} required className='outline-0 w-[50%] m-5 p-2 border-b-[3px]' placeholder='Enter Email' />
            <input type='password' ref={passwordRef} required className=' outline-0 w-[50%] m-5 p-2 border-b-[3px]' placeholder='Enter Password' />
            <button onClick={signUpHandler} className='w-[30%] m-5 p-2 bg-stone-950 text-white hover:bg-orange-700 hover:text-white rounded-lg' >Signup</button>
            <Link to='/sign-in' ><h1 className='font-bold text-blue-900'>Existing user? Log in</h1></Link>
        </div>


    </div>)
}
export default Register;