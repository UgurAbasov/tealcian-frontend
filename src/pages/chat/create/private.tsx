import checkAuth from "@/utils/checkAuth"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ErrorModel from "@/components/ErrorModel"

const CreateRoom = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState('')
    const [validation, setValidation] = useState({
        isError: false,
        massage: '',
        solution: '',
        isServerError: false
    })
    const [buttonLoading,setButtonLoading] = useState(false)

    const onChange = (event: any) => {
        setValue(event.currentTarget.value)
    }

    const onClick = async () => {
       if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)){
        const refreshToken = localStorage.getItem('refreshToken')
        setButtonLoading(true)
        const response = await fetch(`${process.env.BACKEND_URL}/chat/private`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "<origin>"
            },
            body: JSON.stringify({refreshToken, userEmail: value})
        })
        const data = response.json()
        data.then((result) => {
            if(result.result){
                router.push('/chat')
            } else {
                setButtonLoading(false)
                setValidation({
                    isError: true,
                    massage: result.message,
                    solution: '',
                    isServerError: true
                })
            }
        })
       } else {
        setValidation({
            isError: true,
            massage: 'Make sure that you wrote valid email',
            solution: '',
            isServerError: false
        })
       }
    }
    
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
            <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-[25px] mb-[40px]">Creating room</h1>
            <div className="w-[300px]  relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" onChange={onChange} id="default-search" className="block p-5 pl-10 w-[100%] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write user's email" required />
                {validation.isError ? (
                            <ErrorModel errorType={validation.isServerError ? 'Server error occured' : 'Invalid Data'} massage={validation.massage} solving={validation.solution} function={() => setValidation({
                                isError: false,
                                massage: '',
                                solution: '',
                                isServerError: false
                            })} />
                        ) : ('')}
            </div>
            <button type="button" onClick={onClick} className="text-white mt-[60px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{
            buttonLoading ? (<span className="loader"></span>) : ('Create')
            }</button>
            <div className="flex mt-[40px]  hover:text-white rounded-lg  cursor-pointer hover:bg-blue-700 ">
                <svg className="w-6 h-6 mr-[15px] mt-[15px] ml-[3px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                </svg>
               <Link href='/chat/create'><p className="px-4 py-3.5 ">Backwards</p></Link> 
            </div>
        </div>
        )}
        </>
    )
}


export default CreateRoom