import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(null)
  useEffect(() => {
    console.log('entered cart useEffect');
    try {
      if (localStorage.getItem("cart")) {
        const cartItems = JSON.parse(localStorage.getItem("cart"))
        setCart(cartItems)
        setSubTotal(JSON.parse(localStorage.getItem('subtotal')))
      } else {
        localStorage.setItem("cart", JSON.stringify({}));
      }
    } catch (error) {
      console.log(error);
    }

  }, [])

  const calculateSubTotal = (cartItems) => {
    let subTotal = 0;
    Object.values(cartItems).forEach((item) => {
      subTotal += item.price * item.qty
    })
    setSubTotal(subTotal)
    localStorage.setItem("subtotal", JSON.stringify(subTotal));
  }

  const saveCart = (data) => {
    localStorage.setItem("cart", JSON.stringify(data))
    calculateSubTotal(data)
  }
  const clearCart = () => {
    setCart({})
    setSubTotal(0)
    localStorage.setItem("cart", JSON.stringify({}));
    localStorage.setItem("subtotal", JSON.stringify(0));
  }
  useEffect(() => {
    if (subTotal > 0) {
      localStorage.setItem("subtotal", JSON.stringify(subTotal))
    }
  }, [subTotal])
  function addToCart(itemCode, price, qty, variant, name, color) {
    let myCart = { ...cart };
    if (myCart[itemCode]) {
      myCart[itemCode].qty = qty + myCart[itemCode].qty;
    } else {
      console.log("item is not present in cart")
      myCart[itemCode] = { price, qty: 1, variant, name, color };
    }
    setCart(myCart)
    saveCart(myCart)
  }
  function removeFromCart(itemCode, qty) {
    let myCart = { ...cart };

    if (myCart[itemCode]) {
      myCart[itemCode].qty = myCart[itemCode].qty - qty;
      if (myCart[itemCode].qty <= 0) { // if quantity becomes less than 1 ,it becomes non-existence
        delete myCart[itemCode];
      }
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
    <Navbar addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} cart={cart} />
    <Component {...pageProps} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} cart={cart} />;
    <Footer />
  </>
}
