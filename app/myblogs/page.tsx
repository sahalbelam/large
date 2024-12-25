import Navbar from '@/components/Navbar'
import UsersBlog from '@/components/UsersBlog'

const page = () => {
  return (
    <div className='bg-gradient-to-bl from-slate-800 to-slate-950 min-h-screen h-full'>
      <Navbar />
      <UsersBlog />
    </div>
  )
}

export default page
