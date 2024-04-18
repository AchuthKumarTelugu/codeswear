import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosCloseCircle } from "react-icons/io";
import { CiCirclePlus,CiCircleMinus } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { IoBagCheckSharp } from "react-icons/io5";
const Navbar = ({ addToCart ,removeFromCart ,clearCart ,subTotal ,cart}) => {
  const ref = useRef()
  const toggleCart = () => {
    console.log("entered toggleCart")
    console.log(ref.current)

    //checking if sideCart has translate-x-full property ,if has remove it vice versa
    // if(ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full")
    //   ref.current.classList.add("translate-x-0")
    // }
    // else if(!ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.add("translate-x-full")
    //   ref.current.classList.remove("translate-x-0")
    // }
    if(ref.current.classList.contains("hidden")) {
      ref.current.classList.remove("hidden")
    }
   else if(!ref.current.classList.contains("hidden")) {
      ref.current.classList.add("hidden")
    }
  }
useEffect(() => {
  
  console.log("cart",cart,"subTotal",subTotal );    

}, [])

  return (
    <div>
      <div className="flex justify-between items-center px-10  gap-4 md:gap-4 py-3 md:py-2 bg-slate-100 shadow-lg mb-3 mt-1 md:justify-between  md:flex-row ">
        <div className='flex gap-3 items-center flex-col md:flex-row'>
          <div className="logo">
            <Link href={'/'}>
              <Image src={'/title.png'} width={200} height={50} alt='' />
            </Link>
          </div>
          <div className="nav">
            <ul className='flex gap-4 text-xl  font-semibold'>
              <Link href={'/tshirts'}><li>Tshirts</li></Link>
              <Link href={'/hoodies'}><li>Hoodies</li></Link>
              <Link href={'/stickers'}><li>Stickers</li></Link>
              <Link href={'/mugs'}><li>Mugs</li></Link>
            </ul>
          </div>
        </div>
        <div className="cart">
          <button onClick={toggleCart} className=' px-6 py-3 font-bold text-3xl rounded hover:text-[#FF87A5]'>
            <FaCartShopping />
          </button>

          <div ref={ref} className="z-[10000] sideCart w-80 h-full absolute top-0 right-0 bg-pink-200 px-6 py-6  
           hidden"
           >
           <h1 className='font-bold text-xl text-center capitalize'>This is shopping cart</h1> 
            <span onClick={toggleCart} className='absolute top-5 right-2 cursor-pointer text-2xl text-pink-500'><IoIosCloseCircle className='' /></span>
            <ol className='mt-6'>
              <li>
                <div className="item flex py-3">
                <div className='w-2/3 font-semibold grid place-content-center'>1 . Tshirts -wear the code </div>
                <div className='w-1/3 font-bold flex justify-center items-center gap-x-1 text-lg '> <CiCircleMinus/>  1 <CiCirclePlus/> </div>
                </div>
              </li>
              <li>
                <div className="item flex py-3">
                <div className='w-2/3 font-semibold grid place-content-center'>1 . Tshirts -wear the code </div>
                <div className='w-1/3 font-bold flex justify-center items-center gap-x-1 text-lg '> <CiCircleMinus/>  1 <CiCirclePlus/> </div>
                </div>
              </li>
              <li>
                <div className="item flex py-3">
                <div className='w-2/3 font-semibold grid place-content-center'>1 . Tshirts -wear the code </div>
                <div className='w-1/3 font-bold flex justify-center items-center gap-x-1 text-lg '> <CiCircleMinus/>  1 <CiCirclePlus/> </div>
                </div>
              </li>
              <div className="flex">
              <button class="flex  justify-center items-center gap-2 mx-auto mt-8 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg"><IoBagCheckSharp className='text-xl' /> Checkout</button>
              <button  onClick={clearCart} class="flex  justify-center items-center gap-2 mx-auto mt-8 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg">Clear Cart</button>
              </div>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
