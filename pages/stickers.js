import React from 'react';
import Link from 'next/link';
import mongoose from "mongoose";
import Product from '@/modals/Product';

const Stickers = (props) => {
  let { stickers } = props;
  console.log("stickers", stickers)
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-14 py-24 mx-auto">
          {stickers && (
            <div className="flex flex-wrap -m-4 justify-center">
              {Object.keys(stickers).map((item, index) => (
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-2" key={index}>
                  <Link href={`products/${stickers[item].slug}`}>
                    <div className="block relative h-48 rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object-cover object-center w-full h-full block"
                        src={`${stickers[item].img}`}
                        width={400}
                        height={600}
                      />
                    </div>

                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        Stickers
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {stickers[item].title}
                      </h2>
                      <p className="mt-1">₹{stickers[item].price}</p>
                      <p className='mt-1 flex gap-2 uppercase '>{stickers[item].size.map((item, index) => <span key={index} className='border-2 text-center px-2 py-1 '>{item}</span>)}</p>
                      <p className='mt-3 flex gap-2 uppercase '>{stickers[item].color.map((item, index) => <span key={index} className='w-6 h-6 rounded-full border-2' style={{ backgroundColor: `${item}` }}></span>)}</p>
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

  let products = await Product.find({ category: "stickers" });
  products = JSON.parse(JSON.stringify(products)); // to make JSON serializable

  let stickers = {}; // key is tshirt title and value is its whole object
  // Goal here is to know availability of different colors and sizes
  for (let item of products) {
    if (item.title in stickers) {
      if (item.availableQty > 0) {
        // If its availability is greater than 0, then check if this new item's size or color is not there in previous one, we will push it in them
        if (!stickers[item.title].color.includes(item.color)) {
          stickers[item.title].color.push(item.color);
        }
        if (!stickers[item.title].size.includes(item.size)) {
          stickers[item.title].size.push(item.size);
        }
      }
    } else {
      stickers[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        // If available quantity is more than 0, then we make size and color properties as arrays
        stickers[item.title].color = item.color.split(' ');
        stickers[item.title].size = item.size.split(' ');
      }
    }
  }

  return {
    props: { stickers }
  };
}

export default Stickers;
