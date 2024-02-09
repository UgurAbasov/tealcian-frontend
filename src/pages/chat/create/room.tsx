import ErrorModel from "@/components/ErrorModel"
import checkAuth from "@/utils/checkAuth"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const CreateRoom = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState({
        name: '',
        search: ''
    })
    const [validation, setValidation] = useState({
        isError: false,
        massage: '',
        solution: '',
        isServerError: false
    })
    const [buttonLoading,setButtonLoading] = useState(false)
    const [addedElements,setAddedElements] = useState<string[]>([])

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

    const onChange = (event: any) => {
        setValue({
            ...value,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }
    const deleteUsers = (index: any) => {
        const newArr = [...addedElements]; 
        newArr.splice(index, 1);
        setAddedElements(newArr);
    }

    const addingUsers = () => {
        if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.search) && addedElements.length < 10){
            if(addedElements.includes(value.search)){
                setValidation({
                    isError: true,
                    massage: 'You already added this element',
                    solution: '',
                    isServerError: false
                })
            } else {
            setAddedElements([...addedElements, value.search])
            }
        } else {
            setValidation({
                isError: true,
                massage: 'Make sure that you wrote valid email or you added more than 10 blocks',
                solution: '',
                isServerError: false
            })
        }
    }

    const onClick = async () => {
        const refreshToken = localStorage.getItem('refreshToken')
        if(value.name.length < 6 || !/^[a-zA-Z0-9]*$/.test(value.name)){
            setValidation({
                isError: true,
                massage: 'Make sure that you wrote valid name',
                solution: `Name's length must be bigger than 5 and it must consist of letters and numbers`,
                isServerError: false
            })
        } else if(addedElements.length === 0){
            setValidation({
                isError: true,
                massage: 'No users in data',
                solution: `You need to add minimum 1 user to create room`,
                isServerError: false
            })
        } else {
        const response = await fetch(`${process.env.BACKEND_URL}/chat/room`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "<origin>"
            },
            body: JSON.stringify({refreshToken, name: value.name, users: addedElements })
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
                    solution: 'Write correct emails',
                    isServerError: true
                })
            }
        })
    }
    }
    
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
<div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-[25px] mb-[40px]">Creating room</h1>
            <input type="text" name="name" onChange={onChange} id="default-search" className="block p-5 mb-4 pl-10 w-[300px] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write room&apos;s name" required />
            <div className="w-[300px] max-w-[100%] relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" name="search" onChange={onChange} id="default-search" className="block p-5 pl-10 w-[100%] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search usernames" required />
                <button type="submit" onClick={addingUsers} className="text-white h-[60%] aspect-square right-[10px] top-[20%] absolute  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
            </div>
            {validation.isError ? (
                            <ErrorModel errorType={validation.isServerError ? 'Server error occured' : 'Invalid Data'} massage={validation.massage} solving={validation.solution} function={() => setValidation({
                                isError: false,
                                massage: '',
                                solution: '',
                                isServerError: false
                            })} />
                        ) : ('')}
<div className="w-[300px] mb-5 overflow-y-auto max-h-[170px] break-words mt-4 rounded-lg border border-gray-300 text-gray-500">
    {addedElements.map((value, ind) => (
        <div key={ind} className="flex h-[50px] rounded-lg items-center cursor-pointer hover:bg-[#dcdae3]">
            <p className=" ml-3 inline-block">{value}</p>
        <svg className=" mr-3 ml-auto inline-block" onClick={() => deleteUsers(ind)} xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
        </div>
    ))}
</div>

            <button type="button" onClick={onClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>
            <div className="flex mt-[40px]  hover:text-white rounded-lg  cursor-pointer hover:bg-blue-700 ">
                <svg className="w-6 h-6 mr-[15px] mt-[15px] ml-[3px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                </svg>
                <Link href='/chat/create'><p className="px-4 py-3.5 ">Backwards</p></Link>
            </div>
        </div>
        )}</>
    )
}


export default CreateRoom