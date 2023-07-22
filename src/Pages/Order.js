import { useEffect } from "react";
import { useProductValue } from "../productContext";

const Order = () => {
    useEffect(()=>{
        getOrders();
    },[])
    const {getOrders,orders} = useProductValue();
    
    
   console.log(orders)
    return (<div className="w-full flex flex-col items-center">
    <h1 className="font-bold text-[3rem]">Your Orders</h1>
    {orders.map((order) => (<>
        <div className="w-full flex flex-col items-center border-8 p-2 m-5">
        {order.items.map((o) => (<div className="h-[100px] flex flex-row items-center justify-between  w-full m-5">
            <img src={o.url} className="w-[100px] h-[120px] "/>
            <h1 className="">{o.name}</h1>
            <h1 className="">&#8377;{o.price}</h1>
            <h1 className="">x{o.qty}</h1>
            <h1 className="">Total price : &#8377;{o.price * o.qty}</h1>
            </div>
        ))}
        
        </div>
        <div className="flex flex-row items-center">
        <h1 className="font-bold m-5 text-red-800">Total : &#8377;{order.total}</h1>
        <h1 className="font-bold m-5 text-indigo-800">Ordered on : {order.orderedAt}</h1>
        </div>
        </>
    ))}
   
    
    </div>)
}

//     <div className="flex flex-row items-center">
//     <h1>{}</h1>
// </div>) 
// )
export default Order;