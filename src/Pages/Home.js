import { useEffect } from "react";
import { useUserValue } from "../userContext";
import SyncLoader from "react-spinners/SyncLoader";
import { useProductValue } from "../productContext";
import ProductCard from "../Components/ProductCard";


const Home = () => {
    const { loading, setLoading, setPageToggler } = useUserValue();
    const {handleRange, productFilter,checkBox,searchTerm,selectedPriceRange,handleChangeCheck,handleChange,setEnableSearch,category,setResults,enableSearch, results, getProducts, products, range, setRange, addProducts, handleFilter } = useProductValue();
    console.log('res',results)
    useEffect(() => {
        setLoading(true);
        setPageToggler('home')
        setTimeout(() => {
           
                getProducts();

            
            setLoading(false);
        }, 1000)


    }, [])
    useEffect(() => {
        
        handleFilter();
        
        
        
      }, [productFilter,searchTerm]);
    useEffect(()=>{
        if(results.length === 0){
            setEnableSearch(false)
        }
    },[results])
    
    return (<>
        {loading ? <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full"><SyncLoader color="#060606" /></div> :
            <div className="w-full flex flex-row p-5 ">
                <div className="w-[20%] flex flex-col items-center bg-gray-100 h-full ">
                    <h1 className="font-bold m-5 text-[2rem]">Filters</h1>
                    <h1 className="font-bold m-5">Price : {range} </h1>
                    <input className="m-5 w-[80%]"  type="range" min={1} max={100000} step={1} value={range} onChange={handleRange} />
                    <h1 className="font-bold m-5 text-[1.5rem] text-violet-700">Category</h1>
                    <div className="flex flex-col items-left p-2 flex-wrap">

                        <span className="flex flex-row items-center"><input type="checkbox" value='men' className="m-2" onChange={handleChangeCheck} /> <p>Mens Clothing</p></span>
                        <span className="flex flex-row items-center"><input type="checkbox" value='women' className="m-2" onChange={handleChangeCheck} /><p>Womens Clothing</p></span>
                        <span className="flex flex-row items-center"><input type="checkbox" value='electronic' className="m-2" onChange={handleChangeCheck} /><p>Electronics</p></span>
                        <span className="flex flex-row items-center"><input type="checkbox" value='book' className="m-2" onChange={handleChangeCheck} /><p>Books</p></span>
                    </div>


                </div>
                <div className="w-[80%] flex flex-row flex-wrap items-center justify-around">
                    {enableSearch ? results.map((product, i) => (<ProductCard product={product} key={i} />)) : products.map((product, i) => (<ProductCard product={product} key={i} />))}

                </div>
            </div>}
    </>)
}
export default Home;