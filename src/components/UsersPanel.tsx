const UserPanel = (props: any) => {
    return (
        <button onClick={props.onClick} className="flex w-full justify-center items-center focus:bg-[#cecbd4] mb-5">
        <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-black rounded-full dark:bg-gray-600">
            {/* <span className="font-medium  text-white dark:text-gray-300">JL</span> */}
            <img src={props.avatarUrl} />
        </div>
        {/* ------- 2 flex ------------ */}
        <div className=" flex flex-col w-[60%] ml-2   ">
            {/* ------- 3 flex ------------ */}
            <div className=" flex">
                <p className="truncate">{props.userName}</p>
                <p className=" ml-auto mr-[1px] text-[#686670] text-[15px] ">{props.lastActive}</p>
            </div>
            {/* ------- 4 flex ------------ */}
            <div className="flex  gap-1">
                {props.viewStatus ? <svg className="w-3 h-3 text-blue-500 mt-1 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                </svg> : ' '}
                <p className=" text-[#686670] truncate text-[13px] w-[190px] ">{props.lastMassage}</p>
            </div>
        </div>
    </button> 
      )
} 

export default UserPanel