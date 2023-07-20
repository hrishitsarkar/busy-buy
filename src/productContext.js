import { createContext, useContext, useState } from "react";
import { collection, doc,query,where, onSnapshot,addDoc,getDocs ,setDoc,deleteDoc, updateDoc} from "firebase/firestore";
import { db } from "./firebaseInIt";
import { PRODUCTS } from "./data";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useUserValue } from "./userContext";
export const productContext = createContext();
export const useProductValue = () => {
    const value = useContext(productContext);
    return value;
}

export const ProductProvider = ({ children,uid }) => {
    const [loadingProduct,setLoadingProduct] = useState({});
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);
    const navigate = useNavigate();
    const [range,setRange] = useState(7500)
    
    
    const getCart = () => {
        const unsub = onSnapshot(collection(db, `/usersCarts/${uid}/myCart`), (snapshot) => {
            const cart = snapshot.docs.map((doc)=>{
                return {
                    ...doc.data(),id : doc.id
                    
                }
                
            });
            setCart(cart);
            
            
            
          });
    }
    const getProducts = () => {
        const unsub = onSnapshot(collection(db, "products"), (doc) => {
            const products = doc.docs.map((product)=>{
                return {
                    ...product.data(),id : product.id
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

        setLoadingProduct((prevState) => ({ ...prevState, [product.id]: true }));


        setTimeout(async()=>{
            

              const productToBeAdded = cart.find((p) => p.name === product.name);

                if(productToBeAdded){
                    const updateDocRef = doc(db, `/usersCarts/${uid}/myCart`, productToBeAdded.id);
                    await updateDoc(updateDocRef,{...product,qty : productToBeAdded.qty + 1})
                }else{
                    const docRef = await addDoc(collection(db, `/usersCarts/${uid}/myCart`), {
                            ...product,qty : 1
                          });
                }
            
            


            setLoadingProduct((prevState) => ({ ...prevState, [product.id]: false }));
            toast.success('Product added to cart');
    },1000)
        
        
        // setCart(product,...cart);
    }

    const removeFromCart = async(product)=>{
        console.log(product)
        await deleteDoc(doc(db, `/usersCarts/${uid}/myCart`, product.id));
        
        toast.success('Product removed from cart');
    }
    
    return (<productContext.Provider value={{removeFromCart,loadingProduct,setLoadingProduct,getCart,navigate,getProducts,products,range,setRange,addProducts,addToCart,cart}}>
        {children}

    </productContext.Provider>)
}