import { createContext, useContext, useState } from "react";
import { collection, doc, query, where, onSnapshot, addDoc, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseInIt";
import { PRODUCTS } from "./data";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useUserValue } from "./userContext";
//creating product context
export const productContext = createContext();
//creating custom hook to get the value of the context
export const useProductValue = () => {
    const value = useContext(productContext);
    return value;
}
//creating provider for product context

//i have used different spinners so for each page I have different loading 
export const ProductProvider = ({ children, uid }) => {
    //loading for product in productCard component
    const [loadingProduct, setLoadingProduct] = useState({});
    //loading used for order page
    const [loadingOrders, setLoadingOrders] = useState(false);
    //storing the products in state
    const [products, setProducts] = useState([]);
    //storing cart items in state
    const [cart, setCart] = useState([]);
    //useNavigate is used to navigate
    const navigate = useNavigate();
    //to show the range value
    const [range, setRange] = useState(25000)
    //used to filter with price range
    const [selectedPriceRange, setSelectedPriceRange] = useState(100000);
    //used to set total price
    const [total, setTotal] = useState(0);

    //to store filter results inside this state
    const [results, setResults] = useState([]);
    //toggle to results array
    const [enableSearch, setEnableSearch] = useState(false);
    //storing if someone search in the search bar
    const [searchTerm, setSearchTerm] = useState('');
    //storing if a user clicks on checkbox
    const [productFilter, setProductFilter] = useState([]);
    //storing orders inside an array 
    const [orders, setOrders] = useState([]);
    //used to toggle range
    const [rangeToggler, setRangeToggler] = useState(false);

    //function for range
    const handleRange = (e) => {
        //toggling and setting the state with the value
        setRangeToggler(true);
        setRange(e.target.value);
        setSelectedPriceRange(e.target.value)

    }
    //function for checkbox
    const handleChangeCheck = (event) => {
        //storing the value
        const value = event.target.value
        //if checked the setting the state with the value
        if (event.target.checked) {
            setProductFilter([...productFilter, value]);
        }
        //else filtering it out and setting the state with the remaining value
        else {
            setProductFilter(productFilter.filter((item) => item !== value));
        }


    };



    //function for searching and filtering
    const handleFilter = () => {
        let filteredProducts = [];
        //getting the search and filtered products in array
        filteredProducts = products.filter((product) => (


            (product.price <= Number(selectedPriceRange)) &&
            (productFilter.length === 0 || productFilter.includes(product.category)) &&
            (searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase())))
        );


        //toggling to map from results array
        setEnableSearch(true);
        //setting the state 
        setResults(filteredProducts);



    }
    //function to add orders
    const addOrders = () => {
        setLoadingOrders(true);
        setTimeout(async () => {
            //storing cart items while ordering
            const orderData = cart.map((item) => ({
                url: item.url,
                productId: item.id,
                name: item.name,
                price: item.price,
                qty: item.qty
            }));
            //creating an object with date and total
            const newOrder = {
                items: orderData,
                orderedAt: new Date().toUTCString().slice(5, 16),
                total: total
            }
            //adding an order to database
            const docRef = await addDoc(collection(db, `/userOrders/${uid}/orders`), newOrder)



            //deleting the cart after order is done
            cart.map(async (c) => {
                await deleteDoc(doc(db, `/usersCarts/${uid}/myCart`, c.id));
            })
            //setting the cart to empty array
            setCart([]);
            toast.success('Order placed successfully');

            setLoadingOrders(false)
            //navigating to orders
            navigate(`/userOrders/${uid}/orders`);

        }, 1000)

    }
    //function to get orders
    const getOrders = () => {
        const unsub = onSnapshot(collection(db, `/userOrders/${uid}/orders`), (snapshot) => {
            const orders = snapshot.docs.map((doc) => {
                return {
                    ...doc.data()

                }

            });

            //setting the orders

            setOrders(orders);




        });
    }
    //getting the items inside cart from database
    const getCart = () => {
        const unsub = onSnapshot(collection(db, `/usersCarts/${uid}/myCart`), (snapshot) => {
            const cart = snapshot.docs.map((doc) => {
                return {
                    ...doc.data(), id: doc.id

                }

            });
            //setting the cart
            setCart(cart);



        });
    }
    //getting all products from database
    const getProducts = () => {
        const unsub = onSnapshot(collection(db, "products"), (doc) => {
            const products = doc.docs.map((product) => {
                return {
                    ...product.data(), id: product.id
                }

            });
            //setting the products
            setProducts(products);
        });

    }
    //this function is used to add all the products from PRODUCTS array to the database
    const addProducts = () => {

        PRODUCTS.map(async (product) => {
            const docRef = await addDoc(collection(db, "products"), product);
        })

    }
    //funtion to add a product to cart
    const addToCart = (product) => {
        //setting loading for each product 
        setLoadingProduct((prevState) => ({ ...prevState, [product.id]: true }));


        setTimeout(async () => {

            //getting the product to be added
            const productToBeAdded = cart.find((p) => p.name === product.name);
            //if in the cart then update the quantity
            if (productToBeAdded) {
                const updateDocRef = doc(db, `/usersCarts/${uid}/myCart`, productToBeAdded.id);
                await updateDoc(updateDocRef, { ...product, qty: productToBeAdded.qty + 1 })
            } else {
                //else add with quantity 1
                const docRef = await addDoc(collection(db, `/usersCarts/${uid}/myCart`), {
                    ...product, qty: 1
                });
            }




            setLoadingProduct((prevState) => ({ ...prevState, [product.id]: false }));
            toast.success('Product added to cart');
        }, 1000)



    }

    //funtion to remove from cart
    const removeFromCart = async (product) => {
        setLoadingProduct((prevState) => ({ ...prevState, [product.id]: true }));
        //removing from database
        setTimeout(async () => {
            await deleteDoc(doc(db, `/usersCarts/${uid}/myCart`, product.id));
            setLoadingProduct((prevState) => ({ ...prevState, [product.id]: false }));

            toast.success('Product removed successfully');


        }, 1000)



    }

    //adding quantity
    const addQty = (product) => {
        //storing previous quantity
        const prevQty = product.qty;
        //getting the index where to change 
        const ind = cart.findIndex((p) => p.name === product.name);
        //updating the product
        const updatedProduct = { ...product, qty: prevQty + 1 };
        //storing in newCart
        const newCart = [...cart];
        //saving the updated product in the desired index
        newCart[ind] = updatedProduct;
        //storing in the cart array
        setCart(newCart)
    }
    //decreasing quantity
    const decQty = (product) => {
        //storing previous quantity
        const prevQty = product.qty;
        //quantity = 1 then return
        if (prevQty === 1) {
            return;
        }
        //getting the index where to change 
        const ind = cart.findIndex((p) => p.name === product.name);
        //updating the product
        const updatedProduct = { ...product, qty: prevQty - 1 };
        //storing in newCart
        const newCart = [...cart];
        //saving the updated product in the desired index
        newCart[ind] = updatedProduct;
        //storing in the cart array
        setCart(newCart)
    }
    //calculating the total with quantity
    const cartTotal = () => {
        let newTotal = 0
        cart.map((c) => {
            newTotal += (Number(c.price) * c.qty);
        })
        //setting the total
        setTotal(newTotal);

    }
    //function to store if user searches
    const handleChange = (e) => {
        setSearchTerm(e.target.value);

    }

    return (<productContext.Provider value={{ setCart, loadingOrders, setLoadingOrders, orders, getOrders, handleRange, productFilter, orders, handleChange, loadingOrders, addOrders, searchTerm, selectedPriceRange, handleChangeCheck, setResults, setEnableSearch, enableSearch, results, handleFilter, total, cartTotal, decQty, addQty, removeFromCart, loadingProduct, setLoadingProduct, getCart, navigate, getProducts, products, range, setRange, addProducts, addToCart, cart }}>
        {children}

    </productContext.Provider>)
}