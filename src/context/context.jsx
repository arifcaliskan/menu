import React, { createContext, useState, useEffect } from "react";
import { storage, db } from "../config/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [menu, setMenu] = useState([]);
  const [alert, setAlert] = useState(false);
  const [showCart, setShowCart] = useState(false);
  // BUNU DEĞİŞTİR
  // Get Menu from Firebase
  const menuRef = collection(db, "menu-items");

  // ***
  // const imageRef = ref(storage, `images/`)

  // useEffect(()=>{
  //     listAll(imageRef).then((response) => {
  //         response.items.forEach((item) => {
  //             getDownloadURL(item).then((url) => {
  //                 setImages((prev) => [...prev, url])
  //             })
  //         })
  //     })
  // }, [])

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

  const [cart, setCart] = useState([]);
  const [title, setTitle] = useState("This is the Cart from Context");

  return (
    <CartContext.Provider
      value={{
        title,
        setTitle,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
