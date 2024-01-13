import { useEffect, useRef, useState } from 'react';
import MassageModel from './MassageModel';
import io from 'socket.io-client';
import getCurrentDate from '@/utils/formatTime';

const socket = io('https://tealcian-backend-production.up.railway.app');

interface YourStateType {
  time: string;
  data: Array<{
    body: string;
    own: number;
    time: string;
  }>;
}

interface YourStateArrayType extends Array<YourStateType> {}

const Chat = (props: any) => {
  const [inputValue, setInputValue] = useState('');
  const [massages, setMassages] = useState<YourStateArrayType>([]);
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const onChange = (event: any) => {
    setInputValue(event.currentTarget.value);
  };

  useEffect(() => {
    setMassages([]);
  }, [props.data.privateId]);

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({
        top: scrollableDivRef.current.scrollHeight+50,
        behavior: 'smooth',
      });
    }
  }, [massages]);

  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(
        'https://tealcian-backend-production-3d2b.up.railway.app/chat/getMessages',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '<origin>',
          },
          body: JSON.stringify({
            roomId: props.data.privateId,
            refreshToken: localStorage.getItem('refreshToken'),
          }),
        }
      );
      const data = response.json();
      data.then(result => {
        console.log(result);
        setMassages(result);
      });
    };
    fetching();
  }, [props.data.privateId]);

  useEffect(() => {
    console.log('message');
    socket.emit('join', {privateId: props.data.privateId});
    socket.on('receiveMessage', data => {
      setMassages(prevMassages => {
        const updatedData = [...prevMassages];
        const newObj = {
          body: data.body,
          own: 1,
          time: data.time,
          userName: data.userName,
        };
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();

        const DataObject = {
          time: `${month}/${day}/${year}`,
          data: [newObj],
        };

        let bol = false;
        for (let i = 0; i < prevMassages.length; i++) {
          if (prevMassages[i].time === getCurrentDate()) {
            bol = true;
            prevMassages[i].data.push(newObj);
            break;
          }
        }

        if (!bol) {
          updatedData.push(DataObject);
        }

        return updatedData;
      });
    });
  }, [socket]);

  const handleKeyBoard = (event: any) => {
    if (event.key === 'Enter') {
      addMassage();
    }

  };

  useEffect(() => {
    localStorage.setItem('isChannel', 'true');
    socket.emit('joinToAll', { targetId: props.data.privateId });
  },[])

  const addMassage = () => {
    if (inputValue.length > 0) {
      socket.emit('addMessage', {
        targetId: props.data.privateId,
        refreshToken: localStorage.getItem('refreshToken'),
        message: inputValue,
        targetType: 'private',
      });
      socket.emit('sendNotification', {roomId: 2178, refreshToken: localStorage.getItem('refreshToken'), message: inputValue});
      setMassages(prevMassages => {
        const updatedData = [...prevMassages];
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const messageObject = {
          body: inputValue,
          own: 0,
          time: new Date().toString(),
          userName: 'Ugur',
        };
        const DataObject = {
          time: `${month}/${day}/${year}`,
          data: [messageObject],
        };

        let bol = false;

        for (let i = 0; i < prevMassages.length; i++) {
          if (prevMassages[i].time === getCurrentDate()) {
            bol = true;
            prevMassages[i].data.push(messageObject);
            break;
          }
        }

        if (!bol) {
          updatedData.push(DataObject);
        }

        return updatedData;
      });
      setInputValue('');
    }
  };

  return (
    <div className=' flex flex-col  h-screen'>
      <div className=' flex mt-[24px] mb-[18px] ml-6'>
        <button className='hidden third hover:bg-gray-300 rounded-lg cursor-pointer w-[40px] h-[40px] mt-auto mb-auto mr-5'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            data-slot='icon'
            className=' w-[30px] h-[30px] mr-auto ml-auto'>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
            />
          </svg>
        </button>
        <div className=' relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-black rounded-full dark:bg-gray-600'>
          <span className='font-medium text-white dark:text-gray-300'>JL</span>
        </div>
        <h1 className=' text-[20px] ml-10 my-2'>{props.data.user}</h1>
      </div>
      <hr className='h-[2px] border-gray-500 my-3' />
      <div className=' h-full overflow-y-auto' ref={scrollableDivRef}>
        {massages.map((value: any, ind: any) => (
          <div key={ind}>
            <div className='flex justify-center items-center'>
              <div className=' bg-[#D9D9D9] rounded-lg '>
                <p className=' px-3 py-1 text-[13px]'>{value.time}</p>
              </div>
            </div>
            {value.data.map((msg: any, msgIndex: any) => (
              <MassageModel
                key={msgIndex}
                user={msg.userName}
                massage={msg.body}
                time={msg.time}
                own={msg.own}
              />
            ))}
          </div>
        ))}
      </div>
      <div className=' flex justify-center items-center p-2 w-full '>
        <input
          type='text'
          value={inputValue}
          onKeyDown={handleKeyBoard}
          id='typing'
          onChange={onChange}
          className='bg-gray-50 border w-[250px] mr-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Type....'
          required
        />
        <button onClick={addMassage}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            className={`w-6 h-6 hover:text-blue-500`}>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;
