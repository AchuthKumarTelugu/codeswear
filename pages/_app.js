import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  useEffect(() => {
    console.log('entered cart useEffect');
    try {
      if (localStorage.getItem("cart")) {
        const cartItems = JSON.parse(localStorage.getItem("cart"))
        setCart(cartItems)
      } else {
        localStorage.setItem("cart", JSON.stringify({}));
      }
    } catch (error) {
      console.log(error);
    }

  }, [])

  const saveCart = (data) => {
    localStorage.setItem("cart", JSON.stringify(data))
    let subtotal=0;
    let myCart=cart
    let keys=Object.keys(myCart)
    for(let i=0;i<keys.length;i++) {
      subtotal=myCart[keys[i]].qty *myCart[keys[i]].price
    }
    setSubTotal(subtotal)
  }
  const clearCart = () => {
    setCart({})
    saveCart({})
    console.log("cart has been cleared")
  }

  function addToCart(itemCode, price, qty, variant, name) {
    console.log("entered add to cart")
    console.log(itemCode, price, qty, variant, name)
    let myCart = cart;
    console.log("myCart",myCart)
    console.log("itemCode in myCart",myCart[itemCode])
    console.log("!itemCode in myCart",!myCart[itemCode])
    if ( myCart[itemCode]) {
      console.log("item is present in cart")
      myCart[itemCode].qty = qty + myCart[itemCode].qty;
      // myCart[itemCode].price = price + myCart[itemCode].price;
    } else  {
      console.log("item is not present in cart")
      myCart[itemCode] = { price, qty: 1, variant, name };
    }
    setCart(myCart)
    saveCart(myCart)
  }
  function removeFromCart(itemCode, price, qty, variant, name) {
    let myCart = cart;
    console.log("entered removeFromCart");
    console.log('cart[itemCode].qty',myCart[itemCode].qty,"qty to be added",qty,"cart[itemCode].qty-qty",qty - myCart[itemCode].qty);
    
    if (itemCode in myCart) {
      myCart[itemCode].qty = myCart[itemCode].qty - qty ;
      // myCart[itemCode].price = price - myCart[itemCode].price;
    }
    if (myCart[itemCode].qty <= 0) { // if quantity becomes less than 1 ,it becomes non-existence
      delete myCart[itemCode];
    }
    setCart(myCart)
    saveCart(myCart)
  }

  return <>
  <Head>
    <title>Codeswear.com</title>
    <link rel="shortcut icon" href="/logo-2.png" />
    <meta name="description" content="CodesWear.com - Wear the code" />
  </Head>
    <Navbar  addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} cart={cart}/>
    <Component {...pageProps}  addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} cart={cart}/>;
    <Footer />
  </>
}

