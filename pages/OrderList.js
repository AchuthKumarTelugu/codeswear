import React from 'react'
import Orders from '@/modals/Orders';
const OrderList = () => {
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
                    Orders name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Color
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="px-6 py-4">White</td>
                  <td className="px-6 py-4">Laptop PC</td>
                  <td className="px-6 py-4">$1999</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-4">Black</td>
                  <td className="px-6 py-4">Accessories</td>
                  <td className="px-6 py-4">$99</td>
                </tr>
              </tbody>
            </table>
          </div>


        </div>
      </div>

    </div>
  )
}
// export async function getServerSideProps(context) {
    // try {
    //     if (!(mongoose.connections[0].readyState)) { //if there is already a connection,return handler with req,res
    //         await mongoose.connect(process.env.MONGO_URI) 
    //       }
          
    //     let orders=await Orders.find({}) 
    //     orders=JSON.parse(JSON.stringify(orders))
    //     if (!orders) {
    //         return {
    //           notFound: true, // Return a 404 page if the product is not found
    //         };
    //       }
    //     return {
    //         props:{orders},
    //     }
    // } catch (error) {
    //     console.log("error occured while retreiving data")
    //     return {
    //         notFound:true
    //     }
    // }
   
// }
export default OrderList
