import React, { useContext, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import CartContext from "../context/context";
import { BsFillCartCheckFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

const CartDropdown = () => {
  const { cart, getCart, total } = useContext(CartContext);
  useEffect(() => {
    getCart();
  }, []);
  return (
    <Dropdown>
      <Dropdown.Toggle
        className="flex justify-center bg-indigo-400 px-4 py-1 rounded-lg shadow-md items-center text-white font-bold"
        variant="success"
        id="dropdown-basic"
      >
        Your Cart <BsFillCartCheckFill size={30} />
        <p className="bg-black text-white font-bold px-2 py-1 rounded-xl mx-1">
          {cart?.length || 0}
        </p>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {cart.length ? (
          cart.map((item) => {
            return (
              <div key={item.id}>
                <Dropdown.Item href="/cart">
                  <a
                    href="/cart"
                    className="flex flex-row justify-between items-center w-80"
                  >
                    <img src={item.img} alt="" className="w-20 h-20" />
                    <div className="flex flex-col items-center justify-start">
                      <h3>{item.title}</h3>
                      <h3>{item.price}</h3>
                    </div>
                    <h3>{item.quantity}</h3>
                  </a>
                </Dropdown.Item>
              </div>
            );
          })
        ) : (
          <Dropdown.Item href="/cart">No items in Cart</Dropdown.Item>
        )}
        {cart.length && (
          <h2 className="w-full flex justify-center font-bold bg-amber-500 text-white text-3xl">
            $ {total}
          </h2>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CartDropdown;
