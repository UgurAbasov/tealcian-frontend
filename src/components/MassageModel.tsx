import { useEffect, useState } from "react";

const MassageModel = (props: any) => {

const [time, setTime] = useState('')

useEffect(() => {
  const dateObject = new Date(props.time);
  const timeString = dateObject.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  setTime(timeString)
}, [])


    if(props.own === 0){
        return ( <div className=" flex flex-col justify-end items-end mt-6 mr-[10px]">
        <div className=" bg-blue-500 w-[140px] break-words rounded-xl ">
            <h1 className=" px-2 py-2">{props.massage}
            </h1>
        </div>
        <h1 className="mr-[10px]">{time}</h1>
    </div>)
    } else {
        return (
            <div className=" flex flex-col justify-start items-start mt-6 ml-[10px]">
                <div className=" bg-white w-[140px] break-words rounded-xl">
                    <h1 className=" px-2 py-2">{props.massage}
                    </h1>
                </div>
                <h1 className="mr-[10px]">{time}</h1>
            </div>
        )
    }
}

export default MassageModel