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
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [range, setRange] = useState()
    const [selectedPriceRange, setSelectedPriceRange] = useState({min : 0,max : 0});
    const [total, setTotal] = useState(0);
    const [category, setCategory] = useState([])
    const [results, setResults] = useState([]);
    const [enableSearch, setEnableSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [productFilter, setProductFilter] = useState([]);
    const [orders, setOrders] = useState([]);
    const checkbox = (e) => {

    }
    const handleRange = (e) => {
        setSelectedPriceRange({min : e.target.min,max : e.target.max});
        console.log(selectedPriceRange);
    }
    const handleChangeCheck = (event) => {
      
        const value = event.target.value
        if (event.target.checked) {
            setProductFilter([...productFilter, value]);
        }
        else {
            setProductFilter(productFilter.filter((item) => item !== value));
        }
       

    };

    const handleFilter = () => {
        
       
        if (searchTerm === '' && productFilter.length > 0) {
            const filteredProducts = products.filter((product) =>
            (

                productFilter.includes(product.category)
            )

            );
            setEnableSearch(true);
            setResults(filteredProducts);
        } else if (searchTerm && productFilter.length === 0) {
            const filteredProducts = products.filter((product) => (product.name.toLowerCase().includes(searchTerm.toLowerCase())))
            console.log(filteredProducts)
            setEnableSearch(true);
            setResults(filteredProducts);
        }else{
            console.log('when both')
            
            const filteredProducts = products.filter((product) =>
            (

                productFilter.includes(product.category)
            )

            );
            const newFilteredProducts = filteredProducts.filter((product) => (product.name.toLowerCase().includes(searchTerm.toLowerCase())))
            setEnableSearch(true);
            if(newFilteredProducts.length === 0) {
                setResults([]);
            }
            setResults(newFilteredProducts);
        }

        

    }

    const addOrders = () => {
        setLoadingOrders(true);
        setTimeout(async () => {
            const orderData = cart.map((item) => ({
                productId: item.id,
                name: item.name,
                price: item.price,
                qty: item.qty,
                orderedAt: new Date().toUTCString().slice(5, 16),
                total: total

            }));
            orderData.map(async(order) => {
                const docRef = await addDoc(collection(db, `/userOrders/${uid}/orders`), order)
            })
            
            
            
            cart.map(async (c) => {
                await deleteDoc(doc(db, `/usersCarts/${uid}/myCart`, c.id));
            })
            setCart([]);
            toast.success('Order placed successfully');

            setLoadingOrders(false)
            navigate(`/userOrders/${uid}/orders`);

        }, 1000)

    }
    const getOrders = () => {
        const unsub = onSnapshot(collection(db, `/userOrders/${uid}/orders`), (snapshot) => {
            const orders = snapshot.docs.map((doc) => {
                return {
                    ...doc.data()

                }

            });

            console.log(orders)
            
            setOrders(orders);
            



        });
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

            toast.success('Product removed successfully');


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
            newTotal += (Number(c.price) * c.qty);
        })
        setTotal(newTotal);

    }
    const handleChange = (e) => {
        setSearchTerm(e.target.value);

    }

    return (<productContext.Provider value={{orders,getOrders,handleRange, productFilter, orders, handleChange, loadingOrders, addOrders, checkbox, searchTerm, selectedPriceRange, handleChangeCheck, category, setResults, setEnableSearch, enableSearch, results, handleFilter, total, cartTotal, decQty, addQty, removeFromCart, loadingProduct, setLoadingProduct, getCart, navigate, getProducts, products, range, setRange, addProducts, addToCart, cart }}>
        {children}

    </productContext.Provider>)
}