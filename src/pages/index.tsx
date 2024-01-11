import checkAuth from '@/utils/checkAuth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loader from '@/components/loader/Loader';
const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log('render')
    async function fetching() {
      const data = await checkAuth().then(result => {
        if (result === 0) {
          setLoading(false);
        } else if (result === 1) {
          router.push('/chat');
        }
      });
    }
    fetching();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=' flex justify-center items-center h-screen w-screen gap-5'>
          <Link
            href='/auth/sign'
            className=' px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Sign Up
          </Link>
          <Link
            href='/auth/login'
            className='px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
