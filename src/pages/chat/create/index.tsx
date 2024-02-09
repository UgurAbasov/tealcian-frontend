import checkAuth from "@/utils/checkAuth"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const BeforeCreate = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetching() {
            const data = await checkAuth().then((result) => {
                if (result === 0) {
                    router.push('/auth/sign')
                } else if (result === 1) {
                    setLoading(false)
                }
            })
        }
        fetching()
    }, [])
    return (
        <>{loading ? (
            <div className="h-screen flex">
                    <svg className=" mx-auto my-auto" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="40px" height="40px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40" xmlSpace="preserve">
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
            <div className=" flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center   w-[478px] h-[468px] bg-white rounded-lg">
           <button onClick={() => router.push('/chat')} className=" mr-3 ml-auto w-14 h-10 rounded-xl mt-2 hover:bg-slate-300 focus:bg-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" className=" mr-auto ml-auto text-white" height="20" width="16" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
                </button> 
                <h1 className=" text-[30px] mb-[3px]">Create room</h1>
                <div className=" w-[250px]">
                    <p className=" text-center text-[20px] mb-[8px]">if you are going to create a room, from 1 to 10
                        people can enter it</p>
                </div>
                <Link href='/chat/create/room'><button type="button" className="w-[110px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button></Link>
                <h1 className=" text-[30px] mb-[3px]">Create chat</h1>
                <div className=" w-[245px]">
                    <p className=" text-center text-[20px] mb-[8px]">if you are going to create a chat, you can
                        only talk with 1 person</p>
                </div>
                <Link href='/chat/create/private'><button type="button" className="w-[110px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button></Link>
            </div>
        </div>
        )}
        </>
    )
}

export default BeforeCreate