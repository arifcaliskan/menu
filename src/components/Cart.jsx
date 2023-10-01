import React, { useContext, useEffect } from "react";
import CartContext from "../context/context";
import { AiFillCloseCircle } from "react-icons/ai";
const Cart = () => {
  const {
    cart,
    setCart,
    addToCart,
    getCart,
    increaseQuantity,
    decreaseQuantity,
    deleteItem,
  } = useContext(CartContext);
  useEffect(() => {
    getCart();
  }, [cart]);
  let total = 0;
  for (const item of cart) {
    total += item.quantity * item.price;
    total = Math.round(total * 10) / 10;
  }
  return (
    <div>
      {cart ? (
        <h1>Items in your Cart</h1>
      ) : (
        <div>
          <h1>Currently No Items in Your Cart</h1>
          <button className="bg-amber-300 px-4 py-2 rounded-sm">
            Shop Some Products
          </button>
        </div>
      )}
      {cart?.map(({ title, price, img, quantity, id }) => (
        <div
          key={id}
          className=" w-screen md:px-24 py-4 flex flex-row items-center justify-around"
        >
          <div
            className="flex justify-center items-center bg-slate-300 w-32 h-32 bg-cover bg-center max-w-40 max-h-40 "
            style={{ backgroundImage: `url(${img})` }}
          ></div>

          <div className="flex flex-col justify-start md:w-96 sm:w-48">
            <h3>{title}</h3>
            <p>{Math.round(price * quantity * 10) / 10} USD</p>
            <button
              className="bg-red-500 text-white px-4 py-2 font-bold"
              onClick={() => deleteItem(id)}
            >
              Remove From Cart
            </button>
          </div>
          <div className="flex flex-col justify-center">
            <button
              className="bg-indigo-500 py-2 px-4 rounded-lg text-white"
              onClick={() => increaseQuantity(id)}
            >
              +
            </button>
            <p>{quantity}</p>
            <button
              className="bg-indigo-500 p-3 rounded-lg text-white"
              onClick={() => decreaseQuantity(id)}
            >
              -
            </button>
          </div>
        </div>
      ))}
      <div className="w-screen flex flex-row justify-around">
        <button
          className="w-80 bg-amber-500 rounded-lg flex justify-center items-center"
          onClick={() => {}}
        >
          Empty Cart <AiFillCloseCircle className="mx-2" />
        </button>
        <button className="bg-emerald-600 px-6 py-3 text-white rounded-lg">
          <h2>Check-out</h2>
          <h2 className="font-extrabold">{total}</h2>
        </button>
      </div>
    </div>
  );
};

export default Cart;
