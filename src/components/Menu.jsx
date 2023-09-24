import React, { useEffect, useState } from 'react'
import { Products } from '../data'
import { Alert, AlertTitle, Button, Typography } from '@mui/material'
import {storage, db} from '../config/firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { BsFillCartCheckFill } from "react-icons/bs";



const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [alert, setAlert] = useState(false)
    const [showCart, setShowCart] = useState(false)
// BUNU DEĞİŞTİR
    // Get Menu from Firebase
    const menuRef = collection(db,'menu-items')

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
            const data = await getDocs(menuRef)
            let filteredData=data.docs.map((doc) =>({...doc.data(), id:doc.id}))
            setMenu(filteredData)

        } catch (err) {
            console.error(err)
        }
    }
    useEffect(()=> {
        getMenu()
        const MenuGlobal = menu;
    }, [])

     const increaseOrder = async (uuid) => {
       console.log(uuid)
       const filtered = menu.filter(item => item.id == uuid);
       console.log(filtered[0].title)
       const updatedTimes = filtered[0].times+1
       console.log(filtered[0].times+1)
       console.log(filtered[0].uuid)
       await updateDoc(doc(db, 'menu-items',uuid), {
        times:updatedTimes
       })
        setAlert(true)
        setShowCart(true)
        const time = setTimeout(()=>{
            setAlert(false)
        },3000)
    }

    const handlePizza = () => {
        const selectPizza = Products.filter((item) => item.category==='pizza')
        setMenu(selectPizza)
        }
    const handleDrinks = () => {
        const selectDrink = Products.filter((item) => item.category==='drink')
        setMenu(selectDrink)
        }
    const handleDesserts = () => {
        const selectDessert = Products.filter((item) => item.category==='dessert')
        setMenu(selectDessert)
        }
    const handleBurger = () => {
        const selectBurger = Products.filter((item) => item.category==='burger')
        setMenu(selectBurger)
        }
    const handleAll = () => {
        getMenu()
    }
    const handleOption = (id) => {
        console.log(Products[id].title)
    }
    // getMenu()
    

  return (
    <div className='container mx-auto'>
        {/*Category Selection*/}
        <div className= 'flex justify-center items-center sm:gap-x-2 lg:gap-x-3 p-5'>
        <Button variant='contained' color='warning' onClick={handleAll}>All</Button>
        <Button variant='contained' onClick={handlePizza} color='warning'>Pizza</Button>
        <Button variant='contained' color='warning' onClick={handleBurger}>Burger</Button>
        <Button variant='contained' color='warning' onClick={handleDrinks}>Drinks</Button>
        <Button variant='contained' color='warning' onClick={handleDesserts}>Desserts</Button>
        {showCart&& <a href="/cart"><BsFillCartCheckFill size={40} color='green'/></a> }
        </div>

        {alert&&<Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Added to Cart
        </Alert>}
       
         {/*Category Selection*/}

         {/*Menu Cards*/}
        <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3' >
            {menu.map(({uuid, title, desc, price, options, img, times, id })=> (
            <div key={id} className='
              
              mx-auto block gap-x-6  bg-emerald-800 mt-3 w-80'>
                <div className='flex justify-center items-center bg-slate-300 w-80 h-80 bg-cover  bg-center max-w-80 max-h-80 ' style={{ backgroundImage: `url(${img})` }}>
                    
                </div>
            
                <Typography className='bg-red-700 px-2 text-white flex justify-center'  variant='h4'>{title}</Typography>
                <Typography className='text-zinc-50 pt-2 px-3 ' variant='body1'>{desc}</Typography>
                <div className='w-full flex justify-center py-2'>
                    <Typography variant='h5' className='flex justify-center text-9xl font-bold text-white bg-emerald-500 rounded-xl p-4 w-32'>{price} $</Typography>
                </div>
                <div className='flex flex-row p-4 justify-around items-center border-t-2 border-gray-400'>
                    <Typography className='text-stone-200  px-2' variant='body1'> {times} Times Ordered*</Typography>
                    {options&&<div className='flex gap-2 pr-2'>
                        <select className='w-32' name="" id="">
                        <option value="">{options[0]?.title} - {options[0]?.additionalPrice} $
                        </option>
                        <option value="">{options[1]?.title} - {options[1]?.additionalPrice} $</option>
                        <option value="">{options[2]?.title} - {options[2]?.additionalPrice} $</option>
                        </select>
                    </div>}
                    <Button onClick={()=>increaseOrder(id)} className='' variant='contained' color='error'>Order</Button>
                </div>
                
            </div>))}
        </div>
        
    </div>
  )
}

export default Menu