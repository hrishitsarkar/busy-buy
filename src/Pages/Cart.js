import ProductCard from "../Components/ProductCard"
import { useProductValue } from "../productContext";
const Cart = () => {

    const {products} = useProductValue();
    return (<div className="w-full flex flex-col items-center">
        <div className="flex flex-row flex-wrap items-center">
        {products.map((product, i) => (<ProductCard product={product} key={i} />))}
        </div>
    </div>)
}
export default Cart;