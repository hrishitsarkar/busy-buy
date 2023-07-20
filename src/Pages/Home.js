import { useEffect } from "react";
import { useUserValue } from "../userContext";
import SyncLoader from "react-spinners/SyncLoader";
import { useProductValue } from "../productContext";
import ProductCard from "../Components/ProductCard";


const Home = () => {
    const { loading, setLoading,setPageToggler } = useUserValue();
    const { getProducts, products, range, setRange,addProducts } = useProductValue();

    useEffect(() => {
        setLoading(true);
        setPageToggler('home')
        setTimeout(()=>{
            getProducts();
            setLoading(false);
        },1000)
        

    }, [])
    console.log(products);
    return (<>
        {loading ? <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full"><SyncLoader color="#060606" /></div> :
            <div className="w-full flex flex-row p-5 ">
                <div className="w-[20%] flex flex-col items-center bg-gray-100 h-full ">
                    <h1 className="font-bold m-5 text-[2rem]">Filters</h1>
                    <h1 className="font-bold m-5">Price : {range} </h1>
                    <input className="m-5 w-[80%]" type="range" min={1} max={100000} step={1} value={range} onChange={(e) => setRange(Number(e.target.value))} />
                    <h1 className="font-bold m-5 text-[1.5rem] text-violet-700">Category</h1>
                    <div className="flex flex-col items-left p-2 flex-wrap">
                    <span className="flex flex-row items-center"><input type="checkbox" className="m-2" /> <p>Mens Clothing</p></span>
                        <span className="flex flex-row items-center"><input type="checkbox" className="m-2" /><p>Womens Clothing</p></span>
                        <span className="flex flex-row items-center"><input type="checkbox" className="m-2" /><p>Electronics</p></span>
                        <span className="flex flex-row items-center"><input type="checkbox"  className="m-2" /><p>Books</p></span>
                    </div>


                </div>
                <div className="w-[80%] flex flex-row flex-wrap items-center justify-around">
                    {products.map((product, i) => (<ProductCard product={product} key={i} />))}
                </div>
            </div>}
    </>)
}
export default Home;