import React from 'react';
import Link from 'next/link';
import mongoose from "mongoose";
import Product from '@/modals/Product';

const Mugs = (props) => {
  let { mugs } = props;
  console.log("mugs", mugs)
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-14 py-24 mx-auto">
          {mugs && (
            <div className="flex flex-wrap -m-4 justify-center">
              {Object.keys(mugs).map((item, index) => (
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-2" key={index}>
                  <Link href={`products/${mugs[item].slug}`}>
                    <div className="block relative h-48 rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object-cover object-center w-full h-full block"
                        src={`${mugs[item].img}`}
                        width={400}
                        height={600}
                      />
                    </div>

                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        Mugs
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {mugs[item].title}
                      </h2>
                      <p className="mt-1">₹{mugs[item].price}</p>
                      <p className='mt-1 flex gap-2 uppercase '>{mugs[item].size.map((item, index) => <span key={index} className='border-2 text-center px-2 py-1 '>{item}</span>)}</p>
                      <p className='mt-3 flex gap-2 uppercase '>{mugs[item].color.map((item, index) => <span key={index} className='w-6 h-6 rounded-full border-2' style={{ backgroundColor: `${item}` }}></span>)}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({ category: "mugs" });
  products = JSON.parse(JSON.stringify(products)); // to make JSON serializable

  let mugs = {}; // key is tshirt title and value is its whole object
  // Goal here is to know availability of different colors and sizes
  for (let item of products) {
    if (item.title in mugs) {
      if (item.availableQty > 0) {
        // If its availability is greater than 0, then check if this new item's size or color is not there in previous one, we will push it in them
        if (!mugs[item.title].color.includes(item.color)) {
          mugs[item.title].color.push(item.color);
        }
        if (!mugs[item.title].size.includes(item.size)) {
          mugs[item.title].size.push(item.size);
        }
      }
    } else {
      mugs[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        // If available quantity is more than 0, then we make size and color properties as arrays
        mugs[item.title].color = item.color.split(' ');
        mugs[item.title].size = item.size.split(' ');
      }
    }
  }

  return {
    props: { mugs }
  };
}

export default Mugs;
