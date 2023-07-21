import bb from './a-dark.jpg'
import search from './s.png'
import { Link, Outlet } from 'react-router-dom'

import { useUserValue } from '../userContext'
import { useProductValue } from '../productContext'

const Navbar = () => {
    const { isLoggedIn,signOutUser,uid, } = useUserValue();
    const {handleChange} = useProductValue();
    
    
    return (
        <>
            <div className="w-full h-[100px] flex items-center justify-between p-2"  >
                <Link to='/'><div className='flex flex-row items-center'>
                    <img
                        src={bb}
                        alt='logo'
                        className='w-[50px] h-[50px] m-1' />
                    <div className='flex flex-col items-start m-1'>
                        <h1 className='font-bold text-[2rem]'>Busy Buy</h1>
                        <p className='text-[1rem]'>Hrishit</p>
                    </div>

                </div>
                </Link>
                <div className='w-[50%] flex flex-row items-center bg-slate-200 rounded-lg'>
                    <img
                        src={search}
                        className='w-[30px] h-[30px]'
                        alt='search'
                    />
                    <input
                        onChange={handleChange}
                        type='search'
                        placeholder='Search by name'
                        className='w-full outline-0 p-2 bg-inherit rounded-lg'
                    />
                </div>
                <div className={isLoggedIn ? 'flex flex-row items-center p-2 hover:bg-zinc-950 hover:text-white rounded-lg' : 'flex flex-row items-center p-2 hover:bg-zinc-950 hover:text-white rounded-lg hidden'}>
                    <span className='m-1'><i className="fa-solid fa-box"></i></span>
                    <button className='m-1' >Orders</button>
                </div>
                <Link to='/sign-in'>
                    {!isLoggedIn ? <div id='sign-in'
                        className='flex flex-row items-center hover:bg-indigo-700 hover:text-white p-2 rounded-lg'>
                        <span><i className="fa-solid fa-user"></i></span>
                        <button className='m-1' >Sign in</button>
                        <span className='icon '><i className="fa-solid fa-angles-right"></i></span>
                    </div> : 
                    <div id='sign-in' onClick={signOutUser}
                        className='flex flex-row items-center hover:bg-indigo-700 hover:text-white p-2 rounded-lg'>
                        <span><i className="fa-solid fa-right-from-bracket"></i></span>
                        <button className='m-1'>Sign out</button>
                        <span className='icon '><i className="fa-solid fa-angles-right"></i></span>
                    </div>}
                </Link>
                <Link to={isLoggedIn ? `/userCarts/${uid}/myCart` : '/sign-in'}><div className='flex flex-row items-center p-2 rounded-lg hover:text-violet-800'>
                    <span><i className="fa-solid fa-cart-shopping"></i></span>
                    <button className='m-1' >Cart</button>

                </div>
                </Link>

            </div>
            <Outlet />
        </>
    )
}

export default Navbar;