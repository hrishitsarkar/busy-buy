import { createContext, useContext, useState } from "react";
import { collection, doc, onSnapshot,addDoc } from "firebase/firestore";
import { db } from "./firebaseInIt";
import { PRODUCTS } from "./data";
export const productContext = createContext();
export const useProductValue = () => {
    const value = useContext(productContext);
    return value;
}

export const ProductProvider = ({ children }) => {
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);
    const [range,setRange] = useState(7500)
    const getProducts = () => {
        const unsub = onSnapshot(collection(db, "products"), (doc) => {
            const products = doc.docs.map((product)=>{
                return {
                    ...product.data()
                }
                
            });
            
            setProducts(products);
          });
          
    }
    const addProducts = () => {

        PRODUCTS.map(async (product) => {
            const docRef = await addDoc(collection(db, "products"),product );
        })
        
    }
    const addToCart = (product) => {
        setCart(product,...cart);
    }
    
    return (<productContext.Provider value={{getProducts,products,range,setRange,addProducts,addToCart,cart}}>
        {children}

    </productContext.Provider>)
}