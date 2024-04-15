import { useRouter } from 'next/router'
import React from 'react'

const Slug = () => {
    const {slug}=useRouter().query
  return (
    <div>
      This is {slug}
    </div>
  )
}

export default Slug
