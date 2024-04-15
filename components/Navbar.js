import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaCartShopping } from "react-icons/fa6";
const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between items-center px-10  gap-4 md:gap-4 py-3 md:py-2 bg-slate-100 shadow-lg mb-3 mt-1 md:justify-between  md:flex-row">
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
          <button className=' px-6 py-3 font-bold text-3xl rounded hover:text-[#FF87A5]'>
            <FaCartShopping />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
