import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
const MyAccount = () => {
  const router=useRouter()
  useEffect(()=>{
    if(!(localStorage.getItem('token'))) {
router.push('/login')
    }
  },[])
  return (
    <div>
      myaccount page
    </div>
  )
}

export default MyAccount
