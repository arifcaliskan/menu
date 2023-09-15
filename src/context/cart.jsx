import { createContext, useState, useEffect } from 'react'
import { Products } from '../data'

export const CartContext = createContext()

const getDefaultCart = () =>{
    let cart = {}
    for (let i =1; i<Products.length +1; i++) {
        cart[i] = 0;
    }
    return cart;
}
export const CartContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart())
    const getTotal =() =>{
        let total = 0;
        for(const item in cartItems) {
            if(cartItems[item]>0) {
                let itemInfo = Products.find((product) => {
                    product.id === Number(item);
                    total += cartItems[item] * itemInfo.price;
                })
            }
        }
        return total;
    }
    

const addToCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]:prev[itemId] +1}))
}
const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]:prev[itemId] -1}))
}
const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
}
const checkOut = () => {
    setCartItems(getDefaultCart())
}
const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotal,
    checkOut,
}
return (
    <CartContext.Provider value={contextValue}>
        {props.children}
    </CartContext.Provider>
    )

}