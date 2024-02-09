import checkAuth from '@/utils/checkAuth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ErrorModel from '@/components/ErrorModel';
import isValidate from '@/utils/validation';

const Login = () => {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState('');
  const [validation, setValidation] = useState({
    isError: false,
    massage: '',
    solution: '',
    isServerError: false,
  });
  const router = useRouter();

  const onChange = (event: any) => {
    setValue({
      ...value,
      [event.target.id]: event.target.value,
    });
  };

  const onClick = async (event: any) => {
    const type = event.currentTarget.getAttribute('data-name');
    if (type === 'own') {
      const validationResponse = isValidate(value);
      if (validationResponse.massage === 'good') {
        setButtonLoading(type);
        const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '<origin>',
          },
          body: JSON.stringify(value),
        });
        const data = response.json();
        data.then(result => {
          if (result.accessToken) {
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('refreshToken', result.refreshToken);
            router.push('/chat');
          } else {
            setButtonLoading('');
            setValidation({
              isError: true,
              massage: result.response.massage,
              solution: result.response.solution,
              isServerError: true,
            });
          }
        });
      } else {
        setValidation({
          isError: true,
          massage: validationResponse.massage,
          solution: validationResponse.solution,
          isServerError: false,
        });
      }
    } else {
      setButtonLoading(type);
      router.push(`${process.env.BACKEND_URL}/auth/${type}-redirect`);
    }
  };

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const accessToken = queryParameters.get('accessToken');
    const refreshToken = queryParameters.get('refreshToken');
    const isError = queryParameters.get('isError');
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

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
            enableBackground='new 0 0 40 40'
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
        <div className='flex flex-col items-center justify-center h-screen'>
          <h1 className=' mb-[3px] text-center sm:text-[30px] text-xl text-[#444053]'>
            Hello again
          </h1>
          <div className='mb-[24px] mr-auto ml-auto break-all sm:w-[190px] w-[158px]'>
            <p className=' text-center sm:text-[20px] text-[#716D7D]'>
              Welcome back you’ve been missed!
            </p>
          </div>
          <div className=' mr-auto ml-auto w-[278px] sm:w-[350px]'>
            {validation.isError ? (
              <ErrorModel
                errorType={validation.isServerError ? 'Server error occured' : 'Invalid Data'}
                massage={validation.massage}
                solving={validation.solution}
                function={() =>
                  setValidation({
                    isError: false,
                    massage: '',
                    solution: '',
                    isServerError: false,
                  })
                }
              />
            ) : (
              ''
            )}
            <input
              id='email'
              type='email'
              onChange={onChange}
              className=' mb-[17px] w-[278px] sm:w-[350px] h-[42px] border-none p-2 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-blue-700'
              placeholder='email'
            />
            <input
              id='password'
              type='password'
              onChange={onChange}
              className=' mt-[10px] mb-[4px] w-[278px] sm:w-[350px] h-[42px] border-none p-2 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-blue-700'
              placeholder='password'
            />
            <h1 className=' mb-[20px] text-gray-400'>
              You don&apos;t have an account{' '}
              <Link href='/auth/sign' className=' text-black'>
                Register
              </Link>{' '}
              ?
            </h1>
            <button
              type='button'
              data-name='own'
              onClick={onClick}
              className='w-[278px] sm:w-[350px] h-[42px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
              {buttonLoading !== 'own' ? 'Login' : <span className='loader'></span>}
            </button>
            <button
              type='button'
              data-name='github'
              onClick={onClick}
              className='w-[278px] sm:w-[350px] text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2'>
              {buttonLoading !== 'github' ? (
                <div className=' flex justify-center items-center w-full'>
                  <svg
                    className='w-4 h-4 mr-2'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'>
                    <path
                      fill-rule='evenodd'
                      d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
                      clip-rule='evenodd'
                    />
                  </svg>
                  Login with Github
                </div>
              ) : (
                <span className='loader'></span>
              )}
            </button>
            <button
              type='button'
              data-name='google'
              onClick={onClick}
              className='text-white w-[278px] sm:w-[350px] bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2'>
              {buttonLoading !== 'google' ? (
                <div className=' flex justify-center items-center w-full'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className=' w-5 h-5 mr-2'
                    x='0px'
                    y='0px'
                    width='100'
                    height='100'
                    viewBox='0 0 48 48'>
                    <path
                      fill='#FFC107'
                      d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'></path>
                    <path
                      fill='#FF3D00'
                      d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'></path>
                    <path
                      fill='#4CAF50'
                      d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'></path>
                    <path
                      fill='#1976D2'
                      d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'></path>
                  </svg>
                  Login with Google
                </div>
              ) : (
                <span className='loader'></span>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
