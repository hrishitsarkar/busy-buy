import { useEffect } from "react";
import { useUserValue } from "../userContext";
import SyncLoader from "react-spinners/SyncLoader";
import { useProductValue } from "../productContext";
import ProductCard from "../Components/ProductCard";


const Home = () => {
    //destructuring from user context
    const { loading, setLoading, setPageToggler ,isLoggedIn} = useUserValue();
    //destructuring from product context
    const { handleRange, productFilter, getCart, searchTerm, selectedPriceRange, handleChangeCheck, handleChange, setEnableSearch, category, setResults, enableSearch, results, getProducts, products, range, setRange, addProducts, handleFilter } = useProductValue();
    //getting all the products from database
    useEffect(() => {
        setLoading(true);
        setPageToggler('home')
        setTimeout(() => {
            //getting the cat if anything already
            if(isLoggedIn){
                getCart();
            }
            
            getProducts();
            setEnableSearch(false)
            
            setLoading(false);
        }, 1000)


    }, [])
    //to search and filter categories when these dependencies changes
    useEffect(() => {

        handleFilter();



    }, [productFilter, searchTerm, selectedPriceRange]);



    //loading to show spinners
    return (
        <>
            {loading ? <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full"><SyncLoader color="#060606" /></div> :
                <div className="w-full flex flex-row p-5 ">
                    <div className="w-[20%] flex flex-col items-center bg-gray-100 h-full ">
                        <h1 className="font-bold m-5 text-[2rem]">Filters</h1>
                        <h1 className="font-bold m-5">Price : {range} </h1>
                        <input className="m-5 w-[80%]" type="range" min={1} max={100000} step={1} value={selectedPriceRange} onChange={handleRange} />
                        <h1 className="font-bold m-5 text-[1.5rem] text-violet-700">Category</h1>
                        <div className="flex flex-col items-left p-2 flex-wrap">

                            <span className="flex flex-row items-center"><input type="checkbox" value='men' className="m-2" onChange={handleChangeCheck} /> <p>Mens Clothing</p></span>
                            <span className="flex flex-row items-center"><input type="checkbox" value='women' className="m-2" onChange={handleChangeCheck} /><p>Womens Clothing</p></span>
                            <span className="flex flex-row items-center"><input type="checkbox" value='electronic' className="m-2" onChange={handleChangeCheck} /><p>Electronics</p></span>
                            <span className="flex flex-row items-center"><input type="checkbox" value='book' className="m-2" onChange={handleChangeCheck} /><p>Books</p></span>
                        </div>


                    </div>
                    <div className="w-[80%] flex flex-row flex-wrap items-center justify-around">
                        {/* enableSearch is used to toggle between results array or products array */}
                        {enableSearch ? results.map((product, i) => (<ProductCard product={product} key={i} />)) : products.map((product, i) => (<ProductCard product={product} key={i} />))}



                    </div>
                </div>}</>)
}

export default Home;