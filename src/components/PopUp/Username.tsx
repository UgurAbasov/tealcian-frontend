const UserName = (props: any) => {
    return (
        <div id="static-modal" data-modal-backdrop="static" className="flex items-center justify-center fixed top-0 right-0  left-0 z-50 h-screen">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-black dark:text-white">
                    Editing username
                </h3>
                <button type="button" onClick={props.function} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
            <input
            type='text'
            id='email'
            className=' mb-[17px] w-[278px] sm:w-[350px] h-[42px] border-black p-2 rounded-lg   focus:outline-none focus:border-black focus:ring-black'
            placeholder='username'
          />
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b  dark:border-gray-600">
                <button onClick={props.function} data-modal-hide="static-modal" type="button" className="text-white bg-black focus:ring-4 mr-10 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Change</button>
                <button onClick={props.function} data-modal-hide="static-modal" type="button" className="text-white bg-black  focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancel</button>

                            </div>
        </div>
    </div>
</div>

    )
}

export default UserName