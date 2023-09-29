import React, { useContext } from "react";
import CartContext from "../context/context";

const Cart = () => {
  const { title, setTitle, cart, setCart } = useContext(CartContext);
  return (
    <div>
      {title}
      {cart.map((item) => (
        <h2>{item.name}</h2>
      ))}
    </div>
  );
};

export default Cart;
