import Orders from '@/modals/Orders';
import Product from '@/modals/Product';
import mongoose from 'mongoose';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Order = ({order}) => {
  const router = useRouter();
  // const {id}=router.query
  // console.log('id',id)
useEffect(()=>{
  if(order) {
    console.log('order',order,order.products)
  }
},[])
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">
          CODESWEAR.COM
        </h2>
        <h1 className="text-gray-900 text-2xl md:text-3xl title-font font-medium mb-4">
          Order Id:#{order && order.orderId}
        </h1>
       
        <p className="leading-relaxed mb-4">
          Your order had been successfully placed
        </p>
        <div className="flex mb-4">
          <div className="flex-grow border-b-2  py-2 text-sm md:text-lg px-10 flex justify-center items-center w-1/2">
            Item Description
          </div>
          <div className="flex-grow border-b-2  text-sm md:text-lg px-10 flex justify-center items-center w-1/4">
            Quantity
          </div>
          <div className="flex-grow border-b-2  text-sm md:text-lg px-10 flex justify-center items-center w-1/4">
            Item Total
          </div>
        </div>
       
        { order && Object.keys(order.products).map((item,index)=>{return ( <div key={index} className="flex border-b border-gray-200 py-2">
          <span className="text-gray-500 w-1/2  grid place-content-center  text-sm md:text-lg">{order.products[item].name}({order.products[item].variant}/{order.products[item].color})</span>
          <span className="ml-auto text-gray-900 w-1/4  grid place-content-center text-sm md:text-lg">{order.products[item].qty}</span>
          <span className="ml-auto text-gray-900 w-1/4  grid place-content-center text-sm md:text-lg">₹ {order.products[item].price} </span>
        </div>) })}
       
        <div className="flex flex-col gap-4 " >
          <span className="title-font font-medium text-2xl text-gray-900 my-5">
             SubTotal : ₹{order && order.amount}
          </span>
          <button className="flex mr-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
            Track Order
          </button>
          
        </div>
      </div>
      <img
        alt="ecommerce"
        className="w-full md:w-1/2 object-cover object-center "
        src={'order-image.jpg'}
      />
    </div>
  </div>
</section>

    </div>
  )
}
export async function getServerSideProps(context) {
  if(!(mongoose.connections[0].readyState)){
    await mongoose.connect(process.env.MONGO_URI)
  }
  // const {id}=context.query
  // console.log('id',id)
  let order=await Orders.findById(context.query.id)
  order=JSON.parse(JSON.stringify(order))
return {
  props:{order:order}
}
}

export default Order
