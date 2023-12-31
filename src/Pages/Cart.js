import { useEffect } from "react";
import ProductCard from "../Components/ProductCard"
import { useProductValue } from "../productContext";
import { useUserValue } from "../userContext";
import DotLoader from "react-spinners/DotLoader";
import empty from './empty.png'
import tick from './tick.png'
const Cart = () => {
    //destructuring from user context
    const { setLoading, loading, setPageToggler } = useUserValue();
    //destructuring from product context
    const { cart, getCart, cartTotal, total, addOrders, loadingOrders } = useProductValue();
    //fetching the items inside cart on mount
    useEffect(() => {
        //toggling to cart page
        setPageToggler("cart");
        //to show spinners
        setLoading(true);
        setTimeout(() => {
            getCart();

            setLoading(false);
        }, 1000)
    }, [])


    //calculating the cart total is cart array changes
    useEffect(() => {
        cartTotal();
    }, [cart])

    //spinner during loading state
    return (<>{loading ?
        <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full"><DotLoader color="#040405" /></div> : <div className="w-full flex flex-row ">
            <div className="w-[70%] flex flex-row flex-wrap items-left border-r-[2px] sm:w-[50%]">
                {cart.length === 0 ? <div className="w-full h-full  flex flex-col items-center justify-center"><h1 className="font-bold text-[2rem] m-5 ">Your cart is empty</h1><img className="rounded-lg m-5 " src={empty} /></div> : cart.map((c, i) => (<ProductCard product={c} key={i} />))}

            </div>
            <div className={cart.length === 0 ? "w-[30%] flex flex-col items-left p-5 hidden" : "w-[30%] flex flex-col items-left p-5"}>
                <h1 className="font-bold text-slate-500 border-b-[1px] m-5">Price Details</h1>
                <div className="w-full flex flex-row items-center m-5">
                    <h1 className="font-bold w-[50%] sm:m-2">Price ({cart.length} items)</h1>
                    <h1 className="font-bold w-[50%] sm:m-2">&#8377;{total}</h1>
                </div>

                <div className="w-full flex flex-row items-center m-5">
                    <h1 className="font-bold w-[50%] sm:m-2">Delivery</h1>
                    <h1 className=" w-[50%] text-green-700 sm:m-2">Free <span className="line-through text-black">&#8377; 40 </span></h1>
                </div>
                <hr />
                <div className="w-full flex flex-row items-center m-5 rounded-lg ">
                    <h1 className="font-bold w-[50%] sm:m-2">Total Amount</h1>
                    <h1 className="font-bold w-[50%] text-indigo-900 sm:m-2">&#8377;{total}</h1>
                </div>
                <div className="flex w-full justify-center items-center border-b-[2px]">
                    <button className="m-5 bg-orange-400 text-white w-[280px] h-[60px] font-bold hover:bg-rose-700 shadow-2xl " onClick={addOrders}>{loadingOrders ? 'Purchasing' : 'Place Order'}</button>
                </div>
                <div className="flex flex-row items-center p-5">
                    <img
                        src={tick}
                        className="w-[20px] h-[20px] m-2"
                    />
                    <h1 className="font-bold">Safe and Secure Payments.Easy returns.100% Authentic products.</h1>

                </div>
            </div>

        </div>


    }
    </>)
}
export default Cart;