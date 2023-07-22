import { createContext, useContext, useState } from "react";
import { collection, doc, query, where, onSnapshot, addDoc, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseInIt";
import { PRODUCTS } from "./data";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useUserValue } from "./userContext";
export const productContext = createContext();
export const useProductValue = () => {
    const value = useContext(productContext);
    return value;
}

export const ProductProvider = ({ children, uid }) => {

    const [loadingProduct, setLoadingProduct] = useState({});
    const [loadingOrders,setLoadingOrders] = useState(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [range, setRange] = useState()
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, 7500]);
    const [total, setTotal] = useState(0);
    const [category, setCategory] = useState([])
    const [results, setResults] = useState([]);
    const [enableSearch, setEnableSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [productFilter,setProductFilter] = useState('men');
    const checkbox = (e) => {
        
    }
    const handleChangeCheck = (e) => {
        // setSearchTerm(e.target.value);
        // console.log(searchTerm);
        console.log('val :' ,e.target.value)
        setProductFilter(e.target.value);
        console.log('productFilter',productFilter)
        // const recentCategory = e.target.value;
        // if (e.target.checked) {
        //     setCategory((prevState) => {
        //         const filtered = [...prevState, recentCategory]
        //         return filtered;
        //     });

        // } else {
        //     setCategory((prevState) => {
        //         const filtered = prevState.filter((selected) => selected !== recentCategory)
        //         return filtered

        //     })
        // }

        // const minPrice = parseInt(e.target.value[0]);
        // const maxPrice = parseInt(e.target.value[1]);
        // setSelectedPriceRange([minPrice, maxPrice]);
        

    };
    const handleFilter = () => {
        // const filteredProducts = products.filter((product) =>
        // (searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        //     (category.length === 0 || category.includes(product.category)) &&
        //     product.price >= selectedPriceRange[0] &&
        //     product.price <= selectedPriceRange[1])

        // );
        console.log(productFilter)
        console.log(searchTerm);
        if(searchTerm === ''){
            const filteredProducts = products.filter((product) =>
            (
                
                product.category == 'women'
            )
            
      );
       setEnableSearch(true);
        setResults(filteredProducts);
        }
        
    // const filteredProducts = products.filter(
    //     (product) =>
    //       (category.length === 0 || category.includes(product.category)) &&
    //       (searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    //       product.price >= selectedPriceRange[0] &&
    //       product.price <= selectedPriceRange[1]
    //   );
        // console.log(filteredProducts)
        
    }

    const addOrders = () => {
        setLoadingOrders(true);
        setTimeout(async()=>{
            const orderData = cart.map((item) => ({
                productId : item.id,
                name : item.name,
                price : item.price,
                qty : item.qty
            }));
            
            const docRef = await addDoc(collection(db,`/userOrders/${uid}/orders`),{
                orderedAt : new Date(),
                items : orderData,
                total : total
            })
            cart.map((c) => {
                removeFromCart(c);
            })
            setCart([]);
            toast.success('Order placed successfully');

            setLoadingOrders(false)
            navigate(`/userOrders/${uid}/orders`);
            // const docRef = await addDoc(collection(db, `/userOrders/${uid}/orders`),
        },1000)

    }
    const getCart = () => {
        const unsub = onSnapshot(collection(db, `/usersCarts/${uid}/myCart`), (snapshot) => {
            const cart = snapshot.docs.map((doc) => {
                return {
                    ...doc.data(), id: doc.id

                }

            });
            setCart(cart);



        });
    }
    const getProducts = () => {
        const unsub = onSnapshot(collection(db, "products"), (doc) => {
            const products = doc.docs.map((product) => {
                return {
                    ...product.data(), id: product.id
                }

            });

            setProducts(products);
        });

    }
    const addProducts = () => {

        PRODUCTS.map(async (product) => {
            const docRef = await addDoc(collection(db, "products"), product);
        })

    }
    const addToCart = (product) => {

        setLoadingProduct((prevState) => ({ ...prevState, [product.id]: true }));


        setTimeout(async () => {


            const productToBeAdded = cart.find((p) => p.name === product.name);

            if (productToBeAdded) {
                const updateDocRef = doc(db, `/usersCarts/${uid}/myCart`, productToBeAdded.id);
                await updateDoc(updateDocRef, { ...product, qty: productToBeAdded.qty + 1 })
            } else {
                const docRef = await addDoc(collection(db, `/usersCarts/${uid}/myCart`), {
                    ...product, qty: 1
                });
            }




            setLoadingProduct((prevState) => ({ ...prevState, [product.id]: false }));
            toast.success('Product added to cart');
        }, 1000)


        // setCart(product,...cart);
    }


    const removeFromCart = async (product) => {
        setLoadingProduct((prevState) => ({ ...prevState, [product.id]: true }));
        setTimeout(async () => {
            await deleteDoc(doc(db, `/usersCarts/${uid}/myCart`, product.id));
            setLoadingProduct((prevState) => ({ ...prevState, [product.id]: false }));
            if(!loadingOrders){
                toast.success('Product removed successfully');
            }
            
        }, 2000)



    }


    const addQty = (product) => {
        const prevQty = product.qty;

        const ind = cart.findIndex((p) => p.name === product.name);
        const updatedProduct = { ...product, qty: prevQty + 1 };
        const newCart = [...cart];
        newCart[ind] = updatedProduct;
        setCart(newCart)
    }
    const decQty = (product) => {
        const prevQty = product.qty;
        if (prevQty === 1) {
            return;
        }
        const ind = cart.findIndex((p) => p.name === product.name);
        const updatedProduct = { ...product, qty: prevQty - 1 };
        const newCart = [...cart];
        newCart[ind] = updatedProduct;
        setCart(newCart)
    }

    const cartTotal = () => {
        let newTotal = 0
        cart.map((c) => {
            newTotal += (c.price * c.qty);
        })
        setTotal(newTotal);

    }
    const handleChange = () => {

    }

    return (<productContext.Provider value={{handleChange,loadingOrders,addOrders, checkbox,searchTerm, selectedPriceRange, handleChangeCheck, category, setResults, setEnableSearch, enableSearch, results, handleFilter, total, cartTotal, decQty, addQty, removeFromCart, loadingProduct, setLoadingProduct, getCart, navigate, getProducts, products, range, setRange, addProducts, addToCart, cart }}>
        {children}

    </productContext.Provider>)
}