import { useEffect } from "react";
import ProductCard from "../Components/ProductCard"
import { useProductValue } from "../productContext";
import { useUserValue } from "../userContext";
import DotLoader from "react-spinners/DotLoader"; 
import empty from './empty.png'
const Cart = () => {
    
    const {setLoading,loading,setPageToggler} = useUserValue();
    useEffect(()=>{
        setPageToggler("cart");
        setLoading(true);
        setTimeout(()=>{
            getCart();
            setLoading(false);
        },1000)
    },[])
    const {cart,getCart} = useProductValue();
    console.log(cart)
    
    return (<>{loading ? 
        <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full"><DotLoader color="#040405" /></div> : <div className="w-full flex flex-col items-center">
    <div className="flex flex-row flex-wrap items-center">
    {cart.length === 0 ? <div className="w-full h-full  flex flex-col items-center justify-center"><h1 className="font-bold text-[2rem] m-5 ">Your cart is empty</h1><img className="rounded-lg m-5 "  src={empty}/></div> : cart.map((c, i) => (<ProductCard product={c} key={i} />))}
    
    </div>
</div> }</>)
}
export default Cart;