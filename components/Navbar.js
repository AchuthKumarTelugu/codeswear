import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosCloseCircle } from "react-icons/io";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { IoBagCheckSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from 'next/router';
const Navbar = ({ addToCart, removeFromCart, clearCart, subTotal, cart, key, user }) => {
  const router = useRouter()
  const ref = useRef()
  const toggleCart = () => {

    if (ref.current.classList.contains("hidden")) {
      ref.current.classList.remove("hidden")
    }
    else if (!ref.current.classList.contains("hidden")) {
      ref.current.classList.add("hidden")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    alert('logout successful!')
    // router.push('/login')
    window.location = '/login'
  }
  // console.log('user',user)
  const [dropdown, setDropdown] = useState(false)
  const handleDropdown = () => {
    console.log('dropdown is called')
    setDropdown(!dropdown)
  }

  return (
    <div className='bg-slate-100'>
      <div className="flex justify-between items-center px-10  gap-4 md:gap-4 py-3 md:py-2 bg-slate-100 shadow-lg mb-3  md:justify-between md:flex-row ">
        <div className='flex gap-3 items-center flex-col md:flex-row '>
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
          <div className=' px-6 py-2 font-bold text-3xl rounded  relative flex gap-6 flex-col md:flex-row'>
            <a>
              {dropdown && <div onMouseLeave={() => setDropdown(false)} className="text-sm  font-semibold absolute right-12 top-12 bg-white shadow-md border  rounded-md py-2 px-3 w-36 md:w-54" >
                <ul className='flex flex-col gap-4'>
                  <Link href={'/Orders'}><li className='hover:underline hover:text-pink-500 cursor-pointer'>Orders</li></Link>
                  <Link href={'MyAccount'}> <li className='hover:underline hover:text-pink-500 cursor-pointer'>My account</li></Link>
                  <li onClick={handleLogout} className='hover:underline cursor-pointer hover:text-pink-500'>Log out</li>
                  <li className='hover:underline hover:text-pink-500'></li>
                </ul>
              </div>}

              {user && user.value ? <div > <MdAccountCircle onMouseEnter={handleDropdown} className='hover:text-[#FF87A5] text-4xl' /></div> : ""}
            </a>
            {user && !(user.value) ? <Link href={'/login'} ><div className=' text-base md:text-xl font-semibold hover:hover:text-[#CE2BCE] hover:bg-pink-200 bg-pink-500 text-white px-2 md:px-4 py-1 md:py-2 rounded '>Login</div></Link> : ""}
            <FaCartShopping onClick={toggleCart} className='hover:text-[#FF87A5]' />
          </div>

          <div ref={ref} className="z-[999] sideCart w-80 h-full overflow-y-scroll absolute top-0 right-0 bg-pink-200 px-6 py-6  
           hidden"
          >
            <h1 className='font-bold text-2xl text-center capitalize'>This is shopping cart</h1>
            <span onClick={toggleCart} className='absolute top-5 right-2 cursor-pointer text-2xl text-pink-500'><IoIosCloseCircle className='' /></span>
            <ol className='mt-6'>
              {Object.keys(cart).length <= 0 && <div className='font-semibold text-pink-500 text-center text-lg '>No items in cart :( ,Please add items few items to checkout</div>}
              {Object.keys(cart).map((k) => <li key={k} >
                <div className="item flex py-3">
                  <div className='w-2/3 font-semibold grid place-content-center text-lg md:text-xl capitalize'>{cart[k].name} ({cart[k].variant}{cart[k].color && "/"}{cart[k].color}) </div>
                  <div className='w-1/3 font-bold flex justify-center items-center gap-x-1 text-xl '> <CiCircleMinus className='text-pink-500' onClick={() => removeFromCart(k, 1)} /> {cart[k].qty}<CiCirclePlus className='text-pink-500' onClick={() => addToCart(k, cart[k].price, 1, cart[k].variant, cart[k].name)} /> </div>
                </div>
              </li>)}
              {Object.keys(cart).length > 0 ? <div className='text-lg text-pink-500 font-semibold ml-5 mt-7'>SubTotal : ₹{subTotal}</div> : null}
              <div className="flex">
                <Link href={"/checkout"}> <button className="flex  justify-center items-center gap-2 mx-auto mt-8 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg "><IoBagCheckSharp className='text-xl' /> Checkout</button></Link>
                <button onClick={clearCart} className="flex  justify-center items-center gap-2 mx-auto mt-8 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg">Clear Cart</button>
              </div>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
