import React, { useEffect, useState } from 'react'
import Orders from '@/modals/Orders';
import { Router, useRouter } from 'next/router';
import mongoose from 'mongoose';
import Link from 'next/link';

const OrderList = () => {
  const router = useRouter();
  const [userOrders, setUserOrders] = useState([])
  useEffect(() => {
    try {
      if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token')
        console.log('token',token)
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myOrders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token: token })
        }).then(value => value.json()).then(response => {
          console.log(response)
          setUserOrders(response)
          // console.log("response",response)
        })
      }
    } catch (error) {
      console.log(error)
    }

  }, [])
  useEffect(()=>{
    if(userOrders!=[]) {
      console.log('userOrders',userOrders)
    }
  },[userOrders])
  return (
    <div>
      <div className="w-3/4 mx-auto  ">
        <h1 className=' font-semibold text-xl capitalize pl-5 py-3 text-center'>My orders</h1>
        <div className="items my-2">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Orders Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                    
                  <th scope="col" className="px-6 py-3">
                    details
                  </th>
                </tr>
              </thead>
              
              {
                userOrders  && <tbody>
                  {
                    userOrders.map((value, index) => { return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {value.orderId}
                    </th>
                    <td className="px-6 py-4 ">{value.email}</td>
                    <td className="px-6 py-4 text-blue-400 font-semibold hover:underline hover:text-blue-700 cursor-pointer" onClick={()=>router.push(`/order?id=${value._id}`)}><Link href={`/order?id=${value._id}`}></Link>Click here</td>
                  </tr> })
                  }
                </tbody>
              }
            </table>
             
          </div>


        </div>
      </div>

    </div>
  )
}


export default OrderList
