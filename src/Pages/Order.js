import { useEffect } from "react";
import { useProductValue } from "../productContext";
import { MoonLoader } from "react-spinners";
import { useUserValue } from "../userContext";
const Order = () => {
    useEffect(()=>{
        setLoadingOrders(true);
        setPageToggler('orders')
        setTimeout(()=>{
            getOrders();
            setLoadingOrders(false);
        },1000)
        
    },[])
    const {getOrders,orders,setLoadingOrders,loadingOrders} = useProductValue();
    const {setPageToggler} = useUserValue();
    
   console.log(orders)
    return (<>{loadingOrders ? <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full">
    <MoonLoader color="#010202" /></div> : <div className="w-full flex flex-col items-center">
    <h1 className="font-bold text-[3rem]">Your Orders</h1>
    {orders.map((order) => (<>
        <div className="w-full flex flex-col items-center border-8 p-2 m-5">
        {order.items.map((o) => (<div className="h-[100px] flex flex-row items-center justify-between  w-full m-5">
            
            <div className="w-[6%] flex items-center sm:w-[15%]"><img src={o.url} className="w-[100%] h-[120px]  "/></div>
            <div className="flex w-[20%] items-start overflow-hidden sm:hidden"><h1 className="">{o.name}</h1></div>
            <div className="flex w-[20%] items-start overflow-hidden"><h1 className="">&#8377;{o.price}</h1></div>
            <div className="flex w-[20%] items-start overflow-hidden"><h1 className="">x{o.qty}</h1></div>
            <div className="flex w-[20%] items-start overflow-hidden"><h1 className="">Total price : &#8377;{o.price * o.qty}</h1></div>
            </div>
        ))}
        
        </div>
        <div className="flex flex-row items-center">
        <h1 className="font-bold m-5 text-red-800">Total : &#8377;{order.total}</h1>
        <h1 className="font-bold m-5 text-indigo-800">Ordered on : {order.orderedAt}</h1>
        </div>
        </>
    ))}
    </div>}
    </>
    )
}


export default Order;