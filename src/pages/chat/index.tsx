import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import UserPanel from '@/components/UsersPanel';
import MassageModel from '@/components/MassageModel';
import checkAuth from '@/utils/checkAuth';
import UserSkeleton from '@/components/UserSkeleton';
import Chat from '@/components/Chat';
import { io } from 'socket.io-client';
import { createDecipher } from 'crypto';
import {openDB} from 'idb'
const socket = io('https://tealcian-backend-production.up.railway.app')

const ChatHome = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [allChats, setAllChats] = useState<any>();
  const [loadingData, setLoadingData] = useState(false);
  const [noUser, setNoUsers] = useState(true);
  const [currentData, setCurrentData] = useState();
  const [notification, setNotification] = useState<any>([])
  const [readyForData, setReadyForData] = useState(false)
  const getChatData = (index: any) => {
    setCurrentData(allChats[index]);
  };

  useEffect(() => {
    localStorage.removeItem('isChannel');
    async function useDB() {
    }
    async function fetching() {
      const data = await checkAuth().then(result => {
        if (result === 0) {
          router.push('/auth/sign');
        } else if (result === 1) {
          setLoading(false);
        }
      });
    }
    fetching();
    async function getPrivates() {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await fetch(
        'https://tealcian-backend-production-3d2b.up.railway.app/chat/getPrivates',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '<origin>',
          },
          body: JSON.stringify({ refreshToken }),
        }
      );
      const data = response.json();
      data.then(async result => {
        if (result.objectArr){
          const key = process.env.BASE_URL
          const algorithm = 'aes-256-cbc'
          const decipher = createDecipher(algorithm, key || '');
          let decrypted = decipher.update(result.objectArr, 'hex', 'utf8');
          decrypted += decipher.final('utf8');
          const gotResult = JSON.parse(decrypted)
          const dbPromise = await openDB('chats', 1, {
            upgrade(db) {
              
              db.createObjectStore('First', { keyPath:'chats', autoIncrement: true })
            }
          });
          const addObjectToDatabase = async (data: any) => {
            const db = dbPromise;
            const tx = db.transaction('First', 'readwrite');
            const store = tx.objectStore('First');
            console.log(data.privateId)
            const existingData = await store.get(data.privateId);

            if(!existingData){
              await store.add(data);
            } else {
              console.log(existingData)
            }
            await tx.done
          }

          if (gotResult.length > 0) {
             gotResult.forEach((value: any, index: any) => {
              
              addObjectToDatabase(value)
            })
            setLoadingData(true)
            setAllChats(gotResult);
            setReadyForData(true)
            const updateNotification = [...notification]
            gotResult.forEach((value: any) => {
            updateNotification.push({state: 0, privateId: value.privateId})
            })
            setNotification(updateNotification)
          } else {
            setLoadingData(true);
            setNoUsers(false);
          }
        } else {
          if (result.length < 0) {
            setNoUsers(false);
          }
        }
      });
    }
    getPrivates();
  }, []);


  useEffect(() => {
    if(readyForData){
        for(let i = 0; i < allChats.length; i++){
            socket.emit('joinToAll', { targetId: allChats[i].privateId, userId: localStorage.getItem('userId')});
        }
    }
  }, [readyForData])


  useEffect(() => {
    if (localStorage.getItem('isChannel') === 'true') {
     setNotification((prevState: any) => {
        const update = [...prevState]
        const index = notification.findIndex((item: any) => item.privateId === (currentData as any)?.privateId);
        update[index] = {privateId: update[index].privateId, state: 0}
        return update
     })
    }
  }, [currentData])
  
  useEffect(() => {
    socket.on('sendNotification', data => {
      let Data = data.toString('utf8')
      let result = JSON.parse(Data)
          if (localStorage.getItem('isChannel') !== 'true') {
        if (result.userId.toString() !== localStorage.getItem('userId')){
            if(!document.hasFocus()){
                const audio = audioRef.current;
                audio?.play().catch(() => {
                    console.log('nono')
                }) 
            }
            setNotification((prevState: any) => {
                console.log(prevState, 1)
                const update = [...prevState]
                const index = update.findIndex((item) => item.privateId === result.privateId)
                update[index] = {privateId: update[index].privateId, state: update[index].state + 1}
                return update
              });
        } else {
          console.log('else');
          }
      }
    })

  }, [socket])

  return (
    <>
      <audio ref={audioRef}>
        <source src='/tap-notification-180637.mp3' type='audio/mpeg' />
      </audio>
      {loading ? (
        <div className='h-screen flex'>
          <svg
            className=' mx-auto my-auto'
            version='1.1'
            id='loader-1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            x='0px'
            y='0px'
            width='40px'
            height='40px'
            viewBox='0 0 40 40'
            enable-background='new 0 0 40 40'
            xmlSpace='preserve'>
            <path
              opacity='0.2'
              fill='#000'
              d='M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
      s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
      c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z'
            />
            <path
              fill='#000'
              d='M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
      C22.32,8.481,24.301,9.057,26.013,10.047z'>
              <animateTransform
                attributeType='xml'
                attributeName='transform'
                type='rotate'
                from='0 20 20'
                to='360 20 20'
                dur='0.5s'
                repeatCount='indefinite'
              />
            </path>
          </svg>
        </div>
      ) : (
        <div className=' h-screen flex '>
          <div className='first w-[30%] bg-white h-full '>
            <div className='flex flex-col items-center  justify-center'>
              <div className=' flex mt-3 mb-1'>
                <h1 className='text-[20px] mt-1 '>Chats</h1>
                <svg
                onClick={() => router.push('/chat/create')}
                  className='hover:bg-blue-700  bg-blue-500 ml-[120px] mr-[10px] text-white w-8 h-8 p-[6px] rounded-lg hover:cursor-pointer dark:text-white'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 18'>
                  <path d='M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z' />
                </svg>
                <svg
                onClick={() => router.push('/chat/profile')}
                  className=' w-8 h-8 p-[6px] hover:cursor-pointer hover:bg-blue-700 bg-blue-500 rounded-lg text-white  dark:text-white'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 19'>
                  <path d='M7.324 9.917A2.479 2.479 0 0 1 7.99 7.7l.71-.71a2.484 2.484 0 0 1 2.222-.688 4.538 4.538 0 1 0-3.6 3.615h.002ZM7.99 18.3a2.5 2.5 0 0 1-.6-2.564A2.5 2.5 0 0 1 6 13.5v-1c.005-.544.19-1.072.526-1.5H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h7.687l-.697-.7ZM19.5 12h-1.12a4.441 4.441 0 0 0-.579-1.387l.8-.795a.5.5 0 0 0 0-.707l-.707-.707a.5.5 0 0 0-.707 0l-.795.8A4.443 4.443 0 0 0 15 8.62V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.12c-.492.113-.96.309-1.387.579l-.795-.795a.5.5 0 0 0-.707 0l-.707.707a.5.5 0 0 0 0 .707l.8.8c-.272.424-.47.891-.584 1.382H8.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1.12c.113.492.309.96.579 1.387l-.795.795a.5.5 0 0 0 0 .707l.707.707a.5.5 0 0 0 .707 0l.8-.8c.424.272.892.47 1.382.584v1.12a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1.12c.492-.113.96-.309 1.387-.579l.795.8a.5.5 0 0 0 .707 0l.707-.707a.5.5 0 0 0 0-.707l-.8-.795c.273-.427.47-.898.584-1.392h1.12a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5ZM14 15.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z' />
                </svg>
              </div>
              <div className='relative w-[246px] h-[40px]'>
                <div className='absolute rounded-l-lg inset-y-0 left-0 flex items-center p-2 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'>
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                    />
                  </svg>
                </div>
                <input
                  type='text'
                  id='default-search'
                  className='block w-[246px] h-[40px] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Search users'
                  required
                />
              </div>
            </div>
            <hr className='h-[2px] border-gray-500 my-3' />
            {loadingData ? (
              <>
                {noUser ? (
                  allChats.map((value: any, index: any) => (
                    <UserPanel
                      key={index}
                      onClick={() => getChatData(index)}
                      avatarUrl='https://gravatar.com/avatar/2e5178124f4966c5679f41dc9ef3129a?s=400&d=robohash&r=x'
                      userName={value.user}
                      lastActive='Yesterday'
                      viewStatus={true}
                      lastMassage={'No messages yet'}
                      notification={notification[index].state || null}
                    />
                  ))
                ) : (
                  <div className='flex flex-col justify-center'>
                    <h1 className='w-[225px] mx-auto'>You don&apos;t have chat with anyone</h1>
                    <button
                      type='button'
                      onClick={() => router.push('/chat/create')}
                      className='text-white mt-3 mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                      Create
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <UserSkeleton />
                <UserSkeleton />
                <UserSkeleton />
              </>
            )}
          </div>
          <div className='second w-[70%]'>
            {currentData ? <Chat data={currentData} socket={socket} /> : <p>Click to users</p>}
          </div>
        </div>
      )}
    </>
  );
};
export default ChatHome;

function encryptedData(encryptedData: any, arg1: string) {
  throw new Error('Function not implemented.');
}
