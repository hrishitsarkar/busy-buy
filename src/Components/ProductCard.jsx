
import { useProductValue } from "../productContext";
import { useUserValue } from "../userContext";

const ProductCard = ({ product }) => {
    //destructuring from user context
    const { isLoggedIn, pageToggler } = useUserValue();
    //destructuring from product context
    const { decQty, addQty, removeFromCart, addToCart, navigate, loadingProduct } = useProductValue();
    //rendering a product card
    return (<div id="card" className=" cursor-pointer transition ease-in-out delay-150 border flex flex-col w-[300px] items-left p-5 m-5 shadow-2xl ">
        <img
            src={product.url}
            className="w-[200px] h-[300px] m-2" />
        <h1 className="font-bold m-2">{product.name}</h1>
        <h1 className="font-bold m-2">&#8377;{pageToggler === 'cart' ? Number(product.price) * product.qty : product.price}</h1>
        {pageToggler === 'cart' ? <div className="flex flex-row items-center justify-center">
            <span className="m-2  " onClick={() => decQty(product)}><i className="fa-solid fa-minus"></i></span>
            <h1 className="m-2">{product.qty}</h1>
            <span className="m-2 hover:text-red " onClick={() => addQty(product)} ><i className="fa-solid fa-plus"></i></span>
        </div> : undefined}
        {pageToggler === 'cart' ? <button onClick={() => removeFromCart(product)} className="m-2 bg-red-800 text-white p-2 hover:shadow-2xl hover:text-black ">{loadingProduct[product.id] ? 'Removing' : 'Remove from cart'}</button> : <button onClick={isLoggedIn ? () => addToCart(product) : () => (navigate('/sign-in'))} className="m-2 bg-zinc-950 text-white p-2 hover:bg-lime-400 hover:text-black">{loadingProduct[product.id] ? 'Adding to cart' : 'Add to cart'}</button>}
        <h1 className="desc hidden transition ease-in-out m-2">{product.description}</h1>

    </div>)
}

export default ProductCard;