import React, { createContext, useState, useEffect, useRef } from "react";
import { db } from "../config/firebase";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [menu, setMenu] = useState([]);
  const [alert, setAlert] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const CartRef = collection(db, "cart-items");
  const [cart, setCart] = useState([]);
  const ReadMoreStyles = {
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    display: "-webkit-box",
  };
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const ref = useRef(null);

  const menuRef = collection(db, "menu-items");

  const getMenu = async () => {
    try {
      const data = await getDocs(menuRef);
      let Products = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setAllProducts(Products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    switch (selectedMenu) {
      case 0:
        handleAll();
        break;
      case 1:
        handlePizza();
        break;
      case 2:
        handleBurger();
        break;
      case 3:
        handleDrinks();
        break;
      case 4:
        handleDesserts();
        break;
    }
  }, [allProducts, selectedMenu]);

  useEffect(() => {
    getMenu();
  }, []);

  const increaseOrder = async (uuid) => {
    const filtered = menu.filter((item) => item.id == uuid);
    const updatedTimes = filtered[0].times + 1;
    await updateDoc(doc(db, "menu-items", uuid), {
      times: updatedTimes,
    });
    getMenu();
    setAlert(true);
    setShowCart(true);
    const time = setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const handleAll = () => {
    setMenu(allProducts);
  };

  const handlePizza = () => {
    const selectPizza = allProducts.filter((item) => item.category === "pizza");
    setMenu(selectPizza);
  };
  const handleDrinks = () => {
    const selectDrink = allProducts.filter((item) => item.category === "drink");
    setMenu(selectDrink);
  };
  const handleDesserts = () => {
    const selectDessert = allProducts.filter(
      (item) => item.category === "dessert"
    );
    setMenu(selectDessert);
  };
  const handleBurger = () => {
    const selectBurger = allProducts.filter(
      (item) => item.category === "burger"
    );
    setMenu(selectBurger);
  };

  const getCart = async () => {
    try {
      const data = await getDocs(CartRef);
      let Products = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCart(Products);
    } catch (err) {
      console.error(err);
    }
  };
  const increaseQuantity = async (uuid) => {
    const selected = cart.filter((item) => item.id == uuid);
    const updatedQuantity = selected[0].quantity + 1;
    await updateDoc(doc(db, "cart-items", uuid), {
      quantity: updatedQuantity,
    });
  };
  const decreaseQuantity = async (uuid) => {
    const selected = cart.filter((item) => item.id == uuid);
    if (selected[0].quantity > 1) {
      const updatedQuantity = selected[0].quantity - 1;
      await updateDoc(doc(db, "cart-items", uuid), {
        quantity: updatedQuantity,
      });
    }
  };
  const deleteItem = async (uuid) => {
    await deleteDoc(doc(db, "cart-items", uuid));
  };
  const emptyCart = async () => {
    setCart();
    await updateDoc(doc(db, "cart-items", {}));
  };
  const addToCart = async (uuid, title) => {
    getCart();
    const selected = menu.filter((item) => item.id == uuid);
    const obj = {
      uuid: selected[0].uuid,
      title: selected[0].title,
      price: selected[0].price,
      img: selected[0].img,
      quantity: 1,
    };
    console.log(cart);
    // if (cart.includes(selected[0].id)) {
    //   console.log("in Cart");
    // }
    // // const updatedQuantity = selected[0].quantity + 1;
    // console.log(updatedQuantity);
    // await updateDoc(doc(db, "cart-items", uuid), {
    //   quantity: updatedQuantity,
    // });

    // console.log(selected[0]);
    await addDoc(CartRef, obj);
  };
  let total = 0;
  if (cart) {
    for (const item of cart) {
      total += item.quantity * item.price;
      total = Math.round(total * 10) / 10;
    }
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        menu,
        increaseOrder,
        setMenu,
        getMenu,
        alert,
        setAlert,
        allProducts,
        setSelectedMenu,
        getCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        deleteItem,
        emptyCart,
        total,
        ReadMoreStyles,
        isReadMoreOpen,
        setIsReadMoreOpen,
        showReadMore, 
        setShowReadMore,
        ref,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
