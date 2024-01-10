import SearchComponentWithUsers from "@/containers/SearchWithUsers"
import SearchComponentWithoutUsers from "@/containers/SearchWithoutUsers"
import { useState, useRef, useEffect } from "react"
import UserPanel from "@/components/UsersPanel"
import MassageModel from "@/components/MassageModel"
const LargeWidthChat = () => {

    return (
        <div className=" h-screen flex ">
            <div className=" w-[30%] bg-white h-full">
                <div className="flex flex-col items-center  justify-center">
                    <div className=" flex mt-3 mb-1">
                        <h1 className="text-[20px] mt-1 ">Chats</h1>
                        <svg className="hover:bg-blue-700  bg-blue-500 ml-[120px] mr-[10px] text-white w-8 h-8 p-[6px] rounded-lg hover:cursor-pointer dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                        </svg>
                        <svg className=" w-8 h-8 p-[6px] hover:cursor-pointer hover:bg-blue-700 bg-blue-500 rounded-lg text-white  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                            <path d="M7.324 9.917A2.479 2.479 0 0 1 7.99 7.7l.71-.71a2.484 2.484 0 0 1 2.222-.688 4.538 4.538 0 1 0-3.6 3.615h.002ZM7.99 18.3a2.5 2.5 0 0 1-.6-2.564A2.5 2.5 0 0 1 6 13.5v-1c.005-.544.19-1.072.526-1.5H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h7.687l-.697-.7ZM19.5 12h-1.12a4.441 4.441 0 0 0-.579-1.387l.8-.795a.5.5 0 0 0 0-.707l-.707-.707a.5.5 0 0 0-.707 0l-.795.8A4.443 4.443 0 0 0 15 8.62V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.12c-.492.113-.96.309-1.387.579l-.795-.795a.5.5 0 0 0-.707 0l-.707.707a.5.5 0 0 0 0 .707l.8.8c-.272.424-.47.891-.584 1.382H8.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1.12c.113.492.309.96.579 1.387l-.795.795a.5.5 0 0 0 0 .707l.707.707a.5.5 0 0 0 .707 0l.8-.8c.424.272.892.47 1.382.584v1.12a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1.12c.492-.113.96-.309 1.387-.579l.795.8a.5.5 0 0 0 .707 0l.707-.707a.5.5 0 0 0 0-.707l-.8-.795c.273-.427.47-.898.584-1.392h1.12a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5ZM14 15.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
                        </svg>
                    </div>
                    <div className="relative w-[246px] h-[40px]">
                        <div className="absolute rounded-l-lg inset-y-0 left-0 flex items-center p-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="default-search" className="block w-[246px] h-[40px] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search users" required />
                    </div>
                </div>
                <hr className="h-[2px] border-gray-500 my-3" />
               <UserPanel avatarUrl="https://gravatar.com/avatar/2e5178124f4966c5679f41dc9ef3129a?s=400&d=robohash&r=x" userName='Udjdjdjjjjjj' lastActive='Yesterday' viewStatus={true} lastMassage='Hi how are you?' />
               <UserPanel avatarUrl="https://gravatar.com/avatar/a8a0fd331eb3afecf8f1f9b82962e8e3?s=400&d=robohash&r=x" userName='Udjdjdjjjjjj' lastActive='Yesterday' lastMassage='Hi how are you?' />
               <UserPanel avatarUrl="https://gravatar.com/avatar/8595728df9bbb8859b779c3406832ac9?s=400&d=robohash&r=x" userName='Udjdjdjjjjjj' lastActive='Yesterday'  lastMassage='Hi how are you?' />
               <UserPanel avatarUrl="https://gravatar.com/avatar/1da39d4d928822176767977d1eda992d?s=400&d=robohash&r=x" userName='Udjdjdjjjjjj' lastActive='Yesterday' viewStatus={true} lastMassage='Hi how are you?' />
               <UserPanel avatarUrl="https://gravatar.com/avatar/eb08797edef62350cd07f85456d45674?s=400&d=robohash&r=x" userName='Udjdjdjjjjjj' lastActive='Yesterday' viewStatus={true} lastMassage='Hi how are you?' />

            </div>
            <div className=" w-[70%]">
                <div className=" flex flex-col h-screen">
                    <div className=" flex mt-[24px] mb-[18px] ml-6">
                        <div className=" relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-black rounded-full dark:bg-gray-600">
                            <span className="font-medium text-white dark:text-gray-300">JL</span>
                        </div>
                        <h1 className=" text-[20px] ml-10 my-2">John Leon</h1>
                    </div>
                    <hr className="h-[2px] border-gray-500 my-3" />
                    <div className=" h-full overflow-y-auto">
                        <div className="flex justify-center items-center">
                            <div className=" bg-[#D9D9D9] rounded-lg ">
                                <p className=" px-3 py-1 text-[13px]">Wd, 4 June</p>
                            </div>
                        </div>
                        
                        <MassageModel  massage='skdcskcdsckdsckk' time='15:30' own={0} />
                        <MassageModel  massage='kd' time='15:30' own={1} />
                        <MassageModel  massage='8d' time='15:30' own={1} />
                        <MassageModel  massage=';s' time='15:30' own={0} />
                    </div>
                    <div className=" flex justify-center items-center p-2 w-full ">
                        <input type="text" id="typing" className="bg-gray-50 border w-[250px] mr-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type...." required />
                        <button className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:text-blue-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LargeWidthChat