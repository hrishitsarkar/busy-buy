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
    {orders.map((order) => (
        <div className="h-[100px] flex flex-row items-center border-8 justify-between w-full m-5">
        <h1 className="font-bold">{order.name}</h1>
        <h1>{order.price}</h1>
        <h1 >Ordered on :{order.orderedAt}</h1>
        <h1>x{order.qty}</h1>
    </div>))}
    
    </div>)
}

//     <div className="flex flex-row items-center">
//     <h1>{}</h1>
// </div>) 
// )
export default Order;