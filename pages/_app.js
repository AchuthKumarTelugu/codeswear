import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
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
    let keys=Objects.keys(myCart)
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
    let myCart = cart;
    if (itemCode in myCart) {
      myCart[itemCode].qty = qty + myCart[itemCode].qty;
      // myCart[itemCode].price = price + myCart[itemCode].price;
    } else if (!itemCode in myCart) {
      myCart[itemCode] = { price, qty: 1, variant, name };
    }
    setCart(myCart)
    saveCart(myCart)
  }
  function removeFromCart(itemCode, price, qty, variant, name) {
    let myCart = cart;
    if (itemCode in myCart) {
      myCart[itemCode].qty = qty - myCart[itemCode].qty;
      // myCart[itemCode].price = price - myCart[itemCode].price;
    }
    if (myCart[itemCode]["qty"] <= 0) { // if quantity becomes less than 1 ,it becomes non-existence
      delete myCart[itemCode];
    }
    setCart(myCart)
    saveCart(myCart)
  }

  return <>
    <Navbar  addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} cart={cart}/>
    <Component {...pageProps}  addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} cart={cart}/>;
    <Footer />
  </>
}

