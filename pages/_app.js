import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {

  const router = useRouter()
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(null)
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(null)
  const [progress, setProgress] = useState(0)
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
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ value: token })
      setKey(Math.random())
    }
    console.log("hey iam useeffect from _app.js")

  }, [router.query])


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
    toast.error('Clearing cart', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
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
    toast.success(`item added`, {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    })
  }
  function removeFromCart(itemCode, qty) {
    let myCart = { ...cart };

    if (myCart[itemCode]) {
      myCart[itemCode].qty = myCart[itemCode].qty - qty;
      if (myCart[itemCode].qty <= 0) { // if quantity becomes less than 1 ,it becomes non-existence
        delete myCart[itemCode];
      }

      toast.error("item removed!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    setCart(myCart)
    saveCart(myCart)
  }
  const buyNow = (itemCode, price, qty, variant, name, color) => {
    setCart({})
    setSubTotal(0)
    localStorage.setItem("cart", JSON.stringify({}));
    localStorage.setItem("subtotal", JSON.stringify(0));//clearing code raw logic
    let myCart = { ...cart }
    myCart[itemCode] = { price, qty: 1, variant, name, color };
    setCart(myCart)
    saveCart(myCart)

    router.push('/checkout')
  }
  useEffect(()=>{
    router.events.on('routeChangeStart', ()=>setProgress(40))
    router.events.on('routeChangeComplete', ()=>setProgress(100))
  },[router.events])
  return <>
    <Head>
      <title>Codeswear.com</title>
      <link rel="shortcut icon" href="/logo-2.png" />
      <meta name="description" content="CodesWear.com - Wear the code" />
    </Head>
    <LoadingBar
        color='#DB2777'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
    <Navbar addToCart={addToCart} key={key} user={user} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} cart={cart} />
    <Component   {...pageProps} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} cart={cart} buyNow={buyNow} />;
    <ToastContainer />
    <Footer />
  </>
}
