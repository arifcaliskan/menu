import React, { useEffect, useState } from 'react'
import { Products } from '../data'
import { db } from '../config/firebase'
import { getDocs, collection, addDoc } from 'firebase/firestore'


const UploadDataToFirebase = () => {
    
    const [menuList, setMenuList] = useState([])
    const [menu, setMenu] = useState(Products)
    const collectionRef =collection(db, 'menu-items') 
    // Upload data to Firebase
    useEffect(()=>{
        const getMenuList = async () => {
        try {
            const data = await getDocs(collectionRef)
           
            const filteredData = data.docs.map((doc)=>({...doc.data(), id:doc.id}))
            setMenuList(filteredData)
        } catch (err) {
            console.error(err);
        }
        }
        getMenuList()
    }, [])
    const handleUpload = async () => { 
        console.log('update')
        for (const item of menu) {
            await addDoc(collectionRef, {
                uuid:item.uuid,
                title:item.title,
                desc:item.desc,
                times:item.times,
                price:item.price,
                category:item.category,
                options:item.options || null,
                img:item.img
            })
        }
        
        
    }
    console.log('uploaded')

  return (
    <div>
        <button className='border-2 border-indigo-600 ' onClick={handleUpload}>Upload to Firebase</button>
    </div>
  )
}

export default UploadDataToFirebase