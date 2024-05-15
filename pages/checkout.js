import React, { useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { IoBagCheckSharp } from "react-icons/io5";
import { stringify } from 'postcss';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
const Checkout = ({ addToCart, removeFromCart, clearCart,subTotal, cart }) => {
  const [checkoutInfo, setCheckoutInfo] = useState({
    name:'',
    email:'',
    address:'',
    City:'',
    phone:'',
    state:'',
    pincode:''
  })
  const [disabled, setDisabled] = useState(true)
  const handleChange = (e) => {
    // console.log(checkoutInfo)
    setCheckoutInfo({...checkoutInfo,[e.currentTarget.name]:e.currentTarget.value})
    const {name,email,address,City,phone,state,pincode}=checkoutInfo
    if(name.length > 3 && email.length > 3 && address.length > 3 && pincode.length > 3 && phone.length > 3 ) {
      console.log('entered the loop');
      // console.log(checkoutInfo)
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  }
  
  const handlePay= () => {
    const data={
      email:checkoutInfo.email,
      orderId:Date.now(),
      address:checkoutInfo.address,
      amount:subTotal,
      status:'paid',
      products:JSON.parse(JSON.stringify(cart))
    }
    fetch( `${process.env.NEXT_PUBLIC_HOST}/api/addOrder`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    }).then(async(value)=>{
      const data=await value.json()
      console.log(data)
      // setCheckoutInfo({
      //   name:'',
      //   email:'',
      //   address:'',
      //   City:'',
      //   phone:'',
      //   state:'',
      //   pincode:''
      // })
      // clearCart()
      toast.success('Order created!', {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }).catch(err=>{console.log(err)})
  }
  
  return (
    <div className='container m-auto'>
      <h1 className='font-bold text-3xl text-center capitalize my-4'>Checkout </h1>
      <div className='w-2/3 mx-auto border-2 py-3 px-5'>
        <h2 className='font-bold text-xl my-2'>1.Delivery Details</h2>
        <div className="flex flex-wrap -m-2 ml-1 ">
          <div className="p-2 w-1/2">
       
            <div className="relative">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input  value={checkoutInfo.name} onChange={(e)=>handleChange(e)} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
          </div>
          <div className="p-2 w-1/2">
            <div className="relative">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input value={checkoutInfo.email} onChange={(e)=>handleChange(e)} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
          </div>
          <div className="p-2 w-full">
            <div className="relative">
              <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
              <textarea value={checkoutInfo.address} onChange={(e)=>handleChange(e)} name="address" id="" cols="30" rows="5" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
            </div>
          </div>
          <div className="p-2 w-1/2">
            {/* <div className="relative">
              <label htmlFor="City" className="leading-7 text-sm text-gray-600">City</label>
              <input value={checkoutInfo.City} onChange={(e)=>handleChange(e)} type="text" id="City" name="City" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div> */}
            <div className="relative">
              <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
              <input value={checkoutInfo.pincode} onChange={(e)=>handleChange(e)} type="text" id="pincode" name="pincode"  className="w-full  bg-opacity-50 rounded border   bg-gray-100 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
          </div>
          <div className="p-2 w-1/2">
            <div className="relative">
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
              <input value={checkoutInfo.phone} onChange={(e)=>handleChange(e)} type="text" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
          </div>
          <div className="p-2 w-1/2">
            <div className="relative">
              <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
              <input value={checkoutInfo.state} readOnly={true} type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
          </div>
          <div className="p-2 w-1/2">
            {/* <div className="relative">
              <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
              <input value={checkoutInfo.pincode} onChange={(e)=>handleChange(e)} type="text" id="pincode" name="pincode"  className="w-full  bg-opacity-50 rounded border   bg-gray-100 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div> */}
             <div className="relative">
              <label htmlFor="City" className="leading-7 text-sm text-gray-600">City</label>
              <input value={checkoutInfo.City} readOnly={true} type="text" id="City" name="City" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div> 
          </div>
        </div>
        <h2 className='font-bold text-xl my-2'>2.Review Cart Items</h2>
        <div className=" sideCart w-full h-full  bg-slate-100 px-6 py-6  
           "
          >
            <ol className='mt-6'>
              {Object.keys(cart).length <= 0 && <div className='font-semibold text-pink-500 text-center text-lg '>No items in cart :( ,Please add items few items to checkout</div>}
              {Object.keys(cart).map((k) => <li key={k} >
                <div className="item flex py-3 gap-2">
                  <div className='ml-4 font-semibold grid   text-lg md:text-xl capitalize'>{cart[k].name}</div>
                  <div className=' font-bold flex justify-center items-center gap-x-1 text-xl '> <CiCircleMinus className='text-pink-500' onClick={() => removeFromCart(k, cart[k].price, 1, cart[k].variant, cart[k].name)} /> {cart[k].qty}<CiCirclePlus className='text-pink-500' onClick={() => addToCart(k, cart[k].price, 1, cart[k].variant, cart[k].name)} /> </div>
                </div>
              </li>)}
              {Object.keys(cart).length > 3 ? <div className='text-lg text-pink-500 font-semibold ml-5 mt-7'>SubTotal : ₹{subTotal}</div> : null}
            </ol>
          </div>
              <button  disabled={disabled} onClick={handlePay} className="flex disabled:bg-pink-300 justify-center items-center gap-2  mt-8 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg "><IoBagCheckSharp className='text-xl' /> Pay ₹{subTotal}</button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Checkout
