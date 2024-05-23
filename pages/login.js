import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
const Login = () => {
  const jwt = require('jsonwebtoken');
  const router=useRouter()
  const [userInfo, setUserInfo] = useState({
    email: "", password: ""
  })
  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.currentTarget.name]: e.currentTarget.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("userinfo", userInfo)
    try {
    
      axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/Login`, userInfo).then((value) => {
        if (value.data.success) {
          alert('user detected')
          localStorage.setItem('token',(value.data.token))//setting token in local storage
          router.push('/')
        } 
        setUserInfo({
          email: "", password: ""
        })
      }).catch(err=>{
        // console.log(err)
        // alert('user not found')
        toast.error("Incorrect password/email entered", {
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
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-40 w-40"
            src="logo-2.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required=""
                  value={userInfo.email} onChange={onChange}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="/forgot"
                    className="font-semibold text-pink-600 hover:text-pink-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required=""
                  value={userInfo.password} onChange={onChange}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                Log in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              href="/signup"
              className="font-semibold leading-6 text-pink-600 hover:text-pink-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
<ToastContainer containerId={"login"}/>
    </div>
  )
}

export default Login
