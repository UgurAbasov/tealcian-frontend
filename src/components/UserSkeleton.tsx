const UserSkeleton = () => {
    return(
        <button className="flex w-full justify-center items-center mb-5">
            <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600 animate-pulse">
                {/* Placeholder content for the avatar */}
                <div className="skeleton-loader w-12 h-12 bg-gray-400 animate-pulse"></div>
            </div>
            {/* ------- 2 flex ------------ */}
            <div className="flex flex-col w-[60%] ml-2">
                {/* ------- 3 flex ------------ */}
                <div className="flex">
                    {/* Placeholder content for the username */}
                    <div className="skeleton-loader rounded-sm w-20 h-4 mr-2 bg-gray-400 animate-pulse ml-4"></div>
                    {/* Placeholder content for the last active time */}
                    <div className="skeleton-loader rounded-sm w-20 h-4 bg-gray-400 animate-pulse mr-2 ml-auto"></div>
                </div>
                {/* ------- 4 flex ------------ */}
                <div className="flex gap-1">
                    {/* Placeholder content for the status icon */}
                    {/* Placeholder content for the last message */}
                    <div className="skeleton-loader rounded-sm w-[130px] mt-2 mr-auto ml-auto h-4 bg-gray-400 animate-pulse"></div>
                </div>
            </div>
        </button>

    )
}

export default UserSkeleton