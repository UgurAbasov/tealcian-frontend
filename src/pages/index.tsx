import checkAuth from "@/utils/checkAuth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"
const Home = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetching() {
        const data = await checkAuth().then((result) => {
            if (result === 0) {
                setLoading(false)
            } else if (result === 1) {
                router.push('/chat')
            }
        })
    }
    fetching()
}, [])

  return (
    <>
    {loading ? (
      <div className="h-screen flex">
      <svg className=" mx-auto my-auto" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xmlSpace="preserve">
          <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
          <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
C22.32,8.481,24.301,9.057,26.013,10.047z">
              <animateTransform attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 20 20"
                  to="360 20 20"
                  dur="0.5s"
                  repeatCount="indefinite" />
          </path>
      </svg>
  </div> 
    ) : (
    <div className=" flex justify-center items-center h-screen w-screen gap-5">
      <Link href="/auth/sign" className=" px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</Link>
      <Link href="/auth/login" className="px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</Link>
    </div>
    )}
    </>
  )
}

export default Home
