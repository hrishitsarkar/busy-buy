import { useEffect, useRef } from 'react'
import signIn from './sign-in.png'
import { Link, useNavigate } from 'react-router-dom'
import { useUserValue } from '../userContext';
import { SyncLoader } from 'react-spinners';
const SignIn = () => {
    
    const emailRef = useRef();
    const passwordRef = useRef();

    const { signInUser, setIsLoggedIn,loading,setLoading ,setPageToggler} = useUserValue();
    useEffect(()=>{
        setPageToggler('signin');
            setTimeout(()=>{
                setLoading(false);
            },1000)
            
    },[])
    const signInHandler = () => {
        setLoading(true);
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInUser(email, password);
    }

    return (
        <>
        {loading ? <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full"><SyncLoader color="#050504"  /></div> :  <div className="flex flex-row w-full items-center justify-between p-5">
        <div className="w-[50%] flex flex-col items-center justify-center border-r-[3px]">
            <h1 className='m-2 font-bold text-[2rem]'>Sign In</h1>
            <img
                className='m-2'
                src={signIn} />
            <h1 className='m-2 font-bold text-[2rem]'>Get access to your Orders,Cart & More</h1>
        </div>
        <div  className='w-[50%] flex flex-col items-center justify-around'>
            <input type='email' ref={emailRef} required className='outline-0 w-[50%] m-5 p-2 border-b-[3px]' placeholder='Enter Email' />
            <input type='password' ref={passwordRef} required className=' outline-0 w-[50%] m-5 p-2 border-b-[3px]' placeholder='Enter Password' />
            <button onClick={signInHandler} className='w-[30%] m-5 p-2 bg-stone-950 text-white hover:bg-orange-700 hover:text-white rounded-lg' >Submit</button>
            <Link to='/sign-up' ><h1 className='font-bold text-blue-900'>New to BusyBuy ? Create an account</h1></Link>
        </div>


    </div>
    }
    </>
    )
}
export default SignIn