import React, { useContext, useEffect } from "react";
import CartDropdown from "./CartDropdown";
import { Alert, AlertTitle, Button, Typography } from "@mui/material";
import CartContext from "../context/context";

const Menu = () => {
  const {
    Products,
    menu,
    setMenu,
    getMenu,
    getCart,
    setSelectedMenu,
    alert,
    setAlert,
    increaseOrder,
    addToCart,
    ReadMoreStyles,
    isReadMoreOpen,
    setIsReadMoreOpen,
    showReadMore,
    setShowReadMore,
    ref,
  } = useContext(CartContext);

  useEffect(() => {
    getMenu();
    getCart();
    if (ref.current) {
      // console.log(ref.current.scrollHeight, ref.current.clientHeight);
      setShowReadMore(ref.current.scrollHeight !== ref.current.clientHeight);
    }
  }, []);
  return (
    <div className="container mx-auto">
      {/*Category Selection*/}
      <div className="flex justify-center items-center sm:gap-x-2 lg:gap-x-3 p-5">
        <Button
          variant="contained"
          color="warning"
          onClick={() => setSelectedMenu(0)}
        >
          All
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => setSelectedMenu(1)}
        >
          Pizza
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => setSelectedMenu(2)}
        >
          Burger
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => setSelectedMenu(3)}
        >
          Drinks
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => setSelectedMenu(4)}
        >
          Desserts
        </Button>
        <CartDropdown />
      </div>
      {alert && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Added to Cart
        </Alert>
      )}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
        {menu.map(({ uuid, title, desc, price, options, img, times, id }) => (
          <div
            key={id}
            className="
              mx-auto block gap-x-6  bg-emerald-800 mt-3 w-80"
          >
            <div
              className="flex justify-center items-center bg-slate-300 w-80 h-80 bg-cover  bg-center max-w-80 max-h-80 "
              style={{ backgroundImage: `url(${img})` }}
            ></div>
            <Typography
              className="bg-red-700 px-2 text-white flex justify-center"
              variant="h4"
            >
              {title}
            </Typography>
            <p
              style={isReadMoreOpen ? null : ReadMoreStyles}
              className="text-zinc-50 pt-2 px-3 "
              variant="body1"
            >
              {desc}
            </p>
            <button
              onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}
              className="bg-gray-200 font-medium flex mx-auto text-center text-black rounded-md w-30 opacity-50"
            >
              {isReadMoreOpen ? "Read Less" : "Read More..."}
            </button>
            <div className="w-full flex justify-center py-2">
              <Typography
                variant="h5"
                className="flex justify-center text-9xl font-bold text-white bg-emerald-500 rounded-xl p-4 w-32"
              >
                {price} $
              </Typography>
            </div>
            <div className="flex flex-row p-4 justify-around items-center bottom-0 border-t-2 border-gray-400">
              <Typography className="text-stone-200  px-2" variant="body1">
                {times} Times Ordered*
              </Typography>
              {options && (
                <div className="flex gap-2 pr-2">
                  <select className="w-32" name="" id="">
                    <option value="">
                      {options[0]?.title} - {options[0]?.additionalPrice} $
                    </option>
                    <option value="">
                      {options[1]?.title} - {options[1]?.additionalPrice} $
                    </option>
                    <option value="">
                      {options[2]?.title} - {options[2]?.additionalPrice} $
                    </option>
                  </select>
                </div>
              )}
              <Button
                onClick={() => {
                  addToCart(id, title);
                  increaseOrder(id);
                }}
                className=""
                variant="contained"
                color="error"
              >
                Add To Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
