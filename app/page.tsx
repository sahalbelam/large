import Blogs from '@/components/Blogs'
import Herosection from '@/components/Herosection'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className='bg-gradient-to-bl from-slate-800 to-slate-950 min-h-screen h-full'>
      <Navbar />
      <Herosection />
      <Blogs />
    </div>
  )
}

export default page